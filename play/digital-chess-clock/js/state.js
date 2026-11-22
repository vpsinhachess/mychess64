"use strict";
/* Shared data: presets, the single source-of-truth state, tiny helpers. */

const PRESETS = [ // [label, seconds, increment, bonusMoves, bonusSeconds, category]
  ["1 + 0",60,0,0,0,"Bullet"],["1 + 1",60,1,0,0,"Bullet"],["2 + 1",120,1,0,0,"Bullet"],
  ["3 + 0",180,0,0,0,"Blitz"],["3 + 2",180,2,0,0,"Blitz"],["5 + 0",300,0,0,0,"Blitz"],
  ["5 + 3",300,3,0,0,"Blitz"],["10 + 0",600,0,0,0,"Blitz"],
  ["10 + 5",600,5,0,0,"Rapid"],["15 + 0",900,0,0,0,"Rapid"],["15 + 10",900,10,0,0,"Rapid"],["25 + 10",1500,10,0,0,"Rapid"],
  ["45 + 45",2700,45,0,0,"Classical"],["60 + 30",3600,30,0,0,"Classical"],["FIDE 90+30",5400,30,40,1800,"Classical"],["120 + 30",7200,30,0,0,"Classical"]
];

const coarse = window.matchMedia("(pointer:coarse)").matches;
const VOLS = ["Muted","Volume low","Volume medium","Volume high"];

const state = {
  players:{
    white:{base:180,remain:180000,inc:2,moves:0},
    black:{base:180,remain:180000,inc:2,moves:0}
  },
  activePlayer:"white",
  status:"ready",          // ready | running | paused | finished
  vol:2,                   // 0 muted … 3 high
  haptic:true,
  flip:coarse,             // turn Black upside-down in portrait (on by default for touch devices)
  fullscreen:false,
  wakeLock:null,
  lastTimestamp:0,
  renderHandle:0,
  flagAlarmTimer:null,
  flagAlarmActive:false,
  stage:null,              // {moves,add}: time added when a player completes that move (FIDE classical)
  mode:"fischer",          // fischer | delay | bronstein | none
  turnMs:0,
  warnSec:-1,
  controlLabel:"3 + 2"
};

const $ = id => document.getElementById(id);
function inProgress(){return state.status==="running"||state.status==="paused";}
function cycleVol(){state.vol=(state.vol+1)%4;}
