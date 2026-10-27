const SUPABASE_URL = 'https://ysdmbcnhelvqaccgloal.supabase.co';
const SUPABASE_KEY = 'sb_publishable_cmmQuPzq7-iFsvAWkUJyMw_JojK1Td7';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const $ = id => document.getElementById(id);
const GLYPH = { k:'♚', q:'♛', r:'♜', b:'♝', n:'♞', p:'♟' };

let me = null, code = null, teacher = false;
let students = [], games = [], online = [], chan = null;
const picked = new Set();
let startingGame = false;

function esc(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function randCode(){ const c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let s=''; for(let i=0;i<6;i++) s += c[Math.random()*c.length|0]; return s; }
function say(t, kind){ const el = $('say'); el.textContent = t; el.className = kind || ''; }
function msg(t){ $('homeMsg').textContent = t; }
function show(id){ ['home','app'].forEach(x => $(x).classList.toggle('hidden', x !== id)); }
function nameOf(uid){ const s = students.find(x => x.uid === uid); return s ? s.name : 'Teacher'; }
function setConn(state, text){
  $('connDot').className = 'dot ' + (state === 'on' ? 'on' : state === 'off' ? 'off' : '');
  $('connText').textContent = text;
}

/* ---------- Auth ---------- */
async function signIn(){
  const { data: { session } } = await db.auth.getSession();
  if (session) return session.user.id;
  const { data, error } = await db.auth.signInAnonymously();
  if (error) throw error;
  return data.user.id;
}

/* ---------- Board ---------- */
function drawBoard(el, fen, o = {}){
  const g = new Chess(fen), b = g.board(), last = o.last || [];
  const sel = o.sel || null;
  const tg = sel ? g.moves({ square: sel, verbose: true }).map(m => m.to) : [];
  el.innerHTML = ''; el.className = 'board';
  for (let ri = 0; ri < 8; ri++) for (let fi = 0; fi < 8; fi++){
    const r = o.flip ? 7 - ri : ri, f = o.flip ? 7 - fi : fi;
    const sq = 'abcdefgh'[f] + (8 - r), p = b[r][f];
    const d = document.createElement('div');
    d.className = 'sq ' + ((r + f) % 2 ? 'dark' : 'light')
      + (sq === sel ? ' sel' : '') + (tg.includes(sq) ? ' tgt' : '') + (last.includes(sq) ? ' last' : '');
    if (p){
      const img = document.createElement('img');
      img.className = 'piece ' + (p.color === 'w' ? 'piece-w' : 'piece-b');
      img.alt = ''; img.draggable = false;
      img.src = 'https://lichess.org/assets/piece/cburnett/' + p.color + p.type.toUpperCase() + '.svg';
      d.appendChild(img);
    }
    if (r === 7){ const fc = document.createElement('span'); fc.className = 'coord file'; fc.textContent = sq[0]; d.appendChild(fc); }
    if (f === 7){ const rc = document.createElement('span'); rc.className = 'coord rank'; rc.textContent = sq[1]; d.appendChild(rc); }
    if (o.side){ d.classList.add('clickable'); d.onclick = () => clickSquare(el, g, sq, o); }
    el.appendChild(d);
  }
}
let selected = {};   // selected square per board element id
function clickSquare(el, g, sq, o){
  const from = selected[el.id] || null;
  if (from && from !== sq && g.moves({ square: from, verbose: true }).some(m => m.to === sq)){
    selected[el.id] = null;
    o.onMove(from, sq);
    return;
  }
  const p = g.get(sq);
  selected[el.id] = (p && p.color === o.side && g.turn() === o.side) ? sq : null;
  drawBoard(el, g.fen(), { ...o, sel: selected[el.id] });
}

/* ---------- Entering a classroom ---------- */
async function openTeacher(){
  const { data: existing, error } = await db.from('classes').select('code').eq('teacher', me).limit(1);
  if (error) return msg('Could not open your classroom: ' + error.message);
  let c = existing && existing[0] ? existing[0].code : null;
  for (let i = 0; i < 5 && !c; i++){
    const cand = randCode();
    const { error: e2 } = await db.from('classes').insert({ code: cand, teacher: me });
    if (!e2) c = cand;
  }
  if (!c) return msg('Could not create a classroom. Please try again.');
  enter(c, true);
}
async function joinClass(c){
  const { data, error } = await db.rpc('join_class', { p_code: c, p_name: $('inName').value.trim() });
  if (error || !data) return msg('That code was not found, or joining failed. Check the code and try again.');
  enter(c, false);
}
async function enter(c, asTeacher){
  code = c; teacher = asTeacher; picked.clear(); selected = {};
  $('roleLabel').textContent = teacher ? 'Teacher' : 'Student';
  $('codeShow').textContent = c;
  $('bLeave').classList.toggle('hidden', teacher);
  $('bDelete').classList.toggle('hidden', !teacher);
  $('pairbar').classList.toggle('hidden', !teacher);
  $('liveNote').textContent = teacher ? 'Keep this page open while teaching.' : 'You can leave anytime. Your seat is kept.';
  show('app');
  await refresh();
  subscribe();
}
function leave(){
  if (chan) db.removeChannel(chan);
  chan = null; code = null; picked.clear();
  show('home');
  msg('You left the classroom. Your seat is saved. Join again with the same name.');
  setConn('', 'Connected');
}

/* ---------- Data and live updates ---------- */
async function refresh(){
  if (!code) return;
  const [s, g] = await Promise.all([
    db.from('students').select('uid,name,joined_at').eq('class_code', code).order('joined_at'),
    db.from('games').select('*').eq('class_code', code).order('created_at')
  ]);
  if (s.error || g.error) return say('Could not load the classroom: ' + (s.error || g.error).message, 'err');
  students = s.data; games = g.data;
  render();
}
function subscribe(){
  if (chan) db.removeChannel(chan);
  chan = db.channel('class-' + code, { config: { presence: { key: me } } })
    .on('postgres_changes', { event:'*', schema:'public', table:'games', filter:'class_code=eq.' + code }, () => refresh())
    .on('postgres_changes', { event:'*', schema:'public', table:'students', filter:'class_code=eq.' + code }, () => refresh())
    .on('presence', { event:'sync' }, () => { online = Object.keys(chan.presenceState()); render(); })
    .subscribe(async st => {
      if (st === 'SUBSCRIBED'){
        await chan.track({ uid: me });
        setConn('on', 'Live');
      } else if (st === 'CHANNEL_ERROR' || st === 'TIMED_OUT'){
        setConn('', 'Reconnecting…');
      }
    });
}

/* ---------- Teacher actions ---------- */
function togglePick(uid, on){
  if (on) picked.add(uid); else picked.delete(uid);
  renderPairBar();
}
function renderPairBar(){
  const n = picked.size;
  $('bPair').disabled = n < 1 || startingGame;
  $('bPair').textContent = n === 2 ? 'Start game between the 2' : n === 1 ? 'Start 1-to-1 game' : 'Start game';
  $('pairHint').textContent = n === 0 ? 'Tick one student to play them yourself, or two students to play each other.'
    : n === 1 ? 'You will play this student. Colours are random.'
    : 'These two will play each other. Colours are random.';
}
async function startGame(){
  const picks = [...picked];
  if (picks.length < 1 || picks.length > 2) return say('Tick one student, or two students.', 'err');
  if (startingGame) return;
  startingGame = true;
  const opponent = picks.length === 1 ? me : picks[1];
  $('bPair').disabled = true;
  say('Starting game…');
  const call = db.rpc('start_game', { p_code: code, p_a: picks[0], p_b: opponent });
  const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('no reply from the server after 15 seconds. Refresh the page and try again.')), 15000));
  let res;
  try { res = await Promise.race([call, timeout]); }
  catch(e){ startingGame = false; $('bPair').disabled = false; return say('Could not start game: ' + e.message, 'err'); }
  startingGame = false;
  $('bPair').disabled = false;
  if (res.error) return say('Could not start game: ' + res.error.message, 'err');
  picked.clear(); renderPairBar();
  say('Game started.', 'ok');
  refresh();
}
async function endGame(id, result){
  const { error } = await db.from('games').update({ result }).eq('id', id);
  if (error) say('Could not end game: ' + error.message, 'err');
}
async function deleteClass(){
  if (!confirm('Delete this classroom with all its students and games? This cannot be undone.')) return;
  const { error } = await db.from('classes').delete().eq('code', code);
  if (error) return say('Could not delete: ' + error.message, 'err');
  location.reload();
}

/* ---------- Moves (both roles) ---------- */
async function sendMove(g, from, to){
  const pos = new Chess(g.fen);
  let mv = null; try { mv = pos.move({ from, to, promotion: 'q' }); } catch(e){}
  if (!mv){ say('That move is not legal.', 'err'); return; }
  const result = pos.game_over() ? (pos.in_checkmate() ? (mv.color === 'w' ? '1-0' : '0-1') : '1/2-1/2') : null;
  const { data, error } = await db.rpc('record_move', { p_game: g.id, p_fen: pos.fen(), p_san: mv.san, p_last: [mv.from, mv.to], p_result: result });
  if (error) say('Move not saved: ' + error.message, 'err');
  else if (!data) say('It is not your move right now.', 'err');
  else say('');
  refresh();
}

/* ---------- Rendering ---------- */
function render(){
  if (!code) return;
  const active = games.filter(g => !g.result);
  renderRoster(active);
  if (teacher) renderTeacherGames(active); else renderStudentGames(active);
}
function renderRoster(active){
  const busy = new Set();
  active.forEach(g => { busy.add(g.white); busy.add(g.black); });
  $('count').textContent = students.length ? students.length + ' joined' : '';
  $('roster').innerHTML = students.length ? students.map(s => {
    const on = online.includes(s.uid), bz = busy.has(s.uid);
    const initial = esc(s.name.charAt(0).toUpperCase());
    if (!teacher){
      return `<div class="student ${on ? '' : 'off'}"><span class="avatar">${initial}</span>
        <span class="sname">${esc(s.name)}${s.uid === me ? ' (you)' : ''}</span><span class="state ${on ? 'on' : ''}">${on ? 'Online' : 'Away'}</span></div>`;
    }
    const off = !on || bz;
    if (off) picked.delete(s.uid);
    return `<label class="student ${off ? 'off' : ''}">
      <input type="checkbox" value="${esc(s.uid)}" ${off ? 'disabled' : ''} ${picked.has(s.uid) ? 'checked' : ''}
        onchange="togglePick(this.value, this.checked)">
      <span class="avatar">${initial}</span>
      <span class="sname">${esc(s.name)}</span>
      <span class="state ${on && !bz ? 'on' : ''}">${bz ? 'In a game' : on ? 'Online' : 'Offline'}</span></label>`;
  }).join('') : '<p class="empty">No students yet. Share the code above.</p>';
  if (teacher) renderPairBar();
}
let watchGameId = null;
function watchGame(id){ watchGameId = id; render(); }

function renderTeacherGames(active){
  const done = games.length - active.length;
  $('gamesTitle').textContent = 'Games' + (done ? ' · ' + done + ' finished' : '');
  if (!active.length){
    $('games').innerHTML = '<p class="empty">No active games. Tick a student on the left and press Start game.</p>';
    return;
  }
  if (!active.find(g => g.id === watchGameId)) watchGameId = active[0].id;
  const cur = active.find(g => g.id === watchGameId);
  const others = active.filter(g => g.id !== watchGameId);
  $('games').innerHTML = `
    <div class="game">
      <div class="game-title"><span>${esc(nameOf(cur.white))} <small>(white)</small> vs ${esc(nameOf(cur.black))} <small>(black)</small></span>
        <small>${cur.san.length} moves</small></div>
      <div id="board"></div>
      <p class="turn" id="turnLine"></p>
      <div class="results">
        <button class="soft" onclick="endGame('${cur.id}','1-0')">White wins</button>
        <button class="soft" onclick="endGame('${cur.id}','0-1')">Black wins</button>
        <button class="soft" onclick="endGame('${cur.id}','1/2-1/2')">Draw</button>
        <button class="ghost" onclick="endGame('${cur.id}','ended')">End</button>
      </div>
    </div>
    ${others.length ? '<p class="muted">Other games: ' + others.map(g =>
      `<button class="ghost" onclick="watchGame('${g.id}')">${esc(nameOf(g.white))} vs ${esc(nameOf(g.black))}</button>`).join(' ') + '</p>' : ''}`;
  const side = cur.white === me ? 'w' : cur.black === me ? 'b' : null;
  drawBoard($('board'), cur.fen, {
    last: cur.last_move || [], flip: side === 'b', side,
    sel: selected['board'] || null, onMove: (f, t) => sendMove(cur, f, t)
  });
  const turnSide = new Chess(cur.fen).turn();
  const t = $('turnLine');
  t.textContent = (turnSide === 'w' ? 'White' : 'Black') + ' to move' + (side ? ' · you are playing' : '');
  t.className = 'turn' + (side ? ' mine' : '');
}

function renderStudentGames(active){
  const mine = active.find(g => g.white === me || g.black === me);
  let h = '';
  if (mine){
    const opp = nameOf(mine.white === me ? mine.black : mine.white);
    h += `<div class="game"><div class="game-title"><span>You vs ${esc(opp)}</span><small>${mine.san.length} moves</small></div>
      <div id="board"></div><p class="turn" id="turnLine"></p></div>`;
  } else {
    h += '<p class="empty">Waiting for your teacher to start your game. You can stay here.</p>';
  }
  const others = games.filter(g => g !== mine);
  if (others.length) h += '<p class="muted">Other games: ' + others.map(g =>
    `${esc(nameOf(g.white))} vs ${esc(nameOf(g.black))}${g.result ? ' (' + esc(g.result) + ')' : ''}`).join(' · ') + '</p>';
  $('games').innerHTML = h;
  if (mine){
    const side = mine.white === me ? 'w' : 'b';
    drawBoard($('board'), mine.fen, {
      flip: side === 'b', side, last: mine.last_move || [],
      sel: selected['board'] || null, onMove: (f, t) => sendMove(mine, f, t)
    });
    const yourTurn = new Chess(mine.fen).turn() === side;
    const t = $('turnLine');
    t.textContent = yourTurn ? 'Your move' : 'Waiting for your opponent';
    t.className = 'turn' + (yourTurn ? ' mine' : '');
  }
  $('gamesTitle').textContent = 'Games';
}

/* ---------- Wiring ---------- */
$('bTeach').onclick = async () => {
  try { me = me || await signIn(); await openTeacher(); }
  catch(e){ msg('Could not connect: ' + e.message); }
};
$('bJoin').onclick = async () => {
  const c = $('inCode').value.trim().toUpperCase(), n = $('inName').value.trim();
  if (c.length !== 6) return msg('Enter the 6-character class code from your teacher.');
  if (!n) return msg('Enter your name.');
  msg('');
  try { me = me || await signIn(); await joinClass(c); }
  catch(e){ msg('Could not join: ' + e.message); }
};
$('bLeave').onclick = leave;
$('bDelete').onclick = deleteClass;
$('bPair').onclick = startGame;
$('bCopy').onclick = async () => {
  try { await navigator.clipboard.writeText(code); say('Code copied.', 'ok'); }
  catch(e){ say('Code: ' + code); }
};

$('themeBtn').onclick = () => {
  const dark = !document.body.classList.contains('dark-theme');
  document.body.classList.toggle('dark-theme', dark);
  try { localStorage.setItem('mc64-theme', dark ? 'dark' : 'light'); } catch(e){}
};
$('focusBtn').onclick = () => {
  const on = !document.body.classList.contains('board-only');
  document.body.classList.toggle('board-only', on);
  $('focusBtn').textContent = on ? 'Show panels' : 'Board only';
};
try { if (localStorage.getItem('mc64-theme') === 'dark') document.body.classList.add('dark-theme'); } catch(e){}

(async () => {
  const q = new URLSearchParams(location.search);
  if (q.get('code')) $('inCode').value = q.get('code').toUpperCase().slice(0, 6);
  try {
    me = await signIn();
    setConn('on', 'Connected');
  } catch(e){
    setConn('', 'Offline');
    msg('Could not connect to the classroom server: ' + e.message);
  }
})();
