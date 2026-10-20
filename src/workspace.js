import { AI_TOOLS } from './context.js';
import { STAGES, TEAM, validDate, validTasks } from './data.js';
import { initialAnchors, validAnchors } from './anchors.js';
import { demoTasks } from './demo.js';

export const WORKSPACE_KEY = 'vibetracker.workspace.v2';
export const DEMO_KEY = 'vibetracker.demo.workspace.v2';
export const PALETTES = {
  default: { name: 'Blue and rose', feature: ['#1D4ED8','#EFF6FF','#BFDBFE'], bug: ['#9F1239','#FFF1F2','#FECDD3'] },
  violet: { name: 'Violet and amber', feature: ['#6D28D9','#F5F3FF','#DDD6FE'], bug: ['#9A3412','#FFF7ED','#FED7AA'] },
  forest: { name: 'Forest and berry', feature: ['#166534','#F0FDF4','#BBF7D0'], bug: ['#9D174D','#FDF2F8','#FBCFE8'] },
};
export const newId = () => crypto.randomUUID();
const text = (value, max, required = false) => typeof value === 'string' && value.length <= max && (!required || Boolean(value.trim()));
const optionalDate = value => value === null || validDate(value);
const instant = value => typeof value === 'string' && Number.isFinite(Date.parse(value));
const unique = values => new Set(values).size === values.length;
export const validEmail = value => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const validHandle = value => !value || /^[A-Za-z0-9_][A-Za-z0-9_.-]{0,99}$/.test(value);

export function blankWorkspace() {
  return { schemaVersion: 2, name: '', members: [], boards: [], selectedBoardId: null, palette: 'default' };
}
export function makeBoard(name, description = '') {
  return { id: newId(), name: name.trim(), description: description.trim(), tasks: [], anchors: initialAnchors(), milestones: [] };
}
export function memberError(member) {
  if (!text(member.name, 100, true)) return 'Enter a member name of up to 100 characters.';
  if (!text(member.email, 254) || !validEmail(member.email)) return 'Enter a valid email address, or leave it empty.';
  if (!text(member.github,100) || !text(member.gitlab,100) || !validHandle(member.github) || !validHandle(member.gitlab)) return 'Enter a username rather than a profile URL. Use letters, numbers, dots, hyphens or underscores.';
  return '';
}
export function taskError(task) {
  if (!text(task.title, 160, true)) return 'Enter a task title of 1–160 characters.';
  if (!text(task.description, 4000)) return 'Description exceeds 4,000 characters. Your full draft is retained; shorten it before saving.';
  if (!text(task.context, 30000)) return 'Context exceeds 30,000 characters. Your full draft is retained; shorten it before saving.';
  if (!optionalDate(task.dueDate)) return 'Choose a valid due date, or leave it empty.';
  return '';
}
export function milestoneError(milestone) {
  if (!text(milestone.title, 160, true)) return 'Enter a milestone title of up to 160 characters.';
  if (!text(milestone.criterion, 2000, true)) return 'Describe how you will know this milestone has been reached (up to 2,000 characters).';
  if (!optionalDate(milestone.targetDate)) return 'Choose a valid target date, or leave it empty.';
  return '';
}
export function validWorkspace(value) {
  if (!value || value.schemaVersion !== 2 || !text(value.name,100) || !Object.hasOwn(PALETTES,value.palette) || !Array.isArray(value.members) || !Array.isArray(value.boards)) return false;
  if (!unique(value.members.map(m=>m?.id)) || !unique(value.boards.map(b=>b?.id))) return false;
  if (!value.members.every(m=>m && text(m.id,100,true) && !memberError(m))) return false;
  if (!value.name.trim()) return value.members.length===0 && value.boards.length===0 && value.selectedBoardId===null;
  if (!value.boards.every(b=>b && typeof b.name==='string')) return false;
  if (!value.boards.length || !value.boards.some(b=>b.id===value.selectedBoardId)) return false;
  if (!unique(value.boards.map(b=>b.name?.trim().toLowerCase()))) return false;
  const members = new Set(value.members.map(m=>m.id));
  return value.boards.every(board=>board && text(board.id,100,true) && text(board.name,100,true) && text(board.description,2000) && validAnchors(board.anchors) &&
    Array.isArray(board.tasks) && unique(board.tasks.map(t=>t?.id)) && board.tasks.every(t=>t && text(t.id,100,true) && !taskError(t) &&
      ['feature','bug'].includes(t.type) && STAGES.some(s=>s.id===t.status) && (t.assigneeId===null || members.has(t.assigneeId)) &&
      validDate(t.createdDate) && (t.contextTool===null || AI_TOOLS.includes(t.contextTool)) && (t.contextUpdatedAt===null || instant(t.contextUpdatedAt))) &&
    Array.isArray(board.milestones) && unique(board.milestones.map(m=>m?.id)) && board.milestones.every(m=>m && text(m.id,100,true) && !milestoneError(m) &&
      ['pending','reached'].includes(m.status) && (m.status==='pending'?m.reachedAt===null:instant(m.reachedAt))));
}
export function createWorkspace(name, member, boardName) {
  const board=makeBoard(boardName);
  return { ...blankWorkspace(), name:name.trim(), members:[{...member,id:newId()}], boards:[board], selectedBoardId:board.id };
}
export function boardNameError(name, workspace, exceptId = null) {
  if (!text(name,100,true)) return 'Enter a project name of up to 100 characters.';
  return workspace.boards.some(b=>b.id!==exceptId && b.name.toLowerCase()===name.trim().toLowerCase()) ? 'A project with that name already exists.' : '';
}
export function changeBoard(workspace, id, update) {
  if (!workspace.boards.some(b=>b.id===id)) throw new Error('Project not found.');
  return {...workspace,boards:workspace.boards.map(b=>b.id===id?update(b):b)};
}
export function removeMember(workspace, id) {
  return {...workspace,members:workspace.members.filter(m=>m.id!==id),boards:workspace.boards.map(b=>({...b,tasks:b.tasks.map(t=>t.assigneeId===id?{...t,assigneeId:null}:t)}))};
}
export function taskForDisplay(task, workspace, board) {
  const member=workspace.members.find(m=>m.id===task.assigneeId);
  return {...task,assignee:member?.name || 'Unassigned',projectName:board.name};
}
export function initialWorkspace(storage, demo = false) {
  const prefix=demo?'vibetracker.demo':'vibetracker';
  const rawTasks=storage.getItem(prefix+'.tasks');
  const rawAnchors=storage.getItem(prefix+'.anchors');
  if (!demo && rawTasks===null && rawAnchors===null) return blankWorkspace();
  const tasks=rawTasks===null?(demo?demoTasks():[]):JSON.parse(rawTasks);
  const anchors=rawAnchors===null?initialAnchors():JSON.parse(rawAnchors);
  if (!validTasks(tasks) || !validAnchors(anchors)) throw new Error('Legacy records need recovery.');
  const members=TEAM.map((name,index)=>({id:'imported-member-'+index,name,email:'',github:'',gitlab:'',example:true}));
  const board={...makeBoard(demo?'Example project':'Imported project'),anchors,tasks:tasks.map(t=>{
    const {assignee,...rest}=t;
    return {...rest,assigneeId:members.find(m=>m.name===assignee)?.id || null};
  })};
  return {...blankWorkspace(),name:demo?'Example workspace':'My workspace',members,boards:[board],selectedBoardId:board.id,...(!demo?{needsSetup:true}:{})};
}
