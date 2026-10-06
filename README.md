# Ask CHESSA – modular version

Open `index.html` through any static host (GitHub Pages, Netlify) or a local server.
For a single file you can open from a phone, run `build.bat` (or `python build.py`) -> `ask-chessa-bundle.html`.

## Files and what they answer
| File | Handles |
|---|---|
| data/kb-data.js, kb-extra.js, *your files* | Knowledge entries (topic, title, key, answer, ref) |
| js/kb.js + js/knowledge.js | Matching, typo fixing, FEN/opening/notation/Elo replies |
| js/engine.js | Stockfish WASM: FEN best move + evaluation, PGN blunder/mistake review |
| data/puzzles.js + js/puzzles.js | Playable puzzles (built-in set, Lichess daily, Chess.com) |
| js/wiki.js | "who is / history of ..." from Wikipedia, cached, with source link |
| js/live.js | Lichess/Chess.com players, tablebase, tips |
| js/learn.js | Quiz, opening database, Chess960, explain like a beginner |
| js/tutor.js | Learn / Analyze / Puzzle / Quiz / Study / Coach modes, levels, coach tips |
| js/hindi.js | Hindi answers, voice and mic |
| js/ui.js, js/app.js | Settings, voice speed, suggestions, reply, effects |
| js/core.js | Module registry; warns if a file is missing |

## How a question flows
Each module wraps `ask()`. The newest module sees the question first, answers it if it matches
(FEN/PGN -> engine, "puzzle" -> puzzles, "who is" -> wiki, ...), otherwise passes it down to the
knowledge module, which searches every knowledge file and replies in the chat.

## Add knowledge
1. Create `data/myfile.js` with `const myTopic=[{topic:"..",title:"..",key:"..",answer:"..",ref:".."}];`
2. Add `["data/myfile.js","myTopic"]` to `data/manifest.js`.

## Add puzzles
Add objects to `data/puzzles.js` (fen, level, theme, moves in SAN). Type "starter puzzle" to try them.

## Work offline
Copy chess.js 0.10.3 to `lib/chess.min.js` (cdnjs). It is tried before the CDN.
