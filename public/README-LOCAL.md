# Golden Beach Resort — LOCAL bundle (demo mode)

This is the website exactly as it runs **without a server** — the demo CMS, mock
login and localStorage content. Use it for editing, previewing and showing the
client. The same files run live; only the `server/` folder and database are
added at go-live (see `../DEPLOYMENT-GUIDE.md`).

## How to open it
- **Simplest:** double-click `index.html` (or `admin.html`) — it opens via
  `file://` and runs in demo mode.
- **In VS Code:** open this folder, then use "Open in Default Browser" or the
  **Live Server** extension. `localhost` is treated as demo, so the pages and
  the admin portal behave the same as `file://` (no server needed).

## The admin portal (demo)
- Open `admin.html`, sign in with **admin / goldenbeach**.
- Edits, uploaded photos/videos and SEO previews are stored in your browser
  (localStorage) and shown via `cms-apply.js`. Nothing leaves your machine.
- This demo login only works locally. On the live domain the portal signs in
  against the SQL Server database (bcrypt-hashed passwords) — see
  `../server/SECURITY.md`.

## Media
Drop photos/videos into `media/` to preview them. In the demo, portal uploads
are held in the browser; live, they upload to the server's `media/` folder.

## Going live
Everything you need for the server is in the sibling `server/` folder, with a
full walkthrough in `../DEPLOYMENT-GUIDE.md`. The front-end auto-detects its
environment: `file://` and `localhost` = demo; a real domain = live (server API).
There are no front-end code changes between demo and live.
