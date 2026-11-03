/* Module registry + health check + safe storage */
/* Some browsers (Safari "block all cookies", sandboxed iframes, file://) throw when localStorage is touched.
   Fall back to an in-memory store so the whole app does not crash. */
(function(){try{localStorage.setItem("_c","1");localStorage.removeItem("_c")}catch(e){
 const m={getItem:k=>k in m&&typeof m[k]!="function"?m[k]:null,setItem:(k,v)=>{m[k]=String(v)},removeItem:k=>{delete m[k]}};
 try{Object.defineProperty(window,"localStorage",{value:m,configurable:true})}catch(x){}}})();
/* Kid Mode settings (default: ON, age 8-11). Band 0 = 5-7, 1 = 8-11, 2 = 12+. */
window.KID={on:()=>localStorage.ckm!=="0",band:()=>{const b=+localStorage.cka;return b>=0&&b<=2?b:1},wiki:()=>localStorage.ckw!=="0"&&KID.band()>0};
if(KID.on())localStorage.clv=KID.band()==2?"1":"0";   /* tutor level follows the age band */
window.CHESSA={version:"2.0",mods:{},reg(n,d){this.mods[n]=d},need:["knowledge","live","hindi","learn","puzzles","engine","wiki","tutor","ui","extras","kids"],
 status(){return this.need.map(n=>n+": "+(this.mods[n]?"ok":"MISSING"))}};
addEventListener("load",()=>setTimeout(()=>{const m=CHESSA.need.filter(n=>!CHESSA.mods[n]);if(m.length&&window.botUI){document.body.classList.add("chat");window.botUI("⚠ Some CHESSA files did not load: <b>"+m.join(", ")+"</b>. Check that the js/ folder is next to index.html.")}},1200));
