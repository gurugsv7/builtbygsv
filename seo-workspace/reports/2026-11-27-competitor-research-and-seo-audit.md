# Competitor research and SEO audit — 27 November 2026

Scope: builtbygsv.in source and build output, public competitor listings for the
three local markets and Bengaluru MVP work, and the public BuiltbyGSV GitHub
repositories. Competitor facts come from their own pages and directory listings,
which are mostly self-reported; nothing below is a verified ranking.

## 1. Competitor landscape

### Karaikal

| Competitor | Positioning seen in search | Weakness we can beat |
| --- | --- | --- |
| Codespace Solutions | IndiaMART listing: websites, CMS, e-commerce, AI chatbots; prices shown as monthly amounts | Presence is directory-only; no case studies or proof pages in results |
| Mayank Digital Labs | `/web-developer-karaikal` landing page; Shopify, WordPress, React/Next.js | A city landing page without visible local proof |
| CodeShoppy | `codeshoppy.pages.dev/web-design-company-in-karaikal`; "from ₹8,000, live in 7 working days" | Price-led doorway-style page on a subdomain; the timeline depends on the client supplying content |
| Ahsan Solutions | The Manifest profile; Karaikal, launched 2018 | Directory profile only |

Takeaway: nobody in Karaikal publishes verifiable registration details, dated audits or
real case studies. That is BuiltbyGSV's clearest edge (`/trust`, case studies).
The price-led competitors are why `/insights/compare-website-quotes-india` was written.

### Puducherry

AgileSoftLabs (AI-assisted custom software; directory team-size figures conflict),
SmartGoNext (websites, custom software, AI chatbots), Waytohub Technologies,
Om Soft Solution (web design, SEO; claims 2,500+ projects), Bonjour Pondichrry.
They mostly appear in GoodFirms, TechBehemoths and DesignRush listings, and
**BuiltbyGSV does not appear in any of those directories yet**.

### Thanjavur

CVWorld, RK Soft Tech, Vebbox Software Solutions, DomainsRock, RRS Business Service
Solutions and Logirtha Technologies, plus IndiaMART-only names. The pattern is the
same: directory profiles, no reviews and little proof. An "AAMAX top 10 in Thanjavur"
listicle ranks for the head term. Listicles like that one are worth outreach.

### Bengaluru MVP / SaaS

The search results are dominated by vendor cost guides (Codingclave, Cmarix, Space-O,
Konstantinfo, eChai Ventures) and Clutch listings. A ranking blog targets the
*cost* query, not the *company* query. `/insights/mvp-development-cost-india` now
targets it and links to the Bengaluru MVP spoke.

## 2. Audit of builtbygsv.in

### Fixed in this change

1. **/insights metadata drift.** The SPA and the prerendered HTML used different
   titles and descriptions for `/insights`, so Google saw one and users another after
   hydration. There is now one source: `BLOG_INDEX_METADATA`.
2. **Thin article schema.** BlogPosting had no image, section or word count, and no
   article exposed FAQ markup. The shared `createBlogPostSchema()` now emits
   BlogPosting plus FAQPage, identically from the SPA and prerender.
3. **Weak internal linking from articles.** "Continue reading" always showed the
   first two posts. It now prefers the same category, then the newest. Articles can
   declare `related` service/project pages and `sources`, rendered as crawlable links,
   and a test fails on any broken internal link.
4. **Topic coverage limited to Karaikal website basics.** Eight new problem-first
   articles were added (see section 3).
5. **Index numbering bug:** card 10 rendered as "010".
6. **Brand entity:** a person entity and personal profiles were removed from schema
   in the previous change. The Organization now carries `legalName` and only
   company-owned `sameAs` profiles.

### Still open (needs account or asset work)

| Priority | Action | Why |
| --- | --- | --- |
| High | Add `https://www.builtbygsv.in` as the homepage and a "Built by BuiltbyGSV" README link on EvoBridge, LocalDrop, LiveClip AI, KAMAYUU, TEMPO and STRIATUM repos; update the `gurugsv7` profile homepage from gurugsv.in | Fastest genuine backlinks you control, from pages people already find through GitHub |
| High | Create a LinkedIn company page and a GitHub organization, then set `brandEntity.linkedin/github` | The schema can then list them in `sameAs`; today the site links personal profiles |
| High | Claim free profiles on GoodFirms, TechBehemoths, Clutch, DesignRush and IndiaMART with identical NAP and a link to `/trust` | Every local competitor ranks through these directories |
| High | Submit the updated sitemap in Search Console and Bing Webmaster Tools; request indexing for the eight new articles | New content is otherwise discovered slowly |
| Medium | Turn EvoBridge, LocalDrop and LiveClip AI into `/projects/...` case studies with the screenshots already in their repos | Open-source tools are the strongest proof of engineering depth on the site |
| Medium | Per-article Open Graph images (they currently use the site cover) | Better click-through when articles are shared on WhatsApp and LinkedIn |
| Medium | Outreach to the Thanjavur and Karaikal "top 10" listicles and to kaaraikarangal.com's footer credit (see the 2026-09-10 strategy) | Local links remain the main ranking gap |
| Low | Post short versions of each article on LinkedIn and Instagram, linking back | Distribution plus branded search signals |

## 3. New content and target queries

| Article | Primary query intent | Supports |
| --- | --- | --- |
| `/insights/use-any-controller-with-ps-remote-play-pc` | Xbox/generic controller with PS Remote Play on PC | EvoBridge |
| `/insights/send-text-and-files-android-to-windows-without-cloud` | Android to Windows clipboard / files without cloud | LocalDrop |
| `/insights/clip-livestream-highlights-into-shorts-locally` | Auto-clip stream highlights into Shorts | LiveClip AI, AI services |
| `/insights/organise-family-medical-records-india` | Organise family medical records, ABHA | MediFace, clinic pages |
| `/insights/who-owns-your-website-domain-hosting-code` | Get a .in domain back from a web designer | Pricing, FAQ |
| `/insights/compare-website-quotes-india` | Compare website quotes / website cost India | Pricing, Karaikal cost guide |
| `/insights/website-speed-on-budget-android-phones` | Slow website on mobile, Core Web Vitals | `/trust`, SEO spoke |
| `/insights/mvp-development-cost-india` | MVP development cost India | Bengaluru MVP spoke, case studies |

Content rules followed: a direct answer first ("The short answer"), honest limits,
claims about our tools restricted to what their READMEs verify, external sources
cited as links, and no fake rankings, reviews or guarantees.

## 4. Second batch (published the same day)

| Article | Primary query intent | Supports |
| --- | --- | --- |
| `/insights/whatsapp-business-app-vs-api-clinics-shops` | WhatsApp Business app vs API, pricing in India | AI automation spokes, clinic pages |
| `/insights/tamil-english-bilingual-website` | Tamil / bilingual website, hreflang | SEO spoke, Thanjavur hub |
| `/insights/gst-invoices-and-payments-in-your-first-web-app` | Payments, subscriptions and GST invoices in an app | SaaS and MVP Bengaluru spokes |
| `/insights/google-business-profile-suspended-fix` | Google Business Profile suspended, appeal | GBP setup guide, SEO spoke |
| `/insights/make-a-hackathon-project-shippable` | Hackathon project to portfolio (students) | `/student`, `/careers` |
| `/insights/move-business-off-excel-and-paper-registers` | Replace Excel / paper registers with software | Custom software spokes |

Figures that change often (WhatsApp per-message rates, RBI e-mandate limits, e-invoicing
thresholds) are stated as dated summaries with sources, and readers are told to confirm
them. Review these three articles every quarter.

The E-CARE case study is deferred: it is a research intervention and needs explicit
approval before any public detail is published.

## 5. Next articles (backlog)

- Clinic appointment systems: what to build versus subscribe to.
- How to brief an AI chatbot project so it does not hallucinate about your business.
- School and coaching-centre fee management, from register to app.
- Cost of maintaining a website after launch (hosting, renewals, updates).

## Sources

- https://m.indiamart.com/codespace-solutions/our-services.html
- https://www.mayankdigitallabs.in/web-developer-karaikal
- https://codeshoppy.pages.dev/web-design-company-in-karaikal
- https://themanifest.com/company/ahsan-solutions
- https://www.goodfirms.co/companies/web-development-agency/puducherry
- https://techbehemoths.com/companies/web-development/puducherry
- https://www.designrush.com/agency/profile/agilesoftlabs
- https://omsoftsolution.com/website-design-company/puducherry
- https://techreviewer.co/companies/cv-world
- https://techreviewer.co/companies/rk-soft-tech-solution
- https://aamax.co/blog/top-10-best-web-design-development-companies-in-thanjavur
- https://codingclave.com/blog/mvp-development-cost-india-2026
- https://echai.ventures/startingup/finding-developers/how-much-should-an-mvp-realistically-cost-to-build-in-india
- https://registry.in/domainnametransfers
- https://link.springer.com/article/10.1186/s12913-026-14314-7
