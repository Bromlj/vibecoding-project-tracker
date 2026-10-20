import test from 'node:test';
import assert from 'node:assert/strict';
import {DEFAULT_ACCESS,validAccess,appearanceColours} from './appearance.js';
import {CARD_PALETTES} from './workspace.js';

test('old browser preferences remain valid; personal colour selection is constrained',()=>{
  const {theme,colourVision,shortcuts,...legacy}=DEFAULT_ACCESS;
  assert.equal(validAccess(legacy),true);
  for(const colourVision of ['workspace','blue-amber','monochrome'])
    assert.equal(validAccess({...DEFAULT_ACCESS,colourVision}),true);
  assert.equal(validAccess({...DEFAULT_ACCESS,colourVision:'unknown'}),false);
});
test('personal colour access overrides both badges and all urgency fills without mutating workspace palettes',()=>{
  const original=JSON.stringify(CARD_PALETTES);
  const alternate=appearanceColours('forest','traffic','blue-amber');
  assert.equal(alternate['--card-urgent-bg'],CARD_PALETTES.blue.urgent[0]);
  assert.equal(alternate['--card-soon-bg'],CARD_PALETTES.blue.soon[0]);
  assert.equal(alternate['--card-complete-bg'],CARD_PALETTES.blue.complete[0]);
  assert.equal(alternate['--feature-bg'],'#BFDBFE');
  assert.equal(alternate['--bug-bg'],'#FDBA74');
  const grey=appearanceColours('forest','traffic','monochrome');
  assert.equal(grey['--card-complete-bg'],CARD_PALETTES.mono.complete[0]);
  assert.equal(grey['--feature-bg'],'#CBD5E1');
  assert.equal(grey['--bug-bg'],'#F1F5F9');
  assert.equal(JSON.stringify(CARD_PALETTES),original);
  assert.equal(appearanceColours('forest','traffic','workspace')['--card-complete-bg'],'#4ADE80');
});
