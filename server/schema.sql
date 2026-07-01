/* ============================================================
   Golden Beach Resort — SQL Server schema
   Run this once against your database (sqlcmd, Azure Data Studio,
   or SSMS). Creating the database itself is shown commented out;
   on SolidCP you usually create the empty DB in the panel first,
   then run everything below the USE line.
   ============================================================ */

/* If you need to create the database from scratch (skip on SolidCP,
   where the panel already created it), run this first, on its own,
   against the master database:

       CREATE DATABASE goldenbeach;

   Then run the rest of this file against the new database. */

/* USE is not needed here — connect to your database first (SSMS dropdown,
   or set DB_NAME in server/.env for npm run init-db). Hardcoding a name
   breaks when the live database is e.g. GoldenBeachNew instead of goldenbeach. */

/* ---------- Admin users ---------- */
IF OBJECT_ID('dbo.admin_users', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.admin_users (
        id            INT            IDENTITY(1,1) PRIMARY KEY,
        username      NVARCHAR(100)  NOT NULL,
        password_hash NVARCHAR(255)  NOT NULL,      -- bcrypt hash, never plaintext
        is_active     BIT            NOT NULL DEFAULT 1,
        last_login    DATETIME2(0)   NULL,
        created_at    DATETIME2(0)   NOT NULL DEFAULT SYSUTCDATETIME()
    );
    CREATE UNIQUE INDEX UX_admin_users_username ON dbo.admin_users(username);
END
GO

/* ---------- Site content (single published JSON document) ----------
   The whole CMS document is stored as one JSON blob in row id = 1,
   exactly matching the shape the admin portal and cms-apply.js use.
   We keep updated_at/updated_by for a simple audit trail. */
IF OBJECT_ID('dbo.site_content', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.site_content (
        id         INT             NOT NULL PRIMARY KEY,   -- always 1
        data       NVARCHAR(MAX)   NOT NULL,               -- JSON
        updated_at DATETIME2(0)    NOT NULL DEFAULT SYSUTCDATETIME(),
        updated_by NVARCHAR(100)   NULL
    );
    -- Seed an empty document so GET /api/content has a row to return.
    INSERT INTO dbo.site_content (id, data, updated_by) VALUES (1, N'{}', N'system');
END
GO

PRINT 'Schema ready. Now create your first admin user with: npm run create-admin';
GO
