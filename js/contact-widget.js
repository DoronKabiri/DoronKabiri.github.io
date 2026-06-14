/* Floating WhatsApp button (desktop) + sticky contact bar (mobile).
   Self-contained: injects its own CSS + HTML into every page.
   Single source of truth — included on all pages via <script src=".../js/contact-widget.js" defer>.

   To change the numbers, edit the three constants below only. */
(function () {
  "use strict";

  // --- Configuration (the ONLY thing to edit to change numbers/text) ---
  var WHATSAPP_NUMBER = "972506171131";              // 050-6171131 in international format
  var CALL_NUMBER = "02-6778899";                    // ש"רפ office / appointments line
  var WHATSAPP_TEXT = "שלום, הגעתי דרך האתר ואשמח לתאם ייעוץ עם ד״ר כבירי";

  if (window.__kabiriContactWidget) return;          // guard against double-injection
  window.__kabiriContactWidget = true;

  var waHref = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_TEXT);
  var telHref = "tel:" + CALL_NUMBER;

  // --- Styles ---
  var css = "" +
    ".kc-fab{position:fixed;bottom:24px;right:24px;z-index:9998;width:60px;height:60px;border-radius:50%;" +
      "background:#25D366;color:#fff;display:flex;align-items:center;justify-content:center;" +
      "box-shadow:0 4px 14px rgba(0,0,0,.25);text-decoration:none;transition:transform .2s ease,box-shadow .2s ease;}" +
    ".kc-fab:hover,.kc-fab:focus{transform:scale(1.08);box-shadow:0 6px 20px rgba(37,211,102,.45);color:#fff;text-decoration:none;}" +
    ".kc-fab i{font-size:32px;line-height:1;}" +
    ".kc-fab__label{position:absolute;right:72px;background:#222;color:#fff;font-family:'Assistant',Arial,sans-serif;" +
      "font-size:14px;font-weight:600;padding:7px 12px;border-radius:8px;white-space:nowrap;opacity:0;pointer-events:none;" +
      "transition:opacity .2s ease;direction:rtl;}" +
    ".kc-fab:hover .kc-fab__label{opacity:1;}" +
    ".kc-bar{display:none;}" +
    "@media (max-width:768px){" +
      ".kc-fab{display:none;}" +
      ".kc-bar{display:flex;position:fixed;bottom:0;left:0;right:0;z-index:9998;direction:rtl;" +
        "box-shadow:0 -2px 12px rgba(0,0,0,.18);font-family:'Assistant','Arial Hebrew',Arial,sans-serif;}" +
      ".kc-bar a{flex:1 1 0;display:flex;align-items:center;justify-content:center;gap:8px;" +
        "padding:15px 8px;font-size:17px;font-weight:700;text-decoration:none;color:#fff;}" +
      ".kc-bar a:active{opacity:.85;}" +
      ".kc-bar__wa{background:#25D366;}" +
      ".kc-bar__call{background:#5a2e6f;}" +
      ".kc-bar i{font-size:20px;}" +
      "body{padding-bottom:58px !important;}" +
    "}" +
    "@media print{.kc-fab,.kc-bar{display:none !important;}}";

  var style = document.createElement("style");
  style.setAttribute("data-kc", "1");
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);

  // --- Markup ---
  function build() {
    // Desktop floating WhatsApp button
    var fab = document.createElement("a");
    fab.className = "kc-fab";
    fab.href = waHref;
    fab.target = "_blank";
    fab.rel = "noopener noreferrer";
    fab.setAttribute("aria-label", "פנייה ב-WhatsApp לד״ר כבירי");
    fab.innerHTML = '<i class="fa fa-whatsapp" aria-hidden="true"></i>' +
      '<span class="kc-fab__label">דברו איתי ב-WhatsApp</span>';

    // Mobile sticky bar
    var bar = document.createElement("div");
    bar.className = "kc-bar";
    bar.setAttribute("role", "navigation");
    bar.setAttribute("aria-label", "יצירת קשר מהירה");
    bar.innerHTML =
      '<a class="kc-bar__wa" href="' + waHref + '" target="_blank" rel="noopener noreferrer">' +
        '<i class="fa fa-whatsapp" aria-hidden="true"></i> וואטסאפ</a>' +
      '<a class="kc-bar__call" href="' + telHref + '">' +
        '<i class="fa fa-phone" aria-hidden="true"></i> חיוג</a>';

    document.body.appendChild(fab);
    document.body.appendChild(bar);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
