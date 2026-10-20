import test from 'node:test';
import assert from 'node:assert/strict';
import { withContextTimestamp } from './context.js';
test('context timestamp changes only when saved context or tool changes',()=>{
 const original={context:'old',contextTool:null,contextUpdatedAt:'2026-10-19T10:00:00.000Z'};
 const now=new Date('2026-10-20T10:00:00Z');
 assert.equal(withContextTimestamp({...original,title:'new'},original,now).contextUpdatedAt,original.contextUpdatedAt);
 assert.equal(withContextTimestamp({...original,context:'new'},original,now).contextUpdatedAt,now.toISOString());
 assert.equal(withContextTimestamp({...original,contextTool:'Other'},original,now).contextUpdatedAt,now.toISOString());
});

import { serializeContext } from './context.js';
test('copied briefing includes complete context without altering whitespace',()=>{
 const context='## Background\n  exact indentation\n\n<script>plain text</script>';
 const output=serializeContext({title:'Example',description:'Description',status:'todo',assignee:'A',dueDate:null,contextTool:null,context});
 assert.ok(output.includes(context));assert.ok(output.includes('Example'));assert.ok(output.includes('Description'));
 assert.ok(output.includes('AI tool: Not specified'));assert.ok(output.includes('Due date: Not set'));
});
