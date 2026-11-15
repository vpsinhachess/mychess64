/* MyChess64 Arbiters: PDF generation (profile card, resume, earnings statement). Needs jsPDF (+ qrcode-generator for QR). */
var D=[],PUBURL="",EM="mychess.com@gmail.com";
function purl(){return PUBURL}
function ini(n){return String(n||"?").split(/\s+/).map(function(w){return w[0]}).slice(0,2).join("").toUpperCase()}
function inr(n){return"INR "+Number(n||0).toLocaleString("en-IN")}
function fdm(d){return d?new Date(String(d).slice(0,10)+"T00:00:00").toLocaleDateString("en-GB",{month:"short",year:"numeric"}):""}
function fdd(d){return d?new Date(String(d).slice(0,10)+"T00:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}):""}
function pubUrl(me){var C=window.MC64_CONFIG||{},base=(C.SITE_URL&&!/YOUR-/.test(C.SITE_URL))?C.SITE_URL.replace(/\/$/,""):location.href.replace(/[#?].*$/,"").replace(/[^\/]*$/,"").replace(/\/$/,"");return base+"/index.html#arbiter-"+me.id}
function logoPng(){return new Promise(function(res,rej){var im=new Image();im.onload=function(){var c=document.createElement("canvas");c.width=im.naturalWidth;c.height=im.naturalHeight;c.getContext("2d").drawImage(im,0,0);res({d:c.toDataURL("image/png"),w:im.naturalWidth,h:im.naturalHeight})};im.onerror=rej;im.src=MC.LOGO})}
function withLogo(fn){if(!(window.jspdf&&jspdf.jsPDF)){MC.toast("PDF tool could not load. Check your internet connection.",1);return}MC.toast("Preparing PDF...");logoPng().then(fn).catch(function(e){MC.toast("Could not create the PDF",1);console.error(e)})}
function deliver(doc,name,text,dl){var b=doc.output("blob"),f=new File([b],name,{type:"application/pdf"});
 function save(){var a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();a.remove();MC.toast("PDF downloaded: "+name)}
 if(!dl&&navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],title:name,text:text||""}).catch(function(e){if(!e||e.name!="AbortError")save()})}else save()}
function profileDoc(me,hist,logo){PUBURL=pubUrl(me);var fee=me.fee_per_day?inr(me.fee_per_day)+" per day":(me.fee||"By agreement");
 var d={n:me.full_name,t:me.title||"-",c:me.country||"",ci:me.city||"",x:me.years_exp,ev:me.events_count,nm:me.norm_events,fid:me.fide_id||"-",lg:me.languages.length?me.languages:["-"],f:me.formats,r:me.roles,av:me.availability,sw:me.software.length?me.software:["-"],b:me.bio||"Professional chess arbiter.",ev2:hist.slice(0,3).map(function(h){return h.event_name+(h.role?" ("+h.role+")":"")}),fee:fee,live:true,verified:me.verified};
 D=[d];TN["-"]="Chess Arbiter";return buildPdf(0,logo.d,logo.w,logo.h)}
function buildPdf(i,logo,lw,lh){var d=D[i],doc=new jspdf.jsPDF({unit:"mm",format:"a4"}),NAV=[11,36,71],BL=[10,102,200],GO=[245,166,35],TX=[27,36,48],MU=[93,103,115],LN=[226,230,238],GR=[31,122,77],SO=[76,195,138],u=purl(i),W=210;
 function F(c){doc.setFillColor(c[0],c[1],c[2])}function T(c){doc.setTextColor(c[0],c[1],c[2])}function S(c){doc.setDrawColor(c[0],c[1],c[2])}
 function tx(t,x,y,sz,st,c,o,fn){doc.setFont(fn||"helvetica",st||"normal");doc.setFontSize(sz);T(c);doc.text(t,x,y,o||{})}
 function pill(t,xr,y,c){doc.setFont("helvetica","bold");doc.setFontSize(6.8);var w=doc.getTextWidth(t)+8;S(c);doc.setLineWidth(.35);doc.roundedRect(xr-w,y,w,6,3,3,"S");tx(t,xr-w/2,y+4.1,6.8,"bold",c,{align:"center",charSpace:.4})}
 function hd(t,x,y,w){tx(t,x,y,8,"bold",BL,{charSpace:1});S(LN);doc.setLineWidth(.35);doc.line(x,y+2,x+w,y+2);return y+9}
 function para(t,x,y,w,sz,c){doc.setFont("helvetica","normal");doc.setFontSize(sz);var L=doc.splitTextToSize(t,w);T(c);doc.text(L,x,y,{lineHeightFactor:1.45});return y+L.length*sz*.3528*1.45}
 // header band
 F(NAV);doc.rect(0,0,W,72,"F");F([15,45,88]);for(var r=0;r<8;r++)for(var k=0;k<10;k++)if((r+k)%2==0)doc.rect(120+k*9,r*9,9,9,"F");
 F([255,255,255]);doc.roundedRect(14,10,60,19.5,3,3,"F");var lh2=52*lh/lw;doc.addImage(logo,"PNG",18,10+(19.5-lh2)/2,52,lh2);
 tx("ARBITER PROFILE",153,15,8,"bold",GO,{charSpace:1.2});
 if(!d.live||d.verified)pill(d.live?"VERIFIED":"VERIFIED (DEMO)",196,19,SO);pill(d.av.toUpperCase(),196,27.5,d.av=="Limited"?GO:SO);
 F([255,255,255]);S(GO);doc.setLineWidth(1.2);doc.circle(33,46,13,"FD");tx(ini(d.n),33,48.4,17,"bold",NAV,{align:"center"});
 tx(d.n,52,43,25,"bold",[255,255,255],{},"times");tx(TN[d.t],52,51,11.5,"bold",GO);tx(d.ci+", "+d.c,52,57.5,10,"normal",[190,205,228]);
 // stat cards
 var st=[[d.x,"YEARS EXPERIENCE"],[d.ev,"EVENTS OFFICIATED"],[d.nm,"NORM EVENTS"],[d.t,"FIDE TITLE"]];
 st.forEach(function(a,k){var x=14+k*46.5;F([222,227,236]);doc.roundedRect(x+.5,65.3,42.5,21,2.5,2.5,"F");F([255,255,255]);S(LN);doc.setLineWidth(.3);doc.roundedRect(x,64.6,42.5,21,2.5,2.5,"FD");tx(String(a[0]),x+21.25,75.3,18,"bold",NAV,{align:"center"});tx(a[1],x+21.25,81.5,6.2,"bold",MU,{align:"center",charSpace:.4})});
 // left column
 var x0=14,w=114,y=100;
 y=hd("ABOUT",x0,y,w);y=para(d.b,x0,y,w,10,TX)+2.5;
 function jn(a){return a.length>1?a.slice(0,-1).join(", ")+" and "+a[a.length-1]:(a[0]||"")}
 y=para("Available for "+jn(d.r).toLowerCase()+" appointments across "+jn(d.f).toLowerCase()+", and proficient with "+jn(d.sw)+". Working languages: "+jn(d.lg)+".",x0,y,w,10,TX)+6;
 y=hd("ROLES & FORMATS",x0,y,w);
 function chk(label,on,x,yy){if(on){F(GR);doc.roundedRect(x,yy-3.6,4.6,4.6,1,1,"F");S([255,255,255]);doc.setLineWidth(.55);doc.line(x+1,yy-1.2,x+2,yy-.2);doc.line(x+2,yy-.2,x+3.7,yy-2.7);tx(label,x+6.5,yy,9,"bold",TX)}else{S([200,206,216]);doc.setLineWidth(.3);doc.roundedRect(x,yy-3.6,4.6,4.6,1,1,"S");tx(label,x+6.5,yy,9,"normal",[150,158,170])}}
 ["Chief Arbiter","Deputy Arbiter","Pairing Officer"].forEach(function(a,k){chk(a,d.r.indexOf(a)>-1,x0+k*38,y)});y+=8;
 ["Classical","Rapid","Blitz","Team Events"].forEach(function(a,k){chk(a,d.f.indexOf(a)>-1,x0+k*28.5,y)});y+=11;
 y=hd("SELECTED APPOINTMENTS",x0,y,w);var y1=y;
 var rows=d.ev2.map(function(e){doc.setFont("helvetica","normal");doc.setFontSize(10);return doc.splitTextToSize(e,w-9)});
 var tot=0;rows.forEach(function(L){tot+=L.length*5+4.5});S(LN);doc.setLineWidth(.6);doc.line(x0+1.6,y1-1.2,x0+1.6,y1+tot-4.5-1.2);
 var yy=y;rows.forEach(function(L){F(GO);doc.circle(x0+1.6,yy-1.2,1.5,"F");T(TX);doc.setFont("helvetica","normal");doc.setFontSize(10);doc.text(L,x0+8,yy,{lineHeightFactor:1.4});yy+=L.length*5+4.5});
 y=yy+3;
 F([253,246,229]);doc.roundedRect(x0,y,w,22,2.5,2.5,"F");F(GO);doc.rect(x0,y+1.5,1.4,19,"F");
 tx("VERIFY BEFORE APPOINTING",x0+6,y+7,7.5,"bold",[150,100,10],{charSpace:.8});
 para("Always confirm the arbiter's title and licence status on the official FIDE arbiters site (arbiters.fide.com) before confirming an appointment.",x0+6,y+12,w-12,8.5,TX);
 // right column
 var rx=134,rw=62,cr=[["TITLE",TN[d.t]],[d.live?"FIDE ID":"FIDE ID (DEMO)",d.fid],["PAIRING SOFTWARE",d.sw.join(", ")],["LANGUAGES",d.lg.join(", ")],["FEE",d.fee],["AVAILABILITY",d.av]];
 doc.setFont("helvetica","bold");doc.setFontSize(9.5);
 var hs=cr.map(function(r){return doc.splitTextToSize(r[1],rw-10).length*4.4+8.5}),ch=hs.reduce(function(a,b){return a+b},0)+13;
 F([241,245,251]);doc.roundedRect(rx,100-4,rw,ch,3,3,"F");
 tx("CREDENTIALS",rx+5,100+2,8,"bold",BL,{charSpace:1});var cy=100+11;
 cr.forEach(function(r,k){tx(r[0],rx+5,cy,6.3,"bold",MU,{charSpace:.5});doc.setFont("helvetica","bold");doc.setFontSize(9.5);T(r[0]=="AVAILABILITY"?(d.av=="Limited"?[176,86,42]:GR):TX);doc.text(doc.splitTextToSize(r[1],rw-10),rx+5,cy+4.6,{lineHeightFactor:1.2});cy+=hs[k]});
 var cy2=100-4+ch+6,hasQ=!!window.qrcode,chh=hasQ?78:40;
 F(NAV);doc.roundedRect(rx,cy2,rw,chh,3,3,"F");
 tx("APPOINT THIS ARBITER",rx+5,cy2+8,8,"bold",GO,{charSpace:1});
 para("Send a structured enquiry through MyChess64 Arbiters.",rx+5,cy2+14,rw-10,8.5,[255,255,255]);
 tx("mychess.com@gmail.com",rx+5,cy2+27,8.3,"bold",GO);doc.link(rx+5,cy2+23,rw-10,6,{url:"mailto:"+EM});
 if(hasQ){var q=qrcode(0,"M");q.addData(u);q.make();var n=q.getModuleCount(),qs=29,ms=qs/n,qx=rx+(rw-qs-6)/2+0,qy=cy2+33;F([255,255,255]);doc.roundedRect(qx,qy,qs+6,qs+6,2,2,"F");F(NAV);for(var a=0;a<n;a++)for(var b=0;b<n;b++)if(q.isDark(a,b))doc.rect(qx+3+b*ms,qy+3+a*ms,ms+.02,ms+.02,"F");
  doc.link(qx,qy,qs+6,qs+6,{url:u});tx("Scan to open this profile",rx+rw/2,cy2+chh-4,7,"normal",[190,205,228],{align:"center"})}
 // footer
 F(GO);doc.rect(0,277.5,W,1.2,"F");F(NAV);doc.rect(0,278.7,W,18.3,"F");
 tx("MyChess64 Arbiters",14,285.6,10,"bold",[255,255,255]);tx("Learn. Play. Improve. Anytime, Anywhere.",196,285.6,8.5,"normal",GO,{align:"right"});
 var dt=new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});
 tx((d.live?"":"Demonstration profile. ")+"Independent platform; not affiliated with or endorsed by FIDE. Generated "+dt+".",14,291.8,6.5,"normal",[160,178,206]);
 doc.setProperties({title:d.n+" - Arbiter Profile | MyChess64 Arbiters",author:"MyChess64 Arbiters",subject:TN[d.t]});
 return doc}

function resumeDoc(me,hist,certs,logo){
 var doc=new jspdf.jsPDF({unit:"mm",format:"a4"}),NAV=[11,36,71],BL=[10,102,200],GO=[245,166,35],TX=[27,36,48],MU=[93,103,115],LN=[226,230,238],W=210,H=297,SX=72,SW=126,url=pubUrl(me),y=0;
 function F(c){doc.setFillColor(c[0],c[1],c[2])}function T(c){doc.setTextColor(c[0],c[1],c[2])}function S(c){doc.setDrawColor(c[0],c[1],c[2])}
 function tx(t,x,yy,sz,st,c,o,fn){doc.setFont(fn||"helvetica",st||"normal");doc.setFontSize(sz);T(c);doc.text(t,x,yy,o||{})}
 function wrap(t,w,sz,st){doc.setFont("helvetica",st||"normal");doc.setFontSize(sz);return doc.splitTextToSize(String(t),w)}
 function side(first){F(NAV);doc.rect(0,0,62,H,"F");F([15,45,88]);for(var i=0;i<14;i++)for(var k=0;k<2;k++)if((i+k)%2==0)doc.rect(k*31,i*21.2,31,21.2,"F");F(NAV);doc.rect(0,0,62,H,"F");if(!first)return;
  F([255,255,255]);S(GO);doc.setLineWidth(1.2);doc.circle(31,32,16,"FD");tx(ini(me.full_name),31,34.6,19,"bold",NAV,{align:"center"});
  var sy=62;function sh(t){tx(t,8,sy,7.5,"bold",GO,{charSpace:1});sy+=5.5}
  function sl(a){a.forEach(function(s){var L=wrap(s,46,8.8);T([225,233,246]);doc.text(L,8,sy,{lineHeightFactor:1.35});sy+=L.length*4.3+1});sy+=4}
  sh("CONTACT");sl([me.email,me.phone,[me.city,me.country].filter(Boolean).join(", ")].filter(Boolean));
  sh("FIDE CREDENTIALS");sl([({IA:"International Arbiter",FA:"FIDE Arbiter",NA:"National Arbiter"})[me.title]||"Chess Arbiter","FIDE ID: "+(me.fide_id||"-")].concat(me.title_year?["Title since "+me.title_year]:[]));
  if(me.roles.length){sh("ROLES");sl(me.roles)}if(me.formats.length){sh("FORMATS");sl(me.formats)}if(me.software.length){sh("PAIRING SOFTWARE");sl(me.software)}if(me.languages.length){sh("LANGUAGES");sl(me.languages)}
  F([255,255,255]);doc.roundedRect(7,H-34,48,16,2.5,2.5,"F");var lh=42*logo.h/logo.w;doc.addImage(logo.d,"PNG",10,H-34+(16-lh)/2,42,lh);tx("Generated with MyChess64 Arbiters",31,H-12,6.2,"normal",[160,178,206],{align:"center"})}
 side(true);
 function foot(){tx("Public profile: "+url,SX,H-9,6.8,"normal",MU);doc.link(SX,H-12.5,SW,5,{url:url})}foot();
 function pb(n){if(y+n>H-18){doc.addPage();side(false);foot();y=20}}
 function hd(t){pb(18);tx(t,SX,y,9,"bold",NAV,{charSpace:1.3});S(LN);doc.setLineWidth(.35);doc.line(SX,y+2,SX+SW,y+2);y+=8}
 var nl=wrap(me.full_name,SW,25,"bold");doc.setFont("times","bold");doc.setFontSize(25);nl=doc.splitTextToSize(me.full_name,SW);T(NAV);doc.text(nl,SX,26,{lineHeightFactor:1.1});y=26+(nl.length-1)*10;
 var hl=me.headline||((({IA:"International Arbiter",FA:"FIDE Arbiter",NA:"National Arbiter"})[me.title]||"Chess Arbiter")+(me.city?" | "+me.city:""));tx(hl,SX,y+8,11,"bold",BL);F(GO);doc.rect(SX,y+12,22,1.2,"F");y+=24;
 hd("PROFILE");doc.setFont("helvetica","normal");doc.setFontSize(10);T(TX);var bl=doc.splitTextToSize(me.bio||"Professional chess arbiter.",SW);doc.text(bl,SX,y,{lineHeightFactor:1.5});y+=bl.length*5.3+6;
 var fg=[[me.years_exp,"YEARS EXPERIENCE"],[me.events_count,"EVENTS OFFICIATED"],[me.norm_events,"NORM EVENTS"],[certs.length,"CERTIFICATES"]];pb(24);
 fg.forEach(function(a,k){var x=SX+k*(30+2);F([241,245,251]);doc.roundedRect(x,y-3,30,18,2,2,"F");tx(String(a[0]),x+15,y+5.5,15,"bold",NAV,{align:"center"});tx(a[1],x+15,y+11.5,5.6,"bold",MU,{align:"center",charSpace:.3})});y+=26;
 if(hist.length){hd("TOURNAMENT EXPERIENCE");hist.slice().sort(function(a,b){return String(b.event_date||"").localeCompare(String(a.event_date||""))}).forEach(function(h){
  var n=wrap(h.event_name,SW-8,10.2,"bold"),m1=[h.event_date?(fdd(h.event_date)+(h.end_date&&h.end_date!=h.event_date?" - "+fdd(h.end_date):"")):"",h.venue,h.role,h.category].filter(Boolean).join("  |  "),m2=[h.participants?h.participants+" participants":"",h.organizer?"Organizer: "+h.organizer:"",h.norm_event?"Title-norm event":""].filter(Boolean).join("  |  "),nt=h.notes?wrap(h.notes,SW-8,8.8):[];
  var hh=n.length*4.8+(m1?5:0)+(m2?5:0)+nt.length*4.3+4;pb(hh);F(GO);doc.rect(SX,y-2.6,2.2,2.2,"F");doc.setFont("helvetica","bold");doc.setFontSize(10.2);T(TX);doc.text(n,SX+6,y);y+=n.length*4.8;
  if(m1){tx(m1,SX+6,y,8.6,"normal",MU);y+=5}if(m2){tx(m2,SX+6,y,8.6,"normal",MU);y+=5}if(nt.length){doc.setFont("helvetica","normal");doc.setFontSize(8.8);T(TX);doc.text(nt,SX+6,y,{lineHeightFactor:1.3});y+=nt.length*4.3}y+=4})}
 if(certs.length){hd("CERTIFICATIONS");certs.forEach(function(c){pb(11);F(GO);doc.rect(SX,y-2.6,2.2,2.2,"F");tx(c.name,SX+6,y,9.8,"bold",TX);y+=4.8;var m=[c.cert_type,c.issued_on?"Issued "+fdm(c.issued_on):"",c.expires_on?"Valid until "+fdm(c.expires_on):""].filter(Boolean).join("  |  ");if(m){tx(m,SX+6,y,8.4,"normal",MU);y+=4.6}y+=3})}
 if(me.achievements){hd("ACHIEVEMENTS");String(me.achievements).split(/\n+/).filter(Boolean).forEach(function(l){var L=wrap(l,SW-6,9.8);pb(L.length*4.8+3);F(GO);doc.rect(SX,y-2.6,2.2,2.2,"F");T(TX);doc.text(L,SX+6,y,{lineHeightFactor:1.35});y+=L.length*4.8+2})}
 if(me.education){hd("EDUCATION & TRAINING");String(me.education).split(/\n+/).filter(Boolean).forEach(function(l){var L=wrap(l,SW-6,9.8);pb(L.length*4.8+3);F(GO);doc.rect(SX,y-2.6,2.2,2.2,"F");T(TX);doc.text(L,SX+6,y,{lineHeightFactor:1.35});y+=L.length*4.8+2})}
 doc.setProperties({title:me.full_name+" - Arbiter Resume",author:me.full_name,subject:"Chess arbiter resume"});return doc}

function statementDoc(me,rows,label,tot,logo){
 var doc=new jspdf.jsPDF({unit:"mm",format:"a4"}),NAV=[11,36,71],GO=[245,166,35],TX=[27,36,48],MU=[93,103,115],LN=[226,230,238],W=210,H=297,y;
 function F(c){doc.setFillColor(c[0],c[1],c[2])}function T(c){doc.setTextColor(c[0],c[1],c[2])}function S(c){doc.setDrawColor(c[0],c[1],c[2])}
 function tx(t,x,yy,sz,st,c,o){doc.setFont("helvetica",st||"normal");doc.setFontSize(sz);T(c);doc.text(t,x,yy,o||{})}
 F(NAV);doc.rect(0,0,W,46,"F");F([255,255,255]);doc.roundedRect(14,9,52,17,3,3,"F");var lh=44*logo.h/logo.w;doc.addImage(logo.d,"PNG",18,9+(17-lh)/2,44,lh);
 tx("EARNINGS STATEMENT",196,15,9,"bold",GO,{align:"right"});tx(label,196,22,9,"normal",[190,205,228],{align:"right"});
 doc.setFont("times","bold");doc.setFontSize(20);T([255,255,255]);doc.text(me.full_name,14,38);
 [["TOTAL BILLED",tot.billed,NAV],["RECEIVED",tot.received,[31,122,77]],["OUTSTANDING",tot.billed-tot.received,[176,86,42]]].forEach(function(a,k){var x=14+k*61;F([222,227,236]);doc.roundedRect(x+.5,50.8,56,20,2.5,2.5,"F");F([255,255,255]);S(LN);doc.setLineWidth(.3);doc.roundedRect(x,50,56,20,2.5,2.5,"FD");tx(inr(a[1]),x+28,59.5,13,"bold",a[2],{align:"center"});tx(a[0],x+28,66,6.5,"bold",MU,{align:"center",charSpace:.5})});
 var cols=[[14,"DATE"],[36,"EVENT"],[102,"SOURCE"],[126,"AGREED"],[152,"RECEIVED"],[178,"BALANCE"]];
 function th(){F([241,245,251]);doc.rect(14,y-5,182,8,"F");cols.forEach(function(c){tx(c[1],c[0]+(c[0]>120?0:1),y,7,"bold",MU,{charSpace:.4})});y+=8}
 y=84;th();rows.forEach(function(r,i){if(y>H-26){doc.addPage();y=20;th()}if(i%2){F([250,251,254]);doc.rect(14,y-5,182,8,"F")}
  tx(fdd(r.date)||"-",15,y,8,"normal",TX);var t=doc.splitTextToSize(r.title,62)[0];tx(t,37,y,8.4,"bold",TX);tx(r.source,103,y,8,"normal",MU);tx(inr(r.agreed),126,y,8,"normal",TX);tx(inr(r.received),152,y,8,"normal",[31,122,77]);var b=(r.agreed||0)-(r.received||0);tx(inr(b),178,y,8,"bold",b>0?[176,86,42]:MU);y+=8});
 if(!rows.length)tx("No income records for this period.",14,y+4,10,"normal",MU);
 if(y>H-30){doc.addPage();y=20}S(NAV);doc.setLineWidth(.6);doc.line(14,y-3,196,y-3);tx("TOTAL",37,y+3,9,"bold",NAV);tx(inr(tot.billed),126,y+3,8.6,"bold",NAV);tx(inr(tot.received),152,y+3,8.6,"bold",[31,122,77]);tx(inr(tot.billed-tot.received),178,y+3,8.6,"bold",[176,86,42]);
 var n=doc.getNumberOfPages();for(var p=1;p<=n;p++){doc.setPage(p);tx("Generated "+fdd(new Date().toISOString())+" with MyChess64 Arbiters. Personal record; amounts as entered by the arbiter.",14,H-9,6.8,"normal",MU)}
 doc.setProperties({title:"Earnings statement - "+me.full_name,author:me.full_name});return doc}
