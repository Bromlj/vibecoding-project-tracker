import { useEffect, useId, useRef, useState } from 'react';
import { containDialogFocus } from './dialog';
import { button } from './ui';

export default function Dialog({ title, subtitle, onClose, dirty = false, busy = false, children, wide = false }) {
  const ref=useRef(null), returnToDraft=useRef(null), titleId=useId();
  const [discard,setDiscard]=useState(false);
  useEffect(()=>{
    if(discard)ref.current?.querySelector('[data-discard-focus]')?.focus();
    else if(returnToDraft.current){
      const target=returnToDraft.current.isConnected?returnToDraft.current:document.getElementById(returnToDraft.current.id);
      (target||ref.current?.querySelector('button'))?.focus();
    }
  },[discard]);
  useEffect(()=>{if(!dirty)return;const protect=event=>{event.preventDefault();event.returnValue='';};window.addEventListener('beforeunload',protect);return()=>window.removeEventListener('beforeunload',protect);},[dirty]);
  useEffect(()=>{
    const opener=document.activeElement, node=ref.current;
    node.showModal();
    (node.querySelector('[data-initial-focus]') || node.querySelector('input,textarea,button'))?.focus();
    return ()=>{node.close();requestAnimationFrame(()=>{if(opener?.isConnected)opener.focus();else{const heading=document.querySelector('main h1');if(heading){heading.setAttribute('tabindex','-1');heading.focus();}}});};
  },[]);
  function close() { if(busy)return; if(dirty){returnToDraft.current=document.activeElement;setDiscard(true);}else onClose(); }
  return <dialog ref={ref} onKeyDown={containDialogFocus} aria-labelledby={titleId} onCancel={e=>{e.preventDefault();close();}}
    className={'app-dialog m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] overflow-y-auto rounded-2xl border border-slate-300 bg-white p-0 text-ink-primary shadow-xl backdrop:bg-slate-900/50 '+(wide?'max-w-5xl':'max-w-2xl')}>
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
      <div className="min-w-0"><h2 id={titleId} className="text-xl font-semibold">{title}</h2>{subtitle&&<p className="mt-1 break-words text-sm text-ink-muted">{subtitle}</p>}</div><button type="button" disabled={busy} className={button+' shrink-0 whitespace-nowrap'} onClick={close}>Close</button>
    </header>
    {discard?<div className="p-6"><p role="alert" className="font-semibold">Discard your unsaved changes?</p><p className="mt-2 text-ink-muted">Your saved information will stay unchanged.</p><div className="mt-5 flex flex-wrap gap-3"><button data-discard-focus className={button} onClick={()=>setDiscard(false)}>Continue editing</button><button className={button+' text-red-800'} onClick={onClose}>Discard changes</button></div></div>:children}
  </dialog>;
}
