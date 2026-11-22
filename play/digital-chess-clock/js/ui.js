"use strict";
/* Everything that draws: time formatting, icons, render(), toast(). */

const pad2 = n => String(n).padStart(2,"0");

function formatTime(ms){
  if(ms>0 && ms<10000){
    const t=Math.ceil(ms/100)/10;
    return (t<10?"0:0":"0:")+t.toFixed(1);
  }
  let total=Math.max(0,Math.ceil(ms/1000));
  const h=Math.floor(total/3600); total%=3600;
  const m=Math.floor(total/60), s=total%60;
  return h ? `${h}:${pad2(m)}:${pad2(s)}` : `${m}:${pad2(s)}`;
}

/* Each character gets a fixed-width cell; --w drives the font-size fit in CSS. */
function setTime(el,text){
  if(el.dataset.t===text) return;
  el.dataset.t=text;
  let w=0,html="";
  for(const ch of text){
    if(ch===":"){html+='<i class="c">:</i>';w+=.34;}
    else if(ch==="."){html+='<i class="d">.</i>';w+=.3;}
    else{html+=`<i class="n">${ch}</i>`;w+=.64;}
  }
  el.innerHTML=html;
  el.style.setProperty("--w",w.toFixed(2));
}

const ICON={
  play:'<svg viewBox="0 0 24 24"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z"/></svg>',
  pause:'<svg viewBox="0 0 24 24"><rect x="5" y="4" width="5" height="16" rx="1.4"/><rect x="14" y="4" width="5" height="16" rx="1.4"/></svg>',
  reset:'<svg class="s" viewBox="0 0 24 24"><path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1"/><path d="M3.5 4v4.5H8"/></svg>',
  mode:'<svg class="s" viewBox="0 0 24 24"><path d="M4 7h9M19 7h1M4 17h1M11 17h9"/><circle cx="16" cy="7" r="2.4"/><circle cx="8" cy="17" r="2.4"/></svg>',
  spk(v){
    const base='<path d="M3 9.5v5h3.8L12 19V5L6.8 9.5H3z" fill="currentColor" stroke="none"/>';
    const waves=[
      '<path d="M15.5 9.2a4 4 0 0 1 0 5.6"/>',
      '<path d="M18 6.8a7.5 7.5 0 0 1 0 10.4"/>',
      '<path d="M20.5 4.4a11 11 0 0 1 0 15.2"/>'
    ];
    const x='<path d="M16 9.5l5 5M21 9.5l-5 5"/>';
    return '<svg class="s" viewBox="0 0 24 24">'+base+(v?waves.slice(0,v).join(""):x)+'</svg>';
  }
};

function zone(ms){return ms<=10000?"critical":ms<=30000?"warning":"";}

function statusText(p){
  const x=state.players[p];
  if(x.remain<=0) return "Flag fall";
  if(state.status==="finished") return "Game over";
  if(state.status==="paused") return state.activePlayer===p?"Paused":"";
  if(state.status==="running") return state.activePlayer===p?"Your turn":"";
  return p==="white"?"Tap to start":"";
}

function render(){
  for(const p of ["white","black"]){
    const x=state.players[p];
    const el=$(p+"Clock");
    const isTurn = x.remain>0 && state.status!=="finished" && state.activePlayer===p;
    const cls=["panel",p];
    if(x.remain<=0) cls.push("flag");
    else{
      cls.push(isTurn?"turn":"idle");
      const z=zone(x.remain); if(z) cls.push(z);
      if(isTurn && state.status==="paused") cls.push("paused");
    }
    const next=cls.join(" ");
    if(el.className!==next) el.className=next;
    setTime($(p+"Time"),formatTime(x.remain));
    $(p+"Moves").textContent=x.moves;
    $(p+"Status").textContent=statusText(p);
  }

  /* centre label: "3+2" plus a small mode note */
  let main=state.controlLabel.replace(/\s/g,""),sub="";
  if(/^FIDE/i.test(main)){main=main.replace(/^FIDE/i,"");sub="FIDE";}
  const note={delay:"delay",bronstein:"bronstein",none:"no inc"}[state.mode];
  if(note) sub=(sub?sub+" · ":"")+note;
  const f=$("fmtLabel");
  f.classList.toggle("long",main.length>6);
  f.innerHTML=main+(sub?`<small>${sub}</small>`:"");

  const running=state.status==="running";
  const sb=$("startBtn");
  const label=running?"Pause":state.status==="paused"?"Resume":"Start";
  sb.innerHTML=running?ICON.pause:ICON.play;
  sb.classList.toggle("go",!running);
  sb.setAttribute("aria-label",label);
  sb.title=running?"Pause (P)":label;
  $("resetBtn").innerHTML=ICON.reset;
  $("modeBtn").innerHTML=ICON.mode;
  $("soundBtn").innerHTML=ICON.spk(state.vol);
  $("soundBtn").title=VOLS[state.vol];
  $("soundBtn").setAttribute("aria-label",VOLS[state.vol]);
  $("app").classList.toggle("flip",state.flip);
}

function toast(message){
  const t=$("toast");
  t.textContent=message; t.classList.add("show");
  clearTimeout(t._timer);
  t._timer=setTimeout(()=>t.classList.remove("show"),1900);
}
