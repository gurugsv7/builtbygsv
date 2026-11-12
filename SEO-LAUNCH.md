# BuiltbyGSV SEO launch checklist

The repository is configured with `https://www.builtbygsv.in` as the canonical origin.

## Vercel and DNS

1. Import this repository into Vercel and keep the detected **Vite** framework preset.
2. Confirm the build command is `npm run build` and output directory is `dist`.
3. Set `www.builtbygsv.in` as the primary Vercel domain and redirect `builtbygsv.in` to it. The repository includes a host redirect preserving the path.
4. Add both `gurugsv.in` and `www.gurugsv.in` as aliases so the repository redirect rules can preserve paths.
5. Apply the DNS records Vercel shows for the apex and `www` host. DNS values are account-specific, so they are intentionally not hard-coded here.

## Google indexing

1. Add and verify `builtbygsv.in` in Google Search Console. This is not completed by the repository change.
2. Submit `https://www.builtbygsv.in/sitemap.xml`.
3. Inspect the homepage, `/trust`, `/projects`, priority service pages and all three location pages; request indexing after their live inspections pass. Requesting indexing is not a guarantee of indexing or ranking.
4. Create or update a Google Business Profile only for a real, eligible business location. Do not create virtual offices or duplicate city listings.
5. Keep GitHub, LinkedIn and other public profiles consistent with the same name variants used on the site: BuiltbyGSV, GuruGSV, Guru GSV and Gurusabarivasan M.

## Content needed next

Add verified information before expanding the Gurusabarivasan/GuruGSV personal entity further:

- professional headshot and short biography;
- years of experience and verified qualifications;
- client-approved testimonials and case-study links;
- business address only if it is public and genuinely staffed.

## Automated safeguards and evidence

- `npm run check` verifies types, repository tests, the production build and the generated SEO output.
- `npm run check:seo` checks every sitemap page for its self-canonical URL, unique title, description, initial HTML heading, valid JSON-LD, breadcrumbs and valid internal links.
- Sitemap modification dates are emitted only where an explicit content date is available; rebuilds do not imply that every page changed.
- `/trust` publishes issued registration identifiers and dated Lighthouse reports. Current government-portal status must be checked separately. Registration does not certify service quality.
- `npm run audit:websites` refreshes public mobile and desktop lab reports. Personal experiments such as Neon Rail are excluded. Audit reports are noindex and are not search rankings.
- Search engines and OAI-SearchBot can crawl the site. CDN/firewall access and Search Console ownership still need account-level verification; neither is established by robots.txt alone.
- After deployment, inspect page HTML, redirects, sitemap, robots.txt, images and report response headers. Review Search Console indexing and performance reports as data becomes available.

## Ranking expectations

Technical SEO makes the site understandable and indexable; it cannot guarantee a first-place Google result. Branded queries usually improve fastest after the domain is indexed and consistent profiles link back to it. Competitive city terms also need genuine reviews, citations/backlinks, strong case studies and ongoing useful content.
