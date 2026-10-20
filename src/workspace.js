import { AI_TOOLS } from './context.js';
import { STAGES, TEAM, validDate, validTasks } from './data.js';
import { initialAnchors, validAnchors } from './anchors.js';
import {addExampleProject} from './exampleProject.js';
import { demoTasks } from './demo.js';
import {attemptsError,validAttempts} from './attempts.js';

export const WORKSPACE_KEY = 'vibetracker.workspace.v2';
export const DEMO_KEY = 'vibetracker.demo.workspace.v2';
export const PALETTES = {
  default: { name: 'Blue and rose', feature: ['#1E3A8A','#BFDBFE','#1E40AF'], bug: ['#700B2B','#FDA4AF','#9F1239'] },
  violet: { name: 'Violet and amber', feature: ['#4C1D95','#DDD6FE','#6D28D9'], bug: ['#7C2D12','#FDBA74','#9A3412'] },
  forest: { name: 'Forest and berry', feature: ['#14532D','#86EFAC','#166534'], bug: ['#701A46','#F9A8D4','#9D174D'] },
};
// Card urgency is independent of feature/bug colours. Every state also has words.
export const CARD_PALETTES = {
  traffic: {name:'Red, amber and green',urgent:['#F87171','#7F1D1D','#450A0A'],soon:['#FBBF24','#78350F','#422006'],complete:['#4ADE80','#14532D','#052E16']},
  blue: {name:'Blue, amber and purple',urgent:['#60A5FA','#1E3A8A','#172554'],soon:['#FBBF24','#78350F','#422006'],complete:['#C084FC','#581C87','#3B0764']},
  mono: {name:'Greys with labels and borders',urgent:['#94A3B8','#1E293B','#0F172A'],soon:['#CBD5E1','#334155','#1E293B'],complete:['#E2E8F0','#334155','#1E293B']},
};
export function cardPaletteStyle(id='traffic') {
  const palette=CARD_PALETTES[id]||CARD_PALETTES.traffic;
  return Object.fromEntries(['urgent','soon','complete'].flatMap(state=>['bg','border','text'].map((part,index)=>['--card-'+state+'-'+part,palette[state][index]])));
}
export const newId = () => crypto.randomUUID();
const text = (value, max, required = false) => typeof value === 'string' && value.length <= max && (!required || Boolean(value.trim()));
const optionalDate = value => value === null || validDate(value);
const instant = value => typeof value === 'string' && Number.isFinite(Date.parse(value));
const unique = values => new Set(values).size === values.length;
export const validEmail = value => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const validHandle = value => !value || /^[A-Za-z0-9_][A-Za-z0-9_.-]{0,99}$/.test(value);

export function blankWorkspace() {
  return { schemaVersion: 2, name: '', members: [], boards: [], selectedBoardId: null, palette: 'default', cardPalette:'traffic' };
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
  if(attemptsError(task.attempts))return attemptsError(task.attempts);
  return '';
}
export function milestoneError(milestone) {
  if (!text(milestone.title, 160, true)) return 'Enter a milestone title of up to 160 characters.';
  if (!text(milestone.criterion, 2000, true)) return 'Describe how you will know this milestone has been reached (up to 2,000 characters).';
  if (!optionalDate(milestone.targetDate)) return 'Choose a valid target date, or leave it empty.';
  return '';
}
export function validWorkspace(value) {
  if (!value || value.schemaVersion !== 2 || !text(value.name,100) || !Object.hasOwn(PALETTES,value.palette) || (value.cardPalette!==undefined&&!Object.hasOwn(CARD_PALETTES,value.cardPalette)) || !Array.isArray(value.members) || !Array.isArray(value.boards)) return false;
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
      validDate(t.createdDate) && validAttempts(t.attempts) && (t.contextTool===null || AI_TOOLS.includes(t.contextTool)) && (t.contextUpdatedAt===null || instant(t.contextUpdatedAt))) &&
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
export function memberLabel(member, members, detail=false) {
  const sameName=members.filter(m=>m.name.trim().toLowerCase()===member.name.trim().toLowerCase());
  if(!detail&&sameName.length===1)return member.name;
  const contact=member.email||member.github&&'GitHub: '+member.github||member.gitlab&&'GitLab: '+member.gitlab;
  if(contact&&sameName.filter(m=>(m.email||m.github&&'GitHub: '+m.github||m.gitlab&&'GitLab: '+m.gitlab)===contact).length===1)return member.name+' · '+contact;
  const short=member.id.slice(-8);
  const reference=members.filter(m=>m.id.slice(-8)===short).length===1?short:member.id;
  return member.name+' · '+reference;
}
export function taskForDisplay(task, workspace, board) {
  const member=workspace.members.find(m=>m.id===task.assigneeId);
  return {...task,assignee:member?memberLabel(member,workspace.members):'Unassigned',projectName:board.name};
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
  const result={...blankWorkspace(),name:demo?'Example workspace':'My workspace',members,boards:[board],selectedBoardId:board.id,...(!demo?{needsSetup:true}:{})};
  return demo&&rawTasks===null&&rawAnchors===null?addExampleProject(result,globalThis.location?.origin||'http://localhost:5173'):result;
}
