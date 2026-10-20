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
  context:'## Background\nWorked example: '+title+'. This is practice content, not your project history.\n\n## Constraints\nUse the existing React scaffold. Keep keyboard access and save work across reloads.\n\n## Prompts and outcomes\nExample prompt: "Add a labelled contact form with required email validation. Keep typed values when validation fails."\nExample outcome: "The form is present and keeps its draft, but the error message needs a clearer label. The task stays in Review until keyboard and error checks pass."\nThese illustrate what to record; they do not claim that an AI call or user test took place.\n\n## Tried so far\nExample: checked an empty email and a correctly formatted address. Keep notes of errors as well as successful attempts.\n\n## Pick up\nReplace the example with your actual prompt and result. Note the next check and save before handing the task over.',
  contextTool:'Other',contextUpdatedAt:now.toISOString(),
 })));
}
