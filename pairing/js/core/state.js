/* js/core/state.js - Global application state (shared by every module). */
const $=id=>document.getElementById(id);let S=null;
let sv,dirty=false;
let ORG=null,dbh=null,TID=null,unsub=null,unsubS=null,lf=0,lk=0;
let restored=false;
let TOKEN='';
let VT=1,VS=0,FD=null,PRE=[];
