/* Player dashboard: everything is derived from the player's activity log (see mc64-sync.js). */
(function () {
  'use strict';
  var SB = window.MC64_SB, MC = window.MC64, UI = window.MC64UI;
  var PH = { o: 'Opening', m: 'Middlegame', e: 'Endgame' };
  var LINK = { o: 'opening-puzzles.html', m: 'middlegame-puzzles.html', e: 'endgame-puzzles.html' };
  var filterSet = 'all';

  function $(s) { return document.querySelector(s); }
  function esc(s) { return UI.esc(s); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function pct(c, i) { var n = c + i; return n ? Math.round(100 * c / n) : 0; }
  function dayKey(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function dur(sec) {
    sec = Math.round(sec || 0);
    if (sec < 60) return sec + 's';
    var m = Math.floor(sec / 60);
    if (m < 60) return m + 'm ' + pad(sec % 60) + 's';
    var h = Math.floor(m / 60);
    return h + 'h ' + pad(m % 60) + 'm';
  }
  function when(t) {
    var d = new Date(t);
    return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' +
      d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  }
  function setText(id, v) { var el = document.getElementById(id); if (el && el.textContent !== String(v)) el.textContent = v; }

  function streak(days) {
    var n = 0, d = new Date();
    if (!days[dayKey(d)]) d.setDate(d.getDate() - 1);   /* a day still counts until midnight */
    while (days[dayKey(d)] && days[dayKey(d)].a > 0) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  function phases(S) {
    $('#phases').innerHTML = ['o', 'm', 'e'].map(function (k) {
      var P = S.ph[k], n = Object.keys(P.solved).length;
      return '<a class="ph-card" href="' + LINK[k] + '">' +
        '<span class="ph-k">' + PH[k] + ' puzzles</span>' +
        '<b>' + P.r + '</b>' +
        '<small>' + esc(MC.title(P.r)) + ' · peak ' + P.pk + '</small>' +
        '<span>' + n + ' solved · ' + P.att + ' attempts · ' + pct(P.cor, P.att - P.cor) + '% accuracy</span>' +
        '<em>Practice ' + PH[k].toLowerCase() + ' →</em></a>';
    }).join('');
  }

  function chart(S) {
    var el = $('#chart'), h = S.rh;
    if (!h.length) { el.innerHTML = '<p class="empty">Solve a puzzle to start your rating curve.</p>'; return; }
    var W = 640, H = 230, P = 30, n = h.length;
    var vals = h.map(function (x) { return x.r; });
    var lo = Math.min.apply(null, vals) - 20, hi = Math.max.apply(null, vals) + 20;
    if (hi - lo < 60) { var mid = (hi + lo) / 2; lo = mid - 30; hi = mid + 30; }
    function X(i) { return n < 2 ? W / 2 : P + i * (W - 2 * P) / (n - 1); }
    function Y(v) { return H - P - (v - lo) * (H - 2 * P) / (hi - lo); }
    var pts = h.map(function (x, i) { return X(i).toFixed(1) + ',' + Y(x.r).toFixed(1); }).join(' ');
    var area = X(0).toFixed(1) + ',' + (H - P) + ' ' + pts + ' ' + X(n - 1).toFixed(1) + ',' + (H - P);
    var last = h[n - 1];
    el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Rating over your last ' + n + ' attempts">' +
      '<line class="grid" x1="' + P + '" x2="' + (W - P) + '" y1="' + (H - P) + '" y2="' + (H - P) + '"/>' +
      '<line class="grid" x1="' + P + '" x2="' + (W - P) + '" y1="' + P + '" y2="' + P + '"/>' +
      '<text x="' + P + '" y="' + (P - 8) + '">' + Math.round(hi - 20) + '</text>' +
      '<text x="' + P + '" y="' + (H - P + 16) + '">' + Math.round(lo + 20) + '</text>' +
      '<text x="' + (W - P) + '" y="' + (H - P + 16) + '" text-anchor="end">last ' + n + ' attempts</text>' +
      '<polygon class="area" points="' + area + '"/>' +
      '<polyline class="line" points="' + pts + '"/>' +
      '<circle cx="' + X(n - 1).toFixed(1) + '" cy="' + Y(last.r).toFixed(1) + '" r="5"/>' +
      '</svg>';
  }

  function days(S) {
    var out = [], max = 1, today = new Date();
    for (var i = 13; i >= 0; i--) {
      var d = new Date(today); d.setDate(today.getDate() - i);
      var k = dayKey(d), v = S.days[k] || { a: 0, c: 0 };
      out.push({ d: d, k: k, a: v.a, c: v.c });
      if (v.a > max) max = v.a;
    }
    $('#days').innerHTML = out.map(function (x, idx) {
      var h = x.a ? Math.max(6, Math.round(100 * x.a / max)) : 0;
      var lbl = x.d.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2);
      return '<div class="bar' + (idx === out.length - 1 ? ' today' : '') + '" title="' + x.d.toDateString() + ': ' + x.a + ' puzzles, ' + x.c + ' solved">' +
        '<i style="height:' + h + '%;opacity:' + (x.a ? 1 : 0) + '"></i><span>' + lbl + '</span></div>';
    }).join('');
    var best = 0; Object.keys(S.days).forEach(function (k) { if (S.days[k].a > best) best = S.days[k].a; });
    setText('st-best', best + ' in a day');
  }

  function topics(S) {
    var list = Object.keys(S.cat).map(function (k) { return S.cat[k]; });
    list.sort(function (a, b) { return (b.c + b.i) - (a.c + a.i); });
    list = list.slice(0, 14);
    if (!list.length) { $('#topics').innerHTML = '<p class="empty">Your strengths appear here after your first puzzles.</p>'; return; }
    $('#topics').innerHTML = list.map(function (t) {
      var n = t.c + t.i, p = pct(t.c, t.i);
      return '<div class="topic"><span class="tag ' + t.p + '">' + PH[t.p] + '</span>' +
        '<div style="min-width:0"><div class="nm" title="' + esc(t.n) + '">' + esc(t.n) + '</div>' +
        '<div class="meter"><i style="width:' + p + '%"></i></div></div>' +
        '<div class="nums">' + p + '% · ' + t.c + '/' + n + '</div></div>';
    }).join('');
  }

  var rowsCache = [];
  function history(S) {
    var deltas = {};
    S.rh.forEach(function (x) { deltas[x.t + '|' + x.p] = x.d; });
    var evs = MC.events(undefined, 400).slice().reverse();
    rowsCache = evs.map(function (e) {
      var ok = e.r === 'c';
      return {
        t: e.t, p: e.p, cat: e.c || '', sub: e.s || '', label: e.l || '', goal: e.g || '',
        ok: ok, why: e.w || '', mv: e.mv || 0, sc: e.sc || 0,
        d: deltas[e.t + '|' + e.p]
      };
    });
    var rows = rowsCache.filter(function (r) { return filterSet === 'all' || r.p === filterSet; }).slice(0, 150);
    $('#histEmpty').hidden = rows.length > 0;
    $('#hist').innerHTML = rows.map(function (r) {
      var d = r.d == null ? '—' : (r.d > 0 ? '+' : '') + r.d;
      var dc = r.d == null ? '' : (r.d >= 0 ? 'up' : 'dn');
      var topic = [r.cat, r.sub].filter(Boolean).join(' › ') || '—';
      return '<tr><td>' + esc(when(r.t)) + '</td><td><span class="tag ' + r.p + '">' + PH[r.p] + '</span></td>' +
        '<td class="topiccell">' + esc(topic) + '</td><td>' + esc(r.label || '—') + '</td>' +
        '<td class="' + (r.ok ? 'ok' : 'no') + '">' + (r.ok ? '✓ Solved' : '✗ ' + esc(r.why || 'Missed')) + '</td>' +
        '<td>' + r.mv + '</td><td>' + dur(r.sc) + '</td><td class="' + dc + '">' + d + '</td></tr>';
    }).join('');
  }

  function totals(S) {
    var T = S.tot;
    setText('mcr', S.rating);
    setText('ttl', MC.title(S.rating) + ' · ' + S.pk + ' peak rating');
    setText('pk', 'Peak ' + S.pk);
    setText('st-solved', T.solved);
    setText('st-att', T.att);
    setText('st-acc', pct(T.cor, T.att - T.cor) + '%');
    setText('st-time', dur(T.secs));
    setText('st-moves', T.mv);
    setText('st-xp', S.xp);
    setText('st-streak', streak(S.days) + ' days');
  }

  function render() {
    if (!MC) return;
    var S = MC.state();
    totals(S); phases(S); chart(S); days(S); topics(S); history(S);
  }

  function exportCsv() {
    var head = ['date', 'time', 'set', 'category', 'subtopic', 'puzzle', 'goal', 'result', 'moves', 'seconds', 'mcr_change'];
    var rows = rowsCache.filter(function (r) { return filterSet === 'all' || r.p === filterSet; });
    var lines = [head.join(',')].concat(rows.map(function (r) {
      var d = new Date(r.t);
      var f = [d.toISOString().slice(0, 10), d.toTimeString().slice(0, 8), PH[r.p], r.cat, r.sub, r.label, r.goal,
        r.ok ? 'solved' : (r.why || 'missed'), r.mv, Math.round(r.sc), r.d == null ? '' : r.d];
      return f.map(function (v) { return '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"'; }).join(',');
    }));
    var blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'mychess64-puzzle-history.csv';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  $('#fp').addEventListener('change', function (e) { filterSet = e.target.value; render(); });
  $('#csv').addEventListener('click', exportCsv);

  function showAccount(name) {
    setText('who', name ? 'Hello, ' + name : 'Hello, guest');
    $('#navLogin').hidden = !!name;
    $('#signout').hidden = !name;
  }

  if (!MC) return;
  if (!SB || !SB.ready) {
    $('#notice').hidden = false;
    $('#notice').textContent = 'Sign-in is not set up yet. Progress shown here is saved on this device only.';
    showAccount(null); render(); MC.watch(render);
    return;
  }

  $('#signout').addEventListener('click', function () {
    SB.signOut().then(function () { location.replace('index.html'); });
  });

  SB.refresh().then(function () {
    var me = SB.me();
    if (!me) {
      location.replace('login.html?next=dashboard-student.html');
      return null;
    }
    showAccount(me.name);
    return MC.sync().then(function () { render(); MC.watch(render); });
  }).catch(function () {
    showAccount(null);
    $('#notice').hidden = false;
    $('#notice').textContent = 'Could not reach the server. Showing progress saved on this device.';
    render(); MC.watch(render);
  });
})();
