"""
Render social preview cards (1200x630) for projects shown with animated interface
previews instead of screenshots. Needs the dev server running on :3000:

    python scripts/og-concepts.py

The card is composed in the page itself so it uses the site's fonts, then the live
preview is cloned into it once its entrance animations have settled.
"""
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = 'http://localhost:3000'
OUT = Path(__file__).resolve().parent.parent / 'public' / 'og' / 'projects'

CARDS = [
    {
        'id': 'reelcut-ai-video-editor',
        'title': 'Reelcut',
        'subtitle': 'AI-assisted editing that turns long recordings into captioned reels.',
        'bg': '#1C1916', 'accent': '#FF5A36', 'text': '#FFFFFF', 'muted': '#D6D3D1', 'dot': 'rgba(255,255,255,.10)',
    },
]

COMPOSE = """
(card) => {
  const source = [...document.querySelectorAll('[data-concept-screen]')].find((node) => node.offsetParent !== null);
  if (!source) throw new Error('preview not found');
  const preview = source.cloneNode(true);
  preview.style.width = '300px';
  preview.style.height = '640px';
  const wrap = document.createElement('div');
  wrap.id = 'og-card';
  wrap.style.cssText = `position:fixed;inset:0 auto auto 0;width:1200px;height:630px;z-index:99999;overflow:hidden;
    background:${card.bg};background-image:radial-gradient(${card.dot} 1.2px, transparent 1.2px);background-size:22px 22px;
    font-family:'Plus Jakarta Sans',sans-serif;color:${card.text};`;
  wrap.innerHTML = `
    <img src="/assets/builtbygsv-mark-222.webp" style="position:absolute;left:64px;top:52px;width:116px;height:44px;border-radius:10px;background:#050909;object-fit:contain" />
    <div style="position:absolute;left:64px;top:210px;width:470px">
      <p style="margin:0;font-family:'Space Grotesk',monospace;font-size:20px;font-weight:700;letter-spacing:.12em;color:${card.accent}">BUILTBYGSV LAB · IN DEVELOPMENT</p>
      <h1 style="margin:18px 0 0;font-size:78px;line-height:1;font-weight:800;letter-spacing:-.03em">${card.title}</h1>
      <p style="margin:24px 0 0;font-size:27px;line-height:1.4;color:${card.muted}">${card.subtitle}</p>
    </div>
    <p style="position:absolute;left:64px;bottom:44px;margin:0;font-family:'Space Grotesk',monospace;font-size:20px;font-weight:700;color:${card.muted}">builtbygsv.in/projects</p>
    <div id="og-preview" style="position:absolute;left:700px;top:64px;transform:scale(1.12);transform-origin:top left;"></div>`;
  wrap.querySelector('#og-preview').appendChild(preview);
  document.body.appendChild(wrap);
}
"""

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    for card in CARDS:
        page.goto(f"{BASE}/projects/{card['id']}")
        page.wait_for_timeout(4500)
        page.evaluate(COMPOSE, card)
        page.wait_for_timeout(500)
        target = OUT / f"{card['id']}.jpg"
        page.locator('#og-card').screenshot(path=str(target), type='jpeg', quality=88)
        print('wrote', target.name)
    browser.close()
