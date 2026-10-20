import { useEffect, useRef } from 'react';
import { briefingGaps, serializeContext } from './context';
import CopyContext from './CopyContext';
import { button, input } from './ui';
export default function BriefingReview({ task, onClose }) {
 const dialog=useRef(null);
 const gaps=briefingGaps(task.context);
 useEffect(()=>{const node=dialog.current;if(!node.open)node.showModal();return()=>node.close();},[]);
 return <dialog ref={dialog} aria-labelledby="review-title" onCancel={event=>{event.preventDefault();onClose();}} className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl border border-slate-300 bg-white p-5 text-ink-primary shadow-xl backdrop:bg-slate-900/50 sm:p-7">
  <div className="flex flex-wrap items-center justify-between gap-3"><h2 id="review-title" className="text-2xl font-semibold">Review briefing</h2><button type="button" className={button} onClick={onClose}>Close review</button></div>
  <p className="mt-3 text-ink-muted">Check what the next AI tool or teammate will receive. This review does not edit or save the task.</p>
  <section aria-labelledby="review-hints" className="mt-5 rounded-lg border border-slate-300 bg-slate-50 p-4">
   <h3 id="review-hints" className="font-semibold">Before you hand over</h3>
   <p className="mt-2 text-sm text-ink-muted">Check the goal, constraints, actual outcomes and next step. Template headings are optional; these hints check for text, not accuracy.</p>
   {gaps.length?<><p className="mt-3 text-sm font-medium">Consider adding detail under:</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{gaps.map(gap=><li key={gap}>{gap}</li>)}</ul></>:<p className="mt-3 text-sm">Template sections contain text. Check that the information is accurate and current.</p>}
  </section>
  <label className="mt-5 block font-medium">Briefing to copy
   <textarea autoFocus aria-label="Briefing to copy" readOnly rows={12} className={input+' font-mono text-sm'} value={serializeContext(task)}/>
  </label>
  <div className="mt-4"><CopyContext task={task}/></div>
 </dialog>;
}
