/* ============================================================
   Golden Beach Resort — SEO engine (shared, no DOM)
   ------------------------------------------------------------
   ONE place to edit SEO. Used by:
     • seo.js        (front-end: writes the tags into each page's <head>)
     • admin.html    (SEO panel: preview + regenerate on Publish)

   It DERIVES SEO from the live CMS content object, so when the
   admin edits a price, a description, a phone number, etc. and
   publishes, the SEO recalculates from the new content automatically.

   >>> EDIT THE `SITE` BLOCK BELOW BEFORE GO-LIVE <<<
   ============================================================ */
(function (root) {
  "use strict";

  /* ---------------------------------------------------------
     1. SITE-WIDE CONSTANTS  — confirm/replace for go-live
     --------------------------------------------------------- */
  var SITE = {
    base:   "https://www.goldenbeachresort.net",  // confirm www vs non-www + https
    ogImage:"/og-image.jpg",                       // 1200x630 share image
    name:   "Golden Beach Resort",
    legalName: "Golden Beach Resort Hurghada",
    phone:  "+20 65 350 2053",                     // fallback if CMS empty
    email:  "info@goldenbeachresort.net",          // fallback if CMS empty
    street: "Northwest Hurghada, Red Sea Coast",
    locality: "Hurghada",
    region: "Red Sea Governorate",
    country:"EG",
    postal: "",                                    // add if available
    lat:    27.40,                                 // APPROX — set exact coords
    lng:    33.68,                                 // APPROX — set exact coords
    stars:  4,                                     // official star rating
    priceRange: "$$",
    founded:"1994",
    amenities: ["Private beach","Six swimming pools","Aqua park","Free WiFi",
                "Restaurants and bars","Air conditioning","Daily entertainment",
                "Water sports","Family rooms","Airport transfer"]
  };

  /* ---------------------------------------------------------
     2. PER-PAGE DEFAULTS
        title / desc are fallbacks; live content overrides them.
        trail = breadcrumb after Home; kind = structured-data type
     --------------------------------------------------------- */
  var HOME_DESC = "Golden Beach Resort is a contemporary beachfront hotel on " +
    "Hurghada's Red Sea coast with six pools, an aqua park, a private beach and " +
    "seven room categories. Book your Egypt holiday direct.";

  // filename (without .html) -> room id in content.rooms
  var ROOM_IDS = {
    "room-economy-room":"economy", "room-standard-room":"standard",
    "room-standard-family-room":"standardfamily",
    "room-family-room-connected":"familyconnected",
    "room-sea-view-room":"seaview", "room-sea-side-view-room":"seaside",
    "room-premium-room":"premium"
  };

  function room(label, desc) {
    return { title: label + " | Golden Beach Resort Hurghada",
             desc: desc, trail: [["Rooms","rooms.html"]], kind: "room" };
  }

  var PAGES = {
    "index": { title:"Golden Beach Resort Hurghada | Red Sea Beachfront Hotel",
      desc: HOME_DESC, trail: [], kind:"home" },

    "about": { title:"About Us | Golden Beach Resort Hurghada, Red Sea",
      desc:"Discover Golden Beach Resort — a contemporary 4-star beachfront hotel " +
           "northwest of Hurghada on Egypt's Red Sea, welcoming guests since 1994.",
      trail:[["About","about.html"]], kind:"about" },

    "rooms": { title:"Rooms & Suites | Golden Beach Resort Hurghada",
      desc:"Seven room categories at Golden Beach Resort Hurghada, from Economy to " +
           "Premium and Sea View — air-conditioned comfort steps from the Red Sea.",
      trail:[["Rooms","rooms.html"]], kind:"page" },

    "room-economy-room": room("Economy Room",
      "The Economy Room at Golden Beach Resort Hurghada — comfortable, air-conditioned " +
      "accommodation with resort access to pools and private beach."),
    "room-standard-room": room("Standard Room",
      "The Standard Room at Golden Beach Resort Hurghada — bright, modern comfort with " +
      "full access to the resort's pools, aqua park and Red Sea beach."),
    "room-standard-family-room": room("Standard Family Room",
      "Spacious Standard Family Room at Golden Beach Resort Hurghada, ideal for families " +
      "enjoying the Red Sea, pools and aqua park."),
    "room-family-room-connected": room("Connected Family Room",
      "Connected Family Rooms at Golden Beach Resort Hurghada — two linked rooms giving " +
      "larger families space and flexibility by the Red Sea."),
    "room-sea-view-room": room("Sea View Room",
      "Wake to the Red Sea from a Sea View Room at Golden Beach Resort Hurghada, with a " +
      "private balcony overlooking turquoise water."),
    "room-sea-side-view-room": room("Sea Side View Room",
      "The Sea Side View Room at Golden Beach Resort Hurghada offers partial sea views " +
      "and easy access to the private beach and pools."),
    "room-premium-room": room("Premium Room",
      "The Premium Room at Golden Beach Resort Hurghada — the resort's most generous " +
      "accommodation with elevated finishes and prime Red Sea position."),

    "outlets": { title:"Restaurants & Bars | Golden Beach Resort Hurghada",
      desc:"Dining at Golden Beach Resort Hurghada — main buffet restaurant, à la carte " +
           "outlets, beach bars and cafés serving international and Egyptian cuisine.",
      trail:[["Dining","outlets.html"]], kind:"page" },
    "activities": { title:"Activities & Water Sports | Golden Beach Resort Hurghada",
      desc:"Snorkelling, diving, water sports, beach games and daytime activities for all " +
           "ages at Golden Beach Resort on Hurghada's Red Sea coast.",
      trail:[["Activities","activities.html"]], kind:"page" },
    "facilities": { title:"Pools, Aqua Park & Facilities | Golden Beach Resort",
      desc:"Six swimming pools, an aqua park, private beach, spa and family facilities at " +
           "Golden Beach Resort Hurghada on the Red Sea.",
      trail:[["Facilities","facilities.html"]], kind:"page" },
    "entertainment": { title:"Entertainment & Shows | Golden Beach Resort Hurghada",
      desc:"Live shows, evening entertainment, animation team and kids' programmes every " +
           "day at Golden Beach Resort Hurghada, Red Sea.",
      trail:[["Entertainment","entertainment.html"]], kind:"page" },
    "gallery": { title:"Photo Gallery | Golden Beach Resort Hurghada",
      desc:"Browse photos of Golden Beach Resort Hurghada — pools, private beach, rooms, " +
           "restaurants and the Red Sea setting.",
      trail:[["Gallery","gallery.html"]], kind:"page" },
    "news": { title:"News & Offers | Golden Beach Resort Hurghada",
      desc:"Latest news, special offers and updates from Golden Beach Resort on Hurghada's " +
           "Red Sea coast.",
      trail:[["News","news.html"]], kind:"page" },
    "contact": { title:"Contact & Location | Golden Beach Resort Hurghada",
      desc:"Contact Golden Beach Resort Hurghada — phone, email and directions. Northwest " +
           "of Hurghada, 20 km from Hurghada International Airport.",
      trail:[["Contact","contact.html"]], kind:"contact" }
  };

  var NOINDEX = { "admin": true, "_qa-preview": true };

  /* ---------------------------------------------------------
     3. HELPERS
     --------------------------------------------------------- */
  function clamp(s, n) {                 // trim a description to a clean length
    s = String(s || "").replace(/\s+/g, " ").trim();
    if (s.length <= n) return s;
    var cut = s.slice(0, n);
    var sp = cut.lastIndexOf(" ");
    return (sp > 40 ? cut.slice(0, sp) : cut).replace(/[,;:.\s]+$/, "") + "…";
  }
  function nonEmpty(v) { return typeof v === "string" && v.trim() !== ""; }
  function abs(path) {
    if (!path) return SITE.base + "/";
    if (/^https?:\/\//.test(path)) return path;
    return SITE.base + (path.charAt(0) === "/" ? "" : "/") + path;
  }
  function roomById(content, id) {
    if (!content || !Array.isArray(content.rooms)) return null;
    for (var i = 0; i < content.rooms.length; i++)
      if (content.rooms[i].id === id) return content.rooms[i];
    return null;
  }
  function g(content, field, fallback) {
    return (content && content.global && nonEmpty(content.global[field]))
      ? content.global[field].trim() : fallback;
  }
  function socials(content) {
    var out = [], keys = ["facebook","instagram","tiktok","youtube"];
    for (var i = 0; i < keys.length; i++) {
      var v = content && content.global && content.global[keys[i]];
      if (nonEmpty(v) && v.indexOf("...") === -1 && /^https?:\/\//.test(v)) out.push(v.trim());
    }
    return out;
  }

  function pageKeyFromPath(pathname) {
    var p = (String(pathname || "").split("/").pop() || "index.html").toLowerCase();
    p = p.replace(/\.html$/, "");
    return p || "index";
  }

  /* ---------------------------------------------------------
     4. CONTENT-DERIVED FIELDS
        Priority: admin override (content.seo) > live content > default
     --------------------------------------------------------- */
  function derivedTitle(content, key, def) {
    if (content && content.seo && content.seo[key] && nonEmpty(content.seo[key].title))
      return content.seo[key].title.trim();
    return def.title;
  }
  function derivedDesc(content, key, def) {
    // 1. explicit admin override
    if (content && content.seo && content.seo[key] && nonEmpty(content.seo[key].description))
      return clamp(content.seo[key].description, 165);
    // 2. live content
    if (key === "index") {
      var sub = content && content.pages && content.pages.index && content.pages.index.heroSubtitle;
      if (nonEmpty(sub)) return clamp(sub, 165);
    }
    if (ROOM_IDS[key]) {
      var r = roomById(content, ROOM_IDS[key]);
      if (r && nonEmpty(r.desc)) return clamp(r.desc, 165);
    }
    // 3. baked default
    return clamp(def.desc, 165);
  }

  /* ---------------------------------------------------------
     5. STRUCTURED DATA (JSON-LD @graph)
     --------------------------------------------------------- */
  var RESORT_ID = SITE.base + "/#resort";
  var ORG_ID    = SITE.base + "/#organization";
  var SITE_ID   = SITE.base + "/#website";

  function address() {
    var a = { "@type":"PostalAddress", streetAddress:SITE.street,
      addressLocality:SITE.locality, addressRegion:SITE.region, addressCountry:SITE.country };
    if (SITE.postal) a.postalCode = SITE.postal;
    return a;
  }
  function amenityList(names) {
    return names.map(function (n) {
      return { "@type":"LocationFeatureSpecification", name:n, value:true };
    });
  }
  function resortNode(content) {
    var node = { "@type":"Resort", "@id":RESORT_ID, name:SITE.name, legalName:SITE.legalName,
      url:SITE.base + "/", image:abs(SITE.ogImage), logo:SITE.base + "/apple-touch-icon.png",
      description:HOME_DESC, telephone:g(content,"phone",SITE.phone),
      email:g(content,"email",SITE.email), priceRange:SITE.priceRange,
      currenciesAccepted:"EUR, USD, EGP", address:address(),
      geo:{ "@type":"GeoCoordinates", latitude:SITE.lat, longitude:SITE.lng },
      starRating:{ "@type":"Rating", ratingValue:SITE.stars },
      amenityFeature:amenityList(SITE.amenities),
      checkinTime:"14:00", checkoutTime:"12:00", petsAllowed:false,
      foundingDate:SITE.founded, parentOrganization:{ "@id":ORG_ID } };
    var s = socials(content); if (s.length) node.sameAs = s;
    return node;
  }
  function orgNode(content) {
    var node = { "@type":"Organization", "@id":ORG_ID, name:SITE.name, url:SITE.base + "/",
      logo:{ "@type":"ImageObject", url:SITE.base + "/apple-touch-icon.png" },
      contactPoint:{ "@type":"ContactPoint", telephone:g(content,"phone",SITE.phone),
        contactType:"reservations", email:g(content,"email",SITE.email),
        availableLanguage:["en","de","ru"] } };
    var s = socials(content); if (s.length) node.sameAs = s;
    return node;
  }
  function siteNode() {
    return { "@type":"WebSite", "@id":SITE_ID, url:SITE.base + "/", name:SITE.name,
      inLanguage:"en", publisher:{ "@id":ORG_ID } };
  }
  function breadcrumb(trail) {
    var items = [{ "@type":"ListItem", position:1, name:"Home", item:SITE.base + "/" }];
    for (var i = 0; i < trail.length; i++)
      items.push({ "@type":"ListItem", position:i + 2, name:trail[i][0],
        item:SITE.base + "/" + trail[i][1] });
    return { "@type":"BreadcrumbList", itemListElement:items };
  }
  function roomNode(content, key, title, desc, canonical) {
    var node = { "@type":"HotelRoom", name:title.split(" |")[0], description:desc,
      url:canonical, containedInPlace:{ "@id":RESORT_ID },
      amenityFeature:amenityList(["Air conditioning","Private bathroom","TV","Free WiFi","Balcony"]) };
    var r = roomById(content, ROOM_IDS[key]);
    if (r && nonEmpty(r.name)) node.name = r.name;
    return node;
  }

  function jsonld(content, key, title, desc, def, canonical) {
    var graph;
    if (def.kind === "home") graph = [resortNode(content), orgNode(content), siteNode()];
    else if (def.kind === "contact") graph = [
      { "@type":"ContactPage", url:canonical, name:title.split(" |")[0], description:desc,
        about:{ "@id":RESORT_ID }, isPartOf:{ "@id":SITE_ID } }, breadcrumb(def.trail) ];
    else if (def.kind === "about") graph = [
      { "@type":"AboutPage", url:canonical, name:title.split(" |")[0], description:desc,
        about:{ "@id":RESORT_ID }, isPartOf:{ "@id":SITE_ID } }, breadcrumb(def.trail) ];
    else if (def.kind === "room") graph = [
      roomNode(content, key, title, desc, canonical), breadcrumb(def.trail) ];
    else graph = [
      { "@type":"WebPage", url:canonical, name:title.split(" |")[0], description:desc,
        isPartOf:{ "@id":SITE_ID }, about:{ "@id":RESORT_ID } }, breadcrumb(def.trail) ];
    return { "@context":"https://schema.org", "@graph":graph };
  }

  /* ---------------------------------------------------------
     6. PUBLIC API:  GBR_SEO.compute(content, pageKey)
     --------------------------------------------------------- */
  function compute(content, key) {
    key = key || "index";
    var indexable = !NOINDEX[key];
    var def = PAGES[key] || { title:SITE.name, desc:"", trail:[], kind:"page" };
    var canonical = (key === "index") ? SITE.base + "/" : SITE.base + "/" + key + ".html";
    var title = derivedTitle(content, key, def);
    var desc  = indexable ? derivedDesc(content, key, def) : "";

    var out = {
      key: key, indexable: indexable, canonical: canonical,
      robots: indexable
        ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        : "noindex, nofollow",
      title: title, description: desc,
      ogImage: abs(SITE.ogImage),
      jsonld: indexable ? jsonld(content, key, title, desc, def, canonical) : null
    };
    return out;
  }

  root.GBR_SEO = {
    SITE: SITE,
    PAGES: PAGES,
    compute: compute,
    pageKeyFromPath: pageKeyFromPath,
    // list of page keys the admin can preview (indexable only)
    indexablePages: Object.keys(PAGES)
  };

})(typeof window !== "undefined" ? window : this);
