"use strict";
/* Clock engine: timestamp-based timing, moves, reset and time-control setup. */

/* ---------- Flag alarm ---------- */
function startFlagAlarm(){
  if(state.flagAlarmActive) return;
  state.flagAlarmActive=true;
  beep("flag"); haptic(180);
  clearInterval(state.flagAlarmTimer);
  state.flagAlarmTimer=setInterval(()=>{
    if(state.status==="finished" && state.flagAlarmActive){beep("flag");haptic(180);}
    else stopFlagAlarm();
  },900);
}
function stopFlagAlarm(){
  state.flagAlarmActive=false;
  clearInterval(state.flagAlarmTimer);
  state.flagAlarmTimer=null;
}

/* ---------- Start / pause / resume ---------- */
function startGame(){
  if(state.status==="finished"){toast("Game over — press reset");return;}
  ensureAudio(); stopFlagAlarm();
  state.status="running";
  state.lastTimestamp=performance.now();
  requestImmersive();
  beep("start"); haptic(16);
  scheduleRender(); render();
}
function pauseGame(){
  if(state.status!=="running") return;
  consumeElapsed();
  if(state.status!=="running") return;
  state.status="paused";
  stopFlagAlarm(); beep("move"); render();
}
function resumeGame(){
  if(state.status!=="paused") return;
  ensureAudio(); stopFlagAlarm();
  state.status="running";
  state.lastTimestamp=performance.now();
  requestImmersive(); scheduleRender(); beep("start"); render();
}

/* ---------- Timing ---------- */
function consumeElapsed(){
  if(state.status!=="running") return true;
  const now=performance.now();
  const delta=now-state.lastTimestamp;
  state.lastTimestamp=now;
  const p=state.players[state.activePlayer];
  const before=state.turnMs;
  state.turnMs+=delta;
  let charge=delta;
  if(state.mode==="delay") charge=Math.max(0,state.turnMs-Math.max(before,p.inc*1000));
  p.remain-=charge;
  if(p.remain<=0){
    p.remain=0;
    state.status="finished";
    startFlagAlarm();
    return false;
  }
  const sec=Math.ceil(p.remain/1000);
  if(sec<=10 && sec!==state.warnSec){state.warnSec=sec;beep("warn");}
  return true;
}
function renderLoop(){
  if(state.status!=="running") return;
  consumeElapsed(); render();
  if(state.status==="running") scheduleRender();
}
function scheduleRender(){
  cancelAnimationFrame(state.renderHandle);
  state.renderHandle=requestAnimationFrame(renderLoop);
}

/* ---------- The critical move transaction ---------- */
function completeMove(player){
  if(state.status==="ready"){startGame();return;}
  if(state.status==="paused"){toast("Paused — press resume");return;}
  if(state.status!=="running") return;
  if(state.activePlayer!==player) return;   // the inactive side cannot switch the clock
  ensureAudio();
  if(!consumeElapsed()){render();return;}

  const cur=state.players[player];
  if(state.mode==="fischer") cur.remain+=cur.inc*1000;
  else if(state.mode==="bronstein") cur.remain+=Math.min(cur.inc*1000,state.turnMs);
  cur.moves+=1;
  if(state.stage && cur.moves===state.stage.moves){
    cur.remain+=state.stage.add*1000;
    toast(`Move ${state.stage.moves}: +${state.stage.add/60} min added`);
  }
  state.activePlayer=player==="white"?"black":"white";
  state.lastTimestamp=performance.now();
  state.turnMs=0; state.warnSec=-1;
  beep("move"); haptic(12); render();
}

/* ---------- Reset ---------- */
function resetGame(){
  if(inProgress() && !confirm("Reset the current game?")) return;
  stopFlagAlarm();
  cancelAnimationFrame(state.renderHandle);
  state.turnMs=0; state.warnSec=-1;
  state.status="ready"; state.activePlayer="white";
  for(const p of ["white","black"]){
    state.players[p].remain=state.players[p].base*1000;
    state.players[p].moves=0;
  }
  render();
}

/* ---------- Time controls ---------- */
function applyPreset(label,seconds,increment,bm=0,bs=0){
  if(inProgress() && !confirm("Start a new game with this time control?")) return;
  stopFlagAlarm();
  state.players.white={base:seconds,remain:seconds*1000,inc:increment,moves:0};
  state.players.black={base:seconds,remain:seconds*1000,inc:increment,moves:0};
  state.activePlayer="white"; state.status="ready";
  state.turnMs=0; state.warnSec=-1;
  state.stage=bm?{moves:bm,add:bs}:null;
  if(bm) state.mode="fischer";
  state.controlLabel=label;
  closeMode(); render();
  toast(label+" ready — tap a clock to start");
}
function applyCustomTime(){
  const wm=Math.max(0,+$("wm").value||0), ws=Math.max(0,Math.min(59,+$("ws").value||0)), wi=Math.max(0,+$("wi").value||0);
  const bm=Math.max(0,+$("bm").value||0), bs=Math.max(0,Math.min(59,+$("bs").value||0)), bi=Math.max(0,+$("bi").value||0);
  const white=wm*60+ws, black=bm*60+bs;
  if(white<=0||black<=0){toast("Both players need a starting time");return;}
  if(inProgress() && !confirm("Start a new game with custom time?")) return;
  stopFlagAlarm();
  state.players.white={base:white,remain:white*1000,inc:wi,moves:0};
  state.players.black={base:black,remain:black*1000,inc:bi,moves:0};
  state.activePlayer="white"; state.status="ready";
  state.turnMs=0; state.warnSec=-1; state.stage=null;
  state.controlLabel=(white===black&&wi===bi)?`${+(white/60).toFixed(2)}+${wi}`:"Custom";
  closeMode(); render();
  toast("Custom time ready — tap a clock to start");
}
