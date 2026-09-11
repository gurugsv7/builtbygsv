# Organic search strategy: Karaikal, Thanjavur, Bengaluru

Date: 2026-09-10
Target queries: web developer in Karaikal, AI automation agency Karaikal, and the service+city
variants below. Primary organic competitor: selvainfotech.com.

---

## 1. The constraint that shapes everything

BuiltbyGSV has no physical address and therefore cannot hold a verified Google Business Profile.

Google Business Profile signals are roughly a third of local-pack ranking, and the local pack (the
boxed map result) is only reachable through a verified profile. In the "ai automation agency
karaikal" result, the map card is held by Airbil — a Chennai address. That box is not winnable here.

**The strategy is therefore organic-only: win the blue links.** This is stated plainly so nobody
later spends money chasing a map placement that is structurally unavailable.

Nothing on the site claims an address it cannot verify. A regression test
(`no page claims a street address the studio cannot verify`) fails the build if a `streetAddress`,
`postalCode` or `LocalBusiness` node is ever added to the schema graph.

---

## 2. Competitor assessment: selvainfotech.com

Verified 2026-09-10 by rendering both sites in a browser (JSON-LD is invisible to plain page
fetchers, so an earlier pass of this report understated their schema and overstated their word
count — both corrected below).

### They run two domains for one business

| Domain | Pages | Role |
|---|---|---|
| `selvainfotech.com` | **1** | The page actually ranking #2 for "web developer in karaikal" |
| `selvainfotech.co.in` | 11+ (`/about`, `/Service`, `/Project`, `/software`, `/blog`, `/Career`, `/contact`) | Does not rank for the target queries |

Same business, same phone. Every link, mention and citation they earn is split between two domains.
This is self-inflicted and works in our favour.

### Head-to-head

| Signal | selvainfotech.com | BuiltbyGSV (after this work) |
|---|---|---|
| Indexable pages | **1** (sitemap contains one URL) | 40 |
| Word count on the ranking page | **1,192** | 800-1,000 per page across 40 pages |
| Pages targeting a specific service+city query | 0 | 11 |
| Structured data | FAQPage + LocalBusiness | Organization, Person, Service+Offer, FAQPage, BreadcrumbList, BlogPosting, CreativeWork |
| Published pricing | No | Yes, INR ranges |
| Long-form guides | Homepage previews only | 9 articles |
| Google Business Profile | **Yes** — verified Karaikal address | Not possible |
| NAP consistency | **Inconsistent** — schema says Ibaco Building, Bharathiyar Road; directories say 68 Pudu Nagar, Thomas Arul St | Consistent (no address claimed anywhere) |
| Backlink profile | See below | Thin but clean |

### Their backlink profile is entirely automated spam

A backlinks.live report on `selvainfotech.com` (2026-09-09) returned 21 links and a domain
authority of **0.01**. Every one of the 21 shares:

- the same spun article title, "Boosting Businesses with Digital Marketing in Karaikal"
- the same index date, 2026-04-01
- machine-generated subdomains (`luluildh706989`, `myahmlr495586`, `carlynano796536`, ...)
- free auto-blog hosts: activoblog.com, aboutyoublog.com, blog-gold.com, mpeblog.com, blog5.net,
  blogdigy.com, pointblog.net
- generic anchors: "website", "read more", "here", "click here", "more info"

This is a single automated blog-network blast, almost certainly from MoneyRobot (the tool
backlinks.live advertises). The high "DA 81-88" figures shown per link are the root free-blog
platform's authority, not the spam subdomain's. Google has discounted these networks for over a
decade, and their own DA of 0.01 reflects it.

Caveat: backlinks.live has a small index, so 21 found does not prove 21 exist. The informative part
is that everything surfaced was spam with no legitimate links mixed in.

### Conclusion

**Their moat is the Google Business Profile, not links and not content.** They rank on a verified
local entity, domain history since 2019, and an exact-match title tag — against weak competition
where three of the top four results are directories (Justdial, Sulekha).

This revises the earlier assessment in section 5: the link gap is far smaller than assumed. A
handful of genuine local links (see section 6) would put BuiltbyGSV ahead of them on that dimension
outright. **Do not imitate their link strategy** — it did not work for them, and an automated
footprint on a young clean domain risks a manual action.

---

## 3. What was built

### Architecture: hub and spoke

Existing city hubs kept at their current URLs (no redirects, no lost equity), each now linking to
its spokes:

- `/web-software-developer-karaikal` — broad "web developer in Karaikal" intent
- `/web-software-developer-thanjavur`
- `/web-software-developer-bengaluru`

**11 new service-area spokes**, each owning one query the hub does not target:

| Path | Target query |
|---|---|
| `/ai-automation-agency-karaikal` | ai automation agency karaikal |
| `/ecommerce-website-development-karaikal` | ecommerce website development karaikal |
| `/seo-services-karaikal` | seo services karaikal |
| `/custom-software-development-karaikal` | software company / billing software karaikal |
| `/clinic-website-development-karaikal` | clinic & hospital website karaikal |
| `/ai-automation-agency-thanjavur` | ai automation agency thanjavur / tanjore |
| `/custom-software-development-thanjavur` | custom software thanjavur |
| `/ecommerce-website-development-thanjavur` | ecommerce website development thanjavur |
| `/mvp-development-company-bengaluru` | mvp development company bangalore |
| `/saas-development-company-bengaluru` | saas development company bangalore |
| `/ai-automation-agency-bengaluru` | ai automation agency bangalore |

**3 reference pages:** `/pricing`, `/faq`, `/compare/freelance-developer-vs-web-development-agency`.

**5 new articles:** AI automation for small businesses, why one-page sites stop ranking, Thanjavur
digital checklist, MVP scope mistakes, Google Business Profile setup.

### Anti-cannibalisation

Deliberately **not** built: a `/web-development-company-karaikal` page. It would target
substantially the same query as the existing Karaikal hub, and two pages splitting one intent rank
worse than one. Each spoke covers a service the hub does not.

A test asserts every title and meta description across all 40 pages is unique.

### Anti-thin-content

Programmatic location pages fail when they are one template with a swapped city name — Google
classifies that as doorway pages. Every spoke therefore carries:

- A `localContext` block of 4 claims that would be **factually wrong on any other city's page**
  (WhatsApp-first enquiries and Tamil mixed-language input in Karaikal; back-office purchase and
  dispatch load and multi-branch operations in Thanjavur; multi-currency billing and per-tenant AI
  cost in Bengaluru).
- Service-specific deliverables, price bands and 5 FAQs written for that combination.
- Roughly 800–1,000 words of genuinely distinct copy.

### Answer-engine optimisation

Every new page opens with a 40–90 word answer block, structurally isolated, containing the direct
answer to its query. ChatGPT, Perplexity and AI Overviews lift these near-verbatim. A test enforces
the word range.

`/llms.txt` is generated at build time with the full site map and each page's answer block.

### Technical fixes

| Fix | Why it mattered |
|---|---|
| **OG image switched from SVG to PNG** | Google, WhatsApp, Facebook, LinkedIn and X all refuse to render SVG Open Graph images. Every share of this site was previously showing no preview image. In this market WhatsApp sharing matters more than any other channel. Generated at build from the SVG source. |
| **Duplicate `@id` collision in JSON-LD fixed** | Service-area pages emitted two `BreadcrumbList` nodes with the same `@id`, which invalidates the graph. Now deduped. |
| **Sitemap generated from source** | Was hand-maintained and could silently drift. Now emitted by the prerenderer from the same page list it just rendered, so a page cannot ship without appearing in it. |
| **FAQPage + BreadcrumbList schema** | 14 pages now eligible for FAQ and breadcrumb rich results. |
| **Service + Offer schema with INR price bands** | Local pricing intent, per the decision to show INR on India-facing pages. |
| **React split into its own chunk** | 193 kB of framework no longer re-downloaded on every content change. |
| **Internal linking** | Homepage → hubs → spokes → back. Tests assert no orphans and no broken internal links. |

### Test coverage added

10 new regression tests: path uniqueness, title/description uniqueness (cannibalisation guard),
internal-link resolution, orphan detection, answer-block length, schema shape, the no-fake-address
assertion, and a guard that review schema is never emitted while `testimonials` is empty.

`npm run check` — 18 tests passing, typecheck clean, 40 pages prerendered.

---

## 4. What I deliberately did not do

**No fabricated testimonials or review schema.** You said you can supply real client quotes. The
`testimonials` array in `src/contentPages.ts` is empty and a test enforces that review schema stays
absent until it is filled. Invented reviews violate Google's structured-data policy and risk a
manual action — a far larger cost than the ranking benefit.

**Send me the real quotes** (name, role, business, date) and I will wire the testimonials section
and `Review` / `AggregateRating` schema. This is the largest remaining on-site gap versus
Selvainfotech, who display testimonials and carry Justdial and Sulekha ratings.

**No Thaai Clinic hard-proof expansion yet.** You confirmed it is a real live client. If you can
share the live URL and any before/after numbers (enquiry volume, no-show rate, load time), that case
study becomes the strongest local ranking asset on the site — a real named Karaikal client is
something no amount of copy substitutes for.

---

## 5. Realistic expectations

- **Weeks 2–6:** new pages appear in Search Console impressions for queries the site previously had
  none for. Watch impressions, not positions.
- **Months 3–6:** position movement on competitive city queries. Long-tail spokes
  (`ai automation agency karaikal`, `clinic website karaikal`) will move well before head terms.
- **Head terms** (`web developer in karaikal`): more winnable than first assumed, now that the
  competitor's link profile is known to be automated spam scoring 0.01. Content plus a handful of
  genuine local links should compete within 6-12 months. The remaining gap is their Google Business
  Profile and domain history, not authority from links.

Domain age is not itself a ranking factor. It correlates with accumulated links, citations and
query history — and in this case that accumulation turns out to be mostly absent.

No one can guarantee a position. The measurable commitment is impressions and position movement in
your own Search Console property.

---

## 6. What you must do — I cannot do these from the repository

Ordered by impact.

1. **Submit the new sitemap in Google Search Console.** `https://builtbygsv.in/sitemap.xml`.
   Then request indexing on the 11 spokes and 3 reference pages individually. Without this they may
   take weeks to be discovered.
2. **Send me real testimonials.** Largest remaining on-site gap. See section 4.
3. **Build local citations.** Since GBP is closed to you, directory listings are how you build the
   local entity signal instead: Justdial, Sulekha, IndiaMART, Clutch, GoodFirms, Bing Places
   (service-area), LinkedIn company page. Use identical name, phone and email everywhere —
   consistency is the signal.
4. **Get the first real backlinks.** Lower bar than expected — the competitor's entire profile is
   automated spam scoring 0.01, so a small number of genuine local links overtakes them outright.
   Confirmed opportunities, in order:

   - **kaaraikarangal.com** already credits "Developed by Guru, SnapLearnKkl" in its footer, **but
     as plain text, not a hyperlink**. A text mention passes nothing. Two-minute fix:
     `Developed by <a href="https://builtbygsv.in/">BuiltbyGSV</a>, SnapLearnKkl`.
     High value: registered Karaikal NGO (Reg. 31/2025), real local address, Tamil content.
   - **thaaiclinic.com** is currently a hero-only splash page with zero `<a>` tags and no footer.
     Adding a footer credit requires the client to extend the page first.
   - "The Striatum" and other city projects — domain not yet supplied.

   Vary the anchor text. Brand anchors ("BuiltbyGSV", "Gurusabarivasan") on most; at most one
   descriptive anchor. Exact-match "web developer in Karaikal" across every client footer is an
   obvious footprint. Do not nofollow these — they are legitimate editorial credits.

   These are self-owned client sites, so they are a weak *editorial* vote. Their value is local
   relevance and entity association, which is the closest available substitute for the GBP
   citations that are closed to this business.

   **Never use MoneyRobot or any automated link tool.** See section 2.
5. **Reconsider the address question.** If you ever operate from a registered business address —
   including a co-working desk you genuinely occupy — a Google Business Profile becomes available
   and the map pack opens up. It is worth revisiting, because it is the single largest local factor
   and it is currently the only one closed to you. Do not fake it; Google verifies by postcard,
   video or phone and removes listings built on false addresses.
6. **Run Lighthouse against production.** Core Web Vitals should be measured on the deployed site
   with real headers, not inferred from a local build.

---

## 7. Files changed

**New:** `src/serviceAreas.ts`, `src/contentPages.ts`, `src/components/ServiceAreaContent.tsx`,
`scripts/og-image.ts`, `public/og-cover.png`, `public/llms.txt`.

**Modified:** `src/seo.ts` (shared schema builders), `src/SiteRouter.tsx` (routing + schema),
`src/blog.ts` (5 articles), `src/components/SeoContent.tsx` (hub→spoke links),
`scripts/prerender.ts` (new pages, generated sitemap and llms.txt, schema dedupe),
`public/sitemap.xml` (now generated), `index.html` (OG PNG + dimensions), `vite.config.ts`
(chunking), `package.json`, `tests/repository.test.ts`.

**Skills used:** `seo-audit`, `programmatic-seo`, `ai-seo`, `seo` — installed via
`npx skills add` from skills.sh.
