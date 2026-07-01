# SEO — how it works, how to run it, and when

The website's SEO has two layers that work together. Most of it is **automatic**;
one part is a **manual step you run occasionally**. This guide explains both.

---

## Layer 1 — The SEO that runs itself (the admin portal)

Open the portal (`admin.html`) and go to **SEO & Search** in the left menu.

**What it does.** Every page's search-engine listing (the blue title, green web
address and grey description Google shows) is calculated automatically from your
content. You don't write SEO separately — when you edit a room name, a description
or the phone number and press **Publish changes**, the listings for the affected
pages are recalculated from the new wording.

**How to use the panel.**
- Each page shows a live Google-style preview. Normally you leave these alone —
  they track your content.
- To word a page differently for Google, type into **Custom title** or **Custom
  description**. Leave a box empty to use the automatic version.
- The character counters turn red when text is too long for Google to show in full.
- The change goes live when you press **Publish changes** — same as any other edit.

**When does this run?** Automatically, every time you Publish. There is nothing to
"run" yourself and no schedule to remember. On the live site this is handled
server-side, so Google always sees your current content.

---

## Layer 2 — The baked baseline (run on your computer with `seo-bake.js`)

Some apps — WhatsApp, Facebook, Instagram, X, LinkedIn — do **not** run JavaScript,
so when someone pastes a link they only read SEO tags physically written into the
page. To cover them, the site keeps a "baked" copy of the tags in every page's
`<head>`, plus `sitemap.xml`, `robots.txt` and `site.webmanifest`. The
`seo-bake.js` script regenerates all of that from your settings.

### How to run it
1. Install Node.js once (https://nodejs.org). This runs on **your computer**, not
   the live server — the live site needs no Node.
2. (If changing site-wide settings) open `seo-config.js` and edit the `SITE` block:
   `base` (your domain), `lat`/`lng` (exact map coordinates), `stars`, social URLs.
3. In a terminal, from the folder that contains the pages, run:
   ```
   node seo-bake.js
   ```
   It prints how many pages it updated and regenerates the sitemap, robots and
   manifest. It only rewrites the marked SEO block in each `<head>`; nothing else in
   your pages is touched.
4. Upload the changed pages + `sitemap.xml` + `robots.txt` + `site.webmanifest` to
   the server.

### When it should be run
Run `seo-bake.js` when:
- You change a **site-wide** value in `seo-config.js` (domain, coordinates, star
  rating, default share image, social links).
- You **add, remove or rename a page** (so the sitemap stays correct).
- You want **social-link previews** to reflect recent content edits (Google already
  sees them live; this refreshes the WhatsApp/Facebook-style previews).

You do **not** need to run it for everyday content edits — those are published from
the portal and served live. A good rhythm: run it at go-live, then only when one of
the three triggers above happens.

---

## One-time: the icons / share image (`make_assets.py`)

`make_assets.py` generates the favicons and the social share image. It's a one-time
(or rarely-run) step — run it only if you change the logo or brand colours. It needs
Python with Pillow installed. The output files are already included, so most people
never run this.

---

## Quick reference

| Task                                   | Tool                | When                          |
|----------------------------------------|---------------------|-------------------------------|
| Edit page titles/descriptions          | SEO & Search panel  | Anytime; Publish to apply     |
| Routine content SEO                     | (automatic)         | Every Publish                 |
| Refresh sitemap/robots/manifest + tags | `node seo-bake.js`  | Settings change, page add/remove, before sharing links |
| Regenerate icons/share image           | `make_assets.py`    | Logo/brand change only        |
