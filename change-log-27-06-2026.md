# Change Log — 27 June 2026

Summary of changes made during local setup, SolidCP/IIS deployment, and production troubleshooting for Golden Beach Resort.

---

## `server/server.js`

| Change | Why |
|--------|-----|
| Load `.env` from `server/.env` via `path.join(__dirname, ".env")` | IIS starts Node from `wwwroot`, not `server/` — cwd-based dotenv would miss secrets |
| Added `logFatal()` → writes to `logs/gbr-startup.log` | Easier IIS startup debugging |
| Create `media/` and `logs/` with error handling | Clear failure if app pool lacks write permission |
| Verify `public/` exists before starting | Fail fast if folder layout is wrong |
| Validate `PORT` before listen | Catch missing `%HTTP_PLATFORM_PORT%` |
| Listen on `127.0.0.1` with `server.on("error")` | Recommended for IIS HTTP Bridge |

---

## `server/scripts/init-db.js`

| Change | Why |
|--------|-----|
| Load `.env` from `../.env` | Works regardless of cwd |
| `stripUseStatements()` — removes `USE <db>` lines from SQL batches | Fixed error when live DB is `GoldenBeachNew` but schema had `USE goldenbeach` |
| Skip `PRINT` batches | Avoid noise / batch issues |
| Log target database name | Clearer init output |
| **Bug fix:** removed duplicate `const path = require("path")` | Fixed `SyntaxError: Identifier 'path' has already been declared` |

---

## `server/scripts/create-admin.js`

| Change | Why |
|--------|-----|
| Load `.env` from `../.env` | Same as above — consistent with IIS |

---

## `server/schema.sql`

| Change | Why |
|--------|-----|
| Removed `USE goldenbeach;` | Connection already uses `DB_NAME` from `.env`; hardcoded `USE` broke non-default DB names |

---

## `server/package.json`

| Change | Why |
|--------|-----|
| Added `"diagnose": "node scripts/iis-diagnose.js"` | Server-side health check script |

---

## `server/scripts/iis-diagnose.js` *(new)*

Checks folder layout, `.env` variables, DB connection, and recent startup logs — used for IIS troubleshooting.

---

## New folders (not app logic)

| Folder | Purpose |
|--------|---------|
| **`deploy/`** | Production upload bundle (`public/`, `server/`, `web.config`, `media/`, `logs/`) |
| **`config/`** | IIS configs (`web.config`, minimal/proxy variants), SolidCP troubleshooting docs, NSSM install script |

---

## What was **not** changed

- `public/` — HTML, `cms-apply.js`, `admin.html`, etc. unchanged
- `server/db.js` — unchanged
- No new npm dependencies
- No session store change (MemoryStore warning is expected; still fine for single-process IIS)

---

## Operational / local only (not source)

- Created `server/.env` for local dev (gitignored)
- Learned IIS `web.config` must **not** include `processesPerApplication`, `maxProcesses`, `rapidFailsPerMinute`, or `requestFiltering` on SolidCP — documented in `config/` and `deploy/web.config`, not in Node source

---

## IIS `web.config` (deployment config, not Node source)

Working production config on SolidCP uses only supported `httpPlatform` attributes:

- `processPath`, `arguments`, `stdoutLogEnabled`, `stdoutLogFile`, `startupTimeLimit`
- `environmentVariables` for `PORT` and `NODE_ENV`

Removed attributes that caused Event ID 1034 (`Unable to get configuration section system.webServer/httpPlatform`):

- `processesPerApplication`
- `maxProcesses`
- `rapidFailsPerMinute`
- `requireAccess="Script"` (optional; removed in working config)
- `<security><requestFiltering>` (locked on SolidCP; set max upload in panel instead)

---

## One-line summary

Backend changes focused on **reliable `.env` loading under IIS**, **safer startup/logging**, and **database init that respects any `DB_NAME`** — plus deployment/IIS config assets; the website frontend was untouched.
