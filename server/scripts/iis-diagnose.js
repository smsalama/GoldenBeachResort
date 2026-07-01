/* ============================================================
   iis-diagnose.js — run on the server to find startup issues.
   Usage:  node scripts/iis-diagnose.js
   ============================================================ */
"use strict";
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const root = path.resolve(__dirname, "..", "..");
const serverDir = path.resolve(__dirname, "..");
const envFile = path.join(serverDir, ".env");

let ok = true;
function pass(msg) { console.log("  OK  ", msg); }
function fail(msg) { console.log("  FAIL", msg); ok = false; }

console.log("Golden Beach Resort — IIS / Node diagnostics\n");
console.log("Site root (expected):", root);
console.log("Server folder:       ", serverDir);
console.log("Node version:        ", process.version);
console.log("");

console.log("1. Folder layout");
for (const rel of ["web.config", "public", "public/index.html", "server/server.js", "server/node_modules", "media", "logs"]) {
  const p = path.join(root, rel.replace(/\//g, path.sep));
  fs.existsSync(p) ? pass(rel) : fail(rel + " — missing");
}

console.log("\n2. Environment file");
if (fs.existsSync(envFile)) {
  pass("server/.env exists");
  for (const key of ["DB_HOST", "DB_NAME", "DB_USER", "DB_PASS", "SESSION_SECRET"]) {
    process.env[key] ? pass(key + " is set") : fail(key + " is missing in .env");
  }
} else {
  fail("server/.env not found — copy .env.example to .env");
}

console.log("\n3. Database connection");
(async () => {
  try {
    const { getPool } = require("../db");
    const pool = await getPool();
    await pool.request().query("SELECT 1 AS n");
    pass("connected to " + (process.env.DB_HOST || "localhost") + "/" + (process.env.DB_NAME || "?"));
  } catch (err) {
    fail("database: " + err.message);
  }

  console.log("\n4. Startup log (if IIS already tried to run the site)");
  const logFile = path.join(root, "logs", "gbr-startup.log");
  if (fs.existsSync(logFile)) {
    const tail = fs.readFileSync(logFile, "utf8").trim().split(/\r?\n/).slice(-8).join("\n");
    console.log(tail || "(empty)");
  } else {
    console.log("  (no gbr-startup.log yet — upload the latest server.js and recycle the app pool)");
  }

  const nodeLogs = fs.existsSync(path.join(root, "logs"))
    ? fs.readdirSync(path.join(root, "logs")).filter((f) => f.startsWith("node"))
    : [];
  if (nodeLogs.length) {
    console.log("\n5. IIS node stdout logs in logs/:");
    nodeLogs.slice(-3).forEach((f) => console.log("  ", f));
  }

  console.log("\n" + (ok ? "All checks passed — if IIS still shows 500, see README-WINDOWS-IIS.md troubleshooting." : "Fix the FAIL items above, then recycle the IIS app pool."));
  process.exit(ok ? 0 : 1);
})();
