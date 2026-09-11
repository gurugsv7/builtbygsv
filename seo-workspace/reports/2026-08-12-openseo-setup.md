# OpenSEO setup result

Date: 2026-08-12

## Outcome

- Installed the OpenSEO skill suite persistently for Codex.
- Added `https://app.openseo.so/mcp` to the global Codex configuration and this
  trusted project's `.codex/config.toml`.
- Completed OAuth and verified the hosted connection with `whoami`.
- Created the `BuiltbyGSV` project for `gurugsv.in`, market India, language
  English.
- Confirmed that Google Search Console is not connected.
- Attempted the first 50-page site audit with Lighthouse enabled. OpenSEO did
  not start it and returned HTTP 404 with code `customer_not_found`. The hosted
  account also reported zero credits.

No OpenSEO crawl, backlink, domain, ranking, or keyword result is claimed in
this report.

## Direct production verification

Checked independently against the deployed site after the OpenSEO crawl failed:

- `https://www.gurugsv.in/` returned HTTP 200.
- `https://gurugsv.in/` returned HTTP 308 to the canonical `www` host.
- `/robots.txt` returned HTTP 200, allows crawling, and points to the XML
  sitemap.
- `/sitemap.xml` returned HTTP 200 as XML.
- The home page, web-development service page, Karaikal location page, and a
  Karaikal insight page each returned HTTP 200 with a page-specific title,
  meta description, canonical URL, and one H1 in the server-rendered HTML.

These checks establish availability and basic indexability only. They are not
a substitute for the incomplete OpenSEO crawl or Search Console evidence.

## Continue in this order

1. Provision or activate the hosted OpenSEO customer account so
   `run_site_audit` no longer returns `customer_not_found`.
2. Connect Google Search Console from the BuiltbyGSV project's Search
   Performance page.
3. Run `seo-audit` again. Start with `whoami` and `list_projects`, run one site
   audit, and then read its issues and page evidence.
4. Only after credits are available, obtain the modest backlink/domain and
   keyword data required by the OpenSEO audit workflow.

