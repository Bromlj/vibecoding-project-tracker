import { useRef, useState } from 'react';
import { serializeContext } from './context';
import { button, input } from './ui';
export default function CopyContext({ task, compact = false }) {
  const [feedback,setFeedback]=useState('');
  const [manual,setManual]=useState(false);
  const fallback=useRef(null);
  async function copy() {
    setFeedback('');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(serializeContext(task));
      setManual(false);setFeedback('Context copied. Paste it into your AI tool.');
    } catch {
      setManual(true);setFeedback('Automatic copy was blocked. Select the briefing below and copy it manually.');
      requestAnimationFrame(()=>{fallback.current?.focus();fallback.current?.select();});
    }
  }
  return <div className="min-w-0">
    <button type="button" className={button+(compact?'':' w-full')} onClick={copy}>Copy context</button>
    {feedback&&<p role="status" className="mt-2 text-sm text-ink-muted">{feedback}</p>}
    {manual&&<label className="mt-3 block text-sm font-medium">Context to copy manually
      <textarea ref={fallback} aria-label="Context to copy manually" readOnly rows={7} className={input+' font-mono text-sm'} value={serializeContext(task)}/>
    </label>}
  </div>;
}
