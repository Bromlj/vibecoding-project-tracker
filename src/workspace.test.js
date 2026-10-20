import test from 'node:test';
import assert from 'node:assert/strict';
import { blankWorkspace, createWorkspace, makeBoard, validWorkspace, initialWorkspace, changeBoard, removeMember, boardNameError, PALETTES, CARD_PALETTES, memberLabel } from './workspace.js';
import { seedTasks } from './data.js';
import { writeSnapshot } from './storage.js';

const member={name:'Alex',email:'alex@example.com',github:'alex-dev',gitlab:'alex.dev'};
test('same-name members remain distinguishable even with duplicate contact data and ID suffixes',()=>{
  const members=[{...member,id:'first-12345678'},{...member,id:'second-12345678'},{...member,id:'third',email:'other@example.com'}];
  assert.notEqual(memberLabel(members[0],members),memberLabel(members[1],members));
  assert.ok(memberLabel(members[2],members).includes('other@example.com'));
  assert.equal(memberLabel(members[0],[members[0]]),'Alex');
});
function memory() {const data=new Map();return {getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),data};}
test('setup, separate boards and stable member references survive rename',()=>{
  let ws=createWorkspace('Team',member,'Website');
  const memberId=ws.members[0].id;
  const task={...seedTasks()[0],assigneeId:memberId};delete task.assignee;
  ws=changeBoard(ws,ws.selectedBoardId,b=>({...b,tasks:[task]}));
  ws={...ws,members:[{...ws.members[0],name:'Alex renamed'}],boards:[...ws.boards,makeBoard('API')]};
  assert.equal(validWorkspace(ws),true);
  assert.equal(ws.boards[0].tasks[0].assigneeId,memberId);
  assert.equal(ws.boards[1].tasks.length,0);
  assert.ok(boardNameError(' website ',ws));
  assert.equal(removeMember(ws,memberId).boards[0].tasks[0].assigneeId,null);
  assert.equal(validWorkspace(blankWorkspace()),true);
});
test('legacy migration retains tasks/ids/anchors and never deletes legacy keys',()=>{
  const storage=memory(), tasks=seedTasks();
  storage.setItem('vibetracker.tasks',JSON.stringify(tasks));
  const migrated=initialWorkspace(storage);
  assert.equal(validWorkspace(migrated),true);
  assert.equal(migrated.boards[0].tasks[0].id,tasks[0].id);
  assert.equal(storage.getItem('vibetracker.tasks'),JSON.stringify(tasks));
  const empty=memory();empty.setItem('vibetracker.tasks','[]');
  assert.equal(initialWorkspace(empty).boards[0].tasks.length,0);
  const corrupt=memory();corrupt.setItem('vibetracker.tasks','invalid');
  assert.throws(()=>initialWorkspace(corrupt));assert.equal(corrupt.getItem('vibetracker.tasks'),'invalid');
});
test('durable commit rejects failed writes and stale snapshots without advancing saved data',()=>{
  const storage=memory(), initial=createWorkspace('Team',member,'Website');
  const first=writeSnapshot(storage,'state',null,initial,validWorkspace);
  storage.setItem=()=>{throw new Error('Quota exceeded');};
  assert.throws(()=>writeSnapshot(storage,'state',first,{...initial,name:'Changed'},validWorkspace));
  assert.equal(storage.getItem('state'),first);
  const newer=memory();newer.setItem('state','newer');
  assert.throws(()=>writeSnapshot(newer,'state',first,initial,validWorkspace),/another tab/);
  assert.equal(newer.getItem('state'),'newer');
});

test('milestones require a criterion and reached timestamp, with per-project isolation',()=>{
  const ws=createWorkspace('Team',member,'Website'),board=ws.boards[0];
  const milestone={id:'release',title:'Release',criterion:'Checks pass',targetDate:'2028-02-29',status:'reached',reachedAt:'2026-10-20T12:00:00Z'};
  board.milestones.push(milestone);assert.equal(validWorkspace(ws),true);
  milestone.reachedAt=null;assert.equal(validWorkspace(ws),false);
  milestone.status='pending';assert.equal(validWorkspace(ws),true);
  milestone.criterion=' ';assert.equal(validWorkspace(ws),false);
  assert.equal(validWorkspace({...ws,boards:[null]}),false);
});
test('all offered type palettes meet normal-text contrast and keep independent text colours',()=>{
  const luminance=hex=>hex.match(/[a-f\d]{2}/gi).map(h=>parseInt(h,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
  for(const palette of Object.values(PALETTES))for(const type of ['feature','bug']){
    const [text,bg]=palette[type],a=luminance(text),b=luminance(bg);assert.ok((Math.max(a,b)+.05)/(Math.min(a,b)+.05)>=4.5,palette.name+' '+type);
  }
  for(const palette of Object.values(CARD_PALETTES))for(const state of ['urgent','soon','complete']){
    const [bg,border,label]=palette[state],b=luminance(bg);
    for(const text of [label,'#172333','#263445','#062B27']){const a=luminance(text);assert.ok((Math.max(a,b)+.05)/(Math.min(a,b)+.05)>=4.5,palette.name+' '+state+' '+text);}
    const edge=luminance(border);assert.ok((Math.max(edge,b)+.05)/(Math.min(edge,b)+.05)>=3,palette.name+' border');
  }
  const legacy=blankWorkspace();delete legacy.cardPalette;assert.equal(validWorkspace(legacy),true);assert.equal(validWorkspace({...legacy,cardPalette:'unknown'}),false);
});
