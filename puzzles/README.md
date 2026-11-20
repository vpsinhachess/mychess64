# MyChess64 · Puzzle training site

Folder layout

| Path | What it is |
|---|---|
| `index.html` | Home page. The three puzzle cards link to the puzzle sets; the nav has Sign in and My dashboard. |
| `endgame-puzzles.html`, `middlegame-puzzles.html`, `opening-puzzles.html` | The three puzzle sets. Each one's switcher (top bar) links to the other two and to the dashboard. |
| `login.html` | Player login: sign in, create account, forgot / reset password (Supabase Auth). |
| `dashboard-student.html` | Player dashboard: MCR rating, per-set ratings, rating chart, last 14 days, topics, full puzzle history, CSV export. |
| `css/` | `common.css` (shared), `pieces.css`, `endgame.css`, `middlegame.css`, `opening.css`, `account.css` (login and dashboard). |
| `js/` | `mc64-sync.js` (activity log + cloud sync), `supabase-client.js` (accounts), `common.js`, `login.js`, `dashboard.js`, and one game engine per set (`*-app.js`). |
| `js/data/` | Puzzle data for each set. |
| `rating/rating.js` | Rating maths (Elo-style per set, overall MCR, player bands). |
| `assets/` | Logos, favicons, PDF logo and chess piece images. |
| `supabase/config.js` | Your Supabase URL and anon key. |
| `supabase/schema.sql` | Database tables, security rules and the sign-up trigger. |

## Setup (about 5 minutes)

1. In Supabase, create a project. Open **SQL Editor**, paste `supabase/schema.sql`, and run it.
2. Copy **Project URL** and **anon public key** from **Project Settings → API** into `supabase/config.js`.
3. In **Authentication → URL Configuration**, set the Site URL to your site, for example `https://www.mychess64.com`, and add `https://your-site/login.html` under Redirect URLs. This is needed for confirmation and password-reset emails.
4. Host the folder on any HTTPS static host (GitHub Pages, Netlify, Vercel, or your own server). Opening the files directly from disk (`file://`) will not work for sign-in.

Without step 2, the site still works: puzzles, the rating and the dashboard all run on the device, and the login page says sign-in is not set up.

## How progress is recorded

Each finished puzzle is stored as one event. Ratings, solved counts, accuracy, XP, topics and history are calculated from those events. Guests keep events on their device. When a player signs in, guest events move to their account and are uploaded to `activity_events`. Other devices download the same events, so the numbers match everywhere.
