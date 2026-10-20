import test from 'node:test';
import assert from 'node:assert/strict';
import {shortcutAction, speechChunks} from './navigationAccess.js';

const context={enabled:true,ready:true,boardVisible:true,modalOpen:false};
const key=(value,extra={})=>({key:value,target:{closest:()=>null},...extra});

test('navigation shortcuts require opt-in and never intercept native editing or assistive modifiers',()=>{
  assert.equal(shortcutAction(key('n'),context),'add');
  for(const state of [{enabled:false},{ready:false},{boardVisible:false},{modalOpen:true}])assert.equal(shortcutAction(key('n'),{...context,...state}),null);
  for(const event of [{repeat:true},{isComposing:true},{ctrlKey:true},{altKey:true},{metaKey:true},{shiftKey:true},{defaultPrevented:true},{target:{closest:()=>({})}}])assert.equal(shortcutAction(key('n',event),context),null);
  assert.equal(shortcutAction(key('Tab'),context),null);
  assert.equal(shortcutAction(key('Escape'),context),null);
  assert.equal(shortcutAction(key('Delete'),context),null);
});
test('non-destructive shortcuts retain pre-setup help and ordered board navigation',()=>{
  assert.equal(shortcutAction(key('a'),{...context,ready:false}),'accessibility');
  assert.equal(shortcutAction(key('h'),{...context,ready:false}),'help');
  assert.equal(shortcutAction(key('P'),{...context,boardVisible:false}),'projects');
  for(let n=1;n<=4;n++)assert.equal(shortcutAction(key(String(n)),context),'stage-'+(n-1));
  assert.equal(shortcutAction(key('k'),context),'previous');
  assert.equal(shortcutAction(key('j'),context),'next');
});
test('speech preserves full wording across bounded utterances including long Unicode content',()=>{
  const text='Prompt: keep every word. '+('界🙂'.repeat(300))+' Outcome: ready for review.';
  const chunks=speechChunks(text);
  assert.ok(chunks.length>1);
  assert.ok(chunks.every(c=>Array.from(c).length<=240));
  assert.equal(chunks.join('').replace(/\s/g,''),text.replace(/\s/g,''));
  assert.deepEqual(speechChunks(' \n '),[]);
  assert.deepEqual(speechChunks('Read this sentence.'),['Read this sentence.']);
});
