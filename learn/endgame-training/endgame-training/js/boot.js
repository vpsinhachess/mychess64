/* Loader: checks where the app is running, then loads every other script in order. */
(function (root) {
  "use strict";
  var doc = root.document, P = root.MC64_PROTECT;

  function block(title, text) {
    doc.body.innerHTML = '<div style="max-width:520px;margin:18vh auto;padding:24px;text-align:center;color:#bababa;font:16px/1.5 system-ui,sans-serif">' +
      '<h2 style="color:#fff;margin:0 0 10px">' + title + '</h2><p>' + text + '</p></div>';
  }
  if (!P.hostAllowed()) return block("Unauthorized copy", "This copy of MyChess64 is not running on an authorized website.");
  if (P.framedByOthers()) return block("Not available here", "MyChess64 cannot be shown inside another website.");

  var FILES = [
    "vendor/chess.js",
    "vendor/jspdf.umd.min.js",
    "js/sync.js",
    "js/data.js",
    "js/pdf-logo.js",
    "js/fallback-engine.js",
    "js/engine.js",
    "js/app.js"
  ];
  var i = 0;
  function next() {
    if (i >= FILES.length) return;
    var s = doc.createElement("script"), f = FILES[i++];
    s.src = f + "?v=" + (root.MC64_CONFIG.version || "1");
    s.onload = next;
    s.onerror = function () {
      if (f === "vendor/jspdf.umd.min.js") return next();   // PDF report only; the trainer still works
      block("Could not load the trainer", "Failed to load " + f + ". Check your connection and reload.");
    };
    doc.body.appendChild(s);
  }
  /* The app finds #app, nav etc. in the page, so run after the DOM is parsed (scripts sit at the end of <body>). */
  next();
})(window);
