/* Puzzle state + answer checking (data in data/puzzles.js) */
window.Puz={cur:null,i:-1,
next(daily){const n=PUZZLES.length;this.i=daily?new Date().getDate()%n:(this.i+1)%n;return this.cur=PUZZLES[this.i]},
n:m=>m.toLowerCase().replace(/[+#!?x\s=]/g,''),
isMove:t=>/^[kqrbn]?[a-h]?[1-8]?x?[a-h][1-8][+#]?[!?]*$/i.test(t.trim()),
answer(t){if(!this.cur)return null;if(this.n(t)===this.n(this.cur.sol))return{ok:1};return this.isMove(t)?{ok:0}:null}};
