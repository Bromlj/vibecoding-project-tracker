import { useState } from 'react';
import { ANCHORS, safeUrl } from './anchors';
import Dialog from './Dialog.jsx';
import { button, primaryButton, input } from './ui';

export default function AnchorBoard({board,onSave}) {
  const [editing,setEditing]=useState(false);
  return <section aria-labelledby="anchors-title" className="mb-6 rounded-xl border border-slate-300 bg-white p-4 sm:p-5">
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3"><h2 id="anchors-title" className="font-semibold">Project deliverables</h2><button className={button} onClick={()=>setEditing(true)}>Edit deliverable links</button></div>
    <ul className="grid grid-cols-2 gap-3 xl:grid-cols-4">{board.anchors.map(slot=><li key={slot.id} className="min-w-0 rounded-lg bg-slate-50 px-3 py-2"><p className="break-words font-medium">{slot.label}</p><div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-sm"><span className="inline-flex items-center gap-2 text-ink-muted"><span aria-hidden="true" className={'h-2 w-2 rounded-full border border-brand-primary '+(slot.url?'bg-brand-primary':'bg-white')}/>{slot.url?'Link added':'No link yet'}</span>{slot.url&&<a className="inline-flex min-h-11 items-center text-brand-primary underline" href={slot.url} target="_blank" rel="noopener noreferrer" aria-label={'Open '+slot.label+' (new tab)'}>Open {slot.label}</a>}</div></li>)}</ul>
    {editing&&<AnchorEditor key={board.id} anchors={board.anchors} onSave={onSave} onClose={()=>setEditing(false)}/>}
  </section>;
}
function AnchorEditor({anchors,onSave,onClose}) {
  const original=Object.fromEntries(anchors.map(a=>[a.id,a.url||'']));
  const [draft,setDraft]=useState(original),[errors,setErrors]=useState({}),[error,setError]=useState(''),[busy,setBusy]=useState(false);
  async function save(e){e.preventDefault();const invalid={};for(const slot of ANCHORS)if(draft[slot.id].trim()&&(!safeUrl(draft[slot.id])||draft[slot.id].length>2048))invalid[slot.id]='Use a full HTTP or HTTPS URL of up to 2,048 characters, without a username or password.';setErrors(invalid);if(Object.keys(invalid).length)return;
    setBusy(true);const result=await onSave(ANCHORS.map(slot=>({...slot,url:draft[slot.id].trim()||null})));setBusy(false);if(result.ok)onClose();else setError(result.error);
  }
  return <Dialog title="Edit deliverable links" dirty={JSON.stringify(original)!==JSON.stringify(draft)} onClose={onClose} busy={busy}><form onSubmit={save} noValidate><div className="space-y-5 p-5 sm:p-7"><p className="text-sm text-ink-muted">Save the links for this project. Leave a field empty to remove a link. Link presence does not mean a deliverable is complete.</p>{ANCHORS.map((slot,i)=><div key={slot.id}><label className="block font-medium" htmlFor={'anchor-'+slot.id}>{slot.label} URL</label><input id={'anchor-'+slot.id} data-initial-focus={i===0?true:undefined} type="text" inputMode="url" className={input} value={draft[slot.id]} aria-invalid={Boolean(errors[slot.id])} aria-describedby={errors[slot.id]?'error-'+slot.id:undefined} onChange={e=>setDraft(old=>({...old,[slot.id]:e.target.value}))}/>{errors[slot.id]&&<p role="alert" id={'error-'+slot.id} className="mt-2 text-sm text-red-800">{errors[slot.id]}</p>}</div>)}{error&&<p role="alert" className="text-red-800">{error}</p>}</div><footer className="dialog-actions"><span/><button disabled={busy} className={primaryButton}>{busy?'Saving…':error?'Retry save links':'Save deliverable links'}</button></footer></form></Dialog>;
}
