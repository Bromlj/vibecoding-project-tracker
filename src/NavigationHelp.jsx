import {useState} from 'react';
import Dialog from './Dialog.jsx';
import ReadAloud from './ReadAloud';
import {SHORTCUTS} from './navigationAccess';
import {button} from './ui';

export function KeyboardGuide() {
  return <div className="mt-3">
    <p className="text-sm text-ink-muted">Tab moves forward; Shift + Tab moves back. Enter or Space activates buttons. Arrow keys move through native choices and editor tabs. Escape closes a dialog, with protection for unsaved edits.</p>
    <p className="mt-3 text-sm text-ink-muted">Optional shortcuts use one key at a time. They pause in input fields and dialogs. Keep them off if they conflict with screen-reader commands or dictation. Browser and assistive-technology shortcuts are unchanged.</p>
    <dl className="shortcut-list">{SHORTCUTS.map(([key,label])=><div key={key}><dt><kbd>{key.toUpperCase()}</kbd></dt><dd>{label}</dd></div>)}</dl>
  </div>;
}

export default function NavigationHelp({accessibility, ready, boardVisible, pageText, onAction, onClose}) {
  const [error,setError]=useState('');
  function toggle(value) {
    const result=accessibility.commit({...accessibility.preferences,shortcuts:value});
    setError(result.ok?'':result.error);
  }
  return <Dialog title="Navigation & reading" onClose={onClose} wide>
    <div className="p-5 sm:p-7">
      <h3 className="font-semibold">Go straight to a section</h3>
      <p className="mt-2 text-sm text-ink-muted">Use these buttons, keyboard shortcuts or your device’s voice-control commands. No microphone is used by this app.</p>
      <div className="mt-3 flex flex-wrap gap-3">
        {ready&&[['projects','Projects'],['board','Current project board'],['members','Team'],['milestones','Project milestones'],['settings','Appearance & settings']].map(([action,label])=><button key={action} className={button} onClick={()=>onAction(action)}>{label}</button>)}
        <button className={button} onClick={()=>onAction('accessibility')}>Accessibility preferences</button>
        {boardVisible&&<button className={button} onClick={()=>onAction('search')}>Find tasks</button>}
        <button className={button} onClick={()=>onAction('main')}>Main content</button>
      </div>
      <ReadAloud text={pageText} label="Read page aloud"/>
      <h3 className="mt-6 font-semibold">Keyboard navigation</h3>
      <label className="mt-3 flex min-h-11 items-center gap-3 font-medium"><input type="checkbox" className="h-5 w-5 accent-teal-800" checked={Boolean(accessibility.preferences.shortcuts)} onChange={e=>toggle(e.target.checked)}/>Enable single-key shortcuts</label>
      <p className="text-sm text-ink-muted">Saved immediately for this browser. Standard keyboard navigation always works.</p>
      {(error||accessibility.error)&&<p role="alert" className="mt-3 text-red-800">{error||accessibility.error}</p>}
      <KeyboardGuide/>
      <h3 className="mt-5 font-semibold">Screen readers and text alternatives</h3>
      <p className="mt-2 text-sm text-ink-muted">Use your screen reader’s headings, landmarks and form controls to move around. “Skip to main content” bypasses navigation. Task buttons include task names; status, owner and deadlines have text labels. Decorative icons repeat nearby text and are skipped to avoid duplicate announcements.</p>
    </div>
  </Dialog>;
}
