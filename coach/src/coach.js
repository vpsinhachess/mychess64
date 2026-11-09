// MyChess64 – Coach Portal (coach.html). Coaches only.
import { initBackend, B } from './backend.js';
import { sample } from './sample.js';
import { $, esc, uid, ini, today, fd, tf, strip, toast, diag, ls, COL, CATS, D, stat, seats, upcoming } from './state.js';

const S = { user: null, tab: 'home', bf: 'all', bq: '', sq: '', edit: '' };
let subReq = null, tmpPh = '', pendingMsg = '';
const TABS = [['home', '🏠', 'Home'], ['bk', '📥', 'Bookings'], ['sch', '📅', 'Schedule'], ['st', '👥', 'Students'], ['rv', '⭐', 'Reviews'], ['pf', '👤', 'Profile']];
const STAT = ['new', 'contacted', 'confirmed', 'done', 'cancelled'];
const me = () => D.coaches.find(c => c.id === (S.user && S.user.uid));
const url = u => /^https?:\/\//i.test(u || '') ? u : '';
const digits = p => { p = String(p || '').replace(/\D/g, ''); return p.length === 10 ? '91' + p : p; };
const ago = ts => { const m = Math.round((Date.now() - ts) / 6e4); return m < 1 ? 'just now' : m < 60 ? m + ' min ago' : m < 1440 ? Math.round(m / 60) + ' h ago' : Math.round(m / 1440) + ' d ago'; };
const ymd = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const addDays = (s, n) => { const d = new Date(s + 'T00:00'); d.setDate(d.getDate() + n); return ymd(d); };
const reach = r => `<a class="ic" href="tel:${esc(r.phone)}">📞 Call</a><a class="ic" target="_blank" rel="noopener" href="https://wa.me/${digits(r.phone)}">💬 WhatsApp</a>`;
const avatar = (c, cls = '') => `<div class="av ${cls}" style="background:linear-gradient(135deg,${c.c1 || '#0b6bde'},${c.c2 || '#19c3ff'})">${c.photo ? `<img src="${c.photo}" alt="">` : ini(c.name)}</div>`;
const publicLink = () => location.href.replace(/coach\.html.*$/, '') + 'index.html#coach=' + (S.user ? S.user.uid : '');
function students() {
  const m = {}; D.requests.forEach(r => { const k = digits(r.phone); const e = m[k] = m[k] || { name: r.name, phone: r.phone, n: 0, last: 0, cats: new Set() }; e.n++; e.last = Math.max(e.last, r.ts); if (r.cat) e.cats.add(r.cat); });
  return Object.values(m).sort((a, b) => b.last - a.last);
}

/* ---------------- login ---------------- */
function showLogin(msg) {
  $('app').hidden = true; const L = $('login'); L.hidden = false;
  L.innerHTML = `<div class="lcard"><img class="llogo" src="assets/header-logo.webp" alt="MyChess64"><h1>Coach Portal</h1><p class="mu">Sign in to manage your classes, bookings and profile.</p>
<p id="l_msg" class="err">${msg ? esc(msg) : ''}</p>
<input id="l_e" type="email" placeholder="Email" autocomplete="username"><input id="l_p" type="password" placeholder="Password" autocomplete="current-password" onkeydown="if(event.key==='Enter')cp.login()">
<button class="btn" onclick="cp.login()">Sign in</button><button class="btn o" onclick="cp.forgot()">Forgot password?</button>
${B.mode === 'demo' ? '<p class="mu demo"><b>Demo mode</b> (no Firebase keys yet)<br>Email: aarav@mychess64.com · Password: chess1234</p>' : ''}
<div class="feat"><span>📥 Bookings</span><span>📅 Class scheduler</span><span>👥 Students</span><span>⭐ Reviews</span><span>👤 Profile &amp; photo</span><span>🔗 Share link</span></div>
<a class="back" href="index.html">← Back to website</a></div>`;
}
async function login() {
  const e = $('l_e').value.trim(), p = $('l_p').value; if (!e || !p) { toast('Enter your email and password', 1); return; }
  try { await B.login(e, p); } catch (err) { toast(B.mode === 'demo' ? 'Invalid email or password' : 'Login failed (' + (err.code || err.message) + ')', 1); }
}
async function forgot() { const e = ($('l_e') || {}).value; if (!e) { toast('Type your email first', 1); return; } try { await B.reset(e.trim()); toast('Password-reset email sent'); } catch (err) { toast(err.code || 'Could not send', 1); } }
async function logout() { await B.logout(); }

/* ---------------- shell ---------------- */
function showApp() {
  $('login').hidden = true; const a = $('app'); a.hidden = false;
  a.innerHTML = `<header class="top"><img class="tlogo" src="assets/header-logo.webp" alt="MyChess64"><span class="sp"></span><button class="btn o sm" onclick="cp.guide()">❓ Guide</button><a class="btn o sm hide-s" href="index.html" target="_blank">Website ↗</a><button class="btn sm" onclick="cp.logout()">Log out</button></header>
<div class="body"><nav class="side" id="nav"></nav><main id="main"></main></div>`;
  go(S.tab, true); if (!ls.get('mc64_tour')) { ls.set('mc64_tour', '1'); setTimeout(guide, 400); }
}
function nav() {
  const nb = D.requests.filter(r => r.status === 'new').length, c = me();
  $('nav').innerHTML = (c ? `<div class="who">${avatar(c, 'sm')}<div><b>${esc(c.name)}</b><span>${esc(c.title)}</span></div></div>` : '') + TABS.map(([k, i, l]) => `<button class="${k === S.tab ? 'on' : ''}" onclick="cp.go('${k}')"><i>${i}</i><span>${l}</span>${k === 'bk' && nb ? `<em>${nb}</em>` : ''}</button>`).join('');
}
function go(t, force) { S.tab = t; render(true); window.scrollTo && scrollTo(0, 0); }
function render(force) {
  if (!S.user || S.user.role !== 'coach' || $('app').hidden || !$('main')) return;
  const a = document.activeElement; if (!force && a && $('main').contains(a) && /INPUT|TEXTAREA|SELECT/.test(a.tagName)) { nav(); return; }
  nav(); const c = me();
  $('main').innerHTML = !c ? '<div class="card">Your coach profile was not found. Please contact the admin.</div>' : { home, bk, sch, st, rv, pf }[S.tab](c);
  const fn = { bk: bkList, sch: schList, st: stList, pf: pv }[S.tab]; if (fn) fn();
}

/* ---------------- home ---------------- */
function home(c) {
  const nb = D.requests.filter(r => r.status === 'new').length, up = upcoming(c.id), s = stat(c), h = new Date().getHours();
  const todo = [['Add a profile photo', !!c.photo, 'pf'], ['Write a bio (40+ characters)', (c.bio || '').length >= 40, 'pf'], ['Set languages & fee', !!c.langs && c.price > 0, 'pf'], ['Schedule your first class', D.classes.some(x => x.cid === c.id), 'sch'], ['Share your profile link', !!ls.get('mc64_shared'), 'share']];
  const done = todo.filter(t => t[1]).length, pct = Math.round(done / todo.length * 100), latest = [...D.requests].sort((a, b) => b.ts - a.ts).slice(0, 3);
  return `<h2 class="hello">${h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'}, ${esc(c.name.split(' ')[0])} 👋</h2>
<div class="kpis"><div onclick="cp.go('bk')"><b>${nb}</b><span>New bookings</span></div><div onclick="cp.go('sch')"><b>${up.length}</b><span>Upcoming classes</span></div><div onclick="cp.go('st')"><b>${students().length}</b><span>Students</span></div><div onclick="cp.go('rv')"><b>${s.n ? s.r.toFixed(1) : '—'}</b><span>Rating (${s.n})</span></div></div>
<h3 class="sec">Coach tools</h3><div class="tiles">
<button onclick="cp.go('sch')"><i>➕</i><b>Schedule a class</b><span>One-off or weekly repeat</span></button>
<button onclick="cp.go('bk')"><i>📥</i><b>Bookings</b><span>Call, WhatsApp, update status</span></button>
<button onclick="cp.go('st')"><i>👥</i><b>My students</b><span>Everyone who booked you</span></button>
<button onclick="cp.go('rv')"><i>⭐</i><b>Reviews</b><span>Ratings from your students</span></button>
<button onclick="cp.go('pf')"><i>✏️</i><b>Edit profile</b><span>Photo, bio, fee, specialities</span></button>
<button onclick="cp.share()"><i>🔗</i><b>Share my profile</b><span>Copy your public link</span></button></div>
<div class="two"><div class="card"><div class="ch"><b>Setup checklist</b><span class="mu">${done}/${todo.length}</span></div><div class="bar"><i style="width:${pct}%"></i></div>${todo.map(t => `<button class="chk ${t[1] ? 'ok' : ''}" onclick="${t[2] === 'share' ? 'cp.share()' : `cp.go('${t[2]}')`}"><i>${t[1] ? '✓' : ''}</i>${t[0]}</button>`).join('')}</div>
<div class="card"><div class="ch"><b>Next classes</b><button class="lnk" onclick="cp.go('sch')">Manage →</button></div>${up.slice(0, 3).map(x => `<div class="li"><b>${esc(x.title)}</b><span class="mu">${fd(x.date)} · ${tf(x.time)} · ${x.dur} min · ${x.cap - seats(x)}/${x.cap} booked</span></div>`).join('') || '<p class="mu">No classes yet. <button class="lnk" onclick="cp.go(\'sch\')">Schedule one →</button></p>'}
<div class="ch" style="margin-top:14px"><b>Latest bookings</b><button class="lnk" onclick="cp.go('bk')">All →</button></div>${latest.map(r => `<div class="li"><b>${esc(r.name)}</b> <span class="bdg s-${r.status}">${r.status}</span><span class="mu">${esc(r.cat || '')} · ${ago(r.ts)}</span></div>`).join('') || '<p class="mu">New booking requests will appear here.</p>'}</div></div>`;
}

/* ---------------- bookings ---------------- */
function bk() {
  const n = k => k === 'all' ? D.requests.length : D.requests.filter(r => r.status === k).length;
  return `<div class="ph"><h2>Bookings</h2><input id="bq" placeholder="Search name / phone" value="${esc(S.bq)}" oninput="cp.bq(this.value)"></div><div class="chips">${['all', ...STAT].map(k => `<button class="${S.bf === k ? 'on' : ''}" onclick="cp.bf('${k}')">${k} <em>${n(k)}</em></button>`).join('')}</div><div id="list"></div>`;
}
function bkList() {
  const q = S.bq.toLowerCase(), L = [...D.requests].sort((a, b) => b.ts - a.ts).filter(r => (S.bf === 'all' || r.status === S.bf) && (!q || (r.name + r.phone).toLowerCase().includes(q)));
  $('list').innerHTML = L.map(r => `<div class="card bkc"><div class="r1"><b>${esc(r.name)}</b><span class="bdg s-${r.status}">${r.status}</span></div><div class="mu">📚 ${esc(r.cat || '—')}${r.slot ? ' · 🕑 ' + esc(r.slot) : ''} · ${ago(r.ts)}</div><div class="acts">${reach(r)}</div>
<div class="r3"><select onchange="cp.setSt('${r.id}',this.value)">${STAT.map(s => `<option ${s === r.status ? 'selected' : ''}>${s}</option>`).join('')}</select><input placeholder="Private note…" maxlength="280" value="${esc(r.note || '')}" onchange="cp.note('${r.id}',this.value)"></div></div>`).join('') || '<div class="card mu">No bookings here yet. When a student requests a demo with you, it appears instantly.</div>';
}
async function mut(id, patch, msg) { const r = D.requests.find(x => x.id === id); try { await B.set('requests', id, { ...strip(r), ...patch }); if (msg) toast(msg); } catch (e) { toast(e.code || 'Could not save', 1); } }

/* ---------------- schedule ---------------- */
function schForm(x) {
  x = x || {}; return `<div class="card"><div class="ch"><b>${x.id ? 'Edit class' : 'Schedule a class'}</b>${x.id ? '<button class="lnk" onclick="cp.cancelEdit()">Cancel edit</button>' : ''}</div><div class="g2">
<label>Title<input id="s_t" value="${esc(x.title || '')}" placeholder="e.g. Opening Basics"></label><label>Date<input id="s_d" type="date" value="${x.date || ''}" min="${today()}"></label>
<label>Time<input id="s_h" type="time" value="${x.time || '17:00'}"></label><label>Duration (min)<input id="s_u" type="number" value="${x.dur || 60}"></label>
<label>Mode<select id="s_m">${['Online', 'Home'].map(m => `<option ${x.mode === m ? 'selected' : ''}>${m}</option>`).join('')}</select></label><label>Seats<input id="s_c" type="number" min="1" value="${x.cap || 5}"></label>
<label>Level<select id="s_l">${['Beginner', 'Intermediate', 'Advanced'].map(m => `<option ${x.level === m ? 'selected' : ''}>${m}</option>`).join('')}</select></label><label>Meeting link<input id="s_k" value="${esc(x.link || '')}" placeholder="https://meet…"></label>
${x.id ? '' : '<label>Repeat weekly<select id="s_r"><option value="1">Does not repeat</option><option value="4">4 weeks</option><option value="8">8 weeks</option><option value="12">12 weeks</option></select></label>'}</div>
<button class="btn" onclick="cp.saveCls()">${x.id ? 'Save changes' : 'Add to schedule'}</button></div>`;
}
function sch(c) {
  const days = [...Array(7)].map((_, i) => addDays(today(), i));
  return `<div class="ph"><h2>Schedule</h2></div><div class="week">${days.map(d => { const n = D.classes.filter(x => x.cid === c.id && x.date === d).length; return `<button onclick="cp.pickDay('${d}')"><span>${new Date(d + 'T00:00').toLocaleDateString('en-IN', { weekday: 'short' })}</span><b>${new Date(d + 'T00:00').getDate()}</b><em class="${n ? 'on' : ''}">${n ? n + ' class' + (n > 1 ? 'es' : '') : '—'}</em></button>`; }).join('')}</div>
<div id="sf">${schForm(D.classes.find(x => x.id === S.edit))}</div><div id="list"></div>`;
}
function schList() {
  const c = me(), all = D.classes.filter(x => x.cid === c.id).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)), up = all.filter(x => x.date >= today()), past = all.filter(x => x.date < today()).reverse().slice(0, 5);
  const row = x => { const b = x.cap - seats(x), p = Math.min(100, Math.round(b / x.cap * 100)); return `<div class="card cls"><div class="r1"><b>${esc(x.title)}</b><span class="mu">${fd(x.date)} · ${tf(x.time)} · ${x.dur} min</span></div><div class="mu">${esc(x.mode)} · ${esc(x.level)} · ${b}/${x.cap} seats booked</div><div class="bar"><i style="width:${p}%"></i></div><div class="acts">${url(x.link) ? `<a class="ic" target="_blank" rel="noopener" href="${esc(url(x.link))}">▶ Join link</a>` : ''}<button class="ic" onclick="cp.editCls('${x.id}')">✏️ Edit</button><button class="ic" onclick="cp.dup('${x.id}')">⧉ +1 week</button><button class="ic del" onclick="cp.delCls('${x.id}')">🗑 Delete</button></div></div>`; };
  $('list').innerHTML = `<h3 class="sec">Upcoming (${up.length})</h3>${up.map(row).join('') || '<div class="card mu">Nothing scheduled. Add your first class above — students can book it from your public profile.</div>'}${past.length ? `<h3 class="sec">Recent past</h3>${past.map(row).join('')}` : ''}`;
}
async function saveCls() {
  const g = i => $(i).value.trim(); if (!g('s_t') || !g('s_d') || !g('s_h')) { toast('Title, date and time are required', 1); return; }
  const o = { cid: S.user.uid, title: g('s_t'), date: g('s_d'), time: g('s_h'), dur: +g('s_u') || 60, mode: $('s_m').value, cap: Math.max(1, +g('s_c') || 1), level: $('s_l').value, link: url(g('s_k')) };
  try {
    if (S.edit) { await B.set('classes', S.edit, o); S.edit = ''; toast('Class updated ✓'); }
    else { const n = +($('s_r') || { value: 1 }).value; for (let i = 0; i < n; i++) await B.set('classes', uid(), { ...o, date: addDays(o.date, 7 * i) }); toast(n > 1 ? n + ' classes scheduled ✓' : 'Class scheduled ✓ — students can now book it'); }
    $('sf').innerHTML = schForm();
  } catch (e) { toast(e.code || 'Could not save', 1); }
}

/* ---------------- students & reviews ---------------- */
function st() { return `<div class="ph"><h2>My students</h2><input placeholder="Search name / phone" value="${esc(S.sq)}" oninput="cp.sq(this.value)"></div><div id="list"></div>`; }
function stList() {
  const q = S.sq.toLowerCase(), L = students().filter(s => !q || (s.name + s.phone).toLowerCase().includes(q));
  $('list').innerHTML = L.map(s => `<div class="card bkc"><div class="r1"><b>${esc(s.name)}</b><span class="bdg">${s.n} booking${s.n > 1 ? 's' : ''}</span></div><div class="mu">📚 ${[...s.cats].map(esc).join(', ') || '—'} · last ${ago(s.last)}</div><div class="acts">${reach(s)}</div></div>`).join('') || '<div class="card mu">Students appear here once they book a demo with you.</div>';
}
function rv(c) {
  const rs = D.reviews.filter(r => r.cid === c.id).sort((a, b) => b.ts - a.ts), s = stat(c);
  return `<div class="ph"><h2>Reviews</h2></div><div class="card rvs"><div class="big"><b>${s.n ? s.r.toFixed(1) : '—'}</b><span>★ average · ${s.n} review${s.n === 1 ? '' : 's'}</span></div><div>${[5, 4, 3, 2, 1].map(n => { const k = rs.filter(r => +r.stars === n).length; return `<div class="dist"><span>${n}★</span><div class="bar"><i style="width:${s.n ? Math.round(k / s.n * 100) : 0}%"></i></div><span>${k}</span></div>`; }).join('')}</div></div>
${rs.map(r => `<div class="card"><div class="r1"><b>${esc(r.name)}</b><span class="stars">${'★'.repeat(+r.stars || 5)}</span></div><p>${esc(r.text)}</p></div>`).join('') || '<div class="card mu">No reviews yet.</div>'}<p class="mu">Reviews are added by the MyChess64 team after verifying your students.</p>`;
}

/* ---------------- profile ---------------- */
function pf(c) {
  tmpPh = c.photo || ''; const ci = Math.max(0, COL.findIndex(x => x[0] === c.c1));
  return `<div class="ph"><h2>My profile</h2><button class="btn o sm" onclick="cp.share()">🔗 Copy public link</button></div><div class="pfgrid"><div class="card" oninput="cp.pv()"><div class="g2">
<label>Name<input id="f_n" value="${esc(c.name)}"></label><label>Title / rating<input id="f_t" value="${esc(c.title)}"></label><label>City<input id="f_c" value="${esc(c.city)}"></label>
<label>Mode<select id="f_m">${['Online', 'Home', 'Both'].map(m => `<option ${c.mode === m ? 'selected' : ''}>${m}</option>`).join('')}</select></label><label>Fee ₹/hr<input id="f_p" type="number" value="${c.price || 0}"></label><label>Experience (yrs)<input id="f_e" type="number" value="${c.exp || 0}"></label>
<label>Students taught<input id="f_s" type="number" value="${c.students || 0}"></label><label>Languages<input id="f_l" value="${esc(c.langs)}"></label></div>
<div class="cats">${CATS.map(k => `<label class="ck"><input type="checkbox" class="f_cat" value="${k}" ${(c.cats || []).includes(k) ? 'checked' : ''}> ${k}</label>`).join('')}</div>
<label>About you<textarea id="f_b" rows="4">${esc(c.bio)}</textarea></label>
<div class="phrow"><label class="btn o sm">📷 Upload photo<input type="file" accept="image/*" hidden onchange="cp.photo(this)"></label><button class="btn o sm" onclick="cp.rmPhoto()">Remove photo</button><label>Banner colour<select id="f_col" onchange="cp.pv()">${COL.map((x, i) => `<option value="${i}" ${i === ci ? 'selected' : ''}>Theme ${i + 1}</option>`).join('')}</select></label></div>
<div class="acts"><button class="btn" onclick="cp.savePf()">Save profile</button><button class="btn o" onclick="cp.reset()">Change password (email link)</button></div></div>
<div><div class="mu" style="margin-bottom:6px">Live preview – how students see you</div><div id="pvbox"></div></div></div>`;
}
function pv() {
  const b = $('pvbox'); if (!b || !$('f_n')) return; const col = COL[+$('f_col').value] || COL[0], cats = [...document.querySelectorAll('.f_cat:checked')].map(x => x.value);
  b.innerHTML = `<div class="pcard"><div class="pimg" style="background:linear-gradient(135deg,${col[0]},${col[1]})">${tmpPh ? `<img src="${tmpPh}" alt="">` : `<div class="ini">${ini($('f_n').value)}</div>`}<div class="nm"><b>${esc($('f_n').value)} ✓</b><span>${esc($('f_t').value)} · ${esc($('f_c').value)}</span></div></div><div class="pb"><p>${esc($('f_b').value) || '<span class="mu">Your bio appears here…</span>'}</p><div class="tags">${cats.map(k => `<i>${k}</i>`).join('')}<i>${esc($('f_m').value)}</i></div><div class="r1"><b>₹${+$('f_p').value || 0}/hr</b><span class="mu">🎓 ${+$('f_e').value || 0} yrs</span></div></div></div>`;
}
function photo(inp) {
  const f = inp.files[0]; if (!f) return; const r = new FileReader();
  r.onload = () => { const im = new Image(); im.onload = () => { const s = 480, c = document.createElement('canvas'); c.width = c.height = s; const m = Math.min(im.width, im.height); c.getContext('2d').drawImage(im, (im.width - m) / 2, (im.height - m) / 4, m, m, 0, 0, s, s); tmpPh = c.toDataURL('image/jpeg', .82); pv(); }; im.src = r.result; };
  r.readAsDataURL(f);
}
async function savePf() {
  const c = me(), g = i => $(i).value.trim(); if (!g('f_n') || !g('f_t')) { toast('Name and title are required', 1); return; } const col = COL[+$('f_col').value];
  try { await B.set('coaches', c.id, { ...strip(c), name: g('f_n'), title: g('f_t'), city: g('f_c'), mode: $('f_m').value, price: +g('f_p') || 0, exp: +g('f_e') || 0, students: +g('f_s') || 0, langs: g('f_l'), bio: g('f_b'), cats: [...document.querySelectorAll('.f_cat:checked')].map(x => x.value), c1: col[0], c2: col[1], photo: tmpPh }); toast('Profile saved ✓ — live on the website'); } catch (e) { toast(e.code || 'Could not save', 1); }
}

/* ---------------- guide / helpers ---------------- */
function guide() {
  let m = $('gd'); if (!m) { m = document.createElement('div'); m.id = 'gd'; m.className = 'md'; m.onclick = e => { if (e.target === m) m.classList.remove('on'); }; document.body.appendChild(m); }
  m.innerHTML = `<div class="mb"><h3>Welcome to your coach tools 👋</h3><ul><li>🏠 <b>Home</b> – today at a glance, quick actions and a setup checklist.</li><li>📥 <b>Bookings</b> – students who requested you. Call or WhatsApp them, set status, add private notes.</li><li>📅 <b>Schedule</b> – create classes (one-off or weekly repeat). Students book seats from your public profile.</li><li>👥 <b>Students</b> – everyone who has booked you, with quick contact.</li><li>⭐ <b>Reviews</b> – your rating and student feedback.</li><li>👤 <b>Profile</b> – photo, bio, fee, specialities with a live preview. Copy your public link to share.</li></ul><button class="btn" onclick="document.getElementById('gd').classList.remove('on')">Got it</button></div>`;
  m.classList.add('on');
}
async function share() { ls.set('mc64_shared', '1'); const u = publicLink(); try { await navigator.clipboard.writeText(u); toast('Profile link copied ✓'); } catch (e) { prompt('Copy your public profile link', u); } render(true); }

window.cp = {
  login, forgot, logout, go, guide, share, photo, savePf, saveCls, pv,
  bf: k => { S.bf = k; render(true); }, bq: v => { S.bq = v; bkList(); }, sq: v => { S.sq = v; stList(); },
  setSt: (id, v) => mut(id, { status: v }, 'Status updated'), note: (id, v) => mut(id, { note: v.slice(0, 280) }, 'Note saved'),
  pickDay: d => { if ($('s_d')) { $('s_d').value = d; $('s_d').focus(); } },
  editCls: id => { S.edit = id; $('sf').innerHTML = schForm(D.classes.find(x => x.id === id)); $('sf').scrollIntoView(); }, cancelEdit: () => { S.edit = ''; $('sf').innerHTML = schForm(); },
  dup: async id => { const x = D.classes.find(c => c.id === id); try { await B.set('classes', uid(), { ...strip(x), date: addDays(x.date, 7) }); toast('Copied to next week ✓'); } catch (e) { toast(e.code || 'Failed', 1); } },
  delCls: async id => { if (confirm('Delete this class?')) try { await B.remove('classes', id); toast('Class deleted'); } catch (e) { toast(e.code || 'Failed', 1); } },
  rmPhoto: () => { tmpPh = ''; pv(); }, reset: async () => { try { await B.reset(S.user.email); toast('Password-reset email sent to ' + S.user.email); } catch (e) { toast(e.code || 'Failed', 1); } }
};

/* ---------------- boot ---------------- */
document.documentElement.classList.add('js'); window.__mc64 = true;
(async () => {
  await initBackend();
  B.onErr = (col, e) => diag('Database problem reading “' + col + '” (' + (e.code || e.message) + '). Check Firestore is created and firestore.rules are published (README step 2).');
  ['coaches', 'reviews', 'classes', 'seatlog'].forEach(col => B.sub(col, rows => {
    D[col] = rows;
    if (col === 'coaches' && B.mode === 'demo' && !rows.length && !ls.get('mc64_seeded')) { ls.set('mc64_seeded', '1'); sample(); }
    render();
  }));
  B.onAuth(u => {
    S.user = u; if (subReq) { subReq(); subReq = null; } D.requests = [];
    if (u && u.role === 'coach') { subReq = B.sub('requests', a => { D.requests = a; render(); }, ['cid', u.uid]); showApp(); }
    else if (u) { pendingMsg = u.role === 'admin' ? 'This portal is for coaches. Admins: use Login on the main website.' : 'Signed in as ' + u.email + ', but no coach profile was found' + (u.err ? ' (' + u.err + ')' : '') + '. Ask the admin to create your coach account.'; B.logout(); }
    else { showLogin(pendingMsg); pendingMsg = ''; }
  });
})();
