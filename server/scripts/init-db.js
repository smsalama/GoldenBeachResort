/* ============================================================
   init-db.js — runs schema.sql against the configured database.
   Usage:  npm run init-db
   (You can also just run schema.sql by hand in SSMS / sqlcmd.)
   ============================================================ */
"use strict";
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const fs = require("fs");
const { getPool } = require("../db");

/** Remove USE <db> lines — connection already targets DB_NAME from .env */
function stripUseStatements(sqlText) {
  return sqlText
    .split(/\r?\n/)
    .filter((line) => !/^\s*USE\s+/i.test(line))
    .join("\n")
    .trim();
}

(async () => {
  try {
    const file = path.resolve(__dirname, "..", "schema.sql");
    const text = fs.readFileSync(file, "utf8");
    // Split on GO batch separators (mssql can't run multiple batches at once).
    const batches = text
      .split(/^\s*GO\s*$/im)
      .map(stripUseStatements)
      .filter(Boolean)
      .filter((s) => !/^PRINT\b/i.test(s)); // optional status message only
    const pool = await getPool();
    console.log("[init-db] applying schema to database:", process.env.DB_NAME || "(default)");
    for (const batch of batches) {
      await pool.request().batch(batch);
    }
    console.log("[init-db] schema applied successfully.");
    process.exit(0);
  } catch (err) {
    console.error("[init-db] failed:", err.message);
    process.exit(1);
  }
})();
