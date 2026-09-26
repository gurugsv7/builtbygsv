from pathlib import Path
from tempfile import gettempdir

from playwright.sync_api import sync_playwright


BASE_URL = "http://127.0.0.1:4173"
OUTPUT_DIR = Path(gettempdir()) / "builtbygsv-browser-smoke"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=1)
    console_errors: list[str] = []
    page.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)

    page.goto(f"{BASE_URL}/contact", wait_until="networkidle")
    assert page.title() == "Contact BuiltbyGSV | Start a Web or Software Project"
    assert page.get_by_role("heading", name="Bring the problem. We'll shape the build.").is_visible()
    assert page.locator('meta[name="robots"]').get_attribute("content").startswith("index, follow")
    page.screenshot(path=str(OUTPUT_DIR / "contact-desktop.png"), full_page=True)

    page.goto(f"{BASE_URL}/insights/website-project-brief-template", wait_until="networkidle")
    assert page.get_by_role("heading", name="A website project brief a developer can use").is_visible()
    assert page.get_by_text("Use this copy-paste brief", exact=True).is_visible()

    page.set_viewport_size({"width": 390, "height": 844})
    page.goto(f"{BASE_URL}/definitely-missing", wait_until="networkidle")
    assert page.title() == "Page Not Found | BuiltbyGSV"
    assert page.get_by_role("heading", name="This route never made it into production.").is_visible()
    assert page.locator('meta[name="robots"]').get_attribute("content") == "noindex, follow"
    page.screenshot(path=str(OUTPUT_DIR / "404-mobile.png"), full_page=True)

    page.get_by_role("button", name="Work", exact=False).click()
    page.wait_for_url(f"{BASE_URL}/projects")
    assert page.get_by_role("heading", name="Engineered products. Considered systems.").is_visible()

    assert not console_errors, f"Browser console errors: {console_errors}"
    browser.close()

print(f"Browser smoke test passed. Screenshots: {OUTPUT_DIR}")
