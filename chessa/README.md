# CHESSA v2 — AI Chess Coach by MyChess64

Open `index.html` through any static host (GitHub Pages, Netlify) or a local server (`python -m http.server`).
Single file for phones / offline: `python build.py` (or `build.bat`) -> `ask-chessa-bundle.html` (logos inlined).

## Kid Mode (default ON, age 8–11)
* **Age bands** 5–7 / 8–11 / 12+ set in ⚙ Settings → *Parent area* (4-digit PIN; re-locks when the sheet closes). 5–7: no Wikipedia, no Analyze/Wiki tabs.
* **Chess-only guard**, friendly redirects, 44 hand-written kid answers (`data/kb-kids.js`), jargon softened, encouraging puzzle/quiz feedback.
* **Safety filters** (`js/kids.js`): hides personal details (names, phones, emails, addresses), bad words, and replies to distress messages with Childline 1098 / 112 (India). Nothing typed is stored in history or the unanswered-question log.
* **Kid-safe Wikipedia** (ages 8+, parent can turn off): sentences about death, war, crime, illness, politics etc. are dropped; max 2–3 sentences; no pictures, links or "related" chips. No links out of the chat, no player look-ups or leaderboards.
* **Easy puzzles only** under age 12 (built-in, verified), ⭐ stars, 🔥 daily streak and 🏅 badges stored only on the device. Parent can clear history and progress.

## New in v2
* **MyChess64 branding** – navy / blue / orange palette, Poppins, logo + link to www.mychess64.com, favicon, app icons, PWA (`manifest.webmanifest`, `sw.js`), footer credit.
* **Wikipedia connection** (`js/wiki.js`) – any chess question the knowledge base cannot answer, plus "who is…", "history of…", "who invented…", "when was…", and `wiki <topic>` / `Wikipedia: <topic>`.
  Ranked multi-result search, disambiguation + non-chess filtering, picture, "Read more", related-article chips, 7-day cache, CC BY-SA attribution and source link.
* Help card (`help`), question history (↑ / ↓), Lichess analysis links under FEN analysis, "Wiki" mode, 6 more verified puzzles, Hindi questions now reach every module.
* Accessibility (screen-reader text, keyboard chips, reduced-motion) and many fixes — see `AUDIT.md`.

## Files
| File | Handles |
|---|---|
| index.html, assets/ | Shell, brand, logos |
| data/kb-data.js, kb-extra.js, *your files* | Knowledge entries (topic, title, key, answer, ref) |
| js/kb.js + js/knowledge.js | Matching, typo fixing, scope guard, FEN/opening/notation/Elo replies |
| js/wiki.js | Wikipedia (explicit commands, who/history questions, fallback for unanswered chess questions) |
| js/engine.js | Stockfish WASM: FEN best move, PGN review |
| data/puzzles.js + js/puzzles.js | Playable puzzles |
| js/live.js | Lichess / Chess.com players, tablebase, tips |
| js/learn.js, tutor.js, hindi.js, ui.js, extras.js, app.js, core.js | Quiz/openings, modes, Hindi, settings, help/history, shell, registry |

## How a question flows
Newest module first: extras -> ui -> wiki -> engine -> puzzles -> learn -> hindi -> live -> knowledge.
Knowledge answers from the KB; if confidence is low it calls `CHESSA.wiki.fallback()` before giving up.

## Add knowledge / puzzles
Knowledge: open **`data/my-knowledge-1.js`** (general, for everyone) and **`data/my-knowledge-2.js`** (kids' corner, preferred in Kid Mode) and add entries `{topic,title,key,answer,ref}` — a how-to is at the top of each file. Both are already listed in `data/manifest.js`; add more files there as `["data/x.js","arrayName"]` (add `,true` for a kid file). Run `python build.py` to refresh the single-file bundle.
Puzzles: add objects to `data/puzzles.js` (fen, level, theme, moves in SAN).

## Offline chess rules library
Put chess.js 0.10.3 in `lib/chess.min.js`; otherwise it loads from cdnjs, then jsDelivr.
