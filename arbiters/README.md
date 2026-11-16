# MyChess64 Arbiters: Supabase setup guide

## Files (upload all of them to one folder on your host)
| File | Purpose |
|---|---|
| index.html | Public directory (reads approved arbiters, records enquiries) |
| arbiter-dashboard.html | Arbiter registration, login and dashboard |
| admin-dashboard.html | Admin dashboard (applications, verification, monitoring, reviews, reports) |
| review.html | Organizer review page (opened from a link) |
| arbiter-pdf.js | PDF generation (profile card, resume, earnings statement) |
| config.js | Your Supabase URL and anon key |
| mc64.css, mc64.js | Shared styles and helpers |
| schema.sql | Database, security rules and storage (run once) |

## Supabase status
The database is already set up in your Supabase project **mychess64coach** (schema applied, storage buckets created, config.js filled in).
All arbiter objects are prefixed `arb_` / `arb-` so they sit beside your coach tables without touching them.
The existing admin (from your `admins` table) was copied into `arb_admins`.

## Steps to go live
1. Upload every file in this folder to one place on your host.
2. Edit `config.js` and set `SITE_URL` to your domain.
3. Supabase > Authentication > URL Configuration: add that domain to Site URL and Redirect URLs.
4. Open `admin-dashboard.html` and sign in with your admin account (an account must exist first: use "Register here" on arbiter-dashboard.html, or sign in with an account already in the project that is listed in `arb_admins`).
5. To add another admin: `insert into public.arb_admins(user_id) select id from auth.users where email='NAME@example.com';`
6. Optional: Authentication > Providers > Email: enable "leaked password protection".

## Workflow
Organizer posts requirement or enquiry (index.html) > row saved in `enquiries` > arbiter accepts, declines or negotiates > admin confirms on behalf of the organizer > arbiter marks completed > admin copies the review link for the organizer > review moderated by admin and shown to the arbiter.

## Security notes
- Only the anon key goes in config.js. Never use the service_role key in these files.
- Arbiters cannot approve or verify themselves (database triggers enforce this).
- Email and phone are never exposed in the public directory view.
- The Verified badge is granted only by an admin after a confirmation tick.

## Arbiter dashboard modules
Dashboard, My Profile, Certificates (private storage with expiry tracking), Availability, Appointment Enquiries, My Appointments,
Tournament Records (full event details, import completed appointments, CSV export), Fees & Earnings (rate card, income tracking,
monthly chart, CSV and PDF statement), Resume & Share (resume PDF, profile card PDF, WhatsApp and social sharing), Reviews, Account Settings.
PDFs are generated in the browser (jsPDF from cdnjs), so an internet connection is needed to create them.

## Deploy on GitHub Pages
1. Create a repository, upload all files from this zip to the repository root (keep `.nojekyll`).
2. Settings > Pages > Deploy from branch > `main` / root.
3. Your site will be at `https://USERNAME.github.io/REPO/`. Set `SITE_URL` in `config.js` to that address (no trailing slash).
4. Supabase > Authentication > URL Configuration: add the same address to Site URL and Redirect URLs.
5. Open `/index.html` (directory), `/arbiter-dashboard.html` and `/admin-dashboard.html`.
The anon key in `config.js` is public by design; access is protected by the row-level security rules in `schema.sql`. Never commit the service_role key.
