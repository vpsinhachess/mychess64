# MyChess64 – GitHub Pages + Google Sheet edition (free, no server)

**Website** = static files on GitHub Pages. **Database + admin inbox + email alerts** = your own Google Sheet with a small Apps Script.
Visitors never log in. Nothing goes public until you approve it.

## Setup (about 15 minutes, once)
1. **Create the database.** Go to https://sheets.new and name the sheet `MyChess64 Data`.
2. **Add the backend.** In the sheet: *Extensions → Apps Script*. Delete the sample code, paste all of `Code.gs`, click Save.
3. **Set your admin password.** Apps Script → ⚙ *Project Settings* → *Script Properties* → *Add script property*:
   name `ADMIN_PASSWORD`, value = a long password (10+ characters) only you know. Save.
4. **Authorise.** In the editor pick the function `setup` → *Run*. Google asks for permission:
   *Review permissions → your account → Advanced → Go to project (unsafe) → Allow*. (It needs Sheets, Drive for coach photos, and Mail to email you.)
   The tabs Coaches, Enquiries, Responses and Reviews appear in your sheet.
5. **Publish the backend.** *Deploy → New deployment →* ⚙ choose **Web app** → Execute as **Me** → Who has access **Anyone** → *Deploy*.
   Copy the **Web app URL** (ends in `/exec`).
6. **Connect the website.** Open `config.js` and paste that URL between the quotes. Save.
7. **Put the site on GitHub.** Upload these files into a folder of your repo (e.g. `coach-portal/`): `index.html, config.js, header.png, footer.png, favicon.png, seed.json, .nojekyll`
   (do not need `Code.gs`/`README.md` there, but harmless). Then *Settings → Pages → Deploy from a branch → main / (root) → Save*.
   Your site: `https://<your-username>.github.io/<repo>/<folder>/`.
8. **First login.** Open the site → footer **Admin** → enter your password → optionally **Load sample data** → post a test enquiry from your phone and approve it.

## How you work day to day
- Every new enquiry, coach application, coach response and review **emails you** (Gmail) and appears in Admin (and as a row in the Google Sheet).
- Admin: approve & publish, reject, read/unread, responded, assign to a coach, private notes, hide/feature coaches, moderate reviews, WhatsApp/call/email buttons, CSV export, JSON backup.
- You can also edit any row directly in the Google Sheet (e.g. fix a coach's bio). Change `status` to `approved` to publish.
- **Changing Code.gs later:** *Deploy → Manage deployments → ✏ → Version: New version → Deploy* (the URL stays the same).
- **Backup:** Admin → Backup (JSON), or *File → Download* in Google Sheets.

## Limits (be aware)
- Free Google accounts allow about 100 emails/day and have daily Apps Script quotas – plenty for a small coaching portal, not for thousands of daily submissions.
- Pages load in 1–3 seconds (Google is the database). Public data refreshes about every 45 seconds, not instantly.
- GitHub Pages is public and needs a public repo on a free account. The repo contains no secrets (the web-app URL is public by design; the password lives only in Script Properties).
- The web-app URL can be called by anyone, so protection is: approval gate, honeypot, per-visitor limit (12/hour), daily cap (400), and an 8-wrong-passwords lockout (15 min). The lockout is global – someone who hammers the password can lock you out for 15 minutes, but cannot get in.
- Contacts are visible to whoever can open your Google Sheet and to you in Admin – keep the sheet private (do not share it).
- Coach photos are stored in a Drive folder `MyChess64 Photos` (link-viewable). If a Google Workspace policy blocks link sharing, photos will not show.
- Coaches have no login: you relay enquiries to them (by design).
