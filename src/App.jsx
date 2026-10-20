import { useEffect, useRef, useState } from 'react';
import { STAGES, TEAM, seedTasks, localDate, validTasks } from './data';
import { useLocalStorage } from './storage';
import TaskEditor from './TaskEditor';
import TypeBadge from './TypeBadge';
import OwnerBadge from './OwnerBadge';
import CopyContext from './CopyContext';
import { dueState, DUE_STYLES, displayDate } from './deadlines';
import { CONTEXT_TEMPLATE } from './context';
import { button, primaryButton } from './ui';
export { STAGES, TEAM } from './data';

export default function App() {
  const [tasks,setTasks,storageError] = useLocalStorage('vibetracker.tasks',seedTasks,validTasks);
  const [editing,setEditing] = useState(null);
  const [message,setMessage] = useState('');
  const [now,setNow] = useState(()=>new Date());
  useEffect(()=>{const tick=()=>setNow(new Date());const timer=setInterval(tick,60000);document.addEventListener('visibilitychange',tick);return ()=>{clearInterval(timer);document.removeEventListener('visibilitychange',tick);};},[]);
  const opener = useRef(null);
  const addButton = useRef(null);
  function open(task, event) { opener.current=event.currentTarget;setEditing(task); }
  function close() {
    setEditing(null);
    requestAnimationFrame(()=> (opener.current?.isConnected?opener.current:addButton.current)?.focus());
  }
  function add(event) { open({id:'',title:'',description:'',type:'feature',status:'todo',assignee:TEAM[0],dueDate:null,createdDate:localDate(),context:CONTEXT_TEMPLATE,contextTool:null,contextUpdatedAt:null},event); }
  function save(task) {
    setTasks(old=>old.some(t=>t.id===task.id)?old.map(t=>t.id===task.id?task:t):[...old,task]);
    setMessage(editing?.id && editing.assignee !== task.assignee ? 'Task assigned to '+task.assignee+'.' : 'Task saved.'); close();
  }
  function remove(id) { setTasks(old=>old.filter(t=>t.id!==id)); setMessage('Task deleted.'); close(); }
  return <div className="min-h-screen bg-surface-page text-ink-primary">
    <a href="#board" className="sr-only focus:not-sr-only focus:block focus:p-4">Skip to board</a>
    <header className="border-b border-slate-200 bg-white px-4 py-6 sm:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4">
        <div><h1 className="text-3xl font-semibold tracking-tight">Vibecoding Project Tracker<span className="text-brand-accent">.</span></h1>
        <p className="mt-2 text-ink-muted">From intent to ship. Keep the task and its context together.</p></div>
        <button ref={addButton} className={primaryButton} onClick={add}><span aria-hidden="true">+</span> Add task</button>
      </div>
    </header>
    <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-8">
      {storageError&&<p role="alert" className="mb-5 rounded-lg border border-red-400 bg-red-50 p-4 text-red-900">{storageError}</p>}
      <p role="status" aria-live="polite" className="mb-4 min-h-6 text-sm text-brand-primary">{message}</p>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div><h2 id="board-title" className="text-2xl font-semibold">Project board</h2>
        <p className="mt-1 text-sm text-ink-muted">{tasks.length} tasks · {storageError ? "changes not saved" : "saved in this browser"}</p></div>
        <p className="text-sm text-ink-muted">Team names are demo placeholders.</p>
      </div>
      <p className="mb-4 text-sm text-ink-muted">Deadline tint: calm beyond 48h · warning within 48h · overdue after the due day · completed tasks neutral.</p><section id="board" aria-labelledby="board-title" className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {STAGES.map(stage=><section key={stage.id} aria-labelledby={'stage-'+stage.id} className="min-w-0">
          <div className="mb-4 flex items-center gap-3 border-b-2 border-slate-300 pb-3">
            <span className="h-2 w-2 rounded-full bg-brand-primary" aria-hidden="true"/>
            <h3 id={'stage-'+stage.id} className="font-semibold">{stage.label}</h3>
            <span className="ml-auto text-sm tabular-nums text-ink-muted">{tasks.filter(t=>t.status===stage.id).length}<span className="sr-only"> tasks</span></span>
          </div>
          <ul className="space-y-3">{tasks.filter(t=>t.status===stage.id).map(task=><li key={task.id} data-task-id={task.id} className={"rounded-xl border border-slate-300 p-4 "+DUE_STYLES[dueState(task,now).id]}>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2"><p className="break-all font-mono text-xs text-ink-muted">{task.id}</p><TypeBadge type={task.type}/></div>
            <h4><button onClick={e=>open(task,e)} className="min-h-11 w-full break-words rounded text-left font-semibold underline-offset-4 hover:text-brand-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary" aria-label={'Edit task: '+task.title}>{task.title}</button></h4>
            <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-ink-muted">{task.description}</p>
            <p className="mt-4 text-sm font-medium">{dueState(task,now).label}</p><p className="mt-1 text-sm text-ink-muted">{task.dueDate ? <>Due: <time dateTime={task.dueDate}>{displayDate(task.dueDate)}</time></> : "No deadline set"}</p><div className="mt-4 border-t border-slate-200 pt-3"><OwnerBadge name={task.assignee}/></div><div className="mt-4"><CopyContext task={task}/></div>
          </li>)}</ul>
          {!tasks.some(t=>t.status===stage.id)&&<div className="rounded-xl border border-dashed border-slate-300 p-5"><p className="mb-3 text-sm text-ink-muted">No tasks here yet.</p><button className={button} onClick={add}>Add task</button></div>}
        </section>)}
      </section>
    </main>
    <footer className="mx-auto max-w-[1600px] px-4 pb-8 text-sm text-ink-muted sm:px-8">Local workspace · no account or AI connection. Initial tasks are synthetic examples.</footer>
    {editing&&<TaskEditor task={editing} onSave={save} onDelete={remove} onClose={close}/>}
  </div>;
}
