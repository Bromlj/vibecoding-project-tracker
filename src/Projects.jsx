import Icon from './Icon';
import {button,primaryButton} from './ui';
import {displayDate} from './deadlines';

export default function Projects({workspace,onOpen,onNew,onEdit}) {
  return <>
    <div className="page-heading"><div><h1>Projects</h1><p>Keep your tasks, prompts and progress together.</p></div><button className={primaryButton} onClick={onNew}><Icon name="plus"/>New project</button></div>
    <p className="section-caption">{workspace.boards.length} {workspace.boards.length===1?'project':'projects'} in {workspace.name}</p>
    <ul className="project-grid">{workspace.boards.map(board=>{
      const complete=board.tasks.filter(t=>t.status==='done').length;
      const next=board.milestones.filter(m=>m.status==='pending').sort((a,b)=>(a.targetDate||'9999').localeCompare(b.targetDate||'9999'))[0];
      return <li key={board.id} className="project-card">
        <div className="project-card-top"><span className="project-symbol"><Icon name="projects" size={24}/></span><button className="text-action" aria-label={'Edit project: '+board.name} onClick={()=>onEdit(board)}>Edit project</button></div>
        <h2>{board.name}</h2><p className="project-description">{board.description||'A board for your next piece of work.'}</p>
        <dl className="project-counts"><div><dt>Tasks</dt><dd>{board.tasks.length}</dd></div><div><dt>Complete</dt><dd>{complete}</dd></div><div><dt>Milestones reached</dt><dd>{board.milestones.filter(m=>m.status==='reached').length}/{board.milestones.length}</dd></div></dl>
        <div className="project-next"><span className="section-caption">Next milestone</span><p>{next?.title||'No pending milestones'}{next?.targetDate&&<span className="block text-sm text-ink-muted mt-1">Target {displayDate(next.targetDate)}</span>}</p></div>
        <button className={button+' project-open'} aria-label={'Open board: '+board.name} onClick={()=>onOpen(board.id)}>Open board<Icon name="arrow"/></button>
      </li>;
    })}</ul>
    <p className="mt-6 text-sm text-ink-muted">Your team is available across every project. Tasks, milestones and deliverable links belong to their own board.</p>
  </>;
}
