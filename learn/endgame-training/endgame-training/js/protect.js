/* Copy / duplicate deterrents. Runs first, before anything else.
   NOTE: nothing that runs in a browser can be 100% copy-proof. This stops casual copying,
   stops the app from running on other domains / inside other sites, and the server files
   (.htaccess / nginx.conf.example) stop other sites from hot-linking your engine and data. */
(function (root) {
  "use strict";
  var P = (root.MC64_CONFIG || {}).protect || {};
  var doc = root.document;

  function inField(t) { return !!(t && t.closest && t.closest("input,textarea,[contenteditable=true],[data-allow-copy]")); }
  function on(ev, fn, cap) { doc.addEventListener(ev, fn, cap !== false); }
  function stop(e) { e.preventDefault(); e.stopPropagation(); return false; }

  if (P.blockContextMenu) on("contextmenu", function (e) { return inField(e.target) ? true : stop(e); });
  if (P.blockCopyCut) {
    on("copy", function (e) { return inField(e.target) ? true : stop(e); });
    on("cut", function (e) { return inField(e.target) ? true : stop(e); });
  }
  if (P.blockSelect) on("selectstart", function (e) { return inField(e.target) ? true : stop(e); });
  if (P.blockDrag) on("dragstart", function (e) { return inField(e.target) ? true : stop(e); });
  if (P.blockShortcuts) on("keydown", function (e) {
    var k = (e.key || "").toLowerCase(), c = e.ctrlKey || e.metaKey;
    if (inField(e.target) && !(k === "f12")) { if (!(c && (k === "s" || k === "u" || k === "p"))) return true; }
    if (k === "f12" || (c && (k === "s" || k === "u" || k === "p")) || (c && e.shiftKey && (k === "i" || k === "j" || k === "c")) || (c && k === "a" && !inField(e.target))) return stop(e);
    return true;
  });

  /* CSS part: no text selection, no touch-callout, hide when printed */
  var css = "";
  if (P.blockSelect) css += "html,body{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}input,textarea,[data-allow-copy]{-webkit-user-select:text;user-select:text}";
  if (P.blockDrag) css += "img,svg,.pc,.sq{-webkit-user-drag:none;user-drag:none}";
  if (P.blockPrint) css += "@media print{html,body{display:none!important}}";
  if (css) { var s = doc.createElement("style"); s.id = "mc64-protect"; s.textContent = css; (doc.head || doc.documentElement).appendChild(s); }

  /* Public helper used by boot.js */
  root.MC64_PROTECT = {
    hostAllowed: function () {
      var h = (root.location.hostname || "").toLowerCase(), A = (root.MC64_CONFIG.allowedHosts || []).map(function (x) { return x.toLowerCase(); });
      if (h === "localhost" || h === "127.0.0.1" || h === "[::1]" || h === "::1") return true;
      return A.indexOf(h) > -1;
    },
    framedByOthers: function () {
      if (!P.blockFraming) return false;
      try { return root.top !== root.self && root.top.location.hostname !== root.location.hostname; }
      catch (e) { return true; }   // cross-origin parent: reading top.location throws
    }
  };
})(window);
