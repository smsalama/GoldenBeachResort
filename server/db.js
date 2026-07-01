/* ============================================================
   db.js — single shared SQL Server connection pool.

   Uses the `mssql` (tedious) driver. Every query in this app
   goes through this pool and uses PARAMETERISED inputs only —
   never string concatenation — so SQL injection is not possible.
   ============================================================ */
"use strict";

const sql = require("mssql");

const config = {
  server:   process.env.DB_HOST || "localhost",
  port:     parseInt(process.env.DB_PORT || "1433", 10),
  database: process.env.DB_NAME || "goldenbeach",
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    // TLS in transit. On a self-managed server with a self-signed cert,
    // set DB_TRUST_CERT=true. With a CA-signed cert, leave it false.
    encrypt: (process.env.DB_ENCRYPT || "true") === "true",
    trustServerCertificate: (process.env.DB_TRUST_CERT || "false") === "true",
    enableArithAbort: true
  }
};

let poolPromise = null;

/** Returns a connected pool, creating it on first call. */
function getPool() {
  if (!poolPromise) {
    poolPromise = sql.connect(config)
      .then((pool) => {
        console.log("[db] connected to SQL Server:", config.server + "/" + config.database);
        return pool;
      })
      .catch((err) => {
        // Reset so a later request can retry the connection.
        poolPromise = null;
        console.error("[db] connection failed:", err.message);
        throw err;
      });
  }
  return poolPromise;
}

module.exports = { sql, getPool };
