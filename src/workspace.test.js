import test from 'node:test';
import assert from 'node:assert/strict';
import { blankWorkspace, createWorkspace, makeBoard, validWorkspace, initialWorkspace, changeBoard, removeMember, boardNameError } from './workspace.js';
import { seedTasks } from './data.js';
import { writeSnapshot } from './storage.js';

const member={name:'Alex',email:'alex@example.com',github:'alex-dev',gitlab:'alex.dev'};
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
