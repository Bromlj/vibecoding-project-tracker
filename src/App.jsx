import { useEffect, useMemo, useRef, useState } from 'react';
import { STAGES, localDate } from './data';
import { useLocalStorage } from './storage';
import { WORKSPACE_KEY, DEMO_KEY, initialWorkspace, validWorkspace, changeBoard, taskForDisplay, PALETTES } from './workspace';
import { WorkspaceSetup, MemberEditor, ProjectEditor, Members } from './WorkspaceForms';
import WorkspaceSettings, { useAccessibility, downloadJson } from './WorkspaceSettings';
import TaskEditor from './TaskEditor';
import TypeBadge from './TypeBadge';
import OwnerBadge from './OwnerBadge';
import CopyContext from './CopyContext';
import AnchorBoard from './AnchorBoard';
import BriefingReview from './BriefingReview';
import Milestones from './Milestones';
import { dueState, DUE_STYLES, displayDate } from './deadlines';
import { CONTEXT_TEMPLATE } from './context';
import { button, primaryButton, input } from './ui';
export { STAGES, TEAM } from './data';

export default function App() {
  const demo=new URLSearchParams(window.location.search).get('demo')==='1';
  const key=demo?DEMO_KEY:WORKSPACE_KEY;
  const [workspace,commit,error]=useLocalStorage(key,()=>initialWorkspace(localStorage,demo),validWorkspace);
  return <WorkspaceApp store={{workspace,commit,error,mode:'local'}} demo={demo}/>;
}

export function WorkspaceApp({store,demo=false,cloudControls=null}) {
  const {workspace,commit,error,mode}=store;
  const accessibility=useAccessibility();
  const [view,setView]=useState('board'),[editing,setEditing]=useState(null),[reviewing,setReviewing]=useState(null),[memberEditor,setMemberEditor]=useState(null),[projectEditor,setProjectEditor]=useState(null);
  const [message,setMessage]=useState(''),[search,setSearch]=useState(''),[owner,setOwner]=useState('all'),[type,setType]=useState('all'),[now,setNow]=useState(()=>new Date());
  const main=useRef(null);
  const board=workspace?.boards.find(b=>b.id===workspace.selectedBoardId);
  useEffect(()=>{const tick=()=>setNow(new Date());const timer=setInterval(tick,60000);document.addEventListener('visibilitychange',tick);return()=>{clearInterval(timer);document.removeEventListener('visibilitychange',tick);};},[]);
  useEffect(()=>{setSearch('');setOwner('all');setType('all');},[board?.id]);
  function navigate(next){setView(next);requestAnimationFrame(()=>{const heading=main.current?.querySelector('h1');if(heading){heading.setAttribute('tabindex','-1');heading.focus();}});}
  async function change(update,success){const result=await commit(update);if(result.ok&&success)setMessage(success);return result;}
  const changeCurrentBoard=update=>change(old=>changeBoard(old,board.id,update));
  const tasks=useMemo(()=>board?.tasks.map(t=>taskForDisplay(t,workspace,board))||[],[board,workspace]);
  const filtered=tasks.filter(t=>(type==='all'||t.type===type)&&(owner==='all'||(owner==='unassigned'?t.assigneeId===null:t.assigneeId===owner))&&(!search.trim()||(t.title+'\n'+t.description+'\n'+t.context).toLowerCase().includes(search.trim().toLowerCase())));
  const palette=PALETTES[workspace?.palette||'default'];
  const access=accessibility.preferences;
  function add(status='todo'){setEditing({id:'',title:'',description:'',type:'feature',status,assigneeId:null,dueDate:null,createdDate:localDate(),context:CONTEXT_TEMPLATE,contextTool:null,contextUpdatedAt:null,projectName:board.name});}
  async function saveTask(task){
    const {assignee,projectName,...record}=task;
    const result=await changeCurrentBoard(b=>({...b,tasks:b.tasks.some(t=>t.id===record.id)?b.tasks.map(t=>t.id===record.id?record:t):[...b.tasks,record]}));
    if(result.ok){setMessage('Task saved.');setEditing(null);}return result;
  }
  async function deleteTask(id){const result=await changeCurrentBoard(b=>({...b,tasks:b.tasks.filter(t=>t.id!==id)}));if(result.ok){setMessage('Task deleted.');setEditing(null);}return result;}
  function downloadRecovery(){const records={};for(const key of [WORKSPACE_KEY,DEMO_KEY,'vibetracker.tasks','vibetracker.anchors','vibetracker.demo.tasks','vibetracker.demo.anchors']){try{records[key]=localStorage.getItem(key);}catch{records[key]='Storage unavailable';}}downloadJson(records,'vibetracker-recovery.json');}
  return <div data-contrast={access.contrast} data-reduce-effects={String(access.reduceEffects)} className="min-h-screen bg-surface-page text-ink-primary" style={{'--feature-text':palette.feature[0],'--feature-bg':palette.feature[1],'--feature-border':palette.feature[2],'--bug-text':palette.bug[0],'--bug-bg':palette.bug[1],'--bug-border':palette.bug[2]}}>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:block focus:p-4">Skip to main content</a>
    <header className="border-b border-slate-300 bg-white px-4 py-4 sm:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3">
        <p className="text-xl font-semibold tracking-tight">Vibecoding Project Tracker<span className="text-brand-accent">.</span></p>
        <div className="flex flex-wrap items-center gap-3"><span className="text-sm text-ink-muted">{mode==='cloud'?'Shared workspace':'Local workspace'}</span>{cloudControls}<a className={button} href={demo?window.location.pathname:'?demo=1'}>{demo?'Back to my workspace':'Explore demo'}</a></div>
      </div>
    </header>
    <main id="main-content" tabIndex={-1} ref={main} className="mx-auto max-w-[1600px] px-4 py-6 sm:px-8">
      {demo&&<p className="mb-5 rounded-lg border border-brand-primary bg-white p-3 text-sm text-brand-primary">Demo workspace — synthetic examples, stored separately from your work.</p>}
      {error&&<div role="alert" className="mb-5 rounded-lg border border-red-400 bg-red-50 p-4 text-red-900"><p>{error}</p><button className={button+' mt-3'} onClick={downloadRecovery}>Download recovery data</button></div>}
      <p role="status" aria-live="polite" className="mb-3 min-h-6 text-sm font-medium text-brand-primary">{error?'':message}</p>
      {!workspace?<section className="mx-auto max-w-2xl py-12"><h1 className="text-3xl font-semibold">Your saved data needs attention</h1><p className="mt-4 text-ink-muted">Your records have been preserved. Download recovery data above, then inspect the saved data before resetting anything.</p><button className={button+' mt-5'} onClick={()=>window.location.reload()}>Reload workspace</button></section>:!workspace.name?<WorkspaceSetup commit={commit} onDone={()=>setMessage('Workspace created. Add your first task or invite your team after connecting shared access.')}/>:<>
        <div className="mb-7 border-b border-slate-300 pb-5">
          <p className="break-words text-lg font-semibold">{workspace.name}</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-wrap items-end gap-3"><label className="block min-w-0 font-medium">Project board<select aria-label="Project board" className={input+' max-w-sm'} value={workspace.selectedBoardId} onChange={async e=>{const result=await change(old=>({...old,selectedBoardId:e.target.value}),'Project board changed.');if(result.ok)navigate('board');}}>{workspace.boards.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}</select></label><button className={button} onClick={()=>setProjectEditor({})}>New project</button></div>
            <nav aria-label="Workspace sections" className="flex flex-wrap gap-1">{[['board','Board'],['milestones','Milestones'],['members','Members'],['settings','Workspace settings']].map(([id,label])=><button key={id} className={view===id?primaryButton:button} aria-current={view===id?'page':undefined} onClick={()=>navigate(id)}>{label}</button>)}</nav>
          </div>
        </div>
        {view==='members'?<Members workspace={workspace} onAdd={()=>setMemberEditor({})} onEdit={m=>setMemberEditor({member:m})}/>:view==='settings'?<WorkspaceSettings workspace={workspace} commit={commit} onSaved={setMessage} accessibility={accessibility}/>:view==='milestones'?<><h1 tabIndex={-1} className="mb-6 break-words text-3xl font-semibold">{board.name}</h1><Milestones board={board} onChange={changeCurrentBoard} onSaved={setMessage}/></>:<>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div className="min-w-0"><h1 tabIndex={-1} className="break-words text-3xl font-semibold tracking-tight">{board.name}</h1>{board.description&&<p className="mt-2 max-w-prose whitespace-pre-wrap break-words text-ink-muted">{board.description}</p>}<p className="mt-2 text-sm text-ink-muted">{tasks.length} tasks · {tasks.filter(t=>t.status==='done').length} complete</p></div><div className="flex flex-wrap gap-3"><button className={button} onClick={()=>setProjectEditor({board})}>Edit project</button><button className={primaryButton} onClick={()=>add()}>Add task</button></div></div>
          <AnchorBoard key={board.id} board={board} onSave={async anchors=>{const result=await changeCurrentBoard(b=>({...b,anchors}));if(result.ok)setMessage('Deliverable links saved for '+board.name+'.');return result;}}/>
          <section aria-label="Find tasks" className="mb-6 flex flex-wrap items-end gap-3"><label className="block min-w-0 flex-[2_1_15rem] font-medium">Search tasks<input type="search" className={input} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Title, description or context"/></label><label className="block min-w-0 flex-[1_1_11rem] font-medium">Owner<select className={input} value={owner} onChange={e=>setOwner(e.target.value)}><option value="all">Everyone</option><option value="unassigned">Unassigned</option>{workspace.members.map(m=><option key={m.id} value={m.id}>{m.name}{m.email?' · '+m.email:''}</option>)}</select></label><label className="block flex-[1_1_9rem] font-medium">Type<select className={input} value={type} onChange={e=>setType(e.target.value)}><option value="all">Features and bugs</option><option value="feature">Features</option><option value="bug">Bugs</option></select></label>{(search||owner!=='all'||type!=='all')&&<button className={button} onClick={()=>{setSearch('');setOwner('all');setType('all');}}>Clear filters</button>}</section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><p role="status" className="text-sm text-ink-muted">{filtered.length} of {tasks.length} tasks shown</p><nav aria-label="Jump to board stage" className="flex flex-wrap gap-2 xl:hidden">{STAGES.map(s=><a key={s.id} className={button} href={'#stage-'+s.id}>{s.label} ({filtered.filter(t=>t.status===s.id).length})</a>)}</nav></div>
          {tasks.length>0&&filtered.length===0?<div className="rounded-xl border border-dashed border-slate-400 bg-white p-8"><h2 className="text-xl font-semibold">No matching tasks</h2><p className="mt-2 text-ink-muted">Try another search, owner or type, or clear your filters.</p><button className={button+' mt-4'} onClick={()=>{setSearch('');setOwner('all');setType('all');}}>Clear filters</button></div>:<section aria-label="Kanban board" className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-4">
            {STAGES.map(stage=><section key={stage.id} aria-labelledby={'stage-'+stage.id} className="min-w-0"><div className="mb-4 flex items-center gap-3 border-b-2 border-slate-300 pb-3"><h2 id={'stage-'+stage.id} tabIndex={-1} className="scroll-mt-5 font-semibold">{stage.label}</h2><span className="ml-auto text-sm tabular-nums text-ink-muted">{filtered.filter(t=>t.status===stage.id).length}<span className="sr-only"> tasks</span></span></div>
              <ul className="space-y-3">{filtered.filter(t=>t.status===stage.id).map(task=><li key={task.id} data-task-id={task.id} className={'rounded-xl border border-slate-300 p-4 '+DUE_STYLES[dueState(task,now).id]}>
                <div className="flex items-start justify-between gap-2"><TypeBadge type={task.type}/><span className="font-mono text-xs text-ink-muted" title={'Task ID: '+task.id}>{task.id.slice(0,8)}</span></div>
                <h3 className="mt-2"><button className="min-h-11 w-full rounded text-left font-semibold underline-offset-4 hover:text-brand-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary [overflow-wrap:anywhere]" aria-label={'Edit task: '+task.title} onClick={()=>setEditing(task)}>{task.title}</button></h3>
                {task.description&&<p className="mt-1 line-clamp-2 whitespace-pre-wrap break-words text-sm text-ink-muted">{task.description}</p>}
                <div className="mt-3"><OwnerBadge name={task.assignee}/></div><p className="mt-3 text-sm font-medium">{dueState(task,now).label}{task.dueDate&&<> · Due <time dateTime={task.dueDate}>{displayDate(task.dueDate)}</time></>}</p>
                <div className="mt-3 flex flex-wrap items-start gap-2 border-t border-slate-300 pt-3"><CopyContext task={task} compact/><button className={button} onClick={()=>setReviewing(task)}>Review briefing</button></div>
              </li>)}</ul>
              {!filtered.some(t=>t.status===stage.id)&&<div className="rounded-xl border border-dashed border-slate-400 p-5"><p className="mb-3 text-sm text-ink-muted">{tasks.some(t=>t.status===stage.id)?'No matching tasks in this stage.':'No tasks here yet.'}</p><button className={button} onClick={()=>add(stage.id)}>Add task</button></div>}
            </section>)}
          </section>}
        </>}
      </>}
    </main>
    <footer className="mx-auto max-w-[1600px] px-4 py-7 text-sm text-ink-muted sm:px-8">{mode==='cloud'?'Shared workspace · signed-in members only':'Local workspace · stored in this browser'} · Prompts are copied only when you choose.</footer>
    {editing&&<TaskEditor key={editing.id||'new'} task={editing} members={workspace.members} onSave={saveTask} onDelete={deleteTask} onClose={()=>setEditing(null)}/>}
    {reviewing&&<BriefingReview task={reviewing} onClose={()=>setReviewing(null)}/>}
    {memberEditor&&<MemberEditor member={memberEditor.member} workspace={workspace} commit={commit} onClose={()=>setMemberEditor(null)} onSaved={setMessage}/>}
    {projectEditor&&<ProjectEditor board={projectEditor.board} workspace={workspace} commit={commit} onClose={()=>setProjectEditor(null)} onSaved={setMessage}/>}
  </div>;
}
