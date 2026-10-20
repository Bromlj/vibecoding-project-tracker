import { useEffect,useRef,useState } from 'react';
import { validWorkspace } from './workspace';
import { saveCloudSnapshot } from './cloud';
import WorkspaceApp from './WorkspaceApp';
import { Sharing } from './CloudAccess';
import { button } from './ui';

export default function CloudWorkspace({client,id,session,onLocal,onAccess,accountControls}) {
  const [workspace,setWorkspace]=useState(null),[error,setError]=useState(''),[loading,setLoading]=useState(true),[isOwner,setIsOwner]=useState(false),[sharing,setSharing]=useState(false),[busy,setBusy]=useState(false);
  const snapshot=useRef(null),revision=useRef(null),committing=useRef(false);
  async function refresh(){setLoading(true);setError('');try{const {data,error:failure}=await client.from('tracker_workspaces').select('state,revision,owner_id').eq('id',id).single();if(failure||!validWorkspace(data.state))throw new Error();snapshot.current=data.state;revision.current=data.revision;setWorkspace(data.state);setIsOwner(data.owner_id===session.user.id);}catch{setError('This shared workspace could not be opened. Check your connection and access, then refresh. Your local workspace is still available.');}finally{setLoading(false);}}
  useEffect(()=>{refresh();},[id]);
  async function commit(update){if(committing.current)return{ok:false,error:'A save is already in progress. Wait and retry.'};committing.current=true;setBusy(true);
    try{const next=typeof update==='function'?update(snapshot.current):update;
      // Board selection is a personal navigation choice, not a team edit.
      const onlySelection=JSON.stringify({...next,selectedBoardId:null})===JSON.stringify({...snapshot.current,selectedBoardId:null});
      const result=onlySelection?{ok:true,revision:revision.current}:await saveCloudSnapshot(client,id,revision.current,next);
      if(result.ok){revision.current=result.revision;snapshot.current=next;setWorkspace(next);setError('');}else setError(result.error);return result;
    }catch{return{ok:false,error:'This change could not be prepared. Your saved workspace is unchanged.'};}finally{committing.current=false;setBusy(false);}
  }
  const controls=<><button className={button} disabled={busy||loading} onClick={refresh}>Refresh shared data</button><button className={button} onClick={onAccess}>Shared access</button>{isOwner&&<button className={button} onClick={()=>setSharing(true)}>Manage access</button>}<button className={button} onClick={onLocal}>Use local workspace</button>{accountControls}</>;
  if(!workspace)return <div className="mx-auto max-w-2xl p-8"><h1 className="text-2xl font-semibold">Shared workspace</h1>{loading?<p role="status" className="mt-4">Loading your projects…</p>:<p role="alert" className="mt-4 text-red-800">{error}</p>}<div className="mt-5 flex flex-wrap gap-3">{controls}</div></div>;
  return <><WorkspaceApp store={{workspace,commit,error,mode:'cloud'}} cloudControls={controls}/>{sharing&&<Sharing client={client} workspaceId={id} onClose={()=>setSharing(false)}/>}</>;
}
