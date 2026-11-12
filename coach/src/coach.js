// MyChess64 – Coach Dashboard (coach.html). Each coach only ever sees their own data (Supabase RLS).
import { initBackend, B } from './backend.js';
import { seedDemo } from './sample.js';
import { loginHTML, recoveryHTML, doLogin, doForgot, doNewPw, profileForm, readProfile, previewCard, avatar, reach, ui } from './ui.js';
import { $, esc, pad, today, addDays, fd, tf, t5, money, digits, url, ago, toast, errText, ls, D, hooks, load, COACH_TABLES, save, remove, stat, booked, upcoming, sName, WD } from './state.js';

const S = { user: null, tab: 'home', sid: '', bf: 'all', bq: '', sq: '', edit: '', att: today(), pre: '', rf: '' };
let pendingMsg = '', pendingUser = null;
const TABS = [['home', '🏠', 'Dashboard'], ['pf', '👤', 'My Profile'], ['sch', '📅', 'My Schedule'], ['bk', '📥', 'Bookings'], ['st', '👥', 'My Students'], ['att', '✅', 'Attendance'], ['earn', '💰', 'My Earnings'], ['rep', '📝', 'Progress Reports'], ['perf', '📈', 'Performance'], ['rv', '⭐', 'My Reviews'], ['set', '⚙️', 'Settings']];
const MAIN = ['home', 'sch', 'bk', 'st'];
const STAT = ['new', 'contacted', 'confirmed', 'done', 'cancelled'];
const uid = () => S.user.uid, me = () => D.coaches.find(c => c.id === uid());
const my = t => D[t].filter(x => x.coach_id === uid());
const val = i => $(i).value.trim();
const opts = (arr, cur) => arr.map(o => `<option ${o === cur ? 'selected' : ''}>${o}</option>`).join('');
const stuOpts = cur => '<option value="">— Select student —</option>' + my('students').map(s => `<option value="${s.id}" ${s.id === cur ? 'selected' : ''}>${esc(s.name)}</option>`).join('');
const isPaid = p => p.status === 'paid';
const monthKey = d => String(d).slice(0, 7);
const bars = (rows, fmt = v => v) => { const mx = Math.max(1, ...rows.map(r => r.v)); return `<div class="bars">${rows.map(r => `<div><i style="height:${Math.round(r.v / mx * 100)}%"></i><b>${fmt(r.v)}</b><span>${esc(r.l)}</span></div>`).join('')}</div>`; };
const rate = id => { const a = my('attendance').filter(x => x.student_id === id); return a.length ? Math.round(a.filter(x => x.status !== 'absent').length / a.length * 100) : null; };

/* ---------------- login / shell ---------------- */
function showLogin(msg) { $('app').hidden = true; const L = $('login'); L.hidden = false; L.innerHTML = loginHTML('coach', msg); }
function showRecovery() { $('app').hidden = true; const L = $('login'); L.hidden = false; L.innerHTML = recoveryHTML(); }
function showApp() {
  $('login').hidden = true; const a = $('app'); a.hidden = false;
  a.innerHTML = `<header class="top"><img class="tlogo" src="assets/header-logo.webp" alt="MyChess64"><span class="sp"></span><button class="btn o sm" onclick="app.guide()">❓ Guide</button><a class="btn o sm hide-s" href="index.html" target="_blank">Website ↗</a><button class="btn sm" onclick="app.logout()">Log out</button></header>
<div class="body"><nav class="side" id="nav"></nav><main id="main"></main></div><nav class="bottom" id="bnav"></nav><div class="md" id="more" onclick="if(event.target===this)this.classList.remove('on')"><div class="mb sheet" id="sheet"></div></div>`;
  ui.photoOwner = uid; render(true); if (!ls.get('mc64_tour2')) { ls.set('mc64_tour2', '1'); setTimeout(guide, 400); }
}
function nav() {
  const nb = D.requests.filter(r => r.status === 'new').length, c = me();
  const btn = ([k, i, l]) => `<button class="${k === S.tab ? 'on' : ''}" onclick="app.go('${k}')"><i>${i}</i><span>${l}</span>${k === 'bk' && nb ? `<em>${nb}</em>` : ''}</button>`;
  $('nav').innerHTML = (c ? `<div class="who">${avatar(c, 'sm')}<div><b>${esc(c.name)}</b><span>${esc(c.title)}</span></div></div>` : '') + TABS.map(btn).join('');
  $('bnav').innerHTML = TABS.filter(t => MAIN.includes(t[0])).map(btn).join('') + `<button onclick="app.more()"><i>☰</i><span>More</span></button>`;
}
function more() { $('sheet').innerHTML = '<h3>All tools</h3><div class="tiles">' + TABS.map(([k, i, l]) => `<button onclick="document.getElementById('more').classList.remove('on');app.go('${k}')"><i>${i}</i><b>${l}</b></button>`).join('') + '</div>'; $('more').classList.add('on'); }
function go(t) { S.tab = t; if (t !== 'st') S.sid = ''; render(true); window.scrollTo && scrollTo(0, 0); }
function render(force) {
  if (!S.user || S.user.role !== 'coach' || $('app').hidden || !$('main')) return;
  const a = document.activeElement; if (!force && a && $('main').contains(a) && /INPUT|TEXTAREA|SELECT/.test(a.tagName)) { nav(); return; }
  nav(); const c = me();
  $('main').innerHTML = !c ? '<div class="card">Your coach profile was not found. Please contact the admin.</div>' : { home, pf, sch, bk, st, att, earn, rep, perf, rv, set }[S.tab](c);
  const fn = { bk: bkList, sch: schList, st: stList, att: attList, earn: earnList, rep: repList, pf: () => ui.pv(), set: docList }[S.tab]; if (fn) fn();
}
const head = (t, extra = '') => `<div class="ph"><h2>${t}</h2>${extra}</div>`;
const empty = m => `<div class="card mu">${m}</div>`;
async function run(fn, ok) { try { await fn(); if (ok) toast(ok); } catch (e) { console.error(e); toast(errText(e), 1); } }

/* ---------------- dashboard ---------------- */
function home(c) {
  const nb = D.requests.filter(r => r.status === 'new').length, up = upcoming(c.id), s = stat(c), h = new Date().getHours();
  const tdo = [['Add a profile photo', !!c.photo_url, 'pf'], ['Write a bio (40+ characters)', (c.bio || '').length >= 40, 'pf'], ['Set your teaching hours', D.availability.some(a => a.coach_id === c.id), 'sch'], ['Schedule your first class', D.classes.some(x => x.coach_id === c.id), 'sch'], ['Add your first student', my('students').length > 0, 'st']];
  const done = tdo.filter(t => t[1]).length, T = { pf: ['👤', 'My Profile', 'Photo, rating, experience'], sch: ['📅', 'My Schedule', 'Available teaching hours'], bk: ['📥', 'Bookings', 'Upcoming and past bookings'], st: ['👥', 'My Students', 'Student details and progress'], att: ['✅', 'Attendance', 'Mark and track attendance'], earn: ['💰', 'My Earnings', 'Fees and payment records'], rep: ['📝', 'Progress Reports', 'Reports to share with parents'], perf: ['📈', 'Performance', 'Teaching statistics'], rv: ['⭐', 'My Reviews', 'Student feedback'], set: ['⚙️', 'Settings', 'Password, documents, account'] };
  const month = monthKey(today()), earned = my('payments').filter(p => isPaid(p) && monthKey(p.paid_on) === month).reduce((a, p) => a + +p.amount, 0);
  return `<div class="hero"><div><h2>MyChess64 Coach Dashboard</h2><span class="mu">${h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'} — welcome back, Coach ${esc(c.name)}</span></div><span class="badge-g">Personal account</span></div>
<div class="kpis"><div onclick="app.go('bk')"><b>${nb}</b><span>New bookings</span></div><div onclick="app.go('sch')"><b>${up.length}</b><span>Upcoming classes</span></div><div onclick="app.go('st')"><b>${my('students').length}</b><span>Students</span></div><div onclick="app.go('earn')"><b>${money(earned)}</b><span>Earned this month</span></div></div>
<div class="tiles">${Object.entries(T).map(([k, v]) => `<button onclick="app.go('${k}')"><i>${v[0]}</i><b>${v[1]}</b><span>${v[2]}</span></button>`).join('')}</div>
<div class="two"><div class="card"><div class="ch"><b>Setup checklist</b><span class="mu">${done}/${tdo.length}</span></div><div class="bar"><i style="width:${Math.round(done / tdo.length * 100)}%"></i></div>${tdo.map(t => `<button class="chk ${t[1] ? 'ok' : ''}" onclick="app.go('${t[2]}')"><i>${t[1] ? '✓' : ''}</i>${t[0]}</button>`).join('')}<button class="lnk" onclick="app.share()">🔗 Copy my public profile link</button></div>
<div class="card"><div class="ch"><b>Next classes</b><button class="lnk" onclick="app.go('sch')">Manage →</button></div>${up.slice(0, 3).map(x => `<div class="li"><b>${esc(x.title)}</b><span class="mu">${fd(x.class_date)} · ${tf(x.class_time)} · ${x.dur} min · ${booked(x)}/${x.cap} booked</span></div>`).join('') || '<p class="mu">No classes yet.</p>'}<div class="ch" style="margin-top:12px"><b>Rating</b><span>${s.n ? '★ ' + s.r.toFixed(1) + ' (' + s.n + ')' : 'No reviews yet'}</span></div></div></div>
<div class="card priv"><span class="shield">✓</span><div><b>Privacy and security</b><p class="mu">Each coach sees only their own private data. Admin has authorized management access.</p></div></div>`;
}

/* ---------------- profile ---------------- */
function pf(c) {
  return `${head('My Profile', '<button class="btn o sm" onclick="app.share()">🔗 Copy public link</button>')}<div class="pfgrid"><div class="card">${profileForm(c)}<div class="acts"><button class="btn" onclick="app.savePf()">Save profile</button></div></div><div><div class="mu" style="margin-bottom:6px">Live preview – how students see you</div><div id="pvbox">${previewCard()}</div></div></div>`;
}
const savePf = () => { const p = readProfile(); if (!p.name || !p.title) return toast('Name and title are required', 1); return run(() => save('coaches', p, uid()), 'Profile saved ✓ — live on the website'); };

/* ---------------- schedule + availability ---------------- */
function schForm(x) {
  x = x || {}; return `<div class="card"><div class="ch"><b>${x.id ? 'Edit class' : 'Schedule a class'}</b>${x.id ? '<button class="lnk" onclick="app.cancelEdit()">Cancel edit</button>' : ''}</div><div class="g2">
<label>Title<input id="s_t" value="${esc(x.title || '')}" placeholder="e.g. Opening Basics"></label><label>Date<input id="s_d" type="date" value="${x.class_date || ''}" min="${today()}"></label>
<label>Time<input id="s_h" type="time" value="${t5(x.class_time) || '17:00'}"></label><label>Duration (min)<input id="s_u" type="number" value="${x.dur || 60}"></label>
<label>Mode<select id="s_m">${opts(['Online', 'Home'], x.mode)}</select></label><label>Seats<input id="s_c" type="number" min="1" value="${x.cap || 5}"></label>
<label>Level<select id="s_l">${opts(['Beginner', 'Intermediate', 'Advanced'], x.level)}</select></label><label>Meeting link<input id="s_k" value="${esc(x.link || '')}" placeholder="https://meet…"></label>
${x.id ? '' : '<label>Repeat weekly<select id="s_r"><option value="1">Does not repeat</option><option value="4">4 weeks</option><option value="8">8 weeks</option><option value="12">12 weeks</option></select></label>'}</div>
<button class="btn" onclick="app.saveCls()">${x.id ? 'Save changes' : 'Add to schedule'}</button></div>`;
}
function sch(c) {
  const days = [...Array(7)].map((_, i) => addDays(today(), i));
  return `${head('My Schedule')}<div class="week">${days.map(d => { const n = D.classes.filter(x => x.coach_id === c.id && x.class_date === d).length; const dt = new Date(d + 'T00:00'); return `<button onclick="app.pickDay('${d}')"><span>${WD[dt.getDay()]}</span><b>${dt.getDate()}</b><em class="${n ? 'on' : ''}">${n ? n + ' class' + (n > 1 ? 'es' : '') : '—'}</em></button>`; }).join('')}</div>
<div class="card"><div class="ch"><b>Available teaching hours</b><span class="mu">shown on your public profile</span></div><div class="g3"><label>Day<select id="a_d">${WD.map((d, i) => `<option value="${i}">${d}</option>`).join('')}</select></label><label>From<input id="a_f" type="time" value="17:00"></label><label>To<input id="a_t" type="time" value="19:00"></label></div><button class="btn sm" onclick="app.addAvail()">+ Add hours</button><div class="chips" id="avl"></div></div>
<div id="sf">${schForm(D.classes.find(x => x.id === S.edit))}</div><div id="list"></div>`;
}
function schList() {
  const c = me(), av = $('avl'); if (av) av.innerHTML = D.availability.filter(a => a.coach_id === c.id).sort((a, b) => a.weekday - b.weekday).map(a => `<span class="pillx">${WD[a.weekday]} ${tf(a.start_time)}–${tf(a.end_time)} <button onclick="app.delAvail('${a.id}')" aria-label="Remove">×</button></span>`).join('') || '<span class="mu">No hours set yet.</span>';
  const all = D.classes.filter(x => x.coach_id === c.id).sort((a, b) => (a.class_date + a.class_time).localeCompare(b.class_date + b.class_time)), up = all.filter(x => x.class_date >= today()), past = all.filter(x => x.class_date < today()).reverse().slice(0, 5);
  const row = x => { const b = booked(x), p = Math.min(100, Math.round(b / x.cap * 100)); return `<div class="card cls"><div class="r1"><b>${esc(x.title)}</b><span class="mu">${fd(x.class_date)} · ${tf(x.class_time)} · ${x.dur} min</span></div><div class="mu">${esc(x.mode)} · ${esc(x.level)} · ${b}/${x.cap} seats booked</div><div class="bar"><i style="width:${p}%"></i></div><div class="acts">${url(x.link) ? `<a class="ic" target="_blank" rel="noopener" href="${esc(x.link)}">▶ Join link</a>` : ''}<button class="ic" onclick="app.editCls('${x.id}')">✏️ Edit</button><button class="ic" onclick="app.dup('${x.id}')">⧉ +1 week</button><button class="ic del" onclick="app.delCls('${x.id}')">🗑 Delete</button></div></div>`; };
  $('list').innerHTML = `<h3 class="sec">Upcoming (${up.length})</h3>${up.map(row).join('') || empty('Nothing scheduled. Add your first class above — students can book it from your public profile.')}${past.length ? `<h3 class="sec">Recent past</h3>${past.map(row).join('')}` : ''}`;
}
const saveCls = () => {
  if (!val('s_t') || !val('s_d') || !val('s_h')) return toast('Title, date and time are required', 1);
  const o = { coach_id: uid(), title: val('s_t'), class_date: val('s_d'), class_time: val('s_h'), dur: +val('s_u') || 60, mode: $('s_m').value, cap: Math.max(1, +val('s_c') || 1), level: $('s_l').value, link: url(val('s_k')) };
  return run(async () => {
    if (S.edit) { await save('classes', o, S.edit); S.edit = ''; }
    else { const n = +($('s_r') || { value: 1 }).value; for (let i = 0; i < n; i++) await B.ins('classes', { ...o, class_date: addDays(o.class_date, 7 * i) }); await load(['classes']); }
    $('sf').innerHTML = schForm();
  }, 'Class saved ✓');
};

/* ---------------- bookings ---------------- */
function bk() {
  const n = k => k === 'all' ? D.requests.length : D.requests.filter(r => r.status === k).length;
  return `${head('Bookings', `<input placeholder="Search name / phone" value="${esc(S.bq)}" oninput="app.bq(this.value)">`)}<div class="chips">${['all', ...STAT].map(k => `<button class="${S.bf === k ? 'on' : ''}" onclick="app.bf('${k}')">${k} <em>${n(k)}</em></button>`).join('')}</div><div id="list"></div>`;
}
function bkList() {
  const q = S.bq.toLowerCase(), L = D.requests.filter(r => (S.bf === 'all' || r.status === S.bf) && (!q || ((r.name || '') + (r.phone || '')).toLowerCase().includes(q)));
  $('list').innerHTML = L.map(r => `<div class="card bkc"><div class="r1"><b>${esc(r.name)}</b><span class="bdg s-${r.status}">${r.status}</span></div><div class="mu">📚 ${esc(r.cat || '—')}${r.slot ? ' · 🕑 ' + esc(r.slot) : ''} · ${ago(r.created_at)}</div><div class="acts">${reach(r)}<button class="ic" onclick="app.toStudent('${r.id}')">➕ Add as student</button></div>
<div class="r3"><select onchange="app.setSt('${r.id}',this.value)">${opts(STAT, r.status)}</select><input placeholder="Private note…" maxlength="280" value="${esc(r.note || '')}" onchange="app.note('${r.id}',this.value)"></div></div>`).join('') || empty('No bookings here yet. When a student requests a demo with you, it appears instantly.');
}
const toStudent = id => { const r = D.requests.find(x => x.id === id); if (my('students').some(s => digits(s.phone) === digits(r.phone))) return toast('Already in your students', 1); return run(() => save('students', { coach_id: uid(), name: r.name, phone: r.phone, level: 'Beginner', started_on: today() }), 'Added to My Students ✓'); };

/* ---------------- students ---------------- */
function stuForm(x) {
  x = x || {}; return `<div class="card"><div class="ch"><b>${x.id ? 'Edit student' : 'Add a student'}</b><button class="lnk" onclick="app.closeForm()">Close</button></div><div class="g2"><label>Name<input id="u_n" value="${esc(x.name || '')}"></label><label>Phone / WhatsApp<input id="u_p" value="${esc(x.phone || '')}"></label><label>Email<input id="u_e" value="${esc(x.email || '')}"></label><label>Age<input id="u_a" type="number" value="${x.age || ''}"></label><label>Level<select id="u_l">${opts(['Beginner', 'Intermediate', 'Advanced'], x.level)}</select></label><label>Started on<input id="u_s" type="date" value="${x.started_on || today()}"></label></div><label>Notes<textarea id="u_o" rows="2">${esc(x.notes || '')}</textarea></label><button class="btn" onclick="app.saveStu('${x.id || ''}')">${x.id ? 'Save changes' : 'Add student'}</button></div>`;
}
function st() {
  if (S.sid) return stuDetail(D.students.find(s => s.id === S.sid));
  return `${head('My Students', `<button class="btn sm" onclick="app.newStu()">+ Add student</button>`)}<input placeholder="Search students…" value="${esc(S.sq)}" oninput="app.sq(this.value)"><div id="sf"></div><div id="list"></div>`;
}
function stList() {
  if (S.sid) return; const q = S.sq.toLowerCase();
  $('list').innerHTML = my('students').filter(s => !q || ((s.name || '') + (s.phone || '')).toLowerCase().includes(q)).map(s => { const r = rate(s.id); return `<div class="card bkc"><div class="r1"><b>${esc(s.name)}</b><span class="bdg">${esc(s.level || '')}</span></div><div class="mu">${s.age ? s.age + ' yrs · ' : ''}${s.phone ? esc(s.phone) + ' · ' : ''}${r == null ? 'No attendance yet' : '✅ ' + r + '% attendance'}</div><div class="acts">${reach(s)}<button class="ic" onclick="app.openStu('${s.id}')">📊 Progress</button><button class="ic" onclick="app.editStu('${s.id}')">✏️ Edit</button></div></div>`; }).join('') || empty('No students yet. Add one, or press “Add as student” on a booking.');
}
function stuDetail(s) {
  if (!s) return empty('Student not found.');
  const att = my('attendance').filter(a => a.student_id === s.id).sort((a, b) => b.session_date.localeCompare(a.session_date)), pay = my('payments').filter(p => p.student_id === s.id), rp = my('reports').filter(r => r.student_id === s.id).sort((a, b) => String(b.report_date).localeCompare(String(a.report_date)));
  const r = rate(s.id), paid = pay.filter(isPaid).reduce((a, p) => a + +p.amount, 0), pend = pay.filter(p => !isPaid(p)).reduce((a, p) => a + +p.amount, 0);
  return `${head(esc(s.name), '<button class="btn o sm" onclick="app.back()">← All students</button>')}<div class="card"><div class="r1"><span class="mu">${esc(s.level || '')}${s.age ? ' · ' + s.age + ' yrs' : ''} · since ${fd(s.started_on || today())}</span><div class="acts">${reach(s)}<button class="ic" onclick="app.editStu('${s.id}')">✏️ Edit</button><button class="ic del" onclick="app.delStu('${s.id}')">🗑 Delete</button></div></div>${s.notes ? `<p class="mu">📝 ${esc(s.notes)}</p>` : ''}</div>
<div id="sf"></div><div class="kpis"><div><b>${r == null ? '—' : r + '%'}</b><span>Attendance</span></div><div><b>${att.length}</b><span>Sessions</span></div><div><b>${money(paid)}</b><span>Paid</span></div><div><b>${money(pend)}</b><span>Pending</span></div></div>
<div class="acts"><button class="btn sm" onclick="app.quick('att','${s.id}')">✅ Mark attendance</button><button class="btn sm" onclick="app.quick('earn','${s.id}')">💰 Add payment</button><button class="btn sm" onclick="app.quick('rep','${s.id}')">📝 Write report</button></div>
<div class="two"><div class="card"><b>Recent attendance</b>${att.slice(0, 8).map(a => `<div class="li"><span>${fd(a.session_date)}</span><span class="bdg s-${a.status === 'absent' ? 'cancelled' : a.status === 'late' ? 'contacted' : 'done'}">${a.status}</span></div>`).join('') || '<p class="mu">None yet.</p>'}</div>
<div class="card"><b>Latest reports</b>${rp.slice(0, 3).map(x => `<div class="li"><b>${fd(x.report_date)} · ${esc(x.level || '')}</b><span class="mu">${esc(x.topics || '')}</span></div>`).join('') || '<p class="mu">None yet.</p>'}</div></div>`;
}
const saveStu = id => {
  if (!val('u_n')) return toast('Student name is required', 1);
  return run(async () => { await save('students', { coach_id: uid(), name: val('u_n'), phone: val('u_p'), email: val('u_e'), age: +val('u_a') || null, level: $('u_l').value, started_on: val('u_s') || today(), notes: val('u_o') }, id || null); render(true); }, 'Student saved ✓');
};

/* ---------------- attendance ---------------- */
function att() {
  return `${head('Attendance', `<input type="date" id="a_date" value="${S.att}" max="${today()}" onchange="app.attDate(this.value)">`)}<div class="acts"><button class="btn sm" onclick="app.allPresent()">✓ Mark all present</button></div><div id="list"></div>`;
}
function attList() {
  const sts = my('students'), day = my('attendance').filter(a => a.session_date === S.att), by = id => (day.find(a => a.student_id === id) || {}).status;
  const cnt = k => day.filter(a => a.status === k).length;
  const hist = {}; my('attendance').forEach(a => { (hist[a.session_date] = hist[a.session_date] || { p: 0, l: 0, a: 0 })[a.status === 'absent' ? 'a' : a.status === 'late' ? 'l' : 'p']++; });
  $('list').innerHTML = !sts.length ? empty('Add students first (My Students), then mark attendance here.') : `<div class="kpis"><div><b>${cnt('present')}</b><span>Present</span></div><div><b>${cnt('late')}</b><span>Late</span></div><div><b>${cnt('absent')}</b><span>Absent</span></div><div><b>${sts.length - day.length}</b><span>Not marked</span></div></div>` +
    sts.map(s => `<div class="card att"><div><b>${esc(s.name)}</b><span class="mu"> ${rate(s.id) == null ? '' : '· ' + rate(s.id) + '% overall'}</span></div><div class="seg">${['present', 'late', 'absent'].map(k => `<button class="${by(s.id) === k ? 'on ' + k : ''}" onclick="app.mark('${s.id}','${k}')">${k}</button>`).join('')}</div></div>`).join('') +
    `<h3 class="sec">Recent sessions</h3><div class="card">${Object.keys(hist).sort().reverse().slice(0, 8).map(d => `<div class="li"><b>${fd(d)}</b><span class="mu">✅ ${hist[d].p} present · ⏰ ${hist[d].l} late · ❌ ${hist[d].a} absent</span></div>`).join('') || '<span class="mu">No sessions recorded yet.</span>'}</div>`;
}
const mark = (sid, status) => run(async () => { await B.upsert('attendance', { coach_id: uid(), student_id: sid, session_date: S.att, status }, 'student_id,session_date'); await load(['attendance']); });
const allPresent = () => run(async () => { for (const s of my('students')) await B.upsert('attendance', { coach_id: uid(), student_id: s.id, session_date: S.att, status: 'present' }, 'student_id,session_date'); await load(['attendance']); }, 'All marked present ✓');

/* ---------------- earnings ---------------- */
function earn() {
  const P = my('payments'), mk = monthKey(today()), pm = monthKey(addDays(today().slice(0, 8) + '01', -1));
  const sum = f => P.filter(f).reduce((a, p) => a + +p.amount, 0), cur = sum(p => isPaid(p) && monthKey(p.paid_on) === mk), prev = sum(p => isPaid(p) && monthKey(p.paid_on) === pm);
  const months = [...Array(6)].map((_, i) => { const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - (5 - i)); const k = d.getFullYear() + '-' + pad(d.getMonth() + 1); return { l: d.toLocaleDateString('en-IN', { month: 'short' }), v: sum(p => isPaid(p) && monthKey(p.paid_on) === k) }; });
  return `${head('My Earnings')}<div class="kpis"><div><b>${money(cur)}</b><span>This month</span></div><div><b>${money(prev)}</b><span>Last month</span></div><div><b>${money(sum(isPaid))}</b><span>Total received</span></div><div><b>${money(sum(p => !isPaid(p)))}</b><span>Pending</span></div></div>
<div class="card"><b>Last 6 months</b>${bars(months, money)}</div>
<div class="card"><div class="ch"><b>Record a payment</b></div><div class="g2"><label>Student<select id="p_s">${stuOpts(S.pre)}</select></label><label>Amount ₹<input id="p_a" type="number" min="0"></label><label>Date<input id="p_d" type="date" value="${today()}"></label><label>Method<select id="p_m">${opts(['UPI', 'Cash', 'Bank transfer', 'Card'])}</select></label><label>Status<select id="p_t">${opts(['paid', 'pending'])}</select></label><label>Note<input id="p_n" placeholder="e.g. March fees"></label></div><button class="btn" onclick="app.addPay()">Save payment</button></div><div id="list"></div>`;
}
function earnList() {
  $('list').innerHTML = `<h3 class="sec">Payment records</h3>` + ([...my('payments')].sort((a, b) => String(b.paid_on).localeCompare(String(a.paid_on))).map(p => `<div class="card bkc"><div class="r1"><b>${money(p.amount)} · ${esc(sName(p.student_id))}</b><span class="bdg s-${isPaid(p) ? 'done' : 'contacted'}">${p.status}</span></div><div class="mu">${fd(p.paid_on)} · ${esc(p.method || '')}${p.note ? ' · ' + esc(p.note) : ''}</div><div class="acts">${isPaid(p) ? '' : `<button class="ic" onclick="app.paid('${p.id}')">✓ Mark paid</button>`}<button class="ic del" onclick="app.delPay('${p.id}')">🗑 Delete</button></div></div>`).join('') || empty('No payments recorded yet.'));
}
const addPay = () => { const a = +val('p_a'); if (!(a > 0)) return toast('Enter the amount', 1); const sid = $('p_s').value || null; S.pre = ''; return run(async () => { await save('payments', { coach_id: uid(), student_id: sid, amount: a, paid_on: val('p_d') || today(), method: $('p_m').value, status: $('p_t').value, note: val('p_n') }); render(true); }, 'Payment saved ✓'); };

/* ---------------- progress reports ---------------- */
function rep() {
  return `${head('Progress Reports')}<div class="card"><div class="ch"><b>Write a progress report</b></div><div class="g2"><label>Student<select id="r_s">${stuOpts(S.pre)}</select></label><label>Date<input id="r_d" type="date" value="${today()}"></label><label>Level / rating<input id="r_l" placeholder="e.g. Intermediate · ~1200"></label></div>
<label>Topics covered<textarea id="r_t" rows="2"></textarea></label><label>Strengths<textarea id="r_g" rows="2"></textarea></label><label>To improve<textarea id="r_i" rows="2"></textarea></label><label>Homework<textarea id="r_h" rows="2"></textarea></label><button class="btn" onclick="app.addRep()">Save report</button></div>
<div class="ch"><b>All reports</b><select id="r_f" onchange="app.repF(this.value)">${stuOpts(S.rf).replace('— Select student —', 'All students')}</select></div><div id="list"></div>`;
}
function repList() {
  $('list').innerHTML = my('reports').filter(r => !S.rf || r.student_id === S.rf).sort((a, b) => String(b.report_date).localeCompare(String(a.report_date))).map(r => { const s = D.students.find(x => x.id === r.student_id) || {}; return `<div class="card"><div class="r1"><b>${esc(s.name || '—')} · ${fd(r.report_date)}</b><span class="bdg">${esc(r.level || '')}</span></div>${[['Topics', r.topics], ['Strengths', r.strengths], ['To improve', r.improve], ['Homework', r.homework]].filter(x => x[1]).map(x => `<p><b>${x[0]}:</b> <span class="mu">${esc(x[1])}</span></p>`).join('')}<div class="acts"><a class="ic" target="_blank" rel="noopener" href="${esc(shareUrl(r, s))}">💬 Share on WhatsApp</a><button class="ic del" onclick="app.delRep('${r.id}')">🗑 Delete</button></div></div>`; }).join('') || empty('No reports yet.');
}
const shareUrl = (r, s) => `https://wa.me/${digits(s.phone)}?text=` + encodeURIComponent(`♟ Progress report – ${s.name} (${fd(r.report_date)})\nLevel: ${r.level || '-'}\nTopics: ${r.topics || '-'}\nStrengths: ${r.strengths || '-'}\nTo improve: ${r.improve || '-'}\nHomework: ${r.homework || '-'}\n– Coach ${me().name}, MyChess64`);
const addRep = () => { const sid = $('r_s').value; if (!sid) return toast('Choose a student', 1); S.pre = ''; return run(async () => { await save('reports', { coach_id: uid(), student_id: sid, report_date: val('r_d') || today(), level: val('r_l'), topics: val('r_t'), strengths: val('r_g'), improve: val('r_i'), homework: val('r_h') }); render(true); }, 'Report saved ✓'); };

/* ---------------- performance ---------------- */
function perf(c) {
  const a = my('attendance'), cl = D.classes.filter(x => x.coach_id === c.id), past = cl.filter(x => x.class_date < today()), s = stat(c);
  const fill = cl.length ? Math.round(cl.reduce((t, x) => t + Math.min(1, booked(x) / x.cap), 0) / cl.length * 100) : 0, ar = a.length ? Math.round(a.filter(x => x.status !== 'absent').length / a.length * 100) : 0;
  const rq = D.requests, conv = rq.length ? Math.round(rq.filter(r => r.status === 'confirmed' || r.status === 'done').length / rq.length * 100) : 0;
  const weeks = [...Array(8)].map((_, i) => { const e = addDays(today(), -7 * (7 - i)), b = addDays(e, -6), w = a.filter(x => x.session_date >= b && x.session_date <= e); return { l: fd(e).split(' ').slice(1).join(' '), v: w.length ? Math.round(w.filter(x => x.status !== 'absent').length / w.length * 100) : 0 }; });
  return `${head('Performance')}<div class="kpis"><div><b>${past.length}</b><span>Classes taught</span></div><div><b>${fill}%</b><span>Avg. class fill</span></div><div><b>${ar}%</b><span>Attendance rate</span></div><div><b>${my('students').length}</b><span>Active students</span></div><div><b>${conv}%</b><span>Booking conversion</span></div><div><b>${s.n ? s.r.toFixed(1) : '—'}</b><span>Rating (${s.n})</span></div><div><b>${my('reports').length}</b><span>Reports written</span></div><div><b>${rq.length}</b><span>Total bookings</span></div></div>
<div class="card"><b>Attendance rate by week (%)</b>${bars(weeks, v => v + '%')}</div><p class="mu">Booking conversion = bookings marked confirmed or done ÷ all bookings.</p>`;
}

/* ---------------- reviews ---------------- */
function rv(c) {
  const rs = D.reviews.filter(r => r.coach_id === c.id), s = stat(c);
  return `${head('My Reviews')}<div class="card rvs"><div class="big"><b>${s.n ? s.r.toFixed(1) : '—'}</b><span>★ average · ${s.n} review${s.n === 1 ? '' : 's'}</span></div><div>${[5, 4, 3, 2, 1].map(n => { const k = rs.filter(r => +r.stars === n).length; return `<div class="dist"><span>${n}★</span><div class="bar"><i style="width:${s.n ? Math.round(k / s.n * 100) : 0}%"></i></div><span>${k}</span></div>`; }).join('')}</div></div>
${rs.map(r => `<div class="card"><div class="r1"><b>${esc(r.name)}</b><span class="stars">${'★'.repeat(+r.stars || 5)}</span></div><p>${esc(r.text)}</p></div>`).join('') || empty('No reviews yet.')}<p class="mu">Reviews are added by the MyChess64 team after verifying your students.</p>`;
}

/* ---------------- settings + documents ---------------- */
function set() {
  return `${head('Settings')}<div class="card"><b>Account</b><p class="mu">Signed in as <b>${esc(S.user.email)}</b></p><div class="g2"><label>New password<input id="np1" type="password" autocomplete="new-password" placeholder="8+ characters"></label><label>Repeat password<input id="np2" type="password" autocomplete="new-password"></label></div><div class="acts"><button class="btn" onclick="app.changePw()">Change password</button><button class="btn o" onclick="app.reset()">Send reset link by email</button></div></div>
<div class="card"><b>My documents</b><p class="mu">Certificates, ID or rating proofs. Stored privately — only you and the admin can open them.</p><div class="g2"><label>Title<input id="d_t" placeholder="e.g. FIDE certificate"></label><label>File (PDF/image, max 5 MB)<input id="d_f" type="file" accept="image/*,application/pdf"></label></div><button class="btn" onclick="app.upDoc()">Upload document</button><div id="docs"></div></div>
<div class="card priv"><span class="shield">✓</span><div><b>Privacy and security</b><p class="mu">Each coach sees only their own private data. Admin has authorized management access. Passwords are handled by Supabase Auth and never stored by this site.</p></div></div><button class="btn o" onclick="app.logout()">Log out</button>`;
}
function docList() { const d = $('docs'); if (d) d.innerHTML = my('coach_docs').map(x => `<div class="li doc"><span>📄 ${esc(x.title)}</span><span class="acts"><button class="ic" onclick="app.openDoc('${x.id}')">Open</button><button class="ic del" onclick="app.delDoc('${x.id}')">Delete</button></span></div>`).join('') || '<p class="mu">No documents yet.</p>'; }

/* ---------------- guide / actions ---------------- */
function guide() {
  let m = $('gd'); if (!m) { m = document.createElement('div'); m.id = 'gd'; m.className = 'md'; m.onclick = e => { if (e.target === m) m.classList.remove('on'); }; document.body.appendChild(m); }
  m.innerHTML = `<div class="mb"><h3>Welcome to your coach dashboard 👋</h3><ul><li>👤 <b>My Profile</b> – photo, bio, fee, specialities (photos go to secure storage).</li><li>📅 <b>My Schedule</b> – teaching hours + classes (weekly repeat). Students book seats online.</li><li>📥 <b>Bookings</b> – call / WhatsApp, update status, add notes.</li><li>👥 <b>My Students</b> – records and progress overview.</li><li>✅ <b>Attendance</b> – mark present / late / absent per day.</li><li>💰 <b>My Earnings</b> – fees received &amp; pending.</li><li>📝 <b>Progress Reports</b> – write and share on WhatsApp.</li><li>📈 <b>Performance</b> – statistics &amp; charts. ⚙️ <b>Settings</b> – password &amp; documents.</li></ul><button class="btn" onclick="document.getElementById('gd').classList.remove('on')">Got it</button></div>`;
  m.classList.add('on');
}
async function share() { ls.set('mc64_shared', '1'); const u = location.href.replace(/coach\.html.*$/, '') + 'index.html#coach=' + uid(); try { await navigator.clipboard.writeText(u); toast('Profile link copied ✓'); } catch (e) { prompt('Copy your public profile link', u); } }
const stuById = id => D.students.find(s => s.id === id);
window.ui = ui;
window.app = {
  login: doLogin, forgot: doForgot, logout: () => B.logout(), go, guide, share, more, savePf, saveCls, toStudent, saveStu, mark, allPresent, addPay, addRep,
  newStu: () => { $('sf').innerHTML = stuForm(); }, editStu: id => { $('sf').innerHTML = stuForm(stuById(id)); $('sf').scrollIntoView(); }, closeForm: () => { $('sf').innerHTML = ''; },
  openStu: id => { S.sid = id; render(true); window.scrollTo && scrollTo(0, 0); }, back: () => { S.sid = ''; render(true); },
  delStu: id => confirm('Delete this student and their attendance & reports?') && run(async () => { S.sid = ''; await remove('students', id); await load(['attendance', 'reports', 'payments']); render(true); }, 'Student deleted'),
  quick: (tab, sid) => { S.pre = sid; S.tab = tab; render(true); },
  bf: k => { S.bf = k; render(true); }, bq: v => { S.bq = v; bkList(); }, sq: v => { S.sq = v; stList(); }, repF: v => { S.rf = v; repList(); },
  attDate: v => { S.att = v || today(); render(true); },
  setSt: (id, v) => run(() => save('requests', { status: v }, id), 'Status updated'), note: (id, v) => run(() => save('requests', { note: v.slice(0, 280) }, id), 'Note saved'),
  pickDay: d => { if ($('s_d')) { $('s_d').value = d; $('s_d').focus(); } },
  editCls: id => { S.edit = id; $('sf').innerHTML = schForm(D.classes.find(x => x.id === id)); $('sf').scrollIntoView(); }, cancelEdit: () => { S.edit = ''; $('sf').innerHTML = schForm(); },
  dup: id => { const x = D.classes.find(c => c.id === id); return run(async () => { const { id: _i, created_at, ...r } = x; await save('classes', { ...r, class_date: addDays(x.class_date, 7) }); }, 'Copied to next week ✓'); },
  delCls: id => confirm('Delete this class?') && run(() => remove('classes', id), 'Class deleted'),
  addAvail: () => run(() => save('availability', { coach_id: uid(), weekday: +$('a_d').value, start_time: val('a_f'), end_time: val('a_t') }), 'Hours added ✓'), delAvail: id => run(() => remove('availability', id)),
  paid: id => run(() => save('payments', { status: 'paid', paid_on: today() }, id), 'Marked as paid ✓'), delPay: id => confirm('Delete this payment record?') && run(() => remove('payments', id)),
  delRep: id => confirm('Delete this report?') && run(() => remove('reports', id)),
  changePw: async () => { if (await doNewPw()) { $('np1').value = ''; $('np2').value = ''; } }, reset: () => run(() => B.reset(S.user.email), 'Reset link sent to ' + S.user.email),
  newPw: async () => { if (await doNewPw()) { B.recovery = false; history.replaceState(null, '', location.pathname); if (pendingUser) enter(pendingUser); } },
  upDoc: () => { const f = $('d_f').files[0], t = val('d_t'); if (!t || !f) return toast('Add a title and choose a file', 1); if (f.size > 5e6) return toast('File is larger than 5 MB', 1); return run(async () => { const path = uid() + '/' + Date.now() + '-' + f.name.replace(/[^\w.\-]+/g, '_'); await B.upload('coach-docs', path, f); await save('coach_docs', { coach_id: uid(), title: t, path }); $('d_t').value = ''; $('d_f').value = ''; }, 'Document uploaded ✓'); },
  openDoc: id => run(async () => { const d = D.coach_docs.find(x => x.id === id); const u = await B.fileUrl('coach-docs', d.path); if (u) window.open(u, '_blank'); }),
  delDoc: id => confirm('Delete this document?') && run(async () => { const d = D.coach_docs.find(x => x.id === id); await B.rmFile('coach-docs', d.path).catch(() => {}); await remove('coach_docs', id); })
};

/* ---------------- boot ---------------- */
async function enter() { await load(COACH_TABLES); showApp(); }
document.documentElement.classList.add('js'); window.__mc64 = true;
(async () => {
  await initBackend(); hooks.render = () => render(); await seedDemo();
  B.onAuth(async u => {
    if (u && S.user && S.user.uid === u.uid && S.user.role === u.role && !u.recovery) { S.user = u; return; }  // token refresh etc.
    S.user = u;
    if (!u) { D.requests = []; showLogin(pendingMsg); pendingMsg = ''; return; }
    if (u.recovery) { pendingUser = u; showRecovery(); return; }
    if (u.role === 'coach') return enter();
    pendingMsg = u.role === 'admin' ? 'This portal is for coaches. Admins: use the Admin dashboard (admin.html).' : 'Signed in as ' + u.email + ', but no coach profile was found' + (u.err ? ' (' + u.err + ')' : '') + '. Ask the admin to create your coach account.';
    B.logout();
  });
})();
