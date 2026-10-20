import test from 'node:test';
import assert from 'node:assert/strict';
import { safeUrl, validAnchors, initialAnchors } from './anchors.js';
test('deliverables accept HTTP(S), reject executable and credential-bearing URLs',()=>{
 for(const url of ['https://example.com/a?b=1','http://localhost:5173/']) assert.equal(safeUrl(url),true);
 for(const url of ['javascript:alert(1)','data:text/html,hi','ftp://example.com','example.com','https://user:pass@example.com']) assert.equal(safeUrl(url),false);
});
test('all four anchor slots must be present without duplicates',()=>{
 assert.equal(validAnchors(initialAnchors()),true);
 const wrong=initialAnchors();wrong[1]=wrong[0];assert.equal(validAnchors(wrong),false);
});
