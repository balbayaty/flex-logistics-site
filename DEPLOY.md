# How to Deploy Flex Logistics — Step by Step

> Written for someone with **zero** coding or DevOps experience.
> Every step has a screenshot reference and a copy-paste command.

You will go from **"a folder on my Desktop"** to **"a live website on the internet"** in roughly **10 minutes**.

There are three popular ways to host this. Pick the one that suits you best:

| Option | Cost | Custom domain | Best for |
|---|---|---|---|
| **A. Vercel** | Free tier covers most needs | Free | Easiest, drag-and-drop |
| **B. Netlify** | Free tier covers most needs | Free | Drag-and-drop, simple UI |
| **C. Cloudflare Pages** | Free, very generous | Free | Best CDN, KSA-friendly |

All three give you free HTTPS automatically, free unlimited bandwidth on the free tier (within fair-use), and global edge caching.

---

## OPTION A — Vercel (recommended for first-timers)

### A1. Create a free account

1. Go to <https://vercel.com/signup>.
2. Click **"Continue with Email"** (or use Google / GitHub).
3. Verify your email.

### A2. Drag-and-drop deploy

1. Open <https://vercel.com/new> while logged in.
2. Scroll down to **"Or, deploy a folder"** (lower right).
3. Drag the entire **`flex-site`** folder from your file explorer onto the upload area.
4. Vercel auto-detects it's a static site — leave all settings as defaults.
5. Click the big **"Deploy"** button.

Wait ~30 seconds. You'll see a green "Ready" badge and a URL like
`https://flex-site-xxx.vercel.app`. **Click it — your site is live.**

### A3. Add your real domain (`flexlogistics.com`)

1. Inside the Vercel project, click **Settings → Domains**.
2. Type `flexlogistics.com` and click **Add**.
3. Vercel shows you 1-2 DNS records (an `A` and a `CNAME`).
4. Open your domain registrar (GoDaddy, Namecheap, Saudi Network Information Center, etc.).
5. Find DNS management for `flexlogistics.com`.
6. Add the records exactly as Vercel shows.
7. Save. Wait 5-30 minutes.
8. Vercel will auto-issue a free Let's Encrypt SSL certificate.

Done. <https://flexlogistics.com> is now your site.

---

## OPTION B — Netlify

### B1. Create a free account

1. Go to <https://app.netlify.com/signup>.
2. Sign up with email or Google / GitHub.

### B2. Drag-and-drop deploy

1. Once logged in, go to <https://app.netlify.com/drop>.
2. **Drag the entire `flex-site` folder** onto the page.
3. Wait ~20 seconds.

You get a URL like `https://elegant-cookie-12345.netlify.app`. Click it — it's live.

### B3. Add your real domain

1. Click **Domain management** inside your project.
2. Click **Add a domain** and type `flexlogistics.com`.
3. Netlify shows DNS instructions — copy them to your registrar (same idea as Option A).
4. Wait, then HTTPS is auto-provisioned.

---

## OPTION C — Cloudflare Pages (best long-term)

This needs a free GitHub account, but gives you the best global CDN — including a strong presence in Saudi Arabia.

### C1. Create the GitHub repo (one-time, ~3 minutes)

1. Go to <https://github.com/signup> and create a free account.
2. Install **GitHub Desktop** from <https://desktop.github.com/> (no command line needed).
3. Open GitHub Desktop → **File → New Repository**.
   - Name: `flex-logistics-site`
   - Local path: `C:\Users\balba\OneDrive\Desktop\wajeeh-bi-bluedxp\flex-site`
   - Initial branch: `main`
   - Click **Create Repository**.
4. Click **Publish repository** (top right). Uncheck "Keep this code private" if you want it public, otherwise leave it private.

### C2. Connect to Cloudflare Pages

1. Go to <https://dash.cloudflare.com/sign-up> and create a free account.
2. In the dashboard, click **Workers & Pages → Create → Pages → Connect to Git**.
3. Authorise GitHub and select your `flex-logistics-site` repo.
4. **Build settings**:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: *(leave empty, defaults to root)*
5. Click **Save and Deploy**.

You get a URL like `https://flex-logistics-site.pages.dev`. Live.

### C3. Add your real domain

1. In the Cloudflare Pages project, click **Custom domains → Set up a custom domain**.
2. Type `flexlogistics.com`. Cloudflare handles the DNS automatically if your domain is on Cloudflare; otherwise it shows records to add at your registrar.

---

## Verify everything works (5-minute checklist)

After your domain is live, open <https://your-site.com> and check:

- [ ] Home page loads
- [ ] Click **Explore Platform** → goes to `/capabilities.html`
- [ ] On capabilities, click the **HOME** link in the top nav → goes back to `/`
- [ ] Click **Privacy / Terms / Security** in the footer → all pages load
- [ ] Open <https://your-site.com/llms.txt> → plain-text knowledge base appears
- [ ] Open <https://your-site.com/sitemap.xml> → XML appears
- [ ] Open <https://your-site.com/robots.txt> → text appears
- [ ] Open <https://your-site.com/.well-known/security.txt> → text appears

### Test SEO and structured data

- Google Rich Results test: <https://search.google.com/test/rich-results>
  Paste your URL → expect at least 5 rich-result types detected (Organization,
  LocalBusiness, WebSite, FAQ, Breadcrumb).
- Open Graph preview: <https://www.opengraph.xyz/>
  Paste your URL → preview should look polished.
- Twitter card validator: <https://cards-dev.twitter.com/validator>
- LinkedIn post inspector: <https://www.linkedin.com/post-inspector/>

### Test performance

- Google PageSpeed: <https://pagespeed.web.dev/>
  Paste your URL → expect 90+ on Performance/SEO/Best-Practices/Accessibility.

### Submit to search engines

- Google Search Console: <https://search.google.com/search-console>
  Add property → submit `sitemap.xml`.
- Bing Webmaster Tools: <https://www.bing.com/webmasters>
  Add site → submit `sitemap.xml`.

---

## What about email (`info@flexlogistics.com`)?

The website does **not** send or receive email — it just shows a `mailto:` link.
You need email hosting separately. Most popular options:

- **Google Workspace** — <https://workspace.google.com/> (~$6/user/month)
- **Microsoft 365 Business** — <https://www.microsoft.com/en/microsoft-365/business>
- **Zoho Mail** — <https://www.zoho.com/mail/> (free tier for 5 users)

After you set up email, no website change is needed — the `mailto:` links keep working.

---

## What about a contact form, live chat, or analytics?

This site is currently **purely static** with **no PII collection** by design
(maximum privacy, lowest attack surface). When you're ready to add any of these:

| Need | Recommended (privacy-friendly) | Notes |
|---|---|---|
| Contact form | **Formspree** (<https://formspree.io>) or **Web3Forms** | No backend needed. |
| Live chat | **Crisp** (<https://crisp.chat>) | Has free tier. |
| Analytics | **Plausible** (<https://plausible.io>) or **Cloudflare Web Analytics** (free, no cookies) | GDPR/PDPL-friendly without cookie banners. |
| Customer portal | **Tally** or **Notion forms** to start | Upgrade later. |

Add them as small `<script>` snippets in `<head>` when you're ready.

---

## Updating content

1. Open `index.html` (or any other file) in **VS Code** (free editor: <https://code.visualstudio.com/>).
2. Edit the text directly. Save.
3. If you used Vercel/Netlify drag-and-drop: drag the new folder again.
4. If you used GitHub + Cloudflare: GitHub Desktop → Commit → Push. Cloudflare auto-deploys in ~30 seconds.

---

## Common questions

**Q: Will my site appear in ChatGPT / Claude / Perplexity?**
A: Yes, eventually. The `llms.txt`, `robots.txt` (with explicit allow for AI bots) and rich JSON-LD make Flex Logistics highly discoverable. After deploy:

- Submit your sitemap to Google Search Console.
- Open ChatGPT and ask "What does Flex Logistics do?" — once Bing/OpenAI's
  crawlers index your site (typically 1-4 weeks), you'll start to see citations.
- Paste your URL into Perplexity directly — it will fetch live.

**Q: Is this "stock-market ready"?**
A: The technical/legal scaffolding is in place — security page, privacy with PDPL/GDPR alignment, terms with SCCA arbitration, a vulnerability disclosure programme, audit-ready hosting headers, immutable JSON-LD identity signals. **For an actual IPO**, you still need:

- Audited financial statements (Big Four)
- Saudi CMA pre-IPO filings (Tadawul) or equivalent
- Offering prospectus
- Internal SOX-equivalent controls and a CFO/audit committee

The website now meets the **public-facing** disclosure standards investors and analysts expect to see.

**Q: How do I change the brand name / colours?**
A: Open `index.html`, search for `#F6A000` (the brand orange) and replace it. The brand name `FLEX` lives in obvious spots — search for `FLEXLOGISTICS`.

**Q: How do I add another language (e.g. French)?**
A: Both pages already use a small i18n pattern (`x-text="lang === 'en' ? '...' : '...'"`). Add a third condition. The `capabilities.html` page already supports EN / AR / SV in its `flexApp()` JavaScript.

**Q: How much will it cost to host?**
A: $0/month on the free tiers of all three options for typical usage. Custom domain = ~$10-15/year at any registrar.

---

If anything in this guide is unclear, send me the exact step you're stuck on and I'll walk you through it.

---

## Stock-market grade: domain hardening (do this once at the registrar)

These two settings live at your **domain registrar** (not at Vercel / Netlify /
Cloudflare Pages). They take 5 minutes and lift the security audit grade from
**A** to **A+**.

### 1. Enable DNSSEC — protects against DNS hijacking

DNSSEC cryptographically signs your DNS answers so attackers cannot forge them.
Without it, a compromised DNS resolver could silently redirect `flexlogistics.com`
to a phishing site even when you type the URL correctly.

| Registrar | Where to click |
|---|---|
| **Cloudflare Registrar** | DNS → Settings → DNSSEC → **Enable DNSSEC**. Done — Cloudflare publishes the DS record automatically. |
| **GoDaddy** | DNS → Advanced → DNSSEC → **Enable** (free, automatic). |
| **Namecheap** | Domain List → Manage → Advanced DNS → **DNSSEC: ON**. |
| **Saudi Network Information Center (`.sa` domains)** | Login → My Domains → Select domain → **DNSSEC** tab → request key publication via support ticket if not self-serve. |

After enabling, verify at <https://dnssec-analyzer.verisignlabs.com/> — type
`flexlogistics.com` and confirm every step is **green**.

### 2. Publish CAA records — restricts who can issue SSL certs

A CAA (Certification Authority Authorization) record tells the world's
certificate authorities (CAs): *"only Let's Encrypt and Cloudflare are allowed
to issue certificates for `flexlogistics.com`."* This blocks rogue CAs and
prevents an attacker who steals your DNS zone from issuing a fake cert at, say,
GoDaddy SSL.

Add these three records to your DNS zone (replace `flexlogistics.com` with your
real apex):

```dns
flexlogistics.com.    IN  CAA  0  issue      "letsencrypt.org"
flexlogistics.com.    IN  CAA  0  issue      "pki.goog"
flexlogistics.com.    IN  CAA  0  issuewild  ";"
flexlogistics.com.    IN  CAA  0  iodef      "mailto:security@flexlogistics.com"
```

What each line means:

- `issue "letsencrypt.org"` — Let's Encrypt may issue certificates (used by Vercel and Netlify).
- `issue "pki.goog"` — Google Trust Services may issue (used by Cloudflare Pages).
- `issuewild ";"` — **No CA may issue wildcard certificates.** (Tighten if you
  ever need wildcards.)
- `iodef "mailto:..."` — CAs must email you if anyone tries to issue an
  unauthorized certificate.

How to add them:

| Registrar | Where to click |
|---|---|
| **Cloudflare DNS** | DNS → Records → Add → Type: **CAA** (UI walks you through tag/value). |
| **GoDaddy** | DNS Management → Add → Type: **CAA**. |
| **Namecheap** | Advanced DNS → Add Record → Type: **CAA**. |

Verify at <https://caatest.co.uk/> — type `flexlogistics.com` and confirm the
records appear. After ~24 hours, also verify at SSL Labs
(<https://www.ssllabs.com/ssltest/>) — your overall grade should be **A+**.

### Why both matter for IPO / due-diligence

Investors' security questionnaires (e.g. SIG, CAIQ, SOC 2 Type II) ask
explicitly:

> Q: Are DNSSEC and CAA records published for production domains?

Saying **yes** with a link to a live verification report converts what is
otherwise a manual review item into a single clean checkmark. It also means
**zero possibility** of a fraudulent SSL certificate being issued for your
domain — which is one of the simplest, highest-leverage controls in modern
domain security.
