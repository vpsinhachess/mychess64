# MyChess64 Academy: complete website package

Academy home page + Admin, Coach, Student and Parent dashboards, coach workspaces, fee ledger, coach payouts.
Static site (HTML/CSS/JS) + free Supabase database. No build step.

## Folder
```
index.html              Academy home page (Join as Coach/Student, Log In, Enter Classroom -> app.html)
app.html                Login + all four dashboards (Admin, Coach, Student, Parent)
manifest.webmanifest    Install-as-app info
css/app.css             Dashboard styles
js/config.js            EDIT THIS: Supabase URL + key, your 8 tool links
js/app.js               Dashboard code
js/brand.js             Logo used inside downloaded ledgers and receipts
assets/                 Logos, icons, hero photo
supabase/schema.sql     Complete database setup (run once)
```

## 1. Try it first (no setup)
Open `app.html` (or the live site) with `js/config.js` left blank: **Demo mode**. Pick a role and explore. Data stays in that browser only.

## 2. Go live with Supabase (free)
1. supabase.com > New project (free plan).
2. SQL Editor > paste all of `supabase/schema.sql` > Run.
3. Project Settings > API: copy **Project URL** and **anon public key** into `js/config.js` (`CFG`). The anon key is safe in a public site; the database rules (RLS) protect the data.
4. Authentication > URL Configuration: set Site URL to your GitHub Pages address. (Optional while testing: Authentication > Providers > Email > turn off "Confirm email".)
5. Open `app.html`, **Sign up** with your own email, then in the SQL Editor run:
   `update profiles set role='admin', approved=true where id=(select id from auth.users where email='YOU@EMAIL.COM');`
6. Log in as Admin. Add coaches (they sign up with the invited email and are approved automatically), add students and parents, assign them to coaches.

## 3. Your 8 coach tools
Open `js/config.js` and replace each URL in `TOOLS` with the real link (Class Room, Analysis Board, Training Board, Custom Position Chess Board, Diagram/Analyzer, Student Tracker, Player Report Card, Online Homework Generator).

## 4. Publish on GitHub
Upload everything in this folder to a repo (keep the folder structure, include the hidden `.nojekyll`). Settings > Pages > Deploy from branch > `main` / root.

## How the roles work
- **Admin:** coaches, students, parents (add / approve / suspend / delete / assign), fees (invoices, payments, receipts, WhatsApp reminders), coach payouts, class and activity tracking.
- **Coach:** own private students and batches, attendance, schedule, parent messages, read-only fees, own payout ledger.
- **Student / Parent:** classes, attendance, messages, fee ledger with downloads.
- Link a student or parent account to their record by entering the same login email in the student record.

## Notes
- Fees: Balance = invoices - payments (calculated, never typed). Students pay the Academy; only the Admin records payments.
- WhatsApp reminders open WhatsApp with a ready message (free). Automatic sending needs the paid WhatsApp Business API.
- Deleting a coach removes the profile, not the login; remove the login in Supabase > Authentication if needed.
