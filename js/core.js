/* Module registry + health check */
window.CHESSA={mods:{},reg(n,d){this.mods[n]=d},need:["knowledge","live","hindi","learn","puzzles","engine","wiki","tutor","ui"],
 status(){return this.need.map(n=>n+": "+(this.mods[n]?"ok":"MISSING"))}};
addEventListener("load",()=>setTimeout(()=>{const m=CHESSA.need.filter(n=>!CHESSA.mods[n]);if(m.length&&window.botUI){document.body.classList.add("chat");window.botUI("⚠ Some CHESSA files did not load: <b>"+m.join(", ")+"</b>. Check that the js/ folder is next to index.html.")}},1200));
