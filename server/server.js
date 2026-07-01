/* ============================================================
   Golden Beach Resort — secure Node.js backend
   ------------------------------------------------------------
   Serves the static website AND the admin API:
     POST /api/login    -> verify credentials (bcrypt) in SQL Server
     POST /api/logout   -> destroy the session
     GET  /api/content  -> public; returns the published content JSON
     POST /api/content  -> admin only; saves the content JSON
     POST /api/upload   -> admin only; stores an uploaded image/video

   Security posture is documented in SECURITY.md. In short:
   helmet headers, HTTP-only + Secure + SameSite session cookies,
   bcrypt password hashing, rate-limited login, parameterised SQL,
   strict upload validation, and a hard body-size cap.
   ============================================================ */
"use strict";

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const fs = require("fs");
const crypto = require("crypto");

const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const multer = require("multer");
const bcrypt = require("bcryptjs");

const { sql, getPool } = require("./db");

const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);
const PUBLIC_DIR = path.resolve(__dirname, "..", "public");
const MEDIA_DIR = path.resolve(__dirname, "..", "media");
const LOG_DIR = path.resolve(__dirname, "..", "logs");
const IS_PROD = process.env.NODE_ENV === "production";

function logFatal(message, err) {
  const line = `[${new Date().toISOString()}] ${message}` +
    (err && err.stack ? "\n" + err.stack : "") + "\n";
  console.error(line);
  try {
    if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
    fs.appendFileSync(path.join(LOG_DIR, "gbr-startup.log"), line);
  } catch (_) { /* best effort */ }
}

// Behind SolidCP's nginx/IIS reverse proxy, trust the first hop so
// Secure cookies and rate-limit IPs are evaluated correctly.
app.set("trust proxy", 1);

try {
  if (!fs.existsSync(MEDIA_DIR)) fs.mkdirSync(MEDIA_DIR, { recursive: true });
  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
} catch (err) {
  logFatal("[gbr] could not create media/ or logs/ — check IIS app pool write permissions", err);
  process.exit(1);
}

if (!fs.existsSync(PUBLIC_DIR)) {
  logFatal("[gbr] public folder not found at " + PUBLIC_DIR);
  process.exit(1);
}

/* ---------- 1. Hardened HTTP headers ---------- */
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      // The pages use some inline styles/scripts and Font Awesome data URIs.
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:"],
      mediaSrc: ["'self'", "blob:", "data:"],
      fontSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'self'"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  hsts: IS_PROD ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false
}));

app.use(compression());
app.use(cookieParser());
// Hard cap on JSON body size: protects the content endpoint from abuse.
app.use(express.json({ limit: "2mb" }));

/* ---------- 2. Session cookie (HTTP-only, Secure, SameSite) ---------- */
if (!process.env.SESSION_SECRET) {
  console.warn("[warn] SESSION_SECRET is not set — using a random one. " +
    "Sessions will reset on every restart. Set it in .env for production.");
}
app.use(session({
  name: "gbr.sid",
  secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex"),
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: true,                 // JS can't read it -> mitigates XSS token theft
    secure: IS_PROD,                // HTTPS-only in production
    sameSite: "lax",                // mitigates CSRF on the cookie
    maxAge: 1000 * 60 * 60 * 8      // 8-hour working session
  }
}));
// NOTE: the default MemoryStore is fine for a single-process site like this.
// If you ever run multiple Node processes, switch to a shared store
// (e.g. connect-redis or a SQL Server session table).

/* ---------- 3. Auth guard ---------- */
function requireAuth(req, res, next) {
  if (req.session && req.session.userId) return next();
  return res.status(401).json({ error: "Not authenticated" });
}

/* ---------- 4. Login (rate-limited) ---------- */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 10,                    // 10 attempts per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many sign-in attempts. Please wait a few minutes and try again." }
});

app.post("/api/login", loginLimiter, async (req, res) => {
  try {
    const username = String((req.body && req.body.username) || "").trim();
    const password = String((req.body && req.body.password) || "");
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    const pool = await getPool();
    const result = await pool.request()
      .input("username", sql.NVarChar(100), username)
      .query("SELECT TOP 1 id, username, password_hash, is_active " +
             "FROM admin_users WHERE username = @username");

    const user = result.recordset[0];

    // Always run a bcrypt compare (even with a dummy hash when the user is
    // missing) so response timing doesn't reveal whether the username exists.
    const DUMMY = "$2b$12$Czr0pHqkQ3z6V7m2N4uOeOoErXp1u8x2k9Yb1qoQ9bqV6c8rQ7p6e";
    const hash = user && user.is_active ? user.password_hash : DUMMY;
    const ok = await bcrypt.compare(password, hash);

    if (!user || !user.is_active || !ok) {
      return res.status(401).json({ error: "Those details didn't match." });
    }

    // Prevent session fixation: issue a fresh session id on login.
    req.session.regenerate((err) => {
      if (err) return res.status(500).json({ error: "Session error." });
      req.session.userId = user.id;
      req.session.username = user.username;
      pool.request()
        .input("id", sql.Int, user.id)
        .query("UPDATE admin_users SET last_login = SYSUTCDATETIME() WHERE id = @id")
        .catch(() => {});
      res.json({ ok: true, username: user.username });
    });
  } catch (err) {
    console.error("[login]", err.message);
    res.status(500).json({ error: "Sign-in is temporarily unavailable." });
  }
});

app.post("/api/logout", (req, res) => {
  if (!req.session) return res.json({ ok: true });
  req.session.destroy(() => {
    res.clearCookie("gbr.sid");
    res.json({ ok: true });
  });
});

/* ---------- 5. Content (GET public, POST admin) ---------- */
app.get("/api/content", async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .query("SELECT data FROM site_content WHERE id = 1");
    if (!result.recordset.length) return res.json({});
    // Stored as NVARCHAR(MAX) JSON; send it straight through.
    res.type("application/json").send(result.recordset[0].data);
  } catch (err) {
    console.error("[content:get]", err.message);
    res.status(500).json({ error: "Could not load content." });
  }
});

app.post("/api/content", requireAuth, async (req, res) => {
  try {
    const body = req.body;
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return res.status(400).json({ error: "Invalid content payload." });
    }
    const json = JSON.stringify(body);
    const pool = await getPool();
    await pool.request()
      .input("data", sql.NVarChar(sql.MAX), json)
      .input("by", sql.NVarChar(100), req.session.username || "admin")
      .query(
        "MERGE site_content AS t " +
        "USING (SELECT 1 AS k) AS s ON (t.id = 1) " +
        "WHEN MATCHED THEN UPDATE SET data = @data, updated_at = SYSUTCDATETIME(), updated_by = @by " +
        "WHEN NOT MATCHED THEN INSERT (id, data, updated_at, updated_by) " +
        "VALUES (1, @data, SYSUTCDATETIME(), @by);"
      );
    res.json({ ok: true });
  } catch (err) {
    console.error("[content:post]", err.message);
    res.status(500).json({ error: "Could not save content." });
  }
});

/* ---------- 6. Media upload (admin only, strictly validated) ---------- */
const ALLOWED = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "video/mp4": ".mp4",
  "video/webm": ".webm"
};

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, MEDIA_DIR),
    filename: (req, file, cb) => {
      // Never trust the client filename. Generate a safe, unique name.
      const ext = ALLOWED[file.mimetype] || "";
      const safe = crypto.randomBytes(16).toString("hex") + ext;
      cb(null, safe);
    }
  }),
  limits: { fileSize: 50 * 1024 * 1024 },  // 50 MB hard cap
  fileFilter: (req, file, cb) => {
    if (ALLOWED[file.mimetype]) return cb(null, true);
    cb(new Error("Unsupported file type."));
  }
});

app.post("/api/upload", requireAuth, (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message || "Upload failed." });
    if (!req.file) return res.status(400).json({ error: "No file received." });
    // Public URL the front-end stores in content.images[...]
    res.json({ url: "/media/" + req.file.filename });
  });
});

/* ---------- 7. Static files ---------- */
// Uploaded media. nosniff + no inline execution; long cache (names are unique).
app.use("/media", express.static(MEDIA_DIR, {
  maxAge: "30d",
  setHeaders: (res) => res.setHeader("X-Content-Type-Options", "nosniff")
}));

// The website itself. express.static serves index.html at "/" automatically.
app.use(express.static(PUBLIC_DIR, {
  extensions: ["html"],
  maxAge: IS_PROD ? "1h" : 0
}));

// 404 fallback for unknown non-API routes -> homepage (keeps deep links friendly).
app.use((req, res) => {
  if (req.path.startsWith("/api/")) return res.status(404).json({ error: "Not found" });
  res.status(404).sendFile(path.join(PUBLIC_DIR, "index.html"));
});

/* ---------- 8. Start ---------- */
if (!Number.isFinite(PORT) || PORT <= 0) {
  logFatal("[gbr] invalid PORT: " + String(process.env.PORT));
  process.exit(1);
}

getPool()
  .then(() => {
    const server = app.listen(PORT, "127.0.0.1", () => {
      console.log(`[gbr] server listening on http://127.0.0.1:${PORT} (${IS_PROD ? "production" : "development"})`);
      console.log(`[gbr] public=${PUBLIC_DIR}`);
    });
    server.on("error", (err) => {
      logFatal("[gbr] could not bind to port " + PORT, err);
      process.exit(1);
    });
  })
  .catch((err) => {
    logFatal("[gbr] could not start — database unavailable", err);
    process.exit(1);
  });
