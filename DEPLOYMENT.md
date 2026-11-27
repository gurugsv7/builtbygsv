# Hosting on Cloudflare Pages

The site is static (every page is prerendered), so it runs on Cloudflare Pages' free
plan, which allows commercial use. `npm run build:pages` builds the site and converts
`vercel.json` into Pages' `_headers` and `_redirects`, so `vercel.json` stays the single
source of truth for both hosts.

Verified locally with `wrangler pages dev`: all 71 sitemap URLs return 200 without
trailing-slash redirects, `/about/` and `/about.html` redirect to `/about`, unknown paths
return the custom 404, security headers and the audit-report CSP match Vercel, and all
path redirects work.

## Moving from Vercel (about 30 minutes, no downtime)

### 1. Put the domain on Cloudflare DNS (free)

1. Cloudflare dashboard → **Add a domain** → `builtbygsv.in` → Free plan.
2. Cloudflare scans existing DNS records. **Check that the MX and TXT records for
   admin@builtbygsv.in email were imported**; add any that are missing before continuing.
3. At your domain registrar, replace the nameservers with the two Cloudflare shows.
   Propagation usually takes minutes to a few hours. The site keeps working on Vercel meanwhile.

### 2. Create the Pages project from GitHub

Workers & Pages → **Create** → **Pages** → **Connect to Git** → `gurugsv7/builtbygsv`:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build:pages` |
| Build output directory | `dist` |
| Environment variable | `NODE_VERSION` = `22` |

Every push to `main` then deploys automatically, and other branches get preview URLs.

### 3. Switch the domain

1. Pages project → **Custom domains** → add `www.builtbygsv.in`, then `builtbygsv.in`.
2. Zone → **Rules → Redirect Rules** → template **"Redirect from root to WWW"**
   (301, preserve path and query).
3. If `gurugsv.in` is also moved to Cloudflare: a redirect rule sending every request
   to `https://www.builtbygsv.in/${path}` with 301.
4. Open the site, check a few pages, then remove the domains from the Vercel project.

### 4. Optional

- Give the API worker a custom domain `api.builtbygsv.in` (Worker → Settings → Domains),
  then update `.env.production` and the CSP `connect-src` in `vercel.json`.
- Turn on **Web Analytics** for the zone, which is free and needs no script, for an extra traffic view.
