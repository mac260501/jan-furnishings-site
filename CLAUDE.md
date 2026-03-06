# CLAUDE.md — The Jan Group Project Brief

This file gives you full context on the two active projects in this codebase. Read this before touching any file.

---

## Who The Client Is

**Mohammad** is the developer/marketer building and maintaining digital assets for two related UAE businesses owned by **Jan (Rehan Jan)**:

1. **Jan Furnishings** — custom curtains, blinds & window treatments
2. **Al Hadeeqa Contracting** — construction, pergolas, carports, safe rooms, dewatering, etc.

These two brands, plus **Jan Interiors** (wall panels, wallpapers, painting, renovation), form **The Jan Group**. All three brands should cross-link to each other via a consistent brand navigation pattern (see Brand Navigation section below).

---

## Project 1: Jan Furnishings Website

### Overview
- **Domain:** `thejanfurniture.com` (main site) + `offers.thejanfurniture.com` (campaign landing pages)
- **Stack:** Static HTML/CSS/JS — no framework
- **Hosting:** Netlify
- **Primary conversion:** WhatsApp button (`https://wa.me/971508806292`) + lead forms
- **Google Ads conversion ID:** `AW-658897837`
- **GA4 tag:** `G-W2DJLPY4HR`

### Brand Design System
```
Font display:  Cormorant Garamond (serif, Google Fonts)
Font body:     DM Sans (sans-serif, Google Fonts)
--charcoal:    #1A1A1A  (primary background)
--charcoal-2:  #232323
--charcoal-3:  #2B2B2B
--gold:        #C9A96E  (primary accent — DO NOT CHANGE)
--gold-light:  #E8D5B0
--gold-dim:    rgba(201,169,110,0.12)
--text:        #F0EDE8
--text-muted:  #9A9590
```
**Theme:** Dark luxury. Charcoal backgrounds, gold accents, generous whitespace, italic serif headlines.

### Glass Panel Pattern (used on hero text blocks)
```css
background: rgba(20,20,20,0.55);
backdrop-filter: blur(18px);
-webkit-backdrop-filter: blur(18px);
border: 1px solid rgba(255,255,255,0.07);
padding: 44px 52px 48px;
```
Applied on hero sections of: `home.html`, `about.html`, `interiors.html`, `packages.html`

### Nav Pattern
```css
position: fixed;
top: 36px; /* 36px when brand bar is present, 0 without it */
background: rgba(26,26,26,0.9);
backdrop-filter: blur(14px);
border-bottom: 1px solid rgba(201,169,110,0.2);
```
On scroll past 20px → background becomes `rgba(26,26,26,0.97)`

### File Structure (main site)
```
thejanfurniture.com/
├── index.html
├── about.html
├── products.html       (curtains & blinds product pages)
├── interiors.html      (wall panels, wallpaper, painting, renovation)
├── packages.html       (villa packages — curtains/blinds + interiors)
├── estimate.html
├── book.html
├── help.html
└── assets/
    └── images/         (ALL images are local — never use external URLs)
```

### Campaign Landing Pages (`offers.thejanfurniture.com`)
```
/curtains          → curtains Ramadan landing page
/blinds            → blinds Ramadan landing page
/new-homeowners    → new homeowners landing page
```
Each page has: Google Ads tag, GA4 tag, form submission tracking, WhatsApp click tracking.

### packages.html — Package Pricing Reference
- **Curtains & Blinds:** Residence AED 3,500 / Estate AED 7,500 / Signature AED 14,000
- **Interiors:** Canvas AED 8,000 / Transformation AED 18,500 / Masterwork AED 35,000+
- **Villa Bundles:** Villa Complete AED 22,000 / Villa Prestige AED 45,000+

### Ramadan 2026 Campaign
- Campaign name: "Jan Furnishings — Ramadan 2026"
- Budget: AED 60/day · Bidding: Maximize Clicks → Maximize Conversions (after 15+ conversions)
- Ad groups: Curtains (50%), Blinds (30%), New Homeowners (20%)
- Offer: Buy 1 Get 1 Free + 30% off · Ends ~March 19-22, 2026

---

## Project 2: Al Hadeeqa Contracting Website

### Overview
- **Domain:** `alhadeeqacontracting.com`
- **Stack:** React (Create React App)
- **Key files:** `src/App.jsx`, `src/App.css`, `src/index.js`
- **Hosting:** Netlify · Build: `npm run build` · Publish dir: `build`
- **Logo:** `/logo.jpeg` (in `public/`)
- **Redirects:** `public/_redirects`

### Brand Design System
```
Font display:  Playfair Display (serif, Google Fonts)
Font body:     DM Sans
GREEN:         #1a4a26  (primary — dark forest green — DO NOT CHANGE)
GREEN_L:       #1d5229  (hover)
GREEN_DIM:     rgba(26,74,38,0.10)
GREEN_BORDER:  rgba(26,74,38,0.18)
Background:    #f4f8f5 (light sage) / #ffffff (white sections)
```
**Theme:** Clean, light, premium construction. White/sage backgrounds, dark green, serif headlines.

### App.jsx Component Structure
```
LogoImg          — renders /logo.jpeg
WaIcon / FbIcon / IgIcon — SVG icons
SERVICES[]       — 9 service objects (id, title, subtitle, desc, image, tags, highlight?)
STATS[]          — company stats
useInView()      — IntersectionObserver scroll animation hook → returns [ref, inView]
ContactModal     — modal enquiry form, submits via WhatsApp URL
Nav              — fixed nav, scrolled state, mobile hamburger menu
Hero             — full-viewport hero with stats card
ServicesOverview — 3×3 grid jump-nav to service sections
ServiceCard      — animated individual service card
Services         — full service detail list
LuxurySpotlight  — supercar carport highlight section (dark green bg)
About            — company history + stats grid
Projects         — photo grid of recent work
Contact / ContactFormInline — inline form → WhatsApp submit
Footer           — links, social icons, sister company refs
FloatingWa       — fixed WhatsApp CTA button (bottom right) — DO NOT REMOVE
App              — root component, manages modal state
styles{}         — ALL base styles as inline object at bottom of file
```

### Services (9 total)
1. Construction & Remodeling
2. Luxury Pergolas *(highlight)*
3. Supercar Carports *(highlight)*
4. Glass Rooms & Partitions
5. Dewatering & Shoring
6. Excavation
7. Demolition
8. Roof Waterproofing
9. Maintenance

**SafeHaven** (underground bunkers) = sub-brand. Listed in footer + services dropdown. Has `/bunker` page. NOT a primary nav item.

### CSS Architecture
- **`styles{}`** object in `App.jsx` — all base/component styles (inline)
- **`App.css`** — responsive overrides ONLY, using `!important` to beat inline styles
- Breakpoints: `1024px` (tablet), `768px` (mobile), `480px` (small mobile)
- Rule: add base styles to `styles{}`, add responsive overrides to `App.css`

### Contacts
```
WhatsApp:  https://wa.me/971544419854
Phone:     +971 50 482 4621
Email:     alhadeeqallc@gmail.com
Address:   Downtown Dubai, UAE 23435
```

---

## Brand Navigation System (BOTH projects)

All three Jan Group brands cross-link via three consistent UI patterns:

### Pattern 1 — "Our Group" Mega-Menu (desktop nav item)
Dropdown from a nav item showing all 3 brand cards:
- Each card: icon + brand name + one-line description + arrow link
- Current site's card: "Current" badge, no link
- Closes on outside click

### Pattern 2 — Brand Top Bar (thin bar ABOVE the nav)
- Height: 34–36px, always visible
- Left: "The Jan Group" label
- Right: Three brand pill links, current highlighted
- **Jan Furnishings:** `#111` bar, gold highlight (`#C9A96E`)
- **Al Hadeeqa:** `#1a4a26` green bar, green dot (`#6dbf7e`) on current
- When bar is present: nav `top` = `34px` (not `0`)

### Pattern 3 — Footer Brand Section (above main footer)
Three equal brand cards in a grid:
- Icon, name, description, "Visit site" link
- Current brand: "You are here" badge, no outbound link
- **Jan Furnishings:** Dark charcoal cards with gold accents
- **Al Hadeeqa:** Dark green cards with white/light text

### Mobile (both)
Hamburger menu includes "The Jan Group" section at the bottom showing all 3 brands with icons. Current brand is highlighted.

### Brand URLs
```
Jan Furnishings:  https://thejanfurniture.com
Jan Interiors:    https://thejanfurniture.com/interiors  (or /interiors.html)
Al Hadeeqa:       https://alhadeeqacontracting.com
```

---

## Critical Rules

### Never do this:
- Change `--gold: #C9A96E` (Jan Furnishings) or `GREEN: #1a4a26` (Al Hadeeqa)
- Use external image URLs in Jan Furnishings HTML files — always `assets/images/`
- Use `<form>` tags in the React project — use `onClick` handlers only
- Use generic fonts (Inter, Roboto, Arial, system-ui)
- Make SafeHaven a primary nav item
- Remove the FloatingWa WhatsApp button from Al Hadeeqa

### Always do this:
- Make WhatsApp the primary CTA on every page
- Keep luxury/premium tone — no cheap-looking layouts
- Account for brand bar offset (36px) when calculating nav `top` and hero padding
- Add responsive styles to `App.css`, not to `styles{}` in App.jsx
- Test mobile layout — many UAE users browse on mobile

---

## Quick Reference
```
Jan Furnishings WhatsApp:    https://wa.me/971508806292
Jan Furnishings Google Maps: https://maps.app.goo.gl/etJY1YDiJ8i8XH1C6
Al Hadeeqa WhatsApp:         https://wa.me/971544419854
Al Hadeeqa Phone:            tel:+971504824621
Al Hadeeqa Email:            mailto:alhadeeqallc@gmail.com
Google Ads ID:               AW-658897837
GA4 Tag:                     G-W2DJLPY4HR
```