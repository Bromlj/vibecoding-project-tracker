import { useEffect, useState, useId } from 'react';
import { STAGES, localDate } from './data';
import { button, primaryButton, input } from './ui';
import TypeBadge from './TypeBadge';
import CopyContext from './CopyContext';
import Dialog from './Dialog.jsx';
import { BriefingContent } from './BriefingReview';
import { AI_TOOLS, CONTEXT_TEMPLATE, withContextTimestamp, updatedLabel, serializeContext } from './context';
import { taskError, newId, memberLabel } from './workspace';
import Icon from './Icon';
import ReadAloud from './ReadAloud';
import AttemptsPanel from './AttemptsPanel';

export default function TaskEditor({task,members,onSave,onDelete,onClose,attemptAuthor=''}) {
  const [draft,setDraft]=useState(task),[error,setError]=useState(''),[busy,setBusy]=useState(false),[deleting,setDeleting]=useState(false),[review,setReview]=useState(false);
  const [tab,setTab]=useState('details'),[invalidField,setInvalidField]=useState('');
  const tabsId=useId();
  const dirty=JSON.stringify(task)!==JSON.stringify(draft);
  useEffect(()=>{requestAnimationFrame(()=>{const dialog=document.querySelector('dialog[open]');if(review)dialog?.querySelector('textarea')?.focus();else document.getElementById(tab==='attempts'?tabsId+'-attempts':tabsId+'-field-'+(tab==='context'?'context':'title'))?.focus();});},[review]);
  function field(name,value){setDraft(old=>({...old,[name]:value}));setError('');setInvalidField('');}
  function tabKeys(e){const names=['details','context','attempts'];let target;if(e.key==='ArrowRight'||e.key==='ArrowLeft')target=names[(names.indexOf(tab)+(e.key==='ArrowRight'?1:names.length-1))%names.length];if(e.key==='Home')target='details';if(e.key==='End')target='attempts';if(target){e.preventDefault();setTab(target);document.getElementById(tabsId+'-'+target)?.focus();}}
  const owner=members.find(m=>m.id===draft.assigneeId);
  const copyDraft={...draft,assignee:owner?memberLabel(owner,members):'Unassigned'};
  async function save(e){
    e.preventDefault();const dateInput=document.getElementById(tabsId+'-field-dueDate');
    const invalid=taskError(draft)||(!dateInput.validity.valid?'Choose a valid due date, or clear it completely.':'');if(invalid){setError(invalid);const name=invalid.startsWith('Attempt')?'attempts':invalid.startsWith('Context')?'context':invalid.startsWith('Description')?'description':invalid.includes('due date')?'dueDate':'title';setInvalidField(name);setTab(name==='attempts'?'attempts':name==='context'?'context':'details');requestAnimationFrame(()=>document.getElementById(name==='attempts'?'task-error':tabsId+'-field-'+name)?.focus());return;}
    setBusy(true);
    const result=await onSave({...withContextTimestamp(draft,task),title:draft.title.trim(),id:draft.id||newId(),createdDate:draft.createdDate||localDate()});
    setBusy(false);if(!result.ok)setError(result.error);
  }
  async function remove(){setBusy(true);const result=await onDelete(task.id);setBusy(false);if(!result.ok)setError(result.error);}
  function cancel(e){e.currentTarget.closest('dialog').dispatchEvent(new Event('cancel',{cancelable:true}));}
  return <Dialog title={review?'Review briefing':task.id?'Edit task':'Add task'} subtitle={draft.title.trim()||undefined} dirty={dirty} busy={busy} onClose={onClose} wide>
    {review?<><BriefingContent task={copyDraft} draft={dirty}/><footer className="dialog-actions"><button className={button} onClick={()=>setReview(false)}>Back to editing</button><span className="text-sm text-ink-muted">Your draft is kept.</span></footer></>:<form onSubmit={save} noValidate>
      <div role="tablist" aria-label="Task sections" className="editor-tabs" onKeyDown={tabKeys}>{[['details','Details'],['context','AI context'],['attempts','Attempts & lessons']].map(([id,label])=><button type="button" key={id} role="tab" id={tabsId+'-'+id} aria-controls={tabsId+'-panel-'+id} aria-selected={tab===id} tabIndex={tab===id?0:-1} onClick={()=>setTab(id)}>{label}</button>)}</div>
      <div className="p-5 sm:p-7">
        <div role="tabpanel" id={tabsId+'-panel-details'} aria-labelledby={tabsId+'-details'} hidden={tab!=='details'}>
        <label className="block font-medium">Task title <span className="text-sm text-ink-muted">(required)</span><input id={tabsId+'-field-title'} data-initial-focus required className={input} value={draft.title} aria-invalid={invalidField==='title'} aria-describedby={'title-limit'+(invalidField==='title'?' task-error':'')} onChange={e=>field('title',e.target.value)}/></label>
        <p id="title-limit" className="mt-1 text-sm text-ink-muted">{draft.title.length}/160 characters</p>
        <label className="mt-4 block font-medium">Description<textarea id={tabsId+'-field-description'} aria-label="Description" rows={3} className={input} value={draft.description} aria-invalid={invalidField==='description'} aria-describedby={'description-limit'+(invalidField==='description'?' task-error':'')} onChange={e=>field('description',e.target.value)}/></label>
        <p id="description-limit" className="mt-1 text-sm text-ink-muted">{draft.description.length.toLocaleString()}/4,000 characters</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block font-medium">Task type<select aria-label="Task type" className={input} value={draft.type} onChange={e=>field('type',e.target.value)}><option value="feature">Feature</option><option value="bug">Bug</option></select></label>
          <label className="block font-medium">Status<select aria-label="Status" className={input} value={draft.status} onChange={e=>field('status',e.target.value)}>{STAGES.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}</select></label>
          <label className="block font-medium">{task.id?'Hand off to':'Assignee'}<select aria-label={task.id?"Hand off to":"Assignee"} className={input} value={draft.assigneeId||''} onChange={e=>field('assigneeId',e.target.value||null)}><option value="">Unassigned</option>{members.map(m=><option key={m.id} value={m.id}>{memberLabel(m,members,true)}</option>)}</select></label>
          <label className="block font-medium">Due date <span className="text-sm text-ink-muted">(optional)</span><input id={tabsId+'-field-dueDate'} type="date" min="1000-01-01" max="9999-12-31" className={input} value={draft.dueDate||''} aria-invalid={invalidField==='dueDate'} aria-describedby={invalidField==='dueDate'?'task-error':undefined} onChange={e=>field('dueDate',e.target.value||null)}/></label>
        </div>
        <div className="mt-3"><TypeBadge type={draft.type}/></div>
        <p className="mt-6 break-all text-sm text-ink-muted">Created: <time dateTime={draft.createdDate}>{draft.createdDate}</time>{task.id&&<> · Task ID: {task.id}</>}</p>
        <p className="context-hint">Keep useful prompts, outcomes and the next step in <button type="button" className="text-action" onClick={()=>{setTab('context');document.getElementById(tabsId+'-context')?.focus();}}>AI context</button>.</p>
        </div>
        <section role="tabpanel" id={tabsId+'-panel-context'} aria-labelledby={tabsId+'-context'} hidden={tab!=='context'}>
          <h3 id="context-heading" className="text-lg font-semibold">Prompt and working context</h3>
          <p id="context-help" className="mt-2 max-w-prose text-sm text-ink-muted">Keep your useful prompts, actual outcomes, errors and next step together. Use the headings or write in your own format. Nothing is sent to an AI service.</p>
          <div className="context-layout"><div>
          <label className="mt-4 block font-medium">Context <span className="text-sm text-ink-muted font-normal">· Markdown text</span><textarea id={tabsId+'-field-context'} aria-label="Context" aria-invalid={invalidField==='context'} aria-describedby={'context-help context-limit'+(invalidField==='context'?' task-error':'')} rows={14} className={input+' font-mono text-sm context-textarea'} value={draft.context} placeholder={CONTEXT_TEMPLATE} onChange={e=>field('context',e.target.value)}/></label>
          <p id="context-limit" className="mt-1 text-sm text-ink-muted">{draft.context.length.toLocaleString()}/30,000 characters. Pasted text is kept in full; over-limit drafts must be shortened before saving.</p>
          </div><div className="context-tools">
          <label className="mt-4 block font-medium">AI tool <span className="text-sm text-ink-muted">(optional)</span><select aria-label="AI tool" className={input} value={draft.contextTool||''} onChange={e=>field('contextTool',e.target.value||null)}><option value="">Not specified</option>{AI_TOOLS.map(tool=><option key={tool}>{tool}</option>)}</select></label>
          <p className="mt-3 text-sm text-ink-muted">Context last saved: {task.contextUpdatedAt?<><time dateTime={task.contextUpdatedAt}>{new Date(task.contextUpdatedAt).toLocaleString('en-GB')}</time> ({updatedLabel(task.contextUpdatedAt)})</>:'not yet saved'}.</p>
          <p className="draft-status">{dirty?'Unsaved changes':'Viewing saved details'}</p>
          <div className="mt-5 flex flex-wrap gap-3"><button type="button" className={button} onClick={()=>setReview(true)}><Icon name="review"/>Review briefing</button><CopyContext task={copyDraft} compact/></div>
          <p className="mt-2 text-sm text-ink-muted">Review and copy use this draft, including unsaved edits.</p>
          </div></div>
          {tab==='context'&&<ReadAloud text={serializeContext(copyDraft)}/>}
        </section>
        <div role="tabpanel" id={tabsId+'-panel-attempts'} aria-labelledby={tabsId+'-attempts'} hidden={tab!=='attempts'}>
          <AttemptsPanel author={attemptAuthor} attempts={draft.attempts} savedAttempts={task.attempts} onChange={value=>field('attempts',value)} onReview={()=>setReview(true)}/>
        </div>
        {deleting&&<div className="mt-5 rounded-lg border border-red-400 bg-red-50 p-4"><p role="alert" className="font-medium">Delete “{task.title}”? This cannot be undone.</p><div className="mt-3 flex flex-wrap gap-3"><button type="button" disabled={busy} className={button} onClick={()=>setDeleting(false)}>Keep task</button><button type="button" disabled={busy} className={button+' text-red-800'} onClick={remove}>Confirm delete</button></div></div>}
        {error&&<p id="task-error" tabIndex={-1} role="alert" className="mt-4 rounded-lg border border-red-400 bg-red-50 p-3 text-red-900">{error}</p>}
      </div>
      <footer className="dialog-actions"><div>{task.id&&!deleting&&<button type="button" disabled={busy} className={button+' text-red-800'} onClick={()=>setDeleting(true)}>Delete task</button>}</div><div className="flex flex-wrap gap-3"><button type="button" disabled={busy} className={button} onClick={cancel}>Cancel</button><button disabled={busy} className={primaryButton}>{busy?'Saving…':error?'Retry save task':'Save task'}</button></div></footer>
    </form>}
  </Dialog>;
}
