/* Built-in alpha-beta engine: emergency fallback only (used if Stockfish cannot load)
   plus mateIn(), a tiny exhaustive mate finder used by the hint button. */
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
