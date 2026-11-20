/* Opening puzzle set: game engine (board, levels, scoring, PDF report). */
var PZ=(function(){var b=atob(PZB),n=b.length,u=new Uint8Array(n);for(var i=0;i<n;i++)u[i]=b.charCodeAt(i);return pako.inflate(u,{to:"string"})})();PZB=null;
var TI={};TH.forEach(function(n,i){TI[n]=i});
try{var OPX=localStorage.getItem("opx2");if(OPX){var bs={};PZ.split("\n").forEach(function(l){bs[l.slice(0,l.indexOf("\t"))]=1});var okr=OPX.split("\n").filter(function(l){var f=l.split("\t");if(f.length!=6||bs[f[0]]||!/^\w+$/.test(f[0]))return false;if(f[1].split(" ").length!=4||f[1].indexOf("/")<1||f[2].split(" ").length<2||!(+f[3]>0))return false;bs[f[0]]=1;return true});if(okr.length)PZ+="\n"+okr.join("\n")}}catch(e){}
var P=PZ.split("\n").map(function(l){var f=l.split("\t");return{id:f[0],fen:f[1],mv:f[2],r:+f[3],lr:+f[4],t:f[5]?f[5].split(",").map(Number):[]}});PZ=null;
var LEVELS=[["Beginner",0,1200,"MCR below 1200","34,166,111","Spot the pattern: one clear idea, usually one or two moves."],["Intermediate",1200,1600,"MCR 1200–1599","59,130,246","The pattern hides behind a check, a capture or a defender."],["Advanced",1600,2000,"MCR 1600–1999","245,166,35","Longer lines, quiet moves and several defenders to handle."],["Expert",2000,9999,"MCR 2000+","229,83,83","Deep calculation: combine several ideas and test every defence."]];
function hasT(p,names){for(var i=0;i<names.length;i++){var k=TI[names[i]];if(k!==undefined&&p.t.indexOf(k)>-1)return true}return false}
function byR(x,y){return P[x].r-P[y].r}
function band(a,b){return a.filter(function(i){return P[i].r>=b[1]&&P[i].r<b[2]})}
var D=[],TM=[],BYT={};P.forEach(function(p,i){for(var k=0;k<p.t.length;k++){(BYT[p.t[k]]||(BYT[p.t[k]]=[])).push(i)}});
TOPICS.forEach(function(t){var a=[],i;
 if(t[1]=="*"){for(i=0;i<P.length;i++)a.push(i)}else{t[1].split("|").forEach(function(nm){var k=TI[nm];if(k!==undefined&&BYT[k])a=a.concat(BYT[k])})}
 if(a.length<8)return;a.sort(byR);D.push([t[0],"",LEVELS.map(function(b){return[b[0],band(a,b),b[3]]})]);TM.push(t)});
var FIRST={};D.forEach(function(c,ti){c[2].forEach(function(s,li){s[1].forEach(function(e,gi){var id=P[e].id;if(!FIRST[id])FIRST[id]=[ti,li,gi]})})});
var M=[];
var ICO=["wQ wR","wP","wB","wN","wN wB","wR wP","wR wB wN","wQ","wK"];
var S={p:{},last:null,rt:{r:1000,n:0,pk:1000},s:{board:0,hl:1,ev:0,co:1,snd:1,auto:0,lvl:1}};
try{var _t=JSON.parse(localStorage.getItem("opt1")||"null");if(_t){S.p=_t.p||{};S.last=_t.last;if(_t.rt)S.rt=_t.rt;for(var k in _t.s)S.s[k]=_t.s[k]}}catch(e){}
function save(){try{localStorage.setItem("opt1",JSON.stringify(S))}catch(e){}document.documentElement.dataset.board=S.s.board}
document.documentElement.dataset.board=S.s.board;
var app=document.getElementById("app");
function $(s){return document.querySelector(s)}
function pc(c){return '<div class="pc '+c+'"></div>'}
function done(k){return S.p[k]?1:0}
var AC=null;function snd(f){if(!S.s.snd)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();var o=AC.createOscillator(),g=AC.createGain();o.frequency.value=f;g.gain.value=.08;o.connect(g);g.connect(AC.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+.09);o.stop(AC.currentTime+.1)}catch(e){}}
function nth(k){for(var ci=0;ci<D.length;ci++)for(var si=0;si<D[ci][2].length;si++){var L=D[ci][2][si][1].length;if(k<L)return[ci,si,k];k-=L}}
// ---------- pages ----------
var CC=["34,166,111","245,166,35","167,108,240","59,130,246","236,92,138","240,120,58","20,184,196","229,83,83","212,175,55"];
var DESC=["Fundamental mates","Promote and outplay","Bishop endings","Knight endings","Minor-piece fights","Rook endings","Rook against minors","Queen endings","Famous positions"];
var FLT="all";
function mate(n,i){
 var L=M[n-1],t=0;if(i==null){do{i=Math.random()*L.length|0}while(done("m"+n+"_"+i)&&t++<90)}
 S.last={t:"m",n:n,i:i};save();
 startPos({fen:L[i],label:"Mate in "+n+" #"+(i+1),key:"m"+n+"_"+i,draw:0,mi:n,next:function(){mate(n)},bk:home});
}
var BT=[["Brown","#f0d9b5","#b58863"],["Green","#eeeed2","#769656"],["Blue","#dee3e6","#8ca2ad"],["Gray","#e8e8e8","#a0a0a0"]];
function tog(id,t,sub){return '<label class="trow"><span><b>'+t+'</b><small>'+sub+'</small></span><input type="checkbox" class="sw" id="s_'+id+'"></label>'}
function settings(){
 var h='<div class="phead"><h1>⚙ Settings</h1></div><div class="card"><h3>Board theme</h3><div class="swatches">';
 BT.forEach(function(b,i){h+='<button class="sw2'+(S.s.board==i?' on':'')+'" data-bt="'+i+'"><span class="b2" style="--l:'+b[1]+';--d:'+b[2]+'"><i></i><i></i><i></i><i></i></span>'+b[0]+'</button>'});
 h+='</div></div><div class="card"><h3>Gameplay</h3><div class="trow"><span><b>Engine strength</b><small>Used by the analysis board</small></span><span class="seg" style="margin:0">'+["Fast","Normal","Strong"].map(function(n,i){return'<button class="'+(S.s.lvl==i?'on':'')+'" data-lvl="'+i+'">'+n+'</button>'}).join("")+'</span></div>'
 +tog("hl","Show legal moves","Dots on the squares a piece can reach")+tog("co","Board coordinates","Letters and numbers on the board")+tog("ev","Evaluation bar","Engine estimate – may reveal the solution")+tog("auto","Auto-load next puzzle","Move on right after you solve one")+tog("snd","Sound","Move and result sounds")
 +'</div><div class="card"><h3>Data</h3><div class="acts"><button class="btn" id="reset">Reset progress</button><button class="btn" id="resetr">Reset rating</button><button class="btn" data-go="about">About &amp; credits</button></div></div>';
 app.innerHTML=h;["hl","co","ev","snd","auto"].forEach(function(k){$("#s_"+k).checked=!!S.s[k]});
}
function ac(t,p){return'<div class="card" style="margin:0"><h3>'+t+'</h3><p class="mu" style="margin:0">'+p+'</p></div>'}
// ---------- board UI ----------
var cur,game,fens,mvs,sans,view,user,flip,sel,mv,hint,busy,over,nUser,mode,drag,SC=0;
function startPos(o){
 finishPrev();cur=o;mode=o.free?"free":"puzzle";o.att=mode=="puzzle";o.t0=Date.now();o.lastRes=null;o.step=0;o.failed=false;o.hinted=false;document.querySelectorAll("nav button").forEach(function(b){b.classList.toggle("on",mode=="free"&&b.dataset.go=="ana")});
 var f=o.fen.split(" ").length<6?o.fen+" 0 1":o.fen;
 game=new Chess(f);if(!game.fen()||game.moves().length==0&&!o.free){}
 fens=[game.fen()];mvs=[o.first||null];sans=[];view=0;user=game.turn();flip=mode=="free"?false:user=="b";sel=null;mv=[];hint=null;busy=false;over=false;nUser=0;
 var side=user=="w"?"White":"Black";
 var goal=mode=="free"?"Analysis board":side+" to play – "+(o.need>1?"find "+o.need+" moves":"find the best move");
 window.scrollTo(0,0);drawer(false);
 app.innerHTML='<div class="gwrap"><div class="bcol"><div class="top"><button class="btn" data-a="drawer">☰ Puzzles</button><div class="gl"><small>'+(o.label||"")+'</small><b id="goal">'+goal+'</b></div>'+(mode=="free"?"":'<span class="pill" id="pill"></span>')+'</div><div class="bbox"><div id="eb"><div id="ebf"></div><span id="ebt"></span></div><div id="board"></div></div><div id="msg">Your move</div><div class="acts"><button class="btn" data-a="flip" aria-label="Flip">⇅</button><button class="btn" data-a="un">↶ Undo</button><button class="btn" data-a="hint">💡 Hint</button>'+(mode=="free"?'<button class="btn" data-a="eng">⚙ Engine</button>':'<button class="btn" data-a="rs" aria-label="Restart">↻</button><button class="btn pri" data-a="nx" style="flex:2">Next puzzle →</button>')+'</div></div><div class="side">'+panelHTML(o)+'</div></div>';
 clearInterval(TMR);TMR=setInterval(tick,1000);
 pill();refresh();
}

var TIPS=["Drive the enemy king to the edge with your pieces, then deliver mate. Always check for stalemate before you move.","Use the opposition: keep your king in front of the pawn and protect the squares ahead of it.","A bishop only controls one colour. Plan around the squares it can reach and keep your king close.","Knights move in L-shapes and are weak on the edge. Bring your king to help and avoid forks.","Minor pieces work best side by side. Look for forks, discovered checks and mating nets.","Cut the enemy king off along a rank or file, then advance the pawn. Remember the Lucena and Philidor ideas.","Use the rook to restrict the king and let the minor pieces cover the escape squares.","Take squares away with the queen, bring your king closer, and never give stalemate.","Study the idea behind the position – the same plan returns again and again."],TIP_M="Look at every forcing move first: checks, then captures, then threats. Count the king's escape squares.",TIP_F="Both sides can be moved here. Paste any FEN to explore a position, or ask the engine for a move.",TMR=null;
function fmt(t){return Math.floor(t/60)+":"+("0"+t%60).slice(-2)}
function tick(){var e=$("#st-time");if(!e){clearInterval(TMR);return}if(cur&&mode=="puzzle"&&!over)e.textContent=fmt(Math.round((Date.now()-cur.t0)/1000))}
function info(){var e=$("#st-mv");if(!e)return;var L=lim();e.textContent=nUser+(L?" / "+L:"");var t=$("#st-try");if(t)t.textContent=LOG.filter(function(x){return x.key==cur.key}).length+(over?0:1)}
function movesCard(){return'<div class="pcard"><div class="ph">Moves</div><div class="nav"><button class="btn" data-a="first">⏮</button><button class="btn" data-a="prev">◀</button><button class="btn" data-a="next">▶</button><button class="btn" data-a="last">⏭</button></div><div id="ml"></div></div>'}
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
function push(m){sans.push(m.san);fens.push(game.fen());mvs.push([m.from,m.to]);view=fens.length-1}
function status(){
 if(game.in_checkmate())msg((game.turn()=="w"?"Black":"White")+" wins by checkmate","ok");
 else if(game.in_stalemate())msg("Stalemate","bad");else if(game.in_draw())msg("Draw","bad");
 else msg((game.turn()=="w"?"White":"Black")+" to move"+(game.in_check()?" – check":""));
}
function check(){
 var r=null,L=lim();
 if(game.in_checkmate())r=game.turn()==user?"lost":"win";
 else if(game.game_over())r=cur.draw?"win":"draw";
 else if(cur.draw&&nUser>=25&&game.turn()==user)r="win";
 else if(L&&nUser>=L&&game.turn()==user)r="late";
 if(!r)return false;over=true;
 if(r=="win"){log("correct");msg(cur.draw?"Draw secured! 🎉":"Checkmate! 🎉","ok");S.p[cur.key]=1;save();snd(660);if(S.s.auto)setTimeout(cur.next,1300)}
 else{log("incorrect",r=="late"?"mate not delivered in time":r=="lost"?"got checkmated":"drawn, not won");msg(r=="late"?"Not checkmate within "+L+" move"+(L>1?"s":"")+" – press ↻ or Undo and try again.":r=="lost"?"You were checkmated. Press ↻ or Undo.":(game.in_stalemate()?"Stalemate – ":"Draw – ")+"not the win. Try again.","bad");}
 return true;
}
function reply(){
 var g0=game;busy=true;msg("Opponent is thinking…");
 setTimeout(function(){
  if(game!==g0)return;var m=search(game,[350,800,1700][S.s.lvl]);if(m){var mm=game.move(m);push(mm);snd(mm.captured?220:300)}
  busy=false;refresh();if(!check())msg("Your move");
 },30);
}
function evalBar(){
 var eb=$("#eb");if(!eb)return;eb.className=S.s.ev?"on":"";if(!S.s.ev)return;
 var f=fens[view],v=view,tok=(evalBar.t=(evalBar.t||0)+1);
 setTimeout(function(){
  if(tok!=evalBar.t||!$("#ebf"))return;var g=new Chess(f),sc;
  if(g.game_over())sc=g.in_checkmate()?(g.turn()=="w"?-MATE:MATE):0;else{search(g,250);sc=SC*(g.turn()=="w"?1:-1)}
  var w=100/(1+Math.exp(-sc/260)),t=g.game_over()?(g.in_checkmate()?(g.turn()=="w"?"0-1":"1-0"):"½"):Math.abs(sc)>MATE-100?"#"+(MATE-Math.abs(sc)+1>>1):(sc/100).toFixed(1);
  var ff=flip;$("#ebf").style.height=(ff?100-w:w)+"%";$("#ebf").style.background=ff?"#000":"#fff";$("#eb").style.background=ff?"#fff":"#000";$("#ebt").textContent=t;var se=$("#st-ev");if(se)se.textContent=t;$("#ebt").style[ff?"bottom":"top"]="2px";$("#ebt").style[ff?"top":"bottom"]="";
 },60);
}
function go(i){if(i<0||i>=fens.length)return;var y=window.scrollY;view=i;refresh();window.scrollTo(0,y)}
function act(a){
 if(a=="rep"||a=="rep2"){finishPrev();LOG.length?askName():nav("score")}
 if(a=="cpf"){copyText(fens[view]);var cb=document.querySelector("[data-a=cpf]");if(cb){var c0=cb.textContent;cb.textContent="Copied ✓";setTimeout(function(){cb.textContent=c0},1200)}}
 if(a=="ana"){cur.att=false;startPos({fen:fens[view],free:1,label:"Analysis",bk:home})}
if(a=="nmx"){var n=$("#nm");if(n)n.remove()}
 if(a=="clr"&&confirm("Clear this session's scores?")){LOG=[];try{sessionStorage.removeItem("opt_log")}catch(e){}scorePage()}
 if(a=="dlp"){var nm=$("#nmi").value.trim();if(!nm){$("#nme").textContent="Please enter your name.";return}$("#nm").remove();savePDF(nm)}
 if(a=="drawer")drawer();if(a=="dclose")drawer(false);if(a=="first")go(0);if(a=="prev")go(view-1);if(a=="next")go(view+1);if(a=="last")go(fens.length-1);
 if(a=="flip"){flip=!flip;refresh()}
 if(a=="rs")startPos(cur);if(a=="nx")cur.next();if(a=="bk"){cur.bk?cur.bk():home()}
 if(a=="un")undo();if(a=="hint")hintMove();
 if(a=="eng"&&!game.game_over()){var m=game.move(search(game,900));push(game.history({verbose:true}).pop());refresh();status()}
 if(a=="setfen"){var f=$("#fen").value.trim();var t=new Chess();if(f&&t.load(f))startPos({fen:t.fen(),free:1,label:"Analysis"});else msg("Invalid FEN","bad")}
}
// ---------- engine ----------
var VAL={p:100,n:320,b:330,r:500,q:900,k:0},MATE=100000,NODES,T0,LIM,ABORT;
function evalPos(g){
 var bd=g.board(),s=0,np=0,wk,bk;
 for(var r=0;r<8;r++)for(var f=0;f<8;f++){var p=bd[r][f];if(!p)continue;var v=VAL[p.type];
  if(p.type=="p"){var a=p.color=="w"?6-r:r-1;v+=a*a*5}else if(p.type=="k"){if(p.color=="w")wk=[r,f];else bk=[r,f]}else np++;
  s+=p.color=="w"?v:-v}
 var c=function(k){return 7-Math.abs(k[0]-3.5)-Math.abs(k[1]-3.5)};
 s+=(c(wk)-c(bk))*(np<6?8:3);
 var d=Math.max(Math.abs(wk[0]-bk[0]),Math.abs(wk[1]-bk[1]));
 if(s>250)s+=(8-d)*5;else if(s<-250)s-=(8-d)*5;
 return s;
}
function sc(m){return(m.captured?10*VAL[m.captured]-VAL[m.piece]:0)+(m.promotion?900:0)}
function nm(g,d,a,b,ply){
 if((++NODES&127)==0&&Date.now()-T0>LIM)ABORT=true;if(ABORT)return 0;
 if(g.insufficient_material())return 0;
 var ms=g.moves({verbose:true});
 if(!ms.length)return g.in_check()?-MATE+ply:0;
 if(d<=0){var e=evalPos(g);return g.turn()=="w"?e:-e}
 ms.sort(function(x,y){return sc(y)-sc(x)});
 var best=-Infinity;
 for(var i=0;i<ms.length;i++){g.move(ms[i]);var v=-nm(g,d-1,-b,-a,ply+1);g.undo();if(ABORT)return 0;
  if(v>best)best=v;if(v>a)a=v;if(a>=b)break}
 return best;
}
function search(g,lim){
 g=new Chess(g.fen());T0=Date.now();LIM=lim;ABORT=false;NODES=0;
 var ms=g.moves({verbose:true});if(!ms.length)return null;
 var bm=ms[0];SC=0;
 for(var d=1;d<=9;d++){
  var bv=-Infinity,cm=null,a=-Infinity;
  for(var i=0;i<ms.length;i++){g.move(ms[i]);var v=-nm(g,d-1,-Infinity,-a,1);g.undo();if(ABORT)break;if(v>bv){bv=v;cm=ms[i]}if(v>a)a=v}
  if(ABORT)break;bm=cm;SC=bv;ms.splice(ms.indexOf(cm),1);ms.unshift(cm);
  if(Math.abs(bv)>MATE-50)break;
 }
 return bm;
}
function mateIn(g,n,dl){
 if(Date.now()>dl)throw 1;
 var ms=g.moves({verbose:true});
 for(var i=0;i<ms.length;i++){
  g.move(ms[i]);var ok=false;
  if(g.in_checkmate())ok=true;
  else if(n>1&&!g.game_over()){ok=true;var rs=g.moves();for(var j=0;j<rs.length&&ok;j++){g.move(rs[j]);if(!mateIn(g,n-1,dl))ok=false;g.undo()}}
  g.undo();if(ok)return ms[i];
 }
 return null;
}
// ---------- scoring ----------
var LOG=[];try{LOG=JSON.parse(sessionStorage.getItem("opt_log")||"[]")}catch(e){}
function catName(k){k=String(k);return k.charAt(0)=="m"?"Checkmate in "+k.slice(1).split("_")[0]:D[+k.split(".")[0]][0]}
function finishPrev(){if(cur&&mode=="puzzle"&&cur.att&&nUser>0&&!over)log("incorrect","left unfinished");if(cur)cur.att=false}
function scoreStats(){var a=LOG.length,c=LOG.filter(function(x){return x.res=="correct"}).length,t=0;LOG.forEach(function(x){t+=x.secs});return{a:a,c:c,i:a-c,p:a?Math.round(100*c/a):0,avg:a?Math.round(t/a):0}}
function solvedSet(){var o={};LOG.forEach(function(x){if(x.res=="correct")o[x.key]=x});return o}
function unsolved(){var ok=solvedSet(),o={};LOG.forEach(function(x){if(!ok[x.key])o[x.key]=x});return Object.keys(o).map(function(k){return o[k]})}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function byCat(){var o={};LOG.forEach(function(x){var c=o[x.cat]||(o[x.cat]={c:0,i:0});x.res=="correct"?c.c++:c.i++});return o}
function scorePage(){
 finishPrev();var s=scoreStats(),h='<div class="phead"><h1>📊 Session score</h1><button class="btn pri" data-a="rep2">📄 Get Report</button></div><div class="card">';
 if(!s.a){h+='<p class="mu">No attempts yet. Solve a puzzle and your results will appear here. Scores are kept for this browser session.</p></div>';app.innerHTML=h;return}
 h+=ratingCard()+'<div class="sh"><div class="ring" style="--p:'+s.p+'"><b>'+s.p+'%</b><span>correct</span></div><div class="tiles"><div>Attempts<b>'+s.a+'</b></div><div class="g">Correct<b>'+s.c+'</b></div><div class="r">Incorrect<b>'+s.i+'</b></div><div>Avg. time<b>'+s.avg+'s</b></div></div></div>';
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
var PDFLOGO=null,PDFLOGO_R=3.2;
MC64UI.assetDataURL("assets/logo-pdf.png").then(function(u){PDFLOGO=u}).catch(function(){});
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
 ctr("OPENING PERFORMANCE REPORT   |   "+now.toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"}).toUpperCase(),W/2,39,9.5,0,[190,205,225],1.2);
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
 var r0=LOG.length?LOG[0].rb:S.rt.r,dr=S.rt.r-r0;tx("MyChess64 Rating  "+S.rt.r+"  ("+(dr>=0?"+":"")+dr+" this session)  |  "+rtTitle(S.rt.r),vx,y+46,9.5,1,NAVY);
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
 y=table([["#",10],["Time",22],["Category / Topic",60],["Goal",24],["Result",28],["Moves",13],["Secs",13],["MCR",12]],LOG,y,function(r,j,x,yy,w){
  var i=LOG.indexOf(r);
  if(j==0)tx(i+1,x,yy,9.5,0,MUT);
  if(j==1)tx(new Date(r.t).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}),x,yy,9.5,0,MUT);
  if(j==2){var sn=r.sub||subName(r.key);tx(fit(r.cat+(sn?" > "+sn:""),w-3,9.5,0),x,yy,9.5,0,INK)}
  if(j==3)tx(fit(r.goal,w-2,9.5,0),x,yy,9.5,0,INK);
  if(j==4){var ok=r.res=="correct";F(ok?GR:RED);d.roundedRect(x-.5,yy-4.1,ok?21:24,5.6,2.8,2.8,"F");ctr(ok?"CORRECT":"INCORRECT",x-.5+(ok?10.5:12),yy-.15,7.5,1,[255,255,255],0)}
  if(j==5)tx(r.moves,x,yy,9.5,0,INK);if(j==6)tx(r.secs,x,yy,9.5,0,INK);if(j==7&&r.d!=null)tx((r.d>0?"+":"")+r.d,x,yy,9.5,1,r.d>0?GR:r.d<0?RED:MUT)});
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
 for(var p=1;p<=n;p++){d.setPage(p);DR(LINE);d.setLineWidth(.3);d.line(M,H-12,W-M,H-12);tx("MyChess64 Opening Training  |  "+fit(pn,60,8,0),M,H-7,8,0,MUT);tx("Page "+p+" of "+n,W-M,H-7,8,0,MUT,{align:"right"})}
 return d;
}
async function savePDF(name){
 var d=buildPDF(name);if(!d){alert("The PDF library could not be loaded. Check your connection and try again.");return}
 var fn="Opening-Report-"+name.replace(/[^\w\-]+/g,"_").slice(0,30)+".pdf",buf=d.output("arraybuffer"),dl=null;
 try{dl=window.claude&&await claude.use("downloads")}catch(e){}
 if(dl){try{await dl.save({filename:fn,data:buf})}catch(e){if(e&&e.code!="declined")alert("Could not save the PDF ("+(e.code||"error")+").")}return}
 try{d.save(fn)}catch(e){alert("Downloads are not available in this view. Open the page directly in claude.ai to save the PDF.")}
}
// ---------- drawer ----------
function drawer(o){var d=$("#dw");if(o===false){d.classList.remove("on");return}buildDrawer();d.classList.add("on")}
function fillD(el){var g=el.querySelector(".dn");if(g.dataset.f)return;g.dataset.f=1;var ci=+el.dataset.ci,si=+el.dataset.si,h="";
 D[ci][2][si][1].forEach(function(x,gi){var k=ci+"."+si+"."+gi;h+='<button class="btn'+(done(k)?' done':'')+(cur&&cur.key==k?' cur':'')+'" data-lv="'+k+'">'+(gi+1)+'</button>'});g.innerHTML=h}
document.addEventListener("toggle",function(e){var t=e.target;if(t.classList&&t.classList.contains("ds")&&t.open)fillD(t)},true);
$("#dw").addEventListener("click",function(e){if(e.target==this)drawer(false)});
// ---------- events ----------
var PAGES={score:scorePage,home:home,set:settings,about:about,ana:function(){startPos({fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",free:1,label:"Analysis board",bk:home})}};
function nav(p){finishPrev();PAGES[p]();window.scrollTo(0,0);document.querySelectorAll("nav button").forEach(function(b){b.classList.toggle("on",b.dataset.go==p)})}
document.addEventListener("click",function(e){
 var t=e.target.closest("[data-go],[data-cat],[data-sub],[data-lv],[data-mate],[data-flt],[data-a],[data-ply],[data-open],[data-pg],[data-topic],[data-lvsw],[data-bt],[data-lvl],[data-nextun],#cont,#daily,#rnd,#rnu,#myl,#resetr,#reset,#logo");if(!t)return;
 var d=t.dataset;
 if(t.closest("#dw")&&(d.lv||d.sub||d.go||d.cat!=null))drawer(false);
 if(d.go){nav(d.go);return}
 if(t.id=="logo"){nav("home");return}
 if(d.cat!=null){cat(+d.cat);return}
 if(d.sub){var p=d.sub.split(".");lv(+p[0],+p[1]);return}
 if(d.lv){var q=d.lv.split(".");play(+q[0],+q[1],+q[2]);return}
 if(d.mate){mate(+d.mate);return}
 if(d.flt){FLT=d.flt;LPG=0;lv(S.cur.ci,S.cur.si);return}
 if(d.lvsw){var sw=d.lvsw.split(".");if(!(cur&&cur.ti==+sw[0]&&cur.lv==+sw[1]))nextUnsolved(+sw[0],+sw[1]);return}
 if(d.pg){lv(S.cur.ci,S.cur.si,LPG+(d.pg=="n"?1:-1));return}
 if(d.open){openKey(d.open);return}
 if(d.bt!=null){S.s.board=+d.bt;save();settings();return}
 if(d.lvl!=null){S.s.lvl=+d.lvl;save();settings();return}
 if(d.nextun){var nq=d.nextun.split(".");nextUnsolved(+nq[0],+nq[1]);return}
 if(d.a){act(d.a);return}
 if(d.ply){go(+d.ply);return}
 if(t.id=="cont")cont();if(t.id=="daily")daily();if(t.id=="rnd")rnd(0);if(t.id=="rnu")rnd(1);if(t.id=="myl")myLevel();
 if(t.id=="reset"&&confirm("Reset all progress?")){S.p={};S.last=null;try{MC64.reset("o","p")}catch(e){}save();settings()}
if(t.id=="resetr"&&confirm("Reset your MyChess64 Rating to 1000?")){S.rt={r:1000,n:0,pk:1000};try{MC64.reset("o","r")}catch(e){}save();settings()}
});
document.addEventListener("change",function(e){
 var i=e.target.id;if(!i||i.indexOf("s_")!=0)return;var k=i.slice(2),v=e.target.type=="checkbox"?(e.target.checked?1:0):+e.target.value;S.s[k]=v;save();
});
document.addEventListener("keydown",function(e){if(e.key=="Enter"&&e.target.id=="nmi"){act("dlp");return}
 if(!fens||!$("#board")||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
 var k=e.key;if(k=="ArrowLeft"||k=="ArrowRight"||k=="Home"||k=="End"){e.preventDefault();go(k=="ArrowLeft"?view-1:k=="ArrowRight"?view+1:k=="Home"?0:fens.length-1)}});
// ===================== OPENING TRAINING (topics & levels) =====================
CC=["98,153,36","236,92,138","167,108,240","20,184,196","245,166,35","229,83,83","240,120,58","212,175,55"];
var THN={fork:"Fork",pin:"Pin",skewer:"Skewer",xRayAttack:"X-ray attack",discoveredAttack:"Discovered attack",discoveredCheck:"Discovered check",doubleCheck:"Double check",deflection:"Deflection",attraction:"Attraction",interference:"Interference",clearance:"Clearance",hangingPiece:"Hanging piece",trappedPiece:"Trapped piece",capturingDefender:"Capturing the defender",intermezzo:"Zwischenzug",sacrifice:"Sacrifice",quietMove:"Quiet move",defensiveMove:"Defensive move",kingsideAttack:"Kingside attack",queensideAttack:"Queenside attack",exposedKing:"Exposed king",attackingF2F7:"Attacking f2/f7",kingInCenter:"King in the center",kingCastled:"Castled king",earlyQueen:"Early queen move",structOpen:"Open Game (1.e4 e5) structure",structSicilian:"Sicilian structure",structSemiOpen:"French / Caro-Kann structure",structPirc:"Pirc / Modern structure",structQueenPawn:"Queen's Pawn (d4 d5) structure",structIndian:"Indian Defence structure",structFlank:"English / Flank structure",mateIn1:"Mate in 1",mateIn2:"Mate in 2",mateIn3:"Mate in 3",mateIn4:"Mate in 4",mateIn5:"Mate in 5",backRankMate:"Back-rank mate",smotheredMate:"Smothered mate",anastasiaMate:"Anastasia's mate",arabianMate:"Arabian mate",bodenMate:"Boden's mate",doubleBishopMate:"Double bishop mate",dovetailMate:"Dovetail mate",hookMate:"Hook mate",operaMate:"Opera mate",pillsburysMate:"Pillsbury's mate",epauletteMate:"Epaulette mate",advancedPawn:"Advanced pawn",promotion:"Promotion",underPromotion:"Under-promotion",enPassant:"En passant",castling:"Castling",zugzwang:"Zugzwang",collinearMove:"Collinear move",overloading:"Overloading"};
function thName(c){return THN[c]||c.replace(/([A-Z])/g," $1").toLowerCase()}
function themesHTML(t){var a=t.map(function(i){return TH[i]}).filter(function(x){return x}).slice(0,8);return a.length?a.map(function(c){return'<span class="chip g">'+esc(thName(c))+'</span>'}).join(""):'<span class="chip">Mixed tactic</span>'}
function stats(){var n=0;for(var i=0;i<P.length;i++)if(S.p[P[i].id])n++;return[n,P.length]}
function levStats(ti,li){var L=D[ti][2][li][1],n=0;L.forEach(function(e){if(S.p[P[e].id])n++});return[n,L.length]}
function topicStats(ti){var n=0,t=0;for(var li=0;li<4;li++){var s=levStats(ti,li);n+=s[0];t+=s[1]}return[n,t]}
function catP(ti){return topicStats(ti)}
function subP(ti,li){return levStats(ti,li)[0]}
function icons(ti){return TM[ti][3].split(" ").map(pc).join("")}
function topicCard(ti,i){
 var T=TM[ti],col=CC[T[2]],st=topicStats(ti),pr=Math.round(100*st[0]/st[1]),dots="";
 D[ti][2].forEach(function(s,li){dots+='<i title="'+LEVELS[li][0]+': '+s[1].length+' puzzles" style="background:'+(s[1].length?'rgb('+LEVELS[li][4]+')':'#444')+'"></i>'});
 return'<button class="tc" data-cat="'+ti+'" style="--c:'+col+';--i:'+(i%12)+'"><span class="tcg"></span><div class="tct"><div class="ics">'+icons(ti)+'</div><span class="badge">'+pr+'%</span></div><b class="tn">'+esc(T[0])+'</b><span class="td">'+esc(T[4])+'</span><div class="tm"><span>'+st[0].toLocaleString()+' / '+st[1].toLocaleString()+' solved</span><span class="lvd">'+dots+'</span></div><div class="bar"><u style="width:'+pr+'%"></u></div></button>';
}
function home(){
 var st=stats(),pr0=Math.round(100*st[0]/st[1]);
 var h='<section class="hero2"><div class="hl"><span class="eyebrow">MYCHESS64 · OPENING TRAINING</span><h1>Sharpen your tactics.</h1><p>Find the best move in '+st[1].toLocaleString()+' real opening-phase positions – '+D.length+' topics from pins and forks to classic mating patterns – from the open Lichess puzzle database.</p><div class="cta"><button class="btn big" id="cont">▶ Continue</button><button class="btn" id="daily">📅 Daily</button><button class="btn" id="rnd">🎲 Random</button><button class="btn" id="myl">🎚 My level</button><button class="btn" id="rnu">🎯 Unsolved</button></div></div><div class="hr"><div class="ring big" style="--p:'+pr0+'"><b>'+pr0+'%</b><span>complete</span></div><div class="mini"><div><b data-mcr="o">'+S.rt.r+'</b>MyChess64 Rating</div><div><b style="font-size:17px" data-mcr-title="o">'+rtTitle(S.rt.r)+'</b>'+st[0].toLocaleString()+' / '+st[1].toLocaleString()+' solved</div></div></div></section>';
 CATN.forEach(function(cn,c){var ids=[];TM.forEach(function(T,ti){if(T[2]==c)ids.push(ti)});if(!ids.length)return;
  h+='<div class="sech"><h2>'+esc(cn)+'</h2><span class="mu">'+ids.length+' topic'+(ids.length>1?'s':'')+'</span></div><div class="tgrid">'+ids.map(topicCard).join("")+'</div>'});
 app.innerHTML=h;
}
function miniBoard(fen,from,to,flip){
 var g=new Chess(fen),bd=g.board(),h='<div class="mb">';
 for(var i=0;i<64;i++){var r=flip?7-(i>>3):i>>3,f=flip?7-(i&7):i&7,sq="abcdefgh"[f]+(8-r),p=bd[r][f];
  h+='<i class="'+((r+f)%2?"d":"l")+(sq==from?" f":sq==to?" t":"")+'">'+(p?pc(p.color+p.type.toUpperCase()):"")+'</i>'}
 var c=function(s){var f2="abcdefgh".indexOf(s[0]),r2=8-s[1];return[(flip?7-f2:f2)+.5,(flip?7-r2:r2)+.5]},A=c(from),B=c(to);
 return h+'<svg viewBox="0 0 8 8"><defs><marker id="ex" markerWidth="4" markerHeight="4" refX="2.5" refY="2" orient="auto"><path d="M0,0 L4,2 L0,4z" fill="#3692e7"/></marker></defs><line x1="'+A[0]+'" y1="'+A[1]+'" x2="'+B[0]+'" y2="'+B[1]+'" stroke="#3692e7" stroke-width=".2" opacity=".9" marker-end="url(#ex)"/></svg></div>';
}
function exampleHTML(ti){
 var li=0;while(li<3&&!D[ti][2][li][1].length)li++;
 var L=D[ti][2][li][1],p=null,best=1e9,mateTopic=/^Mate|Mate$/.test(TM[ti][0])||TM[ti][0]=="Mixed Tactics";
 for(var i=0;i<Math.min(L.length,200);i++){var q=P[L[i]];if(q.mv.split(" ").length!=2)continue;
  var sc=q.t.length+(!mateTopic&&hasT(q,["mateIn1","mateIn2","backRankMate","smotheredMate"])?6:0);if(sc<best){best=sc;p=q}}
 if(!p)p=P[L[0]];
 var ms=p.mv.split(" "),g=new Chess(p.fen+" 0 1");g.move({from:ms[0].slice(0,2),to:ms[0].slice(2,4),promotion:ms[0][4]});
 var side=g.turn()=="w"?"White":"Black",t=new Chess(g.fen()),m=t.move({from:ms[1].slice(0,2),to:ms[1].slice(2,4),promotion:ms[1][4]});
 return'<div class="exb"><div class="ph">🔎 Example</div>'+miniBoard(g.fen(),ms[1].slice(0,2),ms[1].slice(2,4),g.turn()=="b")+'<div class="cap">'+side+' to play – the winning idea is <b>'+(m?m.san:"")+'</b></div></div>';
}
function topicPage(ti){
 var T=TM[ti],col=CC[T[2]],rec=recLevel(ti),st=topicStats(ti);
 var h='<div class="chead" style="--c:'+col+'"><button class="btn" data-go="home">← Topics</button><div class="ics">'+icons(ti)+'</div><div class="ct"><span class="crumb2">'+esc(CATN[T[2]])+'</span><h1>'+esc(T[0])+'</h1><span class="mu">'+esc(T[4])+' · '+st[0].toLocaleString()+' / '+st[1].toLocaleString()+' solved</span></div><button class="btn pri" data-nextun="'+ti+'.'+rec+'">▶ Continue · '+LEVELS[rec][0]+'</button></div>';
 h+='<div class="learn" style="--c:'+col+'"><div class="lcard"><div class="ph">📖 Learn the pattern</div><h3>What is it?</h3><p>'+esc(T[5])+'</p><h3>How to spot it</h3><ul class="spot">'+T[6].map(function(x){return'<li>'+esc(x)+'</li>'}).join("")+'</ul><div class="remember"><b>Remember</b>'+esc(T[7])+'</div></div>'+exampleHTML(ti)+'</div>';
 h+='<div class="sech"><h2>Choose your level</h2><span class="mu">start easy, work your way up</span></div><div class="path">';
 LEVELS.forEach(function(L,li){var s=levStats(ti,li),ok=s[1]&&s[0]/s[1]>=0.7;h+='<div class="pn'+(ok?' ok':'')+(li==rec&&s[1]?' rec':'')+'" style="--l:'+L[4]+'"><i>'+(ok?'✓':li+1)+'</i>'+L[0]+'</div>'});
 h+='</div><div class="lvcards">';
 LEVELS.forEach(function(L,li){var s=levStats(ti,li),empty=!s[1],q=empty?0:Math.round(100*s[0]/s[1]);
  h+='<div class="lcd'+(empty?' off':'')+(li==rec&&!empty?' rec':'')+'" style="--l:'+L[4]+';--i:'+li+'">'+(li==rec&&!empty?'<span class="ribbon">For your rating</span>':'')+'<div class="lc-top"><span class="step">'+(li+1)+'</span><div><b>'+L[0]+'</b><small>'+L[3]+'</small></div></div><p>'+L[5]+'</p><div class="lc-m"><span>'+s[0].toLocaleString()+' / '+s[1].toLocaleString()+' solved</span><span>'+q+'%</span></div><div class="bar"><u style="width:'+q+'%"></u></div>'+(empty?'<div class="lc-a"><span class="mu">No puzzles at this level yet</span></div>':'<div class="lc-a"><button class="btn" data-sub="'+ti+'.'+li+'">☰ Puzzles</button><button class="btn pri" data-nextun="'+ti+'.'+li+'">▶ Start</button></div>')+'</div>'});
 app.innerHTML=h+'</div>';
}
function cat(ti){topicPage(ti)}
var LPG=0,PGN=100;
function lv(ti,li,pg){
 var s=D[ti][2][li],T=TM[ti],L=LEVELS[li],cs=levStats(ti,li),n=cs[0],t=cs[1],q=t?Math.round(100*n/t):0;
 if(!S.cur||S.cur.ci!=ti||S.cur.si!=li)LPG=0;if(pg!=null)LPG=pg;S.cur={ci:ti,si:li};
 var list=[];s[1].forEach(function(e,gi){var d=S.p[P[e].id];if(FLT=="new"&&d||FLT=="done"&&!d)return;list.push(gi)});
 var pages=Math.max(1,Math.ceil(list.length/PGN));if(LPG>=pages)LPG=pages-1;if(LPG<0)LPG=0;
 var h='<div class="chead" style="--c:'+L[4]+'"><button class="btn" data-cat="'+ti+'">← '+esc(T[0])+'</button><div class="ct"><span class="crumb2">'+esc(T[0])+' · Level '+(li+1)+' of 4</span><h1>'+L[0]+' <small class="mu" style="font-size:14px;font-weight:400">'+L[3]+'</small></h1><span class="mu">'+n.toLocaleString()+' / '+t.toLocaleString()+' solved</span><div class="bar" style="max-width:340px;margin-top:8px"><u style="width:'+q+'%"></u></div></div><button class="btn pri" data-nextun="'+ti+'.'+li+'">▶ Next unsolved</button></div>';
 h+='<div class="lvtabs">'+LEVELS.map(function(Lx,i){var ls=levStats(ti,i);return'<button class="lvt'+(i==li?' on':'')+'" style="--l:'+Lx[4]+'" data-sub="'+ti+'.'+i+'"'+(ls[1]?'':' disabled')+'><b>'+Lx[0]+'</b><small>'+ls[0]+' / '+ls[1].toLocaleString()+'</small></button>'}).join("")+'</div>';
 h+='<div class="lcard slim" style="--c:'+CC[T[2]]+'"><div><b>🎯 '+esc(T[0])+'</b> – '+esc(T[5])+'</div><details><summary>How to spot it</summary><ul class="spot">'+T[6].map(function(x){return'<li>'+esc(x)+'</li>'}).join("")+'</ul></details></div>';
 h+='<div class="seg" style="--c:'+L[4]+'">';
 [["all","All"],["new","Unsolved"],["done","Solved"]].forEach(function(f){h+='<button class="'+(FLT==f[0]?'on':'')+'" data-flt="'+f[0]+'">'+f[1]+'</button>'});
 h+='</div><div class="lgrid" style="--c:'+L[4]+'">';
 list.slice(LPG*PGN,(LPG+1)*PGN).forEach(function(gi,j){var p=P[s[1][gi]],d=S.p[p.id],mv=Math.ceil((p.mv.split(" ").length-1)/2);
  h+='<button class="lt'+(d?' done':'')+'" data-lv="'+ti+'.'+li+'.'+gi+'" style="--i:'+(j%30)+'"><span class="ln">'+(gi+1)+'</span><span class="ll">MCR '+p.r+'</span><span class="ll2">'+mv+' move'+(mv>1?'s':'')+'</span>'+(d?'<span class="ck">✓</span>':'')+'</button>'});
 h+='</div>';
 if(!list.length)h+='<p class="mu" style="text-align:center;margin-top:24px">Nothing to show with this filter.</p>';
 if(pages>1)h+='<div class="pager"><button class="btn" data-pg="p"'+(LPG==0?' disabled':'')+'>‹ Prev</button><span class="mu">Page '+(LPG+1)+' / '+pages+'</span><button class="btn" data-pg="n"'+(LPG>=pages-1?' disabled':'')+'>Next ›</button></div>';
 app.innerHTML=h;
}
function nextUnsolved(ti,li){var L=D[ti][2][li][1];if(!L.length)return;for(var g=0;g<L.length;g++)if(!S.p[P[L[g]].id]){play(ti,li,g);return}play(ti,li,0)}
function play(ti,li,gi){
 var s=D[ti][2][li],p=P[s[1][gi]],T=TM[ti],L=LEVELS[li];S.last={v:2,ci:ti,si:li,gi:gi};save();
 var nx=function(){var A=s[1];for(var j=1;j<=A.length;j++){var k=(gi+j)%A.length;if(!S.p[P[A[k]].id]){play(ti,li,k);return}}lv(ti,li)};
 var ms=p.mv.split(" "),g=new Chess(p.fen+" 0 1"),m0=g.move({from:ms[0].slice(0,2),to:ms[0].slice(2,4),promotion:ms[0][4]});
 var sol=ms.slice(1);
 startPos({fen:g.fen(),label:T[0]+" · "+L[0]+" #"+(gi+1),key:p.id,ctx:ti+"."+li+"."+gi,ti:ti,lv:li,sol:sol,first:[m0.from,m0.to],rating:p.r,themes:p.t,cat:CATN[T[2]],sub:T[0]+" · "+L[0],need:Math.ceil(sol.length/2),next:nx,bk:function(){lv(ti,li)}});
}
function playId(id){var f=FIRST[id];if(f)play(f[0],f[1],f[2])}
function rnd(un){var i,t=0;do{i=Math.random()*P.length|0}while(un&&S.p[P[i].id]&&t++<800);playId(P[i].id)}
function daily(){playId(P[(Math.floor(Date.now()/864e5)*7919)%P.length].id)}
function cont(){var l=S.last;if(l&&l.v==2&&D[l.ci]&&D[l.ci][2][l.si]&&D[l.ci][2][l.si][1].length)return play(l.ci,l.si,Math.min(l.gi,D[l.ci][2][l.si][1].length-1));daily()}
function openKey(k){k=String(k);var r=k.split(".");if(r.length==3)play(+r[0],+r[1],+r[2]);else playId(k)}
function lim(){return mode=="puzzle"&&cur&&cur.need?cur.need:0}
function keyInfo(o){
 var r=o.ctx.split(".").map(Number),A=D[r[0]][2][r[1]][1],i=r[2],chips=[],a=Math.max(0,Math.min(A.length-48,i-24));
 for(var j=a;j<Math.min(A.length,a+48);j++)chips.push([j,r[0]+"."+r[1]+"."+j,P[A[j]].id]);
 return{n:i+1,chips:chips,cur:i,tip:TM[r[0]][7]};
}
function panelHTML(o){
 var side=user=="w"?"White":"Black";
 if(o.free)return'<div class="pcard"><div class="ph">Analysis board</div><p class="mu" style="margin:0 0 10px">'+TIP_F+'</p><div class="acts"><input type="text" id="fen" style="flex:1;min-width:0" placeholder="Paste FEN"><button class="btn" data-a="setfen" style="flex:none">Set</button></div></div>'+movesCard()+'<div class="acts"><button class="btn" data-a="cpf">⧉ Copy FEN</button><button class="btn" data-a="drawer">☰ Topics</button><button class="btn" data-go="home">🏠 Home</button></div>';
 var I=keyInfo(o),T=TM[o.ti],col=CC[T[2]],L=LEVELS[o.lv];
 var h='<div class="pcard topicbox" style="--c:'+col+'"><div class="tb-row"><div class="ics">'+icons(o.ti)+'</div><div><div class="tb-k">TOPIC</div><div class="tb-v">'+esc(T[0])+'</div></div><div class="tb-lv" style="--l:'+L[4]+'"><div class="tb-k">LEVEL '+(o.lv+1)+' / 4</div><div class="tb-v">'+L[0]+'</div></div></div><div class="lvsw">'+LEVELS.map(function(Lx,i){var ls=levStats(o.ti,i);return'<button class="lp'+(i==o.lv?' on':'')+'" style="--l:'+Lx[4]+'" data-lvsw="'+o.ti+'.'+i+'" title="'+Lx[3]+'"'+(ls[1]?'':' disabled')+'>'+Lx[0]+'<small>'+ls[0]+'/'+ls[1].toLocaleString()+'</small></button>'}).join("")+'</div></div>';
 h+='<div class="pcard" style="--c:'+col+'"><h3 style="margin:0 0 10px">Puzzle '+I.n+'</h3><div class="chips2"><span class="chip">'+(user=="w"?"⚪":"⚫")+' '+side+' to play</span><span class="chip g">🎯 Find '+o.need+' move'+(o.need>1?'s':'')+'</span><span class="chip" style="background:rgba('+L[4]+',.25);color:#fff" title="Puzzle rating">Puzzle MCR '+o.rating+'</span>'+(S.p[o.key]?'<span class="chip ok">✓ Solved</span>':'')+'</div><div class="chips2" id="thm" style="margin-top:8px"><span class="chip">🔒 Theme shown after you solve it</span></div></div>';
 h+='<div class="tiles2"><div><small>Moves</small><b id="st-mv">0</b></div><div><small>Time</small><b id="st-time">0:00</b></div><div><small>Tries</small><b id="st-try">1</b></div><div><small>My MCR</small><b id="st-mcr" data-mcr="o">'+S.rt.r+'</b></div></div>'+movesCard();
 h+='<div class="pcard"><div class="ph">More in this level</div><div class="chipgrid" style="--c:'+L[4]+'">'+I.chips.map(function(c){return'<button class="'+(c[0]==I.cur?'cur':S.p[c[2]]?'done':'')+'" data-open="'+c[1]+'">'+(c[0]+1)+'</button>'}).join("")+'</div></div>';
 h+='<div class="pcard tip" style="--c:'+col+'"><div class="ph">💡 Remember</div><p>'+esc(I.tip)+'</p></div><div class="acts"><button class="btn" data-a="cpf">⧉ FEN</button><button class="btn" data-a="ana">🔬 Analyse</button><button class="btn" data-cat="'+o.ti+'">📖 Learn</button><button class="btn" data-go="home">🏠 Home</button></div>';
 return h;
}
function takeBack(){game.undo();sans.pop();fens.pop();mvs.pop();nUser=Math.max(0,nUser-1);view=fens.length-1;hint=null;sel=null;mv=[];refresh()}
function undo(){
 if(busy||!sans.length)return;
 if(mode=="free"){game.undo();sans.pop();fens.pop();mvs.pop();over=false;view=fens.length-1;hint=null;sel=null;mv=[];refresh();status();return}
 var n=game.turn()==user?2:1;
 while(n--&&sans.length){game.undo();sans.pop();fens.pop();mvs.pop()}
 over=false;cur.step=sans.length;nUser=Math.ceil(sans.length/2);view=fens.length-1;hint=null;sel=null;mv=[];refresh();msg("Your move");
}
function buildDrawer(){
 var h='<div class="dh"><b>All topics</b><button class="btn" data-a="dclose">✕</button></div><div class="acts" style="margin-bottom:8px"><button class="btn" data-go="home">🏠 Home</button><button class="btn" data-go="score">📊 Score</button><button class="btn" data-go="set">⚙</button></div>';
 var curT=cur&&cur.ti!=null?TM[cur.ti][2]:-1;
 CATN.forEach(function(cn,c){var ids=[];TM.forEach(function(T,ti){if(T[2]==c)ids.push(ti)});if(!ids.length)return;
  h+='<details class="dc"'+(c==curT?' open':'')+'><summary><span>'+esc(cn)+'</span><span class="mu">'+ids.length+'</span></summary><div style="padding:6px">';
  ids.forEach(function(ti){var st=topicStats(ti);h+='<button class="btn wide" data-cat="'+ti+'"><span>'+esc(TM[ti][0])+'</span><span class="mu">'+st[0].toLocaleString()+'/'+st[1].toLocaleString()+'</span></button>'});
  h+='</div></details>'});
 $("#dwc").innerHTML=h;
}
var OPXK="opx2",OPXO="opx2o";
function opxStruct(fen,ot){var o=(ot||[]).join(" "),m=[[/Sicilian/,"structSicilian"],[/French_Defense|Caro/,"structSemiOpen"],[/Pirc|Modern_Defense/,"structPirc"],[/Indian|Gr.nfeld|Benoni|Benko/,"structIndian"],[/Queens_Gambit|Slav|London|Colle|Catalan|Torre|Trompowsky|Queens_Pawn|Blackmar/,"structQueenPawn"],[/English|Reti|Zukertort|Bird|Larsen|Kings_Fianchetto/,"structFlank"],[/Italian|Ruy_Lopez|Scotch|Kings_Gambit|Philidor|Petrov|Russian|Vienna|Four_Knights|Three_Knights|Bishops_Opening|Danish|Ponziani|Center_Game|Latvian|Elephant|Kings_Pawn_Game/,"structOpen"]],i;
 for(i=0;i<m.length;i++)if(m[i][0].test(o))return m[i][1];
 var b={},r=fen.split(" ")[0].split("/"),x,y,c;for(y=0;y<8;y++){x=0;for(var k=0;k<r[y].length;k++){c=r[y][k];if(/\d/.test(c))x+=+c;else{b["abcdefgh"[x]+(8-y)]=c;x++}}}
 var p=function(q,ch){return b[q]==ch},wE=p("e4","P"),wD=p("d4","P"),bD5=p("d5","p");
 if(wE&&p("e5","p")&&!p("c5","p"))return"structOpen";
 if(wE&&p("c5","p")&&!p("c7","p"))return"structSicilian";
 if(wE&&bD5&&((p("e6","p")&&!p("e7","p"))||(p("c6","p")&&!p("c7","p")))&&!p("d7","p"))return"structSemiOpen";
 if(wE&&(p("d6","p")||p("g6","p"))&&!p("e5","p")&&!p("c5","p"))return"structPirc";
 if(wD&&bD5&&!wE)return"structQueenPawn";
 if(wD&&b.f6=="n"&&!bD5&&!wE)return"structIndian";
 if(!wE&&!wD&&(p("c4","P")||p("g3","P")||p("b3","P"))&&(p("e2","P")||p("e3","P"))&&(p("d2","P")||p("d3","P")))return"structFlank";
 return null}
function opxTags(fen,ot){var f=fen.split(" "),rows=f[0].split("/"),back=f[1]=="b"?rows[0]:rows[7],k=f[1]=="b"?"k":"K",q=f[1]=="b"?"q":"Q",sq=[],o=[],cr=f[2]||"-",hasC=f[1]=="b"?/[kq]/.test(cr):/[KQ]/.test(cr),ki;
 for(var i=0;i<back.length;i++){var c=back[i];if(/\d/.test(c))for(var j=0;j<+c;j++)sq.push(".");else sq.push(c)}
 ki=sq.indexOf(k);
 if(ki>-1&&[3,4,5].indexOf(ki)>-1)o.push(TI.kingInCenter);
 else if(ki>-1&&!hasC&&[0,1,2,6,7].indexOf(ki)>-1)o.push(TI.kingCastled);
 var mi=f[1]=="b"?["n","b"]:["N","B"],qOff=rows.join("").indexOf(q)>-1&&!(sq.length==8&&sq[3]==q),home=f[1]=="b"?[sq[1],sq[2],sq[5],sq[6]]:[sq[1],sq[2],sq[5],sq[6]];
 if(qOff&&home.some(function(h){return h==mi[0]||h==mi[1]}))o.push(TI.earlyQueen);
 var st=opxStruct(fen,ot);if(st)o.push(TI[st]);return o}
function opxCount(){try{var x=localStorage.getItem(OPXK);return x?x.split("\n").length:0}catch(e){return 0}}
function opxCard(){return'Load real puzzles that Lichess itself tagged <b>opening</b> (with opening names such as Sicilian or Italian) from the public Lichess dataset on Hugging Face. They are saved in this browser and added to every topic after a reload. Needs an internet connection. Stored so far: <b>'+opxCount().toLocaleString()+'</b>.<br><br><select id="opxn"><option value="500">500 puzzles</option><option value="2000" selected>2,000 puzzles</option><option value="5000">5,000 puzzles</option><option value="10000">10,000 puzzles</option></select> <button class="btn" onclick="opxLoad()">Download</button> <button class="btn" onclick="opxClear()">Clear</button><br><span id="opxs"></span>'}
function opxClear(){try{localStorage.removeItem(OPXK);localStorage.removeItem(OPXO)}catch(e){}location.reload()}
function opxSl(ms){return new Promise(function(r){setTimeout(r,ms)})}
async function opxLoad(){
 var n=+document.getElementById("opxn").value,st=document.getElementById("opxs"),have={},add=[],mode="filter",fails=0,off=0,roff=0;
 try{off=+localStorage.getItem(OPXO)||0}catch(e){}
 P.forEach(function(p){have[p.id]=1});
 var B="https://datasets-server.huggingface.co/",C="dataset=Lichess%2Fchess-puzzles&config=default&split=train",
 W=encodeURIComponent('"OpeningTags" IS NOT NULL AND "NbPlays">=100 AND "Popularity">=75');
 st.textContent="Connecting…";
 while(add.length<n&&fails<4){
  var url=mode=="filter"?B+"filter?"+C+"&where="+W+"&offset="+off+"&length=100":B+"rows?"+C+"&offset="+roff+"&length=100",j;
  try{var r=await fetch(url);if(!r.ok)throw new Error(r.status);j=await r.json()}
  catch(e){fails++;if(mode=="filter"&&fails>=2){mode="rows";fails=0;st.textContent="Filter search unavailable, scanning rows instead (slower)…"}await opxSl(1500);continue}
  if(!j.rows||!j.rows.length)break;
  j.rows.forEach(function(x){var q=x.row;if(have[q.PuzzleId])return;
   if(!((q.Themes||[]).indexOf("opening")>-1||(q.OpeningTags&&q.OpeningTags.length)))return;
   if(q.NbPlays<100||q.Popularity<75)return;
   var fen=q.FEN.split(" ").slice(0,4).join(" "),t=[];
   (q.Themes||[]).forEach(function(h){if(TI[h]!==undefined)t.push(TI[h])});
   opxTags(fen,q.OpeningTags).forEach(function(h){if(h!==undefined&&t.indexOf(h)<0)t.push(h)});
   have[q.PuzzleId]=1;add.push([q.PuzzleId,fen,q.Moves,q.Rating,q.Rating,t.join(",")].join("\t"))});
  if(mode=="filter")off+=100;else roff+=100;
  st.textContent="Downloaded "+Math.min(add.length,n).toLocaleString()+" of "+n.toLocaleString()+"…";
  await opxSl(120)}
 if(!add.length){st.textContent="Could not download puzzles (no connection or the service is busy). Try again later.";return}
 try{var old=localStorage.getItem(OPXK);localStorage.setItem(OPXK,(old?old+"\n":"")+add.slice(0,n).join("\n"));
  if(mode=="filter")localStorage.setItem(OPXO,off)}
 catch(e){st.textContent="Browser storage is full. Press Clear, then download fewer puzzles.";return}
 st.textContent="Added "+Math.min(add.length,n).toLocaleString()+" puzzles. Reloading…";setTimeout(function(){location.reload()},900)}

// ===================== MyChess64 Rating (MCR) =====================
if(!S.rt)S.rt={r:1000,n:0,pk:1000};
var TITLES=[[0,"Rookie"],[800,"Novice"],[1100,"Club player"],[1400,"Tactician"],[1700,"Expert"],[2000,"Master"],[2300,"Grandmaster"]];
function rtTitle(r){var t=TITLES[0][1];TITLES.forEach(function(x){if(r>=x[0])t=x[1]});return t}
function kF(n){return n<10?48:n<30?32:20}
function eloUpdate(pr,score){var R=S.rt,E=1/(1+Math.pow(10,(pr-R.r)/400)),d=Math.round(kF(R.n)*(score-E)),nr=Math.max(400,Math.min(3000,R.r+d));d=nr-R.r;R.r=nr;R.n++;if(nr>R.pk)R.pk=nr;return d}
function sgn(d){return(d>0?"+":"")+d}
function pill(){var e=$("#pill");if(e)e.textContent="MCR "+S.rt.r}
function log(res,why){
 if(!cur||!cur.att||mode!="puzzle")return;cur.att=false;cur.lastRes=res;
 var rb=S.rt.r,d=eloUpdate(cur.rating,res=="correct"?1:0);cur.lastDelta=d;save();
 LOG.push({t:Date.now(),key:cur.key,ctx:cur.ctx,label:cur.label,cat:cur.cat,sub:cur.sub,goal:cur.need+" move"+(cur.need>1?"s":""),res:res,why:why||"",moves:nUser,secs:Math.round((Date.now()-cur.t0)/1000),rb:rb,ra:S.rt.r,d:d,rp:cur.rating});
 try{MC64.rec("o",LOG[LOG.length-1])}catch(e){}
 try{sessionStorage.setItem("opt_log",JSON.stringify(LOG))}catch(e){}pill();var m=$("#st-mcr");if(m)m.textContent=S.rt.r;
}
function win(){
 over=true;busy=false;S.p[cur.key]=cur.failed?2:1;save();snd(660);
 var had=cur.att;log("correct");
 msg("🎉 Puzzle solved!"+(had&&cur.lastDelta!=null?" · MCR "+sgn(cur.lastDelta)+" → "+S.rt.r:cur.failed||cur.hinted?" (rating unchanged – already counted as a miss)":""),"ok");
 var t=$("#thm");if(t)t.innerHTML=themesHTML(cur.themes);
 if(S.s.auto)setTimeout(cur.next,1500);
}
function doMove(a,b,pr){
 var m=game.move({from:a,to:b,promotion:pr});if(!m)return;
 push(m);sel=null;mv=[];hint=null;nUser++;snd(m.captured?220:330);
 if(mode=="free"){refresh();status();return}
 var uci=a+b+(m.promotion||""),ok=uci==cur.sol[cur.step]||game.in_checkmate();
 refresh();
 if(!ok){
  var had=cur.att;cur.failed=true;log("incorrect","wrong move: "+m.san);busy=true;
  msg("✗ "+m.san+" is not the best move – try again"+(had&&cur.lastDelta!=null?" · MCR "+sgn(cur.lastDelta):""),"bad");var g0=game;
  setTimeout(function(){if(game!==g0)return;takeBack();busy=false;msg("Your move")},1100);return;
 }
 cur.step++;
 if(cur.step>=cur.sol.length||game.in_checkmate()){win();return}
 busy=true;msg("✓ Correct! Keep going…","ok");var g1=game;
 setTimeout(function(){
  if(game!==g1)return;var u=cur.sol[cur.step],mm=game.move({from:u.slice(0,2),to:u.slice(2,4),promotion:u[4]});
  push(mm);cur.step++;snd(300);busy=false;refresh();
  if(cur.step>=cur.sol.length||game.game_over())win();else msg("Your move – find the best move");
 },550);
}
function hintMove(){
 if(busy||over||game.game_over())return;
 if(mode=="free"){var m=search(game,1200);if(m){hint=[m.from,m.to];view=fens.length-1;refresh();msg("Engine suggestion")}return}
 var u=cur.sol[cur.step];if(!u)return;var had=cur.att;
 if(cur.att){cur.hinted=true;log("incorrect","hint used")}
 hint=[u.slice(0,2),u.slice(2,4)];view=fens.length-1;refresh();msg("Hint shown – this attempt counts as a miss"+(had&&cur.lastDelta!=null?" (MCR "+sgn(cur.lastDelta)+")":""),"bad");
}
function recLevel(ti){var r=S.rt.r,want=r<1200?0:r<1600?1:r<2000?2:3,best=-1,bd=9;for(var li=0;li<4;li++){if(!D[ti][2][li][1].length)continue;var d=Math.abs(li-want);if(d<bd){bd=d;best=li}}return best<0?0:best}
var PR=null;
function lowerB(x){var lo=0,hi=PR.length;while(lo<hi){var m=(lo+hi)>>1;if(P[PR[m]].r<x)lo=m+1;else hi=m}return lo}
function myLevel(){
 if(!PR)PR=P.map(function(_,i){return i}).sort(byR);
 var r=S.rt.r,w=100,pick=null;
 while(!pick&&w<=1600){var a=lowerB(r-w),b=lowerB(r+w);
  for(var t=0;t<300&&b>a;t++){var i=PR[a+Math.floor(Math.random()*(b-a))];if(!S.p[P[i].id]){pick=P[i].id;break}}
  w*=2}
 if(!pick)pick=P[PR[lowerB(r)]].id;playId(pick);
}
function ratingCard(){
 var r0=LOG.length?LOG[0].rb:S.rt.r,dr=S.rt.r-r0,pts=LOG.map(function(x){return x.ra}),svg="";
 if(pts.length>1){var mn=Math.min.apply(null,pts.concat([r0])),mx=Math.max.apply(null,pts.concat([r0])),rg=Math.max(20,mx-mn),all=[r0].concat(pts);
  svg='<svg viewBox="0 0 200 58" preserveAspectRatio="none"><polyline fill="none" stroke="#5aa2ff" stroke-width="2.5" stroke-linejoin="round" points="'+all.map(function(v,i){return(i*200/(all.length-1)).toFixed(1)+","+(52-(v-mn)/rg*46).toFixed(1)}).join(" ")+'"/></svg>'}
 return'<div class="rcard"><div><small>MyChess64 Rating</small><b>'+S.rt.r+'</b></div><div><span>'+rtTitle(S.rt.r)+' · peak '+S.rt.pk+'</span><span class="'+(dr>=0?'pos':'neg')+'">'+sgn(dr)+' this session</span></div>'+svg+'</div>';
}
function about(){
 var mt=P.length.toLocaleString();
 app.innerHTML='<div class="phead"><h1>ℹ About</h1></div><div class="agrid">'
 +ac("⬇ Real Lichess opening puzzles",opxCard())
 +ac("📈 MyChess64 Rating (MCR)","<b>Puzzle rating:</b> each puzzle's MCR combines its community rating from Lichess (Glicko-2, from millions of solves) with our own structural difficulty model, which looks at solution length, forcing moves, sacrifices, material, number of replies and themes. The two are blended by certainty: puzzles with few plays lean more on the model. <b>Your rating:</b> starts at 1000 and updates like Elo after every puzzle you attempt (first try only). A clean solve scores 1, a wrong move, hint or abandoned puzzle scores 0. Titles: Rookie, Novice, Club player, Tactician, Expert, Master, Grandmaster.")
 +ac("📚 Puzzle data",mt+' opening-phase tactics puzzles from the public-domain (CC0) <a href=\"https://database.lichess.org/#puzzles\" target=\"_blank\" rel=\"noopener\">Lichess puzzle database</a>. The built-in set was selected from a curated pool of 111,000+ Lichess puzzles (collected from open-source repositories such as <a href=\"https://github.com/kraktus/lichess-puzzles-db-pgn-data\" target=\"_blank\" rel=\"noopener\">kraktus</a>, <a href=\"https://github.com/keychessapp/keychessapp\" target=\"_blank\" rel=\"noopener\">keychessapp</a> and <a href=\"https://github.com/mcognetta/lichess-combined-puzzle-db\" target=\"_blank\" rel=\"noopener\">mcognetta</a>) by position: at least 18 pieces still on the board and castling still possible, or at least 22 pieces. They are grouped by opening structure (read from the pawn setup, or from Lichess opening names for downloaded puzzles), then by tactic. These are early-game positions, but Lichess itself did not tag them as opening puzzles. Use the download card above to add puzzles that Lichess did tag as opening.')
 +ac("🧹 Quality checks","Duplicates were removed by puzzle ID. Every solution line in the built-in set was checked for legality when the pool was built, and puzzles downloaded from Lichess keep Lichess's own solutions. Only well-rated, popular puzzles were kept.")
 +ac("🏷 Themes and levels","Themes (pin, fork, discovered attack…) come from Lichess; unlabeled puzzles were tagged with the open-source <a href=\"https://github.com/ornicar/lichess-puzzler\" target=\"_blank\" rel=\"noopener\">lichess-puzzler</a> tagger. The topics King in the Center, Castled King and Early Queen Move are approximate tags worked out from the board position of each puzzle, not Lichess themes. Levels follow MCR: Beginner below 1200, Intermediate 1200–1599, Advanced 1600–1999, Expert 2000+.")
 +ac("♞ Board and pieces",'cburnett pieces from <a href="https://lichess.org" target="_blank" rel="noopener">Lichess</a> (GPLv2+). Board styling imitates the Lichess analysis board. Chess rules by <a href="https://github.com/jhlywa/chess.js" target="_blank" rel="noopener">chess.js</a> (BSD-2), PDF reports by jsPDF (MIT), decompression by pako (MIT).')
 +ac("🔒 Your data","Progress and your rating are saved in this browser only (localStorage). Session scores live for the current session and are never uploaded.")+'</div>';
}

try{MC64.seed("o",S.p,S.rt)}catch(e){}
try{MC64.mount("o")}catch(e){}
nav("home");
