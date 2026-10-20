import test from 'node:test';
import assert from 'node:assert/strict';
import { saveCloudSnapshot,signedInMember,isPublicSupabaseKey } from './cloud.js';
import { createWorkspace } from './workspace.js';
const state=()=>createWorkspace('Team',{name:'Ava',email:'ava@example.com',github:'ava',gitlab:''},'Website');
function client(result){const observed={};const query={update(value){observed.value=value;return query;},eq(key,value){observed[key]=value;return query;},select(){return query;},async maybeSingle(){if(result instanceof Error)throw result;return result;}};return {from(table){observed.table=table;return query;},observed};}
test('shared writes use revision comparison and report conflicts without claiming success',async()=>{
  const service=client({data:{revision:4},error:null});
  assert.deepEqual(await saveCloudSnapshot(service,'workspace',3,state()),{ok:true,revision:4});
  assert.equal(service.observed.id,'workspace');assert.equal(service.observed.revision,3);assert.equal(service.observed.value.revision,4);
  const conflict=await saveCloudSnapshot(client({data:null,error:null}),'workspace',3,state());assert.equal(conflict.ok,false);assert.equal(conflict.conflict,true);
  const uncertain=await saveCloudSnapshot(client(new Error('Network lost')),'workspace',3,state());assert.equal(uncertain.ok,false);assert.ok(uncertain.error.includes('could not be confirmed'));
});
test('provider profile imports contain display metadata, never access tokens',()=>{
  assert.deepEqual(signedInMember({email:'ava@example.com',app_metadata:{provider:'github'},user_metadata:{user_name:'ava',full_name:'Ava',access_token:'secret'}}),{name:'Ava',email:'ava@example.com',github:'ava',gitlab:''});
});
test('browser configuration rejects secret and service-role keys',()=>{
  assert.equal(isPublicSupabaseKey('sb_publishable_example'),true);
  assert.equal(isPublicSupabaseKey('sb_secret_example'),false);
  const jwt=role=>'header.'+Buffer.from(JSON.stringify({role})).toString('base64url')+'.signature';
  assert.equal(isPublicSupabaseKey(jwt('anon')),true);assert.equal(isPublicSupabaseKey(jwt('service_role')),false);
  assert.equal(isPublicSupabaseKey('invalid'),false);
});
