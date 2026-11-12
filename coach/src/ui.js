// UI pieces shared by coach.html and admin.html
import { B } from './backend.js';
import { $, esc, ini, COL, CATS, digits, toast, errText, pickPhoto } from './state.js';

export const avatar = (c, cls = '') => `<div class="av ${cls}" style="background:linear-gradient(135deg,${c.c1 || '#0b6bde'},${c.c2 || '#19c3ff'})">${c.photo_url ? `<img src="${esc(c.photo_url)}" alt="">` : ini(c.name)}</div>`;
export const reach = r => r.phone ? `<a class="ic" href="tel:${esc(r.phone)}">📞 Call</a><a class="ic" target="_blank" rel="noopener" href="https://wa.me/${digits(r.phone)}">💬 WhatsApp</a>` : '';

/* ---- login screen (role = 'coach' | 'admin') ---- */
export function loginHTML(role, msg, onSubmitName) {
  const coach = role === 'coach';
  return `<div class="lcard"><img class="llogo" src="assets/header-logo.webp" alt="MyChess64"><h1>${coach ? 'Coach Portal' : 'Admin Dashboard'}</h1><p class="mu">${coach ? 'Sign in to manage your profile, classes, students, attendance and earnings.' : 'Full administrative control of MyChess64.'}</p>
<p id="l_msg" class="err">${msg ? esc(msg) : ''}</p>
<input id="l_e" type="email" placeholder="Email" autocomplete="username"><input id="l_p" type="password" placeholder="Password" autocomplete="current-password" onkeydown="if(event.key==='Enter')app.login()">
<button class="btn" onclick="app.login()">Sign in</button><button class="btn o" onclick="app.forgot()">Forgot password?</button>
${B.mode === 'demo' ? `<p class="mu demo"><b>Demo mode</b> (no Supabase keys yet)<br>${coach ? 'Email: aarav@mychess64.com · Password: chess1234' : 'Email: admin@mychess64.com · Password: admin123'}</p>` : ''}
${coach ? '<div class="feat"><span>👤 Profile &amp; photo</span><span>📅 Schedule</span><span>📥 Bookings</span><span>👥 Students</span><span>✅ Attendance</span><span>💰 Earnings</span><span>📝 Reports</span><span>📈 Performance</span></div>' : ''}
<a class="back" href="index.html">← Back to website</a></div>`;
}
export async function doLogin() {
  const e = $('l_e').value.trim(), p = $('l_p').value; if (!e || !p) { toast('Enter your email and password', 1); return; }
  try { await B.login(e, p); } catch (err) { toast(B.mode === 'demo' ? 'Invalid email or password' : 'Login failed: ' + errText(err), 1); }
}
export async function doForgot() { const e = ($('l_e') || {}).value; if (!e) { toast('Type your email first', 1); return; } try { await B.reset(e.trim()); toast('Password-reset email sent'); } catch (err) { toast(errText(err), 1); } }
export function recoveryHTML() {
  return `<div class="lcard"><img class="llogo" src="assets/header-logo.webp" alt="MyChess64"><h1>Set a new password</h1><input id="np1" type="password" placeholder="New password (8+ characters)" autocomplete="new-password"><input id="np2" type="password" placeholder="Repeat new password" autocomplete="new-password"><button class="btn" onclick="app.newPw()">Save password</button></div>`;
}
export async function doNewPw() {
  const a = $('np1').value, b = $('np2').value; if (a.length < 8) { toast('Use at least 8 characters', 1); return false; } if (a !== b) { toast('Passwords do not match', 1); return false; }
  try { await B.setPassword(a); toast('Password updated ✓'); return true; } catch (e) { toast(errText(e), 1); return false; }
}

/* ---- coach profile form (used by coach "My Profile" and admin "Coaches") ---- */
let tmpPhoto = '';
export const getPhoto = () => tmpPhoto;
export function profileForm(c, { admin = false, isNew = false } = {}) {
  c = c || {}; tmpPhoto = c.photo_url || ''; const ci = Math.max(0, COL.findIndex(x => x[0] === c.c1));
  return `<div class="g2" oninput="ui.pv()">
<label>Name<input id="f_n" value="${esc(c.name)}"></label><label>Title / rating<input id="f_t" value="${esc(c.title)}" placeholder="FIDE 2100"></label><label>City<input id="f_c" value="${esc(c.city)}"></label>
<label>Mode<select id="f_m">${['Online', 'Home', 'Both'].map(m => `<option ${c.mode === m ? 'selected' : ''}>${m}</option>`).join('')}</select></label>
<label>Fee ₹/hr<input id="f_p" type="number" value="${c.price ?? 500}"></label><label>Experience (yrs)<input id="f_e" type="number" value="${c.exp ?? 0}"></label>
<label>Students taught (total)<input id="f_s" type="number" value="${c.students_count ?? 0}"></label><label>Languages<input id="f_l" value="${esc(c.langs)}"></label>
${isNew ? '<label>Login email<input id="f_em" type="email"></label><label>Temporary password (8+ chars)<input id="f_pw" type="text"></label>' : ''}</div>
<div class="cats" oninput="ui.pv()">${CATS.map(k => `<label class="ck"><input type="checkbox" class="f_cat" value="${k}" ${(c.cats || []).includes(k) ? 'checked' : ''}> ${k}</label>`).join('')}</div>
<label oninput="ui.pv()">About you<textarea id="f_b" rows="4">${esc(c.bio)}</textarea></label>
<div class="phrow"><label class="btn o sm">📷 Upload photo<input id="f_file" type="file" accept="image/*" hidden onchange="ui.photo(this)"></label><button class="btn o sm" type="button" onclick="ui.rmPhoto()">Remove photo</button><label>Banner colour<select id="f_col" onchange="ui.pv()">${COL.map((x, i) => `<option value="${i}" ${i === ci ? 'selected' : ''}>Theme ${i + 1}</option>`).join('')}</select></label></div>`;
}
export function readProfile() {
  const g = i => $(i).value.trim(), col = COL[+$('f_col').value] || COL[0];
  return { name: g('f_n'), title: g('f_t'), city: g('f_c'), mode: $('f_m').value, price: +g('f_p') || 0, exp: +g('f_e') || 0, students_count: +g('f_s') || 0, langs: g('f_l'), bio: g('f_b'), cats: [...document.querySelectorAll('.f_cat:checked')].map(x => x.value), c1: col[0], c2: col[1], photo_url: tmpPhoto };
}
export function previewCard() {
  if (!$('f_n')) return ''; const p = readProfile();
  return `<div class="pcard"><div class="pimg" style="background:linear-gradient(135deg,${p.c1},${p.c2})">${p.photo_url ? `<img src="${esc(p.photo_url)}" alt="">` : `<div class="ini">${ini(p.name)}</div>`}<div class="nm"><b>${esc(p.name)} ✓</b><span>${esc(p.title)} · ${esc(p.city)}</span></div></div><div class="pb"><p>${esc(p.bio) || '<span class="mu">Your bio appears here…</span>'}</p><div class="tags">${p.cats.map(k => `<i>${k}</i>`).join('')}<i>${esc(p.mode)}</i></div><div class="r1"><b>₹${p.price}/hr</b><span class="mu">🎓 ${p.exp} yrs</span></div></div></div>`;
}
export const ui = {
  pv() { const b = $('pvbox'); if (b) b.innerHTML = previewCard(); },
  photoOwner: () => '',
  async photo(inp) {
    const f = inp.files[0]; if (!f) return; toast('Uploading photo…');
    try { tmpPhoto = await pickPhoto(f, ui.photoOwner()); ui.pv(); toast('Photo uploaded ✓ — press Save to publish'); } catch (e) { toast('Upload failed: ' + errText(e), 1); }
  },
  rmPhoto() { tmpPhoto = ''; ui.pv(); }
};
