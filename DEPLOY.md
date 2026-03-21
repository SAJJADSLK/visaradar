# VisaRadar24 — Deploy Guide
## Cloudflare Workers Static Assets · D1 · KV

---

## Prerequisites

- Node.js 18+ installed
- Cloudflare account (free at cloudflare.com)
- Wrangler CLI: `npm install -g wrangler`
- Login: `wrangler login`

---

## Step 1 — Create D1 database

```bash
wrangler d1 create visaradar24-db
```

Copy the `database_id` from the output. Paste it into `wrangler.jsonc`:
```json
"database_id": "PASTE_YOUR_D1_ID_HERE"
```

Run schema + seed:
```bash
wrangler d1 execute visaradar24-db --file=api/schema.sql
wrangler d1 execute visaradar24-db --file=api/seed.sql
```

---

## Step 2 — Create KV namespace

```bash
wrangler kv:namespace create CACHE
wrangler kv:namespace create CACHE --preview
```

Copy both IDs into `wrangler.jsonc`:
```json
"id": "PASTE_KV_ID_HERE",
"preview_id": "PASTE_KV_PREVIEW_ID_HERE"
```

---

## Step 3 — Replace placeholder values in all files

Search and replace `REPLACE_WITH_PUB_ID` in all HTML files with your Google AdSense publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`). You get this from your AdSense account.

Search and replace `REPLACE_WITH_COOKIEBOT_ID` in `js/shared.js` with your Cookiebot domain group ID (free at cookiebot.com).

Each AdSense `data-ad-slot` value (1111111111, 2222222222, etc.) must be replaced with your actual ad unit IDs from your AdSense account.

---

## Step 4 — Deploy

```bash
wrangler deploy
```

Your site is now live at: `https://visaradar24.workers.dev`

---

## Step 5 — Connect custom domain

In Cloudflare dashboard:
1. Add `visaradar24.com` to your Cloudflare account
2. Go to Workers & Pages → your worker → Settings → Domains
3. Add custom domain: `visaradar24.com` and `www.visaradar24.com`
4. SSL is automatic (Cloudflare manages it)

---

## Step 6 — Submit sitemap to Google

1. Go to Google Search Console (search.google.com/search-console)
2. Add property: `https://visaradar24.com`
3. Verify via Cloudflare DNS TXT record
4. Submit sitemap: `https://visaradar24.com/sitemap.xml`

---

## Step 7 — Apply for AdSense

1. Wait until domain is 3+ months old
2. Ensure About, Contact, Privacy Policy pages are live
3. Go to google.com/adsense and apply
4. Add the AdSense verification `<meta>` tag they give you into the `<head>` of index.html
5. Once approved, replace all `REPLACE_WITH_PUB_ID` placeholders with your real publisher ID

---

## Step 8 — Get Cookiebot (TCF v2.3 compliance)

1. Register at cookiebot.com (free for 1 domain up to 500 pages)
2. Add your domain
3. Copy your Domain Group ID
4. Replace `REPLACE_WITH_COOKIEBOT_ID` in `js/shared.js`

---

## Development (local preview)

```bash
wrangler dev
```

Visit `http://localhost:8787`

---

## File structure

```
visaradar24/
├── index.html          # Homepage + Leaflet map
├── country.html        # Country detail template
├── calculator.html     # Visa calculator
├── compare.html        # Passport comparison
├── border-wait.html    # Live US border waits
├── alerts.html         # Policy alerts + email signup
├── about.html          # About (required for AdSense)
├── privacy.html        # Privacy policy (required)
├── contact.html        # Contact (required)
├── css/
│   └── style.css       # Shared styles
├── js/
│   └── shared.js       # Nav, footer, AdSense, Cookiebot
├── data/
│   └── visa-rules.json # Static visa data (fallback)
├── api/
│   ├── worker.js       # Cloudflare Worker (all /api/* routes)
│   ├── schema.sql      # D1 database schema
│   └── seed.sql        # D1 seed data
├── sitemap.xml
├── robots.txt
└── wrangler.jsonc      # Cloudflare deployment config
```

---

## Monthly maintenance

- Update `data/visa-rules.json` with any rule changes
- Run `wrangler d1 execute visaradar24-db --command="UPDATE visa_rules SET requirement='...' WHERE from_country='XX' AND to_country='YY'"` for targeted updates
- Check Google Search Console for crawl errors
- Monitor AdSense policy notifications in your AdSense account

---

## Revenue milestones (estimated)

| Monthly visitors | Est. AdSense revenue |
|---|---|
| 10,000 | $80–150/mo |
| 50,000 | $400–750/mo |
| 200,000 | $1,600–3,000/mo |
| 1,000,000 | $8,000–15,000/mo |

CPM estimates based on immigration/travel niche ($8–15 CPM).
