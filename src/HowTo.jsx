import {useState} from 'react';
import {button,primaryButton,input} from './ui';
import Dialog from './Dialog.jsx';

export const GUIDE_STEPS = [
  {title:'Give your work a home',action:'projects',label:'View projects',text:'A workspace is your team. Each project has a separate board, milestones and deliverable links. In your own workspace, start by naming the team and first project, then add yourself.',check:'Open a project from Projects. Team holds the people you can assign across every project.'},
  {title:'Capture a task',action:'add',label:'Add a practice task',text:'Create a small piece of work such as “Add a contact form”. Give it a title and description, choose Feature or Bug, and optionally select an owner and due date. Save task adds it to the board.',check:'The task should appear in its selected stage. Reopen its title to change it; Cancel leaves saved work unchanged.'},
  {title:'Keep the prompt and outcome',action:'edit',label:'Open a task for context',text:'Open a task and choose AI context. Record the goal, constraints, prompt you used, what actually happened, and the next step. Select the AI tool if useful. The headings are editable. In Attempts & lessons, keep each approach, its result and lesson; tick only those you want in the next briefing.',check:'Review briefing shows the exact text to copy. Copy context does not save or send it to AI. Paste it into your tool, then come back and record the actual outcome before saving.'},
  {title:'Move work and hand it over',action:'edit',label:'Open a task to update',text:'In Details, change Status from To Do to In Progress, Review or Done. “Hand off to” selects a member from Team. Add missing people in Team first. Keep the context current so the next person can continue.',check:'Save, then check the new column and owner. In the default card palette, red means overdue or due within 24 hours, amber means due in 24–48 hours, and green means Done. Written labels and Feature/Bug badges keep their separate meanings.'},
  {title:'Define what success means',action:'milestones',label:'Open project milestones',text:'Add a milestone such as “First usable version”. Write an achievement criterion: for example, “Create, edit and reload a task successfully”. A target date is optional.',check:'Mark Reached only after checking the criterion. You can return it to Pending. Completing a task or adding a link never marks a milestone automatically.'},
  {title:'Keep deliverables easy to find',action:'links',label:'Find deliverable links',text:'Above the board, edit the Presentation, Demo, Report and Documentation links. Save an HTTP or HTTPS address, change it later, or leave a slot empty. Use Open only when you want to visit it.',check:'“Link added” means a location is saved, not that the work is complete. The Presentation label is a supplied slot; leave it empty if your project does not need one.'},
  {title:'Make it comfortable and keep a backup',action:'settings',label:'Open appearance & settings',text:'Preview Light, Dark or System, text size, contrast and colour-vision options immediately. Colour vision support changes both task badges and whole-card colours for you. Save to keep changes or Cancel to restore them. Optional shortcuts and Navigation & reading help you move around.',check:'Download a workspace backup before clearing browser data or changing device/site. Restore checks the file and asks before replacing work. Local workspace data stays in this browser; shared access is a separate sign-in workflow.'},
  {title:'Start your own project',action:'finish',label:'Return to my workspace',text:'You can now capture work, retain context, hand tasks over and check progress. Demo practice stays separate from your own workspace. Returning does not copy the example team or tasks.',check:'In your own workspace, create the real team and project, add one useful task, save its prompt and outcome, then reopen it. Use How to use whenever you need a reminder.'},
];

export default function HowTo({ready,onAction,demo}) {
  return <section className="how-to">
    <div className="page-heading"><div><h1>How to use the tracker</h1><p>From the first idea to a useful handover.</p></div>
      <a className={primaryButton} href={demo?window.location.pathname:'?demo=1'}>{demo?'Return to my workspace':'Practise in the demo'}</a>
    </div>
    <p className="max-w-prose text-ink-muted">Try the guided demo with example data, or follow this guide in your own workspace. It uses the same working controls. Nothing is sent to an AI tool automatically.</p>
    {!ready&&<button className={button+' mt-5'} onClick={()=>onAction('projects')}>Set up my workspace</button>}
    <ol className="how-to-steps">{GUIDE_STEPS.map((step,index)=><li key={step.title}>
      <h2><span className="guide-number" aria-hidden="true">{index+1}</span>{step.title}</h2>
      <p>{step.text}</p><p className="guide-check"><strong>Check:</strong> {step.check}</p>
      {ready&&step.action!=='finish'&&<button className={button+' mt-3'} onClick={()=>onAction(step.action)}>{step.label.replace('practice ','')}</button>}
    </li>)}</ol>
    <section className="mt-8 max-w-prose"><h2 className="text-xl font-semibold">Local work or shared work?</h2><p className="mt-3 text-ink-muted">You can use a local workspace without an account. Member names, emails and developer profiles describe your team; they do not connect their accounts. Shared access requires a configured sign-in service. Its owner controls who may join, and Refresh shared data loads colleagues’ changes. Download a local backup before moving to a new site.</p></section>
  </section>;
}

export function DemoGuide({onAction,onReset}) {
  const [step,setStep]=useState(0),[visible,setVisible]=useState(true),[reset,setReset]=useState(false),[error,setError]=useState('');
  const current=GUIDE_STEPS[step];
  async function resetDemo(){const result=await onReset();if(result.ok){setReset(false);setStep(0);setVisible(true);setError('');}else setError(result.error);}
  return <section className="demo-guide" aria-labelledby="demo-guide-title">
    <div className="flex flex-wrap items-center justify-between gap-3"><h2 id="demo-guide-title" className="font-semibold">Learn with the demo</h2><button className="text-action" aria-expanded={visible} aria-controls="demo-guide-content" onClick={()=>setVisible(!visible)}>{visible?'Hide guide':'Show guide'}</button></div>
    <div id="demo-guide-content" hidden={!visible}>
      <p className="mt-2 text-sm text-ink-muted">A practice workspace. Your changes here stay separate from your own work. Steps are instructions, not automatic completion checks.</p>
      <label htmlFor="guide-step" className="mt-4 block font-medium">Guide step</label><select id="guide-step" className={input} value={step} onChange={e=>setStep(Number(e.target.value))}>{GUIDE_STEPS.map((item,index)=><option key={item.title} value={index}>{index+1}. {item.title}</option>)}</select>
      <div aria-live="polite" aria-atomic="true"><h3 className="mt-4 font-semibold">Step {step+1} of {GUIDE_STEPS.length}: {current.title}</h3><p className="mt-2">{current.text}</p><p className="mt-2 text-sm text-ink-muted"><strong>Check:</strong> {current.check}</p></div>
      <div className="mt-4 flex flex-wrap gap-3">
        {current.action==='finish'?<a className={primaryButton} href={window.location.pathname}>{current.label}</a>:<button className={primaryButton} onClick={()=>onAction(current.action)}>{current.label}</button>}
        <button className={button} disabled={step===0} onClick={()=>setStep(n=>n-1)}>Previous step</button><button className={button} disabled={step===GUIDE_STEPS.length-1} onClick={()=>setStep(n=>n+1)}>Next step</button>
        <button className="text-action" onClick={()=>setReset(true)}>Reset demo practice</button>
      </div>
    </div>
    {reset&&<Dialog title="Reset demo practice" onClose={()=>setReset(false)}><div className="p-6"><p>Replace all demo projects, tasks, members, milestones and links with fresh examples? Changes made in this practice workspace will be removed. Your own local and shared workspaces will stay unchanged.</p>{error&&<p role="alert" className="mt-3 text-red-800">{error}</p>}<div className="mt-5 flex flex-wrap gap-3"><button className={button} onClick={()=>setReset(false)}>Keep demo changes</button><button className={primaryButton} onClick={resetDemo}>Reset example workspace</button></div></div></Dialog>}
  </section>;
}
