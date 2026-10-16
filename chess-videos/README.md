# Chess Learning Videos

A single-page video library for MyChess64. No build step, no server code.

## Files

```
chess-learning-videos/
├── index.html        the page (layout, styles and player logic)
├── videos.json       the list of videos – edit this to add or remove videos
├── README.md         this file
└── assets/
    ├── header_logo.png   logo shown in the header
    ├── footer_logo.png   logo shown in the footer
    └── favicon.png       browser tab icon
```

Keep the `assets` folder beside `index.html`. File names are case-sensitive on GitHub Pages, so use the names exactly as shown.

## Adding a video

Open `videos.json` and add an entry (newest first is best):

```json
{
  "title": "Your video title",
  "url": "https://www.youtube.com/watch?v=XXXXXXXXXXX",
  "date": "2026-10-16",
  "tags": ["Openings", "Beginner"],
  "note": "Short description (used by search)"
}
```

- `title` and `url` are required. `date` (YYYY-MM-DD) controls the order: newest first, undated last.
- `tags` create the topic buttons. `note` is searchable but not shown on the card.
- Accepted links: YouTube (all forms, including Shorts and playlists), Vimeo (including unlisted), direct video files (.mp4, .webm, .ogg, .mov, .m4v), and other web pages that allow embedding. Links without `https://` work too.
- Keep the file valid JSON: a comma after every entry except the last, and double quotes only.

## Publishing on GitHub Pages

1. Put `index.html`, `videos.json` and the `assets/` folder in the same folder of your repository (for example `chess-videos/`).
2. Commit and push.
3. Open the page through the GitHub Pages address. Opening `index.html` by double-clicking will not load `videos.json`.

## Notes

- Some videos cannot be embedded if the owner has turned embedding off. The **Original** button always opens the source.
- Only add videos you have the right to share.
- Saved favourites and the theme choice are stored in the visitor's own browser.
