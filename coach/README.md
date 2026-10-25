# MyChess64 – Chess Coach Portal

A static website (HTML + CSS + JavaScript modules) for **GitHub Pages**, powered by a free
**Firebase** backend: real coach & admin logins, admin panel, coach dashboard, demo-class
requests and "Apply to teach" applications.

## Files
```
index.html               page markup
css/style.css            styling (responsive, light/dark)
js/config.js             <-- the ONLY file you normally edit: Firebase keys + contact details
js/app.js                the compiled site code (ready to use - do not edit)
src/*.js                 readable source of app.js (only needed if you want to change the code)
package.json             `npm install && npm run build` rebuilds js/app.js from src/
firestore.rules          database security rules (paste into Firebase)
firebase.json            optional - lets the Firebase CLI deploy the rules
assets/                  logos, favicon
.nojekyll                tells GitHub Pages to serve files as-is
```
> The site uses plain scripts (no modules), so it works on GitHub Pages **and** when you
> double-click `index.html`. If something is wrong, a red banner at the top tells you what.

## STEP 0 – Try it locally (Demo mode, no setup)
You can simply double-click `index.html`, or (recommended) run a tiny local server:

    python3 -m http.server 8000      # open http://localhost:8000

Without Firebase keys the site runs in **Demo mode**: data lives only in your own browser.
Demo logins → Admin: `admin@mychess64.com` / `admin123` · Coach: `aarav@mychess64.com` / `chess1234`

## STEP 1 – Publish on GitHub Pages
1. Create a repo and upload **all files, keeping the folders** (include the hidden `.nojekyll`).
2. Repo → **Settings → Pages** → *Deploy from a branch* → `main` / `(root)` → Save.
3. After ~1 minute the site is live at `https://<username>.github.io/<repo>/`.

## STEP 2 – Create the Firebase backend (makes logins & data real and shared)
1. <https://console.firebase.google.com> → **Add project** (Analytics not needed).
2. **Build → Authentication → Get started → Sign-in method → Email/Password → Enable → Save.**
3. **Authentication → Settings → Authorized domains → Add domain** → `<username>.github.io`
   (and your custom domain, if any).
4. **Build → Firestore Database → Create database** → *Production mode* → pick the nearest region.
5. **Project settings (⚙) → General → Your apps → Web (`</>`)** → register app → copy the
   `firebaseConfig` values into **`js/config.js`** (`MC64_FIREBASE`) → commit & push.
6. **Firestore → Rules tab** → delete everything → paste the contents of **`firestore.rules`** → **Publish**.
   (CLI alternative: `firebase deploy --only firestore:rules`.)

## STEP 3 – Create your admin account (one time)
1. **Authentication → Users → Add user** → your email + strong password → copy the **User UID**.
2. **Firestore → Start collection** → ID `admins` → *Document ID* = the UID you copied →
   add any field (e.g. `role` = `admin`) → Save.
3. Open your site → **Login** → sign in → you land in the Admin panel.
   *More admins:* repeat 1–2 for each person.

## STEP 4 – Optional: contact details & WhatsApp button
Edit **`js/config.js`** (`MC64_SITE`) (e.g. `whatsapp: '919876543210'`, phone, email, address).
A floating WhatsApp button and footer contact lines appear automatically.
Static text/numbers (hero text, "500+ students" stats, FAQ) are in **`index.html`**.

## How to use it
**Admin panel** (Login → Admin)
- **Overview** – live counts + latest requests.
- **Demo requests** – every request from the website (name, call + WhatsApp links, coach, slot).
  Search, filter by status, change status, **assign a coach**, delete, export CSV.
- **Coach applications** – "Apply to teach" submissions. **Approve** creates the coach's login
  + public profile and shows a *temporary password* to send them.
- **Coaches** – add / edit / hide / delete, photo upload, fee, bio, banner colour. *Add coach*
  creates their login (email + temporary password). Use *Send password-reset email* to reset.
- **Reviews** – add or delete player reviews (shown on profiles and on the home page).
- **Data** – optional sample coaches for previewing.

**Coach dashboard** (coach logs in with the email/password the admin created)
- **Overview**, **Bookings** (students who booked them – update status, call/WhatsApp),
  **Schedule** (create classes – shown on their public profile; students can book a seat),
  **My profile** (edit details & photo), password-reset email.

**Public site extras:** save coaches ♥ (remembered), share a coach link (`…/#coach=ID`),
filters/sort, light/dark mode, mobile menu.

## Troubleshooting
| Problem | Fix |
|---|---|
| Red banner "scripts did not load" | The `js/` folder (with `config.js` and `app.js`) must be uploaded next to `index.html`. |
| Red banner "Database problem reading ..." | Firestore not created, or `firestore.rules` not published (Step 2.4 / 2.6). |
| Admin panel shows no requests / bookings | Visitors' requests only arrive when Firebase is configured (Demo mode saves in each visitor's own browser). Check the banner, your `admins/<UID>` doc and that the rules are published. |
| "Demo mode" shown after login | `js/config.js` still has `PASTE_…` values. |
| Login says "no admin or coach access" (it shows your UID) | Admin: create `admins/<UID>` doc (Step 3). Coach: their `coaches/<UID>` doc must exist (created by Admin → Add coach / Approve). |
| "Permission denied" toast | Rules not published (Step 2.6) or you are not in `/admins`. |
| `auth/unauthorized-domain` in console | Add your domain in Authentication → Settings → Authorized domains. |
| Coach can't log in after being deleted | Deleting a coach removes the profile only; remove the login too in Firebase → Authentication → Users. |
| Photo upload fails to save | Keep photos modest (they are auto-resized to 480 px); Firestore docs max 1 MB. |

## Security notes
- Firebase config values are *meant* to be public; protection comes from `firestore.rules`.
- Only UIDs in `/admins` are admins. Coaches can edit only their own profile/classes (not
  their `status`) and read only requests addressed to them. Visitors can only *create*
  requests/applications; the form has a honeypot + 15 s throttle against spam.
- For heavy spam later, enable **Firebase App Check (reCAPTCHA v3)** in the console.
- Coach login emails are stored in `/coachPrivate` (admin-only), never in the public profile.
- Free Spark plan quotas (≈50k reads / 20k writes a day) are plenty for a coaching portal.

## What was audited & fixed
Full headless test of demo mode (public site, forms, admin, approve, coach creation, coach
dashboard, scheduling, bookings) – 0 errors. Added: Admin overview + request search/filter +
coach assignment + live badges, honeypot/throttle, URL-safe class links, saved coaches
persistence, share links/deep links, WhatsApp/contact config, modal accessibility, new section
headings and announcement bar, `firebase.json`, expanded README.

v3: replaced ES modules with a compiled classic script (fixes blank page / dead buttons when opened from a folder), content no longer hidden if scripts fail, all browser-storage access made safe, visible error banners for script/database problems, login now explains missing admin/coach access.
