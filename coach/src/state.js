// Shared state + helpers used by every module
export const $ = i => document.getElementById(i);
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => '&#' + c.charCodeAt(0) + ';');
// storage can throw (private mode, blocked cookies, file://) – never let it break the page
export const ls = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
export const ini = n => String(n || '?').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
export const today = () => { const d = new Date(); return new Date(d - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10); };
export const fd = d => new Date(d + 'T00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
export const tf = t => new Date('1970-01-01T' + t).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' });
export const strip = o => { const { id, ...r } = o; return r; };
export function toast(m, bad) { const t = $('ts'); t.textContent = m; t.className = 'toast on' + (bad ? ' bad' : ''); clearTimeout(toast.t); toast.t = setTimeout(() => t.className = 'toast', 4000); }

export const COL = [['#0b6bde', '#19c3ff'], ['#c2410c', '#f59e0b'], ['#6d28d9', '#a78bfa'], ['#0f766e', '#2dd4bf'], ['#be185d', '#f472b6'], ['#1e3a8a', '#6366f1']];
export const CATS = ['Kids', 'Adults', 'Tournament', 'Openings'];
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const TIMES = ['6 AM', '4 PM', '5 PM', '7 PM'];
export const lvl = { Kids: 'Beginner', Adults: 'Intermediate', Tournament: 'Advanced', Openings: 'Advanced' };

export function diag(m) { const b = $('fatal'); if (!b) return; b.textContent = '⚠ ' + m; b.style.display = 'block'; }

export const D = { coaches: [], reviews: [], classes: [], seatlog: [], requests: [], apps: [], coachPrivate: [] };
export const ST = { user: null, cat: 'All', txt: '', sel: {}, pend: {}, saved: new Set() };
export const hooks = { render() {} };

export const stat = x => { const rs = D.reviews.filter(r => r.cid === x.id); return { n: rs.length, r: rs.length ? rs.reduce((a, b) => a + (+b.stars || 5), 0) / rs.length : 0 }; };
export const seats = c => (+c.cap || 1) - D.seatlog.filter(s => s.cls === c.id).length;
export const upcoming = id => D.classes.filter(c => c.cid === id && c.date >= today()).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
