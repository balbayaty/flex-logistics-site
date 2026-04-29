# Flex Logistics — Production Website

> **Repo history note (2026-04-29)** — this repo was extracted from a sibling
> project (`balbayaty/wajeeh-bi-bluedxp`) where these files were accidentally
> being developed alongside the BlueDXP / Wajeeh BI platform. The two projects
> have completely different brands, dependency trees, and deployment targets,
> so they belong in separate repos.
>
> What was done during the extraction:
> - All files copied as-is from `wajeeh-bi-bluedxp/flex-site/` into this new
>   repo root (35 source files, ~2.7 MB; `node_modules/` excluded — run
>   `npm install` to rebuild the local dev tree if you need it).
> - The duplicate `flex-capabilities.html` that was sitting at the root of
>   the monorepo is preserved here as `capabilities-legacy-root.html` so you
>   can compare it to the canonical `capabilities.html` and pick which
>   version to keep before deploying.
> - **JS bug fixed in both `capabilities.html` and `capabilities-legacy-root.html`**:
>   the Alpine.js `x-text` expression on the bottleneck-visualization template
>   had a malformed nested ternary
>   `b.d + (b.s==='CRITICAL'?' ⚠':b.s==='TRANSIT'?' (expected)')` —
>   the third branch was missing its `:''` fallback, causing Alpine to throw
>   `Unexpected token )` and the visualization region to fail to render.
>   The fix appends `:''` so the expression is now
>   `b.d + (b.s==='CRITICAL'?' ⚠':b.s==='TRANSIT'?' (expected)':'')`.
>   Verify in your browser console that no Alpine errors appear before
>   first deploy.
>
> The matching cleanup commit on the source repo is
> `wajeeh-bi-bluedxp@e7f4bcc` (IMS v1.34.1 — revert).

This folder is a **single, deployable, enterprise-grade website** for Flex Logistics.
It merges the public marketing landing page with the deep capabilities showcase
into one coherent site that is:

- Fast (no build step, pure static HTML/CSS + Tailwind via CDN)
- SEO-optimised (structured data, canonical URLs, sitemap, hreflang, Open Graph)
- AI/LLM discoverable (`/llms.txt` + `/llms-full.txt`, AI-bot allowlist)
- Stock-market grade (privacy, terms, security pages, security.txt, signed
  security headers, vulnerability disclosure programme)
- Multi-lingual (English + Arabic RTL on both pages, Swedish on the showcase)
- WCAG 2.2 AA-aware (skip-link, focus rings, reduced-motion, ARIA)
- PWA-installable (web manifest, service worker, theme colours)
- Deployable to **Vercel, Netlify, Cloudflare Pages or any static host**

## Structure

| File | Purpose |
|---|---|
| `index.html` | Public marketing landing page (the home page) |
| `capabilities.html` | Full interactive capabilities showcase (deep dive) |
| `privacy.html` | PDPL/GDPR-aligned privacy policy |
| `terms.html` | Terms of Service (KSA jurisdiction, SCCA arbitration) |
| `security.html` | Security posture + vulnerability disclosure |
| `llms.txt` | LLM-optimised condensed knowledge base |
| `llms-full.txt` | Full LLM corpus (deep facts) |
| `robots.txt` | Crawler policy (welcomes major AI bots) |
| `sitemap.xml` | XML sitemap with hreflang |
| `site.webmanifest` | PWA manifest |
| `favicon.svg` | Vector favicon |
| `sw.js` | Service worker (offline-first) |
| `humans.txt` | Human-readable colophon |
| `.well-known/security.txt` | Vulnerability disclosure contract (RFC 9116) |
| `vercel.json` | Vercel config (security headers + redirects) |
| `_headers` | Netlify / Cloudflare Pages headers |
| `_redirects` | Netlify / Cloudflare Pages redirects |
| `assets/` | Reserved for OG images, app icons, PNG favicons |
| `package.json` | Dev scripts (preview, validate, lighthouse) |
| `DEPLOY.md` | Step-by-step deployment guide |

## Run locally (10 seconds)

You need either **Python 3** or **Node.js** installed (you almost certainly have one).

### Option A — Python (no install)

```powershell
cd flex-site
python -m http.server 8090
```

Then open <http://localhost:8090> in your browser.

### Option B — Node `serve`

```powershell
cd flex-site
npm run dev
```

This launches `npx serve` on port 8090.

## Deploy

See `DEPLOY.md` for a click-by-click guide. TL;DR:

- **Vercel**: drag-drop this folder at <https://vercel.com/new> — done.
- **Netlify**: drag-drop at <https://app.netlify.com/drop> — done.
- **Cloudflare Pages**: connect via Git, no build command needed.

## After deploy — replace these placeholders

Search-and-replace inside the folder once you have the real values:

| Placeholder | Replace with |
|---|---|
| `https://flexlogistics.com/` | Your real production URL (HTTPS) |
| `info@flexlogistics.com` | Real sales mailbox |
| `+966 13 809 9826` | Real switchboard |
| `linkedin.com/company/flex-logistics` | Real LinkedIn handle |
| `x.com/FlexLogistics` | Real X / Twitter handle |
| `assets/og-flex-logistics.jpg` | A real 1200×630 OG image (drop in `assets/`) |
| `assets/apple-touch-icon.png` | 180×180 PNG icon |
| `assets/icon-192.png` / `assets/icon-512.png` | PWA icons |
| `assets/flex-logo-1200.png` | Official square logo for JSON-LD |

## Why this is "stock-market grade"

- **Governance signals**: `/security.html` describes ISO-aligned controls,
  PDPL/GDPR compliance and a SOC 2-equivalent posture.
- **Legal**: `/privacy.html` and `/terms.html` are publishable starter
  templates aligned with KSA PDPL (and GDPR where applicable). Have your
  general counsel review before going live.
- **Audit trail**: every legal page is dated and version-numbered.
- **Disclosure**: `/.well-known/security.txt` plus a documented disclosure
  policy in `/security.html` satisfy due-diligence checklists.
- **Investor relations contact**: `ir@flexlogistics.com` is referenced in
  `/llms.txt` so AI assistants can route inquiries.
- **Headers**: HSTS preload, strict CSP, COOP/CORP, Permissions-Policy,
  Referrer-Policy — already configured in `vercel.json` and `_headers`.

## Why this is "AI / LLM ready"

1. **`/llms.txt`** — the new community standard for LLM-friendly summaries.
   Linked from `<head>` via `<link rel="alternate" type="text/markdown">`.
2. **`/llms-full.txt`** — full corpus for retrieval-augmented systems.
3. **JSON-LD** — `Organization`, `LocalBusiness`, `WebSite`, `Service`
   (×3), `SoftwareApplication` (Hazalyze), `FAQPage`, `BreadcrumbList`,
   `WebPage`, `ItemList` — 12 entity types in total across the site.
4. **`robots.txt`** — explicitly allows GPTBot, ChatGPT-User, ClaudeBot,
   anthropic-ai, PerplexityBot, Google-Extended, Applebot-Extended,
   Bingbot, CCBot, cohere-ai, Meta-ExternalAgent, FacebookBot, YouBot,
   Bytespider, DuckAssistBot.
5. **Open Graph + Twitter Card** — perfect previews everywhere.
6. **`hreflang`** — English + Arabic alternates.

## Why this is "enterprise grade"

- Pure static — **no server, no database, no build step** = lowest possible
  attack surface and TCO.
- Pinned CDN versions (Alpine 3.14.1, Lucide 0.469.0) for reproducibility.
- Service worker with shell caching for offline-first experience.
- WCAG 2.2 AA-aware (skip-link, focus, reduced-motion).
- Fully responsive (mobile menu, touch-friendly).
- All forms / interactions client-side only (no PII collected by this site).

## Updating content

The two main pages are **plain HTML** — open them in any text editor and edit
text in place. The branding tokens (orange `#F6A000`, etc.) are at the top of
each `<style>` block.

For deeper changes to the showcase (4500 lines, 13 sections), see the
`flexApp()` JavaScript at the bottom of `capabilities.html` — it contains the
i18n strings for EN/AR/SV.

## Need help?

- Read `DEPLOY.md` for click-by-click deployment.
- All structured data is **valid** as of the last save — verify any time at
  <https://search.google.com/test/rich-results>.
- LLM optimisation — run a quick check at
  <https://llms-txt.org/inspector> (or just `curl https://your-site/llms.txt`).
