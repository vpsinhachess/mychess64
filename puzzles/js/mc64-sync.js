/* MyChess64 · puzzle activity sync
 * -------------------------------------------------------------------------
 * Every finished puzzle attempt is appended to a per-player event log.
 *   - Guests: the log stays in this browser (localStorage, bucket "guest").
 *   - Signed-in players: the same events are also saved to Supabase
 *     (table public.activity_events), so progress follows them to any device.
 * Ratings, solved counts, accuracy, XP, topics and history are DERIVED by replaying
 * the log, so nothing can drift out of sync or be counted twice.
 * Load order: rating/rating.js -> supabase/config.js -> supabase-js -> js/supabase-client.js -> this file. */
(function (root) {
  'use strict';
  var RT = root.MC64RATING;
  var VER = 1, PFX = 'mc64_act_v1_', TICK = PFX + 'tick', ME_KEY = 'mc64_me';
  var MAXEV = 3000, FOLD = 1000, RH_MAX = 300, PHASES = ['o', 'm', 'e'];
  var NAMES = { o: 'Opening', m: 'Middlegame', e: 'Endgame' };
  var LINK = { o: 'opening-puzzles.html', m: 'middlegame-puzzles.html', e: 'endgame-puzzles.html' };
  var DASH = 'dashboard-student.html#report';
  var ICON = { o: '♗', m: '♘', e: '♔' };

  function ls() { try { return root.localStorage; } catch (e) { return null; } }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function num(v, d) { v = +v; return isFinite(v) ? v : d; }
  function txt(v, n) { return v == null ? '' : String(v).slice(0, n || 80); }
  function p2(n) { return (n < 10 ? '0' : '') + n; }
  function dk(t) { var d = new Date(t); return d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()); }
  function uid(p) { return p + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  /* Strictly increasing time per player log, so every device replays events in the same order (Elo is order-sensitive). */
  function nextT(o) {
    var last = o.cut || 0;
    if (o.ev.length) last = Math.max(last, o.ev[o.ev.length - 1].t || 0);
    return Math.max(Date.now(), last + 1);
  }

  /* ---------- who is playing ---------- */
  function me() {
    try {
      var v = ls() && ls().getItem(ME_KEY);
      var s = v ? JSON.parse(v) : null;
      if (s && s.id) return s;
    } catch (e) { }
    return null;
  }
  function currentUser() { var m = me(); return m ? String(m.id) : null; }
  function bucketKey(name) { return PFX + (name ? 'u_' + name : 'guest'); }

  /* ---------- state model ---------- */
  function p0() { return { r: 1000, n: 0, pk: 1000, att: 0, cor: 0, secs: 0, mv: 0, solved: {}, last: 0 }; }
  function init() { return { v: VER, xp: 0, pk: 1000, ph: { o: p0(), m: p0(), e: p0() }, seeded: {}, cat: {}, sub: {}, days: {}, rh: [], last: null }; }
  function overall(S) { return RT.weighted(PHASES.map(function (k) { return S.ph[k]; })); }

  function reduce(S, e) {
    var P = e && S.ph[e.p]; if (!P) return S;
    if (e.x === 'a') {
      var ok = e.r === 'c';
      var d = RT.update(P, RT.clamp(e.rp), ok ? 1 : 0);
      var sec = Math.max(0, Math.min(3600, num(e.sc, 0))), mv = Math.max(0, num(e.mv, 0));
      P.att++; if (ok) P.cor++; P.secs += sec; P.mv += mv; P.last = e.t; S.xp += 3;
      if (ok && e.k != null && !P.solved[e.k]) { P.solved[e.k] = 1; S.xp += 10; }
      var cn = e.c || 'General', ck = e.p + '|' + cn, c = S.cat[ck] || (S.cat[ck] = { p: e.p, n: cn, c: 0, i: 0 });
      if (ok) c.c++; else c.i++;
      if (e.s) { var sk = ck + '|' + e.s, u = S.sub[sk] || (S.sub[sk] = { p: e.p, n: cn, s: e.s, c: 0, i: 0 }); if (ok) u.c++; else u.i++; }
      var dy = dk(e.t), D = S.days[dy] || (S.days[dy] = { a: 0, c: 0 }); D.a++; if (ok) D.c++;
      var ov = overall(S); if (ov > S.pk) S.pk = ov;
      S.rh.push({ t: e.t, p: e.p, r: ov, pr: P.r, d: d, ok: ok ? 1 : 0 });
      if (S.rh.length > RH_MAX) S.rh.splice(0, S.rh.length - RH_MAX);
      S.last = { t: e.t, p: e.p, k: e.k, l: e.l, r: e.r };
    } else if (e.x === 's') {            /* seed from progress that existed before sync was installed */
      if (!S.seeded[e.p]) {
        S.seeded[e.p] = 1;
        if (P.n === 0 && P.att === 0 && e.rt && num(e.rt.n, 0) > 0) {
          P.r = RT.clamp(e.rt.r); P.n = Math.floor(num(e.rt.n, 0)); P.pk = Math.max(P.r, RT.clamp(e.rt.pk || e.rt.r));
        }
        (e.sv || []).forEach(function (k) { P.solved[k] = 1; });
        var o2 = overall(S); if (o2 > S.pk) S.pk = o2;
      }
    } else if (e.x === 'z') {            /* player reset progress / rating inside a puzzle page */
      if (e.z === 'p') P.solved = {};
      if (e.z === 'r') { P.r = 1000; P.n = 0; P.pk = 1000; }
    }
    return S;
  }
  function replay(base, evs) {
    var S = base ? clone(base) : init();
    for (var i = 0; i < evs.length; i++) S = reduce(S, evs[i]);
    return S;
  }

  /* ---------- local storage (one bucket per player) ----------
   * o = { v, base, ev, cut, syn }
   *   base: replayed state of folded (old) events
   *   ev:   events not yet folded, sorted by time
   *   cut:  time of the newest folded event (cloud pulls only need newer events)
   *   syn:  time up to which events were confirmed saved to the cloud */
  function load(name) {
    var o = null;
    try { var v = ls().getItem(bucketKey(name)); if (v) o = JSON.parse(v); } catch (e) { o = null; }
    if (!o || o.v !== VER || !Array.isArray(o.ev)) o = { v: VER, base: null, ev: [], cut: 0, syn: 0 };
    return o;
  }
  function write(name, o) {
    try { ls().setItem(bucketKey(name), JSON.stringify(o)); return true; } catch (e) { return false; }
  }
  function fold(o, n) {
    if (o.ev.length <= n) return;
    o.cut = Math.max(o.cut || 0, o.ev[n - 1].t || 0);
    o.base = replay(o.base, o.ev.slice(0, n));
    o.ev = o.ev.slice(n);
  }
  /* Events may only leave the local log once the cloud has them (when signed in), so a long
   * offline session can never lose attempts that other devices still need. */
  function foldable(name, o) {
    if (!cloud() || name !== currentUser()) return o.ev.length;
    var n = 0, cap = o.syn || 0;
    while (n < o.ev.length && o.ev[n].t < cap) n++;
    return n;
  }
  function save(name, o, quiet) {
    if (o.ev.length > MAXEV) { var k = Math.min(FOLD, foldable(name, o)); if (k > 0) fold(o, k); }
    var ok = write(name, o);
    if (!ok && o.ev.length > 50) { var h = Math.min(Math.ceil(o.ev.length / 2), foldable(name, o)); if (h > 0) { fold(o, h); ok = write(name, o); } }   /* quota: compact and retry once */
    if (ok) {
      var stamp = String(Date.now()) + Math.random().toString(36).slice(2, 6);
      try { ls().setItem(TICK, stamp); } catch (e) { }
      try { var bc = new BroadcastChannel('mc64_sync'); bc.postMessage(stamp); bc.close(); } catch (e) { }
      try { live(); } catch (e) { }
      if (!quiet) flushSoon();
    }
    return ok;
  }
  function push(e) {
    if (!ls() || PHASES.indexOf(e.p) < 0) return false;
    var name = currentUser(), o = load(name);
    e.i = uid(e.p); e.t = nextT(o); o.ev.push(e);
    var ok = save(name, o);
    if (ok && e.x === 'a') {
      try { var S = state(name); API.last = { t: Date.now(), p: e.p, d: S.rh.length ? S.rh[S.rh.length - 1].d : 0, r: S.ph[e.p].r }; } catch (x) { }
    }
    return ok;
  }

  /* ---------- cloud (Supabase) ---------- */
  function cloud() {
    var c = root.MC64_SB;
    return c && c.client && c.uid && c.uid() ? c : null;
  }
  var flushTimer = null;
  function flushSoon() {
    if (!cloud()) return;
    clearTimeout(flushTimer);
    flushTimer = setTimeout(flush, 600);
  }
  /* Upload every local event not yet confirmed by the cloud. Idempotent: the database ignores repeats. */
  function flush() {
    var c = cloud();
    if (!c) return Promise.resolve(0);
    var name = currentUser(), o = load(name);
    var todo = o.ev.filter(function (e) { return e.t >= (o.syn || 0); });
    if (!todo.length) return Promise.resolve(0);
    var owner = c.uid();
    var rows = todo.map(function (e) {
      return { user_id: owner, event_id: e.i, phase: e.p, kind: e.x, occurred_at: e.t, payload: e };
    });
    var chunks = [];
    for (var i = 0; i < rows.length; i += 400) chunks.push(rows.slice(i, i + 400));
    var newest = todo[todo.length - 1].t;
    return chunks.reduce(function (p, ch) {
      return p.then(function () {
        return c.client.from('activity_events').upsert(ch, { onConflict: 'user_id,event_id', ignoreDuplicates: true });
      }).then(function (r) { if (r && r.error) throw r.error; });
    }, Promise.resolve()).then(function () {
      var cur = load(name);
      cur.syn = Math.max(cur.syn || 0, newest);
      write(name, cur);
      return todo.length;
    }).catch(function () { return 0; });   /* offline or blocked: keep the events locally, retry later */
  }
  /* Download events this player has on other devices and merge them in. */
  function pull() {
    var c = cloud();
    if (!c) return Promise.resolve(0);
    var name = currentUser(), o = load(name), have = {};
    o.ev.forEach(function (e) { have[e.i] = 1; });
    var owner = c.uid(), cut = o.cut || 0, got = [], from = 0, PAGE = 1000;
    function page() {
      return c.client.from('activity_events')
        .select('payload')
        .eq('user_id', owner)
        .gt('occurred_at', cut)
        .order('occurred_at', { ascending: true })
        .order('event_id', { ascending: true })
        .range(from, from + PAGE - 1)
        .then(function (r) {
          if (r.error) throw r.error;
          var rows = r.data || [];
          rows.forEach(function (row) {
            var e = row.payload;
            if (e && e.i && !have[e.i] && PHASES.indexOf(e.p) >= 0) { have[e.i] = 1; got.push(e); }
          });
          if (rows.length === PAGE) { from += PAGE; return page(); }
        });
    }
    return page().then(function () {
      if (!got.length) return 0;
      var cur = load(name);
      cur.ev = cur.ev.concat(got).sort(function (a, b) { return a.t - b.t; });
      save(name, cur, true);
      return got.length;
    }).catch(function () { return 0; });
  }
  /* Called on page load and after sign-in: pull new events, push pending ones. */
  function sync() {
    var name = currentUser();
    if (!name) return Promise.resolve(0);
    try { claim(name); } catch (e) { }
    return pull().then(function (n) { return flush().then(function () { return n; }); })
      .then(function (n) { live(); return n; })
      .catch(function () { return 0; });
  }

  /* ---------- public write API (called by the puzzle pages) ---------- */
  function rec(phase, a) {
    a = a || {};
    return push({
      x: 'a', p: phase, k: a.key == null ? null : txt(a.key, 60), l: txt(a.label, 60), c: txt(a.cat, 50), s: txt(a.sub, 50), g: txt(a.goal, 30),
      r: a.res === 'correct' ? 'c' : 'i', w: txt(a.why, 50), mv: Math.max(0, Math.round(num(a.moves, 0))), sc: Math.max(0, Math.round(num(a.secs, 0))), rp: RT.clamp(a.rp)
    });
  }
  function seed(phase, progress, rt) {
    if (!ls() || PHASES.indexOf(phase) < 0) return false;
    var name = currentUser(), o = load(name), cur = replay(o.base, o.ev);
    if (cur.seeded[phase]) return false;
    var keys = [];
    try { keys = Object.keys(progress || {}).filter(function (k) { return progress[k]; }); } catch (e) { }
    o.ev.push({ x: 's', p: phase, i: uid('s'), t: nextT(o), sv: keys, rt: rt ? { r: rt.r, n: rt.n, pk: rt.pk } : null });
    return save(name, o);
  }
  function resetPhase(phase, what) { return push({ x: 'z', p: phase, z: what === 'r' ? 'r' : 'p' }); }

  /* ---------- public read API (dashboard) ---------- */
  function state(name) {
    if (name === undefined) name = currentUser();
    var o = load(name), S = replay(o.base, o.ev), A = { att: 0, cor: 0, secs: 0, mv: 0, solved: 0 };
    PHASES.forEach(function (k) {
      var P = S.ph[k];
      A.att += P.att; A.cor += P.cor; A.secs += P.secs; A.mv += P.mv; A.solved += Object.keys(P.solved).length;
      P.nsolved = Object.keys(P.solved).length;
    });
    S.tot = A; S.rating = overall(S); S.names = NAMES;
    return S;
  }
  function events(name, limit) {
    if (name === undefined) name = currentUser();
    var list = load(name).ev.filter(function (e) { return e.x === 'a'; });
    return limit ? list.slice(-limit) : list;
  }
  function phaseRating(phase) { try { return state().ph[phase].r; } catch (e) { return 1000; } }
  /* Move activity recorded while signed out into the player's bucket (run once after sign-in). */
  function claim(name) {
    if (!ls() || !name) return false;
    var g = load(null);
    if (!g.ev.length) return false;
    var u = load(name), seen = {}, all = [];
    u.ev.concat(g.ev).forEach(function (e) { if (e && e.i && !seen[e.i]) { seen[e.i] = 1; all.push(e); } });
    all.sort(function (a, b) { return a.t - b.t; });
    u.ev = all;
    if (!save(name, u, true)) return false;
    try { ls().removeItem(bucketKey(null)); } catch (e) { }
    return true;
  }
  function watch(fn) {
    var last = null;
    function stamp() { try { return ls().getItem(TICK) || ''; } catch (e) { return ''; } }
    last = stamp();
    function chk() {
      var s = stamp();
      if (s !== last) { last = s; try { live(); } catch (e) { } try { fn(); } catch (e) { } }
    }
    root.addEventListener('storage', function (ev) { if (!ev.key || ev.key === TICK || ev.key.indexOf(PFX) === 0) chk(); });
    root.addEventListener('focus', chk);
    if (root.document) root.document.addEventListener('visibilitychange', function () { if (!root.document.hidden) chk(); });
    root.setInterval(function () { if (!root.document || !root.document.hidden) chk(); }, 3000);
    try { var bc = new BroadcastChannel('mc64_sync'); bc.onmessage = chk; } catch (e) { }
  }

  /* ---------- shared UI: phase switcher, live rating chip, hero tabs ---------- */
  var TTL = RT.BANDS;
  function title(r) { return RT.title(r); }
  var CUR = null, _c = null, OBS = null;
  function stateC() {
    var k = '';
    try { k = (ls().getItem(TICK) || '') + '|' + currentUser(); } catch (e) { }
    if (_c && _c.k === k) return _c.s;
    var s = state(); _c = { k: k, s: s }; return s;
  }
  var CSS = '.mcsw{position:relative;display:flex;align-items:center;gap:4px;margin:0 2px}' +
    'nav .mcb{background:var(--b2);color:var(--hi);font-weight:600;font-size:13px;padding:7px 10px;border:1px solid #3a3835;white-space:nowrap}' +
    'nav .mcb:hover,.mcsw.open .mcb{background:#0a6cf5;border-color:#0a6cf5;color:#fff}' +
    '.mcchip{display:inline-flex;align-items:center;gap:4px;background:#0e2147;border:1px solid #1f4a99;color:#fff;font-weight:700;font-size:13px;padding:6px 10px;border-radius:14px;text-decoration:none;white-space:nowrap}.mcchip:hover{background:#12306a}' +
    '.mcm{position:absolute;top:calc(100% + 8px);left:0;min-width:270px;background:var(--b1);border:1px solid #3a3835;border-radius:14px;box-shadow:0 16px 44px #000c;padding:8px;display:none;z-index:60}.mcsw.open .mcm{display:block}' +
    '.mch{font-size:11px;letter-spacing:.14em;color:#8a919a;font-weight:700;padding:6px 8px 8px}' +
    '.mci{display:flex;align-items:center;gap:12px;padding:10px;border-radius:10px;color:var(--tx);text-decoration:none;border:1px solid transparent}.mci:hover{background:var(--b2);color:var(--hi)}.mci.cur{background:#0e2147;border-color:#1f4a99;color:#fff}' +
    '.mcic{width:36px;height:36px;border-radius:10px;display:grid;place-items:center;font-size:22px;background:var(--b2);color:#fff;flex:none}.mci.cur .mcic{background:#0a6cf5}' +
    '.mct{display:flex;flex-direction:column;line-height:1.25;min-width:0}.mct>span:first-child{font-weight:700;color:var(--hi);font-size:14px}.mct>span+span{font-size:12px;color:#9fb4d6}.mck{margin-left:auto;color:#6fd16f;font-weight:800;visibility:hidden}.mci.cur .mck{visibility:visible}' +
    '.mcf{margin:6px 2px 2px;padding:10px;border-top:1px solid #3a3835;font-size:12px;color:#9fb4d6;display:flex;justify-content:space-between;gap:8px;align-items:center}.mcf a{color:#7fb2ff;text-decoration:none;font-weight:600}' +
    '.mcstrip{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 14px}.mcstrip a{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;background:#ffffff14;border:1px solid #ffffff22;color:#dbe7ff;font-size:13px;font-weight:600;text-decoration:none;white-space:nowrap}.mcstrip a:hover{background:#ffffff26}.mcstrip a.cur{background:#0a6cf5;border-color:#3d8bff;color:#fff}.mcstrip em{font-style:normal;opacity:.85;font-weight:700}' +
    '@media(max-width:620px){nav button[data-go="home"]{display:none}.mcb .mcl{display:none}.mcchip .mcw{display:none}nav .mcb{padding:7px 8px}.mcchip{padding:5px 8px;font-size:12px}.mcm{position:fixed;left:8px;right:8px;top:54px;min-width:0}}' +
    '@media(max-width:420px){nav{padding:0 4px;gap:1px}nav button{padding:8px 4px}nav .rep{padding:7px 8px}.mcsw{margin:0}}';
  function strip() {
    return '<div class="mcstrip">' + ['o', 'm', 'e'].map(function (k) {
      return '<a href="' + LINK[k] + '"' + (k === CUR ? ' class="cur" aria-current="page"' : '') + '>' + ICON[k] + ' ' + NAMES[k] + ' <em data-mcr="' + k + '">1000</em></a>';
    }).join('') + '</div>';
  }
  function live() {
    var d = root.document; if (!d || !CUR) return;
    var S = stateC(), hl = d.querySelector('.hero2 .hl');
    if (hl && !hl.querySelector('.mcstrip')) hl.insertAdjacentHTML('afterbegin', strip());
    function each(attr, fn) { var n = d.querySelectorAll('[' + attr + ']'); for (var i = 0; i < n.length; i++) fn(n[i], n[i].getAttribute(attr)); }
    each('data-mcr', function (el, k) { var v = k === 'all' ? S.rating : S.ph[k] && S.ph[k].r; if (v != null && el.textContent !== String(v)) el.textContent = v; });
    each('data-mcr-title', function (el, k) { var v = title(k === 'all' ? S.rating : S.ph[k] ? S.ph[k].r : 1000); if (el.textContent !== v) el.textContent = v; });
    each('data-mcs', function (el, k) { var v = S.ph[k] ? S.ph[k].nsolved : 0; if (el.textContent !== String(v)) el.textContent = v; });
  }
  function mount(cur) {
    var d = root.document; if (!d || CUR) return; CUR = cur;
    var st = d.createElement('style'); st.id = 'mc64-ui'; st.textContent = CSS; d.head.appendChild(st);
    var nav = d.querySelector('nav');
    if (nav) {
      var w = d.createElement('div'); w.className = 'mcsw'; w.id = 'mc64sw';
      w.innerHTML = '<button type="button" class="mcb" aria-haspopup="true" aria-expanded="false" aria-label="Switch puzzle set">♟ <span class="mcl">' + NAMES[cur] + '</span> ▾</button>' +
        '<a class="mcchip" href="' + DASH + '" title="Your overall MyChess64 Rating (live) – open your dashboard">⭐ <span data-mcr="all">1000</span><span class="mcw"> MCR</span></a>' +
        '<div class="mcm" role="menu"><div class="mch">SWITCH PUZZLE SET</div>' +
        ['o', 'm', 'e'].map(function (k) {
          return '<a class="mci' + (k === cur ? ' cur' : '') + '" role="menuitem" href="' + LINK[k] + '"' + (k === cur ? ' aria-current="page"' : '') + '><span class="mcic">' + ICON[k] + '</span><span class="mct"><span>' + NAMES[k] + ' Puzzles</span><span>Rating <span data-mcr="' + k + '">1000</span> · <span data-mcs="' + k + '">0</span> solved</span></span><span class="mck">✓</span></a>';
        }).join('') +
        '<div class="mcf"><span>⭐ Overall <b data-mcr="all" style="color:#fff">1000</b> · <span data-mcr-title="all"></span></span><a href="' + DASH + '">Dashboard →</a></div></div>';
      var logo = nav.querySelector('#logo'); nav.insertBefore(w, logo ? logo.nextSibling : nav.firstChild);
      var btn = w.querySelector('.mcb');
      btn.addEventListener('click', function (e) { e.stopPropagation(); var o = w.classList.toggle('open'); btn.setAttribute('aria-expanded', o ? 'true' : 'false'); });
      d.addEventListener('click', function (e) { if (!w.contains(e.target)) { w.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
      d.addEventListener('keydown', function (e) { if (e.key === 'Escape') { w.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
    }
    live();
    try {
      var q = 0;
      OBS = new MutationObserver(function () {
        if (q) return; q = 1;
        (root.requestAnimationFrame || root.setTimeout)(function () { q = 0; try { live(); } catch (e) { } });
      });
      OBS.observe(d.body, { childList: true, subtree: true });
    } catch (e) { }
    watch(function () { });
    sync();   /* pull this player's progress from other devices, push anything pending */
  }
  function tag() {    /* " · MCR +12 → 1045" for the attempt that was just recorded */
    var l = API.last; if (!l || Date.now() - l.t > 2000) return '';
    API.last = null;
    return ' · MCR ' + (l.d > 0 ? '+' : '') + l.d + ' → ' + l.r;
  }

  var API = {
    rec: rec, seed: seed, reset: resetPhase, state: state, events: events, phaseRating: phaseRating,
    claim: claim, watch: watch, mount: mount, live: live, title: title, tag: tag, last: null,
    user: currentUser, me: me, sync: sync, pull: pull, flush: flush, names: NAMES,
    _reduce: reduce, _init: init, _replay: replay, _overall: overall, _dk: dk
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  root.MC64 = API;
})(typeof window !== 'undefined' ? window : globalThis);
