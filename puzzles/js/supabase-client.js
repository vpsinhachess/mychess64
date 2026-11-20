/* MyChess64 · Supabase client: player accounts (sign up, sign in, password reset).
 * Load order: supabase/config.js -> supabase-js (UMD) -> this file -> js/mc64-sync.js
 * Exposes window.MC64_SB. The signed-in player is cached in localStorage ("mc64_me")
 * so the puzzle pages can read it synchronously. */
(function (root) {
  'use strict';
  var cfg = root.MC64_CONFIG || {};
  var ME_KEY = 'mc64_me';
  var ready = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY &&
    cfg.SUPABASE_URL.indexOf('YOUR-') < 0 && cfg.SUPABASE_ANON_KEY.indexOf('YOUR-') < 0 &&
    root.supabase && root.supabase.createClient);
  var client = ready
    ? root.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY,
        { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })
    : null;

  function pageUrl(file) { return new URL(file, root.location.href).href; }

  function store(session) {
    try {
      if (session && session.user) {
        var u = session.user, m = u.user_metadata || {};
        root.localStorage.setItem(ME_KEY, JSON.stringify({
          id: u.id,
          name: m.username || String(u.email || 'player').split('@')[0]
        }));
      } else {
        root.localStorage.removeItem(ME_KEY);
      }
    } catch (e) { /* storage blocked: stay signed out */ }
  }
  function me() {
    try { var v = root.localStorage.getItem(ME_KEY); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }
  function uid() { var m = me(); return m && m.id ? String(m.id) : null; }

  var API = {
    ready: ready,
    client: client,
    me: me,
    uid: uid,

    /* Re-read the stored session (call once on page load). */
    refresh: function () {
      if (!client) return Promise.resolve(null);
      return client.auth.getSession().then(function (r) { store(r.data.session); return r.data.session; });
    },
    signUp: function (username, email, password) {
      return client.auth.signUp({
        email: email, password: password,
        options: { data: { username: username }, emailRedirectTo: pageUrl('login.html') }
      });
    },
    signIn: function (email, password) {
      return client.auth.signInWithPassword({ email: email, password: password }).then(function (r) {
        if (!r.error) store(r.data.session);
        return r;
      });
    },
    signOut: function () {
      return client.auth.signOut().then(function () { store(null); });
    },
    sendReset: function (email) {
      return client.auth.resetPasswordForEmail(email, { redirectTo: pageUrl('login.html') });
    },
    setPassword: function (password) {
      return client.auth.updateUser({ password: password });
    }
  };

  if (client) {
    client.auth.onAuthStateChange(function (event, session) {
      store(session);
      if (root.MC64 && session) root.MC64.sync();
    });
  }

  root.MC64_SB = API;
})(typeof window !== 'undefined' ? window : globalThis);
