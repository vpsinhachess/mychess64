# MyChess64 – Chess Coach Platform (GitHub Pages + Supabase)

Static website (plain HTML/CSS/JS) that runs on **GitHub Pages**, with a real backend on **Supabase**
(Auth + Postgres with Row Level Security + Storage). Three pages:

| Page | Who | What |
|---|---|---|
| `index.html` | Public | Website: coach cards, profile popup, free-demo requests, "Apply to teach" |
| `coach.html` | Coaches | **Coach Dashboard** – personal login, each coach sees only their own data |
| `admin.html` | You | **Admin Dashboard** – full administrative control |

## What's new (v3)
- **Login** now uses the MyChess64 master split-screen design (Login / Sign Up / Google, show-hide password, “keep me signed in”).
- **Coach Dashboard** has a friendlier home: today's classes (with Join + Attendance buttons), a **“Needs your attention”** list
  (unanswered bookings, fees due, missed sessions, low attendance), monthly goal progress, earnings chart, month **calendar**.
- **Real fee accounting**: set each student's **monthly fee**; the app keeps a **fee ledger** and shows dues, advances, collection rate,
  WhatsApp fee reminders and payment receipts. Pause a student and no fees accrue.
- **Performance** with audited formulas (see below), CSV exports of students / payments / attendance.
- ⚠️ **Re-run `supabase/schema.sql`** once – it adds `students.monthly_fee`, `students.active` and `coaches.monthly_goal`.

- **Rich “About me” editor** (Profile, onboarding and Admin → Coaches): bold, italic, underline, heading, bullet & numbered lists, quote,
  line break, link, clear formatting, undo/redo, live character counter (max 1500). Pasted text is cleaned; only a safe set of tags is
  stored (scripts/styles/event handlers are always removed, links must be http/https). Old plain-text bios keep working.
- **Uniform coach cards** on the website: every card has the same size — the bio is shown as a 3-line excerpt, long names/titles are
  trimmed with “…”, tag rows are fixed height. The full formatted bio appears in the coach's profile popup.

### How the numbers are calculated
| Number | Formula |
|---|---|
| Fees billed (student) | monthly fee × number of calendar months from the start month to the current month (inclusive); paused students accrue nothing |
| Received | payments with status **paid** only (“pending” payments are not counted) |
| Balance / Fees due | billed − received (negative = paid in advance) |
| Collected this month | paid payments dated in the current month (▲/▼ % vs last month) |
| Expected monthly fees | sum of monthly fees of **active** students; *Collection rate* = collected ÷ expected |
| Attendance rate | (present + late) ÷ all marked sessions; *streak* = latest consecutive non-absent sessions |
| Revenue / teaching hour | fees received in the last 30 days ÷ hours of classes already held in those 30 days |
| Student retention | active students who attended at least once in the last 30 days ÷ active students |
| Booking conversion | bookings marked confirmed or done ÷ all bookings |
| Avg students / session | attended records ÷ number of distinct session days |

## Coach Dashboard modules
👤 **My Profile** (photo upload to Storage, bio, fee, specialities, live preview) · 📅 **My Schedule** (available teaching
hours + classes, weekly repeat, edit/duplicate) · 📥 **Bookings** (call/WhatsApp, status, notes, "add as student") ·
👥 **My Students** (records + progress overview) · ✅ **Attendance** (present/late/absent per day) · 💰 **My Earnings**
(fees received/pending, 6-month chart) · 📝 **Progress Reports** (write + share on WhatsApp) · 📈 **Performance**
(statistics & charts) · ⭐ **My Reviews** · ⚙️ **Settings** (change password, private document uploads, privacy).
*(Notifications and online-class integration were not selected – classes just carry a meeting link.)*

## Admin Dashboard
Overview · Demo requests (search, filter, **assign coach**, status, CSV export) · Coach applications (**approve → creates the
coach login + profile**) · Coaches (add with login, edit, photo upload, hide, delete) · Reviews (add/delete) ·
Coach summary (students, classes, earnings, attendance, rating per coach) · Data.

## Files
```
index.html  coach.html  admin.html     the three pages
css/style.css  css/coach.css           styling (responsive, light/dark)
js/config.js                           <-- the ONLY file you normally edit (Supabase keys, contact details)
js/app.js  js/coach-app.js  js/admin-app.js   compiled code (ready to use – do not edit)
src/*.js                               readable source ("npm install && npm run build" rebuilds js/*.js)
supabase/schema.sql                    database tables + security rules + storage buckets (run once)
assets/                                logos, icons, social-share image
```
Works on a custom domain/sub-folder too (all links are relative), e.g. `https://www.mychess64.com/coach/`.

## STEP 0 – Try it first (Demo mode, no setup)
Open `index.html` (or run `python3 -m http.server 8000`). Until Supabase keys are added, everything runs in **Demo mode**
(sample data, saved only in your own browser).
Coach: `aarav@mychess64.com` / `chess1234` (coach.html) · Admin: `admin@mychess64.com` / `admin123` (admin.html)

## STEP 1 – Create the Supabase project
1. <https://supabase.com> → **New project** (choose a region near your users, set a database password).
2. **SQL Editor → New query** → paste **all of `supabase/schema.sql`** → **Run**. (Safe to re-run.)
   This creates the tables, Row Level Security, the `coach-photos` (public) and `coach-docs` (private) storage buckets and realtime.

## STEP 2 – Auth settings
1. **Authentication → Providers → Email**: enabled. For coach accounts that *you* create, switch **“Confirm email” OFF**
   (otherwise each coach must click a confirmation e-mail before first login).
2. **Authentication → URL Configuration**: *Site URL* = your site address (e.g. `https://<user>.github.io/<repo>/` or
   `https://www.mychess64.com/coach/`). Add the same address (and `…/coach.html`, `…/admin.html`) to **Redirect URLs** –
   needed for the “Forgot password” e-mail links.

## STEP 2b – Coach sign-up & “Continue with Google” (new)
Coaches can now **Create account** on `coach.html` (email + password, or Google). A new coach fills in a short profile and lands in
the dashboard straight away; the profile stays **pending** (not on the website) until you press **Approve** in
**Admin → Coaches** (a badge on the tab shows how many are waiting).

1. **Re-run `supabase/schema.sql`** in the SQL Editor (safe to re-run) – it adds the sign-up rules.
2. **Authentication → Sign In / Providers → User Signups**: *Allow new users to sign up* = **ON**.
3. **Authentication → Providers → Email**: keep it enabled. **Confirm email ON** is recommended now that anyone can sign up
   (coaches you create manually in Admin also get a confirmation e-mail, or you can confirm them yourself under *Authentication → Users*).
4. **Google login**
   1. <https://console.cloud.google.com> → create/select a project → **APIs & Services → OAuth consent screen** (External) → app name,
      support e-mail, save.
   2. **Credentials → Create credentials → OAuth client ID → Web application**.
      *Authorized redirect URI* = `https://<YOUR-PROJECT-REF>.supabase.co/auth/v1/callback`
      (Supabase shows this exact URL in **Authentication → Providers → Google**). *Authorized JavaScript origin* = your site address.
   3. Copy the **Client ID** and **Client secret** → Supabase **Authentication → Providers → Google** → enable → paste → **Save**.
   4. **Authentication → URL Configuration → Redirect URLs**: make sure your `coach.html` address is listed
      (e.g. `https://www.mychess64.com/coach/coach.html`, or a wildcard like `https://www.mychess64.com/coach/**`).
5. Test: `coach.html` → *Create account* → or *Continue with Google* → complete the profile → then approve it in `admin.html`.

## STEP 3 – Connect the site
**Project Settings → API**: copy **Project URL** and the **anon public** key into `js/config.js`. (The anon key is *meant* to be
public – security comes from Row Level Security. **Never** put the `service_role` key in the site.)

## STEP 4 – Create your admin account (one time)
1. **Authentication → Users → Add user** → your email + strong password → copy the user's **UID**.
2. **SQL Editor** → run: `insert into admins (user_id) values ('PASTE-THE-UID');`
3. Open `admin.html` → sign in.

## STEP 5 – Publish on GitHub Pages
Upload **all files (keep folders; `node_modules` not needed)** → repo **Settings → Pages** → *Deploy from a branch* → `main` / root.

## STEP 6 – Use it
1. Admin → **Coaches → + Add coach**: name, title, email + temporary password, photo → **Save**. The coach appears on the website
   immediately. Send them `…/coach.html`, their email and the temporary password (they change it in *Settings*).
   (Or let coaches apply on the website and press **Approve** in *Applications*.)
2. Coach signs in at `coach.html` → completes profile, teaching hours, classes, students, attendance, payments, reports.
3. Players request a demo on the website → it appears in **Admin → Demo requests** (and in the chosen coach's Bookings).
   Optional extra: every request/application is also e-mailed to you if `web3formsKey` is set in `js/config.js`.

## Security model (Row Level Security)
- The public website shows only coaches whose status is **active**. A self-registered coach can create **only their own profile, as pending**; they cannot approve themselves.
- Visitors can only **create** requests/applications; they cannot read them.
- A coach can read/write **only rows where `coach_id` = their own user id** (students, attendance, payments, reports, documents,
  classes, availability) and see only requests addressed to them. A coach cannot change their own `status` or another coach's data
  – changing an ID in the browser does not help, the database rejects it.
- Admins (rows in the `admins` table) can manage everything.
- Photos: public bucket, a coach can write only into their own folder. Documents: private bucket, owner + admin only (signed links).

## Troubleshooting
| Problem | Fix |
|---|---|
| Red banner “scripts did not load” | Upload the `js/` folder next to the pages. |
| Red banner “Database problem reading …” | Run `supabase/schema.sql` (Step 1); check URL/anon key in `js/config.js`. |
| Still “Demo mode” | `js/config.js` still contains `PASTE_…`. |
| “not an admin” (shows your UID + SQL) | Run the `insert into admins …` statement (Step 4). |
| “no coach profile was found” | The account has no row in `coaches` – create the coach via Admin → Coaches. |
| Google button shows an error / “provider is not enabled” | Finish STEP 2b.4 (Google provider enabled in Supabase + correct redirect URI in Google Cloud). |
| “Create account” says check your e-mail | Confirm email is ON – click the link in the e-mail, then sign in. |
| New coach is not on the website | Their profile is *pending* – approve it in Admin → Coaches. |
| Coach can't log in after being created | Turn **Confirm email** OFF (Step 2) or ask them to confirm the e-mail. |
| Photo/document upload fails | Re-run `schema.sql` (creates the buckets and policies); photos are auto-resized, documents ≤ 5 MB. |
| Forgot-password link opens wrong page | Fix **Site URL / Redirect URLs** (Step 2). |
| Deleted coach can still sign in | Deleting removes the profile and records only; remove the login in **Authentication → Users**. |

## Free-plan notes
Supabase Free: 500 MB database, 1 GB file storage, 50 000 monthly active users; projects pause after a week of *no* activity (resume in the dashboard).
