const CUR="chess-rating-tracker";const T={"fields": [["r", "Rating", "number", 1500], ["d", "Date", "date", "today"]], "title": "Chess Rating Tracker", "slug": "chess-rating-tracker", "mode": "std"};let D=[];try{D=JSON.parse(localStorage.ratings||'[]')}catch(e){}
const save=()=>{try{localStorage.ratings=JSON.stringify(D)}catch(e){}};
const act=[['Add rating',v=>{D.push([v.d,n(v.r)]);D.sort();save()}],['Clear all',()=>{if(confirm('Delete all entries?')){D=[];save()}},'alt']];
window.del=i=>{D.splice(i,1);save();run()};
function calc(){if(!D.length)return '<p class="muted">No entries yet. Enter a rating and choose Add rating.</p>';
const R=D.map(x=>x[1]),lo=Math.min(...R)-20,hi=Math.max(...R)+20,X=i=>20+i*(560/Math.max(1,D.length-1)),Y=r=>190-(r-lo)/(hi-lo||1)*170;
const pts=D.map((x,i)=>X(i)+','+Y(x[1])).join(' ');
return st('Current',R[R.length-1],'Peak '+Math.max(...R)+' · Change '+(R[R.length-1]-R[0]>=0?'+':'')+(R[R.length-1]-R[0]))+`<svg viewBox="0 0 600 210" style="width:100%"><polyline points="${pts}" fill="none" stroke="#e0b84a" stroke-width="3"/>${D.map((x,i)=>`<circle cx="${X(i)}" cy="${Y(x[1])}" r="4" fill="#e0b84a"/>`).join('')}</svg><table>${D.map((x,i)=>`<tr><td>${x[0]}</td><td>${x[1]}</td><td><a href="#" style="color:#a9b79a" onclick="del(${i});return false">remove</a></td></tr>`).join('')}</table>`}
