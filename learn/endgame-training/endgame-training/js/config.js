/* MyChess64 – site configuration. Edit this file only. */
window.MC64_CONFIG = {
  version: "1",   // bump to force browsers to reload changed files
  /* Hosts allowed to run this app. A copy served from any other host will not start.
     Add your own domain(s). localhost / 127.0.0.1 are always allowed for testing. */
  allowedHosts: ["mychess64.com", "www.mychess64.com"],

  /* Stockfish engine (all files are local, in /engine). */
  engine: {
    file: "engine/stockfish-19-lite-single.js",   // Stockfish 19.0.1, single-thread, needs no special server headers
    /* "Hard" is the ONLY level, used for every puzzle:
       full strength (Skill Level 20, no strength limit) with a generous think time. */
    level: { name: "Hard", skill: 20, hash: 32, moveTimeMs: 1500 },
    evalMs: 350,        // time for the evaluation bar
    hintMs: 1500,       // time for the hint button
    loadTimeoutMs: 20000
  },

  protect: {
    blockContextMenu: true,
    blockCopyCut: true,        // copy/cut of page content (inputs and the Copy-FEN button still work)
    blockSelect: true,
    blockDrag: true,
    blockShortcuts: true,      // Ctrl+S / Ctrl+U / Ctrl+P / F12 / Ctrl+Shift+I,J,C
    blockPrint: true,
    blockFraming: true         // refuses to run inside another site's <iframe>
  }
};
