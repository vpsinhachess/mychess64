// MyChess64 Community: forum, clubs, moderation and live updates on Supabase.
(function () {
  "use strict";

  const CATS = [
    ["General Chess", "Anything chess: news, life, questions"],
    ["Openings", "Theory, prep, repertoires"],
    ["Middlegame", "Plans, structures, strategy"],
    ["Endgames", "Technique and study positions"],
    ["Puzzles & Tactics", "Positions to solve and discuss"],
    ["Games & Analysis", "Share your games, get feedback"],
    ["Tournaments & Events", "Results, announcements, fixtures"],
    ["Learning", "Beginners, coaching, study plans"],
    ["Variants", "Chess960, Fog of War and more"],
    ["Help & Feedback", "Questions about MyChess64"]
  ];
  const LEVELS = ["Any level", "Beginner", "Club player", "Advanced", "Master"];
  const TEMPLATES = {
    "": "",
    "Question": "**My question:**\n\n**What I have tried:**\n\n",
    "Game analysis": "**Game (paste PGN below):**\n\n**Where I am unsure:**\n\n",
    "Puzzle": "**Position (paste FEN below):**\n\n**My answer:**\n**Why:**\n",
    "Opening": "**Line or opening:**\n\n**My plan and question:**\n\n"
  };
  const REACT = [["great", "♞", "Great move"], ["insight", "💡", "Insightful"], ["solved", "🧩", "Solved it"], ["fire", "🔥", "Brilliant"]];
  const ICON = {
    "General Chess": "♟", "Openings": "📖", "Middlegame": "♝", "Endgames": "♚",
    "Puzzles & Tactics": "🧩", "Games & Analysis": "🔍", "Tournaments & Events": "🏆",
    "Learning": "🎓", "Variants": "🎲", "Help & Feedback": "💬"
  };
  const catLabel = c => c === "All" ? "✨ All" : (ICON[c] ? ICON[c] + " " : "") + c;

  const cfg = window.APP_CONFIG || {};
  const configured = !!(window.supabase && cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY &&
    !/YOUR-/.test(cfg.SUPABASE_URL + cfg.SUPABASE_ANON_KEY));
  const sb = configured ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY) : null;

  const S = {
    me: null, role: "member", ready: false, notes: [], notifOpen: false, editing: null,
    people: new Map(), threads: [], clubs: [], replies: [], reports: [], reportTargets: new Map(),
    myVotes: new Set(), myClubs: new Set(), myReacts: new Set(), reactCounts: new Map(),
    tab: "forum", cat: "All", q: "", sort: "hot", fil: "all", club: "",
    openId: null, composing: false, threadChan: null, timers: {},
    draft: { title: "", body: "", cat: CATS[0][0], level: "Any level", club: "", tpl: "", reply: "", cn: "", cd: "", email: "", name: "" }
  };

  // ---------- helpers ----------
  const nameOf = id => (S.people.get(id) || {}).name || "Member";
  const isMod = () => S.role === "moderator" || S.role === "admin";
  const clubName = id => (S.clubs.find(c => c.id === id) || {}).name || "";
  const rc = (type, id, kind) => S.reactCounts.get(`${type}:${id}:${kind}`) || 0;
  const mine = (type, id, kind) => S.myReacts.has(`${type}:${id}:${kind}`);
  const hoursOld = iso => Math.max(0, (Date.now() - Date.parse(iso)) / 3600000);
  const hot = t => (t.upvotes + 1) / Math.pow(hoursOld(t.created_at) + 2, 1.5);
  const welcomeSeen = () => { try { return localStorage.getItem("mc64-welcome") === "1"; } catch (e) { return false; } };
  const markWelcome = () => { try { localStorage.setItem("mc64-welcome", "1"); } catch (e) { /* ignore */ } };

  function fail(err, fallback) {
    console.error(err);
    flash(fallback || (err && err.message) || "Something went wrong. Please try again.", 4000);
  }

  function need() {
    if (S.me) return true;
    flash("Sign in to do that.");
    S.tab = "account";
    render();
    return false;
  }

  // ---------- data loading ----------
  async function loadThreads() {
    const { data, error } = await sb.from("threads").select("*").order("last_activity", { ascending: false }).limit(300);
    if (error) throw error;
    S.threads = data || [];
  }

  async function loadPeople() {
    const { data, error } = await sb.from("profiles").select("id,display_name,role").limit(1000);
    if (error) throw error;
    S.people = new Map((data || []).map(p => [p.id, { name: p.display_name, role: p.role }]));
    S.role = S.me ? ((S.people.get(S.me) || {}).role || "member") : "member";
  }

  async function loadClubs() {
    const { data, error } = await sb.from("clubs").select("*, club_members(user_id)").order("created_at", { ascending: false }).limit(200);
    if (error) throw error;
    S.clubs = (data || []).map(c => ({ ...c, members: (c.club_members || []).map(m => m.user_id) }));
  }

  async function loadMine() {
    S.myVotes = new Set(); S.myClubs = new Set(); S.myReacts = new Set();
    if (!S.me) return;
    const [v, m, r] = await Promise.all([
      sb.from("votes").select("thread_id").eq("user_id", S.me),
      sb.from("club_members").select("club_id").eq("user_id", S.me),
      sb.from("reactions").select("target_type,target_id,kind").eq("user_id", S.me)
    ]);
    (v.data || []).forEach(x => S.myVotes.add(x.thread_id));
    (m.data || []).forEach(x => S.myClubs.add(x.club_id));
    (r.data || []).forEach(x => S.myReacts.add(`${x.target_type}:${x.target_id}:${x.kind}`));
  }

  async function loadReactCounts() {
    const { data, error } = await sb.from("reactions").select("target_type,target_id,kind").limit(10000);
    if (error) throw error;
    S.reactCounts = new Map();
    (data || []).forEach(x => {
      const k = `${x.target_type}:${x.target_id}:${x.kind}`;
      S.reactCounts.set(k, (S.reactCounts.get(k) || 0) + 1);
    });
  }

  async function loadReplies(threadId) {
    const { data, error } = await sb.from("replies").select("*").eq("thread_id", threadId).order("created_at", { ascending: true }).limit(500);
    if (error) throw error;
    if (S.openId === threadId) S.replies = data || [];
  }

  async function loadReports() {
    S.reports = []; S.reportTargets = new Map();
    if (!isMod()) return;
    const { data, error } = await sb.from("reports").select("*").eq("resolved", false).order("created_at", { ascending: false }).limit(200);
    if (error) throw error;
    S.reports = data || [];
    const replyIds = S.reports.filter(r => r.target_type === "reply").map(r => r.target_id);
    if (replyIds.length) {
      const { data: rows } = await sb.from("replies").select("id,thread_id,body").in("id", replyIds);
      (rows || []).forEach(x => S.reportTargets.set(x.id, x));
    }
  }

  async function refreshAll() {
    await Promise.all([loadThreads(), loadClubs(), loadMine(), loadReactCounts(), loadPeople(), loadNotes()]);
    await loadReports();
    if (S.openId) await loadReplies(S.openId);
  }

  async function refresh(what) {
    if (what === "threads") await loadThreads();
    if (what === "clubs") await loadClubs();
    if (what === "reacts") await loadReactCounts();
    if (what === "mine") await loadMine();
    if (what === "people") { await loadPeople(); await loadReports(); }
    if (what === "reports") await loadReports();
    if (what === "notes") await loadNotes();
    render();
  }

  function later(what) {
    clearTimeout(S.timers[what]);
    S.timers[what] = setTimeout(() => refresh(what).catch(console.error), 150);
  }

  // ---------- realtime ----------
  function subscribe() {
    sb.channel("forum-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "threads" }, p => {
        if (p.eventType === "INSERT" && p.new.author_id !== S.me) flash("🆕 New discussion: " + p.new.title);
        later("threads");
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "clubs" }, () => later("clubs"))
      .on("postgres_changes", { event: "*", schema: "public", table: "club_members" }, () => later("clubs"))
      .on("postgres_changes", { event: "*", schema: "public", table: "reactions" }, () => later("reacts"))
      .on("postgres_changes", { event: "*", schema: "public", table: "votes" }, () => later("mine"))
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => later("people"))
      .on("postgres_changes", { event: "*", schema: "public", table: "reports" }, () => later("reports"))
      .subscribe();
  }

  function watchThread(id) {
    unwatchThread();
    S.threadChan = sb.channel("thread-" + id)
      .on("postgres_changes", { event: "*", schema: "public", table: "replies", filter: `thread_id=eq.${id}` }, p => {
        if (p.eventType === "INSERT" && p.new.author_id !== S.me) flash("💬 New reply from " + nameOf(p.new.author_id));
        loadReplies(id).then(render).catch(console.error);
      })
      .subscribe();
  }

  function unwatchThread() {
    if (S.threadChan) { sb.removeChannel(S.threadChan); S.threadChan = null; }
  }

  // ---------- session ----------
  async function boot() {
    if (!configured) { S.ready = true; render(); return; }
    const { data } = await sb.auth.getSession();
    S.me = data.session ? data.session.user.id : null;
    sb.auth.onAuthStateChange(async (_event, session) => {
      const id = session ? session.user.id : null;
      if (id === S.me) return;
      S.me = id;
      watchNotes();
      await refreshAll().catch(console.error);
      render();
    });
    try { await refreshAll(); } catch (e) { fail(e, "Could not load the community. Check your Supabase settings."); }
    subscribe();
    watchNotes();
    S.ready = true;
    render();
  }

  // ---------- notifications ----------
  let notesChan = null;

  async function loadNotes() {
    if (!S.me) { S.notes = []; return; }
    const { data, error } = await sb.from("notifications").select("*").order("created_at", { ascending: false }).limit(50);
    if (error) throw error;
    S.notes = data || [];
  }

  function watchNotes() {
    if (notesChan) { sb.removeChannel(notesChan); notesChan = null; }
    if (!S.me) return;
    notesChan = sb.channel("notes-" + S.me)
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications", filter: `user_id=eq.${S.me}` }, p => {
        if (p.eventType === "INSERT") flash("🔔 " + (p.new.kind === "mention" ? "You were mentioned in a discussion" : "New reply to your discussion"));
        later("notes");
      })
      .subscribe();
  }

  function renderBell() {
    const b = $("#bell");
    if (!b) return;
    const unread = S.notes.filter(n => !n.is_read).length;
    b.hidden = !S.me;
    b.textContent = "🔔";
    b.setAttribute("aria-label", `Notifications, ${unread} unread`);
    b.classList.toggle("on", S.notifOpen);
    if (unread) b.append(el("span", { class: "badge" }, unread > 9 ? "9+" : String(unread)));
  }

  function notifPanel(app) {
    const unread = S.notes.filter(n => !n.is_read).length;
    app.append(el("div", { class: "box notif" },
      el("div", { class: "notif-head" },
        el("strong", {}, "🔔 Notifications"),
        unread ? el("button", { onclick: markAllRead }, "Mark all read") : ""),
      ...(S.notes.length
        ? S.notes.map(n => el("button", { class: "notif-item" + (n.is_read ? "" : " unread"), onclick: () => openNote(n) },
            el("span", {}, n.kind === "mention"
              ? `${nameOf(n.actor_id)} mentioned you in “${n.title}”`
              : `${nameOf(n.actor_id)} replied to your discussion “${n.title}”`),
            el("span", { class: "meta" }, ago(n.created_at))))
        : [el("p", { class: "hint" }, "You're all caught up. ♞")])));
  }

  async function openNote(n) {
    S.notifOpen = false;
    if (!n.is_read) await sb.from("notifications").update({ is_read: true }).eq("id", n.id);
    await loadNotes();
    openThread(n.thread_id);
  }

  async function markAllRead() {
    const { error } = await sb.from("notifications").update({ is_read: true }).eq("user_id", S.me).eq("is_read", false);
    if (error) return fail(error);
    await loadNotes();
    render();
  }

  // ---------- editing your own posts ----------
  function startEdit(type, id, text) { S.editing = { type, id, text }; render(); }
  function cancelEdit() { S.editing = null; render(); }
  function isEditing(type, id) { return !!S.editing && S.editing.type === type && S.editing.id === id; }

  function editBox(type, id) {
    const ta = el("textarea", { rows: "5", maxlength: "5000", "aria-label": "Edit message" });
    ta.value = S.editing.text;
    ta.oninput = () => { S.editing.text = ta.value; };
    return el("div", { class: "box edit" }, ta,
      el("div", { class: "actions" },
        el("button", { class: "primary", onclick: () => saveEdit(type, id) }, "Save changes"),
        el("button", { onclick: cancelEdit }, "Cancel")));
  }

  async function saveEdit(type, id) {
    const text = S.editing.text.trim();
    if (!text) return flash("Message can't be empty.");
    const table = type === "thread" ? "threads" : "replies";
    const { error } = await sb.from(table).update({ body: text, edited_at: new Date().toISOString() }).eq("id", id);
    if (error) return fail(error, "Could not save your edit.");
    S.editing = null;
    await Promise.all([loadThreads(), S.openId ? loadReplies(S.openId) : null]);
    render();
    flash("Saved.");
  }

  // ---------- rendering ----------
  function render() {
    const app = $("#app");
    if (!app) return;
    app.replaceChildren();
    renderTabs();
    renderBell();
    if (!configured) { app.append(setupNotice()); return; }
    if (!S.ready) { app.append(el("p", { class: "empty" }, "Loading the community…")); return; }
    if (S.notifOpen && S.me) notifPanel(app);
    if (S.tab === "clubs") clubsView(app);
    else if (S.tab === "mod" && isMod()) modView(app);
    else if (S.tab === "account") accountView(app);
    else if (S.openId) threadView(app);
    else if (S.composing) newView(app);
    else forumView(app);
  }

  function renderTabs() {
    const nav = $("#tabs");
    if (!nav) return;
    nav.replaceChildren();
    const tabs = [["forum", "💬 Forum"], ["clubs", "🏆 Clubs"]];
    if (isMod()) tabs.push(["mod", "🛡️ Moderation" + (S.reports.length ? " (" + S.reports.length + ")" : "")]);
    tabs.push(["account", S.me ? "👤 Account" : "🔑 Sign in"]);
    tabs.forEach(([key, label]) => nav.append(el("button", {
      class: S.tab === key ? "on" : "",
      onclick: () => { S.tab = key; if (key !== "forum") S.openId = null; S.composing = false; render(); }
    }, label)));
  }

  function setupNotice() {
    return el("div", { class: "box" },
      el("strong", {}, "Connect Supabase to go live"),
      el("p", {}, "Open js/config.js and paste your Supabase project URL and anon key, then run supabase/schema.sql in the Supabase SQL editor. See README.md for the full steps."));
  }

  function forumView(app) {
    if (!S.me) {
      app.append(el("div", { class: "banner" },
        el("span", {}, "Browsing as a guest. Sign in to post, vote and react."),
        el("button", { class: "primary", onclick: () => { S.tab = "account"; render(); } }, "Sign in")));
    }
    if (!welcomeSeen()) {
      app.append(el("div", { class: "welcome" },
        el("strong", {}, "Welcome to the MyChess64 Community ♞"),
        el("ol", {},
          el("li", {}, "Browse or search discussions, or start one with + New discussion."),
          el("li", {}, "Paste a FEN position or PGN game and it becomes a board you can step through."),
          el("li", {}, "React with ♞ 💡 🧩 🔥 and keep discussions kind and on topic.")),
        el("button", { class: "primary", onclick: () => { markWelcome(); render(); } }, "Got it")));
    }
    app.append(el("div", { class: "stats" },
      el("span", {}, `${S.threads.length} discussion${S.threads.length === 1 ? "" : "s"}`),
      el("span", {}, `${S.clubs.length} club${S.clubs.length === 1 ? "" : "s"}`),
      el("span", { class: "live" }, "● Live")));

    const feed = [...S.threads].slice(0, 5);
    if (feed.length) {
      app.append(el("div", { class: "box feed" },
        el("strong", {}, "🔴 Live activity"),
        ...feed.map(t => el("div", {
          class: "fitem", role: "button", tabindex: "0",
          onkeydown: e => { if (e.key === "Enter") openThread(t.id); },
          onclick: () => openThread(t.id)
        },
          el("span", {}, `${nameOf(t.author_id)} started “${t.title}”`),
          el("span", { class: "meta" }, ago(t.created_at))))));
    }

    if (S.club) {
      const c = S.clubs.find(x => x.id === S.club);
      app.append(el("div", { class: "banner" },
        el("span", {}, "Club: " + (c ? c.name : "(removed)")),
        el("button", { onclick: () => { S.club = ""; render(); } }, "Show all discussions")));
    }

    const search = el("input", { type: "search", placeholder: "Search titles", value: S.q, "aria-label": "Search", oninput: e => { S.q = e.target.value.toLowerCase().trim(); drawList(); } });
    const sortSel = el("select", { "aria-label": "Sort", onchange: e => { S.sort = e.target.value; drawList(); } },
      ...[["hot", "Hot"], ["new", "New"], ["top", "Top"]].map(([v, l]) => el("option", { value: v }, l)));
    sortSel.value = S.sort;
    app.append(el("div", { class: "bar" }, search, sortSel,
      el("button", { class: "primary", onclick: () => { if (!need()) return; S.composing = true; S.openId = null; render(); } }, "+ New discussion")));

    const filters = el("div", { class: "chips" });
    [["all", "Everything"], ["unanswered", "Unanswered"], ["mine", "My posts"]].forEach(([k, l]) =>
      filters.append(el("button", { class: "chip" + (S.fil === k ? " on" : ""), onclick: () => { S.fil = k; render(); } }, l)));
    app.append(filters);

    const chips = el("div", { class: "chips" });
    ["All", ...CATS.map(c => c[0])].forEach(c =>
      chips.append(el("button", { class: "chip" + (S.cat === c ? " on" : ""), onclick: () => { S.cat = c; render(); } }, catLabel(c))));
    app.append(chips, el("div", { id: "list" }));

    app.append(el("p", { class: "rules" }, "Be kind, stay on chess, and keep things useful for players of every level. Don't share personal details. Use Report to flag anything that breaks these rules."));
    drawList();
  }

  function drawList() {
    const box = $("#list");
    if (!box) return;
    box.replaceChildren();
    const items = S.threads.filter(t =>
      (S.cat === "All" || t.category === S.cat) &&
      (!S.club || t.club_id === S.club) &&
      (S.fil !== "unanswered" || t.reply_count === 0) &&
      (S.fil !== "mine" || t.author_id === S.me) &&
      (!S.q || t.title.toLowerCase().includes(S.q)));
    const cmp = {
      hot: (a, b) => hot(b) - hot(a),
      new: (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at),
      top: (a, b) => b.upvotes - a.upvotes
    }[S.sort];
    const sorted = [...items.filter(t => t.pinned).sort(cmp), ...items.filter(t => !t.pinned).sort(cmp)];
    if (!sorted.length) {
      box.append(el("p", { class: "empty" }, S.threads.length ? "No discussions match these filters." : "♟ No discussions yet. Be the first to start one!"));
      return;
    }
    sorted.forEach(t => box.append(el("button", { class: "card", onclick: () => openThread(t.id) },
      el("span", { class: "card-ico", "aria-hidden": "true" }, ICON[t.category] || "♟"),
      el("span", { class: "tag" }, [t.category, clubName(t.club_id), t.level !== "Any level" ? t.level : ""].filter(Boolean).join(" · ")),
      t.pinned ? el("span", { class: "pill" }, "📌 Pinned") : "",
      t.locked ? el("span", { class: "pill" }, "🔒 Locked") : "",
      el("h3", {}, t.title),
      el("div", { class: "meta" }, `${nameOf(t.author_id)} · ${ago(t.created_at)} · ▲ ${t.upvotes} · ${t.reply_count} ${t.reply_count === 1 ? "reply" : "replies"}`)
    )));
  }

  function postBody(key, text) {
    const pg = Board.looksLikePGN(text) ? Board.parsePGN(text) : null;
    if (pg && pg.moves.length) {
      return [
        el("details", { class: "pgnsrc" }, el("summary", {}, "Game notation"), el("pre", {}, text)),
        Board.replay(key, pg, render)
      ];
    }
    const fen = Board.fenFromText(text);
    return [rich(text), fen ? el("div", { class: "replay" }, Board.boardEl(fen, false), el("code", {}, fen)) : ""];
  }

  function reactBar(type, id) {
    return el("div", { class: "react" }, ...REACT.map(([kind, sym, label]) => {
      const on = mine(type, id, kind);
      return el("button", {
        class: "rx" + (on ? " on" : ""), title: label, "aria-label": label,
        onclick: () => toggleReact(type, id, kind, on)
      }, `${sym} ${rc(type, id, kind)}`);
    }));
  }

  function threadView(app) {
    app.append(el("button", { class: "link", onclick: closeThread }, "← Back to discussions"));
    const t = S.threads.find(x => x.id === S.openId);
    if (!t) { app.append(el("p", { class: "empty" }, "This discussion no longer exists.")); return; }
    const voted = S.myVotes.has(t.id);
    const owner = t.author_id === S.me;
    const mod = isMod();

    app.append(el("article", { class: "thread" },
      el("div", { class: "tags" },
        el("span", { class: "tag" }, (ICON[t.category] || "♟") + " " + t.category),
        clubName(t.club_id) ? el("span", { class: "tag" }, clubName(t.club_id)) : "",
        el("span", { class: "tag" }, t.level),
        t.pinned ? el("span", { class: "pill" }, "📌 Pinned") : "",
        t.locked ? el("span", { class: "pill" }, "🔒 Locked") : ""),
      el("h2", {}, t.title),
      el("div", { class: "meta" }, `${nameOf(t.author_id)} · ${ago(t.created_at)}${t.edited_at ? " · edited" : ""}`),
      ...(isEditing("thread", t.id) ? [editBox("thread", t.id)] : postBody("t-" + t.id, t.body)),
      reactBar("thread", t.id),
      el("div", { class: "actions" },
        el("button", { class: voted ? "on" : "", onclick: () => toggleVote(t) }, `▲ Upvote ${t.upvotes}`),
        el("button", { onclick: () => report("thread", t.id) }, "⚑ Report"),
        owner ? el("button", { onclick: () => startEdit("thread", t.id, t.body) }, "✏️ Edit") : "",
        (owner || mod) ? el("button", { class: "danger", onclick: () => deleteThread(t) }, "Delete") : "",
        mod ? el("button", { onclick: () => modSet(t, { pinned: !t.pinned }) }, t.pinned ? "Unpin" : "📌 Pin") : "",
        mod ? el("button", { onclick: () => modSet(t, { locked: !t.locked }) }, t.locked ? "Unlock" : "🔒 Lock") : "")));

    const list = el("section", { class: "replies" },
      el("h3", {}, `${S.replies.length} ${S.replies.length === 1 ? "reply" : "replies"}`));
    S.replies.forEach(r => list.append(el("div", { class: "reply" },
      el("div", { class: "meta" }, `${nameOf(r.author_id)} · ${ago(r.created_at)}${r.edited_at ? " · edited" : ""}`),
      ...(isEditing("reply", r.id) ? [editBox("reply", r.id)] : postBody("r-" + r.id, r.body)),
      reactBar("reply", r.id),
      el("div", { class: "actions" },
        el("button", { onclick: () => quote(r) }, "Quote"),
        r.author_id === S.me ? el("button", { onclick: () => startEdit("reply", r.id, r.body) }, "✏️ Edit") : "",
        el("button", { onclick: () => report("reply", r.id) }, "⚑ Report"),
        (r.author_id === S.me || mod) ? el("button", { class: "danger", onclick: () => deleteReply(r) }, "Delete") : ""))));
    app.append(list);

    if (!S.me) { app.append(el("p", { class: "empty" }, "Sign in to join the discussion.")); return; }
    if (t.locked && !mod) { app.append(el("p", { class: "empty" }, "🔒 This discussion is locked.")); return; }

    const ta = el("textarea", { rows: "3", maxlength: "2000", placeholder: "Add your reply… (Ctrl+Enter to post)", "aria-label": "Reply" });
    ta.value = S.draft.reply;
    ta.oninput = () => { S.draft.reply = ta.value; };
    const send = () => postReply(t, btn);
    const btn = el("button", { class: "primary", onclick: send }, "Post reply");
    ta.onkeydown = e => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); send(); } };
    app.append(el("div", { class: "box" }, ta, btn));
  }

  function newView(app) {
    app.append(el("button", { class: "link", onclick: () => { S.composing = false; render(); } }, "← Back"));
    const d = S.draft;
    const title = el("input", { maxlength: "120", placeholder: "Title: what do you want to discuss?", "aria-label": "Title" });
    title.value = d.title; title.oninput = () => { d.title = title.value; };
    const cat = el("select", { "aria-label": "Category" }, ...CATS.map(c => el("option", { value: c[0] }, c[0])));
    cat.value = d.cat; cat.onchange = () => { d.cat = cat.value; };
    const level = el("select", { "aria-label": "Level" }, ...LEVELS.map(l => el("option", { value: l }, l)));
    level.value = d.level; level.onchange = () => { d.level = level.value; };
    const club = el("select", { "aria-label": "Club" },
      el("option", { value: "" }, "No club (open discussion)"),
      ...S.clubs.filter(c => S.myClubs.has(c.id)).map(c => el("option", { value: c.id }, "Club: " + c.name)));
    club.value = d.club; club.onchange = () => { d.club = club.value; };
    const tpl = el("select", {
      "aria-label": "Template",
      onchange: e => {
        if (d.body.trim() && !confirm("Replace your message with this template?")) { render(); return; }
        d.body = TEMPLATES[e.target.value] || ""; render();
      }
    }, ...Object.keys(TEMPLATES).map(k => el("option", { value: k }, k || "Start from a template (optional)")));
    const body = el("textarea", { rows: "8", maxlength: "5000", placeholder: "Write your question, idea or game here.", "aria-label": "Message" });
    body.value = d.body; body.oninput = () => { d.body = body.value; };

    app.append(el("div", { class: "box" },
      el("label", {}, "Title", title),
      el("label", {}, "Category", cat),
      el("label", {}, "Your level", level),
      el("label", {}, "Club (optional)", club),
      el("label", {}, "Template", tpl),
      el("label", {}, "Message", body),
      el("span", { class: "hint" }, "Tip: paste a FEN (position) or PGN (game) and it appears as a board you can step through. Use **bold**, `code`, or start a line with > to quote."),
      el("button", { class: "primary", onclick: publishThread }, "Publish discussion")));
  }

  function clubsView(app) {
    if (!S.me) app.append(el("div", { class: "banner" }, el("span", {}, "Sign in to create or join clubs."), el("button", { class: "primary", onclick: () => { S.tab = "account"; render(); } }, "Sign in")));
    const name = el("input", { maxlength: "60", placeholder: "Club name", "aria-label": "Club name" });
    name.value = S.draft.cn; name.oninput = () => { S.draft.cn = name.value; };
    const desc = el("input", { maxlength: "200", placeholder: "What is this club about?", "aria-label": "Club description" });
    desc.value = S.draft.cd; desc.oninput = () => { S.draft.cd = desc.value; };
    app.append(el("div", { class: "box" }, el("strong", {}, "Start a club"), name, desc,
      el("button", { class: "primary", onclick: createClub }, "Create club")));
    if (!S.clubs.length) { app.append(el("p", { class: "empty" }, "♞ No clubs yet. Create the first one above.")); return; }
    S.clubs.forEach(c => {
      const joined = S.myClubs.has(c.id);
      const n = c.members.length;
      app.append(el("div", { class: "reply" },
        el("strong", {}, c.name),
        el("div", { class: "meta" }, `${n} member${n === 1 ? "" : "s"} · started by ${nameOf(c.owner_id)}`),
        el("p", {}, c.description || ""),
        el("div", { class: "actions" },
          el("button", { class: joined ? "" : "primary", onclick: () => toggleJoin(c, joined) }, joined ? "Leave club" : "Join club"),
          el("button", { onclick: () => { S.club = c.id; S.cat = "All"; S.fil = "all"; S.tab = "forum"; S.openId = null; render(); } }, "Open club forum"))));
    });
  }

  function modView(app) {
    app.append(el("p", { class: "meta" }, `${S.reports.length} open report${S.reports.length === 1 ? "" : "s"}`));
    if (!S.reports.length) app.append(el("p", { class: "empty" }, "No open reports. Great community!"));
    S.reports.forEach(r => {
      const isThread = r.target_type === "thread";
      const target = isThread ? S.threads.find(t => t.id === r.target_id) : S.reportTargets.get(r.target_id);
      const label = isThread ? (target ? target.title : "(deleted discussion)") : (target ? target.body.slice(0, 160) : "(deleted reply)");
      app.append(el("div", { class: "reply" },
        el("span", { class: "tag" }, isThread ? "Discussion" : "Reply"),
        el("div", {}, label),
        el("div", { class: "meta" }, `Reported by ${nameOf(r.reporter_id)} · ${ago(r.created_at)}${r.reason ? " · “" + r.reason + "”" : ""}`),
        el("div", { class: "actions" },
          target ? el("button", { onclick: () => { S.tab = "forum"; openThread(isThread ? target.id : target.thread_id); } }, "Open") : "",
          el("button", { onclick: () => resolveReports(r.target_type, r.target_id) }, "Dismiss"),
          el("button", { class: "danger", onclick: () => removeTarget(r) }, "Delete content"))));
    });
  }

  function accountView(app) {
    if (!S.me) {
      const email = el("input", { type: "email", placeholder: "you@example.com", "aria-label": "Email" });
      email.value = S.draft.email; email.oninput = () => { S.draft.email = email.value; };
      app.append(el("div", { class: "box" },
        el("strong", {}, "Sign in"),
        el("p", { class: "meta" }, "We'll email you a sign-in link. No password needed."),
        email,
        el("button", { class: "primary", onclick: sendLink }, "Email me a sign-in link")));
      return;
    }
    if (!S.draft.name) S.draft.name = (S.people.get(S.me) || {}).name || "";
    const name = el("input", { maxlength: "32", placeholder: "Display name", "aria-label": "Display name" });
    name.value = S.draft.name; name.oninput = () => { S.draft.name = name.value; };
    app.append(el("div", { class: "box" },
      el("strong", {}, "Your profile"),
      el("div", { class: "meta" }, "Role: " + S.role),
      name,
      el("div", { class: "actions" },
        el("button", { class: "primary", onclick: saveName }, "Save name"),
        el("button", { onclick: signOut }, "Sign out"))));
  }

  // ---------- actions ----------
  async function sendLink() {
    const email = S.draft.email.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) return flash("Enter a valid email address.");
    const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: location.href.split("#")[0] } });
    if (error) return fail(error);
    flash("Check your inbox for the sign-in link.", 5000);
  }

  async function saveName() {
    const name = S.draft.name.trim();
    if (!name || name.length > 32) return flash("Names must be 1 to 32 characters.");
    const { error } = await sb.from("profiles").update({ display_name: name }).eq("id", S.me);
    if (error) return fail(error);
    await loadPeople();
    flash("Name saved.");
    render();
  }

  async function signOut() {
    await sb.auth.signOut();
    S.me = null;
    unwatchThread();
    watchNotes();
    S.openId = null;
    await refreshAll().catch(console.error);
    S.tab = "forum";
    render();
    flash("Signed out.");
  }

  async function publishThread() {
    if (!need()) return;
    const d = S.draft;
    const title = d.title.trim(), body = d.body.trim();
    if (!title) return flash("Please add a title.");
    if (!body) return flash("Please write your message.");
    const { data, error } = await sb.from("threads")
      .insert({ title, body, category: d.cat, level: d.level, club_id: d.club || null, author_id: S.me })
      .select("id").single();
    if (error) return fail(error);
    Object.assign(d, { title: "", body: "", tpl: "", club: "" });
    S.composing = false;
    await loadThreads();
    openThread(data.id);
    flash("Discussion published. Thank you for contributing!");
  }

  function openThread(id) {
    S.openId = id; S.composing = false; S.tab = "forum"; S.replies = []; S.draft.reply = ""; S.editing = null;
    watchThread(id);
    loadReplies(id).then(render).catch(e => fail(e, "Could not load replies."));
    render();
    window.scrollTo(0, 0);
  }

  function closeThread() {
    unwatchThread();
    S.openId = null; S.replies = [];
    render();
  }

  async function postReply(t, btn) {
    if (!need()) return;
    const body = S.draft.reply.trim();
    if (!body) return flash("Write something first.");
    btn.disabled = true;
    const { error } = await sb.from("replies").insert({ thread_id: t.id, body, author_id: S.me });
    btn.disabled = false;
    if (error) return fail(error, "Could not post your reply.");
    S.draft.reply = "";
    await Promise.all([loadReplies(t.id), loadThreads()]);
    render();
    flash("Reply posted.");
  }

  function quote(r) {
    S.draft.reply = "> " + r.body.split("\n").join("\n> ") + "\n\n";
    render();
  }

  async function deleteReply(r) {
    if (!confirm("Delete this reply?")) return;
    const { error } = await sb.from("replies").delete().eq("id", r.id);
    if (error) return fail(error, "You can only delete your own replies.");
    await Promise.all([loadReplies(r.thread_id), loadThreads()]);
    render();
  }

  async function deleteThread(t) {
    if (!confirm("Delete this discussion and all its replies?")) return;
    const { error } = await sb.from("threads").delete().eq("id", t.id);
    if (error) return fail(error, "You can only delete your own discussions.");
    S.openId = null; unwatchThread();
    await loadThreads();
    render();
    flash("Discussion deleted.");
  }

  async function toggleVote(t) {
    if (!need()) return;
    const on = S.myVotes.has(t.id);
    const { error } = on
      ? await sb.from("votes").delete().eq("thread_id", t.id).eq("user_id", S.me)
      : await sb.from("votes").insert({ thread_id: t.id, user_id: S.me });
    if (error) return fail(error);
    await Promise.all([loadMine(), loadThreads()]);
    render();
  }

  async function toggleReact(type, id, kind, on) {
    if (!need()) return;
    const { error } = on
      ? await sb.from("reactions").delete().eq("target_type", type).eq("target_id", id).eq("user_id", S.me).eq("kind", kind)
      : await sb.from("reactions").insert({ target_type: type, target_id: id, user_id: S.me, kind });
    if (error) return fail(error);
    await Promise.all([loadMine(), loadReactCounts()]);
    render();
  }

  async function report(type, id) {
    if (!need()) return;
    const reason = prompt("Why are you reporting this? (optional)");
    if (reason === null) return;
    const { error } = await sb.from("reports").insert({ target_type: type, target_id: id, reporter_id: S.me, reason: reason.slice(0, 300) });
    if (error) {
      if (error.code === "23505") return flash("You already reported this.");
      return fail(error);
    }
    flash("Thanks. The moderators have been notified.");
  }

  async function toggleJoin(c, joined) {
    if (!need()) return;
    const { error } = joined
      ? await sb.from("club_members").delete().eq("club_id", c.id).eq("user_id", S.me)
      : await sb.from("club_members").insert({ club_id: c.id, user_id: S.me });
    if (error) return fail(error);
    await Promise.all([loadClubs(), loadMine()]);
    render();
  }

  async function createClub() {
    if (!need()) return;
    const name = S.draft.cn.trim();
    if (!name) return flash("Give your club a name.");
    const { data, error } = await sb.from("clubs")
      .insert({ name, description: S.draft.cd.trim(), owner_id: S.me }).select("id").single();
    if (error) return fail(error);
    const { error: e2 } = await sb.from("club_members").insert({ club_id: data.id, user_id: S.me });
    if (e2) return fail(e2);
    S.draft.cn = ""; S.draft.cd = "";
    await Promise.all([loadClubs(), loadMine()]);
    render();
    flash("Club created. Welcome, founder!");
  }

  async function modSet(t, patch) {
    const pinned = patch.pinned !== undefined ? patch.pinned : t.pinned;
    const locked = patch.locked !== undefined ? patch.locked : t.locked;
    const { error } = await sb.rpc("mod_set_thread", { p_id: t.id, p_pinned: pinned, p_locked: locked });
    if (error) return fail(error);
    await loadThreads();
    render();
    flash("Updated.");
  }

  async function resolveReports(type, id) {
    const { error } = await sb.from("reports").update({ resolved: true }).eq("target_type", type).eq("target_id", id);
    if (error) return fail(error);
    await loadReports();
    render();
  }

  async function removeTarget(r) {
    if (!confirm("Delete this content permanently?")) return;
    const table = r.target_type === "thread" ? "threads" : "replies";
    const { error } = await sb.from(table).delete().eq("id", r.target_id);
    if (error) return fail(error);
    await resolveReports(r.target_type, r.target_id);
    await loadThreads();
    flash("Content removed.");
  }

  // ---------- go ----------
  function initUI() {
    const bell = $("#bell");
    if (bell) bell.onclick = () => { S.notifOpen = !S.notifOpen; render(); };
    window.addEventListener("keydown", e => { if (e.key === "Escape" && S.openId) closeThread(); });
    render();
    boot().catch(e => { fail(e, "Could not start the community."); S.ready = true; render(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initUI);
  else initUI();
})();
