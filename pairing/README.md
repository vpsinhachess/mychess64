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
