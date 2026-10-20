import { AI_TOOLS } from './context.js';
import {validAttempts} from './attempts.js';
export const STAGES = [
  { id: 'todo', label: 'To Do' }, { id: 'in-progress', label: 'In Progress' },
  { id: 'review', label: 'Review' }, { id: 'done', label: 'Done' },
];
// These are demo slots, not claimed real participants. Replace with the agreed roster.
export const TEAM = ['Teammate A', 'Teammate B', 'Teammate C'];
export function localDate(date = new Date()) {
  return [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
}
export function dateOffset(days, now = new Date()) {
  const date = new Date(now); date.setDate(date.getDate()+days); return localDate(date);
}
export function seedTasks(now = new Date()) {
  const items = [
    ['Map the first user flow', 'Capture the intended path from project intent to shipped result.', 'feature','todo',3],
    ['Build the task editor', 'Keep add and edit in the same labelled form.', 'feature','in-progress',0],
    ['Check keyboard focus', 'Verify that focus returns to the control which opened the editor.', 'bug','review',-1],
    ['Connect the starter repository', 'Record the repository connection checkpoint.', 'feature','done',-2],
  ];
  return items.map(([title,description,type,status,offset],index)=>({
    id:'demo-'+(index+1),title,description,type,status,assignee:TEAM[index%TEAM.length],
    dueDate:dateOffset(offset,now),createdDate:localDate(now),
    context:'',contextTool:null,contextUpdatedAt:null,
  }));
}

export function validDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value+'T12:00:00');
  return !Number.isNaN(date.getTime()) && localDate(date) === value;
}
export function validTasks(value) {
  return Array.isArray(value) && new Set(value.map(t=>t?.id)).size===value.length && value.every(t=>
    t && typeof t.id==='string' && t.id.length>0 && typeof t.title==='string' && t.title.trim().length>0 && t.title.length<=160 &&
    typeof t.description==='string' && t.description.length<=4000 && ['feature','bug'].includes(t.type) &&
    STAGES.some(s=>s.id===t.status) && TEAM.includes(t.assignee) &&
    (t.dueDate===null || validDate(t.dueDate)) && validDate(t.createdDate) &&
    typeof t.context==='string' && t.context.length<=30000 && (t.contextTool===null || AI_TOOLS.includes(t.contextTool)) &&
    validAttempts(t.attempts) && (t.contextUpdatedAt===null || (typeof t.contextUpdatedAt==='string' && !Number.isNaN(Date.parse(t.contextUpdatedAt))))
  );
}
