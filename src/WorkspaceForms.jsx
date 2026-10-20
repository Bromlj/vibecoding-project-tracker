import { useState } from 'react';
import Dialog from './Dialog.jsx';
import { button, primaryButton, input } from './ui';
import { createWorkspace, memberError, boardNameError, makeBoard, newId, removeMember } from './workspace';

export const emptyMember = {name:'',email:'',github:'',gitlab:''};
export function MemberFields({value,onChange}) {
  return <div className="grid gap-4 sm:grid-cols-2">
    <label className="block font-medium sm:col-span-2">Member name <span className="text-sm text-ink-muted">(required)</span><input data-initial-focus required className={input} value={value.name} onChange={e=>onChange({...value,name:e.target.value})} autoComplete="name"/></label>
    <label className="block font-medium sm:col-span-2">Email address <span className="text-sm text-ink-muted">(optional)</span><input type="email" className={input} value={value.email} onChange={e=>onChange({...value,email:e.target.value})} autoComplete="email"/><span className="mt-1 block text-sm text-ink-muted">Gmail or any other email address.</span></label>
    <label className="block font-medium">GitHub username<input className={input} value={value.github} onChange={e=>onChange({...value,github:e.target.value})} autoCapitalize="none" spellCheck={false}/></label>
    <label className="block font-medium">GitLab username<input className={input} value={value.gitlab} onChange={e=>onChange({...value,gitlab:e.target.value})} autoCapitalize="none" spellCheck={false}/></label>
  </div>;
}
const cleanMember=m=>({...m,name:m.name.trim(),email:m.email.trim(),github:m.github.trim().replace(/^@/,''),gitlab:m.gitlab.trim().replace(/^@/,'')});

export function WorkspaceSetup({commit,onDone}) {
  const [name,setName]=useState(''),[project,setProject]=useState(''),[member,setMember]=useState(emptyMember),[error,setError]=useState(''),[busy,setBusy]=useState(false);
  async function save(e) {
    e.preventDefault();const clean=cleanMember(member);
    const invalid=!name.trim()||name.trim().length>100?'Enter a workspace name of up to 100 characters.':!project.trim()||project.trim().length>100?'Enter a first project name of up to 100 characters.':memberError(clean);
    if(invalid){setError(invalid);return;}
    setBusy(true);const result=await commit(createWorkspace(name,clean,project));setBusy(false);
    if(result.ok)onDone();else setError(result.error);
  }
  return <div className="mx-auto max-w-2xl py-8 sm:py-14"><p className="text-sm text-ink-muted">One team. A board for every project.</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">Set up your workspace</h1><p className="mt-3 max-w-prose text-ink-muted">Give your work a home, add yourself and create your first project. You can add more members and boards at any time.</p>
    <form onSubmit={save} className="mt-8 rounded-xl border border-slate-300 bg-white p-5 sm:p-7">
      <label className="block font-medium">Workspace name<input required className={input} placeholder="e.g. Studio team" value={name} onChange={e=>setName(e.target.value)}/></label>
      <label className="mt-5 block font-medium">First project name<input required className={input} placeholder="e.g. Portfolio website" value={project} onChange={e=>setProject(e.target.value)}/></label>
      <fieldset className="mt-7 border-t border-slate-200 pt-5"><legend className="mb-4 text-lg font-semibold">Your member details</legend><MemberFields value={member} onChange={setMember}/></fieldset>
      <p className="mt-5 text-sm text-ink-muted">Profile details do not connect accounts or send invitations. This workspace is saved in this browser.</p>
      {error&&<p role="alert" className="mt-4 text-red-800">{error}</p>}
      <button disabled={busy} className={primaryButton+' mt-6'}>{busy?'Creating workspace…':error?'Retry creating workspace':'Create workspace'}</button>
    </form>
  </div>;
}

export function MemberEditor({member,workspace,commit,onClose,onSaved}) {
  const [draft,setDraft]=useState(member||emptyMember),[error,setError]=useState(''),[busy,setBusy]=useState(false),[deleting,setDeleting]=useState(false);
  const original=member||emptyMember;
  async function save(e){e.preventDefault();const clean=cleanMember(draft),invalid=memberError(clean);if(invalid){setError(invalid);return;}
    setBusy(true);const result=await commit(old=>({...old,members:member?old.members.map(m=>m.id===member.id?{...clean,id:m.id,example:false}:m):[...old.members,{...clean,id:newId()}]}));setBusy(false);
    if(result.ok){onSaved(member?'Member updated. Existing assignments have been kept.':'Member added.');onClose();}else setError(result.error);
  }
  async function remove(){setBusy(true);const result=await commit(old=>removeMember(old,member.id));setBusy(false);if(result.ok){onSaved('Member removed. Their tasks are now unassigned.');onClose();}else setError(result.error);}
  const assigned=member?workspace.boards.reduce((n,b)=>n+b.tasks.filter(t=>t.assigneeId===member.id).length,0):0;
  return <Dialog title={member?'Edit member':'Add member'} dirty={JSON.stringify(draft)!==JSON.stringify(original)} busy={busy} onClose={onClose}>
    <form onSubmit={save}><div className="p-5 sm:p-7"><MemberFields value={draft} onChange={setDraft}/><p className="mt-4 text-sm text-ink-muted">Contact/profile details are optional. Adding a member does not create a login or send an invitation.</p>{error&&<p role="alert" className="mt-4 text-red-800">{error}</p>}
      {deleting&&<div className="mt-5 rounded-lg border border-red-400 bg-red-50 p-4"><p role="alert">Remove {member.name}? {assigned} assigned {assigned===1?'task will':'tasks will'} become unassigned across your projects.</p><div className="mt-3 flex flex-wrap gap-3"><button type="button" disabled={busy} className={button} onClick={()=>setDeleting(false)}>Keep member</button><button type="button" disabled={busy} className={button+' text-red-800'} onClick={remove}>Confirm remove member</button></div></div>}
    </div><footer className="dialog-actions"><div>{member&&!deleting&&<button type="button" className={button+' text-red-800'} onClick={()=>setDeleting(true)}>Remove member</button>}</div><button disabled={busy} className={primaryButton}>{busy?'Saving…':error?'Retry save member':'Save member'}</button></footer></form>
  </Dialog>;
}

export function ProjectEditor({board,workspace,commit,onClose,onSaved}) {
  const [name,setName]=useState(board?.name||''),[description,setDescription]=useState(board?.description||''),[error,setError]=useState(''),[busy,setBusy]=useState(false);
  const dirty=name!==(board?.name||'')||description!==(board?.description||'');
  async function save(e){e.preventDefault();const invalid=boardNameError(name,workspace,board?.id)|| (description.length>2000?'Keep the project description within 2,000 characters.':'');if(invalid){setError(invalid);return;}
    const created=board?null:makeBoard(name,description);setBusy(true);
    const result=await commit(old=>({...old,boards:board?old.boards.map(b=>b.id===board.id?{...b,name:name.trim(),description:description.trim()}:b):[...old.boards,created],selectedBoardId:created?.id||old.selectedBoardId}));setBusy(false);
    if(result.ok){onSaved(board?'Project updated.':'Project created. Your new board is ready.');onClose();}else setError(result.error);
  }
  return <Dialog title={board?'Edit project':'New project'} onClose={onClose} dirty={dirty} busy={busy}><form onSubmit={save}><div className="p-5 sm:p-7"><label className="block font-medium">Project name <span className="text-sm text-ink-muted">(required)</span><input data-initial-focus required className={input} value={name} onChange={e=>setName(e.target.value)}/></label><label className="mt-5 block font-medium">Project description<textarea rows={3} className={input} value={description} onChange={e=>setDescription(e.target.value)}/></label><p className="mt-3 text-sm text-ink-muted">Each project has its own tasks, milestones and deliverable links. Your team is shared across projects.</p>{error&&<p role="alert" className="mt-4 text-red-800">{error}</p>}</div><footer className="dialog-actions"><button type="button" className={button} disabled={busy} onClick={e=>e.currentTarget.closest('dialog').dispatchEvent(new Event('cancel',{cancelable:true}))}>Cancel</button><button disabled={busy} className={primaryButton}>{busy?'Saving…':error?'Retry save project':board?'Save project':'Create project'}</button></footer></form></Dialog>;
}

export function Members({workspace,onEdit,onAdd}) {
  return <section aria-labelledby="members-title"><div className="flex flex-wrap items-end justify-between gap-4"><div><h1 id="members-title" className="text-3xl font-semibold">Team members</h1><p className="mt-2 text-ink-muted">One roster across all your project boards. Assign tasks to people, not placeholder slots.</p></div><button className={primaryButton} onClick={onAdd}>Add member</button></div>
    {workspace.members.length?<ul className="mt-7 divide-y divide-slate-200 rounded-xl border border-slate-300 bg-white">{workspace.members.map(member=><li key={member.id} className="flex flex-wrap items-start justify-between gap-4 p-5"><div className="min-w-0"><h2 className="break-words text-lg font-semibold">{member.name} {member.example&&<span className="text-sm font-normal text-ink-muted">(imported example)</span>}</h2><p className="mt-1 break-all text-sm text-ink-muted">{member.email||'No email added'}</p><div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">{member.github&&<a className="text-brand-primary underline" href={'https://github.com/'+encodeURIComponent(member.github)} target="_blank" rel="noopener noreferrer">GitHub: {member.github}<span className="sr-only"> (new tab)</span></a>}{member.gitlab&&<a className="text-brand-primary underline" href={'https://gitlab.com/'+encodeURIComponent(member.gitlab)} target="_blank" rel="noopener noreferrer">GitLab: {member.gitlab}<span className="sr-only"> (new tab)</span></a>}</div><p className="mt-2 text-sm text-ink-muted">{workspace.boards.reduce((n,b)=>n+b.tasks.filter(t=>t.assigneeId===member.id).length,0)} assigned tasks</p></div><button className={button} onClick={()=>onEdit(member)} aria-label={'Edit member: '+member.name}>Edit member</button></li>)}</ul>:<div className="mt-7 rounded-xl border border-dashed border-slate-400 p-7"><p>No members yet. Tasks can remain unassigned.</p><button className={button+' mt-4'} onClick={onAdd}>Add your first member</button></div>}
  </section>;
}
