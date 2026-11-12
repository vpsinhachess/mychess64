// Demo-mode sample data (Supabase mode starts empty – add real coaches in the Admin dashboard)
import { B } from './backend.js';
import { COL, addDays, today, ls } from './state.js';

export async function sample() {
  const S0 = [['Aarav Sharma', 'FIDE Master · 2310', 'Delhi', 'Online', ['Kids', 'Tournament'], 900, 12, 120, 'English, Hindi', 'Trained 120+ juniors; state-level medallists. Patient, structured lessons.', 0, 'aarav@mychess64.com'],
    ['Priya Nair', 'WIM · 2180', 'Bengaluru', 'Online', ['Kids', 'Adults'], 700, 9, 95, 'English, Malayalam', 'Makes chess fun for beginners aged 5–12 with games and puzzles.', 1, 'priya@mychess64.com'],
    ['Rohit Verma', 'IM · 2410', 'Mumbai', 'Online', ['Tournament', 'Openings'], 1500, 15, 60, 'English, Hindi', 'Opening repertoires and deep game analysis for rated players.', 2, 'rohit@mychess64.com'],
    ['Sneha Iyer', 'FIDE 1950', 'Chennai', 'Home', ['Kids', 'Adults'], 600, 7, 54, 'English, Tamil', 'Friendly home tuition for school kids and returning adult players.', 3, 'sneha@mychess64.com'],
    ['Vikram Singh', 'CM · 2050', 'Patna', 'Online', ['Adults', 'Openings'], 500, 8, 44, 'Hindi, English', 'Helps adult improvers break 1500 with simple, practical plans.', 4, 'vikram@mychess64.com'],
    ['Ananya Das', 'WFM · 2090', 'Kolkata', 'Online', ['Kids', 'Tournament'], 800, 10, 78, 'English, Bengali', 'Endgame specialist and former national under-14 girls champion.', 5, 'ananya@mychess64.com']];
  const R = [['Meera K.', 'Very patient and structured. Our son improved quickly.'], ['Rahul S.', 'Clear explanations and great game analysis after every class.'], ['Anita V.', 'Flexible timings and lessons the kids genuinely enjoy.']];
  const ids = [];
  for (let i = 0; i < 6; i++) {
    const a = S0[i], id = 'coach-s' + (i + 1); ids.push(id);
    await B.ins('coaches', { id, name: a[0], title: a[1], city: a[2], mode: a[3], cats: a[4], price: a[5], exp: a[6], students_count: a[7], langs: a[8], bio: a[9], c1: COL[a[10]][0], c2: COL[a[10]][1], photo_url: '', status: 'active' });
    await B.createUser(a[11], 'chess1234', id); await B.ins('coach_private', { id, email: a[11] });
    for (let k = 0; k < 2; k++) await B.ins('reviews', { coach_id: id, name: R[(i + k) % 3][0], text: R[(i + k) % 3][1], stars: 5 });
  }
  const c = ids[0], cl = [['Kids Tactics Group', 2, '17:00', 60, 6, 'Beginner'], ['Tournament Prep', 4, '19:00', 90, 4, 'Advanced']];
  const cid = [];
  for (const x of cl) { const r = await B.ins('classes', { coach_id: c, title: x[0], class_date: addDays(today(), x[1]), class_time: x[2], dur: x[3], mode: 'Online', cap: x[4], level: x[5], link: '' }); cid.push(r.id); }
  [[1, '17:00', '19:00'], [3, '17:00', '19:00'], [6, '09:00', '12:00']].forEach(a => B.ins('availability', { coach_id: c, weekday: a[0], start_time: a[1], end_time: a[2] }));
  // demo-only sample workspace for the first coach so the dashboard is not empty
  const names = [['Riya Sharma', '9876500001', 'Beginner', 9], ['Arjun Mehta', '9876500002', 'Intermediate', 13], ['Neha Gupta', '9876500003', 'Advanced', 29]], sid = [];
  for (const n of names) { const r = await B.ins('students', { coach_id: c, name: n[0], phone: n[1], level: n[2], age: n[3], notes: '', started_on: addDays(today(), -60) }); sid.push(r.id); }
  for (let d = 1; d <= 6; d++) for (let k = 0; k < 3; k++) await B.ins('attendance', { coach_id: c, student_id: sid[k], session_date: addDays(today(), -d * 3), status: (d + k) % 5 === 0 ? 'absent' : 'present', note: '' });
  for (let m = 0; m < 4; m++) for (let k = 0; k < 3; k++) await B.ins('payments', { coach_id: c, student_id: sid[k], amount: 900 + k * 300, paid_on: addDays(today(), -m * 28 - k), method: 'UPI', status: m === 0 && k === 2 ? 'pending' : 'paid', note: '' });
  await B.ins('reports', { coach_id: c, student_id: sid[0], report_date: addDays(today(), -5), level: 'Beginner · ~900', topics: 'Knight forks, back-rank mates', strengths: 'Quick to spot tactics', improve: 'Slow down and check opponent threats', homework: '10 puzzles daily' });
  [['Riya Sharma', '9876500004', 'Chess for Kids', 'Kids Tactics Group', 'new', 3e5, cid[0]], ['Arjun Mehta', '9876500002', 'Tournament Prep', 'Sat 5 PM', 'contacted', 9e6, null], ['Neha Gupta', '9876500003', 'Chess for Adults', '', 'confirmed', 9e7, null]].forEach(r => B.ins('requests', { created_at: new Date(Date.now() - r[5]).toISOString(), name: r[0], phone: r[1], cat: r[2], coach_id: c, class_id: r[6], slot: r[3], status: r[4], note: null }));
}

export async function seedDemo() {
  if (B.mode !== 'demo' || ls.get('mc64_sb_seeded')) return;
  if ((await B.q('coaches')).length) return;
  ls.set('mc64_sb_seeded', '1'); await sample();
}
