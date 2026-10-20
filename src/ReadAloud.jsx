import {useEffect, useId, useRef, useState} from 'react';
import {button, input} from './ui';
import {speechChunks} from './navigationAccess';

export default function ReadAloud({text, label = 'Read briefing aloud'}) {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  const supported = Boolean(synth && window.SpeechSynthesisUtterance);
  const [voices,setVoices] = useState([]), [voiceId,setVoiceId] = useState('');
  const [rate,setRate] = useState('1'), [state,setState] = useState('idle'), [message,setMessage] = useState('');
  const run = useRef(0), current = useRef(null), previousState = useRef('idle'), root = useRef(null), startButton = useRef(null), pauseButton = useRef(null), id = useId();
  function cancel() {
    run.current += 1;
    if (current.current) { current.current = null; synth?.cancel(); }
  }
  function stop() { cancel(); setState('idle'); setMessage('Reading stopped.'); }
  useEffect(()=>{
    if (!supported) return;
    const load = ()=>setVoices(synth.getVoices().filter(v=>v.localService));
    load(); synth.addEventListener('voiceschanged',load);
    return ()=>{synth.removeEventListener('voiceschanged',load);cancel();};
  },[synth,supported]);
  useEffect(()=>{cancel();setState('idle');setMessage('');},[text]);
  useEffect(()=>{
    if(state==='reading'&&previousState.current==='idle')pauseButton.current?.focus();
    if(state==='idle'&&previousState.current!=='idle'&&(document.activeElement===document.body||root.current?.contains(document.activeElement)))startButton.current?.focus();
    previousState.current=state;
  },[state]);
  useEffect(()=>{
    const stopWhenHidden=()=>{if(document.hidden&&current.current){cancel();setState('idle');setMessage('Reading stopped when you left this page.');}};
    const escape=e=>{if(e.key==='Escape'&&current.current)stop();};
    document.addEventListener('visibilitychange',stopWhenHidden);
    document.addEventListener('keydown',escape);
    return ()=>{document.removeEventListener('visibilitychange',stopWhenHidden);document.removeEventListener('keydown',escape);};
  },[]);
  function start() {
    cancel();
    const voice = voices.find(v=>v.voiceURI===voiceId) || voices.find(v=>v.lang.startsWith('en')) || voices[0];
    const chunks = speechChunks(text);
    if (!voice || !chunks.length) { setMessage('No readable text or device voice is available.'); return; }
    const token = run.current;
    setState('reading'); setMessage('Reading aloud. Use Pause reading or Stop reading.');
    const next = index=>{
      if (token !== run.current) return;
      if (index === chunks.length) {current.current=null;setState('idle');setMessage('Reading finished.');return;}
      const utterance = new SpeechSynthesisUtterance(chunks[index]);
      utterance.voice=voice;utterance.lang=voice.lang;utterance.rate=Number(rate);
      utterance.onend=()=>next(index+1);
      utterance.onerror=()=>{if(token!==run.current)return;current.current=null;setState('idle');setMessage('Reading could not continue. Try another device voice or use your screen reader.');};
      current.current=utterance;
      try {synth.speak(utterance);} catch {utterance.onerror();}
    };
    next(0);
  }
  function pause() {
    if(state==='reading'){synth.pause();setState('paused');setMessage('Reading paused.');}
    else {synth.resume();setState('reading');setMessage('Reading resumed.');}
  }
  return <section ref={root} className="reading-tools" aria-labelledby={id+'-title'}>
    <h3 id={id+'-title'} className="font-semibold">Read aloud</h3>
    <p className="mt-1 text-sm text-ink-muted">Starts only when you choose. Only voices reported by your browser as local to this device are offered. Your screen reader works separately.</p>
    {!supported?<p className="mt-3 text-sm">Read aloud is unavailable in this browser. Use your device’s screen reader; all text and controls remain available.</p>:!voices.length?<p role="status" className="mt-3 text-sm">No local voice is available yet. Check your device’s speech voices or use your screen reader. No remote voice is selected automatically.</p>:<>
      <div className="reading-options">
        <label>Device voice<select className={input} disabled={state!=='idle'} value={voiceId} onChange={e=>setVoiceId(e.target.value)}><option value="">Default device voice</option>{voices.map(v=><option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>)}</select></label>
        <label>Reading speed<select className={input} disabled={state!=='idle'} value={rate} onChange={e=>setRate(e.target.value)}><option value=".75">Slower</option><option value="1">Normal</option><option value="1.25">Faster</option></select></label>
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        <button ref={startButton} type="button" className={button} disabled={state!=='idle'||!text.trim()} onClick={start}>{label}</button>
        {state!=='idle'&&<><button ref={pauseButton} type="button" className={button} onClick={pause}>{state==='paused'?'Resume reading':'Pause reading'}</button><button type="button" className={button} onClick={stop}>Stop reading</button></>}
      </div>
    </>}
    <p role="status" aria-live="polite" className="mt-2 text-sm text-ink-muted">{message}</p>
  </section>;
}
