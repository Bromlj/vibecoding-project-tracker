"""Capture and validate the deployed frontend-only login with fictional accounts."""
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
  M['screenshots'].append({'file':name+'.png','title':title,'url':q.url,'viewport':q.viewport_size,'note':'Real public-site frontend; fictional demo identities are not authenticated accounts.'});save()
 try:
  for attempt in range(15):
   q.goto(BASE+'?demo=1&login=1',wait_until='networkidle')
   if q.get_by_role('heading',name='Sign in',exact=True).count(): break
   if attempt==14: raise AssertionError('Updated login was not present on the public deployment.')
   time.sleep(5)
  dialog=q.locator('dialog[open]')
  assert dialog.get_by_label('Email address',exact=True).is_visible()
  assert dialog.get_by_label('Password',exact=True).is_visible()
  assert dialog.get_by_text('Demo only — no real account is connected.',exact=True).is_visible()
  assert 'Do not enter real credentials' not in dialog.inner_text()
  shot('L01-login','Clean sign-in form and compact demo account choices',True)
  initial=q.evaluate('JSON.stringify({...localStorage})')
  dialog.get_by_label('Email address',exact=True).fill('alex@example.test')
  dialog.get_by_label('Password',exact=True).fill('not-the-password')
  dialog.get_by_role('button',name='Sign in',exact=True).click()
  assert dialog.get_by_role('alert').filter(has_text='Email or password not recognised').is_visible()
  shot('L02-login-error','Invalid details show one concise inline error',True)
  dialog.get_by_role('button',name='Alex Morgan',exact=True).click()
  assert dialog.get_by_label('Email address',exact=True).input_value()=='alex@example.test'
  assert dialog.get_by_label('Password',exact=True).input_value()=='demo-only'
  dialog.get_by_role('button',name='Show password',exact=True).click()
  assert dialog.get_by_label('Password',exact=True).get_attribute('type')=='text'
  shot('L03-password-visible','One-tap demo account and password visibility',True)
  requests=[];q.on('request',lambda r: requests.append(r.url))
  dialog.get_by_role('button',name='Sign in',exact=True).click()
  assert q.locator('.sidebar-utilities').get_by_text('Alex Morgan').is_visible()
  assert q.get_by_role('button',name='Sign out',exact=True).is_visible()
  assert q.evaluate('JSON.stringify({...localStorage})')==initial
  assert not requests, 'Unexpected request during frontend-only sign-in'
  shot('L04-signed-in','Signed-in demo identity shown in sidebar')
  q.get_by_role('button',name='Sign out',exact=True).click()
  assert q.get_by_role('button',name='Sign in',exact=True).is_visible()
  shot('L05-signed-out','Signed out without changing workspace data')
  q.get_by_role('button',name='Sign in',exact=True).click()
  dialog=q.locator('dialog[open]')
  dialog.get_by_role('button',name='Sam Patel',exact=True).click()
  dialog.get_by_role('button',name='Sign in',exact=True).click()
  assert q.locator('.sidebar-utilities').get_by_text('Sam Patel').is_visible()
  shot('L06-second-user','Second fictional teammate in same demo flow')
  q.goto(BASE+'?demo=1',wait_until='networkidle')
  assert q.get_by_role('button',name='Sign in',exact=True).is_visible()
  assert not q.get_by_role('button',name='Sign out',exact=True).count()
  q.get_by_role('button',name='Sign in',exact=True).click()
  q.locator('dialog[open]').get_by_role('button',name='Close',exact=True).click()
  assert not q.locator('dialog[open]').count()
  shot('L07-guest','Workspace remains available without signing in')
  q.set_viewport_size({'width':390,'height':844})
  q.goto(BASE+'?demo=1&login=1',wait_until='networkidle')
  shot('L08-mobile-login','Mobile-friendly sign-in form',True)
  M['checks'].append({'name':'Prototype login lifecycle','result':'PASS','details':'Invalid details rejected; account buttons auto-fill; password visibility; two demo identities; sign-out; identity clears on reload; guest bypass; no request or localStorage change on sign-in. Mobile captured.'})
 except Exception as e:
  M['checks'].append({'name':'Prototype login lifecycle','result':'NOT VERIFIED','details':str(e)})
  q.screenshot(path=str(OUT/'ERROR.png'));save();raise
 finally:save();b.close()
print(json.dumps(M['checks'],indent=2))
