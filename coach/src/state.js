// Shared state, helpers and the data layer used by every page
import { B } from './backend.js';

export const $ = i => document.getElementById(i);
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => '&#' + c.charCodeAt(0) + ';');
export const ini = n => String(n || '?').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
export const pad = n => String(n).padStart(2, '0');
export const ymd = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
export const today = () => ymd(new Date());
export const addDays = (s, n) => { const d = new Date(s + 'T00:00'); d.setDate(d.getDate() + n); return ymd(d); };
export const fd = d => new Date(d + 'T00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
export const tf = t => new Date('1970-01-01T' + String(t).slice(0, 5)).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' });
export const t5 = t => String(t || '').slice(0, 5);
export const money = n => '₹' + Math.round(+n || 0).toLocaleString('en-IN');
export const digits = p => { p = String(p || '').replace(/\D/g, ''); return p.length === 10 ? '91' + p : p; };
export const url = u => /^https?:\/\//i.test(u || '') ? u : '';
export const ago = ts => { const m = Math.round((Date.now() - new Date(ts)) / 6e4); return m < 1 ? 'just now' : m < 60 ? m + ' min ago' : m < 1440 ? Math.round(m / 60) + ' h ago' : Math.round(m / 1440) + ' d ago'; };
export function toast(m, bad) { const t = $('ts'); if (!t) return; t.textContent = m; t.className = 'toast on' + (bad ? ' bad' : ''); clearTimeout(toast.t); toast.t = setTimeout(() => t.className = 'toast', 4200); }
export function diag(m) { const b = $('fatal'); if (!b) return; b.textContent = '⚠ ' + m; b.style.display = 'block'; }
export const errText = e => (e && (e.message || e.error_description || e.code)) || 'Something went wrong';
// storage can throw (private mode, blocked cookies) – never let it break the page
export const ls = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };

export const COL = [['#0b6bde', '#19c3ff'], ['#c2410c', '#f59e0b'], ['#6d28d9', '#a78bfa'], ['#0f766e', '#2dd4bf'], ['#be185d', '#f472b6'], ['#1e3a8a', '#6366f1']];
export const CATS = ['Kids', 'Adults', 'Tournament', 'Openings'];
export const lvl = { Kids: 'Beginner', Adults: 'Intermediate', Tournament: 'Advanced', Openings: 'Advanced' };
export const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const D = { coaches: [], reviews: [], classes: [], class_booked: [], availability: [], requests: [], apps: [], coach_private: [], students: [], attendance: [], payments: [], reports: [], coach_docs: [] };
export const hooks = { render() {} };
const ORDER = { requests: ['created_at', false], apps: ['created_at', false], reviews: ['created_at', false] };

export async function refresh(t) { try { D[t] = await B.q(t, ORDER[t] ? { order: ORDER[t] } : {}); } catch (e) { console.warn('[' + t + ']', e); D[t] = D[t] || []; diag('Database problem reading “' + t + '” (' + errText(e) + '). Did you run supabase/schema.sql? (README step 2)'); } hooks.render(t); }
let unlisten = null, timers = {};
export async function load(tables) {
  await Promise.all(tables.map(refresh));
  if (unlisten) unlisten();
  unlisten = B.listen(tables, t => { clearTimeout(timers[t]); timers[t] = setTimeout(() => { refresh(t); if (t === 'requests' && tables.includes('class_booked')) refresh('class_booked'); }, 250); });
}
export const PUBLIC_TABLES = ['coaches', 'reviews', 'classes', 'class_booked', 'availability'];
export const COACH_TABLES = [...PUBLIC_TABLES, 'requests', 'students', 'attendance', 'payments', 'reports', 'coach_docs'];
export const ADMIN_TABLES = [...PUBLIC_TABLES, 'requests', 'apps', 'coach_private', 'students', 'attendance', 'payments', 'reports'];
export async function save(t, row, id) { if (id) await B.upd(t, id, row); else await B.ins(t, row); await refresh(t); }
export async function remove(t, id) { await B.del(t, id); await refresh(t); }
export const stat = c => { const rs = D.reviews.filter(r => r.coach_id === c.id); return { n: rs.length, r: rs.length ? rs.reduce((a, b) => a + (+b.stars || 5), 0) / rs.length : 0 }; };
export const booked = c => { const x = D.class_booked.find(b => b.class_id === c.id); return x ? +x.n : 0; };
export const seats = c => (+c.cap || 1) - booked(c);
export const upcoming = id => D.classes.filter(c => c.coach_id === id && c.class_date >= today()).sort((a, b) => (a.class_date + a.class_time).localeCompare(b.class_date + b.class_time));
export const sName = id => (D.students.find(s => s.id === id) || {}).name || '—';

/* ---- photo helper: crop square, resize, upload to Storage, return URL ---- */
export function pickPhoto(file, ownerId) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onerror = rej;
    r.onload = () => { const im = new Image(); im.onerror = () => rej(new Error('That file is not an image')); im.onload = () => {
      const s = 640, c = document.createElement('canvas'); c.width = c.height = s; const m = Math.min(im.width, im.height);
      c.getContext('2d').drawImage(im, (im.width - m) / 2, (im.height - m) / 4, m, m, 0, 0, s, s);
      c.toBlob(async b => { try { res(await B.upload('coach-photos', ownerId + '/avatar.jpg', b)); } catch (e) { rej(e); } }, 'image/jpeg', .85);
    }; im.src = r.result; };
    r.readAsDataURL(file);
  });
}
