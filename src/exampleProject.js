import {STAGES,localDate,dateOffset} from './data.js';
import {initialAnchors} from './anchors.js';

export const EXAMPLE_PROJECT_ID='example-studysprint-v1';
export function addExampleProject(workspace,origin='http://localhost:5173',now=new Date()) {
  if(workspace.boards.some(b=>b.id===EXAMPLE_PROJECT_ID))return {...workspace,selectedBoardId:EXAMPLE_PROJECT_ID};
  const people=['Alex Morgan','Sam Patel','Jordan Lee'].map((name,i)=>({
    id:'studysprint-member-'+i,name,email:['alex','sam','jordan'][i]+'@example.test',
    github:'',gitlab:'',example:true,
  }));
  const titles=[
    ['Add weekly study goals','Fix empty goal validation','Explore calendar export'],
    ['Build accessible study timer','Keep the timer running after tab changes','Prepare a teammate handover'],
    ['Review keyboard navigation','Check reminder date boundaries','Review the release briefing'],
    ['Create the React project','Fix lost notes after reload','Define readable themes'],
  ];
  const tasks=STAGES.flatMap((stage,col)=>titles[col].map((title,i)=>{
    const id='studysprint-task-'+(col*3+i+1);
    const owner=people[(col+i)%3];
    const attempts=col===1&&i===0?[
      {prompt:'Create a study timer that counts down every second using setInterval.',result:'failed',outcome:'The example timer drifted when the tab was inactive.',lesson:'Count from an end timestamp instead of counting interval callbacks.',tool:'ChatGPT',author:people[0].name,includeInBrief:true},
      {prompt:'Use an end timestamp for the timer. Keep pause and resume accessible with labelled buttons.',result:'partial',outcome:'The countdown stayed accurate, but every second was announced to a screen reader.',lesson:'Announce pause, resume and completion only; keep per-second updates silent.',tool:'Codex',author:people[1].name,includeInBrief:true},
      {prompt:'Keep the visible countdown updated. Announce only timer state changes and retain keyboard focus.',result:'worked',outcome:'In this fictional example, the timer retained focus and announced only state changes. Jordan will review it next.',lesson:'Separate frequent visual updates from meaningful announcements. Recheck with a real screen-reader user.',tool:'Claude',author:people[2].name,includeInBrief:false},
    ]:col>=2?[{prompt:'Implement '+title.toLowerCase()+'. Preserve input and provide keyboard access.',result:col===3?'worked':'partial',outcome:col===3?'Example implementation is recorded as complete.':'Example implementation needs a second teammate to review it.',lesson:'Record the expected behaviour and a reproducible check before handing over.',tool:'Codex',author:owner.name,includeInBrief:true}]:[];
    return {id,title,type:i===1?'bug':'feature',status:stage.id,
      description:'Fictional StudySprint study-planner project. '+(col===1&&i===0?'Start here: Alex, Sam and Jordan tried three approaches. Inspect Attempts & lessons, then hand the task to another member.':'Use this task to practise editing, assigning, moving and recording your work.'),
      assigneeId:col===0&&i===2?null:owner.id,
      dueDate:i===2?null:dateOffset(col===2?-1:col===0?3:i===1?1:0,now),createdDate:dateOffset(-5,now),
      context:'## Background\nStudySprint helps students plan focused study sessions. This is synthetic demo content.\n\n## Constraints\nReact, keyboard access, readable themes and local persistence. No real student data.\n\n## Prompts and outcomes\nSee the separate Attempts & lessons timeline for example prompts and results. These are fictional, not executed AI calls or observed user tests.\n\n## Tried so far\nThe team has split implementation, testing and review between Alex, Sam and Jordan.\n\n## Pick up\nOpen the timeline, select useful lessons for the next briefing, then hand off using the Details tab. Current task: '+title+'.',
      contextTool:'Codex',contextUpdatedAt:now.toISOString(),
      attempts:attempts.map((a,index)=>({...a,id:id+'-attempt-'+index,createdAt:new Date(now.getTime()-(attempts.length-index)*3600000).toISOString(),updatedAt:new Date(now.getTime()-(attempts.length-index)*3600000).toISOString()})),
    };
  }));
  let name='StudySprint · team example',suffix=2;
  while(workspace.boards.some(b=>b.name.trim().toLowerCase()===name.toLowerCase()))name='StudySprint · team example '+suffix++;
  const board={id:EXAMPLE_PROJECT_ID,name,description:'A populated fictional team project. Explore assigned tasks, recorded attempts and teammate handovers. All activity is local simulation.',tasks,
    anchors:initialAnchors().map(a=>({...a,url:new URL('/examples/studysprint.html#'+a.id,origin).href})),
    milestones:[
      {id:'study-foundation',title:'Foundation ready',criterion:'Project scaffold, saved notes and readable themes are in place.',targetDate:dateOffset(-2,now),status:'reached',reachedAt:now.toISOString()},
      {id:'study-access',title:'Accessible timer ready for review',criterion:'Timer keeps focus and announces only pause, resume and completion; teammate completes keyboard review.',targetDate:dateOffset(1,now),status:'pending',reachedAt:null},
      {id:'study-release',title:'Release rehearsal',criterion:'All release tasks reviewed, useful lessons copied and deliverable links checked.',targetDate:dateOffset(5,now),status:'pending',reachedAt:null},
    ]};
  return {...workspace,members:[...workspace.members,...people.filter(p=>!workspace.members.some(m=>m.id===p.id))],boards:[...workspace.boards,board],selectedBoardId:board.id};
}
