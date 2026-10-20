import { useEffect, useMemo, useRef, useState } from 'react';
import { STAGES, localDate } from './data';
import { WORKSPACE_KEY, DEMO_KEY, changeBoard, taskForDisplay, PALETTES } from './workspace';
import { WorkspaceSetup, MemberEditor, ProjectEditor, Members } from './WorkspaceForms';
import WorkspaceSettings, { useAccessibility, downloadJson, AccessibilityDialog } from './WorkspaceSettings';
import TaskEditor from './TaskEditor';
import Icon from './Icon';
import Projects from './Projects';
import TaskBoard from './TaskBoard';
import AnchorBoard from './AnchorBoard';
import BriefingReview from './BriefingReview';
import Milestones from './Milestones';
import { CONTEXT_TEMPLATE } from './context';
import { button, primaryButton } from './ui';
import NavigationHelp from './NavigationHelp';
import { shortcutAction } from './navigationAccess';
export { STAGES, TEAM } from './data';

export default function WorkspaceApp({store,demo=false,cloudControls=null}) {
  const {workspace,commit,error,mode}=store;
  const accessibility=useAccessibility();
  const [view,setView]=useState('projects'),[editing,setEditing]=useState(null),[reviewing,setReviewing]=useState(null),[memberEditor,setMemberEditor]=useState(null),[projectEditor,setProjectEditor]=useState(null);
  const [message,setMessage]=useState(''),[now,setNow]=useState(()=>new Date());
  const [settingsDirty,setSettingsDirty]=useState(false),[accessOpen,setAccessOpen]=useState(false),[menuOpen,setMenuOpen]=useState(false);
  const [help,setHelp]=useState(null);
  const main=useRef(null),boardControls=useRef(null);
  useEffect(()=>{if(!menuOpen)return;const close=e=>{if(e.key==='Escape'&&!document.querySelector('dialog[open]')){setMenuOpen(false);document.querySelector('.mobile-header button[aria-controls]')?.focus();}};document.addEventListener('keydown',close);return()=>document.removeEventListener('keydown',close);},[menuOpen]);
  const board=workspace?.boards.find(b=>b.id===workspace.selectedBoardId);
  useEffect(()=>{const tick=()=>setNow(new Date());const timer=setInterval(tick,60000);document.addEventListener('visibilitychange',tick);return()=>{clearInterval(timer);document.removeEventListener('visibilitychange',tick);};},[]);
  function navigate(next){if(next!==view&&settingsDirty&&!window.confirm('Discard your unsaved settings changes?'))return;setView(next);setMenuOpen(false);setMessage('');requestAnimationFrame(()=>{const heading=main.current?.querySelector('h1');if(heading){heading.setAttribute('tabindex','-1');heading.focus();}});}
  async function change(update,success){const result=await commit(update);if(result.ok&&success)setMessage(success);return result;}
  const changeCurrentBoard=update=>change(old=>changeBoard(old,board.id,update));
  const tasks=useMemo(()=>board?.tasks.map(t=>taskForDisplay(t,workspace,board))||[],[board,workspace]);
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
  const ready=Boolean(workspace?.name&&!workspace?.needsSetup);
  const projectView=view==='board'||view==='milestones';
  function openHelp(){setHelp({pageText:main.current?.innerText||'No page content available.'});}
  function accessAction(action) {
    if(action==='help')openHelp();
    else if(action==='accessibility')setAccessOpen(true);
    else if(action==='main')main.current?.focus();
    else if(action==='add')add();
    else if(action==='search')boardControls.current?.focusSearch();
    else if(action==='next'||action==='previous')boardControls.current?.focusTask(action==='next'?1:-1);
    else if(action.startsWith('stage-'))boardControls.current?.focusStage(Number(action.slice(-1)));
    else navigate(action);
  }
  function helpAction(action){setHelp(null);requestAnimationFrame(()=>requestAnimationFrame(()=>accessAction(action)));}
  useEffect(()=>{
    const key=e=>{
      const action=shortcutAction(e,{enabled:access.shortcuts,ready,boardVisible:view==='board',modalOpen:Boolean(document.querySelector('dialog[open]'))});
      if(action){e.preventDefault();accessAction(action);}
    };
    document.addEventListener('keydown',key);
    return()=>document.removeEventListener('keydown',key);
  });
  async function openBoard(id){const result=await change(old=>({...old,selectedBoardId:id}));if(result.ok)navigate('board');}
  return <div data-contrast={access.contrast} data-reduce-effects={String(access.reduceEffects)} className="app-shell" style={{'--feature-text':palette.feature[0],'--feature-bg':palette.feature[1],'--feature-border':palette.feature[2],'--bug-text':palette.bug[0],'--bug-bg':palette.bug[1],'--bug-border':palette.bug[2]}}>
    <a href="#main-content" className="skip-link" onClick={()=>main.current?.focus()}>Skip to main content</a>
    <header className="mobile-header"><button className="wordmark" onClick={()=>navigate('projects')} aria-label="Vibecoding Project Tracker home"><strong>Vibecoding</strong><span>Project Tracker</span></button><button className={button} aria-expanded={menuOpen} aria-controls="workspace-sidebar" onClick={()=>setMenuOpen(!menuOpen)}><Icon name={menuOpen?'close':'menu'}/>Menu</button></header>
    <aside id="workspace-sidebar" className={'workspace-sidebar '+(menuOpen?'is-open':'')} onKeyDown={e=>{if(e.key==='Escape'){setMenuOpen(false);document.querySelector('.mobile-header button[aria-controls]')?.focus();}}}>
      <button className="wordmark desktop-wordmark" onClick={()=>navigate('projects')} aria-label="Vibecoding Project Tracker home"><strong>Vibecoding</strong><span>Project Tracker</span></button>
      <p className="workspace-name">{workspace?.name||'Your workspace'}</p>
      {ready&&<nav aria-label="Workspace sections" className="sidebar-nav">
        {[['projects','Projects','projects'],['members','Team','team'],['settings','Appearance & settings','settings']].map(([id,label,icon])=><button key={id} aria-keyshortcuts={access.shortcuts?{projects:'p',members:'t',settings:'s'}[id]:undefined} aria-current={view===id||(id==='projects'&&projectView)?'page':undefined} onClick={()=>navigate(id)}><Icon name={icon}/><span>{label}</span></button>)}
      </nav>}
      <div className="sidebar-utilities"><button className="text-action" aria-keyshortcuts={access.shortcuts?'h':undefined} onClick={openHelp}>Navigation & reading</button><button className="text-action" aria-keyshortcuts={access.shortcuts?'a':undefined} onClick={()=>setAccessOpen(true)}><Icon name="shield"/>Accessibility</button>{cloudControls}<a className="text-action" href={demo?window.location.pathname:'?demo=1'}>{demo?'Back to my workspace':'Explore demo'}<Icon name="arrow" size={16}/></a></div>
      <p className="sidebar-storage">{mode==='cloud'?'Shared with signed-in members':'Saved in this browser'}</p>
    </aside>
    <div className="workspace-content">
    <main id="main-content" aria-label="Workspace content" tabIndex={-1} ref={main}>
      {demo&&<p className="demo-notice">Demo workspace · Synthetic examples, separate from your work.</p>}
      {error&&<div role="alert" className="error-notice"><p>{error}</p><button className={button+' mt-3'} onClick={downloadRecovery}>Download recovery data</button></div>}
      <p role="status" aria-live="polite" className={'workspace-feedback '+(!message?'sr-only':'')}>{error?'':message}</p>
      {!workspace?<section className="empty-state"><h1>Your saved data needs attention</h1><p>Your records have been preserved. Download recovery data above, then inspect the saved data before resetting anything.</p><button className={button} onClick={()=>window.location.reload()}>Reload workspace</button></section>:!ready?<WorkspaceSetup existing={workspace} commit={commit} onDone={()=>{setView('projects');setMessage('Workspace created. Open your project to add the first task.');}}/>:<>
        {view==='projects'?<Projects workspace={workspace} onOpen={openBoard} onNew={()=>setProjectEditor({})} onEdit={b=>setProjectEditor({board:b})}/>:view==='members'?<Members workspace={workspace} onAdd={()=>setMemberEditor({})} onEdit={m=>setMemberEditor({member:m})}/>:view==='settings'?<WorkspaceSettings onDirtyChange={setSettingsDirty} workspace={workspace} commit={commit} onSaved={setMessage} accessibility={accessibility}/>:<>
          <button className="text-action back-projects" onClick={()=>navigate('projects')}><Icon name="back" size={18}/>All projects</button>
          <div className="page-heading"><div><h1 tabIndex={-1}>{board.name}</h1>{board.description&&<p className="whitespace-pre-wrap">{board.description}</p>}<span className="section-caption">{tasks.length} tasks · {tasks.filter(t=>t.status==='done').length} complete</span></div><div className="flex flex-wrap gap-3"><button className={button} onClick={()=>setProjectEditor({board})}>Edit project</button>{view==='board'&&<button className={primaryButton} onClick={()=>add()}><Icon name="plus"/>Add task</button>}</div></div>
          <nav aria-label="Project sections" className="project-tabs">{[['board','Board'],['milestones','Milestones']].map(([id,label])=><button key={id} aria-current={view===id?'page':undefined} onClick={()=>navigate(id)}>{label}</button>)}</nav>
          {view==='milestones'?<Milestones board={board} onChange={changeCurrentBoard} onSaved={setMessage}/>:<>
            <AnchorBoard key={board.id} board={board} onSave={async anchors=>{const result=await changeCurrentBoard(b=>({...b,anchors}));if(result.ok)setMessage('Deliverable links saved for '+board.name+'.');return result;}}/>
            <TaskBoard ref={boardControls} key={board.id} tasks={tasks} members={workspace.members} now={now} onAdd={add} onEdit={setEditing} onReview={setReviewing} shortcuts={access.shortcuts}/>
          </>}
        </>}
      </>}
    </main>
    <footer className="workspace-footer">{mode==='cloud'?'Shared workspace · signed-in members only':'Local workspace · stored in this browser'} · Prompts are copied only when you choose.</footer>
    </div>
    {accessOpen&&<AccessibilityDialog accessibility={accessibility} onClose={()=>setAccessOpen(false)} onSaved={setMessage}/>}
    {help&&<NavigationHelp accessibility={accessibility} ready={ready} boardVisible={view==='board'} pageText={help.pageText} onAction={helpAction} onClose={()=>setHelp(null)}/>}
    {editing&&<TaskEditor key={editing.id||'new'} task={editing} members={workspace.members} onSave={saveTask} onDelete={deleteTask} onClose={()=>setEditing(null)}/>}
    {reviewing&&<BriefingReview task={reviewing} onClose={()=>setReviewing(null)}/>}
    {memberEditor&&<MemberEditor member={memberEditor.member} workspace={workspace} commit={commit} onClose={()=>setMemberEditor(null)} onSaved={setMessage}/>}
    {projectEditor&&<ProjectEditor board={projectEditor.board} workspace={workspace} commit={commit} onClose={()=>setProjectEditor(null)} onSaved={text=>{setMessage(text);if(!projectEditor.board)setView('board');}}/>}
  </div>;
}
