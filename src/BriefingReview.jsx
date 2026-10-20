import { briefingGaps, serializeContext, CONTEXT_SECTIONS } from './context';
import CopyContext from './CopyContext';
import Dialog from './Dialog.jsx';
import { input } from './ui';
import ReadAloud from './ReadAloud';

export function BriefingContent({task, draft = false}) {
  const hasDetails=Boolean(task.context.replace(/^#{1,6}\s+.*$/gm,'').trim());
  const usesTemplate=CONTEXT_SECTIONS.some(s=>task.context.includes('## '+s));
  const gaps=usesTemplate?briefingGaps(task.context):[];
  return <div className="p-5 sm:p-7">
    <p className="max-w-prose text-ink-muted">Read exactly what you will hand to your AI tool or teammate. Reviewing and copying do not save or send the task.</p>
    <p className="mt-2 text-sm">{(task.attempts||[]).filter(a=>a.includeInBrief).length} selected attempts included. Other attempts stay in the task timeline.</p>
    {draft&&<p className="mt-3 rounded-lg border border-amber-500 bg-amber-50 p-3 text-amber-950">This briefing includes your unsaved edits.</p>}
    {!hasDetails?<p role="status" className="mt-4 rounded-lg border border-slate-400 bg-slate-50 p-4">No context details yet. Add the goal, useful prompt, actual outcome and next step when you are ready.</p>:<div className="mt-4 text-sm text-ink-muted"><p>Check the goal, constraints, actual outcomes and next step. You decide whether the briefing is accurate.</p>{gaps.length>0&&<details className="mt-3"><summary className="cursor-pointer py-2 font-medium">Optional template suggestions ({gaps.length})</summary><ul className="list-disc space-y-1 pl-5">{gaps.map(g=><li key={g}>{g}</li>)}</ul><p className="mt-2">These headings are optional. Suggestions check text presence, not correctness.</p></details>}</div>}
    <label className="mt-5 block font-medium">Briefing to copy<textarea data-initial-focus aria-label="Briefing to copy" readOnly rows={12} className={input+' font-mono text-sm'} value={serializeContext(task)}/></label>
    <div className="mt-5"><CopyContext task={task}/></div>
    <ReadAloud text={serializeContext(task)}/>
  </div>;
}
export default function BriefingReview({task,onClose}) {
  return <Dialog title="Review briefing" onClose={onClose} wide><BriefingContent task={task}/></Dialog>;
}
