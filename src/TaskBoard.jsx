import {forwardRef,useImperativeHandle,useRef,useState} from 'react';
import {STAGES} from './data';
import {dueState,displayDate} from './deadlines';
import {button,input} from './ui';
import TypeBadge from './TypeBadge';
import OwnerBadge from './OwnerBadge';
import CopyContext from './CopyContext';
import Icon from './Icon';
import {memberLabel} from './workspace';

export function Deadline({task,now}) {
  const state=dueState(task,now);
  return <p className={'deadline deadline-'+state.id+' deadline-card-'+state.card}><Icon name={task.status==='done'?'check':'calendar'} size={16}/><span>{state.card==='urgent'&&<strong>Alarm · </strong>}{state.card==='soon'&&<strong>Warning · </strong>}{state.label}{task.dueDate&&task.status!=='done'&&<span className="deadline-date"> · Due <time dateTime={task.dueDate}>{displayDate(task.dueDate)}</time></span>}</span></p>;
}
export default forwardRef(function TaskBoard({tasks,members,now,onAdd,onEdit,onReview,shortcuts},ref) {
  const [search,setSearch]=useState(''),[owner,setOwner]=useState('all'),[type,setType]=useState('all'),[stage,setStage]=useState('todo');
  const searchInput=useRef(null),boardElement=useRef(null);
  useImperativeHandle(ref,()=>({
    focusSearch(){searchInput.current?.focus();},
    focusStage(index){const id=STAGES[index]?.id;if(!id)return;setStage(id);requestAnimationFrame(()=>document.getElementById('stage-'+id)?.focus());},
    focusTask(direction){const controls=[...boardElement.current?.querySelectorAll('.task-title')||[]].filter(el=>el.getClientRects().length);const current=controls.indexOf(document.activeElement);const next=current<0?(direction>0?0:controls.length-1):Math.max(0,Math.min(controls.length-1,current+direction));controls[next]?.focus();}
  }));
  const filtered=tasks.filter(t=>(type==='all'||t.type===type)&&(owner==='all'||(owner==='unassigned'?t.assigneeId===null:t.assigneeId===owner))&&(!search.trim()||(t.title+'\n'+t.description+'\n'+t.context+'\n'+(t.attempts||[]).map(a=>[a.prompt,a.outcome,a.lesson,a.author].join(' ')).join('\n')).toLowerCase().includes(search.trim().toLowerCase())));
  const active=Boolean(search||owner!=='all'||type!=='all');
  function clear(){setSearch('');setOwner('all');setType('all');}
  return <>
    <section aria-label="Find tasks" className="task-filters">
      <label>Search tasks<input ref={searchInput} aria-keyshortcuts={shortcuts?'f':undefined} type="search" className={input} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Title, context or lessons"/></label>
      <label>Owner<select className={input} value={owner} onChange={e=>setOwner(e.target.value)}><option value="all">Everyone</option><option value="unassigned">Unassigned</option>{members.map(m=><option key={m.id} value={m.id}>{memberLabel(m,members,true)}</option>)}</select></label>
      <label>Type<select className={input} value={type} onChange={e=>setType(e.target.value)}><option value="all">Features and bugs</option><option value="feature">Features</option><option value="bug">Bugs</option></select></label>
      {active&&<button className={button} onClick={clear}>Clear filters</button>}
    </section>
    <p role="status" className="section-caption mb-3">{filtered.length} of {tasks.length} tasks match{active?' your filters':''} across all stages</p>
    <div className="card-legend" aria-label="Card colour guide"><span><i aria-hidden="true" className="legend-urgent"/>Alarm · overdue</span><span><i aria-hidden="true" className="legend-soon"/>Warning · due within 48h</span><span><i aria-hidden="true" className="legend-complete"/>Done · neutral</span><span>Other tasks stay neutral. Colours follow dates and completion.</span></div>
    <div className="mobile-stage"><div><label htmlFor="mobile-stage">Stage</label><button className="text-action" onClick={()=>setStage(stage==='all'?'todo':'all')}>{stage==='all'?'View one stage':'View all stages'}</button></div><select id="mobile-stage" className={input} value={stage} onChange={e=>setStage(e.target.value)}><option value="all">All stages ({filtered.length})</option>{STAGES.map(s=><option key={s.id} value={s.id}>{s.label} ({filtered.filter(t=>t.status===s.id).length})</option>)}</select></div>
    {tasks.length>0&&filtered.length===0?<div className="empty-state"><h2>No matching tasks</h2><p>Try another search, owner or type.</p><button className={button} onClick={clear}>Clear filters</button></div>:<section ref={boardElement} aria-label="Kanban board" className="kanban-board">
      {STAGES.map(s=><section key={s.id} aria-labelledby={'stage-'+s.id} className={'kanban-column '+(stage!=='all'&&stage!==s.id?'mobile-stage-hidden':'')}>
        <div className="column-heading"><h2 id={'stage-'+s.id} tabIndex={-1}>{s.label}</h2><span className="task-count">{filtered.filter(t=>t.status===s.id).length}<span className="sr-only"> tasks</span></span></div>
        <ul className="task-list">{filtered.filter(t=>t.status===s.id).map(task=><li key={task.id} data-task-id={task.id} className={'task-card task-card-'+dueState(task,now).card}>
          <h3><button className="task-title" aria-label={'Edit task: '+task.title} onClick={()=>onEdit(task)}>{task.title}</button></h3>
          <div className="task-type"><TypeBadge type={task.type}/></div>
          <div className="task-owner"><OwnerBadge name={task.assignee}/></div>
          <Deadline task={task} now={now}/>
          <div className="task-context-state">{task.contextUpdatedAt?'Context saved':'Context not yet saved'}</div>
          {!!task.attempts?.length&&<p className="task-context-state">{task.attempts.length} attempts · {task.attempts.filter(a=>a.includeInBrief).length} in briefing</p>}
          <div className="task-copy"><CopyContext task={task}/></div>
          <button className="text-action task-review" aria-label={'Review briefing for '+task.title} onClick={()=>onReview(task)}><Icon name="review" size={16}/>Review briefing</button>
        </li>)}</ul>
        {!filtered.some(t=>t.status===s.id)&&<div className="column-empty"><Icon name="projects" size={28}/><p>{tasks.some(t=>t.status===s.id)?'No matching tasks in this stage.':'No tasks here yet.'}</p><button className={button} onClick={()=>onAdd(s.id)}><Icon name="plus" size={16}/>Add task</button></div>}
      </section>)}
    </section>}
  </>;
});
