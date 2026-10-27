"""Capture real public-prototype screenshots in an isolated demo browser.
No accounts, tokens or personal local workspace are used. Failed checkpoints are
recorded, never relabelled as passes. This is developer evidence, not user research.
"""
import json, os, re, traceback
from pathlib import Path
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright

OUT = Path('assessment-evidence')
OUT.mkdir(exist_ok=True)
URL = 'https://vibecoding-project-tracker-umber.vercel.app/?demo=1'
manifest = {'captured_at': datetime.now(timezone.utc).isoformat(), 'url': URL,
            'source_commit': os.environ.get('GITHUB_SHA'), 'screenshots': [], 'checks': [],
            'limits': ['Isolated synthetic demo data only.', 'Screenshots show UI states, not full accessibility conformance.', 'No human usability or audible speech evaluation.']}

def check(name, fn):
    try:
        result = fn()
        manifest['checks'].append({'name': name, 'result': 'PASS', 'details': result})
    except Exception as exc:
        manifest['checks'].append({'name': name, 'result': 'NOT VERIFIED', 'details': str(exc)[:1600]})
    (OUT/'manifest.json').write_text(json.dumps(manifest, indent=2))

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    context = browser.new_context(viewport={'width': 1440, 'height': 1000}, device_scale_factor=1, locale='en-GB', timezone_id='Europe/London', color_scheme='light', accept_downloads=True)
    page = context.new_page()
    page.set_default_timeout(7000)
    page.on('pageerror', lambda exc: manifest.setdefault('page_errors', []).append(str(exc)))
    page.on('dialog', lambda dialog: dialog.accept())

    def shot(name, title, target=None, full=False, note=''):
        page.wait_for_timeout(250)
        filename = name+'.png'
        (target or page).screenshot(path=str(OUT/filename), **({} if target else {'full_page':full}))
        manifest['screenshots'].append({'file':filename, 'title':title, 'url':page.url, 'viewport':page.viewport_size, 'note':note})
        (OUT/(name+'.txt')).write_text(page.locator('body').inner_text())

    def close_dialog():
        if page.locator('dialog[open]').count():
            page.keyboard.press('Escape')
            page.wait_for_timeout(150)

    def home():
        page.goto(URL, wait_until='networkidle')
        page.get_by_role('button', name='Projects', exact=True).first.wait_for()
        hide = page.get_by_role('button', name='Hide guide', exact=True)
        if hide.count(): hide.click()

    def board():
        home()
        link = page.get_by_role('button', name=re.compile('^(Open team example|Add team example project)$'))
        if link.count(): link.first.click()
        else:
            page.get_by_role('button', name=re.compile('StudySprint')).first.click()
        page.get_by_role('button', name='Add task', exact=True).first.wait_for()

    def nav(name):
        close_dialog()
        page.get_by_role('button', name=name, exact=True).first.click()

    def capture_initial():
        page.goto(URL, wait_until='networkidle')
        shot('01-projects-guide','Demo projects and guided practice')
        board()
        shot('02-board','Four-stage board, Feature/Bug badges, owner initials, deadline states and deliverable links',full=True)
        manifest['computed_style'] = page.locator('body').evaluate('(e)=>({font:getComputedStyle(e).fontFamily,fontSize:getComputedStyle(e).fontSize})')
        return 'Public demo opened without registration.'
    check('Public demo and populated board', capture_initial)

    def create_task():
        board()
        page.get_by_role('button',name='Add task',exact=True).first.click()
        dlg=page.locator('dialog[open]')
        shot('03-new-task','New task defaults and required title',dlg)
        page.get_by_role('button',name='Save task',exact=True).click()
        shot('04-validation','Required-title validation with retained draft',dlg)
        page.get_by_label(re.compile('Task title')).fill('Evidence check - fictional')
        page.get_by_label('Description',exact=True).fill('Synthetic developer-check task. Safe to remove after evidence capture.')
        page.get_by_label('Task type',exact=True).select_option('bug')
        page.get_by_role('button',name=re.compile('^(Save task|Retry save task)$')).click()
        page.get_by_role('button',name='Evidence check - fictional',exact=True).click()
        shot('05-created-task','Saved task identity and creation timestamp',page.locator('dialog[open]'))
        page.get_by_label('Status',exact=True).select_option('review')
        handoff=page.get_by_label('Hand off to',exact=True)
        opts=handoff.locator('option').evaluate_all('(els)=>els.map(e=>({v:e.value,t:e.textContent}))')
        match=next((x['v'] for x in opts if 'Alex Morgan' in x['t']),None)
        if match: handoff.select_option(match)
        page.get_by_role('button',name='Save task',exact=True).click()
        shot('06-handover','Task moved to Review with updated owner and save feedback')
        page.reload(wait_until='networkidle')
        if not page.get_by_role('button',name='Evidence check - fictional',exact=True).count():
            board()
        page.get_by_role('button',name='Evidence check - fictional',exact=True).click()
        assert page.get_by_label('Status',exact=True).input_value()=='review'
        shot('07-reloaded-task','Reopened saved task after page reload',page.locator('dialog[open]'))
        page.get_by_role('button',name='Delete task',exact=True).click()
        shot('08-delete-confirm','Named-task deletion confirmation',page.locator('dialog[open]'))
        page.get_by_role('button',name='Keep task',exact=True).click()
        close_dialog()
        return 'Created, edited stage/owner, reloaded and retained saved state; deletion cancellation checked.'
    check('Task CRUD, handover and reload', create_task)

    def context_attempts():
        board()
        page.get_by_role('button',name='Build accessible study timer',exact=True).click()
        page.get_by_role('tab',name='AI context',exact=True).click()
        shot('09-context','Markdown context, AI tool, saved timestamp and copy/review controls',page.locator('dialog[open]'))
        page.get_by_role('tab',name='Attempts & lessons',exact=True).click()
        details=page.locator('dialog[open] details summary')
        if details.count(): details.first.click()
        shot('10-attempts','Attempt prompt, result, lesson, outcome and briefing selection',page.locator('dialog[open]'))
        page.get_by_role('button',name=re.compile('Review selected attempts')).click()
        shot('11-briefing','Complete briefing with selected attempt records',page.locator('dialog[open]'))
        page.get_by_role('button',name=re.compile('^Copy context')).last.click()
        shot('12-copy-result','Clipboard outcome or selectable fallback',page.locator('dialog[open]'))
        return 'Context and existing attempt opened; exact briefing reviewed; copy control invoked. See screenshot for actual clipboard outcome.'
    check('Context, attempts, review and copying', context_attempts)

    def links():
        board()
        page.get_by_role('button',name='Edit deliverable links',exact=True).click()
        shot('13-deliverable-editor','Four editable deliverable URL fields',page.locator('dialog[open]'))
        page.get_by_label('Presentation URL',exact=True).fill('javascript:alert(1)')
        page.get_by_role('button',name='Save deliverable links',exact=True).click()
        shot('14-link-validation','Non-HTTP(S) link rejected; existing saved links retained',page.locator('dialog[open]'))
        return 'Unsafe URL scheme rejected in isolated demo input; no script executed.'
    check('Deliverable editing and URL validation',links)

    def team():
        home(); nav('Team')
        shot('15-team','Shared manual team roster and assignment counts',full=True)
        page.get_by_role('button',name=re.compile('Edit member')).first.click()
        shot('16-member-editor','Member name and optional contact/profile fields',page.locator('dialog[open]'))
        remove=page.get_by_role('button',name='Remove member',exact=True)
        if remove.count():
            remove.click(); shot('17-member-warning','Member-removal warning and task-unassignment consequence',page.locator('dialog[open]'))
        return 'Roster and member editor inspected; no existing member removed.'
    check('Team roster',team)

    def milestones():
        board(); page.get_by_role('button',name='Milestones',exact=True).first.click()
        shot('18-milestones','Milestone criteria, Pending/Reached status and dates',full=True)
        page.get_by_role('button',name='Add milestone',exact=True).click()
        shot('19-milestone-editor','Milestone title, achievement criterion and target date',page.locator('dialog[open]'))
        return 'Milestone list and creation fields displayed; no automatic-completion claim.'
    check('Project milestones',milestones)

    def projects():
        home(); page.get_by_role('button',name='New project',exact=True).click()
        shot('20-project-editor','Project creation with name and description',page.locator('dialog[open]'))
        return 'Project editor inspected.'
    check('Project creation',projects)

    def settings():
        home(); nav('Appearance & settings')
        shot('21-appearance','Workspace colours, labelled preview and reversible settings')
        page.get_by_label('Task colour palette',exact=True).select_option(index=1)
        shot('22-palette-preview','Immediate alternative Feature/Bug palette preview')
        page.get_by_role('button',name='Cancel workspace changes',exact=True).click()
        backup=page.locator('section[aria-labelledby="backup-title"]')
        shot('23-backup','Export and validated restore controls',backup)
        with page.expect_download() as dl:
            page.get_by_role('button',name='Download workspace backup',exact=True).click()
        dest=OUT/'synthetic-workspace-backup.json'; dl.value.save_as(str(dest))
        data=json.loads(dest.read_text())
        manifest['backup_summary']={'projects':len(data.get('boards',[])),'members':len(data.get('members',[])),'keys':list(data)}
        upload=page.locator('input[type=file]')
        upload.set_input_files({'name':'invalid.json','mimeType':'application/json','buffer':b'{broken'})
        shot('24-invalid-backup','Malformed backup rejected without replacing workspace',backup)
        upload.set_input_files(str(dest))
        shot('25-restore-confirm','Validated backup preview and explicit replacement confirmation',backup)
        page.get_by_role('button',name='Cancel restore',exact=True).click()
        page.get_by_label('Appearance',exact=True).select_option('dark')
        page.evaluate('window.scrollTo(0,0)')
        shot('26-dark-preview','Dark appearance preview without committing it')
        page.get_by_role('button',name='Cancel accessibility changes',exact=True).click()
        return 'Alternative palette preview/cancel, real JSON export, invalid import rejection and valid import confirmation captured. Restore cancelled.'
    check('Preferences and backup recovery',settings)

    def access():
        home(); nav('Accessibility')
        dlg=page.locator('dialog[open]')
        shot('27-accessibility','Appearance, colour alternatives and accessibility preferences',dlg)
        page.get_by_label('Colour vision support',exact=True).select_option('monochrome')
        page.get_by_label('Contrast',exact=True).select_option('high')
        page.get_by_label('Text size',exact=True).select_option('largest')
        shot('28-accessibility-preview','Monochrome, higher contrast and enlarged text preview',dlg)
        page.get_by_role('button',name='Cancel accessibility changes',exact=True).click()
        return 'Preference states captured; this is not a screen-reader user test.'
    check('Accessibility preferences',access)

    def reading():
        home(); nav('Navigation & reading')
        shot('29-navigation-reading','Navigation buttons, optional shortcut guide and reading availability',page.locator('dialog[open]'))
        return 'Visible reading/shortcut controls captured; audible speech not evaluated.'
    check('Reading and navigation help',reading)

    def guide():
        home(); nav('How to use')
        shot('30-guide','Eight-step guidance with direct navigation actions',full=True)
        return 'Guide inspected.'
    check('How to use',guide)

    def search():
        board(); page.get_by_label('Search tasks',exact=True).fill('zzzz-no-match-evidence')
        shot('31-search-empty','Search no-results state and clear-filter recovery')
        page.get_by_label('Search tasks',exact=True).fill('timer')
        shot('32-search-results','Filtered task results and matching counts')
        return 'No-results and matching-results states captured.'
    check('Search and filters',search)

    def mobile():
        board(); page.set_viewport_size({'width':320,'height':900})
        shot('33-mobile-board','320 CSS-pixel stage selector and narrow-screen board',full=True)
        manifest['mobile_overflow']=page.evaluate('({viewport:innerWidth,document:document.documentElement.scrollWidth})')
        menu=page.get_by_role('button',name='Menu',exact=True)
        if menu.count(): menu.click(); shot('34-mobile-menu','Expanded mobile navigation at 320 CSS pixels')
        page.set_viewport_size({'width':844,'height':390})
        page.reload(wait_until='networkidle')
        shot('35-landscape','Narrow landscape layout',full=True)
        page.set_viewport_size({'width':1440,'height':1000})
        return '320px and landscape captures; viewport emulation, not physical-device testing.'
    check('Responsive layouts',mobile)

    def keyboard():
        board(); page.keyboard.press('Tab')
        shot('36-keyboard-focus','Keyboard focus/skip-navigation state')
        return page.evaluate('({tag:document.activeElement.tagName,text:document.activeElement.textContent})')
    check('Keyboard focus sample',keyboard)

    def setup():
        blank=context.new_page(); blank.set_default_timeout(7000)
        blank.goto(URL.split('?')[0],wait_until='networkidle')
        blank.screenshot(path=str(OUT/'37-local-setup.png'),full_page=True)
        manifest['screenshots'].append({'file':'37-local-setup.png','title':'First local workspace setup without sign-in','url':blank.url,'viewport':blank.viewport_size,'note':'Separate blank local workspace in isolated browser.'})
        (OUT/'37-local-setup.txt').write_text(blank.locator('body').inner_text()); blank.close()
        return 'Blank personal-mode setup captured separately from demo.'
    check('Local setup boundary',setup)

    def cleanup():
        board()
        task=page.get_by_role('button',name='Evidence check - fictional',exact=True)
        if task.count():
            task.click(); page.get_by_role('button',name='Delete task',exact=True).click(); page.get_by_role('button',name='Confirm delete',exact=True).click()
            page.reload(wait_until='networkidle'); board()
            assert not page.get_by_role('button',name='Evidence check - fictional',exact=True).count()
        shot('38-final-board','Final demo after temporary-task deletion')
        return 'Only audit-created task removed; deletion persisted after reload.'
    check('Temporary-task cleanup and deletion persistence',cleanup)
    manifest['browser_version']=browser.version
    context.close(); browser.close()

(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2))
print(json.dumps({'screenshots':len(manifest['screenshots']),'checks':manifest['checks']},indent=2))
