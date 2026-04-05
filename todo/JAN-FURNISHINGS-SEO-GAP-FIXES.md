# Jan Furnishings — SEO Gap Fixes
## Claude Code Implementation Brief

---

## ⚠️ CRITICAL INSTRUCTION: DO NOT REDESIGN THE SITE

This is an additive fix. Do not change any existing visual design, layout, typography, or component structure. Read the existing codebase before making any changes.

---

## What This Brief Covers

Three gaps identified during a post-deployment SEO audit. All are additive — no existing content needs to be removed or restructured.

---

## Fix 1: Add JSON-LD to All Interiors Sub-Site Pages

**Problem:** All 5 interiors pages have zero structured data — no Organisation schema, no Breadcrumb schema.

**Pages to update:**

| File | URL |
|------|-----|
| `interiors/index.html` | `/interiors/` |
| `interiors/services/index.html` | `/interiors/services/` |
| `interiors/packages/index.html` | `/interiors/packages/` |
| `interiors/portfolio/index.html` | `/interiors/portfolio/` |
| `interiors/book/index.html` | `/interiors/book/` |

**Add to the `<head>` of EVERY interiors page — Organisation schema:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://thejanfurniture.com/#organization",
  "name": "Jan Furnishings",
  "alternateName": ["Jan Furniture", "The Jan Furniture", "Jan Interiors"],
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
  "areaServed": [
    {"@type": "City", "name": "Dubai"},
    {"@type": "City", "name": "Abu Dhabi"},
    {"@type": "City", "name": "Sharjah"}
  ],
  "sameAs": [
    "https://maps.app.goo.gl/etJY1YDiJ8i8XH1C6"
  ],
  "parentOrganization": {
    "@type": "Organization",
    "name": "Jan Group",
    "url": "https://thejanfurniture.com"
  }
}
</script>
```

**Add Breadcrumb schema to each interiors page (unique per page):**

**For `/interiors/`:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://thejanfurniture.com/"},
    {"@type": "ListItem", "position": 2, "name": "Interiors", "item": "https://thejanfurniture.com/interiors/"}
  ]
}
</script>
```

**For `/interiors/services/`:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://thejanfurniture.com/"},
    {"@type": "ListItem", "position": 2, "name": "Interiors", "item": "https://thejanfurniture.com/interiors/"},
    {"@type": "ListItem", "position": 3, "name": "Services", "item": "https://thejanfurniture.com/interiors/services/"}
  ]
}
</script>
```

**For `/interiors/packages/`:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://thejanfurniture.com/"},
    {"@type": "ListItem", "position": 2, "name": "Interiors", "item": "https://thejanfurniture.com/interiors/"},
    {"@type": "ListItem", "position": 3, "name": "Packages", "item": "https://thejanfurniture.com/interiors/packages/"}
  ]
}
</script>
```

**For `/interiors/portfolio/`:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://thejanfurniture.com/"},
    {"@type": "ListItem", "position": 2, "name": "Interiors", "item": "https://thejanfurniture.com/interiors/"},
    {"@type": "ListItem", "position": 3, "name": "Portfolio", "item": "https://thejanfurniture.com/interiors/portfolio/"}
  ]
}
</script>
```

**For `/interiors/book/`:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://thejanfurniture.com/"},
    {"@type": "ListItem", "position": 2, "name": "Interiors", "item": "https://thejanfurniture.com/interiors/"},
    {"@type": "ListItem", "position": 3, "name": "Book a Consultation", "item": "https://thejanfurniture.com/interiors/book/"}
  ]
}
</script>
```

**Also add to each interiors page `<head>` — OG tags, canonical, and llms.txt link:**

Check each interiors page for:
- `<link rel="canonical" href="https://thejanfurniture.com/interiors/[path]" />` — add if missing
- `<meta property="og:title">` — add if missing, use the existing `<title>` content
- `<meta property="og:description">` — add if missing
- `<meta property="og:url">` — add if missing
- `<link rel="alternate" type="text/plain" href="https://thejanfurniture.com/llms.txt" title="LLM-readable site summary" />` — add if missing

---

## Fix 2: Add Answer-First Paragraph + Trust Signals to Homepage

**Problem:** The homepage body has great product cards and process steps but no answer-first paragraph for AI engines to extract, and no structured trust signals section.

**Step 1: Add answer-first paragraph after the hero section.**

Find the hero section (the glassmorphism panel with "Beautiful windows, effortlessly done."). Immediately AFTER the hero section and BEFORE the bestselling products section, add:

```html
<section class="answer-first" style="padding: 3rem 2rem; max-width: 800px; margin: 0 auto; text-align: center;">
  <p style="font-family: 'DM Sans', sans-serif; font-size: 1.05rem; line-height: 1.8; color: var(--text-muted, #8A857D);">
    <strong style="color: var(--text, #EDE9E3);">Jan Furnishings is Dubai's custom curtain and blind specialist, serving homeowners across Dubai, Abu Dhabi, and Sharjah.</strong>
    We offer free home consultations, professional measurement, and same-week installation. With 500+ homes fitted and a 5-star Google rating, we provide bespoke window treatments — from sheer and blackout curtains to roller, wooden, and motorized blinds. Packages start from AED 3,500 for apartments.
  </p>
</section>
```

**IMPORTANT:** Match the colour variables to whatever the existing codebase uses. The above uses `var(--text)` and `var(--text-muted)` — check the actual CSS variable names in the existing code and adjust. The visual style should blend seamlessly with the existing homepage sections.

**Step 2: Add trust signals section.**

After the answer-first paragraph and before the bestselling products section, add a trust signals strip. Use the same visual pattern as the existing stat counters in the hero (500+ / 48hr / 5★ / 100+) but with different, more specific signals:

```html
<section class="trust-signals" style="padding: 2rem; text-align: center;">
  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; max-width: 900px; margin: 0 auto;">
    <div style="min-width: 140px;">
      <div style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: var(--gold, #C9A96E);">Free</div>
      <div style="font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: var(--text-muted);">Home Consultation</div>
    </div>
    <div style="min-width: 140px;">
      <div style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: var(--gold, #C9A96E);">Free</div>
      <div style="font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: var(--text-muted);">Old Fittings Removal</div>
    </div>
    <div style="min-width: 140px;">
      <div style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: var(--gold, #C9A96E);">Same-Week</div>
      <div style="font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: var(--text-muted);">Installation</div>
    </div>
    <div style="min-width: 140px;">
      <a href="https://maps.app.goo.gl/etJY1YDiJ8i8XH1C6" target="_blank" style="text-decoration: none;">
        <div style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: var(--gold, #C9A96E);">5-Star</div>
        <div style="font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: var(--text-muted);">Google Rated</div>
      </a>
    </div>
    <div style="min-width: 140px;">
      <div style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: var(--gold, #C9A96E);">Jan Group</div>
      <div style="font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: var(--text-muted);">Part of a Larger Family</div>
    </div>
  </div>
</section>
```

**IMPORTANT:** These are reference HTML blocks. You MUST adapt the CSS to match the existing site's styling patterns — use existing CSS classes, variables, and component structures rather than inline styles if the codebase uses a consistent approach. The content and structure is what matters; the styling must match the existing site.

---

## Fix 3: Add Contextual Links to New Service Pages in Homepage Body

**Problem:** The homepage body content doesn't link to `/curtains`, `/blinds`, `/motorized`, or `/faq` anywhere. Only the footer does.

**Where to add links:**

1. **In the bestselling products section** — each product card already links to `/products#combo`, `/products#sheer`, etc. Add an additional contextual sentence or link near the section heading that links to the dedicated service pages:

After the section heading "Our bestselling products." add a brief line:

```html
<p style="...match existing subtitle styling...">
  Explore our full range of <a href="/curtains" style="color: var(--gold);">custom curtains</a>,
  <a href="/blinds" style="color: var(--gold);">blinds</a>, and
  <a href="/motorized" style="color: var(--gold);">motorized options</a>.
</p>
```

2. **In the "Why Jan Furnishings" section** — within the existing copy, add contextual links. For example, in the section about "Custom-Made, Professionally Installed", link to the service pages:

Find: text mentioning curtains and blinds in this section.
Add contextual links to `/curtains` and `/blinds` where they naturally fit in the copy.

3. **In the process section or near the bottom CTA** — add a line like:

```html
<p style="...match existing styling...">
  Not sure where to start? Check our <a href="/faq" style="color: var(--gold);">FAQ</a> or
  browse <a href="/packages" style="color: var(--gold);">packages from AED 3,500</a>.
</p>
```

**The key principle:** These should feel like natural, helpful links within existing content — not a bolted-on "Related Pages" block. Use the same link colour as existing links in the codebase.

---

## Verification Commands

After deployment, run these to confirm:

```bash
# Fix 1: Interiors pages now have JSON-LD
for page in "interiors/" "interiors/services/" "interiors/packages/" "interiors/portfolio/" "interiors/book/"; do
  count=$(curl -s "https://thejanfurniture.com/$page" | grep -o 'application/ld+json' | wc -l)
  canon=$(curl -s "https://thejanfurniture.com/$page" | grep -c 'rel="canonical"')
  og=$(curl -s "https://thejanfurniture.com/$page" | grep -c 'og:title')
  llms=$(curl -s "https://thejanfurniture.com/$page" | grep -c 'llms.txt')
  echo "$page → JSON-LD: $count | canonical: $canon | OG: $og | llms.txt: $llms"
done

# Fix 2: Homepage has answer-first paragraph
curl -s https://thejanfurniture.com/ | grep -c "custom curtain and blind specialist"

# Fix 3: Homepage links to service pages
curl -s https://thejanfurniture.com/ | grep -oP 'href="[^"]*"' | grep -E '/(curtains|blinds|motorized|faq)"' | sort -u
```

---

**End of Gap Fixes Brief**

*April 2026 — For implementation via Claude Code on thejanfurniture.com*
