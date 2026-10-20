import { STAGES, TEAM, localDate, dateOffset } from './data.js';
export function demoTasks(now = new Date()) {
 const titles = [
  ['Capture a new feature','Record the next prompt','Plan a teammate handover'],
  ['Refine the task editor','Investigate a reported error','Continue a saved AI session'],
  ['Review the context briefing','Check a completed fix','Verify the deliverable link'],
  ['Connect the repository','Define the board workflow','Save the design decisions'],
 ];
 return STAGES.flatMap((stage,column)=>titles[column].map((title,index)=>({
  id:'pitch-demo-'+(column*3+index+1),title,
  description:'Synthetic example for demonstrating '+stage.label.toLowerCase()+' work. This is not a record of a real user session.',
  type:index===1?'bug':'feature',status:stage.id,assignee:TEAM[index],
  dueDate:index===2?null:dateOffset(column===2?-1:index===0?3:0,now),
  createdDate:localDate(now),
  context:'## Background\nDemonstration task: '+title+'.\n\n## Constraints\nUse the existing React scaffold and local browser storage.\n\n## Prompts and outcomes\nSynthetic prompt example: explain the next smallest change for this task. No real AI response or successful outcome is claimed by this fixture.\n\n## Tried so far\nThis is demonstration content, not observed development history.\n\n## Pick up\nReview the task, check the requirements, then record the next actual result.',
  contextTool:'Other',contextUpdatedAt:now.toISOString(),
 })));
}
