import { useEffect,useState } from 'react';
import { useLocalStorage } from './storage';
import { WORKSPACE_KEY,DEMO_KEY,initialWorkspace,validWorkspace } from './workspace';
import WorkspaceApp from './WorkspaceApp';
import CloudAccess from './CloudAccess';
import CloudWorkspace from './CloudWorkspace';
import { cloudClient } from './cloud';
import { button } from './ui';
import PrototypeSignIn from './PrototypeSignIn.jsx';

export default function App() {
  const demo=new URLSearchParams(window.location.search).get('demo')==='1';
  const [workspace,commit,error]=useLocalStorage(demo?DEMO_KEY:WORKSPACE_KEY,()=>initialWorkspace(localStorage,demo),validWorkspace,true);
  const [session,setSession]=useState(null),[cloudId,setCloudId]=useState(null),[access,setAccess]=useState(false),[authError,setAuthError]=useState('');
  const [prototypeLogin,setPrototypeLogin]=useState(()=>new URLSearchParams(window.location.search).get('login')==='1');
  const [previewAccount,setPreviewAccount]=useState(null),[previewNotice,setPreviewNotice]=useState('');
  useEffect(()=>{if(!cloudClient)return;let active=true;cloudClient.auth.getSession().then(({data,error})=>{if(active){setSession(data.session);if(error)setAuthError('Your sign-in session could not be restored. You can continue locally or sign in again.');}});const {data:{subscription}}=cloudClient.auth.onAuthStateChange((_event,next)=>{setSession(next);if(!next)setCloudId(null);});return()=>{active=false;subscription.unsubscribe();};},[]);
  async function signOut(){const {error}=await cloudClient.auth.signOut();if(error)setAuthError('Sign-out could not be confirmed. Check your connection and retry.');else{setCloudId(null);setSession(null);}}
  function open(id){setCloudId(id);setAccess(false);}
  const account=<>{session&&<><span className="max-w-xs break-all text-sm text-ink-muted">{session.user.email}</span><button className={button} onClick={signOut}>Sign out</button></>}</>;
  const prototypeControls=<>{previewAccount?<><span className="max-w-xs break-words text-sm text-ink-muted">Preview account: {previewAccount.name} (simulation)</span><button className={button} onClick={()=>{setPreviewAccount(null);setPreviewNotice('Prototype signed out. Workspace data is unchanged.');}}>Sign out of preview</button></>:<button className={button} onClick={()=>setPrototypeLogin(true)}>Prototype sign in</button>}</>;
  return <>{authError&&<p role="alert" className="border-b border-red-400 bg-red-50 p-4 text-red-900">{authError}</p>}
    <div role="status" aria-live="polite" className={previewNotice?'min-[1001px]:ml-56 border-b border-slate-300 bg-white p-3 text-sm text-ink-primary':'sr-only'}>{previewNotice}</div>
    {!demo&&cloudId&&session?<CloudWorkspace key={cloudId} client={cloudClient} id={cloudId} session={session} onLocal={()=>setCloudId(null)} onAccess={()=>setAccess(true)} accountControls={account}/>:<WorkspaceApp store={{workspace,commit,error,mode:'local'}} demo={demo} cloudControls={<>{prototypeControls}{!demo&&<><button className={button} onClick={()=>setAccess(true)}>Shared access</button>{account}</>}</>}/>}
    {access&&<CloudAccess client={cloudClient} session={session} localWorkspace={workspace} onOpen={open} onClose={()=>setAccess(false)}/>}
    {prototypeLogin&&<PrototypeSignIn onClose={()=>setPrototypeLogin(false)} onContinue={account=>{setPreviewAccount(account);setPrototypeLogin(false);setPreviewNotice('Prototype signed in as '+account.name+'. This is a simulation, not authenticated access.');}}/>}
  </>;
}
