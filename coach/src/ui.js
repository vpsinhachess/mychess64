// UI pieces shared by coach.html and admin.html
import { B } from './backend.js';
import { $, esc, ini, COL, CATS, digits, toast, errText, pickPhoto, ls } from './state.js';

export const avatar = (c, cls = '') => `<div class="av ${cls}" style="background:linear-gradient(135deg,${c.c1 || '#0b6bde'},${c.c2 || '#19c3ff'})">${c.photo_url ? `<img src="${esc(c.photo_url)}" alt="">` : ini(c.name)}</div>`;
export const reach = r => r.phone ? `<a class="ic" href="tel:${esc(r.phone)}">📞 Call</a><a class="ic" target="_blank" rel="noopener" href="https://wa.me/${digits(r.phone)}">💬 WhatsApp</a>` : '';

/* ---- login screen (role = 'coach' | 'admin'); coaches can also create an account or use Google ---- */
let authMode = 'login';
export const setAuthMode = m => { authMode = m; };
const GOOGLE = '<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.9z"/></svg>';
export function loginHTML(role, msg) {
  const coach = role === 'coach', su = coach && authMode === 'signup', gg = coach && authMode === 'google', ttl = coach ? (su ? 'Join as Coach' : gg ? 'Coach with Google' : 'Coach Login') : 'Admin Login';
  const sub = coach ? (su ? 'Create your account and start teaching on MyChess64.' : gg ? 'One tap sign-in with your Google account.' : 'Teach, train and inspire players.') : 'Manage coaches, requests and the whole platform.';
  const nav = (cls) => `<a href="index.html">Website</a><a href="coach.html" class="${coach ? 'on' : ''}">Coach</a><a href="admin.html" class="${coach ? '' : 'on'}">Admin</a>`;
  const seg = coach ? `<div class="lg-seg s3">${[['login', 'Login'], ['signup', 'Sign Up'], ['google', 'Google']].map(([k, l]) => `<button class="${authMode === k ? 'on' : ''}" onclick="app.mode('${k}')">${l}</button>`).join('')}</div>` : '<div class="lg-seg s1"><button class="on">Login</button></div>';
  const pw = (id, ph, ac) => `<div class="lg-pw"><input type="password" id="${id}" placeholder="${ph}" autocomplete="${ac}"><button type="button" onclick="ui.togglePw(this,'${id}')">Show</button></div>`;
  const box = su ? `<form class="lg-box" onsubmit="event.preventDefault();app.signup()"><div class="lg-f"><label for="l_n">Full name</label><input type="text" id="l_n" placeholder="Your name" autocomplete="name"></div><div class="lg-f"><label for="l_e">Email</label><input type="email" id="l_e" placeholder="you@example.com" autocomplete="email"></div><div class="lg-two lg-f"><div><label for="l_p">Password</label>${pw('l_p', '8+ characters', 'new-password')}</div><div><label for="l_p2">Confirm</label>${pw('l_p2', 'repeat it', 'new-password')}</div></div><button class="lg-go">Create Coach Account</button><p class="lg-info">ⓘ After sign-up you complete your profile. An admin approves your public listing.</p></form>`
    : gg ? `<div class="lg-box"><button class="lg-gb" onclick="app.google()">${GOOGLE} Continue with Google</button><p class="lg-info">ⓘ Your Google account becomes a Coach account.</p></div>`
    : `<form class="lg-box" onsubmit="event.preventDefault();app.login()"><div class="lg-f"><label for="l_e">Email</label><input type="email" id="l_e" placeholder="Enter your email" autocomplete="username"></div><div class="lg-f"><label for="l_p">Password</label>${pw('l_p', 'Enter your password', 'current-password')}</div><div class="lg-row"><label><input type="checkbox" id="l_keep" checked> Keep me signed in</label><a href="#" onclick="app.forgot();return false">Forgot password?</a></div><button class="lg-go">${coach ? 'Login as Coach' : 'Login as Admin'}</button>${B.mode === 'demo' ? `<p class="lg-demo">Demo login · ${coach ? '<b>aarav@mychess64.com</b> · <b>chess1234</b>' : '<b>admin@mychess64.com</b> · <b>admin123</b>'}</p>` : ''}</form>`;
  return `<div class="lg-stage"><main class="lg-shell"><section class="lg-side"><div class="lg-tile"><img src="assets/header-logo.webp" alt="MyChess64"></div><p class="lg-tag">Learn. Play. Improve.<br>Anytime, Anywhere.</p>${coach ? '<ul class="lg-perks"><li>Schedule &amp; bookings</li><li>Students &amp; attendance</li><li>Fees &amp; earnings</li><li>Progress reports</li></ul>' : ''}<nav class="lg-rl">${nav()}</nav></section>
<section class="lg-main"><img class="lg-wide" src="assets/header-logo.webp" alt="MyChess64"><h1>${ttl}</h1><p class="lg-sub">${sub}</p><nav class="lg-rm">${nav()}</nav>${seg}${box}<div class="lg-err" id="l_msg">${msg ? esc(msg) : ''}</div></section></main></div>
<footer class="lg-foot"><img src="assets/header-logo.webp" alt="MyChess64"><span>© 2026 MyChess64 · Designed &amp; Developed by : <b>VED PRAKASH SINHA</b> · Made in <b>BHARAT</b> IN</span></footer>`;
}
export async function doLogin() {
  const e = $('l_e').value.trim(), p = $('l_p').value; if (!e || !p) { toast('Enter your email and password', 1); return; }
  const keep = !$('l_keep') || $('l_keep').checked; ls.set('mc64_sess_only', keep ? '' : '1'); try { sessionStorage.setItem('mc64_alive', '1'); } catch (x) {}
  try { await B.login(e, p); } catch (err) { toast(B.mode === 'demo' ? 'Invalid email or password' : 'Login failed: ' + errText(err), 1); }
}
export async function doSignup() {
  const n = $('l_n').value.trim(), e = $('l_e').value.trim(), p = $('l_p').value, p2 = $('l_p2').value;
  if (!n || !e) { toast('Enter your name and email', 1); return; } if (p.length < 8) { toast('Use a password with at least 8 characters', 1); return; } if (p !== p2) { toast('Passwords do not match', 1); return; }
  try { const r = await B.signUp(e, p, n); if (r.confirm) { const m = $('l_msg'); m.className = 'lg-err ok'; m.textContent = '✓ Account created! We sent a confirmation link to ' + e + ' — click it, then sign in.'; } }
  catch (err) { toast(errText(err), 1); }
}
export async function doGoogle() { try { await B.google(); } catch (err) { toast(errText(err), 1); } }
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
export async function applyKeepRule() { let alive = null; try { alive = sessionStorage.getItem('mc64_alive'); } catch (e) {} if (ls.get('mc64_sess_only') === '1' && !alive) { try { await B.logout(); } catch (e) {} } }
export const ui = {
  togglePw(b, id) { const i = $(id), h = i.type === 'password'; i.type = h ? 'text' : 'password'; b.textContent = h ? 'Hide' : 'Show'; },
  pv() { const b = $('pvbox'); if (b) b.innerHTML = previewCard(); },
  photoOwner: () => '',
  async photo(inp) {
    const f = inp.files[0]; if (!f) return; toast('Uploading photo…');
    try { tmpPhoto = await pickPhoto(f, ui.photoOwner()); ui.pv(); toast('Photo uploaded ✓ — press Save to publish'); } catch (e) { toast('Upload failed: ' + errText(e), 1); }
  },
  rmPhoto() { tmpPhoto = ''; ui.pv(); }
};
