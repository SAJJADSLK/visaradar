# VisaRadar24 — Deployment Guide

## Stack
- **Frontend:** Pure HTML + CSS + JS (static)
- **Backend:** Cloudflare Workers (free tier, 100k req/day)
- **Hosting:** Cloudflare Pages (free tier)
- **Data:** US CBP public API + curated JSON + embassy RSS feeds

---

## Step 1 — Deploy the Worker

1. Go to [workers.cloudflare.com](https://workers.cloudflare.com) → Create Worker
2. Paste the contents of `workers/api-worker.js`
3. Deploy → copy your worker URL (e.g. `https://visaradar24-api.yourname.workers.dev`)

---

## Step 2 — Update Worker URL in HTML files

Replace `https://your-worker.your-subdomain.workers.dev` in these files:
- `index.html` (line with `const WORKER=`)
- `pages/alerts.html`
- `pages/border-wait.html`

---

## Step 3 — Deploy to Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com) → Create Project
2. Connect your GitHub repo (push this folder to GitHub first)
   - OR use **Direct Upload** (drag and drop the folder)
3. Build settings: **None** (it's already static HTML)
4. Deploy → your site is live at `your-project.pages.dev`
5. Add custom domain `visaradar24.com` in Pages settings

---

## Step 4 — Add Google AdSense

1. Apply at [google.com/adsense](https://google.com/adsense)
2. Once approved, get your publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)
3. Uncomment the AdSense script tag at the bottom of each HTML file
4. Replace `.ad-slot` divs with real `<ins class="adsbygoogle">` tags

**Ad slot template:**
```html
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

---

## Step 5 — Submit to Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → verify via DNS (Cloudflare makes this easy)
3. Submit `https://visaradar24.com/sitemap.xml`

---

## File Structure

```
visaradar24/
├── index.html              ← Homepage + world map
├── sitemap.xml
├── robots.txt
├── css/
│   └── style.css           ← Shared styles
├── data/
│   └── visa-data.json      ← Visa requirements data
├── pages/
│   ├── calculator.html     ← Visa calculator
│   ├── compare.html        ← Passport comparison
│   ├── alerts.html         ← Live policy alerts
│   ├── border-wait.html    ← Border wait times
│   ├── about.html          ← About (AdSense required)
│   ├── privacy.html        ← Privacy policy (AdSense required)
│   └── contact.html        ← Contact (AdSense required)
└── workers/
    └── api-worker.js       ← Cloudflare Worker (deploy separately)
```

---

## Revenue Milestones

| Traffic | Est. Monthly Revenue |
|---|---|
| 10k sessions/mo | $100–300 |
| 50k sessions/mo | $500–1,500 |
| 200k sessions/mo | $2,000–6,000 |
| 500k sessions/mo | $5,000–15,000 |

CPM for immigration/visa niche: **$80–150** (highest tier)

---

## Phase 2 Upgrades (after launch)

- [ ] Add email alerts via Resend.com (free tier)
- [ ] Add country detail pages (country.html template × 195)
- [ ] Expand visa data JSON to all 195 countries
- [ ] Add Schengen calculator
- [ ] Add Google Analytics
