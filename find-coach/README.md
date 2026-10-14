# MyChess64 – standalone portal

Students, coaches and reviewers use the site **without any login**. Only you (admin) log in, with a password.
Contacts (student/coach phone & email, coach applications) are stored on your server and are **never** sent to the public.

## Run locally
```
ADMIN_PASSWORD=yourpassword node server.js     # needs Node 22.13+
# open http://localhost:3000   (Admin link is in the footer)
```
First run loads the sample coaches/enquiries/reviews (marked "Sample"). Delete them in Admin, or start with `SEED=0`.

## Deploy (pick one)
The database is a single file (`DATA_DIR/mychess64.db`), so the host **must give you a persistent disk**.
- **Railway / Fly.io / Render (paid disk):** push this folder to your GitHub repo `mychess64`, create a service from it
  (it detects the Dockerfile), attach a volume mounted at `/data`, and set the variables from `.env.example`.
  Render's free tier has NO persistent disk – data would be lost on restart.
- **Any VPS (cheapest, ~₹300–500/month):** install Docker, then
  `docker build -t mychess64 . && docker run -d --restart always -p 80:3000 -v /srv/mychess64:/data --env-file .env mychess64`.
  Put Caddy or Cloudflare in front for free HTTPS and your own domain.
- **Always use HTTPS** (contacts travel from the visitor's browser to your server).

## Approval workflow (all in Admin → log in via footer link)
- **Student enquiry** → arrives *Pending* and unread. Public sees nothing until you **Approve & publish** (or Reject). Student sees their own status ("Awaiting approval → Published → Matched with …") on the Enquiries page.
- **Coach application** → *Pending*. **Approve & publish** creates the live profile (photo included). Reject / delete anytime; hide or remove a live profile in the Coaches tab.
- **Inbox tools per enquiry:** read / unread, responded, private note, **assign to a coach** (from the dropdown or from a coach's response), close / reopen, delete, WhatsApp / call / email buttons.
- **Coach "I can teach" responses** are private; the public sees only "N coaches responded".
- **Reviews** wait for your approval.
- **Data** lives in `DATA_DIR/mychess64.db` (SQLite). A JSON backup is written daily to `DATA_DIR/backups` (last 14 kept); Admin has a one-click **Backup** download and **CSV export**.

## How the central control works
- Student enquiry → saved privately; the public board shows only first name, level, goal, message.
- Coach "I can teach" → saved privately with coach contact; only the coach's name shows as "Responded".
- Coach registration → pending until you approve in Admin; photo is resized in the browser.
- Admin (password, 12-hour session): applications, enquiries with contacts, coaches (feature/remove), review moderation, CSV export.

## Security built in
Admin password check is timing-safe; login limited to 8 tries / 15 min per IP; public writes limited to 40 / hour per IP;
all public input is whitelisted, length-capped and validated; visitor ids are hidden from public responses;
security headers + CSP are set. Back up by copying `mychess64.db` regularly.

## Email alerts (optional)
`npm install nodemailer`, then set `SMTP_URL` and `ADMIN_EMAIL` – you get an email for every enquiry, response, review and application.

## Known limits (be aware)
- One Node process + one SQLite file: comfortable for thousands of visitors a day, not for heavy traffic.
- `node:sqlite` is marked experimental in Node 22 (a warning is printed). The Dockerfile pins Node 22.
- Coaches have no login: they cannot edit their own profile or see assignments – you relay everything (by design).
- Contacts are stored as plain text in the database and backups: keep the server, disk and backups private, and use HTTPS.
- Rate limits are per IP and reset on restart. If a proxy/CDN sits in front, set `TRUST_PROXY_HOPS` (1 for Railway/Fly/Caddy, 2 with Cloudflare + a host proxy).
- Single shared admin password, no audit log, 12-hour sessions (set `SESSION_SECRET` so restarts don't log you out).
- Restoring a backup is manual: stop the server, replace `mychess64.db` (or load the JSON with a small script).
