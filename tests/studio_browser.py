"""Responsive route and core interaction checks against the production preview."""
from pathlib import Path
import sys
from xml.etree import ElementTree
from playwright.sync_api import sync_playwright

BASE = 'http://127.0.0.1:4173'
OUT = Path('artifacts/studio-review')
OUT.mkdir(parents=True, exist_ok=True)
urls = [node.text.replace('https://www.builtbygsv.in', '') for node in
        ElementTree.parse('public/sitemap.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
screens = {'/start-project': 'project-brief', '/': 'home', '/about': 'company', '/services': 'services', '/projects': 'work',
           '/careers': 'careers', '/careers/software-engineer-intern': 'software-intern', '/careers/web-developer-intern': 'web-intern', '/website-information': 'website-information', '/process': 'process', '/contact': 'contact', '/services/ai-solutions': 'ai',
           '/projects/v2-productions': 'case-study', '/clinic-website-development-karaikal': 'local'}
if '--quick' in sys.argv:
    urls = list(screens)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    for width, height in [(1440, 1000), (390, 844)]:
        page.set_viewport_size({'width': width, 'height': height})
        for route in urls:
            page.goto(BASE + route, wait_until='networkidle')
            assert page.locator('#root h1:visible').count() == 1, (width, route, 'heading')
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (width, route, 'overflow')
            assert page.locator('link[rel="canonical"]').get_attribute('href') == 'https://www.builtbygsv.in' + route
            if route in screens:
                page.screenshot(path=str(OUT / f'{screens[route]}-{width}.png'), full_page=True)

        page.goto(BASE + '/', wait_until='networkidle')
        if width < 1024:
            page.get_by_role('button', name='Start a Project', exact=True).click()
            page.wait_for_url('**/start-project?service=web-dev')
            assert page.get_by_role('heading', name='Start a Project.').is_visible()
            assert page.get_by_role('dialog').count() == 0
            page.go_back(wait_until='networkidle')
            page.get_by_role('button', name='Explore the Studio').click()
            assert not page.get_by_role('heading', name='Product decisions, grounded in engineering.').is_visible()
            assert page.locator('#card-mobile-recent-project').is_visible()
            assert page.get_by_role('button', name='Product Engineering', exact=True).is_visible()
            assert page.evaluate('document.documentElement.scrollHeight < 1500'), 'mobile dashboard became a desktop-length landing page'
            page.screenshot(path=str(OUT / f'home-expanded-{width}.png'), full_page=True)
            page.get_by_role('button', name='Open Navigation Menu', exact=True).click()
            page.get_by_role('dialog').get_by_role('button', name='About us', exact=True).click()
        else:
            page.get_by_role('navigation', name='Main navigation').get_by_role('link', name='About us', exact=True).click()
        page.wait_for_url(BASE + '/about')
        assert page.get_by_role('heading', name='We build technology around the problem.').is_visible()
        if width < 1024:
            page.locator('summary').filter(has_text='Problem first.').click()
            assert page.get_by_text('Understand the people, constraints and desired outcome before choosing a stack or a feature list.', exact=True).first.is_visible()
        page.get_by_role('link', name='Work', exact=True).click()
        page.wait_for_url(BASE + '/projects')
        page.get_by_role('button', name='AI', exact=True).click()
        assert page.get_by_role('button', name='View Budget Diet App case study').is_visible()
        assert page.get_by_role('button', name='View V² Productions case study').count() == 0
        page.get_by_role('button', name='All', exact=True).first.click()
        page.get_by_role('button', name='View V² Productions case study').click()
        page.wait_for_url(BASE + '/projects/v2-productions')
        if width < 1024:
            assert page.get_by_role('dialog').is_visible()
            assert page.get_by_role('dialog').get_by_text('Client Work', exact=False).is_visible()
            page.get_by_role('button', name='Close project details').click()
        else:
            assert page.get_by_text('UX Design · Frontend Engineering', exact=True).is_visible()
        page.goto(BASE + '/contact?startProject=1', wait_until='networkidle')
        page.wait_for_url(BASE + '/start-project')
        assert page.get_by_role('heading', name='Start a Project.').is_visible()
        assert page.get_by_role('dialog').count() == 0
        page.goto(BASE + '/careers', wait_until='networkidle')
        page.get_by_role('link', name='Software engineering', exact=False).click()
        page.wait_for_url(BASE + '/careers/software-engineer-intern')
        application = page.get_by_role('link', name='Apply by email').get_attribute('href')
        assert application.startswith('mailto:admin@builtbygsv.in?subject=')
        assert 'Software%20Engineer%20Intern' in application
        assert page.get_by_text('6 months internship', exact=True).is_visible()
        assert page.get_by_role('link', name='admin@builtbygsv.in', exact=True).first.is_visible()
        if width < 1024:
            page.get_by_role('navigation', name='Primary navigation').get_by_role('link', name='Contact', exact=True).click()
            page.wait_for_url(BASE + '/contact')


    page.set_viewport_size({'width': 320, 'height': 568})
    for route in screens:
        page.goto(BASE + route, wait_until='networkidle')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (320, route, 'overflow')
    assert not errors, errors
    browser.close()

print(f'Checked {len(urls)} routes at desktop and mobile widths, narrow screens, navigation, filters, case studies and inquiry controls. Screenshots: {OUT}')
