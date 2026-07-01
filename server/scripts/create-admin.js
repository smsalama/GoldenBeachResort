/* ============================================================
   create-admin.js — create (or reset) an admin user.
   The password is hashed with bcrypt (cost 12); the plaintext
   is never stored or logged.

   Usage:
     npm run create-admin                 (prompts for both)
     node scripts/create-admin.js USER    (prompts for password)
     node scripts/create-admin.js USER PASS  (non-interactive; avoid
                                              on shared machines —
                                              it can leak via history)
   ============================================================ */
"use strict";
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const readline = require("readline");
const bcrypt = require("bcryptjs");
const { sql, getPool } = require("../db");

const COST = 12;

function ask(question, { hidden = false } = {}) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    if (hidden) {
      // Mask input: override readline's echo so typed characters never show.
      // (Override after the prompt is written so the question itself prints.)
      let prompted = false;
      rl._writeToOutput = (str) => {
        if (!prompted) {
          // First write is readline echoing the prompt — let it through once.
          if (str.includes(question)) { prompted = true; rl.output.write(str); return; }
        }
        // Print the prompt followed by one asterisk per character, nothing else.
        if (str.trim().length === 0 || str.includes(question)) {
          rl.output.write(str);
        } else {
          rl.output.write("*");
        }
      };
    }
    rl.question(question, (answer) => {
      if (hidden) rl.output.write("\n");
      rl.close();
      resolve(answer.trim());
    });
  });
}

(async () => {
  try {
    let username = process.argv[2];
    let password = process.argv[3];

    if (!username) username = await ask("Admin username: ");
    if (!username) throw new Error("Username is required.");

    if (!password) password = await ask("Admin password: ", { hidden: true });
    if (!password || password.length < 10) {
      throw new Error("Password must be at least 10 characters.");
    }

    const hash = await bcrypt.hash(password, COST);
    const pool = await getPool();

    // Upsert: create the user, or reset the password if they exist.
    await pool.request()
      .input("username", sql.NVarChar(100), username)
      .input("hash", sql.NVarChar(255), hash)
      .query(
        "MERGE dbo.admin_users AS t " +
        "USING (SELECT @username AS username) AS s ON (t.username = s.username) " +
        "WHEN MATCHED THEN UPDATE SET password_hash = @hash, is_active = 1 " +
        "WHEN NOT MATCHED THEN INSERT (username, password_hash) VALUES (@username, @hash);"
      );

    console.log(`[create-admin] user "${username}" is ready. You can now sign in to /admin.html`);
    process.exit(0);
  } catch (err) {
    console.error("[create-admin] failed:", err.message);
    process.exit(1);
  }
})();
