# BuiltbyGSV API worker

Website enquiries and first-party, cookieless analytics on Cloudflare's free tier
(Workers: 100,000 requests/day; D1: 5 GB storage, 5 million rows read/day).

| Route | What it does |
| --- | --- |
| `POST /enquiry` | Validates and stores a project brief or quick message, returns a reference such as `BG-261127-K7QM` |
| `POST /event` | Records a page view or conversion (`whatsapp_click`, `call_click`, `brief_submitted` and so on) |
| `GET /stats?days=30` | Visitors, views, conversions, top pages, referrers, devices and enquiry counts |
| `GET /enquiries?status=new&limit=50` | Recent enquiries with all answers |
| `GET /health` | Liveness |

`/stats` and `/enquiries` need `Authorization: Bearer <STATS_TOKEN>`.

Spam protection: origin allow-list, a hidden honeypot field, a minimum fill time, size
limits and five enquiries per hour per (hashed) connection. No cookies, no raw IP
addresses, and visitor hashes rotate daily.

## Deploy (one time)

```bash
cd worker && npm ci
npx wrangler login                       # or set CLOUDFLARE_API_TOKEN
npx wrangler d1 create builtbygsv         # copy the database_id into wrangler.toml
npm run db:migrate:remote
npx wrangler secret put IP_SALT           # any long random string
npx wrangler secret put STATS_TOKEN       # long random string; keep it private
npm run deploy                            # prints https://builtbygsv-api.<account>.workers.dev
```

Then set `VITE_API_BASE` to that URL in `.env.production` (or the hosting provider's
environment settings) and redeploy the website. The site's CSP already allows
`*.workers.dev` and `api.builtbygsv.in`.

## Reading the data

```bash
curl -H "Authorization: Bearer $STATS_TOKEN" https://builtbygsv-api.<account>.workers.dev/stats?days=30
curl -H "Authorization: Bearer $STATS_TOKEN" https://builtbygsv-api.<account>.workers.dev/enquiries?status=new
npx wrangler d1 execute builtbygsv --remote --command "UPDATE enquiries SET status='contacted' WHERE reference='BG-...'"
```

## Telegram alerts (optional, later)

1. Message @BotFather on Telegram, create a bot and copy its token.
2. Send your bot any message, then open `https://api.telegram.org/bot<TOKEN>/getUpdates` to find your chat id.
3. `npx wrangler secret put TELEGRAM_BOT_TOKEN` and `npx wrangler secret put TELEGRAM_CHAT_ID`.

New enquiries then arrive as Telegram messages. No code change or redeploy is needed.

## Local development

```bash
printf 'IP_SALT=dev\nSTATS_TOKEN=devtoken\n' > .dev.vars
npm run db:migrate:local && npm run dev          # http://localhost:8787
# in the site: VITE_API_BASE=http://localhost:8787 VITE_ANALYTICS_DEBUG=true npm run dev
```
