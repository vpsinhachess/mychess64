/* Shared helpers for every MyChess64 puzzle page, the login page and the dashboard. */
(function (root) {
  'use strict';

  /* Turn a bundled image into a data: URL (used by the PDF report for the logo). */
  function assetDataURL(path) {
    return Promise.resolve()
      .then(function () { return fetch(path); })
      .then(function (r) { if (!r.ok) throw new Error('Missing asset ' + path); return r.blob(); })
      .then(function (blob) {
        return new Promise(function (resolve, reject) {
          var fr = new FileReader();
          fr.onload = function () { resolve(fr.result); };
          fr.onerror = reject;
          fr.readAsDataURL(blob);
        });
      });
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  root.MC64UI = { assetDataURL: assetDataURL, esc: esc };
})(typeof window !== 'undefined' ? window : globalThis);
