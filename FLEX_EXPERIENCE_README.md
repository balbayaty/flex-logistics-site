# FLEX / BEYOND MOVEMENT — Kinetic Experience Concept

**Status:** A standalone public-link / noindex concept preview, NOT a production website or operational compliance system.

## Live preview
https://flex-beyond-movement-experience.vercel.app/

## Contents
- Cinematic hero with an animated, schematic Gulf corridor SVG map, moving route tracer and touch-enabled route switching
- Three-layer FLEX story: physical infrastructure, BlueDXP/Hazalyze vision, human-validated decisions
- Corridor Studio with Dammam–Dubai, Dammam–Kuwait, Dammam–Amman and Dammam–Baghdad planning considerations, clearly labelled illustrative
- Interactive Hazalyze-style example questions and response cards; no claims of real API or AI integration
- Chemical warehousing, road freight and software-vision graphical storytelling
- Bilingual EN/AR content, RTL layout, dark/light themes, modal enquiry composer, reduced-motion support
- No client names, prices, transit-time claims, occupancy figures or fictitious active data

## Production isolation
This work is on a separate branch `concept/kinetic-experience-2026-11-08` and its own Vercel project `flex-beyond-movement-experience`.
No changes are made to `scsflex.com`, its DNS, Bluehost, email settings or current live website.
The preview sends nothing to a backend. The enquiry composer opens a local mailto draft; submission is entirely the user's choice.
The preview carries noindex HTML metadata, X-Robots-Tag and a restrictive robots.txt.

## Automated verification
Vercel build checks JavaScript syntax and executes `scripts/check-experience.mjs` (HTML identifiers, internal links, Arabic translation keys, routes, interactions wired, source warnings, noindex).
Live-browser QA used Chromium via Puppeteer with CSS loaded and HTTP 200 at 360/393/430/768/1440 CSS pixels. No horizontal scrolling was observed. Route switching, simulated AI prompt changes, Arabic RTL, theme switching, mobile menu and mission form open/close passed in the tested build.
The initial capture revealed incomplete fallback arrow glyphs and a too-dark first frame; these were addressed with SVG icons and progressive enhancement before final redeployment.

## Before adopting for the corporate website
1. Validate legal company identity and all facility, licence, market and capability claims with operations/compliance owners.
2. Decide which experience sections belong on `scsflex.com` and which should be an interactive separate BlueDXP environment.
3. Complete technical accessibility review, screen-reader testing, performance and slow-network assessment on Android/iOS, and security/cookie reviews.
4. Connect real analytics, CRM/lead capture, approved product APIs, SEO metadata and clear conversion funnels only after business approval.
5. Avoid connecting this demo to live shipment, customs or customer databases without security and privacy review.

This is a visual, interactive experience demonstration intended to support design decisions, not a statement that the company has all pictured or implied functionality today.
