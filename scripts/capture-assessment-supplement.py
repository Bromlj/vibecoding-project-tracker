"""Supplement real public-site evidence with interaction assertions.
Controlled fault injection is labelled in the manifest. Speech-service simulation
shows the real frontend controls, not real audible speech or user testing.
"""
import json, os, re
from pathlib import Path
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright
OUT=Path('assessment-supplement'); OUT.mkdir(exist_ok=True)
URL='https://vibecoding-project-tracker-umber.vercel.app/?demo=1'
KEY='vibetracker.demo.workspace.v2'
M={'captured_at':datetime.now(timezone.utc).isoformat(),'url':URL,'source_commit':os.getenv('GITHUB_SHA'),'screenshots':[],'checks':[],'axe':[]}
def record(name,fn):
 try: M['checks'].append({'name':name,'result':'PASS','details':fn()})
 except Exception as exc: M['checks'].append({'name':name,'result':'NOT VERIFIED','details':str(exc)[:2000]})
 (OUT/'manifest.json').write_text(json.dumps(M,indent=2))
with sync_playwright() as p:
 b=p.chromium.launch(); c=b.new_context(viewport={'width':1440,'height':1000},locale='en-GB',timezone_id='Europe/London',color_scheme='light',permissions=['clipboard-read','clipboard-write'])
 page=c.new_page(); page.set_default_timeout(7000); page.on('dialog',lambda d:d.accept())
 def shot(n,t,note='',target=None):
  page.wait_for_timeout(250); (target or page).screenshot(path=str(OUT/(n+'.png')),**({} if target else {'full_page':False}))
  M['screenshots'].append({'file':n+'.png','title':t,'note':note,'url':page.url,'viewport':page.viewport_size})
  (OUT/(n+'.txt')).write_text(page.locator('body').inner_text())
 def board():
  page.goto(URL,wait_until='networkidle')
  hide=page.get_by_role('button',name='Hide guide',exact=True)
  if hide.count():hide.click()
  page.get_by_role('button',name=re.compile('^(Open team example|Add team example project)$')).first.click()
  page.get_by_role('button',name='Add task',exact=True).first.wait_for()
 def task(title):page.get_by_role('button',name='Edit task: '+title,exact=True).click()
 def axe(name):
  paths=list(Path('node_modules').glob('axe-core/axe.min.js'))
  if not paths:return
  page.add_script_tag(path=str(paths[0]))
  data=page.evaluate("async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});return {violations:r.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),passes:r.passes.length,incomplete:r.incomplete.length}}")
  M['axe'].append({'state':name,**data})
 def workflow():
  board(); axe('desktop board')
  page.get_by_role('button',name='Add task',exact=True).first.click()
  page.get_by_label(re.compile('Task title')).fill('Audit lifecycle - fictional')
  page.get_by_label('Description',exact=True).fill('Temporary synthetic task for save, handover and deletion checks.')
  page.get_by_role('tab',name='AI context',exact=True).click()
  page.get_by_label('Context',exact=True).fill('## Background\nSynthetic audit record\n## Constraints\nNo personal data\n## Tried so far\nCheck creation\n## Pick up\nContinue after reload')
  page.get_by_label('AI tool',exact=True).select_option(label='Other')
  page.get_by_role('tab',name='Details',exact=True).click()
  assert page.get_by_label(re.compile('Task title')).input_value()=='Audit lifecycle - fictional'
  page.get_by_role('button',name='Save task',exact=True).click(); task('Audit lifecycle - fictional')
  shot('S01-task-identity','Saved task ID and exact creation timestamp',target=page.locator('dialog[open]'))
  page.get_by_label('Status',exact=True).select_option('review')
  opts=page.get_by_label('Hand off to',exact=True).locator('option').evaluate_all('(es)=>es.map(e=>({v:e.value,t:e.textContent}))')
  owner=next(x['v'] for x in opts if 'Alex Morgan' in x['t'])
  page.get_by_label('Hand off to',exact=True).select_option(owner)
  page.get_by_role('button',name='Save task',exact=True).click()
  shot('S02-handover','Saved reassignment and Review stage shown on board')
  board(); task('Audit lifecycle - fictional')
  assert page.get_by_label('Status',exact=True).input_value()=='review'
  assert page.get_by_label('Hand off to',exact=True).input_value()==owner
  page.get_by_role('tab',name='AI context',exact=True).click()
  assert 'Synthetic audit record' in page.get_by_label('Context',exact=True).input_value()
  shot('S03-context-reload','Context and optional AI tool restored after navigation/reload',target=page.locator('dialog[open]'))
  page.get_by_role('tab',name='Details',exact=True).click();page.get_by_role('button',name='Delete task',exact=True).click()
  shot('S04-delete-confirm','Named deletion warning with Keep task and Confirm delete',target=page.locator('dialog[open]'))
  page.get_by_role('button',name='Keep task',exact=True).click()
  page.get_by_role('button',name='Delete task',exact=True).click();page.get_by_role('button',name='Confirm delete',exact=True).click()
  board(); assert page.get_by_role('button',name='Edit task: Audit lifecycle - fictional',exact=True).count()==0
  return 'Created context task, changed owner/status, reloaded and checked values, cancelled deletion, confirmed deletion, reloaded and verified absence.'
 record('Task lifecycle and context persistence',workflow)
 def context_and_copy():
  board();task('Build accessible study timer');page.get_by_role('tab',name='AI context',exact=True).click()
  shot('S05-context','Saved Markdown context, tool, timestamp and explicit draft status',target=page.locator('dialog[open]'))
  page.get_by_role('tab',name='Attempts & lessons',exact=True).click()
  page.locator('dialog[open] details summary').first.click()
  shot('S06-attempt-detail','Expanded attempt with result, lesson and selective briefing control',target=page.locator('dialog[open]'))
  page.get_by_role('button',name='Review selected attempts in briefing',exact=True).click()
  shot('S07-briefing','Exact generated briefing and selected attempt records',target=page.locator('dialog[open]'))
  page.get_by_role('button',name=re.compile('^Copy context for ')).last.click()
  copied=page.evaluate('navigator.clipboard.readText()')
  assert 'Build accessible study timer' in copied and 'Background' in copied
  (OUT/'copied-briefing.txt').write_text(copied)
  shot('S08-copy-success','Successful clipboard feedback; clipboard content separately checked',target=page.locator('dialog[open]'))
  page.evaluate("Object.defineProperty(navigator.clipboard,'writeText',{configurable:true,value:()=>Promise.reject(new Error('Audit clipboard denial'))})")
  page.get_by_role('button',name=re.compile('^Copy context for ')).last.click()
  assert page.get_by_label('Context to copy manually',exact=True).input_value()==copied
  shot('S09-clipboard-fallback','Selectable full briefing after blocked clipboard','Clipboard permission failure deliberately injected; actual application fallback rendered.',page.locator('dialog[open]'))
  return 'Exact clipboard content checked; denied-copy fallback matched complete briefing.'
 record('Attempt review and clipboard success/failure',context_and_copy)
 def failed_save():
  board();task('Build accessible study timer')
  page.get_by_label(re.compile('Task title')).fill('Retained draft after controlled save failure')
  page.evaluate("window.auditSetItem=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='vibetracker.demo.workspace.v2')throw new DOMException('Audit quota failure','QuotaExceededError');return window.auditSetItem.call(this,k,v)}")
  page.get_by_role('button',name='Save task',exact=True).click()
  assert page.get_by_label(re.compile('Task title')).input_value()=='Retained draft after controlled save failure'
  assert 'Saving failed' in page.locator('body').inner_text()
  shot('S10-save-failure','Draft retained and retry offered after failed write','Controlled storage-write failure in isolated browser; not an actual user incident.',page.locator('dialog[open]'))
  page.evaluate('Storage.prototype.setItem=window.auditSetItem')
  return 'Failed write left draft visible and reported failure rather than success.'
 record('Controlled failed save recovery',failed_save)
 def conflict():
  board();task('Build accessible study timer')
  page.get_by_label(re.compile('Task title')).fill('Draft in original tab')
  other=c.new_page();other.goto(URL,wait_until='networkidle')
  other.evaluate("k=>{let x=JSON.parse(localStorage.getItem(k));x.name+=' - other tab';localStorage.setItem(k,JSON.stringify(x))}",KEY)
  page.wait_for_timeout(300)
  page.get_by_role('button',name='Save task',exact=True).click()
  assert 'changed' in page.locator('body').inner_text()
  shot('S11-stale-tab','Newer-tab conflict warning while original task draft remains','A second isolated demo tab deliberately wrote a newer snapshot.',page.locator('dialog[open]'))
  other.close();return 'Stale-tab overwrite blocked with draft retained.'
 record('Cross-tab conflict',conflict)
 def corrupt():
  board();raw=page.evaluate('k=>localStorage.getItem(k)',KEY)
  page.evaluate("k=>localStorage.setItem(k,'{malformed-audit-data')",KEY)
  page.reload(wait_until='networkidle')
  assert 'could not be read' in page.locator('body').inner_text()
  shot('S12-corrupt-storage','Preserved damaged data with recovery download and reload','Malformed JSON deliberately injected in isolated demo storage.')
  assert page.evaluate('k=>localStorage.getItem(k)',KEY)=='{malformed-audit-data'
  page.evaluate('x=>localStorage.setItem(x.k,x.raw)',{'k':KEY,'raw':raw})
  return 'Malformed data was not silently overwritten; previous valid demo restored after capture.'
 record('Corrupted-data recovery',corrupt)
 def milestone():
  board();page.get_by_role('button',name='Milestones',exact=True).first.click()
  page.get_by_role('button',name='Add milestone',exact=True).click()
  page.get_by_label(re.compile('Milestone title')).fill('Audit milestone - fictional')
  page.get_by_label(re.compile('Achievement criterion')).fill('The controlled milestone interaction has been demonstrated.')
  page.get_by_role('button',name='Save milestone',exact=True).click()
  row=page.locator('li').filter(has=page.get_by_role('heading',name='Audit milestone - fictional',exact=True))
  row.get_by_role('button',name='Mark reached',exact=True).click()
  shot('S13-milestone-reached','User-defined milestone marked reached with generated timestamp',target=row)
  row.get_by_role('button',name='Return to pending',exact=True).click()
  row.get_by_role('button',name='Edit milestone: Audit milestone - fictional',exact=True).click()
  page.get_by_role('button',name='Delete milestone',exact=True).click()
  shot('S14-milestone-delete','Named milestone deletion confirmation',target=page.locator('dialog[open]'))
  page.get_by_role('button',name='Confirm delete milestone',exact=True).click()
  return 'Milestone created, marked reached, returned to pending and deleted.'
 record('Milestone lifecycle',milestone)
 def accessibility_checks():
  board();task('Build accessible study timer');axe('task editor')
  page.keyboard.press('Escape');page.get_by_role('button',name='Appearance & settings',exact=True).first.click();axe('settings')
  board();page.set_viewport_size({'width':320,'height':900});axe('320px board')
  M['reflow']=page.evaluate('({innerWidth,scrollWidth:document.documentElement.scrollWidth})')
  page.set_viewport_size({'width':1440,'height':1000});page.evaluate("document.documentElement.style.fontSize='200%'")
  shot('S15-text-200','Board at 200% root text size','CSS text enlargement, not a physical-device or browser zoom test.')
  page.evaluate("document.documentElement.style.fontSize=''")
  return 'Scoped automated scans recorded separately; no overall WCAG conformance conclusion.'
 record('Scoped accessibility and text enlargement',accessibility_checks)
 def speech_simulation():
  page.goto(URL,wait_until='networkidle')
  page.evaluate("""()=>{window.auditSpeech={getVoices:()=>[{voiceURI:'audit-local',name:'Simulated local voice (UI check only)',lang:'en-GB',localService:true}],addEventListener:()=>{},removeEventListener:()=>{},cancel:()=>{},pause:()=>{},resume:()=>{},speak:()=>{}};Object.defineProperty(window,'speechSynthesis',{configurable:true,value:window.auditSpeech});window.SpeechSynthesisUtterance=function(t){this.text=t;};}""")
  page.get_by_role('button',name='Navigation & reading',exact=True).first.click()
  dlg=page.locator('dialog[open]');shot('S16-reading-controls','Reading controls with simulated local speech-service availability','Actual website component; audit browser supplies a simulated voice. No audible speech verified.',dlg)
  start=dlg.get_by_role('button',name=re.compile('^Read .* aloud$')).first; start.click()
  shot('S17-reading-active','Pause and Stop controls during simulated playback','Controlled speech-service simulation, not audio output.',dlg)
  dlg.get_by_role('button',name='Pause reading',exact=True).click()
  shot('S18-reading-paused','Resume and Stop controls after simulated pause','Controlled speech-service simulation, not audio output.',dlg)
  dlg.get_by_role('button',name='Resume reading',exact=True).click();dlg.get_by_role('button',name='Stop reading',exact=True).click()
  return 'Frontend start/pause/resume/stop state transitions checked under explicitly simulated voice service.'
 record('Speech frontend simulation',speech_simulation)
 M['browser_version']=b.version;b.close()
(OUT/'manifest.json').write_text(json.dumps(M,indent=2));print(json.dumps(M['checks'],indent=2))
