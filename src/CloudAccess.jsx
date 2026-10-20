import { useEffect, useState } from 'react';
import Dialog from './Dialog.jsx';
import { button,primaryButton,input } from './ui';
import { authProviders, signedInMember } from './cloud';
import { createWorkspace, validWorkspace } from './workspace';

export default function CloudAccess({client,session,localWorkspace,onOpen,onClose}) {
  const [workspaces,setWorkspaces]=useState([]),[invitations,setInvitations]=useState([]),[busy,setBusy]=useState(false),[error,setError]=useState('');
  const [name,setName]=useState(''),[project,setProject]=useState('');
  useEffect(()=>{if(!client||!session)return;let active=true;setBusy(true);
    Promise.all([client.from('tracker_workspaces').select('id,state,revision'),client.from('tracker_invites').select('workspace_id,workspace_name,email')]).then(([list,invites])=>{if(!active)return;if(list.error||invites.error)setError('Shared workspaces could not be loaded. Check the database setup and try reopening Shared access.');else{setWorkspaces(list.data);setInvitations(invites.data);}setBusy(false);});return()=>{active=false;};
  },[client,session?.user.id]);
  async function signIn(provider){setBusy(true);setError('');const {error:failure}=await client.auth.signInWithOAuth({provider,options:{redirectTo:window.location.origin+window.location.pathname}});if(failure){setBusy(false);setError('Sign-in could not start. The workspace owner needs to check this provider configuration.');}}
  async function create(copy=false){
    const state=copy?localWorkspace:createWorkspace(name,signedInMember(session.user),project);
    if(!state||!validWorkspace(state)||!state.name){setError('Enter a workspace and first project name of up to 100 characters.');return;}
    setBusy(true);const {data,error:failure}=await client.rpc('create_tracker_workspace',{initial_state:state});setBusy(false);
    if(failure)setError('The shared workspace could not be created. Check the connection and database setup, then retry.');else onOpen(data);
  }
  async function join(id){setBusy(true);const {error:failure}=await client.rpc('join_tracker_workspace',{workspace:id});setBusy(false);if(failure)setError('This account cannot join that workspace. Check that you signed in with the email allowed by its owner.');else onOpen(id);}
  return <Dialog title="Shared access" onClose={onClose} busy={busy}><div className="p-5 sm:p-7">
    {!client?<><h3 className="text-lg font-semibold">Shared access is not configured yet</h3><p className="mt-3 max-w-prose text-ink-muted">This installation currently saves work in your browser. The workspace owner can enable the free database and sign-in service to let teammates access the same projects. Your local workspace works without registration.</p></>:!session?<><p className="max-w-prose text-ink-muted">Sign in to create or open a shared team workspace. Your browser-only workspace stays separate.</p><div className="mt-5 flex flex-wrap gap-3">{authProviders.map(provider=><button key={provider} className={primaryButton} disabled={busy} onClick={()=>signIn(provider)}>Continue with {provider==='github'?'GitHub':provider==='gitlab'?'GitLab':'Google'}</button>)}</div><p className="mt-4 text-sm text-ink-muted">Only providers configured by the workspace owner are shown. No repository permissions are requested by the tracker.</p></>:<>
      <p className="break-all text-sm text-ink-muted">Signed in as {session.user.email||'your provider account'}</p>
      <h3 className="mt-5 text-lg font-semibold">Your shared workspaces</h3>{busy&&<p role="status" className="mt-2 text-ink-muted">Loading…</p>}
      {!busy&&!workspaces.length&&<p className="mt-2 text-ink-muted">You have no shared workspaces yet.</p>}
      <ul className="mt-3 space-y-2">{workspaces.map(w=><li key={w.id}><button disabled={busy} className={button+' w-full justify-start'} onClick={()=>onOpen(w.id)}>{w.state.name}</button></li>)}</ul>
      {invitations.length>0&&<><h3 className="mt-6 text-lg font-semibold">Workspaces you can join</h3><ul className="mt-3 space-y-2">{invitations.map(invite=><li key={invite.workspace_id}><button className={button} disabled={busy} onClick={()=>join(invite.workspace_id)}>Join {invite.workspace_name}</button></li>)}</ul></>}
      <section className="mt-7 border-t border-slate-200 pt-5"><h3 className="text-lg font-semibold">Create a shared workspace</h3>{localWorkspace?.name&&!localWorkspace.needsSetup&&<><p className="mt-2 text-sm text-ink-muted">Upload a copy of “{localWorkspace.name}”, including member contact details and project context. The local original stays in this browser. Only you and accounts you explicitly allow can access the shared copy.</p><button className={button+' mt-3'} disabled={busy} onClick={()=>create(true)}>Create shared copy of local workspace</button><p className="my-4 text-sm text-ink-muted">Or start a separate shared workspace:</p></>}
        <form onSubmit={e=>{e.preventDefault();create();}}><label className="block font-medium">Shared workspace name<input required className={input} value={name} onChange={e=>setName(e.target.value)}/></label><label className="mt-4 block font-medium">First shared project<input required className={input} value={project} onChange={e=>setProject(e.target.value)}/></label><button disabled={busy} className={primaryButton+' mt-5'}>{busy?'Working…':'Create shared workspace'}</button></form>
      </section>
    </>}
    {client&&!session&&!authProviders.length&&<p role="status" className="mt-4 max-w-prose text-ink-muted">Supabase settings have been added, but sign-in is not enabled yet. The workspace owner needs to finish the database and sign-in setup. You can continue using your local workspace.</p>}
    {error&&<p role="alert" className="mt-4 text-red-800">{error}</p>}
  </div></Dialog>;
}

export function Sharing({client,workspaceId,onClose}) {
  const [email,setEmail]=useState(''),[access,setAccess]=useState([]),[invites,setInvites]=useState([]),[error,setError]=useState(''),[message,setMessage]=useState(''),[busy,setBusy]=useState(false);
  async function load(){const [members,allowed]=await Promise.all([client.rpc('tracker_workspace_access',{workspace:workspaceId}),client.from('tracker_invites').select('email').eq('workspace_id',workspaceId)]);if(members.error||allowed.error)setError('Access details could not be loaded.');else{setAccess(members.data);setInvites(allowed.data);}}
  useEffect(()=>{load();},[workspaceId]);
  async function allow(e){e.preventDefault();setBusy(true);setError('');const {error:failure}=await client.rpc('allow_tracker_email',{workspace:workspaceId,member_email:email.trim()});setBusy(false);if(failure)setError('That email could not be allowed. Check the address and your owner permissions.');else{setEmail('');setMessage('Email allowed. Ask this person to sign in with that address and choose Join. No email has been sent.');await load();}}
  async function revoke(id,address){if(!window.confirm('Remove shared access for '+address+'? Their roster entry and task assignments will remain.'))return;setBusy(true);const {error:failure}=await client.rpc('revoke_tracker_access',{workspace:workspaceId,member_user:id});setBusy(false);if(failure)setError('Access could not be removed.');else{setMessage('Sign-in access removed.');await load();}}
  async function cancelInvite(address){setBusy(true);const {error:failure}=await client.rpc('remove_tracker_email',{workspace:workspaceId,member_email:address});setBusy(false);if(failure)setError('Allowed email could not be removed.');else{setMessage('Allowed email removed.');await load();}}
  return <Dialog title="Manage shared access" onClose={onClose} busy={busy}><div className="p-5 sm:p-7"><p className="max-w-prose text-ink-muted">Roster entries describe people and task ownership. Sign-in access is separate: allow the email they use with their login provider. Only you, the owner, manage access.</p><form className="mt-5" onSubmit={allow}><label className="block font-medium">Allow email address<input type="email" required className={input} value={email} onChange={e=>setEmail(e.target.value)}/></label><button className={primaryButton+' mt-3'} disabled={busy}>Allow this email to join</button></form><p className="mt-3 text-sm text-ink-muted">No invitation email is sent. Tell the person to open this app, sign in and choose the workspace under Shared access.</p>
    <h3 className="mt-6 font-semibold">Signed-in members</h3><ul className="mt-3 space-y-3">{access.map(m=><li key={m.user_id} className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3"><span className="min-w-0 break-all text-sm">{m.email} · {m.access_role}</span>{m.access_role!=='owner'&&<button className={button} disabled={busy} onClick={()=>revoke(m.user_id,m.email)}>Remove access</button>}</li>)}</ul>
    <h3 className="mt-6 font-semibold">Allowed emails waiting to join</h3>{!invites.length&&<p className="mt-2 text-sm text-ink-muted">None pending.</p>}<ul className="mt-3 space-y-3">{invites.map(m=><li key={m.email} className="flex flex-wrap items-center justify-between gap-3"><span className="break-all text-sm">{m.email}</span><button className={button} disabled={busy} onClick={()=>cancelInvite(m.email)}>Remove allowed email</button></li>)}</ul>{error&&<p role="alert" className="mt-4 text-red-800">{error}</p>}<p role="status" className="mt-4 text-sm text-brand-primary">{message}</p></div></Dialog>;
}
