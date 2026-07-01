# Golden Beach Resort — Go-Live Deployment Guide

This guide takes the bundle you have and puts it live on your **SolidCP-managed
Linux server**, connected to **SQL Server**, with the secure admin portal
working. Follow it top to bottom; each step says exactly what to do and why.

You do **not** need to change any front-end files. They auto-detect their
environment: opened locally they run in demo mode; served from your real domain
they talk to the Node.js API automatically.

---

## What's in this bundle

```
gbr-golive/
├─ public/          ← the website (all 18 pages + assets). Served as-is.
├─ media/           ← uploaded photos/videos land here at runtime (starts empty)
├─ server/          ← the Node.js backend
│   ├─ server.js          (the API + static file server)
│   ├─ db.js              (SQL Server connection pool)
│   ├─ schema.sql         (database tables)
│   ├─ package.json       (dependencies)
│   ├─ .env.example       (config template — copy to .env)
│   ├─ SECURITY.md        (how the portal is secured)
│   └─ scripts/
│       ├─ init-db.js      (creates the tables)
│       └─ create-admin.js (creates your admin login)
└─ .gitignore
```

---

## Prerequisites (on the server)

1. **Node.js 18 or newer** and npm.
   Check with `node -v`. If missing, install via your distro or nvm.
2. **A SQL Server database** you can reach from the server. This can be:
   - SQL Server running on the same Linux box (Microsoft ships SQL Server for
     Linux), or
   - a separate SQL Server reachable over the network (port 1433 open to the
     app server only).
3. **A domain** pointed at the server (e.g. `www.goldenbeachresort.net`) and the
   ability to add a reverse-proxy site in SolidCP with an SSL certificate.

---

## Step 1 — Upload the files

Upload the whole `gbr-golive` folder to the server, for example to:

```
/var/www/goldenbeach/
```

Use SolidCP's File Manager, SFTP, or `scp`. Do **not** upload a `.env` file
(you'll create it on the server in Step 4) and do **not** upload `node_modules`
(you'll install it in Step 3).

---

## Step 2 — Create the database and a least-privilege login

In SolidCP, create an empty SQL Server database (e.g. **`goldenbeach`**) and a
database **user/login** for the app (e.g. **`gbr_app`**) with a strong password.
Grant that login read/write on this database only — not server admin.

> Why a dedicated login: if the app's credentials ever leak, the damage is
> limited to this one database. Never run the app as `sa`.

If you create the database in the panel, you do **not** need the
`CREATE DATABASE` line in `schema.sql` (it's already commented out).

---

## Step 3 — Install dependencies

From a terminal on the server:

```bash
cd /var/www/goldenbeach/server
npm install --omit=dev
```

This downloads the libraries listed in `package.json` (Express, mssql, bcryptjs,
helmet, etc.). `bcryptjs` is pure JavaScript, so no compiler or build tools are
needed — it installs cleanly on any host.

---

## Step 4 — Configure the environment

Copy the template and fill in real values:

```bash
cd /var/www/goldenbeach/server
cp .env.example .env
nano .env          # or your editor of choice
```

Set:

```
NODE_ENV=production
PORT=3000

# generate with:
#   node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
SESSION_SECRET=<paste the long random string here>

DB_HOST=localhost          # or the SQL Server host/IP
DB_PORT=1433
DB_NAME=goldenbeach
DB_USER=gbr_app
DB_PASS=<the gbr_app password>

DB_ENCRYPT=true
DB_TRUST_CERT=true         # true if SQL Server uses a self-signed cert;
                           # false if it has a CA-signed certificate
```

> `.env` holds your secrets. It is already in `.gitignore` and must never be
> shared or committed.

---

## Step 5 — Create the database tables

Two ways — pick one.

**Option A (from Node):**
```bash
cd /var/www/goldenbeach/server
npm run init-db
```

**Option B (by hand):** open `server/schema.sql` in SSMS, Azure Data Studio, or
`sqlcmd` connected to the `goldenbeach` database and run it.

Either way you'll get two tables:

- **`admin_users`** — id, username, `password_hash` (bcrypt), is_active,
  last_login, created_at.
- **`site_content`** — a single row (id = 1) holding the whole CMS document as
  JSON, plus `updated_at` / `updated_by` for an audit trail.

The script seeds `site_content` with an empty `{}` so the site has something to
read immediately.

---

## Step 6 — Create your admin login

```bash
cd /var/www/goldenbeach/server
npm run create-admin
```

It prompts for a username and password (minimum 10 characters), hashes the
password with bcrypt, and stores it. To change the password later, run the same
command again with the same username — it updates the existing user.

> This replaces the old demo login (`admin` / `goldenbeach`). That demo password
> only ever worked when the page was opened locally; on the live domain the
> portal uses the database exclusively.

---

## Step 7 — Run the server as a service

Run Node continuously and restart it on reboot/crash. The simplest robust option
is **PM2**:

```bash
sudo npm install -g pm2
cd /var/www/goldenbeach/server
pm2 start server.js --name goldenbeach
pm2 save
pm2 startup        # follow the printed command to enable boot start
```

Check it's up:
```bash
pm2 status
curl http://127.0.0.1:3000/api/content     # should print JSON (e.g. {})
```

(Alternatively, create a `systemd` service that runs `node server.js` from the
`server/` directory with the same effect.)

---

## Step 8 — Put it behind the domain over HTTPS

The Node app listens on `127.0.0.1:3000`. In SolidCP, configure your site's web
server (nginx or IIS/ARR) as a **reverse proxy** that forwards your domain to
that port, with an **SSL certificate** installed so the site is served over
`https://`.

For nginx the proxy block looks like:

```nginx
server {
    server_name www.goldenbeachresort.net goldenbeachresort.net;

    client_max_body_size 55m;     # allow the 50 MB media uploads through

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
    # ... SSL certificate lines added by SolidCP / certbot ...
}
```

> Two details that matter:
> - `X-Forwarded-Proto` lets the app know the request arrived over HTTPS, so the
>   `Secure` session cookie is set correctly. The app already does
>   `trust proxy = 1` to read it.
> - `client_max_body_size 55m` must be at least as large as the 50 MB upload
>   limit, or large videos will be blocked by the proxy before reaching Node.

Once HTTPS is live, the front-end automatically switches from demo mode to the
server API (it keys off the real domain). No file edits required.

---

## Step 9 — Verify go-live

1. Open `https://www.goldenbeachresort.net/` — the site loads, tab shows the
   ring logo.
2. Open `https://www.goldenbeachresort.net/admin.html`, sign in with the admin
   account you created in Step 6. The demo hint box is automatically hidden on
   the live domain.
3. Make a small edit and press **Publish changes**. Refresh the public site —
   the change shows for everyone (it's now in the database, not just your
   browser).
4. Upload a photo in the portal — it saves to `media/` and appears on the site.
5. Spot-check security (see the checklist at the end of `server/SECURITY.md`).

---

## Updating the site later

- **Content/photos:** done entirely through the admin portal. No deployment.
- **Front-end changes (new pages, design):** upload the changed files in
  `public/`, then run `node seo-bake.js` if you added/renamed pages or changed
  site-wide SEO (see `SEO-ADMIN-GUIDE.md` in `public/`).
- **Server changes:** upload the new `server/` files and `pm2 restart goldenbeach`.

---

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| Server won't start, logs "database unavailable" | Wrong `DB_*` values in `.env`, SQL Server not reachable, or firewall blocking port 1433. |
| Login always fails on live site | No admin user yet — run `npm run create-admin`. |
| "Too many sign-in attempts" | Rate limit (10 / 15 min per IP). Wait, then retry. |
| Cookie not staying logged in | Site must be HTTPS in production and the proxy must pass `X-Forwarded-Proto`. |
| Large video upload fails | Raise `client_max_body_size` in the proxy to ≥ 55 MB. |
| TLS error connecting to DB | Set `DB_TRUST_CERT=true` for a self-signed SQL Server cert. |

That's everything needed to go live.
