import { useEffect, useState } from 'react';
import { ANCHORS, initialAnchors, validAnchors, safeUrl } from './anchors';
import { useLocalStorage } from './storage';
import { button, input } from './ui';
export default function AnchorBoard() {
 const [anchors,setAnchors,error]=useLocalStorage('vibetracker.anchors',initialAnchors,validAnchors);
 const [draft,setDraft]=useState(()=>Object.fromEntries(ANCHORS.map(a=>[a.id,anchors.find(x=>x.id===a.id)?.url||''])));
 const [errors,setErrors]=useState({});
 const [message,setMessage]=useState('');
 useEffect(()=>setDraft(Object.fromEntries(ANCHORS.map(a=>[a.id,anchors.find(x=>x.id===a.id)?.url||'']))),[anchors]);
 function save(event) {
  event.preventDefault();
  const invalid={};
  for(const slot of ANCHORS) if(draft[slot.id].trim()&&!safeUrl(draft[slot.id])) invalid[slot.id]='Use a full http:// or https:// URL without a username or password.';
  setErrors(invalid);setMessage('');
  if(Object.keys(invalid).length) return;
  setAnchors(ANCHORS.map(slot=>({...slot,url:draft[slot.id].trim()||null})));
  setMessage('Deliverable links updated.');
 }
 return <section aria-labelledby="anchors-title" className="mb-8 rounded-xl border border-slate-300 bg-white p-5 sm:p-6">
  <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2"><h2 id="anchors-title" className="text-lg font-semibold">Deliverable anchors</h2><p className="text-sm text-ink-muted">A link records a location, not completion.</p></div>
  {error&&<p role="alert" className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-900">{error}</p>}
  <form onSubmit={save} noValidate>
   <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{ANCHORS.map(slot=>{
    const saved=anchors.find(a=>a.id===slot.id)?.url;
    return <div key={slot.id} className="min-w-0">
     <label htmlFor={'anchor-'+slot.id} className="font-medium">{slot.label} URL</label>
     <input id={'anchor-'+slot.id} type="text" inputMode="url" maxLength={2048} placeholder="https://…" className={input} value={draft[slot.id]} aria-invalid={Boolean(errors[slot.id])} aria-describedby={errors[slot.id]?'error-'+slot.id:undefined} onChange={e=>setDraft(old=>({...old,[slot.id]:e.target.value}))}/>
     {errors[slot.id]&&<p id={'error-'+slot.id} role="alert" className="mt-2 text-sm text-red-800">{errors[slot.id]}</p>}
     <div className="mt-2 flex min-h-11 items-center justify-between gap-2 text-sm">
      <span className="inline-flex items-center gap-2 text-ink-muted"><span aria-hidden="true" className={'h-2 w-2 rounded-full border border-brand-primary '+(saved?'bg-brand-primary':'bg-white')}/>{saved?'Link saved':'No link yet'}</span>
      {saved&&<a className="inline-flex min-h-11 items-center rounded px-2 text-brand-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2" href={saved} target="_blank" rel="noopener noreferrer" aria-label={'Open '+slot.label}>Open<span className="sr-only"> {slot.label} in a new tab</span></a>}
     </div>
    </div>;
   })}</div>
   <div className="mt-4 flex flex-wrap items-center gap-4"><button type="submit" className={button}>Save deliverable links</button><p role="status" className="text-sm text-brand-primary">{message}</p></div>
  </form>
 </section>;
}
