"use strict";
/* Time-control sheet: presets, clock type, custom time, arbiter, device options. */

function openMode(title,content){
  $("sheetTitle").textContent=title;
  $("sheetContent").innerHTML=content;
  $("modeSheet").classList.add("open");
  $("modeSheet").setAttribute("aria-hidden","false");
}
function closeMode(){
  $("modeSheet").classList.remove("open");
  $("modeSheet").setAttribute("aria-hidden","true");
}

function modeHome(){
  openMode("Time control",`
    ${["Bullet","Blitz","Rapid","Classical"].map(c=>`
      <div class="section-title">${c}</div>
      <div class="time-grid">${PRESETS.map((p,i)=>p[5]===c
        ?`<button class="time-btn${state.controlLabel===p[0]?" sel":""}" data-preset="${i}">${p[0].replace("FIDE ","")}${p[0].startsWith("FIDE")?" ★":""}</button>`:"").join("")}</div>`).join("")}

    <div class="section-title">Custom</div>
    <button class="mode-card" id="customCard">
      <b>Custom time</b>
      <span>Different starting time and increment for White and Black.</span>
    </button>

    <div class="section-title">Clock type</div>
    <div class="mode-grid">
      <button class="mode-card${state.mode==="fischer"?" sel":""}" id="fischerCard"><b>Fischer increment</b><span>Seconds added after each move.</span></button>
      <button class="mode-card${state.mode==="delay"?" sel":""}" id="delayCard"><b>Delay</b><span>Clock waits before counting down each turn.</span></button>
      <button class="mode-card${state.mode==="bronstein"?" sel":""}" id="bronsteinCard"><b>Bronstein</b><span>Time spent is returned, up to the delay value.</span></button>
      <button class="mode-card${state.mode==="none"?" sel":""}" id="periodCard"><b>Sudden death</b><span>No increment or delay.</span></button>
    </div>

    <div class="section-title">Arbiter</div>
    <button class="mode-card" id="arbiterCard">
      <b>Arbiter correction</b><span>Fix the time, move count and active side.</span>
    </button>

    <div class="section-title">Device</div>
    <div class="mode-grid">
      <button class="mode-card" id="soundCard"><b>Sound</b><span>${VOLS[state.vol]} — tap to change</span></button>
      <button class="mode-card" id="hapticCard"><b>Haptic</b><span>${state.haptic?"On":"Off"}</span></button>
      <button class="mode-card${state.flip?" sel":""}" id="flipCard" style="grid-column:1/-1"><b>Face-to-face (portrait)</b><span>${state.flip?"On — Black’s side is turned upside-down for your opponent":"Off — both sides face the same way"}</span></button>
    </div>
  `);
  document.querySelectorAll("[data-preset]").forEach(btn=>{
    btn.onclick=()=>applyPreset(...PRESETS[+btn.dataset.preset]);
  });
  $("customCard").onclick=customView;
  const setMode=(m,n)=>()=>{state.mode=m;modeHome();render();toast(n+" selected")};
  $("fischerCard").onclick=setMode("fischer","Fischer");
  $("delayCard").onclick=setMode("delay","Delay");
  $("bronsteinCard").onclick=setMode("bronstein","Bronstein");
  $("periodCard").onclick=setMode("none","Sudden death");
  $("arbiterCard").onclick=arbiterView;
  $("soundCard").onclick=()=>{cycleVol();beep("move");modeHome();render()};
  $("hapticCard").onclick=()=>{state.haptic=!state.haptic;modeHome();render()};
  $("flipCard").onclick=()=>{state.flip=!state.flip;modeHome();render()};
}

function customView(){
  const w=state.players.white,b=state.players.black;
  openMode("Custom time",`
    <div class="section-title">White</div>
    <div class="fields">
      <div class="field"><label>Minutes</label><input id="wm" type="number" inputmode="numeric" min="0" value="${Math.floor(w.base/60)}"></div>
      <div class="field"><label>Seconds</label><input id="ws" type="number" inputmode="numeric" min="0" max="59" value="${w.base%60}"></div>
    </div>
    <div class="field full-field"><label>Increment / delay (seconds)</label><input id="wi" type="number" inputmode="numeric" min="0" value="${w.inc}"></div>

    <div class="section-title">Black</div>
    <div class="fields">
      <div class="field"><label>Minutes</label><input id="bm" type="number" inputmode="numeric" min="0" value="${Math.floor(b.base/60)}"></div>
      <div class="field"><label>Seconds</label><input id="bs" type="number" inputmode="numeric" min="0" max="59" value="${b.base%60}"></div>
    </div>
    <div class="field full-field"><label>Increment / delay (seconds)</label><input id="bi" type="number" inputmode="numeric" min="0" value="${b.inc}"></div>

    <div class="sheet-actions">
      <button class="dark-btn" id="backMode">Back</button>
      <button class="primary-btn" id="applyCustom">Apply</button>
    </div>
  `);
  $("applyCustom").onclick=applyCustomTime;
  $("backMode").onclick=modeHome;
}

function arbiterView(){
  openMode("Arbiter correction",`
    <div class="fields">
      <div class="field"><label>White seconds left</label><input id="aw" type="number" inputmode="numeric" min="0" value="${Math.ceil(state.players.white.remain/1000)}"></div>
      <div class="field"><label>Black seconds left</label><input id="ab" type="number" inputmode="numeric" min="0" value="${Math.ceil(state.players.black.remain/1000)}"></div>
    </div>
    <div class="field full-field"><label>Move count</label><input id="am" type="number" inputmode="numeric" min="0" value="${Math.max(state.players.white.moves,state.players.black.moves)}"></div>
    <div class="section-title">Active clock</div>
    <div class="mode-grid">
      <button class="mode-card" id="activeWhite"><b>White</b><span>White to move.</span></button>
      <button class="mode-card" id="activeBlack"><b>Black</b><span>Black to move.</span></button>
    </div>
    <div class="sheet-actions">
      <button class="dark-btn" id="backArbiter">Back</button>
      <button class="primary-btn" id="applyArbiter">Apply</button>
    </div>
  `);
  let pick=state.activePlayer;
  const sel=()=>{$("activeWhite").classList.toggle("sel",pick==="white");$("activeBlack").classList.toggle("sel",pick==="black");};
  sel();
  $("activeWhite").onclick=()=>{pick="white";sel()};
  $("activeBlack").onclick=()=>{pick="black";sel()};
  $("applyArbiter").onclick=()=>{
    state.players.white.remain=Math.max(0,+$("aw").value||0)*1000;
    state.players.black.remain=Math.max(0,+$("ab").value||0)*1000;
    const m=Math.max(0,+$("am").value||0);
    if(m!==Math.max(state.players.white.moves,state.players.black.moves)){state.players.white.moves=m;state.players.black.moves=m;}
    state.activePlayer=pick; state.turnMs=0; state.warnSec=-1; state.lastTimestamp=performance.now();
    if(state.status==="finished"||state.status==="running") state.status="paused";
    stopFlagAlarm();
    render(); closeMode(); toast("Correction applied — press resume");
  };
  $("backArbiter").onclick=modeHome;
}
