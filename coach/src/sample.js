// Sample coaches / reviews / classes (+ demo-mode bookings)
import { B } from './backend.js';
import { COL } from './state.js';

export async function sample() {
  const d = n => { const t = new Date(); t.setDate(t.getDate() + n); return t.toISOString().slice(0, 10); };
  const S0 = [['Aarav Sharma', 'FIDE Master · 2310', 'Delhi', 'Online', ['Kids', 'Tournament'], 900, 12, 120, 'English, Hindi', 'Trained 120+ juniors; state-level medallists. Patient, structured lessons.', 0, 'aarav@mychess64.com'],
    ['Priya Nair', 'WIM · 2180', 'Bengaluru', 'Online', ['Kids', 'Adults'], 700, 9, 95, 'English, Malayalam', 'Makes chess fun for beginners aged 5–12 with games and puzzles.', 1, 'priya@mychess64.com'],
    ['Rohit Verma', 'IM · 2410', 'Mumbai', 'Online', ['Tournament', 'Openings'], 1500, 15, 60, 'English, Hindi', 'Opening repertoires and deep game analysis for rated players.', 2, 'rohit@mychess64.com'],
    ['Sneha Iyer', 'FIDE 1950', 'Chennai', 'Home', ['Kids', 'Adults'], 600, 7, 54, 'English, Tamil', 'Friendly home tuition for school kids and returning adult players.', 3, 'sneha@mychess64.com'],
    ['Vikram Singh', 'CM · 2050', 'Patna', 'Online', ['Adults', 'Openings'], 500, 8, 44, 'Hindi, English', 'Helps adult improvers break 1500 with simple, practical plans.', 4, 'vikram@mychess64.com'],
    ['Ananya Das', 'WFM · 2090', 'Kolkata', 'Online', ['Kids', 'Tournament'], 800, 10, 78, 'English, Bengali', 'Endgame specialist and former national under-14 girls champion.', 5, 'ananya@mychess64.com']];
  const R = [['Meera K.', 'Very patient and structured. Our son improved quickly.'], ['Rahul S.', 'Clear explanations and great game analysis after every class.'], ['Anita V.', 'Flexible timings and lessons the kids genuinely enjoy.']];
  for (let i = 0; i < 6; i++) {
    const a = S0[i], id = 's' + (i + 1);
    await B.set('coaches', id, { name: a[0], title: a[1], city: a[2], mode: a[3], cats: a[4], price: a[5], exp: a[6], students: a[7], langs: a[8], bio: a[9], c1: COL[a[10]][0], c2: COL[a[10]][1], photo: '', status: 'active' });
    if (B.mode === 'demo') { try { await B.createUser(a[11], 'chess1234', id); await B.set('coachPrivate', id, { email: a[11] }); } catch (e) {} }
    for (let k = 0; k < 2; k++) await B.set('reviews', 'r' + i + k, { cid: id, name: R[(i + k) % 3][0], text: R[(i + k) % 3][1], stars: 5, ts: Date.now() - i * 1e5 - k });
  }
  await B.set('classes', 'c1', { cid: 's1', title: 'Kids Tactics Group', date: d(2), time: '17:00', dur: 60, mode: 'Online', cap: 6, level: 'Beginner', link: '' });
  if (B.mode === 'demo') {  // demo only: a few sample bookings so coach tools are not empty
    const T = Date.now(); [['Riya Sharma', '9876500001', 'Chess for Kids', 'Kids Tactics Group', 'new', 3e5], ['Arjun Mehta', '9876500002', 'Tournament Prep', 'Sat 5 PM', 'contacted', 9e6], ['Neha Gupta', '9876500003', 'Chess for Adults', '', 'confirmed', 9e7]].forEach(r => B.set('requests', 'dq' + r[1], { ts: T - r[5], name: r[0], phone: r[1], cat: r[2], cid: 's1', cls: '', slot: r[3], status: r[4] }));
  }
  await B.set('classes', 'c2', { cid: 's1', title: 'Tournament Prep', date: d(4), time: '19:00', dur: 90, mode: 'Online', cap: 4, level: 'Advanced', link: '' });
}
