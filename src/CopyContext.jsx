import { useRef, useState } from 'react';
import Icon from './Icon';
import { serializeContext } from './context';
import { button, input } from './ui';
export default function CopyContext({ task, compact = false }) {
  const [feedback,setFeedback]=useState(''),[busy,setBusy]=useState(false);
  const [manual,setManual]=useState(false);
  const fallback=useRef(null);
  async function copy() {
    if(busy)return;
    setBusy(true);setFeedback('Copying context…');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(serializeContext(task));
      setManual(false);setFeedback('Context copied. Paste it into your AI tool.');
    } catch {
      setManual(true);setFeedback('Automatic copy was blocked. Select the briefing below and copy it manually.');
      requestAnimationFrame(()=>{fallback.current?.focus();fallback.current?.select();});
    } finally {setBusy(false);}
  }
  return <div className="min-w-0">
    <button type="button" disabled={busy} aria-label={(busy?'Copying context for ':'Copy context for ')+(task.title||'untitled task')} className={button+(compact?'':' w-full')} onClick={copy}><Icon name="copy" size={17}/>{busy?'Copying context…':'Copy context'}</button>
    {feedback&&<p role="status" className="mt-2 text-sm text-ink-muted">{feedback}</p>}
    {manual&&<label className="mt-3 block text-sm font-medium">Context to copy manually
      <textarea ref={fallback} aria-label="Context to copy manually" readOnly rows={7} className={input+' font-mono text-sm'} value={serializeContext(task)}/>
    </label>}
  </div>;
}
