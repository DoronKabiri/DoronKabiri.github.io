/* Package 3: sticky header shrink-on-scroll + hardened mobile menu.
   Self-contained: injects its own CSS + markup, no page-markup edits needed.
   Included on all pages via <script src=".../js/kb-header.js" defer>.

   What it does:
   1. Shrink-on-scroll: adds .kb-shrunk to .fixedmenu after 80px of scroll
      (rAF-throttled passive listener). The legacy handler in common.js
      (line ~550) still toggles .fixedmenu.tiny at ANY scroll; instead of
      editing common.js, the injected CSS below neutralizes the .tiny
      rules by restoring their default values, so .kb-shrunk is the only
      visible shrink mechanism. Respects prefers-reduced-motion.
   2. Mobile menu (<=950px, matching the breakpoint where style.css hides
      #main-menu): hides the legacy tinyNav <select> strip, renders a
      hamburger button in the header and a full-screen RTL panel cloned
      from the existing #main-menu links. Focus is moved into the panel on
      open, trapped while open, Escape closes and returns focus to the
      button; aria-expanded/aria-controls kept in sync; body scroll locked.
      NOTE the 950px breakpoint (not 860px): style.css hides #main-menu at
      max-width:950px, so a smaller breakpoint would leave 861-950px with
      no menu at all.
   3. Widget suppression: while the panel is open, body.kb-menu-open hides
      the WhatsApp FAB (.kc-fab) and the mobile sticky bar (.kc-bar) from
      contact-widget.js, so the two contact buttons at the bottom of the
      panel are the only CTAs on screen (at most 2 CTAs per screen state).
   4. Contrast mode: the accessibility toggle adds .contrastDone to the
      header row (.row.changeContrast). A MutationObserver mirrors that
      state to body.kb-contrast so the injected header/panel elements get
      black-background/white-text rules matching accessibility-menu.css.
      No !important font-size anywhere (the a11y font buttons set inline
      font sizes and must keep working). */
(function () {
  "use strict";

  if (window.__kabiriHeader) return;            // guard against double-injection
  window.__kabiriHeader = true;

  var BP = 950;                                  // matches style.css #main-menu hide
  var SHRINK_AT = 80;                            // px of scroll before compacting

  // Same contact targets as js/contact-widget.js (kept in sync manually;
  // the widget does not export them).
  var WHATSAPP_NUMBER = "972506171131";
  var CALL_NUMBER = "02-6778899";
  var WHATSAPP_TEXT = "שלום, הגעתי דרך האתר וברצוני לתאם ייעוץ עם ד״ר כבירי";
  var waHref = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_TEXT);

  /* ---------------- CSS ---------------- */
  var css = "" +
    /* -- neutralize legacy .tiny shrink (common.js toggles it at any scroll;
          values below restore the non-tiny defaults from style.css) -- */
    ".fixedmenu.tiny{padding:10px 0;}" +
    ".fixedmenu.tiny a.navbar-brand{color:#444;font-size:30px;}" +
    ".fixedmenu.tiny a.navbar-brand img{max-width:none;margin-top:-15px;}" +
    ".fixedmenu.tiny .navbar-collapse .nav>li>a{padding-bottom:25px;}" +

    /* -- kb shrink state (desktop + mobile): cream, slightly translucent,
          soft shadow; .fixedmenu already transitions all .4s -- */
    ".fixedmenu.kb-shrunk{padding:4px 0;background:rgba(253,251,249,.93);" +
      "-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);" +
      "box-shadow:0 2px 16px rgba(90,46,111,.14);}" +
    ".fixedmenu.kb-shrunk a.navbar-brand img{max-width:86%;}" +
    ".fixedmenu.kb-shrunk .navbar-collapse .nav>li>a{padding-bottom:20px;}" +
    "@media (prefers-reduced-motion:reduce){" +
      ".fixedmenu,.fixedmenu a.navbar-brand,.kb-mnav-btn span{transition:none!important;}" +
    "}" +

    /* -- hamburger button (hidden on desktop) -- */
    ".kb-mnav-btn{display:none;position:absolute;left:10px;top:50%;" +
      "transform:translateY(-50%);width:48px;height:48px;padding:0;margin:0;" +
      "background:transparent;border:1px solid #c9b3d8;border-radius:10px;" +
      "cursor:pointer;z-index:5;" +
      "flex-direction:column;align-items:center;justify-content:center;gap:5px;}" +
    ".kb-mnav-btn span{display:block;width:22px;height:2px;background:#5a2e6f;" +
      "border-radius:2px;transition:transform .25s ease,opacity .25s ease;}" +
    ".kb-mnav-btn.kb-open span:nth-child(1){transform:translateY(7px) rotate(45deg);}" +
    ".kb-mnav-btn.kb-open span:nth-child(2){opacity:0;}" +
    ".kb-mnav-btn.kb-open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}" +
    ".kb-mnav-btn:focus-visible{outline:3px solid #8a5fa4;outline-offset:2px;}" +

    /* -- full-screen panel: fixed under the header (top set inline at open),
          above the contact widget (9998) and below the header (10000) -- */
    ".kb-mnav-panel{display:none;position:fixed;top:0;left:0;right:0;bottom:0;" +
      "z-index:9999;background:#fdfbf9;overflow-y:auto;direction:rtl;" +
      "-webkit-overflow-scrolling:touch;padding:12px 18px 24px;}" +
    "body.kb-menu-open .kb-mnav-panel{display:block;}" +
    "body.kb-menu-open{overflow:hidden;}" +
    ".kb-mnav-panel ul{list-style:none;margin:0;padding:0;}" +
    ".kb-mnav-panel a{display:block;padding:14px 12px;font-size:19px;font-weight:600;" +
      "color:#402051;text-decoration:none;border-bottom:1px solid #ece2f2;" +
      "border-right:3px solid transparent;font-family:'Assistant','Arial Hebrew',Arial,sans-serif;}" +
    ".kb-mnav-panel a.kb-mnav-sub{padding-right:32px;font-weight:400;font-size:17px;}" +
    ".kb-mnav-panel a.kb-current{color:#5a2e6f;background:#ece2f2;border-right-color:#5a2e6f;}" +
    ".kb-mnav-panel a:focus-visible{outline:3px solid #8a5fa4;outline-offset:-3px;}" +
    /* the two contact CTAs at the panel foot: the ONLY CTAs while open */
    ".kb-mnav-ctas{display:flex;gap:10px;margin-top:18px;}" +
    ".kb-mnav-ctas a{flex:1 1 0;display:flex;align-items:center;justify-content:center;gap:8px;" +
      "border-bottom:0;border-right:0;border-radius:10px;text-align:center;" +
      "padding:14px 8px;font-size:17px;font-weight:700;color:#fff;}" +
    ".kb-mnav-ctas .kb-mnav-wa{background:#1f9d61;}" +
    ".kb-mnav-ctas .kb-mnav-tel{background:#5a2e6f;}" +

    /* -- mobile layout -- */
    "@media (max-width:" + BP + "px){" +
      ".fixedmenu .navbar{display:none!important;}" +   /* legacy select strip */
      ".tinynav{display:none!important;}" +
      ".fixedmenu .row.changeContrast{position:relative;min-height:52px;}" +
      ".kb-mnav-btn{display:flex;}" +
      ".fixedmenu.tiny{padding:0;}" +
      ".fixedmenu.tiny a.navbar-brand img{margin-top:-20px;}" +
      ".fixedmenu.kb-shrunk{padding:0;}" +
    "}" +
    "@media (min-width:" + (BP + 1) + "px){.kb-mnav-panel{display:none!important;}}" +

    /* -- widget suppression while the menu is open -- */
    "body.kb-menu-open .kc-fab,body.kb-menu-open .kc-bar{display:none!important;}" +

    /* -- contrast mode (mirrors .contrastDone via body.kb-contrast) -- */
    "body.kb-contrast .fixedmenu,body.kb-contrast .fixedmenu.kb-shrunk{" +
      "background:#000!important;-webkit-backdrop-filter:none;backdrop-filter:none;}" +
    "body.kb-contrast .kb-mnav-btn{background:#000;border-color:#fff;}" +
    "body.kb-contrast .kb-mnav-btn span{background:#fff;}" +
    "body.kb-contrast .kb-mnav-panel{background:#000;}" +
    "body.kb-contrast .kb-mnav-panel a{color:#fff;border-bottom-color:#444;}" +
    /* current item mirrors .contrastDoneMenu (white bg, black text) */
    "body.kb-contrast .kb-mnav-panel a.kb-current{background:#fff;color:#000;border-right-color:#fff;}" +
    "body.kb-contrast .kb-mnav-ctas a{background:#000;border:1px solid #fff;color:#fff;}" +

    "@media print{.kb-mnav-btn,.kb-mnav-panel{display:none!important;}}";

  var style = document.createElement("style");
  style.setAttribute("data-kb-header", "1");
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);

  /* ---------------- helpers ---------------- */

  // normalize a pathname for current-page comparison
  function normPath(p) {
    try { p = decodeURIComponent(p); } catch (e) { /* keep raw */ }
    p = p.replace(/index\.html$/, "").replace(/\/+$/, "");
    return p;
  }

  function init() {
    var header = document.querySelector(".fixedmenu");
    var mainMenu = document.getElementById("main-menu");
    if (!header || !mainMenu) return;            // page without the standard header
    var row = header.querySelector(".row.changeContrast") || header.querySelector(".container") || header;

    /* ---- 1. shrink on scroll (additive; does not touch common.js) ----
       Direct toggle, no rAF throttle: classList.toggle is cheap, and the
       rAF+flag pattern wedges (flag stuck true) when rAF is suspended in
       background tabs. */
    function updateShrink() {
      header.classList.toggle("kb-shrunk", window.scrollY > SHRINK_AT);
    }
    window.addEventListener("scroll", updateShrink, { passive: true });
    updateShrink();

    /* ---- 2. mobile panel cloned from #main-menu ---- */
    var here = normPath(window.location.pathname);
    var list = document.createElement("ul");
    var firstCurrentMarked = false;

    function addLink(srcA, isSub) {
      var a = document.createElement("a");
      a.href = srcA.getAttribute("href");
      a.textContent = (srcA.textContent || "").trim();
      if (isSub) a.className = "kb-mnav-sub";
      if (normPath(srcA.pathname) === here) {
        a.className += (a.className ? " " : "") + "kb-current";
        if (!firstCurrentMarked) { a.setAttribute("aria-current", "page"); firstCurrentMarked = true; }
      }
      var li = document.createElement("li");
      li.appendChild(a);
      list.appendChild(li);
    }

    var items = mainMenu.children;
    for (var i = 0; i < items.length; i++) {
      var li = items[i];
      if (li.tagName !== "LI") continue;
      var top = li.querySelector(":scope > a");
      if (top) addLink(top, false);
      var subs = li.querySelectorAll(":scope > ul.dropdown-menu > li > a");
      for (var j = 0; j < subs.length; j++) addLink(subs[j], true);
    }

    var panel = document.createElement("nav");
    panel.className = "kb-mnav-panel";
    panel.id = "kb-mnav-panel";
    panel.setAttribute("aria-label", "תפריט ראשי");
    panel.appendChild(list);

    var ctas = document.createElement("div");
    ctas.className = "kb-mnav-ctas";
    ctas.innerHTML =
      '<a class="kb-mnav-wa" href="' + waHref + '" target="_blank" rel="noopener noreferrer">' +
        '<i class="fa fa-whatsapp" aria-hidden="true"></i> וואטסאפ</a>' +
      '<a class="kb-mnav-tel" href="tel:' + CALL_NUMBER + '">' +
        '<i class="fa fa-phone" aria-hidden="true"></i> חיוג</a>';
    panel.appendChild(ctas);
    document.body.appendChild(panel);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "kb-mnav-btn";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "kb-mnav-panel");
    btn.setAttribute("aria-label", "פתיחת תפריט");
    btn.innerHTML = "<span></span><span></span><span></span>";
    row.appendChild(btn);

    /* ---- open/close + focus management ---- */
    var isOpen = false;

    function openPanel() {
      panel.style.top = header.offsetHeight + "px";   // keep header (and X) visible
      document.body.classList.add("kb-menu-open");
      btn.classList.add("kb-open");
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "סגירת תפריט");
      isOpen = true;
      var first = panel.querySelector("a");
      if (first) first.focus();
    }

    function closePanel(focusBack) {
      document.body.classList.remove("kb-menu-open");
      btn.classList.remove("kb-open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "פתיחת תפריט");
      isOpen = false;
      if (focusBack) btn.focus();
    }

    btn.addEventListener("click", function () {
      if (isOpen) { closePanel(false); } else { openPanel(); }
    });

    document.addEventListener("keydown", function (e) {
      if (!isOpen) return;
      if (e.key === "Escape" || e.key === "Esc") {
        closePanel(true);
        return;
      }
      if (e.key === "Tab") {                       // trap focus: button + panel links
        var focusables = [btn].concat(
          Array.prototype.slice.call(panel.querySelectorAll("a"))
        );
        var idx = focusables.indexOf(document.activeElement);
        if (e.shiftKey) {
          if (idx <= 0) { e.preventDefault(); focusables[focusables.length - 1].focus(); }
        } else {
          if (idx === -1 || idx === focusables.length - 1) { e.preventDefault(); focusables[0].focus(); }
        }
      }
    });

    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) closePanel(false);   // navigating away
    });

    window.addEventListener("resize", function () {
      if (isOpen && window.innerWidth > BP) closePanel(false);
    });

    /* ---- 4. contrast-mode mirror ---- */
    var cRow = header.querySelector(".row.changeContrast");
    function syncContrast() {
      document.body.classList.toggle(
        "kb-contrast", !!(cRow && cRow.classList.contains("contrastDone"))
      );
    }
    if (cRow && window.MutationObserver) {
      new MutationObserver(syncContrast)
        .observe(cRow, { attributes: true, attributeFilter: ["class"] });
    }
    syncContrast();                                 // cookie-restored state on load
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
