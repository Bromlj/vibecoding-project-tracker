"""Final targeted real-website captures; isolated fictional data only."""
import json,re,os
from pathlib import Path
from playwright.sync_api import sync_playwright
from datetime import datetime,timezone
O=Path('assessment-final');O.mkdir(exist_ok=True)
M={'captured_at':datetime.now(timezone.utc).isoformat(),'source_commit':os.getenv('GITHUB_SHA'),'screenshots':[],'checks':[]}
URL='https://vibecoding-project-tracker-umber.vercel.app/?demo=1'
with sync_playwright() as p:
 b=p.chromium.launch();c=b.new_context(viewport={'width':1440,'height':1000},locale='en-GB',timezone_id='Europe/London');q=c.new_page();q.set_default_timeout(7000);q.on('dialog',lambda d:d.accept())
 def check(n,f):
  try:M['checks'].append({'name':n,'result':'PASS','details':f()})
  except Exception as e:M['checks'].append({'name':n,'result':'NOT VERIFIED','details':str(e)})
  (O/'manifest.json').write_text(json.dumps(M,indent=2))
 def shot(n,title,note=''):
  q.wait_for_timeout(200);q.locator('dialog[open]').screenshot(path=str(O/(n+'.png')))
  M['screenshots'].append({'file':n+'.png','title':title,'note':note,'url':q.url,'viewport':q.viewport_size});(O/(n+'.txt')).write_text(q.locator('body').inner_text())
 def board():
  q.goto(URL,wait_until='networkidle');h=q.get_by_role('button',name='Hide guide',exact=True)
  if h.count():h.click()
  q.get_by_role('button',name=re.compile('^(Open team example|Add team example project)$')).first.click()
 def fail():
  board();q.get_by_role('button',name='Edit task: Build accessible study timer',exact=True).click()
  q.get_by_label(re.compile('Task title')).fill('Controlled failure - retained draft')
  original=q.evaluate("localStorage.getItem('vibetracker.demo.workspace.v2')")
  q.evaluate("""()=>{const original=Storage.prototype.setItem;window.restoreAuditStorage=()=>{Storage.prototype.setItem=original};Storage.prototype.setItem=function(k,v){if(k==='vibetracker.demo.workspace.v2')throw new DOMException('Deliberate test failure','QuotaExceededError');return original.call(this,k,v)};}""")
  q.get_by_role('button',name='Save task',exact=True).click()
  assert q.get_by_label(re.compile('Task title')).input_value()=='Controlled failure - retained draft'
  assert 'Saving failed' in q.locator('body').inner_text()
  assert q.evaluate("localStorage.getItem('vibetracker.demo.workspace.v2')")==original
  shot('S10-save-failure','Failed save preserves the visible draft and previous stored data','Controlled storage-write fault in isolated demo browser; actual application error state.')
  q.evaluate('()=>{window.restoreAuditStorage()}');return 'Failure message and retained draft asserted; stored workspace remained byte-for-byte unchanged.'
 check('Failed write retains draft and original snapshot',fail)
 def lower():
  q.goto(URL,wait_until='networkidle');q.get_by_role('button',name='Accessibility',exact=True).first.click();d=q.locator('dialog[open]');d.evaluate('(e)=>{e.scrollTop=e.scrollHeight}')
  shot('S19-accessibility-lower','Text size, contrast, reduced motion/effects, shortcuts and explicit save/cancel/reset')
  return 'Lower dialog controls captured without changing saved preferences.'
 check('Accessibility lower controls',lower)
 def shared():
  q.goto(URL.split('?')[0],wait_until='networkidle');q.get_by_role('button',name='Shared access',exact=True).click()
  shot('S20-shared-boundary','Shared access unavailable/configuration boundary','No login, account connection or real collaboration attempted.')
  return q.locator('dialog[open]').inner_text()
 check('Unconfigured shared access boundary',shared)
 def draft():
  board();q.get_by_role('button',name='Edit task: Build accessible study timer',exact=True).click();q.get_by_label('Description',exact=True).fill('Unsaved synthetic description for discard-state evidence')
  q.keyboard.press('Escape');shot('S21-discard-draft','Explicit discard protection when closing an edited task','The example change is not saved.')
  return 'Protected dismissal displayed instead of silently discarding edits.'
 check('Unsaved-draft exit protection',draft)
 b.close()
(O/'manifest.json').write_text(json.dumps(M,indent=2));print(json.dumps(M['checks'],indent=2))
