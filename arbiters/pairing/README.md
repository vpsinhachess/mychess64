# Chess Tournament Manager (GitHub Pages version)

## Files to upload to GitHub (same folder, e.g. `mychess64/pairing/`)
| File | Purpose |
|---|---|
| `index.html` | The whole app (organiser zone + participant page) |
| `config.js` | Your Firebase database URL (you edit this one line) |
| `firebase-rules.json` | Security rules (paste into Firebase, not uploaded to GitHub) |

## One-time Firebase setup (free, 5 minutes)
1. Go to https://console.firebase.google.com and sign in with a Google account.
2. **Add project** (any name, e.g. `mychess64`; Google Analytics can be off).
3. Left menu: **Build > Realtime Database > Create database**. Choose a location near you
   (e.g. Singapore) and **Start in locked mode**.
4. Open the **Rules** tab, delete everything, paste the contents of `firebase-rules.json`, press **Publish**.
5. On the **Data** tab copy the database URL shown at the top, for example
   `https://mychess64-default-rtdb.asia-southeast1.firebasedatabase.app`
6. Open `config.js` and replace the URL between the quotes. Save.
7. Upload `index.html` and `config.js` to your GitHub repository folder (Add file > Upload files > Commit).
   GitHub Pages updates in about a minute. Open `https://<user>.github.io/<repo>/pairing/`.

## Branding
The MyChess64 header logo, footer logo, favicon and the footer text ("Designed and Developed by: Ved Prakash Sinha")
are built into `index.html`, so there are no extra image files to upload. The PDFs also carry the logo and footer line.

## After uploading a new version
Press **Ctrl+F5** (hard refresh) on every open tab. From version 4 onwards the page checks for updates itself and shows an
"A new version is available - Update now" bar (GitHub can take up to 10 minutes to publish a new upload). GitHub Pages and browsers keep the old page for a few minutes.
The footer shows the version number (**Version 4.0**) so you can confirm you are on the new version.

## What's new in this version
* **View Live Pairing & Result** (player/parent page): tournament name box, details (date, venue, organiser, arbiter),
  tabs *View Pairing* / *Standing* / *List of Players*, ratings and points next to names, PDF export only.
* **Round-wise standings** in both organiser and viewer: one entry per round ("Standing of Round 02"). Publishing a round's
  pairing automatically publishes the previous round's results and standing.
* **Pairing table columns**: Bd, White, Rtg, Pts, Result, Black, Rtg, Pts (organiser, viewer and PDF).
* **PDF export**: *Pairing PDF* and *Standing PDF* for any round (organiser and viewer).
* **Copy Tournament / WhatsApp**: shares a direct link `...?t=CT-XXXXXX`; players open the live page with one tap.
* **Edit tournament details**: updates the live page instantly.
* **Pairing rules (customise)**: round-1 colour, bye points, top-scorer colour exception, repeated-float minimisation, colour relaxation.
* **Withdrawn players** list with *include from next round* / *from current round* (current round needs a free bye player).
* **Export**: *Full backup* (everything) or *through selected round*; files carry a checksum, and a signature
  that is verified when you import into the same tournament. Edited or damaged files are rejected before anything changes.
  A copy of your previous data is kept on the device before every import.

## How it works
* **Create tournament**: gets a unique ID (`CT-XXXXXX`) and your organiser password.
* **Organiser login**: ID + password, from any browser or device.
* **Participants**: press *View live status*, type the ID. No password.
* Any number of tournaments can run at once: each ID is a separate tournament. You can also keep
  several browser tabs open, each logged into a different tournament.
* **Publish pairings / Publish results** controls what participants see; they refresh every 4 seconds.

## Data safety (logout, closed tab, crash, no internet)
* Every change is saved **online** (Firebase) about half a second after you make it,
  and **also on the device** (browser storage) instantly.
* If the internet drops, work continues; the page shows "Offline: kept on this device" and retries
  every 10 seconds and when the connection returns.
* **Log out / close the tab / browser crash**: log in again with the tournament ID and password.
  The app loads the online copy and the device copy and uses the **newer** one, so nothing is lost.
  The login screen also lists tournaments saved on that device so you can pick the ID.
* If you log in from another device, you get the online copy. Changes made in two browsers on
  the same tournament sync automatically (last save wins if you edit at the exact same time).
* Use **Export > Data (.json)** for an extra backup file; **Import** or "continue from file" restores it.

## Limits and security notes
* The password cannot be recovered. Keep the ID and password safe, and keep a .json backup.
* Passwords are checked with a strong hash in the browser and enforced by the Firebase rules,
  but there is no server-side limit on wrong guesses (the page locks for 30 s after 5 tries).
  Use a long password (8+ characters).
* Anyone who knows the Firebase URL can create new tournament IDs (it is a free public app).
  Watch usage in the Firebase console; you can delete a tournament with the **Delete** button.
* Free Firebase plan: 1 GB stored, 10 GB/month downloads. Each live viewer uses roughly 5 MB per hour,
  so a few hundred participants for a day of play is comfortable.
* PDF export prints Latin letters only (use CSV for Hindi names). PDF needs internet for its library.
* Pairing is a close approximation of the FIDE Dutch system, not a certified implementation. For rated events, verify
  with an arbiter-approved program (e.g. JaVaFo).
