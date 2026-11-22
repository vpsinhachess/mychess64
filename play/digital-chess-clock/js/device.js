"use strict";
/* Device features: synthesized clock sounds, haptics, fullscreen, wake lock. */

let audioContext=null, master=null, noiseBuf=null;

function ensureAudio(){
  try{
    const A=window.AudioContext||window.webkitAudioContext;
    if(!A) return null;
    if(!audioContext) audioContext=new A();
    if(audioContext.state==="suspended") audioContext.resume();
    return audioContext;
  }catch(_){return null}
}
function ensureMaster(ctx){
  if(master) return master;
  const comp=ctx.createDynamicsCompressor();
  master=ctx.createGain();
  master.connect(comp);comp.connect(ctx.destination);
  const n=Math.floor(ctx.sampleRate*0.12);
  noiseBuf=ctx.createBuffer(1,n,ctx.sampleRate);
  const d=noiseBuf.getChannelData(0);
  for(let i=0;i<n;i++) d[i]=Math.random()*2-1;
  return master;
}
function tone(ctx,out,t,f0,f1,dur,type,vol){
  const o=ctx.createOscillator(),g=ctx.createGain();
  o.type=type;
  o.frequency.setValueAtTime(f0,t);
  o.frequency.exponentialRampToValueAtTime(f1,t+dur);
  g.gain.setValueAtTime(0.0001,t);
  g.gain.exponentialRampToValueAtTime(vol,t+0.004);
  g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(g);g.connect(out);o.start(t);o.stop(t+dur+0.01);
}
function click(ctx,out,t,freq,vol,dur,q=1.2){
  const s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();
  s.buffer=noiseBuf;f.type="bandpass";f.frequency.value=freq;f.Q.value=q;
  g.gain.setValueAtTime(vol,t);
  g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  s.connect(f);f.connect(g);g.connect(out);s.start(t);s.stop(t+dur);
}
function beep(type="move"){
  const ctx=ensureAudio();
  if(!ctx||!state.vol) return;
  try{
    const out=ensureMaster(ctx);
    out.gain.value=[0,0.35,0.7,1][state.vol];
    const t=ctx.currentTime;
    if(type==="move"){
      const r=1+(Math.random()-0.5)*0.06, v=0.92+Math.random()*0.16;
      click(ctx,out,t,4200*r,1.0*v,0.012);
      click(ctx,out,t+0.001,1500*r,2.6*v,0.06,9);
      tone(ctx,out,t,190*r,70,0.09,"sine",0.9*v);
      click(ctx,out,t+0.075,3300*r,0.5*v,0.012);
      click(ctx,out,t+0.076,1900*r,1.1*v,0.035,8);
      tone(ctx,out,t+0.075,230,110,0.04,"sine",0.25*v);
    }
    else if(type==="start"){tone(ctx,out,t,660,880,0.09,"sine",0.35);tone(ctx,out,t+0.1,880,1100,0.12,"sine",0.35);}
    else if(type==="warn"){tone(ctx,out,t,1400,1400,0.06,"sine",0.22);}
    else{for(let i=0;i<3;i++) tone(ctx,out,t+i*0.2,880,880,0.14,"square",0.22);}
  }catch(_){}
}

function haptic(ms=12){ if(state.haptic && navigator.vibrate) navigator.vibrate(ms); }

/* Fullscreen only on touch devices; on desktop the clock stays in its window. */
async function requestImmersive(){
  if(coarse){
    try{
      if(document.fullscreenElement!==document.documentElement && document.documentElement.requestFullscreen)
        await document.documentElement.requestFullscreen();
      state.fullscreen=true;
    }catch(_){state.fullscreen=false;}
  }
  await requestWakeLock();
}
async function requestWakeLock(){
  try{
    if("wakeLock" in navigator){
      if(state.wakeLock) return;
      state.wakeLock=await navigator.wakeLock.request("screen");
      state.wakeLock.addEventListener("release",()=>state.wakeLock=null);
    }
  }catch(_){}
}
