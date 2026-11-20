/* Player login page: sign in, create account, forgot password, set new password. */
(function () {
  'use strict';
  var SB = window.MC64_SB;
  function $(s) { return document.querySelector(s); }
  var params = new URLSearchParams(location.search);

  /* Only allow redirects to pages inside this folder. */
  function safeNext(n) { return /^[a-z0-9-]+\.html(#[a-z0-9-]*)?$/i.test(n || '') ? n : 'dashboard-student.html'; }
  var next = safeNext(params.get('next'));

  function say(text, kind) { var m = $('#msg'); m.textContent = text || ''; m.className = 'msg' + (kind ? ' ' + kind : ''); }
  function busy(form, on) { var b = form.querySelector('button[type=submit]'); if (b) b.disabled = on; }
  function friendly(err) {
    var m = (err && (err.message || err.error_description)) || String(err || '');
    if (/invalid login credentials/i.test(m)) return 'Email or password is not right.';
    if (/email not confirmed/i.test(m)) return 'Confirm your email first. Check your inbox for the link.';
    if (/already registered|already been registered/i.test(m)) return 'An account with this email already exists. Try signing in.';
    if (/password.*(short|least|6|8)/i.test(m)) return 'Choose a longer password (at least 8 characters).';
    if (/rate limit|too many/i.test(m)) return 'Too many attempts. Wait a minute and try again.';
    return m || 'Something went wrong. Please try again.';
  }

  var tabs = document.querySelectorAll('[data-tab]');
  function tab(name) {
    tabs.forEach(function (b) { var on = b.dataset.tab === name; b.classList.toggle('on', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
    ['in', 'up', 'fp', 'rs'].forEach(function (k) { $('#f-' + k).hidden = k !== name; });
    say('');
  }
  tabs.forEach(function (b) { b.addEventListener('click', function () { tab(b.dataset.tab); }); });

  function finish() {
    var p = (window.MC64 && MC64.sync) ? MC64.sync() : Promise.resolve();
    return p.catch(function () { }).then(function () { location.replace(next); });
  }

  if (!SB || !SB.ready) {
    $('#setup').hidden = false;
    document.querySelectorAll('input,button').forEach(function (x) { x.disabled = true; });
    document.querySelectorAll('[data-tab]').forEach(function (x) { x.disabled = false; });
    return;
  }

  /* Opened from the password-reset email: show the new-password form. */
  if (SB.client) SB.client.auth.onAuthStateChange(function (event) { if (event === 'PASSWORD_RECOVERY') tab('rs'); });

  SB.refresh().then(function () {
    if (SB.uid() && !/type=recovery/.test(location.hash)) location.replace(next);
  }).catch(function () { });

  $('#f-in').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.currentTarget; busy(f, true); say('Signing in…');
    SB.signIn(f.email.value.trim(), f.password.value).then(function (r) {
      busy(f, false);
      if (r.error) return say(friendly(r.error), 'err');
      say('Welcome back!', 'ok');
      return finish();
    }).catch(function (err) { busy(f, false); say(friendly(err), 'err'); });
  });

  $('#f-up').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.currentTarget, name = f.username.value.trim(), email = f.email.value.trim(), pw = f.password.value;
    if (!/^[A-Za-z0-9_ .-]{3,30}$/.test(name)) return say('Player name: 3 to 30 letters, numbers, spaces, dots, dashes or underscores.', 'err');
    if (pw.length < 8) return say('Choose a password of at least 8 characters.', 'err');
    busy(f, true); say('Creating your account…');
    SB.signUp(name, email, pw).then(function (r) {
      busy(f, false);
      if (r.error) return say(friendly(r.error), 'err');
      if (!r.data || !r.data.session) {
        f.reset(); tab('in');
        return say('Account created. Check your email to confirm it, then sign in.', 'ok');
      }
      say('Account created. Welcome to MyChess64!', 'ok');
      return finish();
    }).catch(function (err) { busy(f, false); say(friendly(err), 'err'); });
  });

  $('#f-fp').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.currentTarget; busy(f, true); say('Sending…');
    SB.sendReset(f.email.value.trim()).then(function (r) {
      busy(f, false);
      if (r.error) return say(friendly(r.error), 'err');
      say('If an account exists for that email, a reset link is on its way.', 'ok');
    }).catch(function (err) { busy(f, false); say(friendly(err), 'err'); });
  });

  $('#f-rs').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.currentTarget, pw = f.password.value;
    if (pw.length < 8) return say('Choose a password of at least 8 characters.', 'err');
    busy(f, true); say('Saving…');
    SB.setPassword(pw).then(function (r) {
      busy(f, false);
      if (r.error) return say(friendly(r.error), 'err');
      say('Password updated. Taking you to your dashboard…', 'ok');
      setTimeout(function () { location.replace(next); }, 1000);
    }).catch(function (err) { busy(f, false); say(friendly(err), 'err'); });
  });

  if (params.get('tab') === 'up') tab('up');
})();
