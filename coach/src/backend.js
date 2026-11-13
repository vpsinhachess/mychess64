// One interface, two engines:
//   • Supabase (Auth + Postgres + Storage)  – real, shared, secure (when js/config.js has your keys)
//   • Demo (localStorage)                   – works out of the box, single browser only
import { createClient } from '@supabase/supabase-js';

export const B = {};
const cfg = window.MC64_SUPABASE || {};
const LIVE = !!(cfg.url && cfg.anonKey && !/^PASTE/.test(cfg.url) && !/^PASTE/.test(cfg.anonKey));
const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); }));
async function sha(s) { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('mc64:' + s)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join(''); }
const asDataUrl = blob => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(blob); });

function supabase() {
  const sb = createClient(cfg.url, cfg.anonKey);
  const ok = async p => { const { data, error } = await p; if (error) throw error; return data; };
  return {
    mode: 'supabase',
    async q(t, o = {}) {
      let r = sb.from(t).select(o.sel || '*'); for (const k in (o.eq || {})) r = r.eq(k, o.eq[k]);
      if (o.order) r = r.order(o.order[0], { ascending: !!o.order[1] }); return (await ok(r)) || [];
    },
    async ins(t, row) { row = { id: uuid(), ...row }; if (t === 'class_booked') return row; await ok(sb.from(t).insert(row)); return row; },
    async upd(t, id, patch) { await ok(sb.from(t).update(patch).eq('id', id)); },
    async del(t, id) { await ok(sb.from(t).delete().eq('id', id)); },
    async upsert(t, row, conflict) { await ok(sb.from(t).upsert(row, { onConflict: conflict })); },
    async upload(bucket, path, blob) {
      await ok(sb.storage.from(bucket).upload(path, blob, { upsert: true, contentType: blob.type || 'application/octet-stream' }));
      return bucket === 'coach-photos' ? sb.storage.from(bucket).getPublicUrl(path).data.publicUrl + '?v=' + Date.now() : path;
    },
    async fileUrl(bucket, path) { return (await ok(sb.storage.from(bucket).createSignedUrl(path, 3600))).signedUrl; },
    async rmFile(bucket, path) { await ok(sb.storage.from(bucket).remove([path])); },
    login: (email, password) => ok(sb.auth.signInWithPassword({ email, password })),
    logout: () => sb.auth.signOut(),
    reset: email => ok(sb.auth.resetPasswordForEmail(email, { redirectTo: location.href.split('#')[0] })),
    setPassword: password => ok(sb.auth.updateUser({ password })),
    async signUp(email, password, name) {
      const { data, error } = await sb.auth.signUp({ email, password, options: { data: { full_name: name }, emailRedirectTo: location.href.split('#')[0] } }); if (error) throw error;
      if (data.user && data.user.identities && !data.user.identities.length) throw { message: 'That email already has an account — please sign in.' };
      return { confirm: !data.session };
    },
    google: () => ok(sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: location.href.split('#')[0] } })),
    onAuth(cb) {
      sb.auth.onAuthStateChange((ev, session) => {
        if (ev === 'PASSWORD_RECOVERY') B.recovery = true;
        setTimeout(async () => {      // never await supabase calls inside the callback itself
          if (!session) return cb(null);
          const u = session.user; let role = null, err = '';
          try {
            const a = await sb.from('admins').select('user_id').eq('user_id', u.id); if (a.error) throw a.error;
            if (a.data.length) role = 'admin'; else { const c = await sb.from('coaches').select('id').eq('id', u.id); if (c.error) throw c.error; if (c.data.length) role = 'coach'; }
          } catch (e) { err = e.code || e.message; }
          const m = u.user_metadata || {};
          cb({ uid: u.id, email: u.email, role, err, recovery: !!B.recovery, meta: { name: m.full_name || m.name || '', avatar: m.avatar_url || m.picture || '' } });
        }, 0);
      });
    },
    // creates a login WITHOUT signing the current admin out (throw-away client, no stored session)
    async createUser(email, password) {
      const c = createClient(cfg.url, cfg.anonKey, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
      const { data, error } = await c.auth.signUp({ email, password }); if (error) throw error;
      if (!data.user || (data.user.identities && !data.user.identities.length)) throw { message: 'That email already has an account.' };
      return data.user.id;
    },
    listen(tables, cb) {
      const ch = sb.channel('mc64-' + uuid()).on('postgres_changes', { event: '*', schema: 'public' }, p => { if (tables.includes(p.table)) cb(p.table); }).subscribe();
      return () => sb.removeChannel(ch);
    }
  };
}

function demo() {
  const K = 'mc64_sb_demo_v1', ls = []; let st; try { st = JSON.parse(localStorage.getItem(K)); } catch (e) {}
  st = st || { t: {}, acc: [], f: {} };
  const save = () => { try { localStorage.setItem(K, JSON.stringify(st)); } catch (e) { /* storage blocked/full: stay in memory */ } };
  const tb = n => st.t[n] = st.t[n] || [], note = t => ls.forEach(f => f(t));
  let session = null; try { session = sessionStorage.getItem('mc64_s'); } catch (e) {}
  const emit = () => { const a = st.acc.find(x => x.uid === session); cbs.forEach(f => f(a ? { uid: a.uid, email: a.email, role: a.role === 'admin' ? 'admin' : (tb('coaches').some(c => c.id === a.uid) ? 'coach' : null), meta: { name: a.name || '', avatar: '' } } : null)); }, cbs = [];
  const impl = {
    mode: 'demo',
    async q(t, o = {}) {
      let r = t === 'class_booked' ? Object.values(tb('requests').filter(x => x.class_id).reduce((m, x) => { (m[x.class_id] = m[x.class_id] || { class_id: x.class_id, n: 0 }).n++; return m; }, {})) : tb(t).slice();
      for (const k in (o.eq || {})) r = r.filter(x => x[k] === o.eq[k]);
      if (o.order) r.sort((a, b) => (a[o.order[0]] > b[o.order[0]] ? 1 : -1) * (o.order[1] ? 1 : -1));
      return JSON.parse(JSON.stringify(r));
    },
    async ins(t, row) { row = { id: uuid(), created_at: new Date().toISOString(), ...row }; tb(t).push(row); save(); note(t); return row; },
    async upd(t, id, patch) { const r = tb(t).find(x => x.id === id); if (r) Object.assign(r, patch); save(); note(t); },
    async del(t, id) { st.t[t] = tb(t).filter(x => x.id !== id); if (t === 'students') ['attendance', 'reports'].forEach(x => st.t[x] = tb(x).filter(y => y.student_id !== id)); save(); note(t); },
    async upsert(t, row, conflict) { const ks = conflict.split(','); const r = tb(t).find(x => ks.every(k => x[k] === row[k])); r ? Object.assign(r, row) : tb(t).push({ id: uuid(), ...row }); save(); note(t); },
    async upload(bucket, path, blob) { const d = await asDataUrl(blob); st.f[path] = d; save(); return bucket === 'coach-photos' ? d : path; },
    async fileUrl(bucket, path) { return st.f[path] || ''; },
    async rmFile(bucket, path) { delete st.f[path]; save(); },
    async login(email, pw) { const a = st.acc.find(x => x.email === email.toLowerCase()); if (!a || a.hash !== await sha(a.uid + pw)) throw new Error('bad'); session = a.uid; try { sessionStorage.setItem('mc64_s', session); } catch (e) {} emit(); },
    async logout() { session = null; try { sessionStorage.removeItem('mc64_s'); } catch (e) {} emit(); },
    async reset() { alert('Demo mode: password-reset emails need Supabase.'); },
    async signUp(email, pw, name) { const id = await impl.createUser(email, pw); const a = st.acc.find(x => x.uid === id); a.name = name; save(); session = id; try { sessionStorage.setItem('mc64_s', id); } catch (e) {} emit(); return { confirm: false }; },
    async google() { throw new Error('Google sign-in works once Supabase is connected (README step: Google login).'); },
    async setPassword(pw) { const a = st.acc.find(x => x.uid === session); if (a) { a.hash = await sha(a.uid + pw); save(); } },
    onAuth(cb) { cbs.push(cb); setTimeout(emit); },
    async createUser(email, pw, forced) { email = email.toLowerCase(); if (st.acc.some(x => x.email === email)) throw { message: 'That email already has an account.' }; const u = forced || uuid(); st.acc.push({ uid: u, email, hash: await sha(u + pw), role: forced === 'admin-demo' ? 'admin' : 'coach' }); save(); return u; },
    listen(tables, cb) { const f = t => tables.includes(t) && cb(t); ls.push(f); return () => ls.splice(ls.indexOf(f), 1); }
  };
  if (!st.acc.some(a => a.role === 'admin')) impl.createUser('admin@mychess64.com', 'admin123', 'admin-demo');
  return impl;
}

export async function initBackend() { Object.assign(B, LIVE ? supabase() : demo()); return B; }
