import { useEffect, useState } from 'react';
import { button, primaryButton, input } from './ui';
import { PALETTES } from './workspace';
import TypeBadge from './TypeBadge';
import { useLocalStorage } from './storage';

export const DEFAULT_ACCESS = {textSize:'standard',contrast:'standard',reducedMotion:false,reduceEffects:false};
export const validAccess = p => p && ['standard','large','largest'].includes(p.textSize) && ['standard','high'].includes(p.contrast) && typeof p.reducedMotion==='boolean' && typeof p.reduceEffects==='boolean';
export function useAccessibility() {
  const [saved,commit,error]=useLocalStorage('vibetracker.accessibility',()=>DEFAULT_ACCESS,validAccess);
  const preferences=saved||DEFAULT_ACCESS;
  useEffect(()=>{document.documentElement.dataset.textSize=preferences.textSize;document.documentElement.dataset.reducedMotion=String(preferences.reducedMotion);},[preferences.textSize,preferences.reducedMotion]);
  return {preferences,commit,error};
}
export function downloadJson(value,filename){const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));const link=document.createElement('a');link.href=url;link.download=filename;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}

export default function WorkspaceSettings({workspace,commit,onSaved,accessibility}) {
  const [name,setName]=useState(workspace.name),[palette,setPalette]=useState(workspace.palette),[error,setError]=useState(''),[busy,setBusy]=useState(false);
  const [access,setAccess]=useState(accessibility.preferences),[accessError,setAccessError]=useState('');
  useEffect(()=>{setName(workspace.name);setPalette(workspace.palette);},[workspace.name,workspace.palette]);
  async function saveWorkspace(e){e.preventDefault();if(!name.trim()||name.trim().length>100){setError('Enter a workspace name of up to 100 characters.');return;}setBusy(true);const result=await commit(old=>({...old,name:name.trim(),palette}));setBusy(false);if(result.ok){setError('');onSaved('Workspace settings saved.');}else setError(result.error);}
  function saveAccess(e){e.preventDefault();const result=accessibility.commit(access);if(result.ok){setAccessError('');onSaved('Accessibility preferences saved for this browser.');}else setAccessError(result.error);}
  const selected=PALETTES[palette];
  return <div className="max-w-3xl"><h1 className="text-3xl font-semibold">Workspace settings</h1><p className="mt-2 text-ink-muted">Make the workspace useful for your team and comfortable for you.</p>
    <form onSubmit={saveWorkspace} className="mt-7 rounded-xl border border-slate-300 bg-white p-5 sm:p-7"><h2 className="text-xl font-semibold">Workspace and task colours</h2><label className="mt-5 block font-medium">Workspace name<input required className={input} value={name} onChange={e=>setName(e.target.value)}/></label><label className="mt-5 block font-medium">Task colour palette<select aria-label="Task colour palette" className={input} value={palette} onChange={e=>setPalette(e.target.value)}>{Object.entries(PALETTES).map(([id,p])=><option key={id} value={id}>{p.name}{id==='default'?' (default)':''}</option>)}</select></label>
      <div className="mt-3 flex flex-wrap gap-3" style={{'--feature-text':selected.feature[0],'--feature-bg':selected.feature[1],'--feature-border':selected.feature[2],'--bug-text':selected.bug[0],'--bug-bg':selected.bug[1],'--bug-border':selected.bug[2]}}><TypeBadge type="feature"/><TypeBadge type="bug"/></div><p className="mt-3 text-sm text-ink-muted">Names and icons always identify task types. Deadline colours keep their separate meaning.</p>
      {error&&<p role="alert" className="mt-4 text-red-800">{error}</p>}<div className="mt-5 flex flex-wrap gap-3"><button type="button" className={button} onClick={()=>setPalette('default')}>Use default palette</button><button className={primaryButton} disabled={busy}>{busy?'Saving…':'Save workspace settings'}</button></div>
    </form>
    <form onSubmit={saveAccess} className="mt-6 rounded-xl border border-slate-300 bg-white p-5 sm:p-7" aria-labelledby="access-title"><h2 id="access-title" className="text-xl font-semibold">Accessibility</h2><p className="mt-2 max-w-prose text-sm text-ink-muted">Preferences apply to this browser, not to everyone in your team. Labels, keyboard operation and colour-independent information are always available.</p>
      <label className="mt-5 block font-medium">Text size<select aria-label="Text size" className={input} value={access.textSize} onChange={e=>setAccess({...access,textSize:e.target.value})}><option value="standard">Standard</option><option value="large">Large</option><option value="largest">Extra large</option></select></label>
      <label className="mt-5 block font-medium">Contrast<select aria-label="Contrast" className={input} value={access.contrast} onChange={e=>setAccess({...access,contrast:e.target.value})}><option value="standard">Standard contrast</option><option value="high">Higher contrast</option></select></label>
      <label className="mt-5 flex min-h-11 items-center gap-3 font-medium"><input type="checkbox" className="h-5 w-5 accent-teal-800" checked={access.reducedMotion} onChange={e=>setAccess({...access,reducedMotion:e.target.checked})}/>Reduce motion</label>
      <label className="mt-2 flex min-h-11 items-center gap-3 font-medium"><input type="checkbox" className="h-5 w-5 accent-teal-800" checked={access.reduceEffects} onChange={e=>setAccess({...access,reduceEffects:e.target.checked})}/>Reduce visual effects and modal shadows</label>
      <p className="mt-2 text-sm text-ink-muted">The interface avoids decorative blur and animation. Your device's reduced-motion preference is respected too. Browser zoom remains available.</p>
      {(accessError||accessibility.error)&&<p role="alert" className="mt-4 text-red-800">{accessError||accessibility.error}</p>}
      <div className="mt-5 flex flex-wrap gap-3"><button type="button" className={button} onClick={()=>setAccess({...DEFAULT_ACCESS})}>Reset accessibility preferences</button><button className={primaryButton}>Save accessibility preferences</button></div>
    </form>
    <section className="mt-6 rounded-xl border border-slate-300 bg-white p-5 sm:p-7" aria-labelledby="backup-title"><h2 id="backup-title" className="text-xl font-semibold">Workspace backup</h2><p className="mt-2 max-w-prose text-sm text-ink-muted">Download your projects, members, milestones and context as JSON. Keep the file private if it contains team contact details.</p><button className={button+' mt-4'} onClick={()=>downloadJson(workspace,'vibetracker-workspace-backup.json')}>Download workspace backup</button></section>
  </div>;
}
