# Jan Furnishings — SEO & AEO Implementation Plan
## Claude Code Implementation Brief

---

## ⚠️ CRITICAL INSTRUCTION: DO NOT REDESIGN THE SITE

**This is an additive implementation.** The existing website at `thejanfurniture.com` has a design, layout, and component structure that must be preserved. Do not:

- Replace existing HTML pages with new designs
- Change the visual layout, colour scheme, typography, or spacing
- Remove or restructure existing content sections
- Create new page templates that don't match the existing aesthetic
- Override existing CSS classes or styling patterns

**Instead, you must:**

- Add new content, meta tags, and structured data INTO existing pages
- Create new pages that follow the same design patterns already in the codebase
- Inject JSON-LD schema via `<script type="application/ld+json">` tags in `<head>`
- Add FAQ sections, answer paragraphs, and trust signals that integrate visually with what's already there
- Use the same CSS variables, fonts, and component patterns from existing pages

**Before making any changes, read the existing codebase** to understand the styling approach, shared components, navigation patterns, and footer structure.

---

## Project Context

- **Main site:** https://thejanfurniture.com (HTML5 / Tailwind / AOS.js, hosted on Netlify)
- **Landing pages:** https://offers.thejanfurniture.com (separate subdomain, also Netlify)
- **Interiors sub-site:** https://thejanfurniture.com/interiors/ (Jan Interiors brand)
- **Tech stack:** Static HTML, Tailwind CSS via CDN, AOS.js scroll animations, no build step
- **Design system:** Dark charcoal + gold (#C9A96E), Cormorant Garamond (display) + DM Sans (body), warm cream (#F2EDE6) editorial sections, glassmorphism hero panels
- **WhatsApp CTA:** wa.me/971508806292 (primary conversion)
- **Google Reviews:** https://maps.app.goo.gl/etJY1YDiJ8i8XH1C6
- **GA4:** G-W2DJLPY4HR
- **Google Ads:** AW-658897837

### Current Pages

| File | URL | Status |
|------|-----|--------|
| `index.html` | `/` | Live |
| `products.html` | `/products` | Live |
| `about.html` | `/about` | Live |
| `interiors.html` | `/interiors` (redirect to sub-site) | Live |
| `packages.html` | `/packages` | Live |
| `estimate.html` | `/estimate` | Live |
| `book.html` | `/book` | Live |
| `help.html` | `/help` | Live |
| `interiors/index.html` | `/interiors/` | Live |
| `interiors/services/index.html` | `/interiors/services/` | Live |
| `interiors/packages/index.html` | `/interiors/packages/` | Live |
| `interiors/portfolio/index.html` | `/interiors/portfolio/` | Live |
| `interiors/book/index.html` | `/interiors/book/` | Live |

### Landing Pages (offers.thejanfurniture.com)

| File | URL |
|------|-----|
| `summer-curtains.html` | `/summer-curtains` |
| `summer-blinds.html` | `/summer-blinds` |
| `new-home.html` | `/new-home` |

---

## Current State: Why This Is Urgent

**Jan Furnishings has zero organic visibility.** A search for "jan furnishings curtains blinds dubai thejanfurniture" returns zero results from thejanfurniture.com. The site is not indexed by Google at all.

The competitive landscape is saturated: Dubai Blinds, Blinds & Curtains, Dubai Curtain Blinds, Styfect, Saban, Curtains UAE, and at least 10+ other competitors dominate both Google search results and AI answer engine citations. Many have deep SEO: dedicated service pages, FAQ schema, review schema, and 1000+ word category pages.

**The goal is not just to rank — it's to be cited by AI engines** (ChatGPT, Perplexity, Google AI Overviews, Gemini) when someone asks "best curtain company in Dubai" or "how much do custom curtains cost in Dubai."

---

## Table of Contents

1. [Phase 1: Technical Foundation](#phase-1-technical-foundation)
2. [Phase 2: Structured Data (JSON-LD Schema)](#phase-2-structured-data-json-ld-schema)
3. [Phase 3: Content Architecture — Answer-First Pages](#phase-3-content-architecture)
4. [Phase 4: Dedicated Service Pages](#phase-4-dedicated-service-pages)
5. [Phase 5: FAQ Strategy & Schema](#phase-5-faq-strategy--schema)
6. [Phase 6: Technical SEO Fixes](#phase-6-technical-seo-fixes)
7. [Phase 7: Image & Media Optimisation](#phase-7-image--media-optimisation)
8. [Phase 8: Internal Linking Architecture](#phase-8-internal-linking-architecture)
9. [Phase 9: AI Crawler Permissions & llms.txt](#phase-9-ai-crawler-permissions)
10. [Phase 10: Monitoring & Freshness](#phase-10-monitoring--freshness)
11. [Verification Commands](#verification-commands)
12. [Implementation Priority & Phasing](#implementation-priority--phasing)

---

## Phase 1: Technical Foundation

These changes are prerequisites. Nothing else works until these are done.

### 1.1 Submit XML Sitemap

Create a `sitemap.xml` in the root of the site:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://thejanfurniture.com/</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://thejanfurniture.com/products</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://thejanfurniture.com/about</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://thejanfurniture.com/packages</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://thejanfurniture.com/estimate</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://thejanfurniture.com/book</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://thejanfurniture.com/help</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <!-- Interiors sub-site -->
  <url>
    <loc>https://thejanfurniture.com/interiors/</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://thejanfurniture.com/interiors/services/</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://thejanfurniture.com/interiors/packages/</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://thejanfurniture.com/interiors/portfolio/</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://thejanfurniture.com/interiors/book/</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
  <!-- NEW: Dedicated service pages (add as they're created) -->
  <url>
    <loc>https://thejanfurniture.com/curtains</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://thejanfurniture.com/blinds</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://thejanfurniture.com/motorized</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://thejanfurniture.com/faq</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

**Update `<lastmod>` dates whenever any content on a page changes.**

### 1.2 Create robots.txt

```
User-agent: *
Allow: /
Sitemap: https://thejanfurniture.com/sitemap.xml

# Explicitly allow AI crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: cohere-ai
Allow: /
```

Most competitors block AI bots or don't have a robots.txt at all. Explicitly allowing them is a competitive advantage.

### 1.3 Verify Google Search Console

Check if thejanfurniture.com is registered in Google Search Console. If not:

1. Go to https://search.google.com/search-console
2. Add property → URL prefix → `https://thejanfurniture.com`
3. Verify via DNS TXT record (Jan manages domain via GoDaddy)
4. Submit sitemap.xml
5. Request indexing for all key pages

**This is the single most important step.** Until the site is in Search Console and sitemap submitted, nothing else matters for Google visibility.

### 1.4 Add Canonical Tags to Every Page

Every page must have a canonical tag in `<head>`:

```html
<!-- On index.html -->
<link rel="canonical" href="https://thejanfurniture.com/" />

<!-- On products.html -->
<link rel="canonical" href="https://thejanfurniture.com/products" />

<!-- On packages.html -->
<link rel="canonical" href="https://thejanfurniture.com/packages" />

<!-- etc. for every page -->
```

**Check:** Does the site currently use `www` vs non-`www`? Pick one and redirect the other. The canonical should match whichever is primary.

---

## Phase 2: Structured Data (JSON-LD Schema)

Add JSON-LD structured data to every page. Place each `<script>` tag inside `<head>`, after the `<title>` tag.

### 2.1 Organisation Schema (on every page)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://thejanfurniture.com/#organization",
  "name": "Jan Furnishings",
  "alternateName": ["Jan Furniture", "The Jan Furniture"],
  "url": "https://thejanfurniture.com",
  "logo": "https://thejanfurniture.com/assets/images/jan-furnishings-logo.png",
  "description": "Dubai's custom curtain and blind specialists. Free home consultation, professional measurement, and same-week installation across Dubai, Abu Dhabi, and Sharjah.",
  "telephone": "+971508806292",
  "email": "info@thejanfurniture.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.2048,
    "longitude": 55.2708
  },
  "areaServed": [
    {"@type": "City", "name": "Dubai"},
    {"@type": "City", "name": "Abu Dhabi"},
    {"@type": "City", "name": "Sharjah"}
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "09:00",
    "closes": "21:00"
  },
  "sameAs": [
    "https://maps.app.goo.gl/etJY1YDiJ8i8XH1C6"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Curtain & Blind Services",
    "itemListElement": [
      {"@type": "Service", "name": "Custom Curtains"},
      {"@type": "Service", "name": "Custom Blinds"},
      {"@type": "Service", "name": "Motorized Window Treatments"},
      {"@type": "Service", "name": "Free Home Consultation"},
      {"@type": "Service", "name": "Professional Installation"}
    ]
  },
  "parentOrganization": {
    "@type": "Organization",
    "name": "Jan Group",
    "url": "https://thejanfurniture.com"
  }
}
</script>
```

### 2.2 Service Schema (on relevant service pages)

**For the Curtains page (`/curtains`):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom Curtains Dubai",
  "description": "Bespoke curtains made to measure for your home or office. Sheer, blackout, and motorized options available. Free home consultation and professional installation across Dubai.",
  "provider": {"@id": "https://thejanfurniture.com/#organization"},
  "areaServed": [
    {"@type": "City", "name": "Dubai"},
    {"@type": "City", "name": "Abu Dhabi"},
    {"@type": "City", "name": "Sharjah"}
  ],
  "serviceType": "Custom Curtain Installation",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "AED",
    "lowPrice": "500",
    "description": "Price varies by fabric, style, and window dimensions. Free home consultation to provide exact quote."
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Curtain Types",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Sheer Curtains"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Blackout Curtains"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Sheer & Blackout Combo"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Motorized Curtains"}}
    ]
  }
}
</script>
```

**For the Blinds page (`/blinds`):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom Blinds Dubai",
  "description": "Custom-cut roller, wooden, blackout, and motorized blinds for homes and offices in Dubai. UV-blocking fabrics built for the UAE climate. Free measurement and professional installation.",
  "provider": {"@id": "https://thejanfurniture.com/#organization"},
  "areaServed": [
    {"@type": "City", "name": "Dubai"},
    {"@type": "City", "name": "Abu Dhabi"},
    {"@type": "City", "name": "Sharjah"}
  ],
  "serviceType": "Custom Blind Installation",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "AED",
    "lowPrice": "350",
    "description": "Price varies by blind type, size, and motorization. Free home visit to provide exact quote."
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Blind Types",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Roller Blinds"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Blackout Blinds"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Wooden Blinds"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Motorized Blinds"}}
    ]
  }
}
</script>
```

### 2.3 Product Schema (on Packages page)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Jan Furnishings Curtain & Blind Packages",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Product",
        "name": "Apartment Package",
        "description": "Complete curtain and blind package for apartments. Covers all windows with custom-made treatments, professional measurement, and installation.",
        "brand": {"@type": "Brand", "name": "Jan Furnishings"},
        "offers": {
          "@type": "Offer",
          "priceCurrency": "AED",
          "price": "3500",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "seller": {"@id": "https://thejanfurniture.com/#organization"}
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Product",
        "name": "Villa / Townhouse Package",
        "description": "Full window treatment package for villas and townhouses. Custom curtains and blinds for every room, measured and installed by our team.",
        "brand": {"@type": "Brand", "name": "Jan Furnishings"},
        "offers": {
          "@type": "Offer",
          "priceCurrency": "AED",
          "price": "8500",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "seller": {"@id": "https://thejanfurniture.com/#organization"}
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Product",
        "name": "Premium Estate Package",
        "description": "Luxury window treatment package for premium villas and estates. Includes premium fabric selection, motorized options, and white-glove installation service.",
        "brand": {"@type": "Brand", "name": "Jan Furnishings"},
        "offers": {
          "@type": "Offer",
          "priceCurrency": "AED",
          "price": "22000",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "seller": {"@id": "https://thejanfurniture.com/#organization"}
        }
      }
    }
  ]
}
</script>
```

### 2.4 Breadcrumb Schema (on every page except homepage)

Example for the Curtains page:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://thejanfurniture.com/"},
    {"@type": "ListItem", "position": 2, "name": "Curtains", "item": "https://thejanfurniture.com/curtains"}
  ]
}
</script>
```

Generate equivalent breadcrumbs for every page. Interiors pages should nest: Home → Interiors → [Page].

---

## Phase 3: Content Architecture

Every page must lead with an **answer-first paragraph** — a 30-60 word block that directly answers the question a searcher would have. This is what AI engines extract and cite.

### 3.1 Homepage Answer Paragraph

Add this as the first visible text content after the hero section:

> **Jan Furnishings is Dubai's custom curtain and blind specialist, serving homeowners across Dubai, Abu Dhabi, and Sharjah.** We offer free home consultations, professional measurement, and same-week installation. With 500+ homes fitted and a 5-star Google rating, we provide bespoke window treatments — from sheer and blackout curtains to roller, wooden, and motorized blinds. Packages start from AED 3,500 for apartments.

This paragraph contains: brand name, location, service description, social proof (500+ homes, 5-star rating), specific product types, and pricing anchor. Every AI engine can extract and cite this.

### 3.2 Trust Signals Section

Add a structured trust signals section visible on the homepage. Do NOT use vague badges — use specific, verifiable claims:

| Signal | What to Show | Evidence |
|--------|-------------|----------|
| 500+ Homes Fitted | Number counter or text | Link to Google Reviews |
| 5-Star Google Rating | Stars + review count | Link to Google Business Profile |
| Free Home Consultation | Highlighted | WhatsApp CTA |
| Same-Week Installation | Timeline promise | |
| Free Removal of Old Fittings | Differentiator | |
| Serving Dubai, Abu Dhabi, Sharjah | Area coverage | |
| Part of the Jan Group | Brand family | Link to Al Hadeeqa, Jan Interiors |

### 3.3 Per-Page Title Tags & Meta Descriptions

**CRITICAL: Every page must have a unique, keyword-optimised `<title>` and `<meta name="description">`.**

| Page | Title Tag | Meta Description |
|------|-----------|-----------------|
| Homepage | `Custom Curtains & Blinds Dubai — Jan Furnishings | Free Home Visit` | `Dubai's custom curtain and blind specialists. Free home consultation, professional installation, packages from AED 3,500. 500+ homes fitted. WhatsApp us for a free quote.` |
| Products | `Curtains & Blinds Collection — Sheer, Blackout, Motorized | Jan Furnishings Dubai` | `Browse our complete range of custom curtains and blinds. Sheer, blackout, roller, wooden, and motorized options. Made to measure for your Dubai home. Free consultation.` |
| Packages | `Curtain & Blind Packages — From AED 3,500 | Jan Furnishings Dubai` | `Complete window treatment packages for apartments (AED 3,500), villas (AED 8,500), and estates (AED 22,000). Free installation, free removal of old fittings. Dubai, Abu Dhabi, Sharjah.` |
| About | `About Jan Furnishings — Dubai's Trusted Curtain & Blind Company` | `Part of the Jan Group. 500+ homes fitted across Dubai with custom curtains and blinds. Meet the team behind Dubai's most trusted window treatment specialists.` |
| Curtains (NEW) | `Custom Curtains Dubai — Sheer, Blackout & Motorized | Jan Furnishings` | `Bespoke curtains for every room. Sheer, blackout, and motorized options in 100+ fabrics. Free home consultation and same-week installation across Dubai.` |
| Blinds (NEW) | `Custom Blinds Dubai — Roller, Wooden & Motorized | Jan Furnishings` | `Custom-cut blinds for homes and offices. Roller, wooden, blackout, and motorized blinds with UV-blocking fabrics. Free measurement and professional fitting.` |
| Motorized (NEW) | `Motorized Curtains & Blinds Dubai — Smart Window Treatments | Jan Furnishings` | `Motorized curtains and blinds for Dubai homes. Voice-controlled, remote-operated, and smart home integrated. Professional installation with free home consultation.` |
| FAQ (NEW) | `Curtain & Blind FAQ — Prices, Installation, Timeline | Jan Furnishings Dubai` | `Answers to common questions about custom curtains and blinds in Dubai. Pricing, installation timeline, fabric options, motorization, and more from Jan Furnishings.` |
| Estimate | `Free Curtain & Blind Estimate — Jan Furnishings Dubai` | `Get a free, no-obligation estimate for custom curtains and blinds. We visit your home, measure everything, and provide an instant quote. WhatsApp us to book.` |
| Book | `Book a Free Home Visit — Jan Furnishings Dubai` | `Schedule a free home consultation for curtains and blinds. Our expert visits your home with 20+ fabric books and provides an on-the-spot quote. Available 7 days a week.` |
| Help | `Help & Support — Jan Furnishings Dubai` | `Need help with your curtains or blinds? Find answers, contact our team, or WhatsApp us for instant support.` |

---

## Phase 4: Dedicated Service Pages

**This is the highest-impact SEO action.** Google ranks pages, not websites. Each product category needs its own URL with unique, deep content.

### 4.1 Create `/curtains` (curtains.html)

**URL:** `https://thejanfurniture.com/curtains`
**Target keywords:** custom curtains dubai, curtain installation dubai, bespoke curtains dubai, blackout curtains dubai, sheer curtains dubai

**Required content blocks (in order):**

1. **Hero** — "Custom Curtains, Made for Your Home" with WhatsApp CTA
2. **Answer paragraph** (30-60 words) — "Jan Furnishings provides custom-made curtains for homes across Dubai, Abu Dhabi, and Sharjah. We offer sheer, blackout, motorized, and combination curtains in 100+ premium fabrics. Every curtain is measured, cut, and installed by our team — with free home consultations and same-week installation available."
3. **Curtain types** — Dedicated subsection for each: Sheer, Blackout, Sheer & Blackout Combo, Motorized. Each with 50-80 words of descriptive content + key benefits.
4. **How it works** — 4 steps: Book Free Visit → We Measure → Custom Manufacturing → Professional Installation
5. **Pricing anchor** — "Starting from AED [X] per window. Full-home packages from AED 3,500."
6. **FAQ section** (5-8 questions, schema-marked) — see Phase 5
7. **WhatsApp CTA** — bottom-of-page

**Schema:** Service schema (see 2.2) + FAQ schema + Breadcrumb schema

### 4.2 Create `/blinds` (blinds.html)

**URL:** `https://thejanfurniture.com/blinds`
**Target keywords:** blinds dubai, roller blinds dubai, custom blinds dubai, blackout blinds dubai, wooden blinds dubai, motorized blinds dubai

**Required content blocks (same structure as curtains):**

1. **Hero** — "Custom Blinds, Cut to Fit" with WhatsApp CTA
2. **Answer paragraph** — "Jan Furnishings supplies and installs custom blinds across Dubai, Abu Dhabi, and Sharjah. Choose from roller, blackout, wooden, and motorized blinds — all cut to your exact window dimensions with UV-blocking fabrics designed for the UAE climate. Free home measurement and professional installation included."
3. **Blind types** — Roller, Blackout, Wooden, Motorized. Each with descriptions.
4. **How it works** — Same 4-step process
5. **Pricing anchor** — "Starting from AED [X] per window."
6. **FAQ section** (5-8 questions)
7. **WhatsApp CTA**

### 4.3 Create `/motorized` (motorized.html)

**URL:** `https://thejanfurniture.com/motorized`
**Target keywords:** motorized curtains dubai, motorized blinds dubai, smart curtains dubai, voice controlled blinds dubai, automated window treatments dubai

**Required content blocks:**

1. **Hero** — "Smart Window Treatments for Modern Homes"
2. **Answer paragraph** — "Jan Furnishings installs motorized curtains and blinds across Dubai. Control your window treatments with a remote, smartphone app, voice command (Alexa, Google Home), or scheduled automation. Professional installation with full integration into your smart home system."
3. **Features** — Remote control, app control, voice control, scheduling, sun sensors
4. **Integration** — Compatible with: Somfy, Google Home, Amazon Alexa, Apple HomeKit
5. **FAQ section** (5 questions specific to motorization)
6. **WhatsApp CTA**

### 4.4 Design Requirements for New Pages

All new pages must:

- Use the existing glassmorphism hero pattern from the codebase
- Match existing typography: Cormorant Garamond headings, DM Sans body
- Use the same colour palette: dark charcoal, gold (#C9A96E), warm cream (#F2EDE6)
- Include the same navigation bar and footer as existing pages
- Include the brand top bar above navigation
- Use AOS.js scroll reveal animations consistent with existing pages
- Be fully responsive (test at 390px mobile width)
- Include WhatsApp floating button

---

## Phase 5: FAQ Strategy & Schema

FAQs are the single highest-impact AEO asset. AI engines extract FAQ content more than any other content type.

### 5.1 Create Master FAQ Page (`/faq` — faq.html)

Create a dedicated FAQ page that consolidates all frequently asked questions. This page should be accessible from the navigation.

### 5.2 FAQ Content — Curtains

Add these to both the curtains page AND the master FAQ page:

```
Q: How much do custom curtains cost in Dubai?
A: Custom curtain pricing at Jan Furnishings depends on fabric, style, and window size. Single-window treatments start from AED 500. Full apartment packages start from AED 3,500, villa packages from AED 8,500. We provide an exact quote during your free home visit — no obligation.

Q: How long does curtain installation take?
A: From your initial home visit to installation, most orders are completed within 5–7 working days. Same-week installation is available for standard orders. Large villa or multi-room projects may take 7–10 days.

Q: Do you offer blackout curtains for bedrooms?
A: Yes. We offer full blackout curtains that block 99% of light, ideal for bedrooms, nurseries, and media rooms. Available in 50+ colours and fabrics, with motorized options for hard-to-reach windows.

Q: Can I get curtains and blinds together?
A: Absolutely. Many clients choose a sheer-and-blackout combination, or curtains on some windows and blinds on others. Our consultant advises room-by-room during your free home visit. Combo packages save compared to ordering separately.

Q: Do you remove old curtains?
A: Yes. We remove and dispose of your old curtains and fittings at no extra charge when you order new window treatments from Jan Furnishings. This includes taking down old tracks and brackets.

Q: What areas do you serve?
A: Jan Furnishings serves all of Dubai, Abu Dhabi, and Sharjah. Our consultants visit your home anywhere in these emirates for a free, no-obligation measurement and quote.
```

### 5.3 FAQ Content — Blinds

```
Q: What types of blinds do you offer in Dubai?
A: Jan Furnishings offers roller blinds, blackout blinds, wooden blinds, motorized blinds, and Venetian blinds. All are custom-cut to your exact window dimensions and professionally installed.

Q: Are your blinds suitable for Dubai's climate?
A: Yes. All our blind fabrics are UV-blocking and heat-resistant, specifically selected for the UAE climate. They help reduce indoor temperatures and protect furniture from sun damage.

Q: How much do roller blinds cost in Dubai?
A: Roller blinds at Jan Furnishings start from AED 350 per window, depending on size and fabric. We provide exact pricing during your free home measurement visit.

Q: Can blinds be motorized?
A: Yes. Most blind types can be motorized, allowing you to control them via remote, smartphone app, or voice commands through Alexa or Google Home. Motorization adds approximately AED 300–500 per window.

Q: How do I clean my blinds?
A: Our blinds are designed for easy maintenance. Most can be wiped with a damp cloth. We provide specific care instructions for each fabric type at installation.
```

### 5.4 FAQ Content — General

```
Q: How does the free home visit work?
A: Book a visit via WhatsApp or our website. Our consultant arrives with 20+ fabric sample books, measures every window, recommends styles room-by-room, and provides an instant quote — all free, no obligation.

Q: Do you offer payment plans?
A: Yes. We offer flexible payment options including split payments. Details are provided with your quote.

Q: Are you part of a larger company?
A: Jan Furnishings is part of the Jan Group, which also includes Jan Interiors (wall panels, wallpaper, painting, renovation) and Al Hadeeqa Contracting (construction, pergolas, waterproofing). This gives us access to a full team of interior and construction professionals.
```

### 5.5 FAQ Schema Markup

Every page with FAQ content must have corresponding FAQ schema. Example:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much do custom curtains cost in Dubai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Custom curtain pricing at Jan Furnishings depends on fabric, style, and window size. Single-window treatments start from AED 500. Full apartment packages start from AED 3,500, villa packages from AED 8,500. We provide an exact quote during your free home visit — no obligation."
      }
    },
    {
      "@type": "Question",
      "name": "How long does curtain installation take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "From your initial home visit to installation, most orders are completed within 5–7 working days. Same-week installation is available for standard orders. Large villa or multi-room projects may take 7–10 days."
      }
    }
  ]
}
</script>
```

**Generate this for EVERY FAQ on every page. The schema content must exactly match the visible FAQ text.**

---

## Phase 6: Technical SEO Fixes

### 6.1 Meta Tags Audit

Check every existing page for:

- [ ] Unique `<title>` tag (see table in Phase 3.3)
- [ ] Unique `<meta name="description">` (see table in Phase 3.3)
- [ ] `<link rel="canonical" href="...">` with correct URL
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] `<html lang="en">`
- [ ] Open Graph tags for social sharing

### 6.2 Open Graph Tags (add to every page)

```html
<meta property="og:title" content="[Page title]" />
<meta property="og:description" content="[Meta description]" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://thejanfurniture.com/[page]" />
<meta property="og:image" content="https://thejanfurniture.com/assets/images/og-image.jpg" />
<meta property="og:site_name" content="Jan Furnishings" />
<meta property="og:locale" content="en_AE" />
```

Create one high-quality OG image (1200×630px) with the Jan Furnishings logo and a curtain/interior shot. Use it site-wide unless page-specific images exist.

### 6.3 Heading Hierarchy Audit

Every page must have:

- Exactly ONE `<h1>` tag (the main page heading)
- Logical `<h2>` → `<h3>` → `<h4>` nesting (no skipping levels)
- H1 must contain the primary keyword for that page
- No duplicate headings across the page

**Common mistakes to check for:**

- Logo or brand name wrapped in `<h1>` (should be an `<a>` or `<span>`)
- Multiple `<h1>` tags on a single page
- Heading tags used for visual styling rather than content structure

### 6.4 URL Structure

Ensure clean, keyword-rich URLs with Netlify `_redirects`:

```
# If using .html extensions, redirect clean URLs to them
/curtains       /curtains.html      200
/blinds         /blinds.html        200
/motorized      /motorized.html     200
/faq            /faq.html           200
```

Or use the folder-based approach (`curtains/index.html`) for naturally clean URLs.

---

## Phase 7: Image & Media Optimisation

### 7.1 Image File Names

Rename all product/service images to be descriptive and keyword-rich:

```
❌ IMG_2847.jpg
❌ hero-bg.jpg
❌ product1.jpg

✅ custom-sheer-curtains-dubai-living-room.jpg
✅ blackout-roller-blinds-dubai-bedroom.jpg
✅ motorized-curtains-dubai-smart-home.jpg
✅ jan-furnishings-free-home-consultation-dubai.jpg
```

### 7.2 Alt Text

Every `<img>` must have descriptive alt text containing relevant keywords:

```html
<img src="assets/images/custom-sheer-curtains-dubai-living-room.jpg"
     alt="Custom sheer curtains installed in a Dubai living room by Jan Furnishings"
     loading="lazy" />
```

### 7.3 Image Performance

- Add `loading="lazy"` to all images below the fold
- Add `width` and `height` attributes to prevent layout shifts
- Use WebP format where possible (with JPEG fallback)
- Compress all images to under 200KB for web use

---

## Phase 8: Internal Linking Architecture

### 8.1 Cross-Page Links

Every page should link to related pages. Minimum linking requirements:

| From Page | Must Link To |
|-----------|-------------|
| Homepage | Curtains, Blinds, Motorized, Packages, Book a Visit |
| Curtains | Blinds, Motorized, Packages, FAQ |
| Blinds | Curtains, Motorized, Packages, FAQ |
| Motorized | Curtains, Blinds, Packages, FAQ |
| Packages | Curtains, Blinds, Motorized, Estimate |
| FAQ | Curtains, Blinds, Motorized, Packages, Book |

### 8.2 Footer Enhancement

The footer on every page should include:

- **Services:** Curtains | Blinds | Motorized | Interiors
- **Quick Links:** Packages | Free Estimate | Book a Visit | FAQ | About
- **Contact:** WhatsApp number, phone, email
- **Jan Group:** Jan Furnishings | Jan Interiors | Al Hadeeqa Contracting
- **Areas:** Dubai | Abu Dhabi | Sharjah

### 8.3 Contextual Links in Content

Within body content, use descriptive anchor text linking to related pages:

```html
<!-- Good -->
<p>If you're also considering <a href="/blinds">custom blinds for your Dubai home</a>, we offer both curtain and blind packages.</p>

<!-- Bad -->
<p>For blinds, <a href="/blinds">click here</a>.</p>
```

---

## Phase 9: AI Crawler Permissions

### 9.1 Create llms.txt

Create a `llms.txt` file in the root of the site. This is an emerging standard that gives AI crawlers your site structure in plain text:

```
# Jan Furnishings
> Dubai's custom curtain and blind specialists. Free home consultation, professional measurement, and same-week installation.

## About
Jan Furnishings is a Dubai-based company specialising in custom-made curtains and blinds for homes across the UAE. Part of the Jan Group, which includes Jan Interiors (wall panels, wallpaper, renovation) and Al Hadeeqa Contracting (construction, pergolas, waterproofing).

## Services
- Custom Curtains: Sheer, blackout, motorized, and combination curtains in 100+ fabrics
- Custom Blinds: Roller, blackout, wooden, and motorized blinds with UV-blocking fabrics
- Motorized Window Treatments: Smart curtains and blinds with voice control, app control, and scheduling
- Free Home Consultation: Expert visits with 20+ fabric sample books and on-the-spot quotes
- Professional Installation: Same-week installation with free removal of old fittings

## Packages
- Apartment Package: From AED 3,500 — curtains and blinds for all windows
- Villa / Townhouse Package: From AED 8,500 — full window treatment package
- Premium Estate Package: From AED 22,000 — luxury fabrics and motorized options

## Service Areas
Dubai, Abu Dhabi, Sharjah — all areas covered

## Contact
- WhatsApp: +971 50 880 6292
- Website: https://thejanfurniture.com
- Google Reviews: https://maps.app.goo.gl/etJY1YDiJ8i8XH1C6

## Key Pages
- Homepage: https://thejanfurniture.com/
- Curtains: https://thejanfurniture.com/curtains
- Blinds: https://thejanfurniture.com/blinds
- Motorized: https://thejanfurniture.com/motorized
- Packages: https://thejanfurniture.com/packages
- FAQ: https://thejanfurniture.com/faq
- Free Estimate: https://thejanfurniture.com/estimate
- Book a Visit: https://thejanfurniture.com/book
- Jan Interiors: https://thejanfurniture.com/interiors/

## Last Updated
April 2026
```

### 9.2 Link to llms.txt

Add in the `<head>` of every page:

```html
<link rel="alternate" type="text/plain" href="https://thejanfurniture.com/llms.txt" title="LLM-readable site summary" />
```

---

## Phase 10: Monitoring & Freshness

### 10.1 Freshness Signals

- Add a visible "Last updated: [Month Year]" date to service pages, FAQ page, and packages page
- Update this date whenever content changes
- Update sitemap.xml `<lastmod>` dates whenever content changes

### 10.2 Freshness Rules

1. Every page with pricing must show a "Prices valid as of [Month Year]" line
2. Update the packages page whenever pricing changes
3. Refresh FAQ content quarterly — add new questions from customer enquiries
4. Update llms.txt whenever services, pricing, or page structure changes

### 10.3 Post-Launch Monitoring

After implementation:

1. Submit sitemap to Google Search Console
2. Request indexing for all new pages
3. Monitor Google Search Console for crawl errors
4. Check structured data validation at https://search.google.com/test/rich-results
5. Test AI citation by asking ChatGPT and Perplexity "best curtain company in Dubai" — track when/if Jan Furnishings appears
6. Monitor search terms report in Google Ads for organic vs paid keyword overlap

---

## Verification Commands

Run these after deployment to verify implementation:

```bash
# 1. Check robots.txt is accessible
curl -s https://thejanfurniture.com/robots.txt | head -20

# 2. Check sitemap.xml is accessible
curl -s https://thejanfurniture.com/sitemap.xml | head -30

# 3. Check llms.txt is accessible
curl -s https://thejanfurniture.com/llms.txt | head -20

# 4. Check homepage has JSON-LD
curl -s https://thejanfurniture.com/ | grep -o 'application/ld+json' | wc -l

# 5. Check homepage has canonical
curl -s https://thejanfurniture.com/ | grep 'rel="canonical"'

# 6. Check homepage has meta description
curl -s https://thejanfurniture.com/ | grep 'name="description"'

# 7. Check curtains page exists and has JSON-LD
curl -s -o /dev/null -w "%{http_code}" https://thejanfurniture.com/curtains
curl -s https://thejanfurniture.com/curtains | grep -o 'application/ld+json' | wc -l

# 8. Check blinds page exists and has JSON-LD
curl -s -o /dev/null -w "%{http_code}" https://thejanfurniture.com/blinds
curl -s https://thejanfurniture.com/blinds | grep -o 'application/ld+json' | wc -l

# 9. Check FAQ page exists and has FAQPage schema
curl -s https://thejanfurniture.com/faq | grep 'FAQPage'

# 10. Check OG tags on homepage
curl -s https://thejanfurniture.com/ | grep 'og:title'

# 11. Check no duplicate H1 tags
curl -s https://thejanfurniture.com/ | grep -i '<h1' | wc -l
# Should return exactly 1

# 12. Validate JSON-LD via Google's tool
echo "Test at: https://search.google.com/test/rich-results"
echo "Enter URL: https://thejanfurniture.com/"
```

---

## Implementation Priority & Phasing

### Week 1: Foundation (Do FIRST)

1. ✅ Register in Google Search Console + submit sitemap
2. ✅ Create `robots.txt` with AI bot permissions
3. ✅ Create `sitemap.xml`
4. ✅ Add canonical tags to ALL existing pages
5. ✅ Fix title tags and meta descriptions on ALL existing pages
6. ✅ Add Organisation JSON-LD to ALL existing pages
7. ✅ Add Breadcrumb JSON-LD to ALL existing pages
8. ✅ Add Open Graph tags to ALL existing pages

### Week 2: Service Pages

9. ✅ Create `/curtains` page with full content + schema
10. ✅ Create `/blinds` page with full content + schema
11. ✅ Create `/motorized` page with full content + schema
12. ✅ Add Service JSON-LD to each service page
13. ✅ Add answer-first paragraphs to each service page

### Week 3: FAQ & AI Optimisation

14. ✅ Create `/faq` master FAQ page with all FAQs + FAQPage schema
15. ✅ Add FAQ sections to curtains, blinds, and motorized pages + schema
16. ✅ Create `llms.txt`
17. ✅ Add `llms.txt` link to `<head>` of all pages
18. ✅ Add Product schema to packages page

### Week 4: Polish & Internal Linking

19. ✅ Add answer-first paragraph to homepage
20. ✅ Add trust signals section to homepage
21. ✅ Build internal linking architecture (footer, contextual links)
22. ✅ Rename and optimise all images (file names + alt text)
23. ✅ Run all verification commands
24. ✅ Validate all structured data via Google Rich Results test
25. ✅ Update sitemap.xml with final `<lastmod>` dates

---

## Ongoing (Post-Implementation)

- Monitor Search Console weekly for the first month
- Add new FAQ questions as they come from customer enquiries
- Update pricing on all pages when prices change
- Refresh content dates quarterly
- Track AI citation progress (monthly check across ChatGPT, Perplexity, Google AI Overviews)
- Add blog/content pages for long-tail queries (e.g. "sheer vs blackout curtains Dubai", "how to choose curtains for your Dubai apartment") — this is a separate effort, not part of this brief

---

**End of SEO & AEO Implementation Plan**

*Prepared for Jan Furnishings — thejanfurniture.com*
*April 2026*
*To be implemented via Claude Code on the static HTML codebase*
