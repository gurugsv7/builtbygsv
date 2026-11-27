# Engineering and market audit — 27 November 2026

A senior-engineer review of the builtbygsv.in codebase, plus what local competitors
show on their sites that BuiltbyGSV does not. The evidence comes from the repository,
a production build, a headless crawl of all 71 sitemap pages at 360 px, the dated
Lighthouse reports in `src/data/websiteAudits.json`, and search results about competitor
sites (their pages could not be fetched directly from this environment).

## Verdict

The technical foundation is above the local market: prerendered HTML for every page,
consistent structured data, a strict CSP, tests that guard SEO output, and public
dated audits. **The gaps are commercial, not technical.** The site cannot measure
anything, has no server-side lead capture and no client proof. Competitors are
technically weaker but sell harder with ratings, free-consultation offers, industry
pages and wide city coverage.

## 1. Fixed in this pass

| Issue | Impact | Fix |
| --- | --- | --- |
| Full article text shipped in the main JS bundle on every page (489 KB, 146 KB gzip) | Slower first load on budget phones, worse INP | Route metadata now comes from a generated `src/blogManifest.ts`; article text loads only with the blog chunk. **Main bundle 346 KB / 98 KB gzip** (−33%, also below the pre-blog 398 KB). The SPA lazy-loads article schema, and crawlers still get it in prerendered HTML. A test fails if the manifest is stale; `prebuild` regenerates it |

Crawl result: 71/71 pages load with **no runtime errors, no failed requests, no images
without alt text and no horizontal overflow at 360 px**.

## 2. Engineering findings (prioritised)

### High

1. **No analytics or conversion tracking at all.** No tag, no event on WhatsApp/call/email
   clicks or brief completion. SEO work cannot be evaluated beyond Search Console.
   *Recommend:* a cookieless, privacy-friendly tool (Plausible, Umami or Vercel Web
   Analytics) and events for `whatsapp_click`, `call_click`, `email_click`, `brief_submitted`.
   Update the CSP `connect-src`/`script-src` for the chosen host, and mention it on
   `/website-information`.
2. **Lead capture depends on the visitor's mail app.** The project-brief wizard ends in a
   `mailto:` link. On phones without a configured mail app, or when someone closes the
   compose window, the lead is lost silently. *Recommend:* a small serverless endpoint
   (Vercel function) that stores the brief (Supabase table or email via Resend) and
   returns a reference number, keeping mailto and WhatsApp as fallbacks. Add rate
   limiting and a honeypot field.
3. **Every app page renders both a mobile and a desktop layout in the DOM** (two or three
   `<h1>`s; one is `display:none`). Crawlers see duplicate headings and the device
   renders twice the components. *Recommend:* render one layout per breakpoint (a
   `useMediaQuery` gate after hydration with the prerendered layout as default), or at
   least move the hidden variant's headings to `<p role="heading">`/`aria-hidden`.

### Medium

4. **HSTS** is `max-age=31536000` without `includeSubDomains`. Add it once every
   subdomain (mail, etc.) is confirmed HTTPS-only; consider `preload` later.
5. **Large components** (`ReelPressGuide` 906 lines, `ServicesOverviewScreen` 807,
   `StudentToolsPage` 691) mix data, layout and animation. Split them when next edited;
   no urgent need.
6. **Dependency drift**: React 19.2 → 19.3, Tailwind 4.3.3 → 4.3.5 and tsx are safe patch
   or minor updates. Vite 6 → 8, TypeScript 5.8 → 7, lucide 0.x → 1.x and motion 13 → 14
   are majors; schedule them one at a time with the test suite. `npm audit` reports 0
   vulnerabilities.
7. **CI runs only on `main` pushes and PRs.** Branch pushes such as this one are unchecked
   until a PR is opened. Add `push: branches: ['**']` or rely on PRs consistently.
8. **Browser tests (`tests/*.py`) are not in CI.** Port the smoke checks to Playwright Test
   (already installed) and run them against `vite preview` in CI, reusing this audit's
   crawl: errors, failed requests, one visible h1, overflow at 360 px.
9. **Social previews**: 10 distinct OG images across 71 pages; all articles share the
   site cover. Generate per-article OG images in the existing `scripts/og-image.ts`
   pipeline (title + category on brand background).

### Low

10. Many visual tap targets under 24 px (mostly inline footer links). Fine under WCAG
    2.2 inline exceptions, but increase footer link line-height on mobile.
11. `/s4skillup` mobile Lighthouse LCP 10.4 s, and STRIATUM mobile 82, appear on `/trust`.
    Improving those client builds improves the evidence page itself.

## 3. What competitors show that BuiltbyGSV does not

| Competitor pattern | Example | BuiltbyGSV today | Recommendation |
| --- | --- | --- | --- |
| Ratings and a testimonials page | Mayank Digital Labs: dedicated `/testimonials` page, "4.9★" on city pages | None | Collect 3–5 **real, named, client-approved** testimonials (Thaai Clinic, STRIATUM, KAMAYUU users), add a `/testimonials` section and Google reviews once the Business Profile exists. Never show an unsourced star rating, and add `Review` schema only for genuine reviews |
| Wide city coverage | Mayank: Karaikal, Mahe, Sivaganga, Pudukkottai, Karur, Thoothukudi, Cuddalore pages | Karaikal, Thanjavur, Bengaluru | Add hubs only where you genuinely serve and can say something specific: **Nagapattinam, Mayiladuthurai, Kumbakonam, Tiruvarur, Puducherry (city)** are all close to Karaikal. Each needs unique local content, not a template swap |
| Industry landing pages | Om Soft: pages for packaging, logistics, home services, coaching, electricians and more | Clinics only | Add 3 industry pages backed by your articles: **schools & coaching centres**, **retail & shops** (WhatsApp, billing), **manufacturing/job work** (custom software). Link the matching guides |
| Free-consultation or free-audit hook | Om Soft "Get a FREE Consultation"; most sites | "Start a Project" brief | Add a **free 15-minute website check** offer: the visitor submits a URL and receives a short written review (speed, mobile, ownership, local SEO). It matches your published-audit positioning |
| Monthly plans | Mayank "from ₹15,000 per month"; IndiaMART listings priced monthly | One-time project pricing | Publish an optional **care plan** (hosting, updates, backups, small edits) with a clear scope, linked from the maintenance-cost guide |
| Big credibility numbers | Om Soft "2,500+ projects", "1,050+ clients" | Honest, small, verifiable claims | **Keep it honest.** Make the strength visible instead: a "verified" strip on the homepage (Udyam/GST registered, dated Lighthouse reports, open-source repos) |
| Directory presence | GoodFirms, TechBehemoths, DesignRush, Clutch, IndiaMART | None found | Create the profiles with identical name, address and phone details, linking `/trust` (already in the first audit) |

What BuiltbyGSV has that **none** of the reviewed competitors show: public registration
identifiers with verification routes, dated third-party performance audits, real
open-source products (EvoBridge, LocalDrop, LiveClip AI), a 28-article problem-first
knowledge base, and honest pricing ranges. Lead with these.

## 4. Things to bring in (feature roadmap)

1. **Analytics plus a conversion dashboard** (High, about 1 day).
2. **Serverless brief and website-check intake** with reference numbers and an email
   notification (High, 2–3 days).
3. **Testimonials and case-study outcomes**: one paragraph per project on the result in
   the client's words, with permission (High, content work).
4. **Open-source showcase**: `/projects` entries for EvoBridge, LocalDrop and LiveClip AI
   using the README screenshots, linking the new guides (Medium, 1–2 days).
5. **Industry pages** (schools, retail, manufacturing) and **4–5 nearby city hubs**
   with unique content (Medium, 1 day each, mostly writing).
6. **Care plan pricing section** (Medium, half a day).
7. **Tamil versions** of the home page, the Karaikal hub, contact and the clinic page,
   with hreflang. You have now published the guide on doing this properly (Medium).
8. **Per-article OG images** and **CI browser smoke tests** (Low–Medium).
9. **Newsletter or "new guide" WhatsApp channel** to reuse the 28 articles (Low).

## 5. Ninety-day order of work

- **Weeks 1–2:** analytics, serverless intake, directory profiles, GitHub README backlinks.
- **Weeks 3–6:** testimonials, open-source project pages, care plan, homepage "verified" strip.
- **Weeks 7–12:** industry pages, nearby city hubs, Tamil core pages, OG images, CI browser tests.

Measure: Search Console impressions for `/insights/*` and city hubs, enquiries per week
by source, and WhatsApp clicks per 100 visits.

## Sources

- https://www.mayankdigitallabs.in/web-developer-karaikal
- https://www.mayankdigitallabs.in/testimonials
- https://omsoftsolution.com/website-design-company/puducherry
- https://www.designrush.com/agency/profile/agilesoftlabs
- https://techbehemoths.com/company/agilesoftlabs
- https://m.indiamart.com/codespace-solutions/profile.html
