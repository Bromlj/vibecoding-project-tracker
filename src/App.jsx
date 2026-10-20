import { useEffect,useState } from 'react';
import { useLocalStorage } from './storage';
import { WORKSPACE_KEY,DEMO_KEY,initialWorkspace,validWorkspace } from './workspace';
import WorkspaceApp from './WorkspaceApp';
import CloudAccess from './CloudAccess';
import CloudWorkspace from './CloudWorkspace';
import { cloudClient } from './cloud';
import { button } from './ui';

export default function App() {
  const demo=new URLSearchParams(window.location.search).get('demo')==='1';
  const [workspace,commit,error]=useLocalStorage(demo?DEMO_KEY:WORKSPACE_KEY,()=>initialWorkspace(localStorage,demo),validWorkspace,true);
  const [session,setSession]=useState(null),[cloudId,setCloudId]=useState(null),[access,setAccess]=useState(false),[authError,setAuthError]=useState('');
  useEffect(()=>{if(!cloudClient)return;let active=true;cloudClient.auth.getSession().then(({data,error})=>{if(active){setSession(data.session);if(error)setAuthError('Your sign-in session could not be restored. You can continue locally or sign in again.');}});const {data:{subscription}}=cloudClient.auth.onAuthStateChange((_event,next)=>{setSession(next);if(!next)setCloudId(null);});return()=>{active=false;subscription.unsubscribe();};},[]);
  async function signOut(){const {error}=await cloudClient.auth.signOut();if(error)setAuthError('Sign-out could not be confirmed. Check your connection and retry.');else{setCloudId(null);setSession(null);}}
  function open(id){setCloudId(id);setAccess(false);}
  const account=<>{session&&<><span className="max-w-xs break-all text-sm text-ink-muted">{session.user.email}</span><button className={button} onClick={signOut}>Sign out</button></>}</>;
  return <>{authError&&<p role="alert" className="border-b border-red-400 bg-red-50 p-4 text-red-900">{authError}</p>}
    {!demo&&cloudId&&session?<CloudWorkspace key={cloudId} client={cloudClient} id={cloudId} session={session} onLocal={()=>setCloudId(null)} onAccess={()=>setAccess(true)} accountControls={account}/>:<WorkspaceApp store={{workspace,commit,error,mode:'local'}} demo={demo} cloudControls={!demo?<><button className={button} onClick={()=>setAccess(true)}>Shared access</button>{account}</>:null}/>}
    {access&&<CloudAccess client={cloudClient} session={session} localWorkspace={workspace} onOpen={open} onClose={()=>setAccess(false)}/>}
  </>;
}
