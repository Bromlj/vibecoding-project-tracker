import {useEffect,useRef,useState} from 'react';
import {ATTEMPT_RESULTS,ATTEMPT_LIMITS,MAX_ATTEMPTS,newAttempt} from './attempts';
import {AI_TOOLS} from './aiTools';
import {button,input} from './ui';

export default function AttemptsPanel({attempts=[],savedAttempts=[],onChange,onReview,author=''}) {
  const [removing,setRemoving]=useState(null),[focusId,setFocusId]=useState(null);
  const panel=useRef(null),addButton=useRef(null);
  useEffect(()=>{if(focusId){panel.current?.querySelector('[data-new-prompt]')?.focus();setFocusId(null);}},[attempts,focusId]);
  function update(id,field,value){onChange(attempts.map(a=>a.id===id?{...a,[field]:value}:a));}
  function add(){const next=newAttempt(author);setFocusId(next.id);onChange([...attempts,next]);}
  return <section ref={panel} aria-labelledby="attempts-heading">
    <h3 id="attempts-heading" className="text-lg font-semibold">Attempts & lessons</h3>
    <p className="mt-2 max-w-prose text-ink-muted">Keep the approaches you tried, including failures, so the next attempt starts with what you learned. Outcomes are your assessment, not an AI verdict.</p>
    <p className="mt-2 text-sm text-ink-muted">Adding or editing here changes this task draft. Save task keeps the timeline. Only checked attempts are included when you review or copy the briefing.</p>
    <div className="mt-4 flex flex-wrap gap-3"><button ref={addButton} type="button" className={button} disabled={attempts.length>=MAX_ATTEMPTS} onClick={add}>Add attempt</button><button type="button" className={button} onClick={onReview}>Review selected attempts in briefing</button></div>
    <p className="mt-2 text-sm text-ink-muted" role="status">{attempts.length}/{MAX_ATTEMPTS} attempts · {attempts.filter(a=>a.includeInBrief).length} included in briefing</p>
    {!attempts.length&&<p className="empty-state mt-4">No attempts recorded yet. Add the prompt you tried, what happened and what you learned.</p>}
    <ol className="attempt-timeline">{attempts.map((a,index)=>({a,index})).reverse().map(({a,index})=>{
      const saved=savedAttempts.find(s=>s.id===a.id);
      return <li key={a.id} className="attempt-entry">
        <h4 className="font-semibold">Attempt {index+1} · {ATTEMPT_RESULTS[a.result]||'Choose a result'}</h4>
        {a.author&&<p className="text-sm">Recorded by {a.author}</p>}
        <p className="mt-1 text-sm text-ink-muted">{a.tool||'Tool not specified'} · {saved?<><time dateTime={saved.createdAt}>Recorded {new Date(saved.createdAt).toLocaleString('en-GB')}</time>{saved.updatedAt!==saved.createdAt&&<> · <time dateTime={saved.updatedAt}>Edited {new Date(saved.updatedAt).toLocaleString('en-GB')}</time></>}</>:'New attempt — not saved'}</p>
        {a.lesson&&<p className="attempt-summary mt-3"><strong>Lesson: </strong>{a.lesson}</p>}
        <label className="mt-3 flex min-h-11 items-center gap-3"><input type="checkbox" className="h-5 w-5" checked={a.includeInBrief} onChange={e=>update(a.id,'includeInBrief',e.target.checked)}/>Include attempt {index+1} in briefing</label>
        <details open={!saved} className="mt-2"><summary className="min-h-11 cursor-pointer py-3 font-medium">View or edit attempt {index+1}</summary>
          <label className="mb-4 block font-medium">Recorded by for attempt {index+1} <span className="text-sm text-ink-muted">(optional, self-reported)</span><input className={input} value={a.author||''} onChange={e=>update(a.id,'author',e.target.value)}/></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block font-medium">AI tool for attempt {index+1}<select className={input} value={a.tool||''} onChange={e=>update(a.id,'tool',e.target.value||null)}><option value="">Not specified</option>{AI_TOOLS.map(t=><option key={t}>{t}</option>)}</select></label>
            <label className="block font-medium">Result for attempt {index+1}<select className={input} value={a.result} onChange={e=>update(a.id,'result',e.target.value)}><option value="">Choose a result</option>{Object.entries(ATTEMPT_RESULTS).map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>
          </div>
          {[['prompt','Prompt used'],['outcome','What happened'],['lesson','Lesson / reason']].map(([field,label])=><label key={field} className="mt-4 block font-medium">{label} for attempt {index+1} <span className="text-sm text-ink-muted">(required)</span><textarea data-new-prompt={field==='prompt'&&a.id===focusId?'true':undefined} rows={field==='prompt'?5:3} className={input+(field==='prompt'?' font-mono':'')} value={a[field]} onChange={e=>update(a.id,field,e.target.value)}/><span className="mt-1 block text-sm text-ink-muted">{a[field].length.toLocaleString()}/{ATTEMPT_LIMITS[field].toLocaleString()} characters</span></label>)}
        </details>
        {removing===a.id?<div className="mt-3"><p role="alert">Remove attempt {index+1} from this draft? Save task makes the removal permanent.</p><div className="mt-3 flex flex-wrap gap-3"><button type="button" className={button} onClick={()=>setRemoving(null)}>Keep attempt</button><button type="button" className={button} onClick={()=>{onChange(attempts.filter(item=>item.id!==a.id));setRemoving(null);requestAnimationFrame(()=>addButton.current?.focus());}}>Confirm remove attempt {index+1}</button></div></div>:<button type="button" className={button+' mt-3'} onClick={()=>setRemoving(a.id)}>Remove attempt {index+1}</button>}
      </li>;
    })}</ol>
  </section>;
}
