# MyChess64 – Endgame Training (split build)

Open `index.html` through a web server (not by double-clicking: browsers block Web Workers and
WebAssembly on `file://`). Quick local test: `python3 -m http.server` in this folder, then open
http://localhost:8000.

## Files
| Path | What it is |
|---|---|
| `index.html` | Page shell only |
| `css/styles.css`, `css/pieces.css` | Styles, piece sprites |
| `js/config.js` | **Your settings**: allowed domains, engine level, protection switches |
| `js/protect.js`, `js/boot.js` | Copy deterrents, domain lock, ordered script loader |
| `js/sync.js` | MyChess64 activity sync (unchanged) |
| `js/data.js` | Puzzle data (unchanged) |
| `js/pdf-logo.js` | Logo used in PDF reports |
| `js/app.js` | The trainer (UI, rules glue, scoring, PDF) |
| `js/engine.js` | Stockfish wrapper (Web Worker, UCI) |
| `js/fallback-engine.js` | Old built-in engine, used only if Stockfish cannot load, plus the mate-in-1/2 hint finder |
| `engine/` | **Stockfish 19.0.1** (lite, single-thread) `.js` + `.wasm` + GPL-3.0 licence |
| `vendor/` | chess.js 0.10.3, jsPDF 2.5.1 (local copies, no CDN) |
| `assets/` | Logos, favicons |
| `.htaccess`, `nginx.conf.example` | Server config: wasm MIME type, hot-link and framing protection |

## Engine level
Every puzzle uses one level, **Hard**: Stockfish 19 at Skill Level 20, strength limit off,
1.5 s per move (`engine.level` in `js/config.js`). The old Fast/Normal/Strong switch is removed from Settings.
The evaluation bar and hints also use Stockfish 19.
To use the 99 MB full-strength net instead of the lite one, copy `stockfish-19-single.js/.wasm` from the
`stockfish` npm package into `engine/` and change `engine.file`.

## Copy / duplicate protection
- Runs only on hosts in `allowedHosts` (plus localhost); a copy on another domain shows "Unauthorized copy".
- Refuses to run inside another site's iframe.
- Blocks right-click, text selection, copy/cut, drag, Ctrl+S/U/P, F12 and printing (inputs and "Copy FEN" still work).
- Server files stop other sites hot-linking your engine, data and scripts.

Be aware: anything a browser can run, a determined person can still download and edit. This protection stops
casual copying and drop-in reuse; it cannot make a public website impossible to copy. Stockfish is GPL-3.0,
so you must keep `engine/COPYING-stockfish-GPL3.txt` and offer its source (github.com/nmrugg/stockfish.js).

Before going live: set your domain in `js/config.js` and in `.htaccess` / nginx.
