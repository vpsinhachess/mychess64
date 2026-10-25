// Public website: coach list, profile popup, demo-request + apply forms
import { B } from './backend.js';
const site = window.MC64_SITE || {};
import { ls, $, esc, uid, ini, fd, tf, toast, D, ST, stat, seats, upcoming, lvl, DAYS, TIMES } from './state.js';

const P = ['♞', '♛', '♜', '♝', '♟', '♚'];
let io;
try { JSON.parse(ls.get('mc64_saved') || '[]').forEach(i => ST.saved.add(i)); } catch (e) {}
const throttle = () => { if (Date.now() - (+ls.get('mc64_last') || 0) < 15000) { toast('Please wait a few seconds before sending again.', 1); return true; } return false; };

export function draw() {
  const tabs = $('tabs'), grid = $('grid');
  [...tabs.children].forEach(b => b.classList.toggle('on', b.textContent === ST.cat));
  const lv = $('lv').value, so = $('so').value, md = $('md2').value;
  let L = D.coaches.filter(x => x.status !== 'hidden').map(x => { const s = stat(x); return { ...x, _r: s.r, _n: s.n }; })
    .filter(x => (ST.cat === 'All' || (ST.cat === 'Saved ♥' ? ST.saved.has(x.id) : (x.cats || []).includes(ST.cat)))
      && (!ST.txt || (x.name + x.city).toLowerCase().includes(ST.txt))
      && (!lv || (x.cats || []).some(c => lvl[c] === lv))
      && (!md || x.mode === md || x.mode === 'Both'));
  if (so === 'r') L.sort((a, b) => b._r - a._r);
  if (so === 'pl') L.sort((a, b) => a.price - b.price);
  if (so === 'ph') L.sort((a, b) => b.price - a.price);
  if (so === 'e') L.sort((a, b) => b.exp - a.exp);
  $('cnt').textContent = L.length + ' coach' + (L.length === 1 ? '' : 'es') + ' found · ' + ST.saved.size + ' saved';
  grid.innerHTML = L.length ? L.map(x => `<article class="cd"><div class="ph" style="background:linear-gradient(135deg,${x.c1},${x.c2})">${x.photo ? `<img src="${x.photo}" alt="${esc(x.name)}" loading="lazy">` : `<div class="ini">${ini(x.name)}</div>`}<span class="rb">★ ${x._n ? x._r.toFixed(1) + ' (' + x._n + ')' : 'New'}</span><button class="hr ${ST.saved.has(x.id) ? 'on' : ''}" onclick="save('${x.id}')" aria-label="Save coach">♥</button><div class="nm"><h3>${esc(x.name)} <i class="vf">✓</i></h3><span>${esc(x.title)} · ${esc(x.city)}</span></div></div><div class="cbd"><p>${esc(x.bio)}</p><div class="tags">${(x.cats || []).map(c => `<i>${c}</i>`).join('')}<i>${esc(x.mode)}</i></div><div class="mt"><span>🎓 ${x.exp} yrs</span><span>👥 ${x.students} students</span></div><div class="foot"><div><b>₹${x.price}</b><small>/hr</small></div><div class="bt"><button class="btn o sm" onclick="openM('${x.id}')">Profile</button><button class="btn sm" onclick="demo('${x.id}')">Free demo</button></div></div></div></article>`).join('')
    : '<p class="mu">No coaches to show yet. Try Reset, or request a match below.</p>';
  const rs = [...D.reviews].sort((a, b) => b.ts - a.ts).slice(0, 3);
  $('reviews').style.display = rs.length ? '' : 'none';
  $('rvg').innerHTML = rs.map(r => { const c = D.coaches.find(x => x.id === r.cid); return `<div class="tm"><div class="q">${'★'.repeat(+r.stars || 5)}</div><p>${esc(r.text)}</p><b>${esc(r.name)}</b><small>${c ? 'Student of ' + esc(c.name) : 'Verified student'}</small></div>`; }).join('');
  reveal();
  if (!ST.dl && location.hash.startsWith('#coach=')) { const id = decodeURIComponent(location.hash.slice(7)); if (D.coaches.some(c => c.id === id)) { ST.dl = 1; openM(id); } }
}

export function save(id) { ST.saved.has(id) ? ST.saved.delete(id) : ST.saved.add(id); ls.set('mc64_saved', JSON.stringify([...ST.saved])); draw(); if ($('md').classList.contains('on')) openM(id, 1); }
export function applySearch() { ST.txt = $('q').value.trim().toLowerCase(); draw(); $('coaches').scrollIntoView(); }
export function quick(k) { ST.cat = k; ST.txt = ''; draw(); $('coaches').scrollIntoView(); }
export function resetAll() { ST.cat = 'All'; ST.txt = ''; ['q', 'lv', 'so', 'md2'].forEach(i => $(i).value = ''); draw(); }
export function theme() { const r = document.documentElement, d = r.dataset.theme || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'); r.dataset.theme = d === 'dark' ? 'light' : 'dark'; }
export function menu(c) { $('mm').classList.toggle('on', c ? false : undefined); }

export function openM(id, keep) {
  const x = D.coaches.find(c => c.id === id); if (!x) return; if (!keep) ST.sel = {};
  const sel = ST.sel, s = stat(x), rs = D.reviews.filter(r => r.cid === id).sort((a, b) => b.ts - a.ts), cl = upcoming(id);
  $('pm').innerHTML = `<button class="x" onclick="closeM()" aria-label="Close">×</button><div class="pbn" style="background:linear-gradient(135deg,${x.c1},${x.c2})"><span class="wm">${P[x.name.length % 6]}</span></div>
<div class="phd"><div class="pav">${x.photo ? `<img src="${x.photo}" alt="${esc(x.name)}">` : `<div class="ini" style="font-size:54px;background:linear-gradient(135deg,${x.c1},${x.c2})">${ini(x.name)}</div>`}</div>
<div class="pin"><h2>${esc(x.name)} <i class="vf">✓</i></h2><div class="tags" style="margin-top:8px"><span class="tt">${esc(x.title)}</span><i>📍 ${esc(x.city)}</i><i>${esc(x.mode)} classes</i><i style="color:#b7791f">★ ${s.n ? s.r.toFixed(1) + ' · ' + s.n + ' reviews' : 'New coach'}</i></div></div></div>
<div class="pbd"><div class="main"><div><h4>About</h4><p>${esc(x.bio)}</p><p class="mu" style="margin-top:6px">Languages: ${esc(x.langs || 'English')}</p></div>
<div class="ss"><div><b>${x.exp}+</b><span>Years coaching</span></div><div><b>${x.students}+</b><span>Students taught</span></div><div><b>${s.n}</b><span>Reviews</span></div></div>
<div><h4>Specialities</h4><div class="tags">${(x.cats || []).map(c => `<i>${c}</i>`).join('')}<i>Game analysis</i><i>Endgames</i><i>Homework &amp; progress tracking</i></div></div>
<div><h4>Student reviews</h4><div style="display:grid;gap:8px">${rs.length ? rs.slice(0, 4).map(r => `<div class="rvw"><span class="q">${'★'.repeat(+r.stars || 5)}</span> <b>${esc(r.name)}</b><p>${esc(r.text)}</p></div>`).join('') : '<p class="mu">No reviews yet.</p>'}</div></div></div>
<aside class="bk"><div class="pr">₹${x.price}<small> /hour</small></div><div class="mu">Your first demo class is free</div>
${cl.length ? '<h4>Upcoming classes</h4>' + cl.map(c => { const l = seats(c); return `<button class="sl ${sel.cls === c.id ? 'on' : ''}" ${l <= 0 ? 'disabled' : ''} onclick="pickCls('${id}','${c.id}')"><b>${esc(c.title)}</b><span>${fd(c.date)} · ${tf(c.time)} · ${c.dur} min · ${esc(c.mode)} · ${l > 0 ? l + ' seats left' : 'Full'}</span></button>`; }).join('') : '<h4>Preferred slot</h4><div class="dy">' + DAYS.map(d => `<button class="${sel.d === d ? 'on' : ''}" onclick="pickSlot('${id}','d','${d}')">${d}</button>`).join('') + '</div><div class="tm2">' + TIMES.map(t => `<button class="${sel.t === t ? 'on' : ''}" onclick="pickSlot('${id}','t','${t}')">${t}</button>`).join('') + '</div>'}
<button class="btn g" onclick="demo('${id}')">Book free demo</button><button class="btn o" onclick="save('${id}')">${ST.saved.has(id) ? '♥ Saved' : '♡ Save coach'}</button><button class="btn o" onclick="shareCoach('${id}')">🔗 Share profile</button></aside></div>`;
  $('md').classList.add('on'); document.body.style.overflow = 'hidden'; const xb = $('pm').querySelector('.x'); if (xb && !keep) xb.focus();
}
export async function shareCoach(id) { const u = location.origin + location.pathname + '#coach=' + encodeURIComponent(id); try { await navigator.clipboard.writeText(u); toast('Profile link copied ✓'); } catch (e) { prompt('Copy this link', u); } }
export function pickCls(id, c) { ST.sel = { cls: c }; openM(id, 1); }
export function pickSlot(id, k, v) { ST.sel[k] = v; openM(id, 1); }
export function closeM() { $('md').classList.remove('on'); if (!$('app').classList.contains('on')) document.body.style.overflow = ''; }

export function demo(id) {
  const sel = ST.sel, c = D.classes.find(x => x.id === sel.cls); let sl = '';
  if (c) sl = c.title + ' · ' + fd(c.date) + ' ' + tf(c.time); else if (sel.d) sl = sel.d + (sel.t ? ' ' + sel.t : '');
  ST.pend = { cid: id, cls: c ? c.id : '', slot: sl };
  const x = D.coaches.find(k => k.id === id), m = { Kids: 'Chess for Kids', Adults: 'Chess for Adults', Tournament: 'Tournament Prep' }, v = x && m[(x.cats || []).find(a => m[a])];
  if (v) $('e_c').value = v;
  closeM(); $('enquire').scrollIntoView(); setTimeout(() => $('e_n').focus(), 450);
}

function finish(f, id, n, msg) {
  f.querySelectorAll('input,select,button').forEach(x => x.style.display = 'none');
  const o = $(id); o.innerHTML = 'Thank you' + (n ? ', ' + esc(n) : '') + '! ' + msg + ' <a href="#" onclick="resetForm(\'' + f.id + '\',\'' + id + '\');return false">Submit another</a>'; o.style.display = 'block';
}
export function resetForm(fid, id) { const f = $(fid); f.reset(); f.querySelectorAll('input,select,button').forEach(x => x.style.display = ''); $(id).style.display = 'none'; }

export async function subDemo(e) {
  e.preventDefault(); const f = e.target, n = $('e_n').value.trim(), btn = f.querySelector('button.btn');
  if (f.querySelector('.hp').value) { finish(f, 'e_ok', n, 'We’ll contact you within 24 hours.'); return false; }
  if (throttle()) return false; btn.disabled = true;
  try {
    await B.submit(uid(), { ts: Date.now(), name: n, phone: $('e_p').value.trim(), cat: $('e_c').value, cid: ST.pend.cid || '', cls: ST.pend.cls || '', slot: ST.pend.slot || '', status: 'new' }, ST.pend.cls || '');
    ls.set('mc64_last', Date.now()); ST.pend = {}; finish(f, 'e_ok', n, 'We’ll contact you within 24 hours.');
  } catch (err) { console.error(err); toast('Could not send your request (' + (err.code || err.message || 'error') + '). Please try again.', 1); }
  btn.disabled = false; return false;
}
export async function subJoin(e) {
  e.preventDefault(); const f = e.target, n = $('j_n').value.trim(), btn = f.querySelector('button.btn');
  if (f.querySelector('.hp').value) { finish(f, 'j_ok', n, 'Our team will review your application soon.'); return false; }
  if (throttle()) return false; btn.disabled = true;
  try {
    await B.set('apps', uid(), { ts: Date.now(), name: n, rating: $('j_r').value.trim(), email: $('j_e').value.trim(), city: $('j_c').value.trim(), status: 'new' });
    ls.set('mc64_last', Date.now()); finish(f, 'j_ok', n, 'Our team will review your application soon.');
  } catch (err) { console.error(err); toast('Could not send your application (' + (err.code || err.message || 'error') + '). Please try again.', 1); }
  btn.disabled = false; return false;
}

export function reveal() {
  const els = document.querySelectorAll('.rv:not(.in),.cd:not(.in)');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  io = io || new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return; en.target.classList.add('in'); io.unobserve(en.target);
    en.target.querySelectorAll('[data-n]').forEach(c => { const T = +c.dataset.n, s = c.dataset.s; let v = 0; const st = setInterval(() => { v = Math.min(T, v + Math.ceil(T / 30)); c.textContent = s === '★' ? (v / 10).toFixed(1) + '★' : v + s; if (v >= T) clearInterval(st); }, 30); });
  }), { threshold: .1 });
  els.forEach(e => { if (e.classList.contains('cd')) e.classList.add('rv'); io.observe(e); });
}

export function initPublic() {
  const tabs = $('tabs');
  ['All', 'Kids', 'Adults', 'Tournament', 'Openings', 'Saved ♥'].forEach(k => { const b = document.createElement('button'); b.textContent = k; b.onclick = () => { ST.cat = k; draw(); }; tabs.appendChild(b); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeM(); if (e.key === 'Enter' && e.target.id === 'q') applySearch(); });
  addEventListener('scroll', () => $('tp').classList.toggle('on', scrollY > 600), { passive: true });
    const dlg = $('pm'); dlg.setAttribute('role', 'dialog'); dlg.setAttribute('aria-modal', 'true'); dlg.setAttribute('aria-label', 'Coach profile');
  const fc = [site.phone && '📞 ' + site.phone, site.email && '✉ <a href="mailto:' + esc(site.email) + '">' + esc(site.email) + '</a>', site.address && '📍 ' + esc(site.address)].filter(Boolean).join('<br>');
  if ($('fcontact')) $('fcontact').innerHTML = fc;
  const wd = (site.whatsapp || '').replace(/\D/g, ''); if (wd) { const a = document.createElement('a'); a.className = 'wa'; a.href = 'https://wa.me/' + wd + '?text=' + encodeURIComponent('Hi MyChess64, I want a free demo class.'); a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('aria-label', 'Chat on WhatsApp'); a.textContent = '💬'; document.body.appendChild(a); }
  addEventListener('hashchange', () => { ST.dl = 0; draw(); });
  Object.assign(window, { shareCoach, draw, save, applySearch, quick, resetAll, theme, menu, openM, pickCls, pickSlot, closeM, demo, resetForm, subDemo, subJoin });
  draw();
}
