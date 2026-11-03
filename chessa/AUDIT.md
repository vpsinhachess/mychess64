# CHESSA audit — bugs found and fixed

Found by reading all 12 JS modules + running the original in Chromium.

## Visible bugs (confirmed in the browser)
| # | Bug | Fix |
|---|---|---|
| 1 | Hero title "CHESSA" was invisible (gradient text + per-letter spans) | Solid brand colours, orange final "A" |
| 2 | Off-topic questions got chess answers: "why is the sky blue" -> Deep Blue; "capital of france" -> Mikhail Tal (substring "tal" in "capital") | Whole-word matching + scope guard in `kb()` |
| 3 | Specific entries lost to generic ones ("Queen's Gambit" -> Gambit, "Semi-open file" -> Open file; 26 of 338 self-lookups failed) | Phrase-length scoring, apostrophe/hyphen normalising (now 5 of 338) |
| 4 | `data/manifest.js` listed missing `openingFundamentals.js` -> 404 on every load | Manifest cleaned, loader warns instead of failing silently |
| 5 | Duplicate suggestion rows on the start screen | Bottom bar hidden until chat starts |

## Logic / robustness
* Two separate Wikipedia implementations (live.js, wiki.js): top-1 result only, always appended "chess", no disambiguation handling -> replaced by one module.
* "Analyzing…" detected by text sniffing: a normal answer containing the word would never be spoken; Hindi mode could not remove the "reviewing" bubble -> explicit `class="wait"` marker.
* Hindi questions skipped learn / puzzles / engine / wiki after translation -> now re-enter the newest `ask()`.
* Stockfish calls had no timeout or queue (dead worker = endless "Analyzing…") -> serialised, time-limited.
* `localStorage` access threw in blocked-storage browsers and crashed the app -> in-memory fallback.
* Enter during IME/Hindi composition sent half-typed text; Chrome cut off long speech after ~15 s -> fixed (chunked voice, composition check).
* Three microphone handlers overwrote each other -> single handler. Unhandled promise rejections left the typing dots forever -> handled.
* Player lookup treated "lichess puzzle" as a username; chess.js had one CDN only (now local -> cdnjs -> jsDelivr).
* `100%` height broke with mobile browser bars -> `100dvh`.
* Knowledge import used `new Function` on any file -> JSON first, tooltip warning to import trusted files only.
* All 7 built-in puzzles verified with an independent move generator (all correct); 6 verified puzzles added.

## Not changed (notes)
* Hindi translation uses an unofficial Google endpoint (`translate.googleapis.com ... client=gtx`) with MyMemory/Lingva backups — may break or be rate-limited; consider an official API for production.
* chess.js, Stockfish and Wikipedia/Lichess/Chess.com need internet unless you add `lib/chess.min.js`.
* Could not download chess.js here, so chess.js-dependent paths (FEN, PGN, puzzles, Stockfish) were reviewed but not executed; Wikipedia, scope guard, help, UI and offline handling were tested in Chromium with mocked network.

## Kid Mode additions (v2.1)
* Puzzle board crashed when chess.js had not loaded (`new Chess` before the library) — guarded; the original had the same fault for offline puzzles.
* Unanswered-question log and question history are switched off in Kid Mode.
* PIN is a soft barrier only (stored as a SHA-256 hash in the browser; a determined child with dev tools could bypass it). For a public kids' product add server-side parent accounts and get legal review for COPPA / GDPR-K / India DPDP Act consent.
* Wikipedia kid filter is a blocklist, not a guarantee; keep the 5–7 band Wikipedia-free and review the answers your users actually see.
* Not covered: Hindi answers are still machine-translated (Google endpoint); hand-written Hindi kid answers would be better and safer.
