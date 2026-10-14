'use strict';
// MyChess64 – standalone server. Zero dependencies (Node >= 22.13). Storage: one SQLite file (+ daily JSON backups).
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const { DatabaseSync } = require('node:sqlite');
const PORT = +process.env.PORT || 3000, DATA = process.env.DATA_DIR || path.join(__dirname, 'data');
const PUB = path.join(__dirname, 'public'), HOPS = +process.env.TRUST_PROXY_HOPS || 1;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD, SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
if (!ADMIN_PASSWORD || ADMIN_PASSWORD.length < 8) { console.error('Set ADMIN_PASSWORD (min 8 characters).'); process.exit(1); }
class HttpError extends Error { constructor(s, m) { super(m); this.status = s; } }

fs.mkdirSync(DATA, { recursive: true });
const db = new DatabaseSync(path.join(DATA, 'mychess64.db'));
db.exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS docs(col TEXT NOT NULL, id TEXT NOT NULL, data TEXT NOT NULL, PRIMARY KEY(col,id))');
const Q = { all: db.prepare('SELECT id,data FROM docs WHERE col=?'), one: db.prepare('SELECT data FROM docs WHERE col=? AND id=?'),
  put: db.prepare('INSERT INTO docs(col,id,data) VALUES(?,?,?) ON CONFLICT(col,id) DO UPDATE SET data=excluded.data'),
  del: db.prepare('DELETE FROM docs WHERE col=? AND id=?'), any: db.prepare('SELECT 1 AS x FROM docs LIMIT 1'), dump: db.prepare('SELECT col,id,data FROM docs') };
const getDoc = (c, id) => { const r = Q.one.get(c, id); return r ? JSON.parse(r.data) : null; };
const putDoc = (c, id, d) => Q.put.run(c, id, JSON.stringify(d));
const rows = c => Q.all.all(c).map(r => ({ id: r.id, ...JSON.parse(r.data) }));
const newId = () => crypto.randomBytes(8).toString('hex');
const pick = (o, ks) => Object.fromEntries(ks.filter(k => o[k] !== undefined).map(k => [k, o[k]]));
function dump() { const o = {}; for (const r of Q.dump.all()) (o[r.col] ??= {})[r.id] = JSON.parse(r.data); return o; }

// First run: sample data (SEED=0 to skip). Samples carry sample:true – delete them in Admin.
const seedFile = path.join(__dirname, 'seed.json');
if (!Q.any.get() && process.env.SEED !== '0' && fs.existsSync(seedFile)) {
  const s = JSON.parse(fs.readFileSync(seedFile, 'utf8')); for (const c in s) for (const id in s[c]) putDoc(c, id, s[c][id]); console.log('Loaded sample data.');
}
// Daily local backup (keeps 14 days) in DATA_DIR/backups
function backup() {
  const dir = path.join(DATA, 'backups'), f = path.join(dir, `backup-${new Date().toISOString().slice(0, 10)}.json`);
  if (fs.existsSync(f)) return; fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(f, JSON.stringify(dump()));
  fs.readdirSync(dir).sort().slice(0, -14).forEach(x => fs.unlinkSync(path.join(dir, x)));
}
try { backup(); } catch (e) { console.error('backup failed', e.message); } setInterval(() => { try { backup(); } catch {} }, 3600e3).unref();

// Optional email alerts: SMTP_URL + ADMIN_EMAIL (+ npm i nodemailer)
let mailer = null; try { if (process.env.SMTP_URL) mailer = require('nodemailer').createTransport(process.env.SMTP_URL); } catch { console.warn('nodemailer missing – alerts off'); }
const notify = (s, t) => mailer && process.env.ADMIN_EMAIL && mailer.sendMail({ from: process.env.SMTP_FROM || process.env.ADMIN_EMAIL, to: process.env.ADMIN_EMAIL, subject: '[MyChess64] ' + s, text: t }).catch(() => {});

// ---- public input rules ----
const SCHEMA = {
  enquiries: { uid: 's64', name: 's80', first: 's60', age: 'n', level: 's20', goal: 's120', budget: 's60', timing: 's80', msg: 's1000', coachId: 's80', coachName: 's80', contact: 's120' },
  interests: { eid: 's80', uid: 's64', coach: 's80', contact: 's120', note: 's300' },
  reviews: { cid: 's80', uid: 's64', name: 's60', stars: 'n', text: 's600' },
  applications: { uid: 's64', name: 's80', title: 's120', rating: 'n', city: 's80', exp: 'n', students: 'n', langs: 'a', lv: 'a', feeMin: 'n', feeMax: 'n', spec: 'a', bio: 's1500', ach: 'a', mail: 's120', ph: 's40', photoData: 'p' },
};
const REQ = { enquiries: ['first', 'msg', 'level', 'contact'], interests: ['eid', 'coach', 'contact'], reviews: ['cid', 'uid', 'name', 'text', 'stars'], applications: ['name', 'mail', 'ph'] };
const isMail = v => /^\S+@\S+\.\S+$/.test(v), isPhone = v => v.replace(/\D/g, '').length >= 8;
const CHECK = { enquiries: { contact: v => isMail(v) || isPhone(v) }, interests: { contact: v => isMail(v) || isPhone(v) }, applications: { mail: isMail, ph: isPhone } };
function clean(col, body) {
  const out = {};
  for (const [k, t] of Object.entries(SCHEMA[col])) {
    let v = body[k]; if (v === undefined || v === null) continue;
    if (t[0] === 's') out[k] = String(v).trim().slice(0, +t.slice(1));
    else if (t === 'n') { v = Number(v); if (Number.isFinite(v)) out[k] = v; }
    else if (t === 'a') out[k] = (Array.isArray(v) ? v : []).slice(0, 12).map(x => String(x).trim().slice(0, 80)).filter(Boolean);
    else if (t === 'p' && typeof v === 'string' && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(v) && v.length < 150000) out[k] = v;
  }
  for (const k of REQ[col]) if (out[k] === undefined || out[k] === '') throw new HttpError(400, `Please fill in: ${k}`);
  for (const [k, fn] of Object.entries(CHECK[col] || {})) if (!fn(out[k])) throw new HttpError(400, `Invalid ${k}`);
  return out;
}

// ---- what each audience may see ----
const PUB_ENQ = ['id', 'first', 'age', 'level', 'goal', 'budget', 'timing', 'msg', 'coachName', 'status', 'ts', 'resp'];
function state(admin) {
  const co = rows('coaches'), en = rows('enquiries'), rv = rows('reviews'), it = rows('interests'), cnt = {};
  it.forEach(i => cnt[i.eid] = (cnt[i.eid] || 0) + 1); en.forEach(e => e.resp = cnt[e.id] || 0);
  if (admin) return { coaches: co, enquiries: en, reviews: rv, interests: it, applications: rows('applications') };
  return {
    coaches: co.filter(c => !c.paused).map(({ uid, ...c }) => c),
    enquiries: en.filter(e => e.status === 'open' || e.status === 'matched').sort((a, b) => b.ts - a.ts).slice(0, 300).map(e => pick(e, PUB_ENQ)),
    reviews: rv.filter(r => r.status === 'visible').sort((a, b) => b.ts - a.ts).slice(0, 500).map(r => pick(r, ['id', 'cid', 'name', 'stars', 'text', 'ts'])),
  };
}

// ---- auth + rate limiting ----
const hmac = s => crypto.createHmac('sha256', SECRET).update(s).digest('base64url'), sha = s => crypto.createHash('sha256').update(String(s)).digest();
const makeToken = () => { const p = Buffer.from(JSON.stringify({ exp: Date.now() + 12 * 3600e3 })).toString('base64url'); return p + '.' + hmac(p); };
function isAdmin(req) {
  const [p, sig] = (req.headers.authorization || '').replace(/^Bearer /, '').split('.'); if (!p || !sig) return false;
  const a = Buffer.from(sig), b = Buffer.from(hmac(p)); if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try { return JSON.parse(Buffer.from(p, 'base64url')).exp > Date.now(); } catch { return false; }
}
const hits = new Map();
function limit(key, max, ms) { const n = Date.now(), a = (hits.get(key) || []).filter(t => n - t < ms); if (a.length >= max) throw new HttpError(429, 'Too many requests – please try again later.'); a.push(n); hits.set(key, a); }
setInterval(() => { const n = Date.now(); for (const [k, v] of hits) if (!v.some(t => n - t < 3600e3)) hits.delete(k); }, 600e3).unref();
const ipOf = req => { const p = (req.headers['x-forwarded-for'] || '').split(',').map(x => x.trim()).filter(Boolean); return p.length ? p[Math.max(0, p.length - HOPS)] : req.socket.remoteAddress; };

// ---- http helpers ----
const send = (res, code, obj, extra = {}) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extra }); res.end(typeof obj === 'string' ? obj : JSON.stringify(obj)); };
const readBody = req => new Promise((ok, no) => { let n = 0; const ch = [];
  req.on('data', c => { n += c.length; if (n > 400e3) { no(new HttpError(413, 'Too large')); req.destroy(); } else ch.push(c); });
  req.on('end', () => { try { ok(ch.length ? JSON.parse(Buffer.concat(ch)) : {}); } catch { no(new HttpError(400, 'Bad JSON')); } }); });
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webp': 'image/webp' };
const SEC = { 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'" };
const COLS = ['coaches', 'enquiries', 'interests', 'reviews', 'applications'];

async function api(req, res, url, parts) {
  const method = req.method, admin = isAdmin(req), [col, rawId, sub] = parts, id = rawId && decodeURIComponent(rawId).slice(0, 160), ip = ipOf(req);
  if (col === 'admin') {
    if (id === 'login' && method === 'POST') {
      limit('login:' + ip, 8, 15 * 60e3); const { password } = await readBody(req);
      if (!crypto.timingSafeEqual(sha(password || ''), sha(ADMIN_PASSWORD))) throw new HttpError(401, 'Wrong password'); return send(res, 200, { token: makeToken() });
    }
    if (!admin) throw new HttpError(401, 'Admin only');
    if (id === 'export' && method === 'GET') return send(res, 200, dump());
    if (id === 'approve' && method === 'POST') {            // publish a coach application atomically
      const a = getDoc('applications', sub); if (!a) throw new HttpError(404, 'No such application');
      const c = pick(a, ['name', 'title', 'rating', 'city', 'exp', 'students', 'langs', 'lv', 'feeMin', 'feeMax', 'spec', 'bio', 'ach', 'hasPhoto']); c.joined = Date.now();
      putDoc('coaches', sub, c); putDoc('applications', sub, { ...a, status: 'approved', read: true }); return send(res, 200, { ok: true });
    }
    throw new HttpError(404, 'Not found');
  }
  if (col === 'state' && method === 'GET') {
    limit('read:' + ip, 1200, 3600e3); const body = JSON.stringify(state(admin)), et = '"' + crypto.createHash('sha1').update(body).digest('base64url') + '"';
    if (req.headers['if-none-match'] === et) { res.writeHead(304, { ETag: et, 'Cache-Control': 'no-cache' }); return res.end(); }
    return send(res, 200, body, { ETag: et, 'Cache-Control': 'no-cache' });
  }
  if (col === 'photo' && method === 'GET') {
    const p = getDoc('photos', id), m = p && /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/.exec(p.d); if (!m) throw new HttpError(404, 'No photo');
    res.writeHead(200, { 'Content-Type': m[1], 'Cache-Control': 'public, max-age=3600', 'X-Content-Type-Options': 'nosniff' }); return res.end(Buffer.from(m[2], 'base64'));
  }
  if (col === 'my' && method === 'GET') {                   // visitors track their own submissions by id (kept in their browser)
    limit('my:' + ip, 300, 3600e3);
    return send(res, 200, (url.searchParams.get('ids') || '').split(',').filter(Boolean).slice(0, 20).map(i => {
      const e = getDoc('enquiries', i); if (e) return { id: i, type: 'enquiry', status: e.status, assignedName: e.assignedName || '', first: e.first };
      const a = getDoc('applications', i); return a ? { id: i, type: 'application', status: a.status, name: a.name } : null; }).filter(Boolean));
  }
  if (!COLS.includes(col)) throw new HttpError(404, 'Not found');

  if (admin && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {     // admin: full control
    if (method === 'DELETE') { Q.del.run(col, id); if (!getDoc('coaches', id) && !getDoc('applications', id)) Q.del.run('photos', id); return send(res, 200, { ok: true }); }
    const body = await readBody(req); if (col === 'coaches') delete body.uid;
    const nid = method === 'POST' ? newId() : id, next = method === 'PATCH' ? { ...(getDoc(col, nid) || {}), ...body } : body;
    putDoc(col, nid, next); return send(res, 200, { id: nid });
  }

  limit('write:' + ip, 30, 3600e3);                         // public submissions: validated + forced fields + rate limited
  if (method === 'POST' && ['enquiries', 'interests', 'applications'].includes(col)) {
    const d = clean(col, await readBody(req)), nid = newId(); d.ts = Date.now(); d.read = false;
    if (col === 'enquiries') { d.status = 'pending'; d.responded = false; }
    if (col === 'applications') { d.status = 'pending'; if (d.photoData) { putDoc('photos', nid, { d: d.photoData }); d.hasPhoto = true; } delete d.photoData; }
    if (col === 'interests') { const en = getDoc('enquiries', d.eid); if (!en || en.status !== 'open') throw new HttpError(400, 'This enquiry is no longer open'); }
    putDoc(col, nid, d); notify({ enquiries: 'New student enquiry – approve it', interests: 'A coach responded', applications: 'New coach application – approve it' }[col], JSON.stringify({ ...d, uid: undefined }, null, 1));
    return send(res, 200, { id: nid });
  }
  if (method === 'PUT' && col === 'reviews' && id) {
    const d = clean(col, await readBody(req)), old = getDoc(col, id);
    if (id !== d.cid + '_' + d.uid || d.stars < 1 || d.stars > 5) throw new HttpError(400, 'Bad review');
    d.stars = Math.round(d.stars); d.status = old && old.status === 'hidden' ? 'hidden' : 'pending'; d.ts = Date.now(); putDoc(col, id, d);
    notify('New review to approve', `${d.name}: ${d.stars}★ ${d.text}`); return send(res, 200, { id });
  }
  throw new HttpError(401, 'Admin only');
}

http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://x'), p = url.pathname;
    if (p === '/healthz') return send(res, 200, { ok: true });
    if (p.startsWith('/api/')) return await api(req, res, url, p.slice(5).split('/').filter(Boolean));
    let f = path.normalize(path.join(PUB, p === '/' ? 'index.html' : p));
    if (!(f === PUB || f.startsWith(PUB + path.sep)) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(PUB, 'index.html');
    const ext = path.extname(f), h = { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400', ...SEC };
    if (req.headers['x-forwarded-proto'] === 'https') h['Strict-Transport-Security'] = 'max-age=31536000';
    res.writeHead(200, h); fs.createReadStream(f).pipe(res);
  } catch (e) {
    if (!(e instanceof HttpError)) console.error(e);
    if (!res.headersSent) send(res, e.status || 500, { error: e.status ? e.message : 'Server error' });
  }
}).listen(PORT, () => console.log(`MyChess64 running on http://localhost:${PORT}`));
process.on('SIGTERM', () => { db.close(); process.exit(0); });
