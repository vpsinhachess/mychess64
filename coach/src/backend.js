// One interface, two engines:
//   • Firebase (Auth + Firestore)  – real, shared, secure   (when firebase-config.js is filled in)
//   • Demo (localStorage)          – works out of the box, single browser only
const cfg = window.MC64_FIREBASE || {};

export const B = {};   // filled by initBackend()
const LIVE = cfg && cfg.apiKey && !String(cfg.apiKey).startsWith('PASTE');

async function sha(s) { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('mc64:' + s)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join(''); }

async function firebase() {
  const base = 'https://www.gstatic.com/firebasejs/10.12.2/';
  const [A, Au, F] = await Promise.all([import(base + 'firebase-app.js'), import(base + 'firebase-auth.js'), import(base + 'firebase-firestore.js')]);
  const app = A.initializeApp(cfg), auth = Au.getAuth(app), fs = F.getFirestore(app);
  return {
    mode: 'firebase',
    sub(col, cb, q) {
      let ref = F.collection(fs, col); if (q) ref = F.query(ref, F.where(q[0], '==', q[1]));
      return F.onSnapshot(ref, s => cb(s.docs.map(d => ({ ...d.data(), id: d.id }))), e => { console.warn('[' + col + ']', e.code); B.onErr && B.onErr(col, e); });
    },
    set: (col, id, o) => F.setDoc(F.doc(fs, col, id), o),
    remove: (col, id) => F.deleteDoc(F.doc(fs, col, id)),
    async submit(id, o, seatCls) {            // demo request (+ public seat counter)
      const b = F.writeBatch(fs); b.set(F.doc(fs, 'requests', id), o);
      if (seatCls) b.set(F.doc(fs, 'seatlog', id), { cls: seatCls, ts: o.ts });
      await b.commit();
    },
    login: (e, p) => Au.signInWithEmailAndPassword(auth, e, p).then(r => r.user.uid),
    logout: () => Au.signOut(auth),
    reset: e => Au.sendPasswordResetEmail(auth, e),
    onAuth: cb => Au.onAuthStateChanged(auth, async u => {
      if (!u) return cb(null);
      let role = null, err = '';
      try {
        if ((await F.getDoc(F.doc(fs, 'admins', u.uid))).exists()) role = 'admin';
        else if ((await F.getDoc(F.doc(fs, 'coaches', u.uid))).exists()) role = 'coach';
      } catch (e) { console.warn(e); err = e.code || e.message; }
      cb({ uid: u.uid, email: u.email, role, err });
    }),
    // creates a login for a coach WITHOUT signing the admin out (uses a throw-away second app)
    async createUser(email, pw) {
      const sec = A.initializeApp(cfg, 'sec' + Date.now()), sa = Au.getAuth(sec);
      try { const r = await Au.createUserWithEmailAndPassword(sa, email, pw); await Au.signOut(sa); return r.user.uid; }
      finally { await A.deleteApp(sec); }
    }
  };
}

function demo() {
  const K = 'mc64_demo_v3', subs = [], listeners = [];
  let st; try { st = JSON.parse(localStorage.getItem(K)); } catch (e) {}
  st = st || { data: {}, acc: [] };
  const save = () => { try { localStorage.setItem(K, JSON.stringify(st)); } catch (e) { /* storage blocked/full: keep working in memory */ } };
  const arr = c => st.data[c] = st.data[c] || [];
  const fire = c => subs.filter(s => s.c === c).forEach(s => s.run());
  let session = null; try { session = sessionStorage.getItem('mc64_s'); } catch (e) {}
  const emit = () => { const a = st.acc.find(x => x.uid === session); listeners.forEach(f => f(a ? { uid: a.uid, email: a.email, role: a.role } : null)); };
  const impl = {
    mode: 'demo',
    sub(c, cb, q) { const s = { c, run: () => cb(arr(c).filter(x => !q || x[q[0]] === q[1]).map(x => ({ ...x }))) }; subs.push(s); setTimeout(s.run); return () => subs.splice(subs.indexOf(s), 1); },
    async set(c, id, o) { const a = arr(c), i = a.findIndex(x => x.id === id), v = { ...o, id }; i < 0 ? a.push(v) : a[i] = v; save(); fire(c); },
    async remove(c, id) { st.data[c] = arr(c).filter(x => x.id !== id); save(); fire(c); },
    async submit(id, o, cls) { await impl.set('requests', id, o); if (cls) await impl.set('seatlog', id, { cls, ts: o.ts }); },
    async login(e, p) {
      const a = st.acc.find(x => x.email === e.toLowerCase());
      if (!a || a.hash !== await sha(a.uid + p)) throw new Error('bad');
      session = a.uid; try { sessionStorage.setItem('mc64_s', session); } catch (x) {} emit(); return a.uid;
    },
    async logout() { session = null; try { sessionStorage.removeItem('mc64_s'); } catch (x) {} emit(); },
    async reset() { alert('Demo mode: password-reset emails need Firebase. Ask the admin to create a new account.'); },
    onAuth(cb) { listeners.push(cb); setTimeout(emit); },
    async createUser(email, pw, forcedUid) {
      email = email.toLowerCase(); if (st.acc.some(x => x.email === email)) throw { code: 'auth/email-already-in-use' };
      const u = forcedUid || 'u' + Date.now().toString(36); st.acc.push({ uid: u, email, hash: await sha(u + pw), role: forcedUid === 'admin1' ? 'admin' : 'coach' }); save(); return u;
    }
  };
  if (!st.acc.some(a => a.role === 'admin')) impl.createUser('admin@mychess64.com', 'admin123', 'admin1');
  return impl;
}

export async function initBackend() {
  let impl;
  if (LIVE) { try { impl = await firebase(); } catch (e) { console.error('Firebase failed, using demo mode', e); } }
  Object.assign(B, impl || demo());
  return B;
}
