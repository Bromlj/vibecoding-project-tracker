export {AI_TOOLS} from './aiTools.js';
import {serializeAttempts,stampAttempts} from './attempts.js';
export const CONTEXT_TEMPLATE = '## Background\n\n## Constraints\n\n## Prompts and outcomes\n\n## Tried so far\n\n## Pick up\n';
export function withContextTimestamp(draft, original, now = new Date()) {
  const changed = draft.context !== original.context || draft.contextTool !== original.contextTool || serializeAttempts(draft.attempts)!==serializeAttempts(original.attempts);
  return {...draft,...(draft.attempts?{attempts:stampAttempts(draft.attempts,original.attempts,now)}:{}),contextUpdatedAt:changed ? now.toISOString() : original.contextUpdatedAt};
}
export function updatedLabel(value, now = new Date()) {
  if (!value) return 'not yet saved';
  const minutes = Math.max(0,Math.floor((now.getTime()-new Date(value).getTime())/60000));
  if(minutes<1) return 'just now';
  if(minutes<60) return minutes+' min ago';
  if(minutes<1440) return Math.floor(minutes/60)+' h ago';
  return Math.floor(minutes/1440)+' days ago';
}

// Plain Markdown, not rendered HTML; user content is never executed.
export function serializeContext(task) {
  return '# Task: '+task.title+'\n\n'+(task.projectName?'Project: '+task.projectName+'\n':'')
    +'Status: '+task.status+'\nAssignee: '+task.assignee+'\nDue date: '+(task.dueDate||'Not set')+'\nAI tool: '+(task.contextTool||'Not specified')
    +'\n\n## Description\n'+(task.description||'Not provided')
    +'\n\n## Task context\n'+(task.context||'Not provided')+'\n'+serializeAttempts(task.attempts);
}


export const CONTEXT_SECTIONS = ['Background','Constraints','Prompts and outcomes','Tried so far','Pick up'];
export function briefingGaps(context) {
  const sections = new Map();
  let heading = '';
  for(const line of context.split(/\r?\n/)) {
    const match = line.match(/^#{1,6}\s+(.+?)\s*#*\s*$/);
    if(match) {heading=match[1].toLowerCase();if(!sections.has(heading))sections.set(heading,'');}
    else if(heading) sections.set(heading,(sections.get(heading)||'')+'\n'+line);
  }
  return CONTEXT_SECTIONS.filter(label=>!sections.get(label.toLowerCase())?.trim());
}

