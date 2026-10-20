import test from 'node:test';
import assert from 'node:assert/strict';
import { dueState } from './deadlines.js';
import { validDate, validTasks, seedTasks } from './data.js';
test('date-only deadline changes only after end of selected local day',()=>{
 const task={dueDate:'2026-10-20',status:'todo'};
 assert.equal(dueState(task,new Date('2026-10-20T23:59:59.999')).label,'Due within 24 hours');
 assert.equal(dueState(task,new Date('2026-10-21T00:00:00')).label,'Overdue');
 assert.equal(dueState(task,new Date('2026-10-20T23:59:59.999')).card,'soon');
 assert.equal(dueState(task,new Date('2026-10-21T00:00:00')).card,'urgent');
});
test('24/48 hour boundaries have no undefined interval',()=>{
 const task={dueDate:'2026-10-22',status:'review'};
 const end=new Date('2026-10-22T23:59:59.999').getTime();
 assert.equal(dueState(task,new Date(end-24*3600000)).label,'Due within 24 hours');
 assert.equal(dueState(task,new Date(end-24*3600000-1)).label,'Due soon');
 assert.equal(dueState(task,new Date(end-48*3600000)).label,'Due soon');
 assert.equal(dueState(task,new Date(end-48*3600000-1)).label,'On track');
});
test('completed cards override overdue with Complete; undated cards stay neutral',()=>{
 assert.equal(dueState({status:'done',dueDate:'2000-01-01'}).label,'Complete');
 assert.equal(dueState({status:'done',dueDate:'2000-01-01'}).card,'complete');
 assert.equal(dueState({status:'done',dueDate:'2000-01-01'}).id,'neutral');
 assert.equal(dueState({status:'todo',dueDate:null}).id,'neutral');
 assert.equal(dueState({status:'todo',dueDate:null}).card,'plain');
});
test('calendar validation rejects impossible dates; fixtures satisfy model',()=>{
 assert.equal(validDate('2026-02-30'),false);
 assert.equal(validDate('2024-02-29'),true);
 assert.equal(validTasks(seedTasks()),true);
 const bad=seedTasks();bad[0].status='unknown';assert.equal(validTasks(bad),false);
});

import { demoTasks } from './demo.js';
test('demo has three valid synthetic tasks per stage and complete context',()=>{
 const tasks=demoTasks();assert.equal(tasks.length,12);assert.equal(validTasks(tasks),true);
 for(const status of ['todo','in-progress','review','done']) assert.equal(tasks.filter(t=>t.status===status).length,3);
 assert.ok(tasks.every(t=>t.context.includes('Example prompt:')&&t.context.includes('Example outcome:')&&t.context.includes('practice content')));
});
test('month, leap-year and local daylight-saving date boundaries keep the selected calendar day',()=>{
 for(const date of ['2024-02-29','2026-03-29','2026-10-25','2026-12-31']){
   const end=new Date(date+'T23:59:59.999'),next=new Date(end.getTime()+1);
   assert.equal(dueState({status:'review',dueDate:date},end).id,'warning');
   assert.equal(dueState({status:'review',dueDate:date},next).id,'overdue');
 }
});
