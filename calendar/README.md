# MyChess64 — Tournament Resources

Static site for GitHub Pages + Supabase (organiser/admin) + a weekly GitHub Action that refreshes the event list.

```
index.html               public tournaments page
organiser/index.html     organiser login / register -> dashboard
admin/index.html         admin login -> approve tournaments
404.html  .nojekyll
css/style.css
js/config.js             <- your Supabase URL + anon key
js/common.js             auth, dashboard, accounts, CSV/print
js/app.js                events page (reads data/events.json)
js/public.js             organiser events + player interest
data/events.json         AUTO-GENERATED weekly (AICF + FIDE)
scripts/                 update-events.mjs (+ geo.mjs, package.json)
.github/workflows/update-events.yml
supabase/schema.sql, 002_hardening.sql, make-admin.sql
assets/                  favicon + logo (replace with yours)
```

## Supabase setup
1. SQL Editor: run `supabase/schema.sql`, then `supabase/002_hardening.sql` (if you already ran schema.sql, only run 002).
2. Edit `js/config.js` (Project URL + anon key). Never use the service_role key.
3. Register at `/organiser/`, then run `supabase/make-admin.sql` with your email; log in at `/admin/`.

## Automatic event updates (every 7 days)
* `.github/workflows/update-events.yml` runs every Monday 08:00 IST and on demand (Actions tab > *Update tournament data* > *Run workflow*).
* It reads the AICF All Events table (main source) and the FIDE calendar (India events, best effort), fixes obviously wrong dates, and commits `data/events.json`.
* A broken source never wipes data: the last good events are kept, the error is saved in `data/events.json`, and the workflow fails so GitHub emails you.
* The site shows "Auto-updated <date>" and turns red if the data is older than 8 days.
* In the repo: Settings > Actions > General > Workflow permissions = **Read and write**. GitHub pauses scheduled workflows after 60 days without repo activity; the weekly commit counts, but check the Actions tab occasionally.
* Test locally: `cd scripts && npm i && cd .. && node scripts/update-events.mjs` (needs Node 20). Serve the site with any local web server (opening index.html as a file cannot load data/events.json).
