/* Sound engine: compressor + master volume */
function ac(){if(!AC){AC=new(window.AudioContext||window.webkitAudioContext)();const c=AC.createDynamicsCompressor();MG=AC.createGain();MG.connect(c);c.connect(AC.destination)}if(AC.state==='suspended')AC.resume();MG.gain.value=vol*1.4}
function tone(f,t0,d,ty,v,f2){const o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime+t0;o.type=ty||'sine';o.frequency.setValueAtTime(f,n);if(f2)o.frequency.exponentialRampToValueAtTime(f2,n+d);g.gain.setValueAtTime(v||.5,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g);g.connect(MG);o.start(n);o.stop(n+d+.03)}
function noise(t0,d,v,fr){const n=AC.sampleRate*d|0,bf=AC.createBuffer(1,n,AC.sampleRate),a=bf.getChannelData(0);for(let i=0;i<n;i++)a[i]=(Math.random()*2-1)*(1-i/n);const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g=AC.createGain();s.buffer=bf;fl.type='bandpass';fl.frequency.value=fr;g.gain.value=v;s.connect(fl);fl.connect(g);g.connect(MG);s.start(AC.currentTime+t0)}
function snd(k){if(!vol)return;try{ac();
const P={click:()=>tone(900,0,.08,'triangle',.5,500),
move:()=>{noise(0,.07,1.3,1700);tone(170,0,.13,'sine',1,70)},
cap:()=>{noise(0,.12,1.6,1100);tone(120,0,.2,'sine',1.1,45);tone(260,0,.08,'square',.3)},
good:()=>{[784,1047,1568].forEach((f,i)=>tone(f,i*.09,.22+i*.05,'triangle',.7));tone(2093,.3,.3,'sine',.3)},
check:()=>{tone(880,0,.12,'square',.45);tone(660,.12,.18,'square',.45)},
bad:()=>{tone(320,0,.3,'sawtooth',.4,130);tone(210,.18,.4,'sawtooth',.4,80)},
win:()=>{[523,659,784,1047].forEach((f,i)=>tone(f,i*.13,.25,'triangle',.8));[1047,1319,1568].forEach(f=>tone(f,.52,.9,'triangle',.5));noise(.52,.6,.4,6000)}};P[k]()}catch(e){}}

