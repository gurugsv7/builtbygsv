"""Exercise the enquiry page without sending any external messages."""
from pathlib import Path
from urllib.parse import urlparse, parse_qs
from playwright.sync_api import sync_playwright

BASE = 'http://127.0.0.1:4173'
OUT = Path('artifacts/project-brief')
OUT.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for width in [1440, 1024, 390, 320]:
        context = browser.new_context(viewport={'width': width, 'height': 900}, accept_downloads=True)
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(BASE + '/services/ai-solutions', wait_until='networkidle')
        page.get_by_role('button', name='Start a Project', exact=False).first.click()
        page.wait_for_url('**/start-project?service=**')
        assert page.get_by_role('dialog').count() == 0
        assert page.locator('link[rel=canonical]').get_attribute('href') == 'https://www.builtbygsv.in/start-project'
        page.screenshot(path=str(OUT / f'first-{width}.png'), full_page=True)
        page.get_by_role('button', name='Continue', exact=True).click()
        assert page.locator('#brief-name').evaluate('(el) => el === document.activeElement')
        page.get_by_label('Your name', exact=True).fill('Client review')
        page.get_by_label('Email address', exact=True).fill('invalid')
        page.get_by_label('Company or project name', exact=True).fill('Example business')
        page.get_by_label('What does your business do?', exact=True).fill('Manage booking requests for a service business.')
        page.get_by_role('button', name='Continue', exact=True).click()
        assert page.get_by_text('Enter a valid email address, such as name@company.com.').is_visible()
        page.get_by_label('Email address', exact=True).fill('review@example.com')
        page.get_by_role('button', name='Save draft on this device', exact=True).click()
        page.reload(wait_until='networkidle')
        page.get_by_role('button', name='Restore saved draft', exact=True).click()
        assert page.get_by_label('Your name', exact=True).input_value() == 'Client review'
        page.get_by_role('button', name='Continue', exact=True).click()
        # The sidebar on desktop defaults to web; explicitly choose the intended service.
        page.get_by_label('What do you need help with?', exact=True).select_option('AI solution')
        page.get_by_label('Where is the project today?', exact=True).select_option('New idea')
        for label in ['What problem should this project solve?', 'Who will use it?', 'What would a successful launch achieve?']:
            page.get_by_label(label, exact=True).fill('Help staff answer booking questions, with a human reviewer.')
        page.get_by_role('button', name='Continue', exact=True).click()
        assert page.get_by_label('AI task, source data and human review', exact=True).is_visible()
        assert page.get_by_label('Automation trigger, steps and exceptions', exact=True).count() == 0
        page.get_by_label('What must the first version do?', exact=True).fill('Answer from approved documents. ' * 150)
        page.get_by_label('Where should it work?', exact=True).select_option('Web application / dashboard')
        page.get_by_label('AI task, source data and human review', exact=True).fill('Use approved FAQs. Escalate uncertain answers to staff.')
        page.get_by_role('button', name='Continue', exact=True).click()
        page.get_by_label('What design and content already exist?', exact=True).select_option('Some assets ready')
        page.get_by_label('What will you need after launch?', exact=True).select_option('Ongoing maintenance')
        page.get_by_role('button', name='Continue', exact=True).click()
        page.get_by_label('Budget currency', exact=True).select_option('INR')
        page.get_by_label('Estimated budget or range', exact=True).fill('Need help estimating')
        page.get_by_label('Desired start and launch timeline', exact=True).fill('Flexible')
        page.get_by_role('button', name='Review brief', exact=True).click()
        assert page.get_by_role('heading', name='Review your project brief').is_visible()
        assert page.get_by_role('link', name='Open email to send').count() == 0
        with page.expect_download() as download_info:
            page.get_by_role('button', name='Download brief', exact=True).click()
        download = download_info.value
        contents = Path(download.path()).read_text(encoding='utf-8')
        assert 'Answer from approved documents. ' * 149 in contents
        assert 'review@example.com' in contents
        assert 'Budget currency:\nINR' in contents
        assert 'Automation trigger' not in contents
        link = page.get_by_role('link', name='Open email to send').get_attribute('href')
        assert urlparse(link).path == 'admin@builtbygsv.in'
        assert 'Example business' in parse_qs(urlparse(link).query)['subject'][0]
        assert 'attach' in parse_qs(urlparse(link).query)['body'][0].lower()
        page.screenshot(path=str(OUT / f'review-{width}.png'), full_page=True)
        page.get_by_role('button', name='Edit Goals & audience').click()
        page.get_by_label('What do you need help with?', exact=True).select_option('Automation')
        page.get_by_role('button', name='Continue', exact=True).click()
        assert page.get_by_label('Automation trigger, steps and exceptions', exact=True).is_visible()
        assert page.get_by_label('AI task, source data and human review', exact=True).count() == 0
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        page.get_by_role('button', name='Delete saved copy', exact=True).click()
        assert page.evaluate("localStorage.getItem('builtbygsv-project-brief-v1')") is None
        assert not errors, errors
        context.close()
    browser.close()
print('Project brief passed at 1440, 1024, 390 and 320px: routing, validation, drafts, conditional questions, editing and complete export.')
