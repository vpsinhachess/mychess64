// Pure business calculations for the coach dashboard (no DOM) – easy to audit and test.
// Conventions
//  • A student is billed their monthly fee for every calendar month from the month they started up to the current month (inclusive).
//  • Money received = payments with status "paid". Payments marked "pending" are recorded but NOT counted as received.
//  • Attendance rate = (present + late) ÷ all marked sessions.
const ym = d => String(d).slice(0, 7);
const iso = (d = new Date()) => { const z = n => String(n).padStart(2, '0'); return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate()); };
export const monthKey = ym;
export const shiftMonth = (key, n) => { const [y, m] = key.split('-').map(Number), d = new Date(y, m - 1 + n, 1); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); };
export const monthLabel = key => new Date(key + '-01T00:00').toLocaleDateString('en-IN', { month: 'short' });
export const monthsSince = (start, today) => { const a = ym(start || today).split('-').map(Number), b = ym(today).split('-').map(Number); return Math.max(1, (b[0] - a[0]) * 12 + (b[1] - a[1]) + 1); };
const sum = (a, f = x => x) => a.reduce((t, x) => t + (+f(x) || 0), 0);
const pct = (a, b) => b > 0 ? Math.round(a / b * 100) : null;
export const trend = (cur, prev) => prev > 0 ? Math.round((cur - prev) / prev * 100) : null;

export const received = (pays, f = () => true) => sum(pays.filter(p => p.status === 'paid' && f(p)), p => p.amount);
export const collected = (pays, key) => received(pays, p => ym(p.paid_on) === key);
export const pendingTotal = pays => sum(pays.filter(p => p.status !== 'paid'), p => p.amount);

/** Fee ledger for one student. balance > 0 = fees due, < 0 = paid in advance. Paused students accrue nothing. */
export function ledger(s, pays, today) {
  const mine = pays.filter(p => p.student_id === s.id), fee = +s.monthly_fee || 0, paused = s.active === false;
  const months = paused ? 0 : monthsSince(s.started_on, today), billed = fee * months, paid = received(mine);
  return { fee, months, billed, paid, pending: pendingTotal(mine), balance: paused ? 0 : billed - paid, paused };
}
export const expectedMonthly = students => sum(students.filter(s => s.active !== false), s => s.monthly_fee);
export const totalDue = (students, pays, today) => sum(students, s => Math.max(0, ledger(s, pays, today).balance));

export function attStats(sid, att) {
  const a = att.filter(x => x.student_id === sid).sort((x, y) => y.session_date.localeCompare(x.session_date));
  const n = a.length, p = a.filter(x => x.status === 'present').length, l = a.filter(x => x.status === 'late').length;
  let streak = 0, missed = 0; for (const x of a) { if (x.status === 'absent') break; streak++; } for (const x of a) { if (x.status !== 'absent') break; missed++; }
  return { n, p, l, ab: n - p - l, rate: pct(p + l, n), streak, missed, last: (a.find(x => x.status !== 'absent') || {}).session_date || '' };
}
export const overallAttendance = att => pct(att.filter(x => x.status !== 'absent').length, att.length);

export const classEnd = c => new Date(c.class_date + 'T' + String(c.class_time).slice(0, 5)).getTime() + (+c.dur || 60) * 6e4;
export const isPast = c => classEnd(c) < Date.now();
export const hoursTaught = (classes, sinceISO) => sum(classes.filter(c => isPast(c) && (!sinceISO || c.class_date >= sinceISO)), c => c.dur) / 60;
export const revenuePerHour = (pays, classes, today, days = 30) => { const since = iso(new Date(new Date(today + 'T00:00').getTime() - days * 864e5)), h = hoursTaught(classes, since); return h > 0 ? Math.round(received(pays, p => p.paid_on >= since) / h) : null; };
export const retention = (students, att, today, days = 30) => { const act = students.filter(s => s.active !== false); const since = iso(new Date(new Date(today + 'T00:00').getTime() - days * 864e5)); return pct(act.filter(s => att.some(a => a.student_id === s.id && a.session_date >= since && a.status !== 'absent')).length, act.length); };
export const funnel = reqs => { const c = k => reqs.filter(r => r.status === k).length; const total = reqs.length; return { total, new: c('new'), contacted: c('contacted'), confirmed: c('confirmed'), done: c('done'), cancelled: c('cancelled'), conversion: pct(c('confirmed') + c('done'), total) }; };
export const avgPerSession = att => { const days = new Set(att.map(a => a.session_date)); return days.size ? Math.round(att.filter(a => a.status !== 'absent').length / days.size * 10) / 10 : null; };
export const growth = (students, today, n = 6) => [...Array(n)].map((_, i) => { const k = shiftMonth(ym(today), -(n - 1 - i)); return { l: monthLabel(k), v: students.filter(s => ym(s.started_on) === k).length }; });
export const monthlySeries = (pays, today, n = 6) => [...Array(n)].map((_, i) => { const k = shiftMonth(ym(today), -(n - 1 - i)); return { l: monthLabel(k), v: collected(pays, k) }; });

/** Students that need the coach's attention today */
export function attention(students, att, pays, reqs, today) {
  const out = [], now = Date.now();
  reqs.filter(r => r.status === 'new' && now - new Date(r.created_at) > 864e5).forEach(r => out.push({ k: 'req', t: 'Reply to ' + r.name, d: 'Booking waiting for ' + Math.round((now - new Date(r.created_at)) / 36e5) + ' h', go: 'bk', pri: 1 }));
  students.filter(s => s.active !== false).forEach(s => {
    const l = ledger(s, pays, today), a = attStats(s.id, att);
    if (l.balance > 0 && l.fee > 0) out.push({ k: 'due', t: s.name + ' – fees due', d: '₹' + Math.round(l.balance).toLocaleString('en-IN') + ' outstanding', go: 'earn', sid: s.id, pri: 2 });
    if (a.missed >= 2) out.push({ k: 'abs', t: s.name + ' missed ' + a.missed + ' sessions in a row', d: 'Check in with the student/parent', go: 'att', sid: s.id, pri: 3 });
    else if (a.n >= 4 && a.rate !== null && a.rate < 60) out.push({ k: 'low', t: s.name + ' – low attendance (' + a.rate + '%)', d: 'Below 60% over ' + a.n + ' sessions', go: 'att', sid: s.id, pri: 4 });
  });
  return out.sort((x, y) => x.pri - y.pri);
}
