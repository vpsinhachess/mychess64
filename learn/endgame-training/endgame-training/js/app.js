var ICO=["wQ wR","wP","wB","wN","wN wB","wR wP","wR wB wN","wQ","wK"];
var S={p:{},last:null,s:{board:0,hl:1,ev:1,co:1,snd:1,auto:0,lvl:1}};
try{var _t=JSON.parse(localStorage.getItem("cet3")||"null");if(_t){S.p=_t.p||{};S.last=_t.last;for(var k in _t.s)S.s[k]=_t.s[k]}}catch(e){}
function save(){try{localStorage.setItem("cet3",JSON.stringify(S))}catch(e){}document.documentElement.dataset.board=S.s.board}
document.documentElement.dataset.board=S.s.board;
var app=document.getElementById("app");
function $(s){return document.querySelector(s)}
function pc(c){return '<div class="pc '+c+'"></div>'}
function done(k){return S.p[k]?1:0}
var AC=null;function snd(f){if(!S.s.snd)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();var o=AC.createOscillator(),g=AC.createGain();o.frequency.value=f;g.gain.value=.08;o.connect(g);g.connect(AC.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+.09);o.stop(AC.currentTime+.1)}catch(e){}}
function stats(){var n=0,t=0;D.forEach(function(c,ci){c[2].forEach(function(s,si){s[1].forEach(function(g,gi){t++;n+=done(ci+"."+si+"."+gi)})})});return[n,t]}
function catP(ci){var n=0,t=0;D[ci][2].forEach(function(s,si){s[1].forEach(function(g,gi){t++;n+=done(ci+"."+si+"."+gi)})});return[n,t]}
function subP(ci,si){var n=0;D[ci][2][si][1].forEach(function(g,gi){n+=done(ci+"."+si+"."+gi)});return n}
function nth(k){for(var ci=0;ci<D.length;ci++)for(var si=0;si<D[ci][2].length;si++){var L=D[ci][2][si][1].length;if(k<L)return[ci,si,k];k-=L}}
// ---------- pages ----------
var CC=["34,166,111","245,166,35","167,108,240","59,130,246","236,92,138","240,120,58","20,184,196","229,83,83","212,175,55"];
var DESC=["Fundamental mates","Promote and outplay","Bishop endings","Knight endings","Minor-piece fights","Rook endings","Rook against minors","Queen endings","Famous positions"];
function home(){
 var st=stats(),pr0=Math.round(100*st[0]/st[1]);
 var h='<section class="hero2"><div class="hl"><span class="eyebrow">MYCHESS64 · ENDGAME TRAINING</span><h1>Master the endgame.</h1><p>Win the checkmate positions, hold the draws. '+st[1].toLocaleString()+' puzzles from open-source databases and Stockfish-verified positions.</p><div class="cta"><button class="btn big" id="cont">▶ Continue</button><button class="btn" id="daily">📅 Daily</button><button class="btn" id="rnd">🎲 Random</button><button class="btn" id="myl">🎚 My level</button><button class="btn" id="rnu">🎯 Unsolved</button></div></div><div class="hr"><div class="ring big" style="--p:'+pr0+'"><b>'+pr0+'%</b><span>complete</span></div><div class="mini"><div><b data-mcr="e">'+MC64.phaseRating("e")+'</b>MyChess64 Rating</div><div><b style="font-size:17px" data-mcr-title="e">'+MC64.title(MC64.phaseRating("e"))+'</b>'+st[0].toLocaleString()+' / '+st[1].toLocaleString()+' solved</div></div></div></section>';
 h+='<div class="sech"><h2>Endgame topics</h2><span class="mu">'+D.length+' categories</span></div><div class="tgrid">';
 D.forEach(function(c,i){var p=catP(i),pr=Math.round(100*p[0]/p[1]);
  h+='<button class="tc" data-cat="'+i+'" style="--c:'+CC[i%CC.length]+';--i:'+i+'"><span class="tcg"></span><div class="tct"><div class="ics">'+ICO[i].split(" ").map(pc).join("")+'</div><span class="badge">'+pr+'%</span></div><b class="tn">'+c[0]+'</b><span class="td">'+DESC[i]+'</span><div class="tm"><span>'+p[0]+' / '+p[1].toLocaleString()+' solved</span><span>'+c[2].length+' topics</span></div><div class="bar"><u style="width:'+pr+'%"></u></div></button>'});
 h+='</div><div class="sech"><h2>Checkmate in…</h2><span class="mu">10 levels</span></div><div class="mgrid">';
 for(var n=1;n<=10;n++){var c2=0;for(var i=0;i<M[n-1].length;i++)c2+=done("m"+n+"_"+i);var pr2=Math.round(100*c2/M[n-1].length);
  h+='<button class="mc" data-mate="'+n+'" style="--i:'+n+'"><b>'+n+'</b><span>move'+(n>1?"s":"")+'</span><small>'+c2+'/'+M[n-1].length+'</small><div class="bar"><u style="width:'+pr2+'%;background:#0a6cf5"></u></div></button>'}
 app.innerHTML=h+'</div>';
}
function cat(ci){
 var p=catP(ci),pr=Math.round(100*p[0]/p[1]),col=CC[ci%CC.length];
 var h='<div class="chead" style="--c:'+col+'"><button class="btn" data-go="home">← Topics</button><div class="ics">'+ICO[ci].split(" ").map(pc).join("")+'</div><div class="ct"><h1>'+D[ci][0]+'</h1><span class="mu">'+DESC[ci]+' · '+p[0]+' / '+p[1].toLocaleString()+' solved</span></div><span class="badge">'+pr+'%</span></div><div class="sgrid" style="--c:'+col+'">';
 D[ci][2].forEach(function(s,si){var n=subP(ci,si),t=s[1].length,q=Math.round(100*n/t);
  h+='<button class="sc" data-sub="'+ci+'.'+si+'" style="--c:'+col+';--i:'+si+'"><b>'+s[0]+'</b><span class="mu">'+n+' / '+t+' solved</span><div class="bar"><u style="width:'+q+'%"></u></div></button>'});
 app.innerHTML=h+'</div>';
}
var FLT="all";
function lv(ci,si){
 var s=D[ci][2][si],col=CC[ci%CC.length],n=subP(ci,si),t=s[1].length,q=Math.round(100*n/t);S.cur={ci:ci,si:si};
 var h='<div class="chead" style="--c:'+col+'"><button class="btn" data-cat="'+ci+'">← '+D[ci][0]+'</button><div class="ct"><h1>'+s[0]+'</h1><span class="mu">'+n+' / '+t+' solved</span><div class="bar" style="max-width:340px;margin-top:8px"><u style="width:'+q+'%"></u></div></div><button class="btn pri" data-nextun="'+ci+'.'+si+'">▶ Next unsolved</button></div><div class="seg" style="--c:'+col+'">';
 [["all","All"],["new","Unsolved"],["win","Win"],["draw","Draw"]].forEach(function(f){h+='<button class="'+(FLT==f[0]?'on':'')+'" data-flt="'+f[0]+'">'+f[1]+'</button>'});
 h+='</div><div class="lgrid" style="--c:'+col+'">';
 s[1].forEach(function(g,gi){var d=done(ci+"."+si+"."+gi);if(FLT=="new"&&d||FLT=="win"&&g[1]||FLT=="draw"&&!g[1])return;
  h+='<button class="lt'+(d?' done':'')+'" data-lv="'+ci+'.'+si+'.'+gi+'" style="--i:'+gi+'"><span class="ln">'+(gi+1)+'</span><span class="ll">'+(g[1]?'draw':g[2]?'mate '+g[2]:'win')+'</span>'+(d?'<span class="ck">✓</span>':'')+'</button>'});
 app.innerHTML=h+'</div>';
}
function nextUnsolved(ci,si){var L=D[ci][2][si][1];for(var g=0;g<L.length;g++)if(!done(ci+"."+si+"."+g)){play(ci,si,g);return}play(ci,si,0)}
function play(ci,si,gi){
 var s=D[ci][2][si],g=s[1][gi];S.last={t:"g",ci:ci,si:si,gi:gi};save();
 var nx=function(){for(var j=1;j<=s[1].length;j++){var k=(gi+j)%s[1].length;if(!done(ci+"."+si+"."+k)){play(ci,si,k);return}}lv(ci,si)};
 startPos({fen:g[0],label:s[0]+" #"+(gi+1),key:ci+"."+si+"."+gi,draw:g[1],mi:g[2],next:nx,bk:function(){lv(ci,si)}});
}
function mate(n,i){
 var L=M[n-1],t=0;if(i==null){do{i=Math.random()*L.length|0}while(done("m"+n+"_"+i)&&t++<90)}
 S.last={t:"m",n:n,i:i};save();
 startPos({fen:L[i],label:"Mate in "+n+" #"+(i+1),key:"m"+n+"_"+i,draw:0,mi:n,next:function(){mate(n)},bk:home});
}
function rnd(un){
 var tot=stats()[1],t=0,p;do{p=nth(Math.random()*tot|0)}while(un&&done(p.join("."))&&t++<500);
 play(p[0],p[1],p[2]);
}
function daily(){var tot=stats()[1],k=(Math.floor(Date.now()/864e5)*7919)%tot,p=nth(k);play(p[0],p[1],p[2])}
function myLevel(){var tot=stats()[1],r=MC64.phaseRating("e"),best=null,bd=1e9,n=0,t=0;while(n<60&&t++<800){var p=nth(Math.random()*tot|0);if(done(p.join(".")))continue;var g=D[p[0]][2][p[1]][1][p[2]],rp=g[1]?1400:g[2]>0?Math.min(2000,800+90*g[2]):1200,dd=Math.abs(rp-r);if(dd<bd){bd=dd;best=p}n++}if(!best)return rnd(0);play(best[0],best[1],best[2])}
function cont(){var l=S.last;if(!l)return daily();if(l.t=="g")play(l.ci,l.si,l.gi);else mate(l.n,l.i)}
var BT=[["Brown","#f0d9b5","#b58863"],["Green","#eeeed2","#769656"],["Blue","#dee3e6","#8ca2ad"],["Gray","#e8e8e8","#a0a0a0"]];
function tog(id,t,sub){return '<label class="trow"><span><b>'+t+'</b><small>'+sub+'</small></span><input type="checkbox" class="sw" id="s_'+id+'"></label>'}
function settings(){
 var h='<div class="phead"><h1>⚙ Settings</h1></div><div class="card"><h3>Board theme</h3><div class="swatches">';
 BT.forEach(function(b,i){h+='<button class="sw2'+(S.s.board==i?' on':'')+'" data-bt="'+i+'"><span class="b2" style="--l:'+b[1]+';--d:'+b[2]+'"><i></i><i></i><i></i><i></i></span>'+b[0]+'</button>'});
 h+='</div></div><div class="card"><h3>Gameplay</h3><div class="trow"><span><b>Opponent strength</b><small>Stockfish 19 at full strength for every puzzle</small></span><span class="pill" style="margin:0">Hard</span></div>'
 +tog("hl","Show legal moves","Dots on the squares a piece can reach")+tog("co","Board coordinates","Letters and numbers on the board")+tog("ev","Evaluation bar","Evaluation from Stockfish 19")+tog("auto","Auto-load next puzzle","Move on right after you solve one")+tog("snd","Sound","Move and result sounds")
 +'</div><div class="card"><h3>Data</h3><div class="acts"><button class="btn" id="reset">Reset progress</button><button class="btn" data-go="about">About &amp; credits</button></div></div>';
 app.innerHTML=h;["hl","co","ev","snd","auto"].forEach(function(k){$("#s_"+k).checked=!!S.s[k]});
}
function ac(t,p){return'<div class="card" style="margin:0"><h3>'+t+'</h3><p class="mu" style="margin:0">'+p+'</p></div>'}
function about(){
 var tp=stats()[1],mt=M.reduce(function(a,b){return a+b.length},0);
 app.innerHTML='<div class="phead"><h1>ℹ About</h1></div><div class="agrid">'
 +ac("📚 Puzzle data",tp.toLocaleString()+' endgame puzzles and '+mt.toLocaleString()+' checkmate-in-N puzzles. Curated positions and mate puzzles from <a href="https://github.com/supertorpe/chessendgametraining" target="_blank" rel="noopener">supertorpe/chessendgametraining</a> (GPL-3.0; endgame list by Narkefok_Vidda). Extra positions were generated and verified with Stockfish (GPL-3.0).')
 +ac("♞ Board and pieces",'cburnett pieces from <a href="https://lichess.org" target="_blank" rel="noopener">Lichess</a> (GPLv2+). Board styling imitates the Lichess analysis board. Chess rules by <a href="https://github.com/jhlywa/chess.js" target="_blank" rel="noopener">chess.js</a> (BSD-2), PDF reports by jsPDF (MIT).')
 +ac("🤖 Opponent","Stockfish 19 (single-thread WebAssembly build by Chess.com / nmrugg, GPL-3.0) answers every move at its hardest setting (Skill Level 20, no strength limit) in every puzzle, and powers the evaluation bar and hints. It runs entirely in your browser. Labels (win / draw) come from the source database and Stockfish analysis.")
 +ac("🔒 Your data","Progress is saved in this browser only (localStorage). Session scores live for the current session and are never uploaded.")+'</div>';
}
// ---------- board UI ----------
var cur,game,fens,mvs,sans,view,user,flip,sel,mv,hint,busy,over,nUser,mode,drag,SC=0;
function startPos(o){
 finishPrev();cur=o;mode=o.free?"free":"puzzle";o.att=mode=="puzzle";o.t0=Date.now();o.lastRes=null;document.querySelectorAll("nav button").forEach(function(b){b.classList.toggle("on",mode=="free"&&b.dataset.go=="ana")});
 var f=o.fen.split(" ").length<6?o.fen+" 0 1":o.fen;
 game=new Chess(f);if(!game.fen()||game.moves().length==0&&!o.free){}
 fens=[game.fen()];mvs=[null];sans=[];view=0;user=game.turn();flip=mode=="free"?false:user=="b";sel=null;mv=[];hint=null;busy=false;over=false;nUser=0;
 var side=user=="w"?"White":"Black";
 var goal=mode=="free"?"Analysis board":o.draw?side+" – hold the draw":side+" – mate"+(o.mi?(o.mi<=5?" in "+o.mi:" (best: "+o.mi+")"):"");
 window.scrollTo(0,0);drawer(false);
 app.innerHTML='<div class="gwrap"><div class="bcol"><div class="top"><button class="btn" data-a="drawer">☰ Puzzles</button><div class="gl"><small>'+(o.label||"")+'</small><b id="goal">'+goal+'</b></div>'+(mode=="free"?"":'<span class="pill" id="pill"></span>')+'</div><div class="bbox"><div id="eb"><div id="ebf"></div><span id="ebt"></span></div><div id="board"></div></div><div id="msg">Your move</div><div class="acts"><button class="btn" data-a="flip" aria-label="Flip">⇅</button><button class="btn" data-a="un">↶ Undo</button><button class="btn" data-a="hint">💡 Hint</button>'+(mode=="free"?'<button class="btn" data-a="eng">⚙ Engine</button>':'<button class="btn" data-a="rs" aria-label="Restart">↻</button><button class="btn pri" data-a="nx" style="flex:2">Next puzzle →</button>')+'</div></div><div class="side">'+panelHTML(o)+'</div></div>';
 clearInterval(TMR);TMR=setInterval(tick,1000);
 pill();refresh();
}

var TIPS=["Drive the enemy king to the edge with your pieces, then deliver mate. Always check for stalemate before you move.","Use the opposition: keep your king in front of the pawn and protect the squares ahead of it.","A bishop only controls one colour. Plan around the squares it can reach and keep your king close.","Knights move in L-shapes and are weak on the edge. Bring your king to help and avoid forks.","Minor pieces work best side by side. Look for forks, discovered checks and mating nets.","Cut the enemy king off along a rank or file, then advance the pawn. Remember the Lucena and Philidor ideas.","Use the rook to restrict the king and let the minor pieces cover the escape squares.","Take squares away with the queen, bring your king closer, and never give stalemate.","Study the idea behind the position – the same plan returns again and again."],TIP_M="Look at every forcing move first: checks, then captures, then threats. Count the king's escape squares.",TIP_F="Both sides can be moved here. Paste any FEN to explore a position, or ask the engine for a move.",TMR=null;
function fmt(t){return Math.floor(t/60)+":"+("0"+t%60).slice(-2)}
function tick(){var e=$("#st-time");if(!e){clearInterval(TMR);return}if(cur&&mode=="puzzle"&&!over)e.textContent=fmt(Math.round((Date.now()-cur.t0)/1000))}
function info(){var e=$("#st-mv");if(!e)return;var L=lim();e.textContent=nUser+(L?" / "+L:"");var t=$("#st-try");if(t)t.textContent=LOG.filter(function(x){return x.key==cur.key}).length+(over?0:1)}
function keyInfo(o){
 var k=String(o.key),i,L,chips=[];
 if(k.charAt(0)=="m"){var q=k.slice(1).split("_"),n=+q[0];i=+q[1];L=M[n-1].length;var a=Math.max(0,Math.min(L-48,i-24));for(var j=a;j<Math.min(L,a+48);j++)chips.push([j,"m"+n+"_"+j]);
  return{cat:"Checkmate in "+n,topic:"Mate in "+n,n:i+1,total:L,col:"10,108,245",tip:TIP_M,chips:chips,cur:i}}
 var r=k.split(".").map(Number);i=r[2];L=D[r[0]][2][r[1]][1].length;var a2=Math.max(0,Math.min(L-48,i-24));for(var j2=a2;j2<Math.min(L,a2+48);j2++)chips.push([j2,r[0]+"."+r[1]+"."+j2]);
 return{cat:D[r[0]][0],topic:D[r[0]][2][r[1]][0],n:i+1,total:L,col:CC[r[0]%CC.length],tip:TIPS[r[0]]||"",chips:chips,cur:i};
}
function movesCard(){return'<div class="pcard"><div class="ph">Moves</div><div class="nav"><button class="btn" data-a="first">⏮</button><button class="btn" data-a="prev">◀</button><button class="btn" data-a="next">▶</button><button class="btn" data-a="last">⏭</button></div><div id="ml"></div></div>'}
function panelHTML(o){
 var side=user=="w"?"White":"Black";
 if(o.free)return'<div class="pcard"><div class="ph">Analysis board</div><p class="mu" style="margin:0 0 10px">'+TIP_F+'</p><div class="acts"><input type="text" id="fen" style="flex:1;min-width:0" placeholder="Paste FEN"><button class="btn" data-a="setfen" style="flex:none">Set</button></div></div>'+movesCard()+'<div class="acts"><button class="btn" data-a="cpf">⧉ Copy FEN</button><button class="btn" data-a="drawer">☰ Puzzles</button><button class="btn" data-go="home">🏠 Home</button></div>';
 var I=keyInfo(o),dif=o.draw?["Hold","h"]:!o.mi?["Medium","m"]:o.mi<=2?["Easy","e"]:o.mi<=6?["Medium","m"]:["Hard","d"];
 var h='<div class="pcard" style="--c:'+I.col+'"><div class="crumb"><i class="cdot"></i>'+esc(I.cat)+' › '+esc(I.topic)+'</div><h3>Puzzle '+I.n+' <small>of '+I.total+'</small></h3><div class="chips2"><span class="chip">'+(user=="w"?"⚪":"⚫")+' '+side+' to move</span><span class="chip g">'+(o.draw?"⚖ Hold the draw":"🎯 Checkmate"+(o.mi?" in "+o.mi:""))+'</span><span class="chip d-'+dif[1]+'">'+dif[0]+'</span>'+(S.p[o.key]?'<span class="chip ok">✓ Solved</span>':'')+'</div></div>';
 h+='<div class="tiles2"><div><small>Moves</small><b id="st-mv">0</b></div><div><small>Time</small><b id="st-time">0:00</b></div><div><small>Tries</small><b id="st-try">1</b></div><div><small>My MCR</small><b id="st-mcr" data-mcr="e">'+MC64.phaseRating("e")+'</b></div></div>'+movesCard();
 h+='<div class="pcard"><div class="ph">More in this topic</div><div class="chipgrid" style="--c:'+I.col+'">'+I.chips.map(function(c){return'<button class="'+(c[0]==I.cur?'cur':S.p[c[1]]?'done':'')+'" data-open="'+c[1]+'">'+(c[0]+1)+'</button>'}).join("")+'</div></div>';
 h+='<div class="pcard tip"><div class="ph">💡 Tip</div><p>'+esc(I.tip)+'</p></div><div class="acts"><button class="btn" data-a="cpf">⧉ FEN</button><button class="btn" data-a="ana">🔬 Analyse</button><button class="btn" data-a="drawer">☰ Puzzles</button><button class="btn" data-go="home">🏠 Home</button></div>';
 return h;
}
function fbCopy(t){var x=document.createElement("textarea");x.value=t;x.style.cssText="position:fixed;opacity:0";document.body.appendChild(x);x.select();try{document.execCommand("copy")}catch(e){}x.remove()}
function copyText(t){try{navigator.clipboard.writeText(t).catch(function(){fbCopy(t)})}catch(e){fbCopy(t)}}
function msg(t,c){var m=$("#msg");if(m){m.textContent=t;m.className=c||""}}
function refresh(){drawBoard();drawMoves();evalBar();info()}
function drawBoard(){
 var g=new Chess(fens[view]),bd=g.board(),h="",lm=mvs[view],ks=null,live=view==fens.length-1;
 if(g.in_check())for(var r=0;r<8;r++)for(var f=0;f<8;f++){var p=bd[r][f];if(p&&p.type=="k"&&p.color==g.turn())ks=r*8+f}
 for(var i=0;i<64;i++){
  var r=flip?7-(i>>3):i>>3,f=flip?7-(i&7):i&7,sq="abcdefgh"[f]+(8-r),p=bd[r][f],cl=(r+f)%2?"d":"l";
  if(lm&&(lm[0]==sq||lm[1]==sq))cl+=" last";if(live&&sel==sq)cl+=" sel";
  if(live&&S.s.hl&&mv.indexOf(sq)>-1)cl+=p?" cap":" dot";if(ks==r*8+f)cl+=" chk";
  h+='<div class="sq '+cl+'" data-sq="'+sq+'">'+(S.s.co&&(i&7)==7?'<b class="rk">'+(8-r)+'</b>':'')+(S.s.co&&i>>3==7?'<b class="fl">'+"abcdefgh"[f]+'</b>':'')+(p?pc(p.color+p.type.toUpperCase()):'')+'</div>';
 }
 $("#board").innerHTML=h+'<svg id="arr" viewBox="0 0 8 8"></svg>';
 if(hint&&live){var c=function(s){var f="abcdefgh".indexOf(s[0]),r=8-s[1];return[(flip?7-f:f)+.5,(flip?7-r:r)+.5]},a=c(hint[0]),b=c(hint[1]);
  $("#arr").innerHTML='<defs><marker id="ah" markerWidth="4" markerHeight="4" refX="2.5" refY="2" orient="auto"><path d="M0,0 L4,2 L0,4z" fill="#3692e7"/></marker></defs><line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="#3692e7" stroke-width=".2" opacity=".85" marker-end="url(#ah)"/>'}
}
function drawMoves(){
 var f=(fens[0].split(" ")[1]=="b"),h="",n=parseInt(fens[0].split(" ")[5])||1;
 sans.forEach(function(s,i){var w=(i+(f?1:0))%2==0;if(w)h+='<span class="n">'+(n+((i+(f?1:0))>>1))+'.</span>';else if(i==0)h+='<span class="n">'+n+'.</span><span class="m" style="color:#666;cursor:default">…</span>';
  h+='<span class="m'+(view==i+1?' on':'')+'" data-ply="'+(i+1)+'">'+s+'</span>'});
 var m=$("#ml");if(m){m.innerHTML=h;var o=m.querySelector(".on");if(o)m.scrollTop=Math.max(0,o.offsetTop-m.clientHeight/2)}
}
// pointer handling
var dragFrom=null,dragP,dx,dy,dragOn=false;
document.addEventListener("pointerdown",function(e){
 var s=e.target.closest("#board .sq");if(!s)return;
 if(busy||over||view!=fens.length-1)return;
 if($("#pro"))return;var q=s.dataset.sq;
 if(sel&&mv.indexOf(q)>-1){tryMove(sel,q);return}
 var p=game.get(q);
 if(p&&p.color==game.turn()&&(mode=="free"||p.color==user)){
  sel=q;mv=game.moves({square:q,verbose:true}).map(function(m){return m.to});hint=null;drawBoard();
  dragFrom=q;dragP=p.color+p.type.toUpperCase();dx=e.clientX;dy=e.clientY;dragOn=false;
 }else{sel=null;mv=[];drawBoard()}
});
document.addEventListener("pointermove",function(e){if(!dragFrom)return;var g=$("#gh");if(!dragOn&&Math.hypot(e.clientX-dx,e.clientY-dy)>8){dragOn=true;g.className=dragP;g.style.display="block"}if(dragOn){g.style.left=e.clientX+"px";g.style.top=e.clientY+"px"}});
document.addEventListener("pointercancel",function(){dragFrom=null;dragOn=false;$("#gh").style.display="none"});
document.addEventListener("pointerup",function(e){
 if(!dragFrom)return;var g=$("#gh");g.style.display="none";
 var was=dragOn;dragOn=false;var el=document.elementFromPoint(e.clientX,e.clientY),s=el&&el.closest("#board .sq");
 var from=dragFrom;dragFrom=null;
 if(was&&s&&s.dataset.sq!=from&&mv.indexOf(s.dataset.sq)>-1)tryMove(from,s.dataset.sq);
});
function tryMove(a,b){
 var p=game.get(a);
 if(p.type=="p"&&(b[1]=="8"||b[1]=="1")){
  var h='<div id="pro">'+["q","r","b","n"].map(function(t){return '<div data-pr="'+t+'" class="">'+pc(p.color+t.toUpperCase())+'</div>'}).join("")+'</div>';
  $("#board").insertAdjacentHTML("beforeend",h);
  $("#pro").onclick=function(e){var d=e.target.closest("[data-pr]");if(d){var t=d.dataset.pr;$("#pro").remove();doMove(a,b,t)}};
  return;
 }
 doMove(a,b,"q");
}
function doMove(a,b,pr){
 var m=game.move({from:a,to:b,promotion:pr});if(!m)return;
 push(m);sel=null;mv=[];hint=null;nUser++;snd(m.captured?220:330);refresh();
 if(mode=="free"){status();return}
 if(!check())reply();
}
function push(m){sans.push(m.san);fens.push(game.fen());mvs.push([m.from,m.to]);view=fens.length-1}
function status(){
 if(game.in_checkmate())msg((game.turn()=="w"?"Black":"White")+" wins by checkmate","ok");
 else if(game.in_stalemate())msg("Stalemate","bad");else if(game.in_draw())msg("Draw","bad");
 else msg((game.turn()=="w"?"White":"Black")+" to move"+(game.in_check()?" – check":""));
}
function lim(){return cur.draw||!cur.mi?0:cur.mi<=5?cur.mi:(String(cur.key).charAt(0)=="m"?cur.mi+3:cur.mi*2+10)}
function check(){
 var r=null,L=lim();
 if(game.in_checkmate())r=game.turn()==user?"lost":"win";
 else if(game.game_over())r=cur.draw?"win":"draw";
 else if(cur.draw&&nUser>=25&&game.turn()==user)r="win";
 else if(L&&nUser>=L&&game.turn()==user)r="late";
 if(!r)return false;over=true;
 if(r=="win"){log("correct");msg((cur.draw?"Draw secured! 🎉":"Checkmate! 🎉")+MC64.tag(),"ok");S.p[cur.key]=1;save();snd(660);if(S.s.auto)setTimeout(cur.next,1300)}
 else{log("incorrect",r=="late"?"mate not delivered in time":r=="lost"?"got checkmated":"drawn, not won");msg((r=="late"?"Not checkmate within "+L+" move"+(L>1?"s":"")+" – press ↻ or Undo and try again.":r=="lost"?"You were checkmated. Press ↻ or Undo.":(game.in_stalemate()?"Stalemate – ":"Draw – ")+"not the win. Try again.")+MC64.tag(),"bad");}
 return true;
}
/* ---------- Stockfish glue ---------- */
var SFCFG=window.MC64_CONFIG.engine;
/* Ask Stockfish (Hard) for a move; falls back to the built-in engine only if Stockfish cannot load.
   cb receives a move usable with game.move(), or null. */
function engMove(g,ms,cb){
 SF.best(g.fen(),{ms:ms,prio:2}).then(function(r){
  if(r&&r.move){cb({from:r.from,to:r.to,promotion:r.promotion});return}
  if(!r&&SF.failed()){cb(search(g,1700));return}
  cb(null);
 });
}
function reply(){
 var g0=game;busy=true;msg("Opponent is thinking…");
 engMove(game,SFCFG.level.moveTimeMs,function(m){
  if(game!==g0)return;
  if(m){var mm=game.move(m);if(mm){push(mm);snd(mm.captured?220:300)}}
  busy=false;refresh();if(!check())msg("Your move");
 });
}
function paintEval(g,sc,t){
 if(!$("#ebf"))return;
 var w=100/(1+Math.exp(-sc/260)),ff=flip;
 $("#ebf").style.height=(ff?100-w:w)+"%";$("#ebf").style.background=ff?"#000":"#fff";$("#eb").style.background=ff?"#fff":"#000";$("#ebt").textContent=t;
 var se=$("#st-ev");if(se)se.textContent=t;$("#ebt").style[ff?"bottom":"top"]="2px";$("#ebt").style[ff?"top":"bottom"]="";
}
function evalBar(){
 var eb=$("#eb");if(!eb)return;eb.className=S.s.ev?"on":"";if(!S.s.ev)return;
 var f=fens[view],tok=(evalBar.t=(evalBar.t||0)+1);
 setTimeout(function(){
  if(tok!=evalBar.t||!$("#ebf"))return;var g=new Chess(f);
  if(g.game_over()){paintEval(g,g.in_checkmate()?(g.turn()=="w"?-MATE:MATE):0,g.in_checkmate()?(g.turn()=="w"?"0-1":"1-0"):"½");return}
  SF.best(f,{ms:SFCFG.evalMs,prio:1}).then(function(r){
   if(tok!=evalBar.t||!$("#ebf"))return;
   var wh=g.turn()=="w"?1:-1;
   if(r&&r.mate!=null){var mw=r.mate*wh;paintEval(g,mw>0?MATE:-MATE,"#"+(mw>0?"":"-")+Math.abs(mw))}
   else if(r&&r.cp!=null){var sc=r.cp*wh;paintEval(g,sc,(sc/100).toFixed(1))}
   else if(!r&&SF.failed()){search(g,250);var sc2=SC*wh;paintEval(g,sc2,Math.abs(sc2)>MATE-100?"#"+(MATE-Math.abs(sc2)+1>>1):(sc2/100).toFixed(1))}
  });
 },60);
}
function go(i){if(i<0||i>=fens.length)return;var y=window.scrollY;view=i;refresh();window.scrollTo(0,y)}
function act(a){
 if(a=="rep"||a=="rep2"){finishPrev();LOG.length?askName():nav("score")}
 if(a=="cpf"){copyText(fens[view]);var cb=document.querySelector("[data-a=cpf]");if(cb){var c0=cb.textContent;cb.textContent="Copied ✓";setTimeout(function(){cb.textContent=c0},1200)}}
 if(a=="ana"){cur.att=false;startPos({fen:fens[view],free:1,label:"Analysis",bk:home})}
if(a=="nmx"){var n=$("#nm");if(n)n.remove()}
 if(a=="clr"&&confirm("Clear this session's scores?")){LOG=[];try{sessionStorage.removeItem("cet_log")}catch(e){}scorePage()}
 if(a=="dlp"){var nm=$("#nmi").value.trim();if(!nm){$("#nme").textContent="Please enter your name.";return}$("#nm").remove();savePDF(nm)}
 if(a=="drawer")drawer();if(a=="dclose")drawer(false);if(a=="first")go(0);if(a=="prev")go(view-1);if(a=="next")go(view+1);if(a=="last")go(fens.length-1);
 if(a=="flip"){flip=!flip;refresh()}
 if(a=="rs")startPos(cur);if(a=="nx")cur.next();if(a=="bk"){cur.bk?cur.bk():home()}
 if(a=="un")undo();if(a=="hint")hintMove();
 if(a=="eng"&&!game.game_over()){var g1=game;engMove(game,SFCFG.hintMs,function(m){if(game!==g1||!m)return;var mm=game.move(m);if(mm){push(mm);refresh();status()}})}
 if(a=="setfen"){var f=$("#fen").value.trim();var t=new Chess();if(f&&t.load(f))startPos({fen:t.fen(),free:1,label:"Analysis"});else msg("Invalid FEN","bad")}
}
function undo(){
 if(busy||!sans.length)return;
 var n=mode=="free"?1:(game.turn()==user?2:1);
 while(n--&&sans.length){game.undo();sans.pop();fens.pop();mvs.pop()}
 over=false;if(mode!="free"){nUser=Math.max(0,nUser-1);if(cur.lastRes!="correct")cur.att=true}view=fens.length-1;hint=null;sel=null;mv=[];refresh();mode=="free"?status():msg("Your move");
}
function hintMove(){
 if(busy||over||game.game_over())return;
 var m=null,how="Forced mate – follow the arrow";
 if(mode=="puzzle"&&!cur.draw&&cur.mi&&cur.mi<=2){try{m=mateIn(new Chess(game.fen()),cur.mi,Date.now()+4000)}catch(e){}}
 var show=function(m,how){if(m){hint=[m.from,m.to];view=fens.length-1;refresh();msg(how)}};
 if(m){show(m,how);return}
 var g0=game,n0=fens.length;msg("Stockfish is thinking…");
 engMove(game,SFCFG.hintMs,function(m){if(game!==g0||fens.length!==n0||over)return;show(m,"Stockfish 19 suggests – follow the arrow")});
}
// ---------- scoring ----------
var LOG=[];try{LOG=JSON.parse(sessionStorage.getItem("cet_log")||"[]")}catch(e){}
function catName(k){k=String(k);return k.charAt(0)=="m"?"Checkmate in "+k.slice(1).split("_")[0]:D[+k.split(".")[0]][0]}
function log(res,why){
 if(!cur||!cur.att||mode!="puzzle")return;cur.att=false;cur.lastRes=res;
 LOG.push({t:Date.now(),key:cur.key,label:cur.label,cat:catName(cur.key),sub:subName(cur.key),goal:cur.draw?"draw":cur.mi?"mate in "+cur.mi:"win",res:res,why:why||"",moves:nUser,secs:Math.round((Date.now()-cur.t0)/1000)});
 try{var _lx=LOG[LOG.length-1];MC64.rec("e",Object.assign({},_lx,{rp:(cur.draw?1400:cur.mi>0?Math.min(2000,800+90*cur.mi):1200)}))}catch(e){}
  try{sessionStorage.setItem("cet_log",JSON.stringify(LOG))}catch(e){}pill();
}
function finishPrev(){if(cur&&mode=="puzzle"&&cur.att&&nUser>0&&!over)log("incorrect","left unfinished");if(cur)cur.att=false}
function scoreStats(){var a=LOG.length,c=LOG.filter(function(x){return x.res=="correct"}).length,t=0;LOG.forEach(function(x){t+=x.secs});return{a:a,c:c,i:a-c,p:a?Math.round(100*c/a):0,avg:a?Math.round(t/a):0}}
function pill(){var e=$("#pill");if(e){var s=scoreStats();e.textContent="✓"+s.c+"  ✗"+s.i+" · "+s.p+"%"+(window.MC64?" · MCR "+MC64.phaseRating("e"):"")}}
function solvedSet(){var o={};LOG.forEach(function(x){if(x.res=="correct")o[x.key]=x});return o}
function unsolved(){var ok=solvedSet(),o={};LOG.forEach(function(x){if(!ok[x.key])o[x.key]=x});return Object.keys(o).map(function(k){return o[k]})}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function byCat(){var o={};LOG.forEach(function(x){var c=o[x.cat]||(o[x.cat]={c:0,i:0});x.res=="correct"?c.c++:c.i++});return o}
function scorePage(){
 finishPrev();var s=scoreStats(),h='<div class="phead"><h1>📊 Session score</h1><button class="btn pri" data-a="rep2">📄 Get Report</button></div><div class="card" style="display:flex;gap:30px;flex-wrap:wrap"><div><small class="mu">MyChess64 Rating · Endgame</small><div style="font-size:30px;font-weight:700;color:#fff" data-mcr="e">'+MC64.phaseRating("e")+'</div></div><div><small class="mu">Overall MCR</small><div style="font-size:30px;font-weight:700;color:#fff" data-mcr="all">'+MC64.state().rating+'</div></div></div><div class="card">';
 if(!s.a){h+='<p class="mu">No attempts yet. Solve a puzzle and your results will appear here. Scores are kept for this browser session.</p></div>';app.innerHTML=h;return}
 h+='<div class="sh"><div class="ring" style="--p:'+s.p+'"><b>'+s.p+'%</b><span>correct</span></div><div class="tiles"><div>Attempts<b>'+s.a+'</b></div><div class="g">Correct<b>'+s.c+'</b></div><div class="r">Incorrect<b>'+s.i+'</b></div><div>Avg. time<b>'+s.avg+'s</b></div></div></div>';
 h+='<div class="acts"><button class="btn" data-a="clr">Clear session</button></div></div>';
 var bc=byCat();h+='<div class="card"><h3>By category</h3>';
 Object.keys(bc).forEach(function(k){var c=bc[k],t=c.c+c.i;h+='<div class="cb"><span>'+esc(k)+'</span><span class="bar2"><u style="width:'+100*c.c/t+'%"></u></span><span>'+c.c+'/'+t+'</span></div>'});
 h+='</div>';
 var un=unsolved();
 if(un.length){h+='<div class="card"><h3>Not solved yet ('+un.length+')</h3><div class="grid cats">';un.slice(0,40).forEach(function(x){h+='<button class="btn" data-open="'+x.key+'">'+esc(x.label)+'<i>'+esc(x.goal)+'</i></button>'});h+='</div></div>'}
 h+='<div class="card"><h3>Recent attempts</h3>';
 LOG.slice(-30).reverse().forEach(function(x){h+='<div class="rl"><span class="ch '+(x.res=="correct"?"y":"n")+'">'+(x.res=="correct"?"✓":"✗")+'</span><span class="t"><b>'+esc(x.label)+'</b><small>'+esc(x.cat)+' · '+esc(x.goal)+(x.why?' · '+esc(x.why):'')+'</small></span><span>'+x.moves+' mv · '+x.secs+'s</span></div>'});
 app.innerHTML=h+'</div>';
}
function openKey(k){k=String(k);if(k.charAt(0)=="m"){var q=k.slice(1).split("_");mate(+q[0],+q[1])}else{var r=k.split(".");play(+r[0],+r[1],+r[2])}}
function askName(){
 var o=document.createElement("div");o.id="nm";
 o.innerHTML='<div class="card"><h3>Download PDF report</h3><p class="mu">Enter your name – it appears at the top of the report.</p><input type="text" id="nmi" maxlength="60" placeholder="Your name" autocomplete="name"><p id="nme" style="color:#f88;margin:2px 0 8px;font-size:13px;min-height:18px"></p><div class="acts"><button class="btn pri" data-a="dlp">⬇ Download PDF</button><button class="btn" data-a="nmx">Cancel</button></div></div>';
 document.body.appendChild(o);setTimeout(function(){$("#nmi").focus()},50);
}
function subName(k){k=String(k);if(k.charAt(0)=="m")return"";var q=k.split(".");return D[+q[0]]&&D[+q[0]][2][+q[1]]?D[+q[0]][2][+q[1]][0]:""}
function nameImg(name){
 var c=document.createElement("canvas"),x=c.getContext("2d");x.font="bold 100px system-ui,Arial,sans-serif";
 var w=Math.ceil(x.measureText(name).width)+40;c.width=w;c.height=140;x.font="bold 100px system-ui,Arial,sans-serif";x.fillStyle="#fff";x.textBaseline="middle";x.fillText(name,20,72);
 return{url:c.toDataURL("image/png"),r:w/140};
}
function gradeOf(p){return p>=95?["A+","Outstanding",[34,166,111]]:p>=85?["A","Excellent",[34,166,111]]:p>=70?["B","Good",[59,130,246]]:p>=55?["C","Fair",[245,166,35]]:p>=40?["D","Needs practice",[240,120,50]]:["F","Keep training",[229,83,83]]}
function buildPDF(name){
 var J=window.jspdf&&window.jspdf.jsPDF;if(!J)return null;
 var d=new J({unit:"mm",format:"a4"}),W=210,H=297,M=14,LIM=H-17,NAVY=[15,23,42],GR=[34,166,111],RED=[229,83,83],AMB=[245,166,35],BLU=[59,130,246],BG=[243,246,250],INK=[28,35,48],MUT=[105,116,132],LINE=[222,228,236],BRB=[10,108,245],TRK=[228,234,241];
 var s=scoreStats(),g=gradeOf(s.p),now=new Date();
 var F=function(c){d.setFillColor(c[0],c[1],c[2])},T=function(c){d.setTextColor(c[0],c[1],c[2])},DR=function(c){d.setDrawColor(c[0],c[1],c[2])};
 var tx=function(t,x,y,sz,b,c,o){d.setFont("helvetica",b?"bold":"normal");d.setFontSize(sz);T(c||INK);d.text(String(t),x,y,o)};
 var clean=function(t){return String(t).replace(/[^\x20-\x7E]/g,"-").replace(/-{2,}/g,"-")};
 var fit=function(t,w,sz,b){t=clean(t);d.setFont("helvetica",b?"bold":"normal");d.setFontSize(sz);if(d.getTextWidth(t)<=w)return t;while(t.length>1&&d.getTextWidth(t+"...")>w)t=t.slice(0,-1);return t+"..."};
 var ctr=function(t,x,y,sz,b,c,cs){d.setFont("helvetica",b?"bold":"normal");d.setFontSize(sz);var w=d.getTextWidth(t)+cs*(t.length-1);tx(t,x-w/2,y,sz,b,c,cs?{charSpace:cs}:undefined)};
 var pn=clean(name)||"Player",pc=function(a,b){return b?Math.round(100*a/b):0},pcol=function(p){return p>=70?GR:p>=40?AMB:RED};
 var topBand=function(){F(NAVY);d.rect(0,0,W,12,"F");F(BRB);d.rect(0,12,W,.8,"F");d.addImage(PDFLOGO,"PNG",M,2.2,7.4*PDFLOGO_R,7.4);tx(fit(pn,90,8.5,1),W-M,7.7,8.5,1,[255,255,255],{align:"right"})};
 var page=function(){d.addPage();topBand();return 22};
 var need=function(y,h){return y+h>LIM?page():y};
 var sec=function(t,y){F(BRB);d.rect(M,y-5.4,1.6,7.6,"F");tx(t,M+4.5,y,15,1,NAVY);return y+8};
 // ===== PAGE 1 =====
 for(var i=0;i<48;i++){var k=i/47;F([Math.round(12+15*k),Math.round(20+42*k),Math.round(40+62*k)]);d.rect(0,i,W,1.2,"F")}
 F(BRB);d.rect(0,47,W,1.6,"F");
 d.addImage(PDFLOGO,"PNG",(W-10*PDFLOGO_R)/2,4.5,10*PDFLOGO_R,10);
 var ni=nameImg(name),nh=13,nw=nh*ni.r;if(nw>176){nw=176;nh=nw/ni.r}
 d.addImage(ni.url,"PNG",(W-nw)/2,19+(13-nh)/2,nw,nh);
 ctr("ENDGAME PERFORMANCE REPORT   |   "+now.toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"}).toUpperCase(),W/2,39,9.5,0,[190,205,225],1.2);
 // overall card
 var y=55;F(BG);d.roundedRect(M,y,W-2*M,50,4,4,"F");
 var cx=M+28,cy=y+25,ring=function(r,p,col){var a1=-90+360*Math.min(p,100)/100;F(col);DR(col);d.setLineWidth(.15);for(var a=-90;a<a1;a+=2){var b=Math.min(a+2.4,a1),A=a*Math.PI/180,B=b*Math.PI/180;d.triangle(cx,cy,cx+r*Math.cos(A),cy+r*Math.sin(A),cx+r*Math.cos(B),cy+r*Math.sin(B),"FD")}};
 ring(21,100,TRK);if(s.p>0)ring(21,s.p,g[2]);F(BG);d.circle(cx,cy,14.2,"F");
 ctr(s.p+"%",cx,cy+2.6,21,1,NAVY,0);ctr("CORRECT",cx,cy+9,7.5,1,MUT,.7);
 var gx=M+76;F(g[2]);d.circle(gx,cy-2,14,"F");F([255,255,255]);d.circle(gx,cy-2,10.8,"F");ctr(g[0],gx,cy+5.8,26,1,g[2],0);ctr("GRADE",gx,cy+19.5,7.5,1,MUT,.9);
 var vx=M+100;tx(g[1],vx,y+15,18,1,g[2]);
 var bc=byCat(),ks=Object.keys(bc).map(function(k){var c=bc[k];return{k:k,c:c.c,i:c.i,t:c.c+c.i,p:c.c/(c.c+c.i)}}),txt="You made "+s.a+" attempt"+(s.a==1?"":"s")+" and solved "+s.c+" correctly.";
 if(ks.length>1){var so=ks.slice().sort(function(a,b){return b.p-a.p||b.t-a.t});txt+=" Strongest: "+so[0].k+". Most practice needed: "+so[so.length-1].k+"."}
 d.setFont("helvetica","normal");d.setFontSize(10.5);T(INK);d.text(d.splitTextToSize(clean(txt),W-M-vx-5),vx,y+23,{lineHeightFactor:1.35});
 // KPI tiles
 y=111;var kp=[["Attempts",s.a,NAVY],["Correct",s.c,GR],["Incorrect",s.i,RED],["Avg. time",s.avg+"s",BLU]],kw=(W-2*M-12)/4;
 kp.forEach(function(k,i){var x=M+i*(kw+4);F([255,255,255]);DR(LINE);d.setLineWidth(.35);d.roundedRect(x,y,kw,22,3,3,"FD");F(k[2]);d.roundedRect(x,y,2.4,22,1.2,1.2,"F");ctr(String(k[1]),x+kw/2+1.2,y+12.2,20,1,k[2],0);ctr(k[0].toUpperCase(),x+kw/2+1.2,y+18.6,7.5,1,MUT,.7)});
 // sequence strip
 y=140;tx("ATTEMPT SEQUENCE",M,y,8,1,MUT,{charSpace:.8});
 var sq=LOG.slice(-60),sg=.8,sw=Math.min(7,((W-2*M)-sg*(sq.length-1))/sq.length);
 sq.forEach(function(x,i){F(x.res=="correct"?GR:RED);d.roundedRect(M+i*(sw+sg),y+2.6,sw,6,1,1,"F")});
 tx(LOG.length>60?"last 60 of "+LOG.length:"oldest to newest",W-M,y,8,0,MUT,{align:"right"});
 // category chart
 y=sec("Performance by category",163);
 var ord=ks.slice().sort(function(a,b){return b.t-a.t||(a.k<b.k?-1:1)}),shown=ord.slice(0,12),barX=M+48,barW=W-M-34-barX,rh=8.4;
 F(GR);d.rect(W-M-62,y-12.3,3,3,"F");tx("Correct",W-M-57.5,y-9.6,8,0,MUT);F(RED);d.rect(W-M-36,y-12.3,3,3,"F");tx("Incorrect",W-M-31.5,y-9.6,8,0,MUT);
 var y0=y+1,y1=y0+shown.length*rh;DR(LINE);d.setLineWidth(.25);
 [0,25,50,75,100].forEach(function(q){var gx2=barX+barW*q/100;d.line(gx2,y0-1,gx2,y1-1.2);tx(q+"%",gx2,y0-2.2,7,0,MUT,{align:"center"})});
 shown.forEach(function(k,i){var yy=y0+i*rh+5.6,pr=Math.round(100*k.c/k.t);
  tx(fit(k.k,46,10.5,1),M,yy,10.5,1,INK);
  F(TRK);d.rect(barX,yy-4,barW,4.8,"F");if(k.c){F(GR);d.rect(barX,yy-4,barW*k.c/k.t,4.8,"F")}if(k.i){F(RED);d.rect(barX+barW*k.c/k.t,yy-4,barW*k.i/k.t,4.8,"F")}
  tx(pr+"%",W-M,yy,11,1,pcol(pr),{align:"right"});tx(k.c+"/"+k.t,W-M-13,yy,9,0,MUT,{align:"right"})});
 if(ord.length>shown.length)tx("+ "+(ord.length-shown.length)+" more categories - see Topic breakdown",M,y1+4.5,8.5,0,MUT);
 // ===== PAGE 2: ATTEMPTS HISTORY =====
 var table=function(cols,rows,yy,cell){
  var hh=function(){F(NAVY);d.roundedRect(M,yy-5.6,W-2*M,8.2,1.5,1.5,"F");var x=M+3;cols.forEach(function(c){tx(c[0].toUpperCase(),x,yy,8,1,[255,255,255],{charSpace:.4});x+=c[1]});yy+=9.2};
  yy=need(yy,26);hh();
  rows.forEach(function(r,i){if(yy+7>LIM){yy=page();hh()}if(i%2==0){F([246,248,251]);d.rect(M,yy-5.6,W-2*M,8,"F")}var x=M+3;cols.forEach(function(c,j){cell(r,j,x,yy,c[1]);x+=c[1]});yy+=8});
  return yy+3;
 };
 y=page()+6;y=sec("Attempts History",y);
 y=table([["#",10],["Time",24],["Category / Topic",64],["Goal",26],["Result",28],["Moves",15],["Secs",15]],LOG,y,function(r,j,x,yy,w){
  var i=LOG.indexOf(r);
  if(j==0)tx(i+1,x,yy,9.5,0,MUT);
  if(j==1)tx(new Date(r.t).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}),x,yy,9.5,0,MUT);
  if(j==2){var sn=r.sub||subName(r.key);tx(fit(r.cat+(sn?" > "+sn:""),w-3,9.5,0),x,yy,9.5,0,INK)}
  if(j==3)tx(fit(r.goal,w-2,9.5,0),x,yy,9.5,0,INK);
  if(j==4){var ok=r.res=="correct";F(ok?GR:RED);d.roundedRect(x-.5,yy-4.1,ok?21:24,5.6,2.8,2.8,"F");ctr(ok?"CORRECT":"INCORRECT",x-.5+(ok?10.5:12),yy-.15,7.5,1,[255,255,255],0)}
  if(j==5)tx(r.moves,x,yy,9.5,0,INK);if(j==6)tx(r.secs,x,yy,9.5,0,INK)});
 // topic breakdown
 var tp={};LOG.forEach(function(x){var sn=x.sub||subName(x.key);if(!sn)return;var kk=x.cat+"|"+sn,o=tp[kk]||(tp[kk]={cat:x.cat,sub:sn,c:0,i:0});x.res=="correct"?o.c++:o.i++});
 var tl=Object.keys(tp).map(function(k){return tp[k]}).sort(function(a,b){return a.cat<b.cat?-1:a.cat>b.cat?1:a.sub<b.sub?-1:1});
 if(tl.length){y=sec("Topic breakdown",need(y,34)+5);
  y=table([["Category",44],["Topic",62],["Attempts",24],["Correct",22],["Accuracy",30]],tl,y,function(r,j,x,yy,w){var t=r.c+r.i,p=pc(r.c,t);
   if(j==0)tx(fit(r.cat,w-3,9.5,1),x,yy,9.5,1,INK);if(j==1)tx(fit(r.sub,w-3,9.5,0),x,yy,9.5,0,INK);if(j==2)tx(t,x,yy,9.5,0,INK);if(j==3)tx(r.c,x,yy,9.5,1,GR);if(j==4)tx(p+"%",x,yy,9.5,1,pcol(p))})}
 // focus areas
 var weak=ks.filter(function(k){return k.p<.6}).sort(function(a,b){return a.p-b.p});
 y=sec("Focus areas",need(y,30)+5);
 if(weak.length)weak.forEach(function(k){y=need(y,9);F(RED);d.circle(M+2,y-1.4,1.5,"F");tx(fit(k.k+": "+Math.round(k.p*100)+"% correct over "+k.t+" attempt"+(k.t==1?"":"s")+" - practise these again.",W-2*M-8,10.5,0),M+7,y,10.5,0,INK);y+=7.5});
 else{F(GR);d.circle(M+2,y-1.4,1.5,"F");tx(s.a?"No weak areas - every category is at 60% or above. Keep it up!":"No attempts recorded.",M+7,y,10.5,0,INK);y+=7.5}
 // not solved
 var un=unsolved();
 y=sec("Puzzles not solved ("+un.length+")",need(y,34)+5);
 if(un.length)y=table([["Category",40],["Topic",58],["Goal",30],["Reason",54]],un,y,function(r,j,x,yy,w){var t=[r.cat,r.sub||subName(r.key)||"-",r.goal,r.why||"-"][j];tx(fit(t,w-3,9.5,j==0),x,yy,9.5,j==0,INK)});
 else{tx("None - everything you attempted was solved.",M+7,y,10.5,0,INK);y+=8}
 // footer
 var n=d.getNumberOfPages();
 for(var p=1;p<=n;p++){d.setPage(p);DR(LINE);d.setLineWidth(.3);d.line(M,H-12,W-M,H-12);tx("MyChess64 Endgame Training  |  "+fit(pn,60,8,0),M,H-7,8,0,MUT);tx("Page "+p+" of "+n,W-M,H-7,8,0,MUT,{align:"right"})}
 return d;
}
async function savePDF(name){
 var d=buildPDF(name);if(!d){alert("The PDF library could not be loaded. Check your connection and try again.");return}
 var fn="Endgame-Report-"+name.replace(/[^\w\-]+/g,"_").slice(0,30)+".pdf",buf=d.output("arraybuffer"),dl=null;
 try{dl=window.claude&&await claude.use("downloads")}catch(e){}
 if(dl){try{await dl.save({filename:fn,data:buf})}catch(e){if(e&&e.code!="declined")alert("Could not save the PDF ("+(e.code||"error")+").")}return}
 try{d.save(fn)}catch(e){alert("Downloads are not available in this view. Open the page directly in claude.ai to save the PDF.")}
}
// ---------- drawer ----------
function drawer(o){var d=$("#dw");if(o===false){d.classList.remove("on");return}buildDrawer();d.classList.add("on")}
function buildDrawer(){
 var h='<div class="dh"><b>All puzzles</b><button class="btn" data-a="dclose">✕</button></div><div class="acts" style="margin-bottom:6px"><button class="btn" data-go="home">🏠 Home</button><button class="btn" data-go="score">📊 Score</button><button class="btn" data-go="set">⚙</button></div><div class="mu" style="margin:10px 2px 6px">Checkmate in…</div><div class="grid mn" style="margin-bottom:10px">';
 for(var n=1;n<=10;n++)h+='<button class="btn" data-mate="'+n+'">'+n+'</button>';
 h+='</div>';
 D.forEach(function(c,ci){var p=catP(ci);h+='<details class="dc"><summary><span>'+c[0]+'</span><span class="mu">'+p[0]+'/'+p[1]+'</span></summary>';
  c[2].forEach(function(s,si){h+='<details class="ds" data-ci="'+ci+'" data-si="'+si+'"><summary><span>'+s[0]+'</span><span class="mu">'+subP(ci,si)+'/'+s[1].length+'</span></summary><div class="grid dn"></div></details>'});
  h+='</details>'});
 $("#dwc").innerHTML=h;
 if(cur&&/^\d+\.\d+\.\d+$/.test(String(cur.key))){var q=cur.key.split("."),el=$('#dwc .ds[data-ci="'+q[0]+'"][data-si="'+q[1]+'"]');if(el){el.parentNode.open=true;el.open=true;fillD(el);setTimeout(function(){var c=el.querySelector(".cur");if(c)c.scrollIntoView({block:"center"})},30)}}
}
function fillD(el){var g=el.querySelector(".dn");if(g.dataset.f)return;g.dataset.f=1;var ci=+el.dataset.ci,si=+el.dataset.si,h="";
 D[ci][2][si][1].forEach(function(x,gi){var k=ci+"."+si+"."+gi;h+='<button class="btn'+(done(k)?' done':'')+(cur&&cur.key==k?' cur':'')+'" data-lv="'+k+'">'+(gi+1)+'</button>'});g.innerHTML=h}
document.addEventListener("toggle",function(e){var t=e.target;if(t.classList&&t.classList.contains("ds")&&t.open)fillD(t)},true);
$("#dw").addEventListener("click",function(e){if(e.target==this)drawer(false)});
// ---------- events ----------
var PAGES={score:scorePage,home:home,set:settings,about:about,ana:function(){startPos({fen:"8/8/8/4k3/8/8/4P3/4K3 w - - 0 1",free:1,label:"Analysis board",bk:home})}};
function nav(p){finishPrev();PAGES[p]();window.scrollTo(0,0);document.querySelectorAll("nav button").forEach(function(b){b.classList.toggle("on",b.dataset.go==p)})}
document.addEventListener("click",function(e){
 var t=e.target.closest("[data-go],[data-cat],[data-sub],[data-lv],[data-mate],[data-flt],[data-a],[data-ply],[data-open],[data-bt],[data-lvl],[data-nextun],#cont,#daily,#rnd,#rnu,#myl,#reset,#logo");if(!t)return;
 var d=t.dataset;
 if(t.closest("#dw")&&(d.lv||d.mate||d.go))drawer(false);
 if(d.go){nav(d.go);return}
 if(t.id=="logo"){nav("home");return}
 if(d.cat!=null){cat(+d.cat);return}
 if(d.sub){var p=d.sub.split(".");lv(+p[0],+p[1]);return}
 if(d.lv){var q=d.lv.split(".");play(+q[0],+q[1],+q[2]);return}
 if(d.mate){mate(+d.mate);return}
 if(d.flt){FLT=d.flt;lv(S.cur.ci,S.cur.si);return}
 if(d.open){openKey(d.open);return}
 if(d.bt!=null){S.s.board=+d.bt;save();settings();return}
 if(d.lvl!=null){S.s.lvl=+d.lvl;save();settings();return}
 if(d.nextun){var nq=d.nextun.split(".");nextUnsolved(+nq[0],+nq[1]);return}
 if(d.a){act(d.a);return}
 if(d.ply){go(+d.ply);return}
 if(t.id=="cont")cont();if(t.id=="daily")daily();if(t.id=="rnd")rnd(0);if(t.id=="rnu")rnd(1);if(t.id=="myl")myLevel();
 if(t.id=="reset"&&confirm("Reset all progress?")){S.p={};S.last=null;try{MC64.reset("e","p")}catch(e){}save();settings()}
});
document.addEventListener("change",function(e){
 var i=e.target.id;if(!i||i.indexOf("s_")!=0)return;var k=i.slice(2),v=e.target.type=="checkbox"?(e.target.checked?1:0):+e.target.value;S.s[k]=v;save();
});
document.addEventListener("keydown",function(e){if(e.key=="Enter"&&e.target.id=="nmi"){act("dlp");return}
 if(!fens||!$("#board")||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
 var k=e.key;if(k=="ArrowLeft"||k=="ArrowRight"||k=="Home"||k=="End"){e.preventDefault();go(k=="ArrowLeft"?view-1:k=="ArrowRight"?view+1:k=="Home"?0:fens.length-1)}});
try{MC64.seed("e",S.p,null)}catch(e){}
try{MC64.mount("e")}catch(e){}
try{SF.ready()}catch(e){}
nav("home");
