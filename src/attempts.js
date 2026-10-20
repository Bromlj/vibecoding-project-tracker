import {AI_TOOLS} from './aiTools.js';

export const ATTEMPT_RESULTS = {worked:'Worked',partial:'Partly worked',failed:'Failed'};
export const MAX_ATTEMPTS = 50;
export const ATTEMPT_LIMITS = {prompt:12000,outcome:4000,lesson:2000};
export function attemptError(attempt) {
  if(!attempt||typeof attempt.id!=='string'||!attempt.id||attempt.id.length>100)return 'Invalid attempt identity.';
  for(const [field,max] of Object.entries(ATTEMPT_LIMITS)) {
    if(typeof attempt[field]!=='string'||!attempt[field].trim())return 'Enter '+(field==='lesson'?'a lesson or reason':field==='outcome'?'what happened':'the prompt used')+'.';
    if(attempt[field].length>max)return field[0].toUpperCase()+field.slice(1)+' exceeds '+max.toLocaleString()+' characters. Shorten it before saving.';
  }
  if(!Object.hasOwn(ATTEMPT_RESULTS,attempt.result))return 'Choose Worked, Partly worked or Failed.';
  if(attempt.tool!==null&&!AI_TOOLS.includes(attempt.tool))return 'Choose a listed AI tool or leave it unspecified.';
  if(typeof attempt.includeInBrief!=='boolean')return 'Choose whether to include the attempt in the briefing.';
  if(attempt.author!==undefined&&(typeof attempt.author!=='string'||attempt.author.length>100))return 'Recorded-by name must be at most 100 characters.';
  return '';
}
export function attemptsError(attempts) {
  if(attempts===undefined)return ''; // Existing tasks have no timeline.
  if(!Array.isArray(attempts)||attempts.length>MAX_ATTEMPTS)return 'Attempts & lessons allows up to '+MAX_ATTEMPTS+' records per task.';
  if(new Set(attempts.map(a=>a?.id)).size!==attempts.length)return 'Attempts & lessons contains duplicate records.';
  for(let i=0;i<attempts.length;i++){const error=attemptError(attempts[i]);if(error)return 'Attempt '+(i+1)+': '+error;}
  return '';
}
export function validAttempts(attempts) {
  if(attemptsError(attempts))return false;
  return (attempts||[]).every(a=>[a.createdAt,a.updatedAt].every(t=>typeof t==='string'&&Number.isFinite(Date.parse(t)))&&Date.parse(a.updatedAt)>=Date.parse(a.createdAt));
}
export function newAttempt(author='') {
  return {id:crypto.randomUUID(),author,prompt:'',tool:null,result:'',outcome:'',lesson:'',includeInBrief:false,createdAt:null,updatedAt:null};
}
const content = a => JSON.stringify([a.prompt,a.tool,a.result,a.outcome,a.lesson,a.includeInBrief,a.author||'']);
export function stampAttempts(attempts,original=[],now=new Date()) {
  return attempts?.map(a=>{
    const old=original.find(o=>o.id===a.id);
    return {...a,createdAt:old?.createdAt||now.toISOString(),updatedAt:old&&content(a)===content(old)?old.updatedAt:now.toISOString()};
  });
}
export function serializeAttempts(attempts=[]) {
  const selected=attempts.map((a,i)=>({a,index:i+1})).filter(({a})=>a.includeInBrief);
  if(!selected.length)return '';
  return '\n## Selected attempts & lessons\n'+selected.map(({a,index})=>
    '\n### Attempt '+index+' — '+(ATTEMPT_RESULTS[a.result]||'Result not selected')+
    '\nAI tool: '+(a.tool||'Not specified')+
    (a.author?'\nRecorded by: '+a.author:'')+
    '\n\n#### Prompt\n'+a.prompt+'\n\n#### Outcome\n'+a.outcome+'\n\n#### Lesson / next approach\n'+a.lesson+'\n'
  ).join('');
}
