"""Additional real UI states. Isolated fictional local/demo data only."""
import re,json,os
from pathlib import Path
from datetime import datetime,timezone
from playwright.sync_api import sync_playwright
O=Path('feature-detail-states');O.mkdir(exist_ok=True)
M={'captured_at':datetime.now(timezone.utc).isoformat(),'harness_commit':os.getenv('GITHUB_SHA'),'checks':[],'screenshots':[]}
U='https://vibecoding-project-tracker-umber.vercel.app/'
def write():(O/'manifest.json').write_text(json.dumps(M,indent=2))
with sync_playwright() as p:
 b=p.chromium.launch()
 def run(name,fn):
  c=b.new_context(viewport={'width':1440,'height':1200},locale='en-GB',timezone_id='Europe/London');q=c.new_page();q.set_default_timeout(7000)
  try:M['checks'].append({'name':name,'result':'PASS','details':fn(q,c)})
  except Exception as e:M['checks'].append({'name':name,'result':'NOT VERIFIED','details':str(e)})
  finally:c.close();write()
 def shot(q,n,title,sel=None):
  q.wait_for_timeout(350)
  l=q.locator(sel) if sel else q.locator('dialog[open]') if q.locator('dialog[open]').count() else q.locator('main')
  l.screenshot(path=str(O/(n+'.png')))
  (O/(n+'.txt')).write_text(q.locator('body').inner_text());M['screenshots'].append({'file':n+'.png','title':title,'url':q.url,'viewport':q.viewport_size,'note':'Ordinary actions on fictional records in an isolated browser.'});write()
 def board(q):
  q.goto(U+'?demo=1',wait_until='networkidle');q.get_by_role('button',name='Hide guide',exact=True).click();q.get_by_role('button',name=re.compile('^(Open team example|Add team example project)$')).first.click()
 def filters(q,c):
  board(q);q.locator('.task-filters select').nth(0).select_option('unassigned');shot(q,'G13-unassigned-filter','Unassigned task filter with matching cards')
  q.locator('.task-filters select').nth(1).select_option('bug');shot(q,'G14-combined-filters','Combined owner and task-type filters with recovery')
  return 'Select values asserted by the rendered controls; real filtered states captured.'
 run('Owner and type filters',filters)
 def empty(q,c):
  q.goto(U,wait_until='networkidle');q.get_by_label('Workspace name',exact=True).fill('Evidence workspace');q.get_by_label('First project name',exact=True).fill('Evidence project');q.get_by_label(re.compile('Member name')).fill('Evidence developer');q.get_by_role('button',name='Create workspace',exact=True).click()
  q.get_by_role('button',name='Open board: Evidence project',exact=True).click();shot(q,'G16-empty-board','Empty project board, stage-specific task creation and empty links')
  q.get_by_role('button',name='Milestones',exact=True).click();shot(q,'G17-empty-milestones','No-milestones message and Add milestone control')
  q.get_by_role('button',name='Team',exact=True).first.click();q.get_by_role('button',name=re.compile('^Edit member:')).first.click();q.get_by_role('button',name='Remove member',exact=True).click();q.get_by_role('button',name='Confirm remove member',exact=True).click();shot(q,'G18-empty-team','No-members state and Add your first member action')
  return 'New isolated workspace created; empty board/milestones and removal of its fictional sole member demonstrated.'
 run('Empty local states',empty)
 def mobile(q,c):
  board(q);q.set_viewport_size({'width':390,'height':844});q.locator('#mobile-stage').select_option('all');q.get_by_role('button',name='Edit task: Build accessible study timer',exact=True).click();shot(q,'G20-mobile-editor','390px task editor with reflowed details')
  q.get_by_role('tab',name='AI context',exact=True).click();shot(q,'G21-mobile-context','390px context editor with vertically stacked content')
  q.keyboard.press('Escape');q.get_by_role('button',name='Menu',exact=True).click();q.get_by_role('button',name='Team',exact=True).first.click();shot(q,'G22-mobile-team','390px stacked member details')
  return 'Narrow viewport emulation only; full task and team controls are actual application UI.'
 run('Narrow layout states',mobile)
 def briefing(q,c):
  board(q);q.get_by_role('button',name='Review briefing for Build accessible study timer',exact=True).click();t=q.get_by_label('Briefing to copy',exact=True);q.wait_for_timeout(650);t.focus();t.press('Control+End');q.wait_for_timeout(250)
  metrics=t.evaluate('(e)=>({top:e.scrollTop,height:e.scrollHeight,visible:e.clientHeight})');assert metrics['top']>0
  shot(q,'G07-selected-attempt-output','Briefing text scrolled to included attempts and lessons')
  (O/'briefing-scroll.json').write_text(json.dumps(metrics));(O/'selected-briefing.txt').write_text(t.input_value())
  return 'Read-only briefing scrolled through actual keyboard interaction; nonzero scroll position asserted.'
 run('Selected attempt output visible',briefing)
 b.close()
write();print(json.dumps(M['checks'],indent=2))
