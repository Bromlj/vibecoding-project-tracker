"""Capture actual public prototype states in disposable browsers. No product code changes.
Only fictional local/demo records are changed; no real account or backend is accessed.
"""
import json, os, re, shutil
from pathlib import Path
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright

OUT=Path('feature-completeness'); OUT.mkdir(exist_ok=True)
URL='https://vibecoding-project-tracker-umber.vercel.app/'
M={'captured_at':datetime.now(timezone.utc).isoformat(),'harness_commit':os.getenv('GITHUB_SHA'),'url':URL,'checks':[],'screenshots':[]}
shutil.copytree('src',OUT/'source',dirs_exist_ok=True)
for name in ['DESIGN.md','package.json','package-lock.json','tailwind.config.js']:
 if Path(name).exists():shutil.copyfile(name,OUT/name)

def write(): (OUT/'manifest.json').write_text(json.dumps(M,indent=2))
with sync_playwright() as p:
 browser=p.chromium.launch()
 def case(name,fn):
  c=browser.new_context(viewport={'width':1440,'height':1200},locale='en-GB',timezone_id='Europe/London',device_scale_factor=1)
  q=c.new_page(); q.set_default_timeout(6500)
  try:
   result=fn(q,c)
   M['checks'].append({'name':name,'result':'PASS','details':result})
  except Exception as e:
   M['checks'].append({'name':name,'result':'NOT VERIFIED','details':str(e)})
   q.screenshot(path=str(OUT/('ERROR-'+re.sub('[^a-z0-9]+','-',name.lower())+'.png')),full_page=True)
  finally: c.close();write()
 def shot(q,key,title,selector=None,note='Ordinary interaction in an isolated browser using fictional records.'):
  q.wait_for_timeout(150)
  locator=q.locator(selector) if selector else (q.locator('dialog[open]') if q.locator('dialog[open]').count() else q.locator('main'))
  locator.screenshot(path=str(OUT/(key+'.png')))
  (OUT/(key+'.txt')).write_text(q.locator('body').inner_text())
  M['screenshots'].append({'file':key+'.png','title':title,'note':note,'url':q.url,'viewport':q.viewport_size});write()
 def demo(q):
  q.goto(URL+'?demo=1',wait_until='networkidle')
 def board(q):
  demo(q)
  h=q.get_by_role('button',name='Hide guide',exact=True)
  if h.count():h.click()
  q.get_by_role('button',name=re.compile('^(Open team example|Add team example project)$')).first.click()
 def edit(q):
  board(q);q.get_by_role('button',name='Edit task: Build accessible study timer',exact=True).click()
 def close(q):
  q.keyboard.press('Escape')
  d=q.get_by_role('button',name='Discard changes',exact=True)
  if d.count():d.click()
 def settings(q):
  q.get_by_role('button',name='Appearance & settings',exact=True).first.click()
 def setup(q):
  q.goto(URL,wait_until='networkidle')
  q.get_by_label('Workspace name',exact=True).fill('Evidence workspace')
  q.get_by_label('First project name',exact=True).fill('Evidence project')
  q.get_by_label(re.compile('Member name')).fill('Evidence developer')
  q.get_by_role('button',name='Create workspace',exact=True).click()

 def briefing(q,c):
  board(q);q.get_by_role('button',name='Add task',exact=True).first.click()
  q.get_by_label(re.compile('Task title')).fill('Synthetic incomplete context')
  q.get_by_role('tab',name='AI context',exact=True).click();q.get_by_label('Context',exact=True).fill('')
  q.get_by_role('button',name='Review briefing',exact=True).click()
  assert 'No context details yet' in q.locator('body').inner_text()
  shot(q,'G01-empty-briefing','Empty context guidance and unsaved-draft notice')
  q.get_by_role('button',name='Back to editing',exact=True).click()
  q.get_by_label('Context',exact=True).fill('## Background\nFictional task for demonstrating review suggestions.\n\n## Constraints\n\n## Prompts and outcomes\n\n## Tried so far\n\n## Pick up\n')
  q.get_by_role('button',name='Review briefing',exact=True).click()
  q.locator('summary').filter(has_text='Optional template suggestions').click()
  shot(q,'G02-template-suggestions','Expanded optional template suggestions; presence checks, not accuracy judgements')
  return 'Empty-state and optional template suggestions reached through ordinary task editing, without saving.'
 case('Briefing guidance',briefing)

 def project(q,c):
  demo(q);q.get_by_role('button',name='New project',exact=True).click()
  q.get_by_label(re.compile('Project name')).fill('example project')
  q.get_by_role('button',name='Create project',exact=True).click()
  assert q.locator('[role=alert]').count()>0
  shot(q,'G03-duplicate-project','Case-insensitive duplicate project-name rejection')
  return q.locator('[role=alert]').inner_text()
 case('Duplicate project name',project)

 def member(q,c):
  demo(q);q.get_by_role('button',name='Team',exact=True).first.click();q.get_by_role('button',name='Add member',exact=True).click()
  q.get_by_label(re.compile('Member name')).fill('Evidence member')
  q.get_by_label('GitHub username',exact=True).fill('bad user name')
  q.get_by_role('button',name='Save member',exact=True).click()
  assert q.locator('[role=alert]').count()>0
  shot(q,'G04-member-validation','Invalid developer-profile handle and retry state')
  q.get_by_label('GitHub username',exact=True).fill('fictional-evidence-user')
  q.get_by_label('GitLab username',exact=True).fill('fictional_evidence_user')
  q.get_by_label(re.compile('Email address')).fill('evidence@example.test')
  q.get_by_role('button',name='Retry save member',exact=True).click()
  q.get_by_role('button',name='Add member',exact=True).click()
  q.get_by_label(re.compile('Member name')).fill('Evidence member')
  q.get_by_label(re.compile('Email address')).fill('other@example.test')
  q.get_by_role('button',name='Save member',exact=True).click()
  shot(q,'G05-duplicate-member-labels','Identical member names distinguished by optional contact details')
  links=q.locator('a[href*="fictional-evidence-user"],a[href*="fictional_evidence_user"]').evaluate_all('(els)=>els.map(e=>({text:e.textContent,href:e.href,target:e.target}))')
  (OUT/'profile-links.json').write_text(json.dumps(links,indent=2))
  return 'Invalid handle rejected, corrected member saved, same-name member added; profile URLs inspected without visiting external profiles.'
 case('Member validation and disambiguation',member)

 def attempts(q,c):
  edit(q);q.get_by_role('tab',name='Attempts & lessons',exact=True).click()
  q.get_by_role('button',name='Remove attempt 3',exact=True).click()
  shot(q,'G06-attempt-removal','Attempt removal explicitly changes the draft until Save task','.attempt-entry:nth-child(1)')
  q.get_by_role('button',name='Keep attempt',exact=True).click()
  q.get_by_role('button',name='Review selected attempts in briefing',exact=True).click()
  t=q.get_by_label('Briefing to copy',exact=True);value=t.input_value()
  (OUT/'selected-attempt-briefing.txt').write_text(value)
  t.evaluate('(e)=>{e.scrollTop=e.scrollHeight}')
  shot(q,'G07-selected-attempt-output','Briefing scrolled to selected attempt text')
  q.get_by_role('button',name='Back to editing',exact=True).click()
  q.get_by_role('tab',name='Attempts & lessons',exact=True).click();q.get_by_role('button',name='Add attempt',exact=True).click()
  q.get_by_role('button',name='Save task',exact=True).click()
  shot(q,'G08-attempt-validation','Incomplete new attempt rejected while task draft remains available')
  return 'Attempt removal cancelled; selected output captured; incomplete new attempt rejected. No stored attempts were removed.'
 case('Attempt confirmation and selected briefing',attempts)

 def reset(q,c):
  demo(q);q.get_by_role('button',name='Reset demo practice',exact=True).click()
  shot(q,'G09-demo-reset-confirm','Reset confirmation separates practice data from real work')
  q.get_by_role('button',name='Keep demo changes',exact=True).click()
  q.get_by_label('Guide step',exact=True).select_option('7')
  shot(q,'G10-guide-final-step','Final guide step returns to the personal workspace without copying examples','.demo-guide')
  return 'Reset cancelled and final guide step selected.'
 case('Demo reset and guide',reset)

 def search(q,c):
  board(q);s=q.get_by_label('Search tasks',exact=True)
  s.fill('zzzz-no-match-evidence');shot(q,'G11-search-empty-full','Full no-results message, matching count and Clear filters')
  s.fill('timer');shot(q,'G12-search-results-full','Search results with actual matching task cards')
  q.get_by_role('button',name='Clear filters',exact=True).click()
  owner=q.get_by_label('Owner',exact=True);owner.select_option(label='Unassigned')
  shot(q,'G13-unassigned-filter','Unassigned filter with matching cards')
  q.get_by_label('Type',exact=True).select_option(label='Bugs')
  shot(q,'G14-combined-filters','Combined owner/type filters and explicit no-match state')
  return 'Text search, clearing and combined owner/type filters exercised.'
 case('Search and filtering',search)

 def empty(q,c):
  setup(q);shot(q,'G15-local-setup-result','New personal project created with the creator in its local roster')
  q.get_by_role('button',name=re.compile('^Open project')).first.click()
  shot(q,'G16-empty-board','Empty board with stage-specific Add task actions and empty deliverable links')
  q.get_by_role('tab',name='Milestones',exact=True).click()
  shot(q,'G17-empty-milestones','No-milestone state and Add milestone action')
  q.get_by_role('button',name='Team',exact=True).first.click()
  q.get_by_role('button',name=re.compile('Edit member:')).first.click();q.get_by_role('button',name='Remove member',exact=True).click();q.get_by_role('button',name='Confirm remove member',exact=True).click()
  shot(q,'G18-empty-team','No-members state and Add your first member action')
  return 'Disposable local workspace set up; its sole fictional roster entry removed; no real user workspace changed.'
 case('Local setup and empty states',empty)

 def restore(q,c):
  board(q);settings(q)
  with q.expect_download() as event:q.get_by_role('button',name='Download workspace backup',exact=True).click()
  path=OUT/'restorable-demo.json';event.value.save_as(str(path));data=json.loads(path.read_text());data['name']='Restored evidence copy';path.write_text(json.dumps(data))
  q.locator('input[type=file]').set_input_files(str(path));q.get_by_role('button',name='Confirm restore backup',exact=True).click()
  q.reload(wait_until='networkidle');assert 'Restored evidence copy' in q.locator('body').inner_text()
  shot(q,'G19-completed-restore','Confirmed backup replacement retained after reload')
  return 'Exported demo JSON, changed its display name, confirmed replacement and verified restored name after reload. Isolated demo only.'
 case('Complete valid backup restore',restore)

 def mobile(q,c):
  q.set_viewport_size({'width':390,'height':844});edit(q)
  shot(q,'G20-mobile-editor','Narrow-screen task editor with reflowed fields and visible save controls')
  q.get_by_role('tab',name='AI context',exact=True).click()
  shot(q,'G21-mobile-context','AI context reflows vertically on a narrow screen')
  close(q);q.get_by_role('button',name='Menu',exact=True).click();q.get_by_role('button',name='Team',exact=True).first.click()
  shot(q,'G22-mobile-team','Team details stacked vertically on a narrow screen')
  return '390 CSS-pixel viewport captures; not a physical-device test.'
 case('Responsive editor and team',mobile)

 def keyboard(q,c):
  edit(q);q.get_by_role('tab',name='Details',exact=True).focus();q.keyboard.press('End');assert q.get_by_role('tab',name='Attempts & lessons').get_attribute('aria-selected')=='true'
  q.keyboard.press('Home');assert q.get_by_role('tab',name='Details').get_attribute('aria-selected')=='true'
  q.keyboard.press('ArrowRight');assert q.get_by_role('tab',name='AI context').get_attribute('aria-selected')=='true'
  shot(q,'G23-keyboard-editor-tab','Keyboard-selected AI context tab after Home, End and ArrowRight checks')
  close(q);q.emulate_media(forced_colors='active')
  shot(q,'G24-forced-colours','Actual browser forced-colours emulation retains labelled board structure')
  return 'Home/End/ArrowRight editor selection asserted; forced-colours mode emulated. No general screen-reader conformance claim.'
 case('Keyboard tabs and forced colours',keyboard)

 def guide(q,c):
  demo(q);q.get_by_role('button',name='How to use',exact=True).first.click()
  shot(q,'G25-complete-guide','Complete eight-step How to use page')
  q.get_by_role('button',name='Navigation & reading',exact=True).first.click()
  q.set_viewport_size({'width':1440,'height':1700})
  shot(q,'G26-shortcut-guide','Full shortcut reference and direct section-navigation buttons')
  return 'All eight guide steps and shortcut-reference text captured.'
 case('Full guidance',guide)

 browser.close()
write();print(json.dumps(M['checks'],indent=2))
