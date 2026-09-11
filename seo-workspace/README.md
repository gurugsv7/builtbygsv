# BuiltbyGSV SEO workspace

Updated: 2026-08-12

This folder keeps durable SEO context, first-party exports, keyword work,
competitor notes, content briefs, outreach material, and reports beside the
website source. OpenSEO workflows should use this context instead of starting
from a blank conversation.

## Setup status

| Step | Status | Notes | Next action |
| --- | --- | --- | --- |
| Working folder | Complete | `seo-workspace/` in the website repository | Keep future SEO artifacts in the folders below |
| Primary site | Complete | `https://builtbygsv.in` | Confirm DNS, SSL and old-domain redirects after deployment |
| Site inventory | Complete | App, service, project, location, and insight routes are represented in `public/sitemap.xml` | Keep sitemap, route metadata, and prerender output synchronized |
| OpenSEO skills | Complete | OpenSEO's reusable Codex skills are installed in the user skill directory | Restart or reopen Codex before relying on automatic skill discovery |
| OpenSEO MCP | Complete | The hosted endpoint is configured globally and for this trusted project; OAuth and `whoami` succeeded | Keep the connection enabled for future workflows |
| OpenSEO project | Complete | `BuiltbyGSV` exists for the migrated site, using India (`2356`) and English (`en`) | Use `list_projects` to resolve its ID rather than storing IDs in repository files |
| OpenSEO account | Blocked | The hosted account reports zero credits, and `run_site_audit` returned `customer_not_found` | Activate/provision the OpenSEO customer account, then retry the crawl |
| Search Console | Not connected | OpenSEO returned `not_connected`; no CSV export is present | Connect GSC from the project's Search Performance page or add exports under `gsc/` |
| Production basics | Verified | The canonical host, bare-domain redirect, robots file, sitemap, and four representative prerendered pages were checked on 2026-08-12 | Recheck after deployment or routing changes |
| Goals and metrics | Proposed | Qualified service enquiries are the apparent primary conversion; organic visibility for commercial and local-intent pages is secondary | Confirm targets and a 90-day baseline after GSC is connected |
| Positioning | Inferred | Independent product studio led by Gurusabarivasan M, offering web development, custom software, AI solutions, and automation | Confirm ideal customer size, strongest differentiator, exclusions, and known competitors |

## Scope currently inferred from the repository

- Brand: BuiltbyGSV, also presented as GuruGSV / Gurusabarivasan M.
- Primary market: India, with local landing pages for Karaikal, Bengaluru, and
  Thanjavur/Tanjore.
- Published language: English (`en-IN`); Tamil is listed as a contact language,
  but there are no Tamil content routes.
- Publishing workflow: source-controlled React + TypeScript application,
  statically prerendered by Vite/Node and deployed through Vercel.
- Commercial topics: website development, custom software development, AI
  solutions, business automation, and technical/local SEO.
- Existing content assets: three case studies, four service pages, three local
  landing pages, and three Karaikal-focused insight articles.

## Proposed measurement baseline

These are working assumptions until business goals and Search Console data are
available:

1. Track qualified email/project enquiries from organic landing pages.
2. Track non-branded clicks and impressions to service and location pages.
3. Track how many target commercial queries reach positions 1-10 and 11-20.
4. Review conversions and search visibility monthly, with a first 90-day goal
   set only after the baseline is known.

## Folder guide

- `gsc/`: Google Search Console exports. CSV files are intentionally ignored by
  Git because first-party performance data may be sensitive.
- `keywords/`: research exports, clusters, and page mappings.
- `competitors/`: market and competitor notes.
- `content/`: briefs, drafts, refresh notes, and content inventories.
- `outreach/`: backlink prospects and outreach drafts.
- `reports/`: dated audit and progress reports.

## First OpenSEO workflow

Resume `seo-audit` after the hosted account is provisioned. The workflow must
begin with `whoami` and `list_projects`, then crawl `www.gurugsv.in`. Do not
infer OpenSEO backlink, ranking, keyword-volume, or Search Console results from
source code.

See `reports/2026-08-12-openseo-setup.md` for the verified setup result and the
exact continuation steps.
