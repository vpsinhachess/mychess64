#!/usr/bin/env node
/* ============================================================================
   CHESSA knowledge merger
   Reads every knowledge file in a folder (files that contain  const something = [ {...}, ... ]  with or
   without "export default"), cleans them, and writes a few combined "pack" files in the format the
   CHESSA app loads, plus a manifest and a report.

   Usage:   node merge_kb.js <folder-with-your-kb-js-files> <output-folder>
   Example: node merge_kb.js ./my-kb ./ask-chessa/data

   Entry fields understood (all but title/answer are optional):
     id, type, category, topic, subtopic, title, level, keywords[], questions[], short_answer, answer,
     example, related[], source, verified
   Files named in SKIP are never merged (they belong to the app, not to the knowledge base).
   Edit GROUPS to decide which file goes into which pack.
   ============================================================================ */
const fs=require('fs'),vm=require('vm'),path=require('path');
const SRC=process.argv[2],OUT=process.argv[3];
if(!SRC||!OUT){console.log('Usage: node merge_kb.js <input-folder> <output-folder>');process.exit(1)}
const SKIP=new Set(['manifest.js','kb-data.js','kb-extra.js','kb-kids.js','puzzles.js','my-knowledge-1.js','my-knowledge-2.js']);
const KIDS_SAFE=new Set([]);                      /* file names (without .js) whose entries are safe for children, e.g. 'chess-basics-board' */
/* pack name -> test on the file name.  The first pack that matches wins; anything else goes to "learn". */
const GROUPS=[
 ['chessa', /^(about-chessa|chessa-talk)$/],
 ['world',  /^(chess-history|famous-games|great-players|indian-chess|indian-gms|chess-gk|chess-gk-world|chess-facts|tournament-chess|ratings-careers|chessai-tech)$/],
];
const PACKFILE={learn:['kb-learn.js','kbLearn'],world:['kb-world.js','kbWorld'],chessa:['kb-chessa.js','kbChessa']};

const rep=[],clean=s=>String(s==null?'':s).replace(/\s+/g,' ').trim();
const ARTIFACT=/\s*:?(?:chatgpt-content-reference|contentReference)\{[^}]*\}|\s*\[?oaicite:[^\]\n]*\]?|[\ue000-\uf8ff]+/g;
const files=fs.readdirSync(SRC).filter(f=>f.endsWith('.js')&&!SKIP.has(f)).sort();
const packs={},seen=new Map(),all=[];let artifacts=0;
for(const f of files){
  let src=fs.readFileSync(path.join(SRC,f),'utf8').replace(/^\uFEFF/,'');
  const m=src.match(/^\s*(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*\[/m);
  if(!m){rep.push(`SKIPPED ${f}: no "const name = [ ... ]" array found (not a knowledge file?)`);continue}
  const before=src.length;src=src.replace(ARTIFACT,'');artifacts+=(before-src.length)?1:0;
  if(before!==src.length)rep.push(`CLEANED ${f}: removed ${before-src.length} characters of pasted AI-citation markers`);
  src=src.replace(/export\s+default\s+[A-Za-z0-9_$]+\s*;?/g,'');
  const ctx={};vm.createContext(ctx);let arr;
  try{vm.runInContext(src+`\n;this.__r=${m[1]};`,ctx,{filename:f});arr=ctx.__r}
  catch(e){const ln=(String(e.stack).match(new RegExp(f.replace('.','\\.')+':(\\d+)'))||[])[1];rep.push(`ERROR ${f}: cannot be read (${e.message})${ln?' near line '+ln:''} - file skipped`);continue}
  if(!Array.isArray(arr)){rep.push(`ERROR ${f}: ${m[1]} is not an array - skipped`);continue}
  const base=f.replace(/\.js$/,''),pk=(GROUPS.find(g=>g[1].test(base))||['learn'])[0];
  let ok=0,bad=0;
  arr.forEach((e,i)=>{
    const title=clean(e.title),sa=clean(e.short_answer),an=clean(e.answer),ex=clean(e.example);
    if(!title||!(sa||an)){bad++;rep.push(`SKIPPED entry ${i+1} in ${f}${e&&e.id?' ('+e.id+')':''}: missing title or answer`);return}
    const kw=[...new Set((e.keywords||[]).map(clean).filter(Boolean))],q=[...new Set((e.questions||[]).map(clean).filter(Boolean))];
    const conv=/CONVERSATION|ABOUT_CHESSA/i.test(e.type||'');
    const parts=[];let sg=[];
    if(conv)parts.push(an||sa);else{parts.push(sa||an);if(sa&&an&&an!==sa&&!an.startsWith(sa))parts.push(an)}
    if(ex){if(/^suggestions?\s*:/i.test(ex))sg=ex.replace(/^suggestions?\s*:\s*/i,'').split(/\s*[•|]\s*/).map(clean).filter(Boolean).slice(0,4);else parts.push('💡 '+ex)}
    const id=clean(e.id)||(base+'-'+(i+1));
    if(seen.has(id)){rep.push(`DUPLICATE id ${id} in ${f} (also in ${seen.get(id)}) - the later one was skipped`);bad++;return}
    seen.set(id,f);
    const o={id,topic:clean(e.topic)||clean(e.category)||'Chess',title,answer:parts.join('\n\n'),ref:clean(e.source)||'MyChess64 Knowledge Base'};
    if(kw.length)o.kw=kw;else o.key=title;   /* the app builds the search key from the keyword list */if(q.length)o.q=q;if(sg.length)o.sg=sg;
    const rel=(e.related||[]).map(clean).filter(Boolean);if(rel.length)o.rel=rel;
    if(e.level)o.lv=clean(e.level);if(KIDS_SAFE.has(base))o.kid=true;
    (packs[pk]=packs[pk]||[]).push(o);all.push(o);ok++;
  });
  rep.push(`OK ${f.padEnd(30)} -> pack "${pk}": ${ok} entries${bad?`, ${bad} skipped`:''}`);
}
/* related ids that point nowhere */
const ids=new Set(all.map(e=>e.id));let unres=0;all.forEach(e=>{if(e.rel){const r=e.rel.filter(x=>ids.has(x));unres+=e.rel.length-r.length;if(r.length)e.rel=r;else delete e.rel}});
if(unres)rep.push(`NOTE ${unres} "related" id(s) point to entries that do not exist and were dropped`);
/* same title twice? (kept, but listed so you can review) */
const tt=new Map();all.forEach(e=>{const k=e.title.toLowerCase();tt.set(k,(tt.get(k)||[]).concat(e.id))});
const dups=[...tt].filter(([k,v])=>v.length>1);if(dups.length)rep.push(`NOTE ${dups.length} titles are used by more than one entry (kept): `+dups.slice(0,8).map(([k,v])=>v.join('/')).join(', ')+(dups.length>8?' ...':''));
fs.mkdirSync(OUT,{recursive:true});
const manifest=[];
for(const [pk,arr] of Object.entries(packs)){
  const [fn,vn]=PACKFILE[pk]||['kb-'+pk+'.js','kb'+pk[0].toUpperCase()+pk.slice(1)];
  const body='/* CHESSA knowledge pack "'+pk+'" - '+arr.length+' entries. Generated by merge_kb.js - edit your source files and run the tool again, do not edit this file. */\nconst '+vn+'=[\n'+arr.map(o=>JSON.stringify(o)).join(',\n')+'\n];\n';
  fs.writeFileSync(path.join(OUT,fn),body);manifest.push([fn,vn,!!arr.length&&arr.every(o=>o.kid)]);
  rep.push(`WROTE ${fn}: ${arr.length} entries, ${(Buffer.byteLength(body)/1024).toFixed(0)} KB`);
}
const mf='/* Knowledge files loaded when the page starts. Format: [file path, array name]  or  [file path, array name, true]  (true = kid-friendly file).\n   Generated by merge_kb.js. Keep the two template files at the end if you still use them for hand-typed entries. */\nwindow.KB_MANIFEST=[\n'+manifest.map(([f,n,k])=>' ["data/'+f+'","'+n+'"'+(k?',true':'')+']').join(',\n')+',\n ["data/my-knowledge-1.js","myKnowledge1"],\n ["data/my-knowledge-2.js","myKnowledge2",true]\n];\n';
fs.writeFileSync(path.join(OUT,'manifest.js'),mf);
rep.push(`TOTAL ${all.length} entries in ${manifest.length} packs`);
fs.writeFileSync(path.join(OUT,'merge-report.txt'),rep.join('\n')+'\n');
console.log(rep.join('\n'));
