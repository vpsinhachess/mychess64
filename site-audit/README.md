# Site Audit for mychess64.com  (one-click full website analysis)

## Option A - one click on your computer (easiest)
- Windows: double-click  Start-Windows.bat
- Mac/Linux: double-click  Start-Mac-Linux.command  (or run it in Terminal)
Needs Python 3.9+ (python.org). Your browser opens and the analysis starts automatically.
Change the URL in the box and click "Analyse whole website" to audit another site.

## Option B - on GitHub (button + weekly auto-run + report page on your site)
1. Copy ALL files (keep folders) into the root of your GitHub repo, commit, push.
2. Repo > Settings > Actions > General > Workflow permissions: "Read and write permissions".
3. Open https://www.mychess64.com/audit/ , enter  yourname/reponame , click "Open Run workflow page", run it.
4. Refresh /audit/ when the run is green.
Untick "publish" to keep the report private (download from the run's Artifacts instead).

## What is analysed
- Whole-site crawl (homepage + every internal page + URLs from sitemap.xml), up to 1000 pages
- Broken/invalid links and images (internal + external) with the pages they appear on
- HTML bugs with line numbers: unclosed/stray tags, duplicate ids, deprecated tags, missing doctype/charset,
  mixed content, empty links/headings, unlabeled form fields, broken #anchors, render-blocking scripts
- SEO per page and site-wide, page speed (load time, server time, size), sitemap.xml generation,
  orphan pages, robots.txt, https redirect, security headers
- Report: overall grade, category scores, prioritised "Top fixes" with how-to-fix tips, searchable page list,
  CSV exports (issues.csv, broken_links.csv)

## Files
site_audit.py | Start-Windows.bat | Start-Mac-Linux.command | .github/workflows/site-audit.yml | audit/index.html
