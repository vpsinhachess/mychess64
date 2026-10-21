# MyChess64 – website files (GitHub Pages ready)

Upload everything in this folder to the **root** of your GitHub repository (keep hidden items: `.nojekyll`, `.well-known/`).

## Deploy on GitHub Pages
1. Create a repo, then from this folder: `git init && git add -A && git commit -m "MyChess64 homepage" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`
2. Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
3. Custom domain: `www.mychess64.com` (file `CNAME` is included). At your DNS: `CNAME www → <username>.github.io`. Tick *Enforce HTTPS*.
4. Open the site in Chrome/Edge: the **Get App** button (top) and **Install from browser** (bottom) install the PWA.

## Contents
- `index.html` homepage (SEO tags, JSON-LD, animated checkmate board, PWA install buttons)
- `manifest.webmanifest`, `sw.js`, `offline.html`, `404.html`, `browserconfig.xml`, `favicon.ico`, `assets/` PWA and icons
- `sitemap.xml`, `robots.txt` SEO
- `.well-known/` Android and iOS app link templates (fill in the placeholders)
- `downloads/mychess64.apk` put your Android APK here
- `app-build/` store build files and `BUILD-APPS.md`

## Customise
- Store links: edit `APPS` at the top of the first `<script>` in `index.html`.
- Games: the `MC64` data in the second `<script>` (UCI moves + SAN).
- Board colours: `.cg` background and `.co` label colours in the CSS.

Chess pieces: cburnet set by Colin M.L. Burnett (CC BY-SA 3.0 / GPL).
