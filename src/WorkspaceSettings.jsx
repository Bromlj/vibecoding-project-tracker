import { useCallback, useEffect, useMemo, useState } from 'react';
import { button, primaryButton, input } from './ui';
import { PALETTES, CARD_PALETTES, validWorkspace } from './workspace';
import {DEFAULT_ACCESS,validAccess,appearanceColours} from './appearance';
import TypeBadge from './TypeBadge';
import { useLocalStorage } from './storage';
import Dialog from './Dialog.jsx';
import { Deadline } from './TaskBoard';
import OwnerBadge from './OwnerBadge';
import { KeyboardGuide } from './NavigationHelp';

export {DEFAULT_ACCESS,validAccess} from './appearance';
export function useAccessibility() {
  const [saved,commit,error]=useLocalStorage('vibetracker.accessibility',()=>DEFAULT_ACCESS,validAccess);
  const preferences=useMemo(()=>({...DEFAULT_ACCESS,...saved}),[saved]);
  const [previews,setPreviews]=useState({});
  const preview=useCallback((source,value)=>setPreviews(old=>({...old,[source]:value})),[]);
  const effective=previews.dialog||previews.settings||preferences;
  useEffect(()=>{document.documentElement.dataset.textSize=effective.textSize;document.documentElement.dataset.reducedMotion=String(effective.reducedMotion);},[effective.textSize,effective.reducedMotion]);
  useEffect(()=>{
    const system=window.matchMedia('(prefers-color-scheme: dark)');
    const apply=()=>{document.documentElement.dataset.theme=effective.theme==='system'?(system.matches?'dark':'light'):effective.theme;};
    apply();system.addEventListener('change',apply);
    return()=>system.removeEventListener('change',apply);
  },[effective.theme]);
  return {preferences,effective,preview,commit,error};
}
function usePreferencePreview(accessibility,source,draft) {
  const {preview}=accessibility;
  useEffect(()=>{preview(source,draft);},[preview,source,draft]);
  useEffect(()=>()=>preview(source,null),[preview,source]);
}
export function downloadJson(value,filename){const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));const link=document.createElement('a');link.href=url;link.download=filename;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}

export default function WorkspaceSettings({workspace,commit,onSaved,accessibility,onDirtyChange,onPalettePreview}) {
  const [name,setName]=useState(workspace.name),[palette,setPalette]=useState(workspace.palette),[error,setError]=useState(''),[busy,setBusy]=useState(false);
  const [cardPalette,setCardPalette]=useState(workspace.cardPalette||'traffic');
  const [access,setAccess]=useState(accessibility.preferences),[accessError,setAccessError]=useState('');
  usePreferencePreview(accessibility,'settings',access);
  useEffect(()=>{onPalettePreview({palette,cardPalette});},[onPalettePreview,palette,cardPalette]);
  useEffect(()=>()=>onPalettePreview(null),[onPalettePreview]);
  const [restore,setRestore]=useState(null),[restoreError,setRestoreError]=useState('');
  const dirty=name!==workspace.name||palette!==workspace.palette||cardPalette!==(workspace.cardPalette||'traffic')||JSON.stringify(access)!==JSON.stringify(accessibility.preferences);
  useEffect(()=>{onDirtyChange?.(dirty);return()=>onDirtyChange?.(false);},[dirty,onDirtyChange]);
  useEffect(()=>{if(!dirty)return;const protect=event=>{event.preventDefault();event.returnValue='';};window.addEventListener('beforeunload',protect);return()=>window.removeEventListener('beforeunload',protect);},[dirty]);
  useEffect(()=>{setName(workspace.name);setPalette(workspace.palette);},[workspace.name,workspace.palette]);
  useEffect(()=>setCardPalette(workspace.cardPalette||'traffic'),[workspace.cardPalette]);
  useEffect(()=>setAccess(accessibility.preferences),[accessibility.preferences]);
  async function saveWorkspace(e){e.preventDefault();if(!name.trim()||name.trim().length>100){setError('Enter a workspace name of up to 100 characters.');return;}setBusy(true);const result=await commit(old=>({...old,name:name.trim(),palette,cardPalette}));setBusy(false);if(result.ok){setError('');onSaved('Workspace settings saved.');}else setError(result.error);}
  function saveAccess(e){e.preventDefault();const result=accessibility.commit(access);if(result.ok){setAccessError('');onSaved('Accessibility preferences saved for this browser.');}else setAccessError(result.error);}
  async function readBackup(event){setRestoreError('');setRestore(null);const file=event.target.files?.[0];if(!file)return;try{if(file.size>10*1024*1024)throw new Error();const data=JSON.parse(await file.text());if(!validWorkspace(data)||!data.name)throw new Error();setRestore(data);}catch{setRestoreError('Choose a valid workspace backup JSON file up to 10 MiB. Your current workspace has not changed.');}event.target.value='';}
  async function restoreBackup(){setBusy(true);const result=await commit(restore);setBusy(false);if(result.ok){setRestore(null);setRestoreError('');onSaved('Workspace backup restored.');}else setRestoreError(result.error);}
  const previewColours=appearanceColours(palette,cardPalette,accessibility.effective.colourVision);
  return <div><div className="settings-heading"><h1>Appearance & settings</h1><p>Choose a comfortable view and manage your workspace.</p></div><div className="settings-layout"><div>
    <form onSubmit={saveWorkspace} className="mt-7 rounded-xl border border-slate-300 bg-white p-5 sm:p-7"><h2 className="text-xl font-semibold">Workspace and task colours</h2><label className="mt-5 block font-medium">Workspace name<input required className={input} value={name} onChange={e=>setName(e.target.value)}/></label><label className="mt-5 block font-medium">Task colour palette<select aria-label="Task colour palette" className={input} value={palette} onChange={e=>setPalette(e.target.value)}>{Object.entries(PALETTES).map(([id,p])=><option key={id} value={id}>{p.name}{id==='default'?' (default)':''}</option>)}</select></label>
      <div className="mt-3 flex flex-wrap gap-3" style={previewColours}><TypeBadge type="feature"/><TypeBadge type="bug"/></div><p className="mt-3 text-sm text-ink-muted">Names and icons always identify task types. Deadline colours keep their separate meaning. A personal Colour vision support choice below overrides these workspace colours in your browser.</p>
      <label htmlFor="card-palette" className="mt-5 block font-medium">Whole-card colours</label><select id="card-palette" className={input} value={cardPalette} onChange={e=>setCardPalette(e.target.value)}>{Object.entries(CARD_PALETTES).map(([id,p])=><option key={id} value={id}>{p.name}{id==='traffic'?' (default)':''}</option>)}</select>
      <p className="mt-2 text-sm text-ink-muted">Alarm means overdue; Warning means due within 48 hours, with a more specific label within 24 hours. Done is neutral and overrides the deadline. Choose the palette that is easiest for you to distinguish. Words and different border styles always remain.</p>
      {error&&<p role="alert" className="mt-4 text-red-800">{error}</p>}<div className="mt-5 flex flex-wrap gap-3"><button type="button" className={button} disabled={busy} onClick={()=>{setName(workspace.name);setPalette(workspace.palette);setCardPalette(workspace.cardPalette||'traffic');setError('');}}>Cancel workspace changes</button><button type="button" className={button} onClick={()=>{setPalette('default');setCardPalette('traffic');}}>Use default palette</button><button className={primaryButton} disabled={busy}>{busy?'Saving…':'Save workspace settings'}</button></div>
    </form>
    <form onSubmit={saveAccess} className="mt-6 rounded-xl border border-slate-300 bg-white p-5 sm:p-7" aria-labelledby="access-title"><h2 id="access-title" className="text-xl font-semibold">Accessibility</h2><p className="mt-2 max-w-prose text-sm text-ink-muted">Preferences apply to this browser, not to everyone in your team. Labels, keyboard operation and colour-independent information are always available.</p>
      <AccessibilityFields access={access} setAccess={setAccess}/>
      {(accessError||accessibility.error)&&<p role="alert" className="mt-4 text-red-800">{accessError||accessibility.error}</p>}
      <div className="mt-5 flex flex-wrap gap-3"><button type="button" className={button} onClick={()=>{setAccess(accessibility.preferences);setAccessError('');}}>Cancel accessibility changes</button><button type="button" className={button} onClick={()=>setAccess({...DEFAULT_ACCESS})}>Reset accessibility preferences</button><button className={primaryButton}>Save accessibility preferences</button></div>
    </form>
    <section className="mt-6 rounded-xl border border-slate-300 bg-white p-5 sm:p-7" aria-labelledby="backup-title"><h2 id="backup-title" className="text-xl font-semibold">Workspace backup</h2><p className="mt-2 max-w-prose text-sm text-ink-muted">Download your projects, members, milestones and context as JSON. Keep the file private if it contains team contact details. Sign-in permissions and browser accessibility preferences are separate.</p><button className={button+' mt-4'} onClick={()=>downloadJson(workspace,'vibetracker-workspace-backup.json')}>Download workspace backup</button><label className="mt-6 block font-medium">Restore a workspace backup<input type="file" accept=".json,application/json" className={input+' py-3'} onChange={readBackup}/></label><p className="mt-2 text-sm text-ink-muted">The file is checked first. Nothing changes until you confirm replacement below.</p>{restore&&<div className="mt-4 rounded-lg border border-amber-500 bg-amber-50 p-4"><p className="font-medium">Replace “{workspace.name}” with “{restore.name}”?</p><p className="mt-2 text-sm">The backup contains {restore.boards.length} projects and {restore.members.length} members. Current workspace content will be replaced. Download a backup first if you want to keep it.</p><div className="mt-4 flex flex-wrap gap-3"><button className={button} disabled={busy} onClick={()=>setRestore(null)}>Cancel restore</button><button className={primaryButton} disabled={busy} onClick={restoreBackup}>Confirm restore backup</button></div></div>}{restoreError&&<p role="alert" className="mt-4 text-red-800">{restoreError}</p>}</section>
    </div><aside aria-labelledby="preview-heading" className="settings-preview" style={previewColours}>
      <h2 id="preview-heading">Live preview</h2><p>Changes appear immediately. Save to keep them, or Cancel to restore your saved settings.</p>
      <div className="task-card"><p className="sample-title">Check keyboard navigation</p><div className="mt-3 flex flex-wrap gap-2"><TypeBadge type="feature"/><TypeBadge type="bug"/></div><div className="mt-4"><OwnerBadge name="Example teammate"/></div><Deadline task={{status:'todo',dueDate:null}}/></div>
      <div className="task-card task-card-urgent"><p className="font-semibold">Alarm · overdue</p><p className="text-sm text-ink-muted">Deadline has passed</p></div>
      <div className="task-card task-card-soon"><p className="font-semibold">Warning · due soon</p><p className="text-sm text-ink-muted">Due within 48 hours</p></div>
      <div className="task-card task-card-complete"><p className="font-semibold">✓ Done · complete</p><p className="text-sm text-ink-muted">Neutral even if previously overdue</p></div>
      <p>Task labels and icons stay visible in every palette. Deadline colours keep their own meaning.</p><p>Keyboard access and visible focus are always available.</p>
    </aside></div>
  </div>;
}

export function AccessibilityFields({access,setAccess}) {
  return <>
<label className="mt-5 block font-medium">Appearance<select aria-label="Appearance" className={input} value={access.theme||'system'} onChange={e=>setAccess({...access,theme:e.target.value})}><option value="system">System — follow device</option><option value="light">Light</option><option value="dark">Dark</option></select></label>
      <p className="mt-2 text-sm text-ink-muted">Live preview: changes apply immediately without saving. Save to keep them or Cancel to restore your saved preferences. System follows your device’s light or dark setting.</p>
      <label className="mt-5 block font-medium">Colour vision support<select aria-label="Colour vision support" className={input} value={access.colourVision||'workspace'} onChange={e=>setAccess({...access,colourVision:e.target.value})}><option value="workspace">Use workspace colours</option><option value="blue-amber">Blue and amber — neutral grey Done</option><option value="monochrome">Greys — labels and distinct borders</option></select></label>
      <p className="mt-2 text-sm text-ink-muted">For colour blindness or colours that are difficult to distinguish. This changes both whole-card Alarm/Warning/Done colours and Feature/Bug badges, only for you. Choose the preview you find clearest; labels, icons and distinct borders stay visible in every option.</p>
      <fieldset className="colour-access-preview mt-4"><legend className="font-medium">Colour preview</legend><div className="mt-2 flex flex-wrap gap-3"><TypeBadge type="feature"/><TypeBadge type="bug"/></div><div className="colour-access-samples"><div className="task-card task-card-urgent"><strong>Alarm</strong><p>Overdue</p></div><div className="task-card task-card-soon"><strong>Warning</strong><p>Due within 48h</p></div><div className="task-card task-card-complete"><strong>✓ Done</strong><p>Complete</p></div></div></fieldset>
<label className="mt-5 block font-medium">Text size<select aria-label="Text size" className={input} value={access.textSize} onChange={e=>setAccess({...access,textSize:e.target.value})}><option value="standard">Standard</option><option value="large">Large</option><option value="largest">Extra large</option></select></label>
      <label className="mt-5 block font-medium">Contrast<select aria-label="Contrast" className={input} value={access.contrast} onChange={e=>setAccess({...access,contrast:e.target.value})}><option value="standard">Standard contrast</option><option value="high">Higher contrast</option></select></label>
      <label className="mt-5 flex min-h-11 items-center gap-3 font-medium"><input type="checkbox" className="h-5 w-5 accent-teal-800" checked={access.reducedMotion} onChange={e=>setAccess({...access,reducedMotion:e.target.checked})}/>Reduce motion</label>
      <label className="mt-2 flex min-h-11 items-center gap-3 font-medium"><input type="checkbox" className="h-5 w-5 accent-teal-800" checked={access.reduceEffects} onChange={e=>setAccess({...access,reduceEffects:e.target.checked})}/>Reduce visual effects and modal shadows</label>
      <p className="mt-2 text-sm text-ink-muted">The interface avoids decorative blur and animation. Your device's reduced-motion preference is respected too. Browser zoom remains available.</p>
      <label className="mt-5 flex min-h-11 items-center gap-3 font-medium"><input type="checkbox" className="h-5 w-5 accent-teal-800" checked={Boolean(access.shortcuts)} onChange={e=>setAccess({...access,shortcuts:e.target.checked})}/>Enable single-key shortcuts</label>
      <details className="mt-2"><summary className="min-h-11 cursor-pointer py-3 font-medium">Keyboard and screen-reader guidance</summary><KeyboardGuide/><p className="mt-3 text-sm text-ink-muted">Navigation & reading in the main menu also offers direct section buttons and optional device-voice reading. Use your installed screen reader for headings, landmarks and control announcements.</p></details>
  </>;
}

export function AccessibilityDialog({accessibility,onClose,onSaved}) {
  const [draft,setDraft]=useState(accessibility.preferences),[error,setError]=useState('');
  usePreferencePreview(accessibility,'dialog',draft);
  const dirty=JSON.stringify(draft)!==JSON.stringify(accessibility.preferences);
  function save(e){e.preventDefault();const result=accessibility.commit(draft);if(result.ok){onSaved('Accessibility preferences saved for this browser.');onClose();}else setError(result.error);}
  return <Dialog title="Accessibility preferences" onClose={onClose} dirty={dirty}><form onSubmit={save}><div className="p-5 sm:p-7"><p className="max-w-prose text-sm text-ink-muted">Adjust the interface before or after workspace setup. Preferences stay in this browser. Keyboard support and meaningful labels are always available.</p><AccessibilityFields access={draft} setAccess={setDraft}/>{(error||accessibility.error)&&<p role="alert" className="mt-4 text-red-800">{error||accessibility.error}</p>}</div><footer className="dialog-actions"><button type="button" className={button} onClick={onClose}>Cancel accessibility changes</button><button type="button" className={button} onClick={()=>setDraft({...DEFAULT_ACCESS})}>Reset accessibility preferences</button><button className={primaryButton}>Save accessibility preferences</button></footer></form></Dialog>;
}
