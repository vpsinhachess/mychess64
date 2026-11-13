// MyChess64 – Admin Dashboard (admin.html). Full administrative control (Supabase RLS: admins table).
import { initBackend, B } from './backend.js';
import { seedDemo } from './sample.js';
import { loginHTML, recoveryHTML, applyKeepRule, doLogin, doForgot, doNewPw, profileForm, readProfile, previewCard, avatar, reach, ui, getPhoto } from './ui.js';
import { $, esc, today, fd, money, digits, ago, toast, errText, D, hooks, load, ADMIN_TABLES, save, remove, stat, COL } from './state.js';

const S = { user: null, tab: 'ov', rq: '', rf: 'all', edit: '', note: '' };
let pendingMsg = '', pendingUser = null;
const TABS = [['ov', '🏠', 'Overview'], ['req', '📥', 'Demo requests'], ['apps', '📝', 'Applications'], ['coaches', '🧑‍🏫', 'Coaches'], ['rev', '⭐', 'Reviews'], ['sum', '📊', 'Coach summary'], ['data', '🗂', 'Data']];
const MAIN = ['ov', 'req', 'apps', 'coaches'];
const val = i => $(i).value.trim();
const opts = (arr, cur) => arr.map(o => `<option ${o === cur ? 'selected' : ''}>${o}</option>`).join('');
const PEND = () => D.coaches.filter(c => c.status === 'pending').length;
const NEW = () => D.requests.filter(r => r.status === 'new').length, NA = () => D.apps.filter(a => a.status === 'new').length;
const cName = id => (D.coaches.find(c => c.id === id) || {}).name || '—';
const emailOf = id => (D.coach_private.find(p => p.id === id) || {}).email || '';
const empty = m => `<div class="card mu">${m}</div>`;
const head = (t, extra = '') => `<div class="ph"><h2>${t}</h2>${extra}</div>`;
async function run(fn, ok) { try { await fn(); if (ok) toast(ok); } catch (e) { console.error(e); toast(errText(e), 1); } }
const tempPw = () => Math.random().toString(36).slice(2, 6) + Math.random().toString(36).slice(2, 6).toUpperCase() + '7!';

function showLogin(msg) { $('app').hidden = true; const L = $('login'); L.hidden = false; L.className = 'lgwrap'; L.innerHTML = loginHTML('admin', msg); }
function showApp() {
  $('login').hidden = true; const a = $('app'); a.hidden = false;
  a.innerHTML = `<header class="top"><img class="tlogo" src="assets/header-logo.webp" alt="MyChess64"><b class="tt">Admin</b><span class="sp"></span><span class="mu hide-s">${esc(S.user.email)}</span><a class="btn o sm hide-s" href="index.html" target="_blank">Website ↗</a><button class="btn sm" onclick="app.logout()">Log out</button></header>
<div class="body"><nav class="side" id="nav"></nav><main id="main"></main></div><nav class="bottom" id="bnav"></nav><div class="md" id="more" onclick="if(event.target===this)this.classList.remove('on')"><div class="mb sheet" id="sheet"></div></div>`;
  render(true);
}
function nav() {
  const badge = k => k === 'req' ? NEW() : k === 'apps' ? NA() : k === 'coaches' ? PEND() : 0;
  const btn = ([k, i, l]) => `<button class="${k === S.tab ? 'on' : ''}" onclick="app.go('${k}')"><i>${i}</i><span>${l}</span>${badge(k) ? `<em>${badge(k)}</em>` : ''}</button>`;
  $('nav').innerHTML = TABS.map(btn).join('');
  $('bnav').innerHTML = TABS.filter(t => MAIN.includes(t[0])).map(btn).join('') + `<button onclick="app.more()"><i>☰</i><span>More</span></button>`;
}
const more = () => { $('sheet').innerHTML = '<h3>All sections</h3><div class="tiles">' + TABS.map(([k, i, l]) => `<button onclick="document.getElementById('more').classList.remove('on');app.go('${k}')"><i>${i}</i><b>${l}</b></button>`).join('') + '</div>'; $('more').classList.add('on'); };
function go(t) { if (t !== 'apps') S.note = ''; S.tab = t; render(true); window.scrollTo && scrollTo(0, 0); }
function render(force) {
  if (!S.user || S.user.role !== 'admin' || $('app').hidden || !$('main')) return;
  const a = document.activeElement; if (!force && a && $('main').contains(a) && /INPUT|TEXTAREA|SELECT/.test(a.tagName)) { nav(); return; }
  nav(); $('main').innerHTML = { ov, req, apps, coaches, rev, sum, data }[S.tab]();
  const fn = { ov: ovList, req: reqList, apps: appList, coaches: coachList, rev: revList }[S.tab]; if (fn) fn();
}

/* ---- overview ---- */
function ov() {
  const paid = D.payments.filter(p => p.status === 'paid').reduce((a, p) => a + +p.amount, 0);
  return `${head('Admin Overview')}<div class="kpis"><div onclick="app.go('req')"><b>${NEW()}</b><span>New demo requests</span></div><div onclick="app.go('req')"><b>${D.requests.length}</b><span>Total requests</span></div><div onclick="app.go('apps')"><b>${NA()}</b><span>New applications</span></div><div onclick="app.go('coaches')"><b>${D.coaches.length}</b><span>Coaches</span></div><div onclick="app.go('coaches')"><b>${PEND()}</b><span>Pending approval</span></div><div><b>${D.students.length}</b><span>Students (all coaches)</span></div><div><b>${money(paid)}</b><span>Fees recorded by coaches</span></div><div onclick="app.go('rev')"><b>${D.reviews.length}</b><span>Reviews</span></div><div onclick="app.go('sum')"><b>${D.attendance.length}</b><span>Attendance records</span></div></div><h3 class="sec">Latest demo requests</h3><div id="list"></div>`;
}
const ovList = () => { $('list').innerHTML = D.requests.slice(0, 5).map(rq).join('') || empty('No demo requests yet.'); };

/* ---- requests ---- */
const rq = r => `<div class="card bkc"><div class="r1"><b>${esc(r.name)}</b><span class="bdg s-${r.status}">${r.status}</span></div><div class="mu">📚 ${esc(r.cat || '—')}${r.slot ? ' · 🕑 ' + esc(r.slot) : ''} · ${ago(r.created_at)}</div><div class="acts">${reach(r)}</div>
<div class="r3 r4"><select onchange="app.assign('${r.id}',this.value)"><option value="">Assign coach…</option>${D.coaches.map(c => `<option value="${c.id}" ${c.id === r.coach_id ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select><select onchange="app.setReq('${r.id}',this.value)">${opts(['new', 'contacted', 'confirmed', 'done', 'cancelled'], r.status)}</select><button class="ic del" onclick="app.delReq('${r.id}')">🗑 Delete</button></div></div>`;
function req() { return `${head('Demo requests', `<span class="acts"><input placeholder="Search name / phone" value="${esc(S.rq)}" oninput="app.rq(this.value)"><select onchange="app.rf(this.value)">${['all', 'new', 'contacted', 'confirmed', 'done', 'cancelled'].map(k => `<option ${S.rf === k ? 'selected' : ''}>${k}</option>`).join('')}</select><button class="btn o sm" onclick="app.csv()">Export CSV</button></span>`)}<div id="list"></div>`; }
const reqList = () => { const q = S.rq.toLowerCase(); $('list').innerHTML = D.requests.filter(r => (S.rf === 'all' || r.status === S.rf) && (!q || ((r.name || '') + (r.phone || '')).toLowerCase().includes(q))).map(rq).join('') || empty('No matching requests.'); };

/* ---- applications ---- */
const apps = () => `${head('Coach applications')}<div id="note" class="note">${S.note}</div><div id="list"></div>`;
const appList = () => { $('list').innerHTML = D.apps.map(a => `<div class="card bkc"><div class="r1"><b>${esc(a.name)}</b><span class="bdg s-${a.status === 'approved' ? 'done' : a.status === 'rejected' ? 'cancelled' : 'new'}">${a.status}</span></div><div class="mu">${esc(a.rating || '')} · ${esc(a.city || '')} · ${ago(a.created_at)}</div><div class="mu">✉ <a href="mailto:${esc(a.email)}">${esc(a.email)}</a></div><div class="acts">${a.status === 'new' ? `<button class="btn sm" onclick="app.approve('${a.id}')">Approve &amp; create login</button><button class="ic" onclick="app.appSt('${a.id}','rejected')">Reject</button>` : ''}<button class="ic del" onclick="app.delApp('${a.id}')">🗑 Delete</button></div></div>`).join('') || empty('No applications yet.'); };
const approve = id => run(async () => {
  const a = D.apps.find(x => x.id === id), pw = tempPw(), cid = await B.createUser(a.email.toLowerCase(), pw);
  await B.ins('coaches', { id: cid, name: a.name, title: a.rating || '', city: a.city || 'India', mode: 'Online', cats: ['Kids'], price: 600, exp: 0, students_count: 0, langs: 'English', bio: 'New coach on MyChess64.', photo_url: '', c1: COL[0][0], c2: COL[0][1], status: 'active' });
  await B.ins('coach_private', { id: cid, email: a.email.toLowerCase() }); await save('apps', { status: 'approved' }, id); await load(['coaches', 'coach_private']);
  S.note = `✓ ${esc(a.name)} approved and listed. Login: <b>${esc(a.email)}</b> · temporary password <b>${esc(pw)}</b> — share it with the coach (they can change it in Settings). If Supabase “Confirm email” is ON, the coach must first click the confirmation email.`;
  render(true);
});

/* ---- coaches ---- */
function coaches() { return `${head('Coaches', '<button class="btn sm" onclick="app.newCoach()">+ Add coach</button>')}<div id="cf"></div><div id="list"></div>`; }
function coachList() {
  $('list').innerHTML = D.coaches.map(c => { const pay = D.payments.filter(p => p.coach_id === c.id && p.status === 'paid').reduce((a, p) => a + +p.amount, 0); return `<div class="card bkc"><div class="rwl">${avatar(c, 'sm')}<div><b>${esc(c.name)}</b> <span class="bdg s-${c.status === 'hidden' ? 'cancelled' : c.status === 'pending' ? 'contacted' : 'done'}">${c.status === 'hidden' ? 'hidden' : c.status === 'pending' ? 'pending approval' : 'live'}</span><div class="mu">${esc(c.title)} · ${esc(c.city)} · ${money(c.price)}/hr</div><div class="mu">✉ ${esc(emailOf(c.id) || 'no login') } · 👥 ${D.students.filter(s => s.coach_id === c.id).length} students · 💰 ${money(pay)}</div></div></div><div class="acts">${c.status === 'pending' ? `<button class="btn sm" onclick="app.activate('${c.id}')">✓ Approve</button>` : ''}<button class="ic" onclick="app.editCoach('${c.id}')">✏️ Edit</button>${c.status === 'pending' ? '' : `<button class="ic" onclick="app.hide('${c.id}')">${c.status === 'hidden' ? 'Show' : 'Hide'}</button>`}<button class="ic del" onclick="app.delCoach('${c.id}')">🗑 Delete</button></div></div>`; }).join('') || empty('No coaches yet — add one.');
}
function coachForm(c) {
  S.edit = c ? c.id : ''; ui.photoOwner = () => S.edit || 'new-' + Date.now();
  $('cf').innerHTML = `<div class="card"><div class="ch"><b>${c ? 'Edit coach' : 'Add coach (creates their login)'}</b><button class="lnk" onclick="document.getElementById('cf').innerHTML=''">Close</button></div><div class="pfgrid"><div>${profileForm(c, { admin: true, isNew: !c })}<div class="acts"><button class="btn" onclick="app.saveCoach()">Save</button></div></div><div id="pvbox">${previewCard()}</div></div></div>`;
  $('cf').scrollIntoView();
}
const saveCoach = () => run(async () => {
  const p = readProfile(); if (!p.name || !p.title) return toast('Name and title are required', 1);
  if (S.edit) { await save('coaches', p, S.edit); toast('Coach saved ✓'); }
  else {
    const em = val('f_em').toLowerCase(), pw = val('f_pw'); if (!em || pw.length < 8) return toast('Login email and an 8+ character password are required', 1);
    const id = await B.createUser(em, pw); await B.ins('coaches', { id, ...p, status: 'active' }); await B.ins('coach_private', { id, email: em }); await load(['coaches', 'coach_private']);
    toast('Coach created ✓ — they can log in at coach.html'); 
  }
  $('cf').innerHTML = ''; render(true);
});

/* ---- reviews ---- */
const rev = () => `${head('Reviews')}<div class="card"><b>Add player review</b><div class="g2"><label>Coach<select id="v_c">${D.coaches.map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join('')}</select></label><label>Player name<input id="v_n"></label><label>Stars<select id="v_s">${[5, 4, 3, 2, 1].map(n => `<option>${n}</option>`).join('')}</select></label></div><label>Review<textarea id="v_t" rows="2"></textarea></label><button class="btn" onclick="app.addRev()">Add review</button></div><div id="list"></div>`;
const revList = () => { $('list').innerHTML = D.reviews.map(r => `<div class="card"><div class="r1"><b>${esc(r.name)} → ${esc(cName(r.coach_id))}</b><span class="stars">${'★'.repeat(+r.stars || 5)}</span></div><p>${esc(r.text)}</p><div class="acts"><button class="ic del" onclick="app.delRev('${r.id}')">🗑 Delete</button></div></div>`).join('') || empty('No reviews yet.'); };
const addRev = () => { if (!val('v_n') || !val('v_t') || !$('v_c').value) return toast('Coach, name and review text are required', 1); return run(async () => { await save('reviews', { coach_id: $('v_c').value, name: val('v_n'), text: val('v_t'), stars: +$('v_s').value }); $('v_n').value = ''; $('v_t').value = ''; }, 'Review added ✓'); };

/* ---- summary + data ---- */
function sum() {
  return `${head('Coach summary')}<div class="card" style="overflow:auto"><table class="tbl"><tr><th>Coach</th><th>Students</th><th>Classes</th><th>Bookings</th><th>Attendance</th><th>Earned</th><th>Pending</th><th>Rating</th></tr>${D.coaches.map(c => { const P = D.payments.filter(p => p.coach_id === c.id), a = D.attendance.filter(x => x.coach_id === c.id), s = stat(c); return `<tr><td><b>${esc(c.name)}</b></td><td>${D.students.filter(x => x.coach_id === c.id).length}</td><td>${D.classes.filter(x => x.coach_id === c.id).length}</td><td>${D.requests.filter(x => x.coach_id === c.id).length}</td><td>${a.length ? Math.round(a.filter(x => x.status !== 'absent').length / a.length * 100) + '%' : '—'}</td><td>${money(P.filter(p => p.status === 'paid').reduce((t, p) => t + +p.amount, 0))}</td><td>${money(P.filter(p => p.status !== 'paid').reduce((t, p) => t + +p.amount, 0))}</td><td>${s.n ? s.r.toFixed(1) : '—'}</td></tr>`; }).join('')}</table></div>`;
}
const data = () => `${head('Data')}<div class="card"><b>Export</b><p class="mu">Download every demo request as a spreadsheet (CSV).</p><button class="btn" onclick="app.csv()">Export demo requests</button></div>${B.mode === 'demo' ? '<div class="card"><b>Demo mode</b><p class="mu">Sample coaches, students and bookings were created for you. Clear them by clearing this site’s browser data.</p></div>' : `<div class="card"><b>Connected to Supabase</b><p class="mu">Everything you add here is stored in your Supabase project and shown live on the website.</p></div>`}`;
function csv() {
  const q = s => '"' + String(s ?? '').replace(/"/g, '""') + '"', rows = [['Date', 'Name', 'Phone', 'Category', 'Coach', 'Slot', 'Status', 'Note'], ...D.requests.map(r => [new Date(r.created_at).toLocaleString('en-IN'), r.name, r.phone, r.cat, cName(r.coach_id), r.slot, r.status, r.note])].map(r => r.map(q).join(',')).join('\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([rows], { type: 'text/csv' })); a.download = 'demo-requests.csv'; a.click();
}

window.ui = ui;
window.app = {
  login: doLogin, forgot: doForgot, logout: () => B.logout(), go, more, csv, approve, saveCoach, addRev,
  rq: v => { S.rq = v; reqList(); }, rf: v => { S.rf = v; reqList(); },
  assign: (id, cid) => run(() => save('requests', { coach_id: cid || null }, id), cid ? 'Assigned — the coach can now see it' : 'Assignment removed'),
  setReq: (id, v) => run(() => save('requests', { status: v }, id), 'Status updated'), delReq: id => confirm('Delete this request?') && run(() => remove('requests', id)),
  appSt: (id, v) => run(() => save('apps', { status: v }, id)), delApp: id => confirm('Delete this application?') && run(() => remove('apps', id)),
  newCoach: () => coachForm(null), editCoach: id => coachForm(D.coaches.find(c => c.id === id)),
  activate: id => run(() => save('coaches', { status: 'active' }, id), 'Approved ✓ — now live on the website'),
  hide: id => { const c = D.coaches.find(x => x.id === id); return run(() => save('coaches', { status: c.status === 'hidden' ? 'active' : 'hidden' }, id)); },
  delCoach: id => confirm('Delete this coach and ALL their students, classes and records? (Their login must be removed separately in Supabase → Authentication.)') && run(() => remove('coaches', id)),
  delRev: id => confirm('Delete this review?') && run(() => remove('reviews', id)),
  newPw: async () => { if (await doNewPw()) { B.recovery = false; history.replaceState(null, '', location.pathname); if (pendingUser) enter(); } }
};

async function enter() { await load(ADMIN_TABLES); showApp(); }
document.documentElement.classList.add('js'); window.__mc64 = true;
(async () => {
  await initBackend(); hooks.render = () => render(); await seedDemo(); await applyKeepRule();
  B.onAuth(u => {
    if (u && S.user && S.user.uid === u.uid && S.user.role === u.role && !u.recovery) { S.user = u; return; }  // token refresh etc.
    S.user = u;
    if (!u) { showLogin(pendingMsg); pendingMsg = ''; return; }
    if (u.recovery) { pendingUser = u; $('app').hidden = true; $('login').hidden = false; $('login').className = 'lwrap'; $('login').innerHTML = recoveryHTML(); return; }
    if (u.role === 'admin') return enter();
    pendingMsg = u.role === 'coach' ? 'This is the admin area. Coaches: use the Coach Portal (coach.html).' : 'Signed in as ' + u.email + ', but this account is not an admin' + (u.err ? ' (' + u.err + ')' : '') + '. In Supabase run: insert into admins (user_id) values (\'' + u.uid + '\');';
    B.logout();
  });
})();
