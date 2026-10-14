/**
 * MyChess64 backend (free). Paste into: Google Sheet -> Extensions -> Apps Script.
 * Data lives in this Google Sheet (tabs are created automatically). Admin password = Script Property ADMIN_PASSWORD.
 */
const H = {
  Coaches: ['id','ts','date','status','read','name','title','rating','city','exp','students','langs','lv','feeMin','feeMax','spec','bio','ach','mail','ph','photoId','featured','paused','note','sample'],
  Enquiries: ['id','ts','date','status','read','responded','name','first','contact','age','level','goal','budget','timing','msg','coachId','coachName','assignedTo','assignedName','note','sample'],
  Responses: ['id','ts','date','eid','coach','contact','note','read','sample'],
  Reviews: ['id','ts','date','cid','name','stars','text','status','sample']
};
const NUM = ['ts','rating','exp','students','feeMin','feeMax','age','stars'], BOOL = ['read','responded','featured','paused','sample'], CSV = ['langs','lv','spec'];
const PUBC = ['id','name','title','rating','city','exp','students','langs','lv','feeMin','feeMax','spec','bio','ach','photoId','featured','sample'];
const PUBE = ['id','first','age','level','goal','budget','timing','msg','coachName','status','ts','resp','sample'];
const PUBR = ['id','cid','name','stars','text','ts','sample'];

const out = o => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
const pick = (o, ks) => { const r = {}; ks.forEach(k => { if (o[k] !== undefined) r[k] = o[k]; }); return r; };
const S = (v, n) => String(v == null ? '' : v).trim().slice(0, n), N = v => Number.isFinite(+v) ? +v : 0;
const L = v => (Array.isArray(v) ? v : []).slice(0, 12).map(x => S(x, 80)).filter(Boolean);
const isMail = v => /^\S+@\S+\.\S+$/.test(v), isPhone = v => v.replace(/\D/g, '').length >= 8, isContact = v => isMail(v) || isPhone(v);
const newId = () => Utilities.getUuid().replace(/-/g, '').slice(0, 16);

// ---------- sheet helpers ----------
function sheet(n) {
  const ss = SpreadsheetApp.getActiveSpreadsheet(); let s = ss.getSheetByName(n);
  if (!s) { s = ss.insertSheet(n); s.getRange(1, 1, s.getMaxRows(), H[n].length).setNumberFormat('@'); s.appendRow(H[n]); s.setFrozenRows(1); }
  return s;
}
function rows(n) {
  const v = sheet(n).getDataRange().getValues(), h = v[0];
  return v.slice(1).filter(r => r[0] !== '').map(r => {
    const o = {};
    h.forEach((k, j) => { let x = r[j];
      if (NUM.includes(k)) x = x === '' ? 0 : Number(x);
      else if (BOOL.includes(k)) x = x === true || String(x).toUpperCase() === 'TRUE';
      else if (CSV.includes(k)) x = String(x).split(',').map(s => s.trim()).filter(Boolean);
      else if (k === 'ach') x = String(x).split('\n').map(s => s.trim()).filter(Boolean);
      else x = String(x);
      o[k] = x; });
    return o;
  });
}
function ser(k, v) {
  if (Array.isArray(v)) return v.join(k === 'ach' ? '\n' : ', ');
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
  return v == null ? '' : String(v);
}
function add(n, o) {
  o.id = o.id || newId(); o.ts = o.ts || Date.now(); o.date = Utilities.formatDate(new Date(o.ts), 'Asia/Kolkata', 'dd MMM yyyy HH:mm');
  sheet(n).appendRow(H[n].map(k => ser(k, o[k]))); return o.id;
}
function find(s, id) { const last = s.getLastRow(); if (last < 2) return 0; const i = s.getRange(1, 1, last, 1).getValues().map(r => String(r[0])).indexOf(String(id)); return i > 0 ? i + 1 : 0; }
function upd(n, id, f) {
  const s = sheet(n), r = find(s, id); if (!r) throw new Error('Not found');
  Object.keys(f).forEach(k => { const c = H[n].indexOf(k); if (c > 0 && k !== 'ts' && k !== 'date') s.getRange(r, c + 1).setValue(ser(k, f[k])); });
}
function del(n, id) { const s = sheet(n), r = find(s, id); if (r) s.deleteRow(r); }
const bust = () => CacheService.getScriptCache().remove('pub');

// ---------- what visitors may see ----------
function pub() {
  const cache = CacheService.getScriptCache(), hit = cache.get('pub'); if (hit) return JSON.parse(hit);
  const cnt = {}; rows('Responses').forEach(r => cnt[r.eid] = (cnt[r.eid] || 0) + 1);
  const o = {
    coaches: rows('Coaches').filter(c => c.status === 'approved' && !c.paused).map(c => pick(c, PUBC)),
    enquiries: rows('Enquiries').filter(e => e.status === 'open' || e.status === 'matched').sort((a, b) => b.ts - a.ts).slice(0, 300).map(e => { e.resp = cnt[e.id] || 0; return pick(e, PUBE); }),
    reviews: rows('Reviews').filter(r => r.status === 'visible').sort((a, b) => b.ts - a.ts).slice(0, 500).map(r => pick(r, PUBR))
  };
  const s = JSON.stringify(o); if (s.length < 90000) cache.put('pub', s, 120); return o;
}
function adminState() {
  const A = rows('Coaches'), R = rows('Responses'), cnt = {}; R.forEach(r => cnt[r.eid] = (cnt[r.eid] || 0) + 1);
  return { coaches: A.filter(c => c.status === 'approved'), applications: A, enquiries: rows('Enquiries').map(e => { e.resp = cnt[e.id] || 0; return e; }), reviews: rows('Reviews'), interests: R };
}
function my(ids) {   // visitors track their own submissions by id (stored in their browser)
  const E = rows('Enquiries'), C = rows('Coaches');
  return ids.split(',').filter(Boolean).slice(0, 20).map(i => {
    const e = E.find(x => x.id === i); if (e) return { id: i, type: 'enquiry', status: e.status, assignedName: e.assignedName, first: e.first };
    const c = C.find(x => x.id === i); return c ? { id: i, type: 'application', status: c.status, name: c.name } : null;
  }).filter(Boolean);
}

// ---------- public submissions ----------
function guard(d) {
  if (d.website) throw new Error('Rejected');
  const c = CacheService.getScriptCache(), k = 'g_' + S(d.uid || 'x', 40), n = +c.get(k) || 0;
  if (n >= 12) throw new Error('Too many submissions – please try again later.'); c.put(k, String(n + 1), 3600);
  const p = PropertiesService.getScriptProperties(), day = new Date().toISOString().slice(0, 10), cur = (p.getProperty('cap') || 'x|0').split('|'), cnt = cur[0] === day ? +cur[1] : 0;
  if (cnt >= 400) throw new Error('Daily limit reached – please try again tomorrow.'); p.setProperty('cap', day + '|' + (cnt + 1));
}
function notify(s, b) { try { MailApp.sendEmail(Session.getEffectiveUser().getEmail(), '[MyChess64] ' + s, b); } catch (e) {} }
function enquiry(d) {
  const e = { status: 'pending', read: false, responded: false, name: S(d.name, 80), first: S(d.first, 60), contact: S(d.contact, 120), age: N(d.age), level: S(d.level, 20), goal: S(d.goal, 120),
    budget: S(d.budget, 60), timing: S(d.timing, 80), msg: S(d.msg, 1000), coachId: S(d.coachId, 80), coachName: S(d.coachName, 80) };
  if (!e.first || !e.msg || !e.level || !isContact(e.contact)) throw new Error('Please fill in all fields with a valid phone number or email.');
  const id = add('Enquiries', e); notify('New student enquiry – approve it', e.name + ' (' + e.level + ')\n' + e.contact + '\n\n' + e.msg); return { id: id };
}
function respond(d) {
  const en = rows('Enquiries').find(x => x.id === S(d.eid, 40));
  if (!en || en.status !== 'open') throw new Error('This enquiry is no longer open.');
  const r = { eid: en.id, coach: S(d.coach, 80), contact: S(d.contact, 120), note: S(d.note, 300), read: false };
  if (!r.coach || !isContact(r.contact)) throw new Error('Please add your name and a valid phone or email.');
  add('Responses', r); notify('A coach responded to an enquiry', r.coach + ' – ' + r.contact + '\nEnquiry: ' + en.name + '\n' + r.note); return { ok: true };
}
function savePhoto(url, id) {
  const m = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+\/=]+)$/.exec(url || ''); if (!m || url.length > 150000) return '';
  const it = DriveApp.getFoldersByName('MyChess64 Photos'), fo = it.hasNext() ? it.next() : DriveApp.createFolder('MyChess64 Photos');
  const f = fo.createFile(Utilities.newBlob(Utilities.base64Decode(m[2]), 'image/' + m[1], id + '.' + m[1]));
  f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); return f.getId();
}
function apply(d) {
  const c = { id: newId(), status: 'pending', read: false, name: S(d.name, 80), title: S(d.title, 120), rating: N(d.rating), city: S(d.city, 80), exp: N(d.exp), students: N(d.students),
    langs: L(d.langs), lv: L(d.lv), feeMin: N(d.feeMin), feeMax: N(d.feeMax), spec: L(d.spec), bio: S(d.bio, 1500), ach: L(d.ach), mail: S(d.mail, 120), ph: S(d.ph, 40) };
  if (!c.name || !isMail(c.mail) || !isPhone(c.ph)) throw new Error('Please add your name, a valid email and phone number.');
  c.photoId = savePhoto(d.photoData, c.id); add('Coaches', c);
  notify('New coach application – approve it', c.name + ' · ' + c.city + '\n' + c.mail + ' · ' + c.ph + '\n\n' + c.bio); return { id: c.id };
}
function review(d) {
  const cid = S(d.cid, 80), uid = S(d.uid, 64), stars = Math.round(N(d.stars)), name = S(d.name, 60), text = S(d.text, 600);
  if (!cid || !uid || !name || !text || stars < 1 || stars > 5) throw new Error('Please add your name, rating and review.');
  const id = cid + '_' + uid, old = rows('Reviews').find(r => r.id === id), status = old && old.status === 'hidden' ? 'hidden' : 'pending';
  if (old) upd('Reviews', id, { name: name, stars: stars, text: text, status: status }); else add('Reviews', { id: id, cid: cid, name: name, stars: stars, text: text, status: status });
  notify('New review to approve', name + ': ' + stars + '★ ' + text); return { ok: true };
}

// ---------- admin ----------
function authed(pw) {
  const c = CacheService.getScriptCache(), p = PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  if (!p || p.length < 8) throw new Error('Admin password not configured');
  if ((+c.get('fails') || 0) >= 8) throw new Error('Locked for 15 minutes after too many wrong attempts.');
  if (!pw || pw !== p) { c.put('fails', String((+c.get('fails') || 0) + 1), 900); throw new Error('Wrong password'); }
  c.remove('fails');
}
function admin(d) {
  authed(d.pw);
  if (d.op === 'list') return adminState();
  const n = d.sheet; if (!H[n]) throw new Error('Bad sheet');
  if (d.op === 'update') { upd(n, S(d.id, 80), d.fields || {}); bust(); return { ok: true }; }
  if (d.op === 'delete') { del(n, S(d.id, 80)); bust(); return { ok: true }; }
  if (d.op === 'import') { let k = 0; (d.rows || []).slice(0, 200).forEach(r => { if (!r.id || !find(sheet(n), r.id)) { add(n, r); k++; } }); bust(); return { ok: true, added: k }; }
  throw new Error('Bad op');
}

// ---------- web entry points ----------
function doGet(e) {
  try { const a = e.parameter.action; if (a === 'public') return out(pub()); if (a === 'my') return out(my(e.parameter.ids || '')); return out({ ok: true }); }
  catch (err) { return out({ error: String(err.message || err) }); }
}
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000); const d = JSON.parse(e.postData.contents), a = d.action, F = { enquiry: enquiry, respond: respond, apply: apply, review: review };
    if (a === 'admin') return out(admin(d));
    if (!Object.prototype.hasOwnProperty.call(F, a)) throw new Error('Bad action');
    guard(d); const r = F[a](d); bust(); return out(r);
  } catch (err) { return out({ error: String(err.message || err) }); }
  finally { try { lock.releaseLock(); } catch (x) {} }
}

/** Run ONCE from the editor (Run -> setup) to create the tabs and authorise Drive/Mail access. */
function setup() {
  if (!PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD')) throw new Error('First add Script Property ADMIN_PASSWORD (Project Settings -> Script properties).');
  Object.keys(H).forEach(sheet); DriveApp.getFoldersByName('MyChess64 Photos'); MailApp.getRemainingDailyQuota();
}
