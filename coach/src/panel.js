// Login, Admin panel and Coach dashboard
import { B } from './backend.js';
import { draw } from './public.js';
import { $, esc, uid, ini, today, fd, tf, strip, toast, COL, CATS, D, ST, hooks, stat, seats, upcoming } from './state.js';

let keepOpen = false, at = 'ov', rqs = '', ct = 'ov', tmpPh = '', pendingOpen = false, privSubs = [];
const isAdmin = () => ST.user && ST.user.role === 'admin';
const myId = () => ST.user && ST.user.uid;
const mine = () => D.coaches.find(c => c.id === myId());
const emailOf = id => (D.coachPrivate.find(p => p.id === id) || {}).email || '';
const panelOpen = () => $('app').classList.contains('on');
const errMsg = e => ({ 'auth/email-already-in-use': 'That email already has an account.', 'auth/weak-password': 'Password must be at least 6 characters.', 'auth/invalid-email': 'Invalid email address.', 'permission-denied': 'Permission denied (check Firestore rules / admin setup).' })[e && e.code] || (e && e.message) || 'Something went wrong';

/* ---------- auth ---------- */
export function startAuth() {
  B.onAuth(u => {
    ST.user = u; privSubs.forEach(f => f()); privSubs = [];
    if (u && u.role === 'admin') {
      privSubs.push(B.sub('requests', a => { D.requests = a; hooks.render(); }), B.sub('apps', a => { D.apps = a; hooks.render(); }), B.sub('coachPrivate', a => { D.coachPrivate = a; hooks.render(); }));
    } else if (u && u.role === 'coach') {
      privSubs.push(B.sub('requests', a => { D.requests = a; hooks.render(); }, ['cid', u.uid]));
    } else {
      D.requests = []; D.apps = []; D.coachPrivate = [];
      if (pendingOpen && u) { // signed in, but no admin/coach record
        pendingOpen = false; keepOpen = true; const m = $('l_msg');
        if (m) m.innerHTML = '⚠ Signed in as <b>' + esc(u.email) + '</b>, but this account has no admin or coach access' + (u.err ? ' (' + esc(u.err) + ')' : '') + '.<br>If you are the admin: in Firebase → Firestore create collection <b>admins</b> with Document ID <b>' + esc(u.uid) + '</b>. Also check that firestore.rules are published.';
        B.logout();
      } else if (panelOpen() && !pendingOpen && !keepOpen) closeApp();
      if (!u) keepOpen = false;
    }
    authUI(); hooks.render();
    if (pendingOpen && u && u.role) { pendingOpen = false; openPanel(); }
  });
}
function authUI() { const b = $('loginBtn'); if (b) b.textContent = ST.user && ST.user.role ? 'Dashboard' : 'Login'; }

export function openLogin() {
  window.menu && window.menu(1); $('app').classList.add('on'); document.body.style.overflow = 'hidden';
  if (ST.user && ST.user.role) return openPanel();
  $('app').innerHTML = `<div class="lgw"><div class="fm lgb"><h3>Login</h3><p class="mu">Coaches and admins sign in here.</p><input id="l_e" type="email" placeholder="Email" autocomplete="username"><input id="l_p" type="password" placeholder="Password" autocomplete="current-password" onkeydown="if(event.key==='Enter')doLogin()"><button class="btn" onclick="doLogin()">Sign in</button><p id="l_msg" class="mu" style="color:#b91c1c"></p><button class="btn o" onclick="forgot()">Forgot password?</button><button class="btn o" onclick="closeApp()">Cancel</button>${B.mode === 'demo' ? '<p class="mu"><b>Demo mode</b> (add Firebase config for real logins)<br>Admin: admin@mychess64.com / admin123<br>Coach: aarav@mychess64.com / chess1234</p>' : ''}</div></div>`;
}
export async function doLogin() {
  const e = $('l_e').value.trim(), p = $('l_p').value; if (!e || !p) { toast('Enter email and password', 1); return; }
  try {
    $('l_msg').textContent = ''; pendingOpen = true; await B.login(e, p);
  } catch (err) { pendingOpen = false; toast(B.mode === 'demo' ? 'Invalid email or password' : 'Login failed (' + (err.code || err.message) + ')', 1); }
}
export async function forgot() {
  const e = ($('l_e') && $('l_e').value.trim()) || (ST.user && ST.user.email); if (!e) { toast('Type your email first', 1); return; }
  try { await B.reset(e); toast('Password-reset email sent to ' + e); } catch (err) { toast(errMsg(err), 1); }
}
function openPanel() { $('app').classList.add('on'); document.body.style.overflow = 'hidden'; isAdmin() ? aTab() : cTab(); }
export function closeApp() { $('app').classList.remove('on'); document.body.style.overflow = ''; }
export async function logout() { closeApp(); await B.logout(); }

const url = u => /^https?:\/\//i.test(u || '') ? u : '';
const shell = (t, tb, cur, fn) => `<div class="ah"><div class="wrap in2"><span class="ph2"><img class="plogo" src="assets/header-logo.webp" alt=""><b class="ttl">${t}</b></span><span class="mu">${B.mode === 'firebase' ? '● Live (Firebase)' : '● Demo mode · saved in this browser only'}</span><span style="display:flex;gap:8px"><button class="btn o sm" onclick="logout()">Log out</button><button class="btn sm" onclick="closeApp()">Close ✕</button></span></div><div class="at wrap">${tb.map(([k, l]) => `<button class="${k === cur ? 'on' : ''}" onclick="${fn}('${k}')">${l}</button>`).join('')}</div></div><div class="wrap" style="padding-top:20px;padding-bottom:70px"><div id="anote" class="note"></div><div id="abody"></div></div>`;
const empty = m => `<p class="mu">${m}</p>`;

/* ---------- shared coach form ---------- */
function cform(x, adm) {
  x = x || {}; tmpPh = x.photo || ''; const ci = Math.max(0, COL.findIndex(c => c[0] === x.c1)), isNew = !x.id;
  return `<div class="fm"><h3>${isNew ? 'Add coach' : 'Edit profile'}</h3><div class="g2"><label>Name<input id="f_n" value="${esc(x.name)}"></label><label>Title / rating<input id="f_t" value="${esc(x.title)}" placeholder="FIDE 2100"></label><label>City<input id="f_c" value="${esc(x.city)}"></label><label>Mode<select id="f_m">${['Online', 'Home', 'Both'].map(m => `<option ${x.mode === m ? 'selected' : ''}>${m}</option>`).join('')}</select></label><label>Fee ₹/hr<input id="f_p" type="number" value="${x.price || 500}"></label><label>Experience (yrs)<input id="f_e" type="number" value="${x.exp || 0}"></label><label>Students taught<input id="f_s" type="number" value="${x.students || 0}"></label><label>Languages<input id="f_l" value="${esc(x.langs)}"></label>
${isNew ? '<label>Login email<input id="f_em" type="email"></label><label>Temporary password (6+ chars)<input id="f_pw" type="text"></label>' : ''}</div>
<div class="cats">${CATS.map(c => `<label class="ck"><input type="checkbox" class="f_cat" value="${c}" ${(x.cats || []).includes(c) ? 'checked' : ''}> ${c}</label>`).join('')}</div><label>About<textarea id="f_b" rows="3">${esc(x.bio)}</textarea></label>
<div class="phrow"><div id="f_pv" class="pv">${x.photo ? `<img src="${x.photo}" alt="">` : 'No photo'}</div><label class="btn o sm" style="display:inline-block">Upload photo<input type="file" accept="image/*" hidden onchange="phPick(this)"></label><label>Banner colour<select id="f_col">${COL.map((c, i) => `<option value="${i}" ${i === ci ? 'selected' : ''}>Theme ${i + 1}</option>`).join('')}</select></label></div>
<div class="ra"><button class="btn" onclick="csave('${x.id || ''}',${!!adm})">Save</button>${adm ? `<button class="btn o" onclick="$('aform').innerHTML=''">Cancel</button>` : ''}${!isNew ? `<button class="btn o" onclick="sendReset('${x.id}')">Send password-reset email</button>` : ''}</div></div>`;
}
export function phPick(inp) {
  const f = inp.files[0]; if (!f) return; const r = new FileReader();
  r.onload = () => { const im = new Image(); im.onload = () => { const s = 480, c = document.createElement('canvas'); c.width = c.height = s; const m = Math.min(im.width, im.height); c.getContext('2d').drawImage(im, (im.width - m) / 2, (im.height - m) / 4, m, m, 0, 0, s, s); tmpPh = c.toDataURL('image/jpeg', .82); $('f_pv').innerHTML = `<img src="${tmpPh}" alt="">`; }; im.src = r.result; };
  r.readAsDataURL(f);
}
export async function sendReset(id) { const e = id === myId() ? ST.user.email : emailOf(id); if (!e) { toast('No email on record', 1); return; } try { await B.reset(e); toast('Password-reset email sent to ' + e); } catch (err) { toast(errMsg(err), 1); } }
export async function csave(id, adm) {
  const g = i => $(i).value.trim(); if (!g('f_n') || !g('f_t')) { toast('Name and title are required', 1); return; }
  const old = D.coaches.find(c => c.id === id) || {}, col = COL[+$('f_col').value];
  try {
    let cid = id;
    if (!id) {
      const em = g('f_em').toLowerCase(), pw = g('f_pw'); if (!em || pw.length < 6) { toast('Email and a 6+ character password are required', 1); return; }
      cid = await B.createUser(em, pw); await B.set('coachPrivate', cid, { email: em });
    }
    const o = { ...strip(old), name: g('f_n'), title: g('f_t'), city: g('f_c'), mode: $('f_m').value, price: +g('f_p') || 0, exp: +g('f_e') || 0, students: +g('f_s') || 0, langs: g('f_l'), bio: g('f_b'), cats: [...document.querySelectorAll('.f_cat:checked')].map(x => x.value), c1: col[0], c2: col[1], photo: tmpPh, status: old.status || 'active' };
    await B.set('coaches', cid, o); toast(id ? 'Saved ✓ — live on the website' : 'Coach created ✓ — they can now log in'); if (adm) $('aform').innerHTML = '';
  } catch (err) { console.error(err); toast(errMsg(err), 1); }
}

/* ---------- admin ---------- */
const NEW = () => D.requests.filter(r => r.status === 'new').length, NA = () => D.apps.filter(a => a.status === 'new').length;
export function aTab(k) {
  at = k || at;
  $('app').innerHTML = shell('MyChess64 Admin', [['ov', 'Overview'], ['req', 'Demo requests (' + NEW() + ' new)'], ['apps', 'Coach applications (' + NA() + ' new)'], ['coaches', 'Coaches'], ['reviews', 'Reviews'], ['data', 'Data']], at, 'aTab');
  $('abody').innerHTML = {
    ov: '<div class="ss4" id="kpi"></div><h3 style="margin:22px 0 10px">Latest demo requests</h3><div id="alist"></div>',
    req: '<div class="bar"><b>Demo requests</b><span><input id="rq_s" placeholder="Search name / phone" oninput="aList()"><select id="rq_f" onchange="aList()"><option value="all">All statuses</option><option>new</option><option>contacted</option><option>done</option></select><button class="btn o sm" onclick="exportCsv()">Export CSV</button></span></div><div id="alist"></div>',
    apps: '<div id="alist"></div>',
    coaches: '<div id="aform"></div><div class="bar"><b>Coaches</b><button class="btn sm" onclick="$(\'aform\').innerHTML=cformNew()">+ Add coach</button></div><div id="alist"></div>',
    reviews: '<div class="fm"><h3>Add player review</h3><div class="g2"><label>Coach<select id="rv_c">' + D.coaches.map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join('') + '</select></label><label>Player name<input id="rv_n"></label><label>Stars<select id="rv_s">' + [5, 4, 3, 2, 1].map(n => `<option>${n}</option>`).join('') + '</select></label></div><label>Review<textarea id="rv_t" rows="2"></textarea></label><div class="ra"><button class="btn" onclick="addRv()">Add review</button></div></div><div id="alist"></div>',
    data: '<div class="fm"><h3>Sample data</h3><p class="mu">Adds six sample coaches (without logins), reviews and two classes so you can see the design filled in. Delete them any time from the Coaches tab.</p><div class="ra"><button class="btn" onclick="loadSample()">Load sample data</button></div></div>'
  }[at];
  aList();
}
const rq = r => {
  const c = D.coaches.find(x => x.id === r.cid), p = String(r.phone || '').replace(/\D/g, '');
  return `<div class="rw"><div><b>${esc(r.name)}</b> <span class="bdg ${r.status}">${r.status}</span><div class="mu">📞 <a href="tel:${esc(r.phone)}">${esc(r.phone)}</a> · <a target="_blank" rel="noopener" href="https://wa.me/${p.length === 10 ? '91' + p : p}">WhatsApp</a></div><div class="mu">${esc(r.cat || '')}${c ? ' · Coach: ' + esc(c.name) : ''}${r.slot ? ' · ' + esc(r.slot) : ''}</div><div class="mu">${new Date(r.ts).toLocaleString('en-IN')}</div></div><div class="ra">${isAdmin() ? `<select onchange="assign('${r.id}',this.value)"><option value="">Assign coach…</option>${D.coaches.map(c => `<option value="${c.id}" ${c.id === r.cid ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select>` : ''}<select onchange="rstat('${r.id}',this.value)">${['new', 'contacted', 'done'].map(s => `<option ${s === r.status ? 'selected' : ''}>${s}</option>`).join('')}</select>${isAdmin() ? `<button class="btn o sm" onclick="del('requests','${r.id}')">Delete</button>` : ''}</div></div>`;
};
export async function rstat(id, v) { try { await B.set('requests', id, { ...strip(D.requests.find(x => x.id === id)), status: v }); } catch (e) { toast(errMsg(e), 1); } }
export async function assign(id, cid) { try { await B.set('requests', id, { ...strip(D.requests.find(x => x.id === id)), cid }); toast(cid ? 'Request assigned — the coach can now see it' : 'Assignment removed'); } catch (e) { toast(errMsg(e), 1); } }
export async function del(col, id) { if (!confirm('Delete this item?')) return; try { await B.remove(col, id); if (col === 'coaches') await B.remove('coachPrivate', id); } catch (e) { toast(errMsg(e), 1); } }
function badges() {
  const tb = document.querySelectorAll('.at button'); if (!tb.length) return;
  if (isAdmin()) { if (tb[1]) tb[1].textContent = 'Demo requests (' + NEW() + ' new)'; if (tb[2]) tb[2].textContent = 'Coach applications (' + NA() + ' new)'; }
  else if (tb[1]) tb[1].textContent = 'Bookings (' + D.requests.filter(r => r.status === 'new').length + ' new)';
}
export function aList() {
  const L = $('alist'); if (!L) return; badges(); if (!isAdmin()) { L.innerHTML = cList(); return; }
  const kp = $('kpi'); if (kp) kp.innerHTML = `<div><b>${NEW()}</b><span>New demo requests</span></div><div><b>${D.requests.length}</b><span>Total requests</span></div><div><b>${NA()}</b><span>New applications</span></div><div><b>${D.coaches.length}</b><span>Coaches</span></div><div><b>${D.reviews.length}</b><span>Reviews</span></div>`;
  const sorted = a => [...a].sort((x, y) => y.ts - x.ts);
  L.innerHTML = {
    ov: () => sorted(D.requests).slice(0, 5).map(rq).join('') || empty('No demo requests yet.'),
    req: () => { const q = (($('rq_s') || {}).value || '').toLowerCase(), f = ($('rq_f') || {}).value || 'all'; return sorted(D.requests).filter(r => (f === 'all' || r.status === f) && (!q || (r.name + r.phone).toLowerCase().includes(q))).map(rq).join('') || empty('No matching demo requests.'); },
    apps: () => sorted(D.apps).map(a => `<div class="rw"><div><b>${esc(a.name)}</b> <span class="bdg ${a.status}">${a.status}</span><div class="mu">${esc(a.rating)} · ${esc(a.city || '')}</div><div class="mu">✉ <a href="mailto:${esc(a.email)}">${esc(a.email)}</a></div><div class="mu">${new Date(a.ts).toLocaleString('en-IN')}</div></div><div class="ra">${a.status === 'new' ? `<button class="btn sm" onclick="approve('${a.id}')">Approve</button><button class="btn o sm" onclick="setApp('${a.id}','rejected')">Reject</button>` : ''}<button class="btn o sm" onclick="del('apps','${a.id}')">Delete</button></div></div>`).join('') || empty('No applications yet.'),
    coaches: () => D.coaches.map(c => `<div class="rw"><div class="rwl"><div class="pv sm2">${c.photo ? `<img src="${c.photo}" alt="">` : ini(c.name)}</div><div><b>${esc(c.name)}</b> <span class="bdg ${c.status === 'hidden' ? 'done' : 'new'}">${c.status === 'hidden' ? 'hidden' : 'live'}</span><div class="mu">${esc(c.title)} · ${esc(c.city)} · ₹${c.price}/hr</div><div class="mu">✉ ${esc(emailOf(c.id) || 'no login')}</div></div></div><div class="ra"><button class="btn sm" onclick="editCoach('${c.id}')">Edit</button><button class="btn o sm" onclick="toggleCoach('${c.id}')">${c.status === 'hidden' ? 'Show' : 'Hide'}</button><button class="btn o sm" onclick="del('coaches','${c.id}')">Delete</button></div></div>`).join('') || empty('No coaches yet — add one or load sample data.'),
    reviews: () => sorted(D.reviews).map(r => `<div class="rw"><div><span class="q" style="color:#f9a825">${'★'.repeat(+r.stars || 5)}</span> <b>${esc(r.name)}</b><div class="mu">${esc(r.text)}</div><div class="mu">Coach: ${esc((D.coaches.find(c => c.id === r.cid) || {}).name || '—')}</div></div><div class="ra"><button class="btn o sm" onclick="del('reviews','${r.id}')">Delete</button></div></div>`).join('') || empty('No reviews yet.'),
    data: () => ''
  }[at]();
}
export function editCoach(id) { $('aform').innerHTML = cform(D.coaches.find(x => x.id === id), true); $('app').scrollTo(0, 0); }
export const cformNew = () => cform(null, true);
export async function toggleCoach(id) { const c = D.coaches.find(x => x.id === id); try { await B.set('coaches', id, { ...strip(c), status: c.status === 'hidden' ? 'active' : 'hidden' }); } catch (e) { toast(errMsg(e), 1); } }
export async function setApp(id, s) { try { await B.set('apps', id, { ...strip(D.apps.find(a => a.id === id)), status: s }); } catch (e) { toast(errMsg(e), 1); } }
export async function approve(id) {
  const a = D.apps.find(x => x.id === id), pw = Math.random().toString(36).slice(2, 6) + Math.random().toString(36).slice(2, 6).toUpperCase() + '7';
  try {
    const cid = await B.createUser(a.email.toLowerCase(), pw);
    await B.set('coachPrivate', cid, { email: a.email.toLowerCase() });
    await B.set('coaches', cid, { name: a.name, title: a.rating, city: a.city || 'India', mode: 'Online', cats: ['Kids'], price: 600, exp: 0, students: 0, langs: 'English', bio: 'New coach on MyChess64.', c1: COL[0][0], c2: COL[0][1], photo: '', status: 'active' });
    await setApp(id, 'approved');
    $('anote').innerHTML = `✓ ${esc(a.name)} approved and listed. Login: <b>${esc(a.email)}</b> · temporary password <b>${pw}</b> — share it with the coach (they can change it with “Forgot password”).`;
  } catch (e) { toast(errMsg(e), 1); }
}
export async function addRv() {
  const t = $('rv_t').value.trim(), n = $('rv_n').value.trim(), c = $('rv_c').value; if (!t || !n || !c) { toast('Coach, name and review text are required', 1); return; }
  try { await B.set('reviews', uid(), { cid: c, name: n, text: t, stars: +$('rv_s').value, ts: Date.now() }); $('rv_t').value = ''; $('rv_n').value = ''; toast('Review added ✓'); } catch (e) { toast(errMsg(e), 1); }
}
export async function exportCsv() {
  const q = s => '"' + String(s ?? '').replace(/"/g, '""') + '"';
  const rows = [['Date', 'Name', 'Phone', 'Category', 'Coach', 'Slot', 'Status'], ...D.requests.map(r => [new Date(r.ts).toLocaleString('en-IN'), r.name, r.phone, r.cat, (D.coaches.find(c => c.id === r.cid) || {}).name || '', r.slot, r.status])].map(r => r.map(q).join(',')).join('\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([rows], { type: 'text/csv' })); a.download = 'demo-requests.csv'; a.click();
}

/* ---------- sample data ---------- */
export async function sample() {
  const d = n => { const t = new Date(); t.setDate(t.getDate() + n); return t.toISOString().slice(0, 10); };
  const S0 = [['Aarav Sharma', 'FIDE Master · 2310', 'Delhi', 'Online', ['Kids', 'Tournament'], 900, 12, 120, 'English, Hindi', 'Trained 120+ juniors; state-level medallists. Patient, structured lessons.', 0, 'aarav@mychess64.com'],
    ['Priya Nair', 'WIM · 2180', 'Bengaluru', 'Online', ['Kids', 'Adults'], 700, 9, 95, 'English, Malayalam', 'Makes chess fun for beginners aged 5–12 with games and puzzles.', 1, 'priya@mychess64.com'],
    ['Rohit Verma', 'IM · 2410', 'Mumbai', 'Online', ['Tournament', 'Openings'], 1500, 15, 60, 'English, Hindi', 'Opening repertoires and deep game analysis for rated players.', 2, 'rohit@mychess64.com'],
    ['Sneha Iyer', 'FIDE 1950', 'Chennai', 'Home', ['Kids', 'Adults'], 600, 7, 54, 'English, Tamil', 'Friendly home tuition for school kids and returning adult players.', 3, 'sneha@mychess64.com'],
    ['Vikram Singh', 'CM · 2050', 'Patna', 'Online', ['Adults', 'Openings'], 500, 8, 44, 'Hindi, English', 'Helps adult improvers break 1500 with simple, practical plans.', 4, 'vikram@mychess64.com'],
    ['Ananya Das', 'WFM · 2090', 'Kolkata', 'Online', ['Kids', 'Tournament'], 800, 10, 78, 'English, Bengali', 'Endgame specialist and former national under-14 girls champion.', 5, 'ananya@mychess64.com']];
  const R = [['Meera K.', 'Very patient and structured. Our son improved quickly.'], ['Rahul S.', 'Clear explanations and great game analysis after every class.'], ['Anita V.', 'Flexible timings and lessons the kids genuinely enjoy.']];
  for (let i = 0; i < 6; i++) {
    const a = S0[i], id = 's' + (i + 1);
    await B.set('coaches', id, { name: a[0], title: a[1], city: a[2], mode: a[3], cats: a[4], price: a[5], exp: a[6], students: a[7], langs: a[8], bio: a[9], c1: COL[a[10]][0], c2: COL[a[10]][1], photo: '', status: 'active' });
    if (B.mode === 'demo') { try { await B.createUser(a[11], 'chess1234', id); await B.set('coachPrivate', id, { email: a[11] }); } catch (e) {} }
    for (let k = 0; k < 2; k++) await B.set('reviews', 'r' + i + k, { cid: id, name: R[(i + k) % 3][0], text: R[(i + k) % 3][1], stars: 5, ts: Date.now() - i * 1e5 - k });
  }
  await B.set('classes', 'c1', { cid: 's1', title: 'Kids Tactics Group', date: d(2), time: '17:00', dur: 60, mode: 'Online', cap: 6, level: 'Beginner', link: '' });
  await B.set('classes', 'c2', { cid: 's1', title: 'Tournament Prep', date: d(4), time: '19:00', dur: 90, mode: 'Online', cap: 4, level: 'Advanced', link: '' });
}
export async function loadSample() { try { await sample(); toast('Sample data loaded ✓'); } catch (e) { toast(errMsg(e), 1); } }

/* ---------- coach dashboard ---------- */
export function cTab(k) {
  ct = k || ct; const c = mine(); if (!c) { $('app').innerHTML = shell('Coach dashboard', [], '', 'cTab'); $('abody').innerHTML = empty('Your coach profile was not found. Please contact the admin.'); return; }
  const nb = D.requests.filter(r => r.status === 'new').length, s = stat(c);
  $('app').innerHTML = shell('Coach dashboard · ' + esc(c.name), [['ov', 'Overview'], ['bk', 'Bookings (' + nb + ' new)'], ['sch', 'Schedule'], ['pf', 'My profile']], ct, 'cTab');
  $('abody').innerHTML = {
    ov: `<div class="ss4"><div><b>${D.requests.length}</b><span>Total bookings</span></div><div><b>${nb}</b><span>New requests</span></div><div><b>${upcoming(c.id).length}</b><span>Upcoming classes</span></div><div><b>${s.n ? s.r.toFixed(1) : '—'}</b><span>Rating (${s.n} reviews)</span></div></div><h3 style="margin:22px 0 10px">Next classes</h3><div id="alist"></div>`,
    bk: '<div id="alist"></div>',
    sch: `<div class="fm"><h3>Schedule a chess class</h3><div class="g2"><label>Class title<input id="s_t" placeholder="e.g. Opening Basics"></label><label>Date<input id="s_d" type="date" min="${today()}"></label><label>Time<input id="s_h" type="time" value="17:00"></label><label>Duration (min)<input id="s_u" type="number" value="60"></label><label>Mode<select id="s_m"><option>Online</option><option>Home</option></select></label><label>Seats<input id="s_c" type="number" value="5" min="1"></label><label>Level<select id="s_l"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label><label>Meeting link (optional)<input id="s_k" placeholder="https://"></label></div><div class="ra"><button class="btn" onclick="addCls()">Add to schedule</button></div></div><div id="alist"></div>`,
    pf: '<div id="aform">' + cform(c, false) + '</div>'
  }[ct];
  aList();
}
function cList() {
  const L = (a, m) => a.join('') || empty(m), id = myId();
  if (ct === 'bk') return L([...D.requests].sort((a, b) => b.ts - a.ts).map(rq), 'No bookings yet — students who book you appear here.');
  const cl = D.classes.filter(c => c.cid === id).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)), lim = ct === 'ov' ? cl.filter(c => c.date >= today()).slice(0, 4) : cl;
  return L(lim.map(c => `<div class="rw"><div><b>${esc(c.title)}</b> <span class="bdg ${c.date < today() ? 'done' : 'new'}">${c.date < today() ? 'past' : 'upcoming'}</span><div class="mu">${fd(c.date)} · ${tf(c.time)} · ${c.dur} min · ${esc(c.mode)} · ${esc(c.level)}</div><div class="mu">${(+c.cap) - seats(c)} booked of ${c.cap} seats${url(c.link) ? ` · <a target="_blank" rel="noopener" href="${esc(url(c.link))}">Join link</a>` : ''}</div></div>${ct === 'sch' ? `<div class="ra"><button class="btn o sm" onclick="del('classes','${c.id}')">Delete</button></div>` : ''}</div>`), 'No classes scheduled yet.');
}
export async function addCls() {
  const g = i => $(i).value.trim(); if (!g('s_t') || !g('s_d') || !g('s_h')) { toast('Title, date and time are required', 1); return; }
  try { await B.set('classes', uid(), { cid: myId(), title: g('s_t'), date: g('s_d'), time: g('s_h'), dur: +g('s_u') || 60, mode: $('s_m').value, cap: +g('s_c') || 1, level: $('s_l').value, link: url(g('s_k')) }); $('s_t').value = ''; toast('Class scheduled ✓ — students can now book it'); } catch (e) { toast(errMsg(e), 1); }
}

export function initPanel() {
  hooks.render = () => { draw(); if (panelOpen() && $('alist')) aList(); };
  Object.assign(window, { aList, assign, openLogin, doLogin, forgot, closeApp, logout, phPick, sendReset, csave, aTab, cTab, rstat, del, editCoach, cformNew, toggleCoach, setApp, approve, addRv, exportCsv, loadSample, addCls, $ });
  startAuth();
}
