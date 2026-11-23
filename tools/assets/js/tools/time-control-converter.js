const CUR="time-control-converter";const T={"fields": [["b", "Base time (minutes)", "number", 10], ["inc", "Increment (seconds)", "number", 5], ["mv", "Expected moves per game", "number", 40]], "title": "Time Control Converter", "slug": "time-control-converter", "mode": "std"};function calc(v){const b=n(v.b),inc=n(v.inc),mv=n(v.mv),est=b*60+40*inc,tot=b*60+inc*mv;
const c=est<30?'UltraBullet':est<180?'Bullet':est<480?'Blitz':est<1500?'Rapid':'Classical';
const h=s=>s>=3600?(s/3600).toFixed(1)+' h':Math.round(s/60)+' min';
return st('Category',c,b+' + '+inc)+st('Time per player',h(tot),'Over '+mv+' moves with increment')+st('Maximum game length',h(tot*2),'Both players using all their time')+st('Average per move',(tot/mv).toFixed(1)+' s')}
