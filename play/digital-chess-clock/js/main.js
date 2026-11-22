"use strict";
/* Wiring: events, keyboard shortcuts, startup. */

/* Unlock audio on the first real gesture */
["pointerdown","touchstart","click"].forEach(evt=>{
  document.addEventListener(evt,()=>ensureAudio(),{passive:true});
});

/* Touch protection */
document.addEventListener("contextmenu",e=>{ if(!e.target.closest("input,textarea,select")) e.preventDefault(); });
document.addEventListener("selectstart",e=>{ if(!e.target.closest("input,textarea,select")) e.preventDefault(); });
document.addEventListener("dragstart",e=>e.preventDefault());

/* Keep real elapsed time after the tab was hidden */
document.addEventListener("visibilitychange",()=>{
  if(document.visibilityState==="visible" && state.status==="running"){
    consumeElapsed(); scheduleRender(); render(); requestWakeLock();
  }
});
document.addEventListener("fullscreenchange",()=>{ state.fullscreen=!!document.fullscreenElement; });

/* Controls */
$("startBtn").onclick=()=>{
  if(state.status==="running") pauseGame();
  else if(state.status==="paused") resumeGame();
  else startGame();
};
$("resetBtn").onclick=resetGame;
$("modeBtn").onclick=()=>{
  if(state.status==="running"){pauseGame();toast("Clock paused");}
  modeHome();
};
$("soundBtn").onclick=()=>{cycleVol();render();beep("move");toast(VOLS[state.vol]);};

/* Clock panels */
for(const p of ["white","black"]){
  $(p+"Clock").addEventListener("pointerdown",()=>completeMove(p));
}

/* Keyboard: Space = press clock / start, P = pause, R = reset, M = settings, Esc = close */
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){closeMode();return;}
  if(e.target.closest("input")||$("modeSheet").classList.contains("open")) return;
  if(e.code==="Space"){
    e.preventDefault();
    if(document.activeElement&&document.activeElement.blur) document.activeElement.blur();
    state.status==="running"?completeMove(state.activePlayer):$("startBtn").click();
  }else if(e.key==="p"||e.key==="P"){ if(inProgress()) $("startBtn").click(); }
  else if(e.key==="r"||e.key==="R") resetGame();
  else if(e.key==="m"||e.key==="M") $("modeBtn").click();
});
document.addEventListener("keyup",e=>{ if(e.code==="Space"&&!e.target.closest("input")) e.preventDefault(); });

/* Sheet */
$("closeSheet").onclick=closeMode;
$("modeSheet").addEventListener("pointerup",e=>{ if(e.target===$("modeSheet")) closeMode(); });

/* Startup */
render();
if(window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone===true){
  state.fullscreen=true; requestWakeLock();
}
