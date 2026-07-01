/* ============================================================
   Golden Beach Resort — SEO runtime (front-end)
   ------------------------------------------------------------
   Runs on every page AFTER cms-apply.js. Reads the same CMS
   content, asks seo-config.js to compute the SEO for this page,
   and writes it into <head>:  title, meta description, canonical,
   robots, Open Graph, Twitter, and the JSON-LD structured data.

   Because it derives from live content, any admin change that is
   published is reflected here automatically on the next page load.

   GO-LIVE (SQL Server): loadContent() below already fetches from
   GET /api/content when served over http(s) — the same call used in
   cms-apply.js. Nothing here needs changing.

   NOTE: Search engines (Google) render this JS and pick up the tags.
   Social-media link-preview scrapers (Facebook/WhatsApp/X/LinkedIn)
   do NOT run JS — for those, the static baseline tags baked into the
   HTML <head> are used. Regenerate those with seo-bake.js when you
   change site-wide SEO settings or add/rename a page.
   ============================================================ */
(function () {
  "use strict";
  if (!window.GBR_SEO) return;             // config not loaded — do nothing
  var STORE_KEY = "gbr_cms_content";

  function loadContent() {
    /* Go-live: served over http(s) -> read from the database API (a Promise).
       apply() already handles a Promise. Local file:// -> demo store. */
    if (/^https?:$/.test(location.protocol) &&
        !/^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/i.test(location.hostname)) {
      return fetch('/api/content').then(function (r) { return r.json(); });
    }
    try { var raw = localStorage.getItem(STORE_KEY); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  }

  var head = document.head || document.getElementsByTagName("head")[0];

  function setMeta(attr, name, value) {
    if (value == null) return;
    var sel = "meta[" + attr + '="' + name + '"]';
    var el = head.querySelector(sel);
    if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); head.appendChild(el); }
    el.setAttribute("content", value);
  }
  function setLink(rel, href) {
    var el = head.querySelector('link[rel="' + rel + '"]');
    if (!el) { el = document.createElement("link"); el.setAttribute("rel", rel); head.appendChild(el); }
    el.setAttribute("href", href);
  }

  function apply(content) {
    var key = window.GBR_SEO.pageKeyFromPath(location.pathname);
    var s = window.GBR_SEO.compute(content, key);

    // <title>
    if (s.title) document.title = s.title;

    // robots + canonical
    setMeta("name", "robots", s.robots);
    if (s.indexable) setLink("canonical", s.canonical);

    if (s.indexable) {
      // description
      setMeta("name", "description", s.description);
      // Open Graph
      setMeta("property", "og:title", s.title);
      setMeta("property", "og:description", s.description);
      setMeta("property", "og:url", s.canonical);
      setMeta("property", "og:image", s.ogImage);
      // Twitter
      setMeta("name", "twitter:title", s.title);
      setMeta("name", "twitter:description", s.description);
      setMeta("name", "twitter:image", s.ogImage);

      // JSON-LD — replace the existing structured-data block in place
      if (s.jsonld) {
        var node = head.querySelector('script[type="application/ld+json"]');
        if (!node) {
          node = document.createElement("script");
          node.type = "application/ld+json";
          head.appendChild(node);
        }
        node.textContent = JSON.stringify(s.jsonld, null, 2);
      }
    }
  }

  function start() {
    var c = loadContent();
    if (c && typeof c.then === "function") {        // go-live: fetch() Promise
      c.then(apply).catch(function () { apply(null); });
    } else {                                         // demo: localStorage value
      apply(c);
    }
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", start);
  else
    start();
})();
