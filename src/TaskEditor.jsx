import { useEffect, useRef, useState } from 'react';
import { STAGES, TEAM, localDate } from './data';
import { button, primaryButton, input } from './ui';
import TypeBadge from './TypeBadge';

export default function TaskEditor({ task, onSave, onDelete, onClose }) {
  const dialog = useRef(null);
  const [draft, setDraft] = useState(task);
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const dirty = JSON.stringify(task) !== JSON.stringify(draft);
  useEffect(() => {
    const node = dialog.current;
    if (!node.open) node.showModal();
    return () => node.close();
  }, []);
  function requestClose() {
    if (dirty) setConfirmation('discard'); else onClose();
  }
  function field(name, value) { setDraft(old=>({...old,[name]:value})); setError(''); }
  function save(event) {
    event.preventDefault();
    if (!draft.title.trim()) { setError('Enter a task title.'); return; }
    onSave({ ...draft, title: draft.title.trim(), id: draft.id || crypto.randomUUID(), createdDate: draft.createdDate || localDate() });
  }
  return <dialog ref={dialog} aria-labelledby="editor-title" onCancel={event=>{event.preventDefault();requestClose();}}
    className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-slate-300 bg-white p-0 text-ink-primary shadow-xl backdrop:bg-slate-900/50">
    <form onSubmit={save} className="p-5 sm:p-7">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 id="editor-title" className="text-2xl font-semibold">{task.id ? 'Edit task' : 'Add task'}</h2>
        <button type="button" className={button} onClick={requestClose}>Close</button>
      </div>
      <div className="mb-4"><TypeBadge type={draft.type}/></div><label className="block font-medium">Task title <span className="text-sm text-ink-muted">(required)</span>
        <input autoFocus required maxLength={160} className={input} value={draft.title} onChange={e=>field('title',e.target.value)}/>
      </label>
      <label className="mt-4 block font-medium">Description
        <textarea rows={3} maxLength={4000} className={input} value={draft.description} onChange={e=>field('description',e.target.value)}/>
      </label>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block font-medium">Task type
          <select aria-label="Task type" className={input} value={draft.type} onChange={e=>field('type',e.target.value)}><option value="feature">Feature</option><option value="bug">Bug</option></select>
        </label>
        <label className="block font-medium">Status
          <select aria-label="Status" className={input} value={draft.status} onChange={e=>field('status',e.target.value)}>{STAGES.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}</select>
        </label>
        <label className="block font-medium">Assignee
          <select aria-label="Assignee" className={input} value={draft.assignee} onChange={e=>field('assignee',e.target.value)}>{TEAM.map(name=><option key={name}>{name}</option>)}</select>
        </label>
        <label className="block font-medium">Due date
          <input type="date" min="1000-01-01" max="9999-12-31" className={input} value={draft.dueDate||''} onChange={e=>field('dueDate',e.target.value||null)}/>
        </label>
      </div>
      <p className="mt-4 text-sm text-ink-muted">Created: {draft.createdDate}. {task.id && 'Task ID: '+task.id}</p>
      {error&&<p role="alert" className="mt-4 text-red-800">{error}</p>}
      {confirmation ? <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4">
        <p className="font-medium" role="alert">{confirmation==='delete'?'Delete this task? This cannot be undone.':'Discard your unsaved changes?'}</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <button type="button" className={button} onClick={()=>setConfirmation('')}>Continue editing</button>
          <button type="button" className={button+' border-red-700 text-red-800'} onClick={()=>confirmation==='delete'?onDelete(task.id):onClose()}>{confirmation==='delete'?'Confirm delete':'Discard changes'}</button>
        </div>
      </div> : <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
        {task.id?<button type="button" className={button+' text-red-800'} onClick={()=>setConfirmation('delete')}>Delete task</button>:<span/>}
        <div className="flex flex-wrap gap-3"><button type="button" className={button} onClick={requestClose}>Cancel</button><button className={primaryButton} type="submit">Save task</button></div>
      </div>}
    </form>
  </dialog>;
}
