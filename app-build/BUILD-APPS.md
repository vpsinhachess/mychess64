# MyChess64 – build every app from the website

The site is a full PWA (manifest, service worker, offline page, maskable icons). Every store build wraps `https://www.mychess64.com`. Package ID used everywhere: `com.mychess64.app` (change it in `app-build/twa-manifest.json`, `app-build/capacitor.config.json`, `.well-known/` files if needed).

## 1. Any device (works today)
Upload this folder to your site root. Browsers show "Install app"; the page's **Install from browser** button triggers it. iPhone/iPad: Share → Add to Home Screen.

## 2. Android – Google Play + direct APK
1. `npm i -g @bubblewrap/cli` then `bubblewrap init --manifest https://www.mychess64.com/manifest.webmanifest` (or use `app-build/twa-manifest.json`).
2. `bubblewrap build` → `app-release-bundle.aab` (Play Store) and `app-release-signed.apk`.
3. Upload the `.apk` to `downloads/mychess64.apk` for the Direct download button.
4. Put the signing key SHA-256 (`bubblewrap fingerprint`) into `.well-known/assetlinks.json`.
5. Create the Play listing, then paste its URL in `app.js` → `APPS.android`.

## 3. Microsoft Store (Windows)
Go to pwabuilder.com, enter `https://www.mychess64.com`, choose Windows, download the MSIX package, submit in Partner Center, then set `APPS.windows`.

## 4. iPhone / iPad – App Store
Option A: pwabuilder.com → iOS package. Option B: `npm i @capacitor/core @capacitor/cli @capacitor/ios`, `npx cap add ios`, open in Xcode (needs a Mac and Apple Developer account). Put your Team ID in `.well-known/apple-app-site-association`, then set `APPS.ios`.
Note: Apple may reject apps that are only a website wrapper. Add native value (push notifications, offline lessons) before submitting.

## 5. Mac, Linux, Chromebook
Installable PWA from Chrome/Edge. No extra files needed.

Store screenshots (1080x1920 phone, 1920x1080 desktop) are required by the stores; add them to `manifest.webmanifest` under `screenshots` for richer install prompts.
