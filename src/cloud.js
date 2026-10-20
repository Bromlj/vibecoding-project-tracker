import { createClient } from '@supabase/supabase-js';
import { validWorkspace } from './workspace.js';

const env=import.meta.env||{};
const url=env.VITE_SUPABASE_URL, key=env.VITE_SUPABASE_PUBLISHABLE_KEY;
export function isPublicSupabaseKey(value) {
  if(typeof value!=='string')return false;
  if(/^sb_publishable_[A-Za-z0-9_-]+$/.test(value))return true;
  try{return JSON.parse(atob(value.split('.')[1].replace(/-/g,'+').replace(/_/g,'/'))).role==='anon';}catch{return false;}
}
// Only public browser keys belong here. Database permissions are enforced by RLS.
export const cloudClient=url && /^https:\/\//.test(url) && isPublicSupabaseKey(key) ? createClient(url,key) : null;
export const authProviders=(env.VITE_AUTH_PROVIDERS??'github').split(',').map(p=>p.trim()).filter(p=>['github','google','gitlab'].includes(p));

export async function saveCloudSnapshot(client,id,revision,value) {
  if (!validWorkspace(value)) return {ok:false,error:'This workspace contains invalid data. Your draft has not been saved.'};
  try {
    const state={...value,selectedBoardId:value.boards[0].id};
    const {data,error}=await client.from('tracker_workspaces').update({state,revision:revision+1}).eq('id',id).eq('revision',revision).select('revision').maybeSingle();
    if(error)throw error;
    if(!data)return {ok:false,conflict:true,error:'Someone else updated this workspace, or your access changed. Your draft is still here. Copy it, then refresh the shared workspace before retrying.'};
    return {ok:true,revision:data.revision};
  } catch {
    return {ok:false,error:'The shared save could not be confirmed. Your draft is still here. Check your connection and retry; if a retry reports a conflict, copy your draft before refreshing.'};
  }
}

export function signedInMember(user) {
  const metadata=user.user_metadata||{};
  return {name:metadata.full_name||metadata.name||metadata.user_name||user.email?.split('@')[0]||'Workspace owner',email:user.email||'',github:user.app_metadata?.provider==='github'?(metadata.user_name||''):'',gitlab:user.app_metadata?.provider==='gitlab'?(metadata.user_name||metadata.nickname||''):''};
}
