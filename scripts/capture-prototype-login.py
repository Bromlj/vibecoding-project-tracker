"""Capture the real deployed frontend login, using fictional credentials only."""
import json, os, time
from pathlib import Path
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright
OUT=Path('prototype-login-evidence'); OUT.mkdir(exist_ok=True)
BASE='https://vibecoding-project-tracker-umber.vercel.app/'
M={'captured_at':datetime.now(timezone.utc).isoformat(),'source_commit':os.getenv('GITHUB_SHA'),'url':BASE,'checks':[],'screenshots':[]}
def save(): (OUT/'manifest.json').write_text(json.dumps(M,indent=2))
with sync_playwright() as p:
 b=p.chromium.launch(); c=b.new_context(viewport={'width':1440,'height':1000},locale='en-GB',timezone_id='Europe/London');q=c.new_page();q.set_default_timeout(10000)
 def shot(name,title,dialog=False):
  q.wait_for_timeout(150)
  target=q.locator('dialog[open]') if dialog else q
  target.screenshot(path=str(OUT/(name+'.png')))
  (OUT/(name+'.txt')).write_text(q.locator('body').inner_text())
  M['screenshots'].append({'file':name+'.png','title':title,'url':q.url,'viewport':q.viewport_size,'note':'Genuine public-site frontend; explicitly simulated login with fictional examples. No authentication claim.'});save()
 try:
  for attempt in range(15):
   q.goto(BASE+'?demo=1&login=1',wait_until='networkidle')
   if q.get_by_role('heading',name='Sign in to the prototype',exact=True).count(): break
   if attempt==14: raise AssertionError('New login was not present on the public deployment; no screenshot completion claimed.')
   time.sleep(5)
  shot('L01-login','Prototype login, example identity and guest route',True)
  initial=q.evaluate('JSON.stringify({...localStorage})')
  q.get_by_label('Sample password',exact=True).fill('not-the-sample')
  q.get_by_role('button',name='Sign in to preview',exact=True).click()
  assert q.get_by_role('alert').filter(has_text='Use a listed example').is_visible()
  shot('L02-login-error','Sample-only validation without losing email',True)
  q.get_by_label('Sample password',exact=True).fill('demo-only')
  q.get_by_label('Show sample password',exact=True).check()
  assert q.get_by_label('Sample password',exact=True).get_attribute('type')=='text'
  shot('L03-password-visible','User-controlled sample password visibility',True)
  requests=[];q.on('request',lambda r: requests.append(r.url))
  q.get_by_role('button',name='Sign in to preview',exact=True).click()
  assert q.get_by_text('Preview account: Alex Morgan (simulation)',exact=True).is_visible()
  assert q.evaluate('JSON.stringify({...localStorage})')==initial
  assert not requests, 'Unexpected request during simulated login'
  shot('L04-signed-in','Visible example account and simulated sign-in feedback')
  q.get_by_role('button',name='Sign out of preview',exact=True).click()
  assert q.get_by_role('button',name='Prototype sign in',exact=True).is_visible()
  shot('L05-signed-out','Sign-out confirmation without deleting workspace data')
  q.get_by_role('button',name='Prototype sign in',exact=True).click()
  q.get_by_label('Example account',exact=True).select_option('sam@example.test')
  q.get_by_label('Sample password',exact=True).fill('demo-only')
  q.get_by_role('button',name='Sign in to preview',exact=True).click()
  assert q.get_by_text('Preview account: Sam Patel (simulation)',exact=True).is_visible()
  shot('L06-second-user','Second fictional identity in the same prototype flow')
  q.goto(BASE+'?demo=1',wait_until='networkidle')
  assert q.get_by_role('button',name='Prototype sign in',exact=True).is_visible()
  assert not q.get_by_role('button',name='Sign out of preview',exact=True).count()
  q.get_by_role('button',name='Prototype sign in',exact=True).click()
  q.get_by_role('button',name='Continue without signing in',exact=True).click()
  assert not q.locator('dialog[open]').count()
  shot('L07-guest','Assessor reaches populated demo without account creation')
  q.set_viewport_size({'width':390,'height':844})
  q.goto(BASE+'?demo=1&login=1',wait_until='networkidle')
  shot('L08-mobile-login','Narrow-screen login form',True)
  M['checks'].append({'name':'Prototype login lifecycle','result':'PASS','details':'Invalid sample rejected; visibility toggle; two example identities; sign-out; identity cleared on reload; guest bypass; no request or localStorage change on sign-in. Narrow viewport captured.'})
 except Exception as e:
  M['checks'].append({'name':'Prototype login lifecycle','result':'NOT VERIFIED','details':str(e)})
  q.screenshot(path=str(OUT/'ERROR.png'));save();raise
 finally:save();b.close()
print(json.dumps(M['checks'],indent=2))
