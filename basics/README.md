# MyChess64

    index.html        page shell (no inline CSS/JS)
    css/style.css     styles
    js/*.js           game code, split by feature (classic scripts, load order set in index.html)
    js/pdf.js         scorecard PDF - loaded only when the child taps "Download PDF"
    data/puzzles.json checkmate puzzle library
    assets/img/       logo, mascot animation (hero.webp), reduced-motion still
    build.mjs         `npm i && npm run build` -> dist/ (minified + bundled)

Deploy the contents of `dist/`. Serve with gzip/brotli and long cache headers for /assets, /css, /js.
