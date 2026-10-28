# MyChess64 — Online Chess Tournaments

Learn. Play. Improve. Anytime, Anywhere.

Multiplayer chess tournaments (Swiss, Round Robin, Arena) that run in the browser. The site is static (GitHub Pages);
players, games and clocks are stored in a free **Firebase Firestore** database, with a local copy on each device.

## Features
- Formats: Swiss (FIDE Dutch-style, simplified), Round Robin, Arena (timed, continuous pairing, streak scoring)
- Join by 6-character tournament ID · chess clock (1+0 … 15+10) chosen before the start
- Full rules: legal moves, castling, en passant, promotion choice, checkmate, stalemate, 50-move, threefold repetition,
  insufficient material, timeouts, draw offers, resign
- Pairings table, standings with tiebreaks, final podium 🥇🥈🥉
- Resume from the cloud after rejoining · offline cache · auto log-off after idle · reconnect protection
- Export PGN and PDF for any game, plus a standings/results PDF
- Responsive: phone, tablet, laptop (portrait and landscape)
- Lichess-style board and pieces (Classic, Merida, Alpha), board colours, move list, captured pieces, move review (buttons or arrow keys)
- Break between rounds with an on-screen countdown; games open automatically for both players when it reaches 0
- Time controls from ½+0 to 90+30 plus custom minutes and increment; custom number of rounds, Arena duration and break length
- Organiser name, conditions/notes, maximum players, draw offers on/off
- Start manually or schedule a date and time; the tournament starts by itself at that time

## Files
```
index.html            the whole app
firebase-config.js    YOUR Firebase settings (edit this)
firestore.rules       database security rules (paste into Firebase console)
manifest.webmanifest  installable-app info
assets/               logos and icons
.nojekyll             tells GitHub Pages to serve files as-is
```

## Setup (about 10 minutes)

### 1. Create the Firebase project
1. Go to https://console.firebase.google.com → **Add project** (Analytics not needed).
2. **Build → Authentication → Get started → Sign-in method**: enable **Anonymous**. (Optional: enable **Google** so players can resume on another device.)
3. **Build → Firestore Database → Create database** (production mode, any region).
4. Firestore → **Rules** tab → paste the contents of `firestore.rules` → **Publish**.
5. **Project settings (gear) → Your apps → Web (`</>`)** → register an app → copy the `firebaseConfig` values into `firebase-config.js`.

### 2. Put the files on GitHub
1. Create a new repository (for example `mychess64`).
2. Upload **all** files and the `assets` folder, keeping this structure (drag and drop in the GitHub web page works; make sure `.nojekyll` is included).
3. Repository **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save**.
4. Your site appears at `https://YOUR-USERNAME.github.io/mychess64/` after a minute or two.

### 3. Authorize your site (needed for Google sign-in)
Firebase console → Authentication → Settings → **Authorized domains** → add `YOUR-USERNAME.github.io`.

## Using it
1. Open the site → **Create a tournament** (name, format, clock, rounds or Arena duration).
2. Share the 6-character ID. Others open the site and enter it under **Join with tournament ID**.
3. The host presses **Start**. Rounds are paired automatically.
4. Players who leave and come back with the same ID resume the same game, same position, same clock.
   Guests are identified per device; use **Sign in with Google** to resume on another device.

## Notes and limits
- Moves are validated in each player's browser. This is fine for friends, clubs and classrooms, but a determined cheater
  could tamper with their own client. For public events add server-side checks (Cloud Functions).
- Clocks use each device's own time, so a device with a wrong clock can shift timing slightly.
- Swiss pairing is a simplified Dutch system and is not FIDE-certified software.
- Firebase's free plan is plenty for small and medium events. Keep an eye on usage if you run many large Arena events.

## Scheduled start
Choose **Scheduled** when creating a tournament. At the chosen time the tournament starts automatically as soon as at least
2 players have joined. GitHub Pages has no server, so the start is triggered by any browser that has the tournament open
at that moment (players or the host). The host can also press **Start tournament** at any time.

## Credits
Chess piece images are loaded from the open-source Lichess piece sets (cburnett by Colin M. L. Burnett, GPLv2+; Merida; Alpha)
through the jsDelivr CDN. If they cannot load, the app falls back to Unicode symbols.
