# Admin Portal Security — how the Node.js backend is hardened

This document explains the security measures built into the Golden Beach
Resort admin portal and why each one matters. It is written so a non-developer
can follow the reasoning, and a developer can verify the implementation in
`server/server.js`.

The admin portal is the only part of the site that can change content, so it is
the part that must be protected. Everything below is already implemented in the
code you received — nothing extra needs to be switched on beyond setting the
environment variables in `.env`.

---

## 1. Passwords are never stored — only bcrypt hashes

The `admin_users` table stores a **bcrypt hash**, not the password itself. When
an admin signs in, the password they type is hashed and compared to the stored
hash. The original password cannot be recovered from the hash, so even someone
with full read access to the database cannot learn the password.

- Hashing cost factor is **12**, which is deliberately slow. This makes
  large-scale password-guessing attacks impractical.
- The plaintext password is never written to disk, never logged, and never
  returned in any API response.
- New users are created with `npm run create-admin`, which hashes the password
  before it ever touches the database.

## 2. Login is rate-limited

The `/api/login` endpoint allows at most **10 attempts per IP address every 15
minutes**. After that it returns a "too many attempts" message. This blocks
automated brute-force attempts to guess a password by trying thousands of
combinations.

## 3. Sign-in is timing-safe

If someone tries to log in with a username that doesn't exist, the server still
performs a full bcrypt comparison against a dummy hash. This means a wrong
username and a wrong password take the same amount of time to reject, so an
attacker cannot discover valid usernames by measuring response times.

## 4. Sessions use hardened cookies

After a successful login the server issues a session cookie (`gbr.sid`) with:

- **HttpOnly** — JavaScript in the browser cannot read it, so a cross-site
  scripting (XSS) flaw cannot steal the session token.
- **Secure** — in production the cookie is only ever sent over HTTPS, never
  plain HTTP, so it can't be intercepted on the network.
- **SameSite=Lax** — the browser won't attach the cookie to requests coming
  from other websites, which mitigates cross-site request forgery (CSRF).
- An **8-hour lifetime** with rolling renewal, so an abandoned session expires.

The session is **regenerated on login** (a fresh session ID is issued), which
prevents "session fixation" — an attacker can't pre-set a session ID and then
wait for the admin to authenticate it.

## 5. Every write requires authentication

- `GET /api/content` is public — it has to be, because the live website reads
  it to display content to visitors.
- `POST /api/content` (saving changes) and `POST /api/upload` (media) are
  guarded by `requireAuth`. Without a valid session they return **401
  Unauthorized**. There is no way to change the site or upload a file without
  being signed in.

## 6. SQL injection is impossible by construction

Every database call uses **parameterised queries** (`.input(name, type, value)`),
never string concatenation. User input is always passed as a typed parameter, so
it is treated strictly as data and can never be interpreted as SQL commands. This
is the single most important defence against database attacks.

## 7. Uploads are strictly validated

The media upload endpoint:

- Accepts only an explicit allow-list of types (JPEG, PNG, WebP, GIF, MP4, WebM).
  Anything else is rejected.
- **Discards the filename sent by the browser** and generates a random, safe
  filename server-side. This prevents path-traversal tricks (e.g. `../../`) and
  filename-based attacks.
- Enforces a **50 MB hard size limit** so a single upload can't exhaust disk.
- Serves the media folder with `X-Content-Type-Options: nosniff`, so the browser
  won't reinterpret a file as something executable.

## 8. Hardened HTTP headers (Helmet)

The `helmet` middleware sets a strict set of response headers on every page:

- **Content-Security-Policy** restricts where scripts, styles, images and media
  may load from — a strong second line of defence against XSS.
- **HSTS** (in production) tells browsers to only ever connect over HTTPS.
- `X-Content-Type-Options`, `X-Frame-Options` / `frame-ancestors` (anti
  clickjacking), and others are applied automatically.

## 9. Request-size limits

JSON request bodies are capped at **2 MB**. This prevents a malicious client from
sending a huge payload to exhaust server memory.

## 10. Secrets live outside the code

The database password and the session secret are read from a `.env` file that is
**never committed to source control** (it's in `.gitignore`). The code ships with
`.env.example` as a template only. This keeps credentials out of the codebase and
out of any backup or repository.

---

## Operational recommendations (things you do, not code)

These are not in the code because they depend on your server, but they complete
the security picture:

1. **Always serve over HTTPS.** Put the Node app behind the SolidCP reverse proxy
   (nginx/IIS) with a valid TLS certificate. The deployment guide covers this.
   The `Secure` cookie flag only works over HTTPS.
2. **Use a dedicated, least-privilege database login** (`gbr_app`) that can only
   read/write the two application tables — not an administrator login.
3. **Keep dependencies patched.** Run `npm audit` periodically and update.
4. **Use a strong admin password** (the create-admin script enforces a 10-char
   minimum; longer is better) and change it if anyone leaves the team.
5. **Back up the database** regularly — it now holds all your site content.

---

## Quick verification checklist

You can confirm the protections are live once deployed:

- Visiting `/api/content` in a browser shows JSON (public read is expected).
- Trying `POST /api/content` without logging in returns 401.
- Signing in with a wrong password fails; ~10 quick failures get rate-limited.
- After login, the browser's cookie for the site is marked HttpOnly and Secure
  (visible in dev-tools → Application → Cookies).
- The site loads over `https://` with a padlock.
