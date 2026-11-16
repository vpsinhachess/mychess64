# MyChess64 Community

A chess community forum: discussions in 10 categories, clubs, upvotes, emoji reactions,
FEN boards, PGN game replay, reporting, moderation, and live updates.

Stack (all free): static HTML/CSS/JS on GitHub Pages, Supabase (Postgres, Auth, Realtime).

## Project layout

```
index.html          Page structure
css/style.css       Styles (light and dark theme)
js/config.js        YOUR Supabase URL and anon key (edit this)
js/util.js          DOM and text helpers
js/board.js         FEN boards and PGN replay (chess.js)
js/app.js           Forum logic, auth, realtime, moderation
supabase/schema.sql Tables, security rules, counters, realtime
```

## 1. Create the Supabase project (free)

1. Go to https://supabase.com, sign in, and click **New project**.
2. Pick a name, a database password (save it), and a region. Wait about two minutes.

## 2. Create the database

1. In the dashboard open **SQL Editor > New query**.
2. Paste the entire contents of `supabase/schema.sql` and click **Run**.
3. Run it once. If you see "already a member of publication", that part already ran; the rest is fine.

## 3. Configure sign-in

1. **Authentication > URL Configuration**
   - **Site URL:** your GitHub Pages address, e.g. `https://YOUR-NAME.github.io/mychess64-community/`
   - **Redirect URLs:** add the same address (and `http://localhost:8000/` for local testing).
2. **Authentication > Providers > Email:** keep **Email** enabled. Magic-link sign-in needs no password.
   For a real launch, add a custom SMTP sender under **Project Settings > Authentication**, because the
   built-in email service is rate-limited.

## 4. Connect the site

1. **Project Settings > API:** copy the **Project URL** and the **anon public** key.
2. Open `js/config.js` and paste them in:

```js
window.APP_CONFIG = {
  SUPABASE_URL: "https://abcd1234.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOi..."
};
```

The anon key is meant to be public. Protection comes from the Row Level Security rules in `schema.sql`.
**Never** put the `service_role` key in this project.

## 5. Make yourself a moderator

1. Open the site, sign in with your email, and click the link in the email.
2. In **Authentication > Users**, copy your user's UUID.
3. In the SQL Editor run:

```sql
update public.profiles set role = 'admin' where id = 'YOUR-USER-UUID';
```

Admins see the **Moderation** tab, can pin and lock discussions, and can delete any content.

## 6. Deploy on GitHub Pages (free)

1. Create a new public repository on GitHub (e.g. `mychess64-community`).
2. Upload all files from this folder to the repository root (or push with git):

```bash
git init
git add .
git commit -m "MyChess64 Community"
git branch -M main
git remote add origin https://github.com/YOUR-NAME/mychess64-community.git
git push -u origin main
```

3. On GitHub: **Settings > Pages > Build and deployment > Deploy from a branch > main / (root) > Save**.
4. After about a minute the site is live at `https://YOUR-NAME.github.io/mychess64-community/`.
   Make sure that address matches the Site URL from step 3.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 (add it to Redirect URLs in Supabase first).

## Troubleshooting

| Problem | Fix |
|---|---|
| Page says "Connect Supabase to go live" | `js/config.js` still has the placeholder values. |
| Magic link opens but you stay signed out | Add the exact page address to Redirect URLs. |
| "row-level security policy" error | You're not signed in, or you're trying to edit someone else's content. |
| Boards don't show for PGN | The chess.js CDN script is blocked. Check your network; FEN boards still work. |
| Live updates don't arrive | In Supabase: **Database > Replication**, confirm the tables are enabled for `supabase_realtime`. |

## Extending

- Edit your own posts: add an `update` policy on `replies` and an edit button in `app.js`.
- Notifications: add a `notifications` table and a trigger on replies/mentions.
- Custom domain: set it in GitHub Pages, then add it to Supabase URL Configuration.

## Version 2: editing, notifications and @mentions

After `schema.sql`, also run **`supabase/schema-v2.sql`** in the SQL editor (once).

- **Edit:** authors can edit their own discussions and replies. Edited items show "· edited".
- **Notifications:** the 🔔 button shows unread replies to your discussions and @mentions. Click one to open it.
- **Mentions:** type `@name` in a discussion or reply, using the display name without spaces. Matching is not case-sensitive. Mentions added while editing do not send a notification.
