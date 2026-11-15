MyChess64 Academy - setup (all free)
1. Upload this folder to GitHub (Pages). Put your existing index.html in the same folder; point its Join/Log In buttons to app.html.
2. Try demo first: open app.html (no setup, data stays in the browser).
3. Go live: create a free project at supabase.com > SQL Editor > paste and run schema.sql.
4. Project Settings > API: copy Project URL and anon key into CFG at the top of the script in app.html.
5. Sign up on your site, then run the last (commented) line of schema.sql with your email to make yourself admin.
6. Run schema_v2.sql right after schema.sql (adds class schedule, parent messages, Academy-managed fees).
7. Open app.html, edit TOOLS at the top of the script: replace each URL with your 8 existing tool links.
8. Run schema_v3.sql (admin tools: suspend, assign, parents, invites, activity log). Then add phone numbers to students and parents so WhatsApp reminders work.
9. Run schema_v4.sql (fee ledger: invoices + payments + receipts). Fees are now calculated from invoices minus payments.
10. Run schema_v5.sql (coach payouts). In Fee Tracking > Coach Payouts set each coach's pay basis (% of fees collected, or ₹ per completed class).
