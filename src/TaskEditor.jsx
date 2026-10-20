import { useEffect, useState } from 'react';
import { STAGES, localDate } from './data';
import { button, primaryButton, input } from './ui';
import TypeBadge from './TypeBadge';
import CopyContext from './CopyContext';
import Dialog from './Dialog.jsx';
import { BriefingContent } from './BriefingReview';
import { AI_TOOLS, CONTEXT_TEMPLATE, withContextTimestamp, updatedLabel } from './context';
import { taskError, newId } from './workspace';

export default function TaskEditor({task,members,onSave,onDelete,onClose}) {
  const [draft,setDraft]=useState(task),[error,setError]=useState(''),[busy,setBusy]=useState(false),[deleting,setDeleting]=useState(false),[review,setReview]=useState(false);
  const dirty=JSON.stringify(task)!==JSON.stringify(draft);
  useEffect(()=>{document.querySelector('dialog[open] [data-initial-focus]')?.focus();},[review]);
  function field(name,value){setDraft(old=>({...old,[name]:value}));setError('');}
  const owner=members.find(m=>m.id===draft.assigneeId);
  const copyDraft={...draft,assignee:owner?.name||'Unassigned'};
  async function save(e){
    e.preventDefault();const invalid=taskError(draft);if(invalid){setError(invalid);return;}
    setBusy(true);
    const result=await onSave({...withContextTimestamp(draft,task),title:draft.title.trim(),id:draft.id||newId(),createdDate:draft.createdDate||localDate()});
    setBusy(false);if(!result.ok)setError(result.error);
  }
  async function remove(){setBusy(true);const result=await onDelete(task.id);setBusy(false);if(!result.ok)setError(result.error);}
  function cancel(e){e.currentTarget.closest('dialog').dispatchEvent(new Event('cancel',{cancelable:true}));}
  return <Dialog title={review?'Review briefing':task.id?'Edit task':'Add task'} dirty={dirty} busy={busy} onClose={onClose} wide>
    {review?<><BriefingContent task={copyDraft} draft={dirty}/><footer className="dialog-actions"><button className={button} onClick={()=>setReview(false)}>Back to editing</button><span className="text-sm text-ink-muted">Your draft is kept.</span></footer></>:<form onSubmit={save}>
      <div className="p-5 sm:p-7">
        <label className="block font-medium">Task title <span className="text-sm text-ink-muted">(required)</span><input data-initial-focus required className={input} value={draft.title} aria-describedby="title-limit" onChange={e=>field('title',e.target.value)}/></label>
        <p id="title-limit" className="mt-1 text-sm text-ink-muted">{draft.title.length}/160 characters</p>
        <label className="mt-4 block font-medium">Description<textarea aria-label="Description" rows={3} className={input} value={draft.description} aria-describedby="description-limit" onChange={e=>field('description',e.target.value)}/></label>
        <p id="description-limit" className="mt-1 text-sm text-ink-muted">{draft.description.length.toLocaleString()}/4,000 characters</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block font-medium">Task type<select aria-label="Task type" className={input} value={draft.type} onChange={e=>field('type',e.target.value)}><option value="feature">Feature</option><option value="bug">Bug</option></select></label>
          <label className="block font-medium">Status<select aria-label="Status" className={input} value={draft.status} onChange={e=>field('status',e.target.value)}>{STAGES.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}</select></label>
          <label className="block font-medium">{task.id?'Hand off to':'Assignee'}<select aria-label={task.id?"Hand off to":"Assignee"} className={input} value={draft.assigneeId||''} onChange={e=>field('assigneeId',e.target.value||null)}><option value="">Unassigned</option>{members.map(m=><option key={m.id} value={m.id}>{m.name}{m.email?' · '+m.email:' · '+m.id.slice(0,8)}</option>)}</select></label>
          <label className="block font-medium">Due date <span className="text-sm text-ink-muted">(optional)</span><input type="date" min="1000-01-01" max="9999-12-31" className={input} value={draft.dueDate||''} onChange={e=>field('dueDate',e.target.value||null)}/></label>
        </div>
        <div className="mt-3"><TypeBadge type={draft.type}/></div>
        <section aria-labelledby="context-heading" className="mt-7 border-t border-slate-200 pt-5">
          <h3 id="context-heading" className="text-xl font-semibold">Prompt and working context</h3>
          <p id="context-help" className="mt-2 max-w-prose text-sm text-ink-muted">Keep your useful prompts, actual outcomes, errors and next step together. Use the headings or write in your own format. Nothing is sent to an AI service.</p>
          <label className="mt-4 block font-medium">Context<textarea aria-label="Context" aria-describedby="context-help context-limit" rows={9} className={input+' font-mono text-sm'} value={draft.context} placeholder={CONTEXT_TEMPLATE} onChange={e=>field('context',e.target.value)}/></label>
          <p id="context-limit" className="mt-1 text-sm text-ink-muted">{draft.context.length.toLocaleString()}/30,000 characters. Pasted text is kept in full; over-limit drafts must be shortened before saving.</p>
          <label className="mt-4 block font-medium">AI tool <span className="text-sm text-ink-muted">(optional)</span><select aria-label="AI tool" className={input} value={draft.contextTool||''} onChange={e=>field('contextTool',e.target.value||null)}><option value="">Not specified</option>{AI_TOOLS.map(tool=><option key={tool}>{tool}</option>)}</select></label>
          <p className="mt-3 text-sm text-ink-muted">Context last saved: {task.contextUpdatedAt?<><time dateTime={task.contextUpdatedAt}>{new Date(task.contextUpdatedAt).toLocaleString('en-GB')}</time> ({updatedLabel(task.contextUpdatedAt)})</>:'not yet saved'}.</p>
          <div className="mt-5 flex flex-wrap gap-3"><button type="button" className={button} onClick={()=>setReview(true)}>Review briefing</button><CopyContext task={copyDraft} compact/></div>
          <p className="mt-2 text-sm text-ink-muted">Review and copy use this draft, including unsaved edits.</p>
        </section>
        <p className="mt-6 break-all text-sm text-ink-muted">Created: <time dateTime={draft.createdDate}>{draft.createdDate}</time>{task.id&&<> · Task ID: {task.id}</>}</p>
        {deleting&&<div className="mt-5 rounded-lg border border-red-400 bg-red-50 p-4"><p role="alert" className="font-medium">Delete “{task.title}”? This cannot be undone.</p><div className="mt-3 flex flex-wrap gap-3"><button type="button" disabled={busy} className={button} onClick={()=>setDeleting(false)}>Keep task</button><button type="button" disabled={busy} className={button+' text-red-800'} onClick={remove}>Confirm delete</button></div></div>}
        {error&&<p role="alert" className="mt-4 rounded-lg border border-red-400 bg-red-50 p-3 text-red-900">{error}</p>}
      </div>
      <footer className="dialog-actions"><div>{task.id&&!deleting&&<button type="button" disabled={busy} className={button+' text-red-800'} onClick={()=>setDeleting(true)}>Delete task</button>}</div><div className="flex flex-wrap gap-3"><button type="button" disabled={busy} className={button} onClick={cancel}>Cancel</button><button disabled={busy} className={primaryButton}>{busy?'Saving…':error?'Retry save task':'Save task'}</button></div></footer>
    </form>}
  </Dialog>;
}
