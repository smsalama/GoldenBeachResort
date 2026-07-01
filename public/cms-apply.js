/* ============================================================
   Golden Beach Resort — CMS content loader
   Applies content edited in the Admin Portal to the live site.

   HOW IT WORKS (demo / pre-go-live):
   - The Admin Portal (admin.html) saves all content into the
     browser under the key "gbr_cms_content" (localStorage).
   - Every website page includes this script. On load it reads
     that content and updates the page wherever an editable hook
     is present. The HTML keeps its built-in default content; this
     loader only OVERRIDES where the admin has actually made a change.

   EDITABLE HOOKS (data attributes placed in the HTML):
     data-cms="global.phone"          -> text from content.global.*
     data-cms="index.heroSubtitle"    -> text from content.pages.<page>.*
     data-cms-href="global.facebook"  -> href (supports mailto:/tel: prefixes)
     data-cms-herotitle="..."         -> homepage animated headline (rebuilt)
     data-cms-room="seaview"          -> a room field, paired with
       data-cms-field="price|desc|name"   (looked up in content.rooms by id)
     data-cms-news="3"                -> a news card, with inner
       data-cms-field="date|cat|title|excerpt" (looked up in content.news by id)
     data-cms-img="rooms.hero"        -> replaces an SVG illustration with an
                                          uploaded photo OR video (content.images[key]).
                                          Videos play muted, looped, covering the box.

   GO-LIVE (SQL Server): loadContent() below already fetches from
   GET /api/content when served over http(s). That endpoint returns
   the same JSON shape from the database. Nothing else here changes.
   ============================================================ */
(function () {
  "use strict";

  var STORE_KEY = "gbr_cms_content";

  function loadContent() {
    /* Go-live: served over http(s) -> read from the database API (a Promise).
       Local file:// -> fall back to the in-browser demo store. */
    if (/^https?:$/.test(location.protocol) &&
        !/^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/i.test(location.hostname)) {
      return fetch("/api/content").then(function (r) { return r.json(); });
    }
    try {
      var raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function currentPageKey() {
    var path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (!path) path = "index.html";
    return path.replace(/\.html$/, "") || "index";
  }

  function nonEmpty(v) { return typeof v === "string" && v.trim() !== ""; }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---- 1. Plain text (global.* and page-scoped fields) ---- */
  function applyText(content) {
    var page = currentPageKey();
    document.querySelectorAll("[data-cms]").forEach(function (el) {
      var parts = el.getAttribute("data-cms").split(".");
      var scope = parts[0];
      var field = parts.slice(1).join(".");
      var bucket = scope === "global"
        ? content.global
        : (content.pages && content.pages[scope === "page" ? page : scope]) || null;
      if (!bucket || !nonEmpty(bucket[field])) return;
      // If a styled default is declared and the value still matches it, leave the
      // designed markup (e.g. <em> accents) untouched. Only override once edited.
      var def = el.getAttribute("data-cms-default");
      if (def != null && bucket[field].trim() === def.trim()) return;
      el.textContent = bucket[field];
    });
  }

  /* ---- 2. Links (href) — supports mailto:/tel: prefixes ---- */
  function applyHrefs(content) {
    document.querySelectorAll("[data-cms-href]").forEach(function (el) {
      var key = el.getAttribute("data-cms-href");
      var prefix = "";
      if (key.indexOf("mailto:") === 0) { prefix = "mailto:"; key = key.slice(7); }
      else if (key.indexOf("tel:") === 0) { prefix = "tel:"; key = key.slice(4); }
      var parts = key.split(".");
      var bucket = parts[0] === "global" ? content.global
        : (content.pages && content.pages[parts[0]]);
      var field = parts.slice(1).join(".");
      if (bucket && nonEmpty(bucket[field])) {
        el.setAttribute("href", prefix + bucket[field]);
      }
    });
  }

  /* ---- 3. Homepage animated headline ---- */
  var HERO_DEFAULT = "Where turquoise water meets golden sand";
  function applyHeroTitle(content) {
    var el = document.querySelector("[data-cms-herotitle]");
    if (!el || !content.pages || !content.pages.index) return;
    var title = content.pages.index.heroTitle;
    if (!nonEmpty(title) || title.trim() === HERO_DEFAULT) return; // keep designed default
    var words = title.trim().split(/\s+/);
    // The last word — or last two if the title is long — form a single accent
    // phrase so the lime underline runs continuously beneath them (not one
    // underline per word), matching the built-in headline design.
    var accentCount = words.length > 3 ? 2 : 1;
    var accentFrom = words.length - accentCount;
    var html = "";
    words.slice(0, accentFrom).forEach(function (w, i) {
      var delay = (0.9 + i * 0.12).toFixed(2);
      html += '<span class="word" style="animation-delay:' + delay + 's">' + esc(w) + "</span> ";
    });
    var accentPhrase = words.slice(accentFrom).join(" ");
    var accentDelay = (0.9 + accentFrom * 0.12).toFixed(2);
    html += '<span class="word accent" style="animation-delay:' + accentDelay + 's">' + esc(accentPhrase) + "</span>";
    el.innerHTML = html.trim();
  }

  /* ---- 4. Rooms (price / desc / name) ---- */
  function applyRooms(content) {
    if (!Array.isArray(content.rooms)) return;
    var byId = {};
    content.rooms.forEach(function (r) { byId[r.id] = r; });
    document.querySelectorAll("[data-cms-room][data-cms-field]").forEach(function (el) {
      var room = byId[el.getAttribute("data-cms-room")];
      if (!room) return;
      var v = room[el.getAttribute("data-cms-field")];
      if (nonEmpty(v != null ? String(v) : "")) el.textContent = v;
    });
  }

  /* ---- 5. News (edit in place, hide deleted, append new) ---- */
  function applyNews(content) {
    if (!Array.isArray(content.news)) return;
    var byId = {};
    content.news.forEach(function (n) { byId[String(n.id)] = n; });

    var seen = {};
    var grid = null;
    document.querySelectorAll("article[data-cms-news]").forEach(function (card) {
      if (!grid) grid = card.parentNode;
      var id = card.getAttribute("data-cms-news");
      var post = byId[id];
      if (!post) { card.style.display = "none"; return; }
      seen[id] = true;
      card.style.display = "";
      setField(card, "date", post.date, true);
      setField(card, "cat", post.cat, false);
      setField(card, "title", post.title, false);
      setField(card, "excerpt", post.excerpt, false);
    });

    // On the dedicated news page, append any posts that have no card yet.
    if (grid && currentPageKey() === "news") {
      content.news.forEach(function (n) {
        if (seen[String(n.id)]) return;
        grid.appendChild(buildNewsCard(n));
      });
    }
  }

  function setField(card, field, value, isDate) {
    var el = card.querySelector('[data-cms-field="' + field + '"]');
    if (!el || !nonEmpty(value)) return;
    if (isDate) el.innerHTML = '<i class="fas fa-calendar"></i>' + esc(value);
    else el.textContent = value;
  }

  function buildNewsCard(n) {
    var art = document.createElement("article");
    art.className = "news-card";
    art.setAttribute("data-cms-news", String(n.id));
    art.innerHTML =
      '<div class="news-thumb">' +
        '<span class="news-date" data-cms-field="date"><i class="fas fa-calendar"></i>' + esc(n.date || "") + "</span>" +
        '<span class="news-cat" data-cms-field="cat">' + esc(n.cat || "") + "</span>" +
        '<svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">' +
          '<rect width="400" height="240" fill="url(#gSky)"/>' +
          '<circle cx="320" cy="60" r="40" fill="#FFD479"/>' +
          '<rect y="160" width="400" height="80" fill="url(#gWater)"/>' +
          '<g transform="translate(60,86) scale(0.6)"><use href="#palmGreen"/></g>' +
        "</svg>" +
      "</div>" +
      '<div class="news-body">' +
        '<h3 data-cms-field="title">' + esc(n.title || "") + "</h3>" +
        '<p data-cms-field="excerpt">' + esc(n.excerpt || "") + "</p>" +
      "</div>";
    return art;
  }

  /* ---- 6. Media (replace SVG illustrations with uploaded photos OR videos) ----
     Each slot stores a data URL (or a plain http(s) URL). A video is detected
     from a "data:video" prefix or a .mp4/.webm/.ogg extension. Photos are laid
     in as a cover background; videos as an autoplay-muted-loop layer that fills
     the container. The original SVG illustration is hidden once media is set. */
  function isVideo(src) {
    return /^data:video\//i.test(src) || /\.(mp4|webm|ogg|mov)(\?|#|$)/i.test(src);
  }

  function applyHeroVideo(content) {
    var v = document.querySelector(".hero-video");
    if (!v) return;
    var src = (content.images || {})["index.heroVideo"];
    if (!nonEmpty(src) || !isVideo(src)) return;   // keep the built-in media/hero.mp4
    // swap the source to the uploaded video, then restart muted+looping playback
    v.querySelectorAll("source").forEach(function (s) { s.parentNode.removeChild(s); });
    v.src = src;
    v.muted = true; v.loop = true;
    v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
    var p = v.play(); if (p && p.catch) p.catch(function () {});
  }

  function applyTourVideo(content) {
    var v = document.getElementById("vtVideo");
    if (!v) return;
    var src = (content.images || {})["index.tourVideo"];
    if (!nonEmpty(src) || !isVideo(src)) return;   // keep the built-in media/tour.mp4
    v.querySelectorAll("source").forEach(function (s) { s.parentNode.removeChild(s); });
    v.src = src;
    v.loop = true;
    v.setAttribute("playsinline", "");
    // playback (and sound) stays controlled by the page's scroll/observer logic
  }

  function applyMedia(content) {
    var imgs = content.images || {};
    document.querySelectorAll("[data-cms-img]").forEach(function (el) {
      var src = imgs[el.getAttribute("data-cms-img")];
      if (!nonEmpty(src)) return;            // no upload -> keep the illustration

      // Plain <img> targets only ever take a still image.
      if (el.tagName === "IMG") { el.src = src; return; }

      // Clear any media we set on a previous run (so re-publishing swaps cleanly).
      var prev = el.querySelector(":scope > .cms-media");
      if (prev) prev.parentNode.removeChild(prev);

      if (isVideo(src)) {
        if (getComputedStyle(el).position === "static") el.style.position = "relative";
        var v = document.createElement("video");
        v.className = "cms-media";
        v.src = src;
        v.autoplay = true; v.loop = true; v.muted = true;
        v.setAttribute("muted", "");          // iOS needs the attribute too
        v.setAttribute("playsinline", "");
        v.style.cssText = "position:absolute;inset:0;width:100%;height:100%;" +
                          "object-fit:cover;z-index:0;pointer-events:none;";
        el.style.backgroundImage = "";
        el.insertBefore(v, el.firstChild);
        var p = v.play(); if (p && p.catch) p.catch(function () {});
      } else {
        el.style.backgroundImage = "url(" + src + ")";
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = "center";
      }
      // Hide the built-in SVG illustration behind the new media.
      el.querySelectorAll(":scope > svg").forEach(function (svg) {
        svg.style.opacity = "0";
      });
      el.querySelectorAll("svg").forEach(function (svg) { svg.style.opacity = "0"; });
    });
  }

  /* ---- 7. Collections (editable built-ins + admin-added items) ----------
     Three kinds of editable structure live under content.collections:

       facilities[] / activities[] / bars[]   — small "feature" cards
         • Built-in cards in the HTML carry data-cms-card="<id>"; when the
           admin edits one, the matching item (same id) overrides its title,
           description and icon in place.
         • Admin-added cards (id not present in the HTML) are appended to the
           grid after the built-ins, optionally with an uploaded photo.

       facilityDetails[] / restaurants[]       — large split-section blocks
         • Built-in blocks carry data-cms-detail="<id>"; editing one overrides
           its eyebrow / title / description (and photo, via data-cms-img).
         • Admin-added blocks are appended to the host (data-cms-detail-host)
           as a fresh split-section, alternating image side, with a photo or a
           tidy "Photo coming soon" placeholder.

       schedule[]                               — weekly timetable
         • The 7 day-cards are pre-built in the HTML; editing a day rebuilds
           that one card's slots in place. (Days aren't added or removed.)
  */
  var FEATURE_COLLECTIONS = { facilities: 1, activities: 1, bars: 1 };
  var DETAIL_HOSTS = { facilityDetails: 1, restaurants: 1 };

  function ensureCollectionStyles() {
    if (document.getElementById("cms-collection-styles")) return;
    var s = document.createElement("style");
    s.id = "cms-collection-styles";
    s.textContent =
      // appended feature cards (with optional photo on top)
      ".feature.cms-feature{padding:0;overflow:hidden;text-align:center}" +
      ".feature.cms-feature .cms-feat-inner{padding:40px 26px}" +
      ".cms-feat-photo{display:block;width:100%;height:170px;object-fit:cover}" +
      ".cms-feat-photo.is-ph{display:flex;align-items:center;justify-content:center;" +
        "background:repeating-linear-gradient(45deg,rgba(197,214,59,.10),rgba(197,214,59,.10) 12px,rgba(197,214,59,.18) 12px,rgba(197,214,59,.18) 24px);" +
        "color:var(--lime-deep,#9CAB2A);font-weight:700;font-size:.8rem;letter-spacing:.04em}" +
      ".cms-feat-photo.is-ph i{margin-right:8px;font-size:1.1rem}" +
      // appended split-section placeholder image
      ".split-img .cms-detail-ph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:10px;" +
        "color:var(--lime-deep,#9CAB2A);font-weight:700;font-size:.95rem;letter-spacing:.04em;" +
        "background:repeating-linear-gradient(45deg,rgba(197,214,59,.12),rgba(197,214,59,.12) 16px,rgba(197,214,59,.22) 16px,rgba(197,214,59,.22) 32px)}" +
      ".split-img .cms-detail-ph i{font-size:1.3rem}";
    document.head.appendChild(s);
  }

  /* set the text of a built-in field element, preserving the styled <em> accent
     when the value still matches what's already shown (so we don't flatten it) */
  function overrideText(el, value) {
    if (!el || !nonEmpty(value)) return;
    if (el.textContent.trim() === value.trim()) return; // unchanged — keep markup
    el.textContent = value;
  }

  /* --- small feature cards (facilities / activities / bars) --- */
  function buildFeatureCard(item) {
    var fig = document.createElement("div");
    fig.className = "feature cms-feature";
    var html = nonEmpty(item.image)
      ? '<img class="cms-feat-photo" src="' + esc(item.image) + '" alt="' + esc(item.title || "") + '">'
      : '<div class="cms-feat-photo is-ph"><i class="fas fa-image"></i>Photo coming soon</div>';
    html += '<div class="cms-feat-inner">' +
              '<div class="feature-icon"><i class="fas ' + esc(item.icon || "fa-star") + '" style="font-size:2rem"></i></div>' +
              "<h3>" + esc(item.title || "") + "</h3>" +
              "<p>" + esc(item.desc || "") + "</p>" +
            "</div>";
    fig.innerHTML = html;
    return fig;
  }

  function applyFeatureCollection(host, name, items) {
    var byId = {};
    items.forEach(function (it) { if (it.id != null) byId[String(it.id)] = it; });

    // 1) edit built-ins in place
    host.querySelectorAll(":scope > [data-cms-card]").forEach(function (card) {
      var it = byId[card.getAttribute("data-cms-card")];
      if (!it) return;
      overrideText(card.querySelector('[data-cms-card-field="title"]'), it.title);
      overrideText(card.querySelector('[data-cms-card-field="desc"]'), it.desc);
      if (nonEmpty(it.icon)) {
        var ic = card.querySelector("[data-cms-card-icon]");
        if (ic) ic.className = "fas " + it.icon;
      }
    });

    // 2) append admin-added ones (those whose id has no built-in card)
    host.querySelectorAll(":scope > .cms-feature").forEach(function (n) { n.remove(); });
    var builtinIds = {};
    host.querySelectorAll(":scope > [data-cms-card]").forEach(function (c) { builtinIds[c.getAttribute("data-cms-card")] = 1; });
    var added = items.filter(function (it) { return !builtinIds[String(it.id)]; });
    if (added.length) ensureCollectionStyles();
    added.forEach(function (it) { host.appendChild(buildFeatureCard(it)); });
  }

  /* --- restaurant photo slider ---------------------------------------
     Builds a .rest-slider (2–5 slides) for a restaurant block. The
     transition style is chosen by the block's index so neighbouring
     restaurants animate differently. Returns "" when there are <2 photos
     (caller then falls back to the single-image / illustration path). */
  var REST_TRANSITIONS = ["rs-fade", "rs-slide", "rs-kenburns", "rs-vertical", "rs-zoom"];

  function restaurantSlides(item) {
    /* Accept either an images[] array (new) or a single image (legacy). Keep
       only non-empty still-image sources, capped at 5. */
    var list = [];
    if (item && Array.isArray(item.images)) list = item.images.slice();
    if (!list.length && item && nonEmpty(item.image)) list = [item.image];
    return list.filter(function (s) { return nonEmpty(s) && !isVideo(s); }).slice(0, 5);
  }

  function buildSliderHtml(slides, index) {
    if (!slides || slides.length < 2) return "";
    var style = REST_TRANSITIONS[index % REST_TRANSITIONS.length];
    var slideHtml = "";
    slides.forEach(function (src, i) {
      slideHtml += '<div class="rest-slide' + (i === 0 ? " is-active" : "") +
        '" style="background-image:url(' + esc(src) + ')"></div>';
    });
    var dots = "";
    slides.forEach(function (_, i) {
      dots += '<button class="' + (i === 0 ? "on" : "") + '" aria-label="Go to photo ' + (i + 1) + '"></button>';
    });
    return '<div class="rest-slider ' + style + '">' + slideHtml +
      '<button class="rest-arrow prev" aria-label="Previous photo"><i class="fas fa-chevron-left"></i></button>' +
      '<button class="rest-arrow next" aria-label="Next photo"><i class="fas fa-chevron-right"></i></button>' +
      '<div class="rest-dots">' + dots + "</div></div>";
  }

  /* Replace a built-in block's .split-img content with a slider (keeping its
     corner tag). No-op when the restaurant has fewer than 2 photos. */
  function applyRestaurantSlider(block, item, index) {
    var slides = restaurantSlides(item);
    if (slides.length < 2) return false;
    var imgBox = block.querySelector(".split-img");
    if (!imgBox) return false;
    if (getComputedStyle(imgBox).position === "static") imgBox.style.position = "relative";
    // remove any slider we built on a previous run
    var old = imgBox.querySelector(":scope > .rest-slider");
    if (old) old.parentNode.removeChild(old);
    // hide the built-in illustration / any background image behind the slider
    imgBox.querySelectorAll(":scope > svg").forEach(function (svg) { svg.style.opacity = "0"; });
    imgBox.style.backgroundImage = "";
    var tag = imgBox.querySelector(".split-img-tag");
    imgBox.insertAdjacentHTML("afterbegin", buildSliderHtml(slides, index));
    if (tag) imgBox.appendChild(tag); // keep tag on top of the slider
    return true;
  }

  /* --- large split-section detail blocks (facility details / restaurants) --- */
  function buildDetailBlock(item, reverse) {
    var section = document.createElement("section");
    section.className = "split-section cms-detail";
    var imgInner = nonEmpty(item.image)
      ? '<img src="' + esc(item.image) + '" style="width:100%;height:100%;object-fit:cover;display:block">'
      : '<div class="cms-detail-ph"><i class="fas fa-image"></i>Photo coming soon</div>';
    var tagHtml = nonEmpty(item.tag) ? '<span class="split-img-tag">' + esc(item.tag) + "</span>" : "";
    var listHtml = "";
    (item.points || []).forEach(function (p) {
      if (!nonEmpty(p.strong) && !nonEmpty(p.small)) return;
      listHtml += '<li><div class="split-list-icon"><i class="fas ' + esc(p.icon || "fa-check") + '"></i></div>' +
                  '<div class="split-list-content"><strong>' + esc(p.strong || "") + "</strong>" +
                  '<small>' + esc(p.small || "") + "</small></div></li>";
    });
    section.innerHTML =
      '<div class="split-grid' + (reverse ? " reverse" : "") + '">' +
        '<div class="split-img" style="position:relative">' + imgInner + tagHtml + "</div>" +
        '<div class="split-text">' +
          (nonEmpty(item.eyebrow) ? '<span class="eyebrow">' + esc(item.eyebrow) + "</span>" : "") +
          "<h2>" + esc(item.title || "") + "</h2>" +
          (nonEmpty(item.desc) ? "<p>" + esc(item.desc) + "</p>" : "") +
          (listHtml ? '<ul class="split-list">' + listHtml + "</ul>" : "") +
        "</div>" +
      "</div>";
    return section;
  }

  function applyDetailHost(host, name, items) {
    var byId = {};
    items.forEach(function (it) { if (it.id != null) byId[String(it.id)] = it; });
    var isRest = (name === "restaurants");

    // 1) edit built-in blocks in place
    var builtins = host.querySelectorAll(":scope > [data-cms-detail]");
    var builtinIds = {};
    builtins.forEach(function (block, bi) {
      var id = block.getAttribute("data-cms-detail");
      builtinIds[id] = 1;
      var it = byId[id];
      if (!it) return;
      overrideText(block.querySelector('[data-cms-detail-field="eyebrow"]'), it.eyebrow);
      overrideText(block.querySelector('[data-cms-detail-field="title"]'), it.title);
      overrideText(block.querySelector('[data-cms-detail-field="desc"]'), it.desc);
      // photo: a single photo still flows through applyMedia (data-cms-img);
      // two or more photos become an animated slider in the .split-img box.
      if (isRest) applyRestaurantSlider(block, it, bi);
    });

    // 2) append admin-added blocks, alternating image side after the built-ins
    host.querySelectorAll(":scope > .cms-detail").forEach(function (n) { n.remove(); });
    var added = items.filter(function (it) { return !builtinIds[String(it.id)]; });
    if (added.length) ensureCollectionStyles();
    var baseCount = builtins.length;
    added.forEach(function (it, i) {
      var block = buildDetailBlock(it, (baseCount + i) % 2 === 1);
      host.appendChild(block);
      if (isRest) applyRestaurantSlider(block, it, baseCount + i);
    });

    // 3) (re)wire the slider engine for any sliders we just built
    if (isRest && typeof window.initRestaurantSliders === "function") {
      try { window.initRestaurantSliders(); } catch (e) {}
    }
  }

  /* --- weekly timetable (edit each day's slots in place) --- */
  function applySchedule(host, days) {
    if (!days.length) return; // nothing edited — keep the pre-built week
    var byDay = {};
    days.forEach(function (d) { if (nonEmpty(d.day)) byDay[d.day.toLowerCase()] = d; });
    host.querySelectorAll(":scope > .week-card").forEach(function (card) {
      var head = card.querySelector(".week-day");
      if (!head) return;
      var d = byDay[head.textContent.trim().toLowerCase()];
      if (!d || !Array.isArray(d.slots)) return;
      // rebuild this card's slots, keeping the day heading
      card.querySelectorAll(".week-slot").forEach(function (s) { s.remove(); });
      d.slots.forEach(function (slot) {
        if (!nonEmpty(slot.label) && !nonEmpty(slot.text)) return;
        var ev = /evening|night/i.test(slot.label || "");
        var row = document.createElement("div");
        row.className = "week-slot";
        row.innerHTML =
          '<span class="slot-label' + (ev ? " evening" : "") + '">' + esc(slot.label || "") + "</span>" +
          '<span class="week-slot-text' + (ev ? " evening" : "") + '">' + esc(slot.text || "") + "</span>";
        card.appendChild(row);
      });
    });
  }

  function applyCollections(content) {
    var col = content.collections || {};

    document.querySelectorAll("[data-cms-collection]").forEach(function (host) {
      var name = host.getAttribute("data-cms-collection");
      var items = Array.isArray(col[name]) ? col[name] : [];
      if (name === "schedule") { applySchedule(host, items); return; }
      if (FEATURE_COLLECTIONS[name]) { applyFeatureCollection(host, name, items); }
    });

    document.querySelectorAll("[data-cms-detail-host]").forEach(function (host) {
      var name = host.getAttribute("data-cms-detail-host");
      if (!DETAIL_HOSTS[name]) return;
      var items = Array.isArray(col[name]) ? col[name] : [];
      applyDetailHost(host, name, items);
    });
  }

  /* ---- 8. Gallery (editable pills + tiles, with sub-category filtering) ----
     content.gallery = { pills:[{id,label}], tiles:[{id,label,cat,image}] }.
     Built-in pills/tiles carry data-cms-pill / data-cms-tile with the same id
     and are overridden in place; new ones append. cat is the filter id a tile
     belongs to (matches a pill's id / data-filter). After (re)building, the
     gallery page's own initGallery() is called to (re)wire filters + lightbox. */
  function buildPill(p) {
    var b = document.createElement("button");
    b.className = "gallery-pill cms-pill";
    b.setAttribute("data-filter", p.id);
    b.setAttribute("data-cms-pill", p.id);
    b.textContent = p.label || p.id;
    return b;
  }
  function buildTile(t) {
    var tile = document.createElement("div");
    tile.className = "gallery-tile cms-tile";
    tile.setAttribute("data-cat", t.cat || "");
    tile.setAttribute("data-cms-tile", String(t.id));
    var scene = nonEmpty(t.image)
      ? '<div class="gallery-tile-scene" style="background:url(' + esc(t.image) + ') center/cover no-repeat;min-height:220px"></div>'
      : '<div class="gallery-tile-scene" style="min-height:220px;display:flex;align-items:center;justify-content:center;' +
        'background:repeating-linear-gradient(45deg,rgba(197,214,59,.12),rgba(197,214,59,.12) 16px,rgba(197,214,59,.22) 16px,rgba(197,214,59,.22) 32px);' +
        'color:var(--lime-deep,#9CAB2A);font-weight:700"><i class="fas fa-image" style="margin-right:8px"></i>Photo coming soon</div>';
    tile.innerHTML = scene +
      '<span class="gallery-tile-label">' + esc(t.label || "") + "</span>" +
      '<span class="gallery-tile-zoom"><i class="fas fa-expand"></i></span>';
    return tile;
  }

  function applyGallery(content) {
    var g = content.gallery || {};
    var pills = Array.isArray(g.pills) ? g.pills : [];
    var tiles = Array.isArray(g.tiles) ? g.tiles : [];

    // --- pills ---
    var pillHost = document.querySelector("[data-cms-gallery-pills]");
    if (pillHost && pills.length) {
      var pById = {};
      pills.forEach(function (p) { pById[String(p.id)] = p; });
      // edit built-ins in place
      var builtinPillIds = {};
      pillHost.querySelectorAll(":scope > [data-cms-pill]").forEach(function (b) {
        var id = b.getAttribute("data-cms-pill");
        builtinPillIds[id] = 1;
        var p = pById[id];
        if (p && nonEmpty(p.label)) b.textContent = p.label;
      });
      // append new ones
      pillHost.querySelectorAll(":scope > .cms-pill").forEach(function (n) { n.remove(); });
      pills.forEach(function (p) { if (!builtinPillIds[String(p.id)]) pillHost.appendChild(buildPill(p)); });
    }

    // --- tiles ---
    var grid = document.querySelector("[data-cms-gallery-grid]");
    if (grid && tiles.length) {
      var tById = {};
      tiles.forEach(function (t) { tById[String(t.id)] = t; });
      var builtinTileIds = {};
      grid.querySelectorAll(":scope > [data-cms-tile]").forEach(function (tile) {
        var id = tile.getAttribute("data-cms-tile");
        builtinTileIds[id] = 1;
        var t = tById[id];
        if (!t) return;
        if (nonEmpty(t.cat)) tile.setAttribute("data-cat", t.cat);
        var lab = tile.querySelector(".gallery-tile-label");
        if (lab && nonEmpty(t.label)) lab.textContent = t.label;
        // photo handled by applyMedia via data-cms-img on built-in tiles
      });
      grid.querySelectorAll(":scope > .cms-tile").forEach(function (n) { n.remove(); });
      tiles.forEach(function (t) { if (!builtinTileIds[String(t.id)]) grid.appendChild(buildTile(t)); });
    }

    // re-wire the gallery page's filters + lightbox for any new elements
    if ((pillHost || grid) && typeof window.initGallery === "function") {
      try { window.initGallery(); } catch (e) {}
    }
  }

  /* ---- 9. Testimonials ("What our guests say") ----
     content.testimonials = [{id,name,where,quote,stars}]. Built-in cards carry
     data-cms-testi="<id>" and are overridden in place; new ones append. Stars
     is a 1–5 count rendered as ★ glyphs. Avatar is the name's first letter. */
  function starString(n) {
    n = Math.max(0, Math.min(5, parseInt(n, 10) || 5));
    var out = [];
    for (var i = 0; i < n; i++) out.push("\u2605");
    return out.join(" ");
  }
  function avatarFor(name) {
    var s = (name || "").trim();
    return s ? s.charAt(0).toUpperCase() : "?";
  }
  function fillTesti(card, t) {
    var q = card.querySelector('[data-cms-testi-field="quote"]');
    if (q && nonEmpty(t.quote)) {
      var quote = t.quote.trim();
      if (quote.charAt(0) !== '"') quote = '"' + quote + '"';
      q.textContent = quote;
    }
    var nm = card.querySelector('[data-cms-testi-field="name"]');
    if (nm && nonEmpty(t.name)) nm.textContent = t.name;
    var wh = card.querySelector('[data-cms-testi-field="where"]');
    if (wh && nonEmpty(t.where)) wh.textContent = t.where;
    var st = card.querySelector('[data-cms-testi-field="stars"]');
    if (st && t.stars != null) st.textContent = starString(t.stars);
    var av = card.querySelector('[data-cms-testi-field="avatar"]');
    if (av) av.textContent = avatarFor(t.name);
  }
  function buildTestiCard(t) {
    var card = document.createElement("div");
    card.className = "testi-card cms-testi";
    var quote = (t.quote || "").trim();
    if (quote && quote.charAt(0) !== '"') quote = '"' + quote + '"';
    card.innerHTML =
      '<div class="testi-stars" data-cms-testi-field="stars">' + starString(t.stars) + "</div>" +
      '<blockquote data-cms-testi-field="quote">' + esc(quote) + "</blockquote>" +
      '<div class="testi-author">' +
        '<div class="av" data-cms-testi-field="avatar">' + esc(avatarFor(t.name)) + "</div>" +
        '<div><div class="who" data-cms-testi-field="name">' + esc(t.name || "") + "</div>" +
        '<div class="where" data-cms-testi-field="where">' + esc(t.where || "") + "</div></div>" +
      "</div>";
    return card;
  }
  function applyTestimonials(content) {
    var grid = document.querySelector("[data-cms-testi-grid]");
    if (!grid) return;
    var items = Array.isArray(content.testimonials) ? content.testimonials : [];
    if (!items.length) return;
    var byId = {};
    items.forEach(function (t) { byId[String(t.id)] = t; });
    // edit built-ins in place
    var builtinIds = {};
    grid.querySelectorAll(":scope > [data-cms-testi]").forEach(function (card) {
      var id = card.getAttribute("data-cms-testi");
      builtinIds[id] = 1;
      var t = byId[id];
      if (t) fillTesti(card, t);
    });
    // append new ones
    grid.querySelectorAll(":scope > .cms-testi").forEach(function (n) { n.remove(); });
    items.forEach(function (t) { if (!builtinIds[String(t.id)]) grid.appendChild(buildTestiCard(t)); });
  }

  /* ---- 10. Booking engine URL (used by each page's booking modal) ---- */
  function applyBookingUrl(content) {
    if (content.global && nonEmpty(content.global.bookingUrl)) {
      window.GBR_BOOKING_URL = content.global.bookingUrl;
    }
  }

  function applyAll(content) {
    if (!content) return; // no edits yet — site shows its built-in defaults
    applyBookingUrl(content); // set before any user interaction
    applyText(content);
    applyHrefs(content);
    applyHeroTitle(content);
    applyHeroVideo(content);
    applyTourVideo(content);
    applyRooms(content);
    applyNews(content);
    applyMedia(content);
    applyCollections(content);
    applyGallery(content);
    applyTestimonials(content);
  }

  function run() {
    var loaded = loadContent();
    if (loaded && typeof loaded.then === "function") {
      loaded.then(applyAll).catch(function () {}); // API down -> built-in defaults
    } else {
      applyAll(loaded);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
