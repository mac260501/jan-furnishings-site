# Task: Integrate Jan Interiors Sub-Site into thejanfurniture.com

## What This Task Is

A complete Jan Interiors sub-site has been designed and built as standalone HTML files. Your job is to integrate them into the existing `thejanfurniture.com` codebase cleanly — correct folder structure, shared assets, consistent nav patterns, no broken links.

**Do not redesign anything.** The visual design, copy, and layout of these files are final and approved. Your job is structural integration only.

---

## The Files to Integrate

You will be given 5 HTML files:

| File | Destination |
|------|-------------|
| `jan-interiors-home.html` | `interiors/index.html` |
| `jan-interiors-services.html` | `interiors/services/index.html` |
| `jan-interiors-packages.html` | `interiors/packages/index.html` |
| `jan-interiors-portfolio.html` | `interiors/portfolio/index.html` |
| `jan-interiors-book.html` | `interiors/book/index.html` |

All files go inside a new `/interiors/` folder at the root of the Jan Furnishings site, sitting alongside `index.html`, `about.html`, etc.

---

## Jan Interiors Design System

These pages use a distinct but related design system to Jan Furnishings. **Do not merge them into the Jan Furnishings CSS variables.**

```
Font display:  Cormorant Garamond (same as JF — brand family tie)
Font body:     Jost (NOT DM Sans — this is the differentiator)

--ink:          #141412   (deeper than JF charcoal)
--ink-2:        #1e1e1b
--ink-3:        #272723
--stone-light:  #f2ede6   (warm off-white — key differentiator vs JF)
--stone-mid:    #e0d8cc
--gold:         #C9A96E   (same gold as JF — brand family tie)
--gold-light:   #E8D5B0
--gold-border:  rgba(201,169,110,0.22)
--text:         #EDE9E3
--text-muted:   #8A857D
```

---

## Folder Structure to Create

```
thejanfurniture.com/
├── index.html
├── about.html
├── interiors.html          ← existing file, do NOT modify
├── packages.html           ← existing file, do NOT modify
├── ...other existing files
│
└── interiors/              ← CREATE THIS FOLDER
    ├── index.html          ← jan-interiors-home.html
    ├── services/
    │   └── index.html      ← jan-interiors-services.html
    ├── packages/
    │   └── index.html      ← jan-interiors-packages.html
    ├── portfolio/
    │   └── index.html      ← jan-interiors-portfolio.html
    └── book/
        └── index.html      ← jan-interiors-book.html
```

Each page uses `index.html` inside its own folder so URLs are clean:
- `thejanfurniture.com/interiors/`
- `thejanfurniture.com/interiors/services/`
- `thejanfurniture.com/interiors/packages/`
- `thejanfurniture.com/interiors/portfolio/`
- `thejanfurniture.com/interiors/book/`

---

## Internal Link Audit — Fix These in Every File

The HTML files use relative paths. After placing them in their correct folders, verify and fix every internal link:

### In `interiors/index.html` (homepage):
All nav and CTA links should be:
```
Home           → /interiors/
Services       → /interiors/services/
Portfolio      → /interiors/portfolio/
Packages       → /interiors/packages/
About          → /interiors/about/       (placeholder — does not exist yet, leave as-is)
Book           → /interiors/book/
```

### In `interiors/services/index.html`:
Same nav links as above. All "Book a Free Quote" and "Get a Free Quote" CTAs → `/interiors/book/`

### In `interiors/packages/index.html`:
Same nav links. All "Get a Quote" / "Enquire Now" buttons → `/interiors/book/`

### In `interiors/portfolio/index.html`:
Same nav links. "Start Your Project" and "Book a Free Consultation" → `/interiors/book/`

### In `interiors/book/index.html`:
Same nav links. No outbound booking links (this IS the booking page).

### Cross-brand links (do NOT change these):
```
Jan Furnishings brand bar link  → https://thejanfurniture.com
Al Hadeeqa brand bar link       → https://alhadeeqacontracting.com
Footer Jan Furnishings link     → https://thejanfurniture.com
Footer Al Hadeeqa link          → https://alhadeeqacontracting.com
WhatsApp links                  → https://wa.me/971508806292  (never change)
```

---

## Image Strategy

The Jan Interiors pages currently use Unsplash URLs for stock images (intentional — real project photos are not available yet). 

**Leave all image URLs as-is.** Do NOT replace them with `assets/images/` paths. These are placeholders that will be swapped out when Jan provides real photography. The only exception: if the main site already has interior-relevant images in `assets/images/` that match, you may use those — but do not move or rename existing assets.

---

## What to Check on the Main Site Nav

The existing `interiors.html` (Jan Furnishings' interiors overview page) already lives at `thejanfurniture.com/interiors.html`. 

The new sub-site lives at `thejanfurniture.com/interiors/` (directory, not `.html` file). These do NOT conflict — Netlify will serve them as separate routes. Confirm this is the case and flag if there's a redirect conflict.

**Do not add Jan Interiors to the Jan Furnishings main nav.** The existing Jan Furnishings nav already has "Interiors" pointing to `interiors.html` — leave that alone. The two are separate brand experiences.

---

## Netlify Configuration

If a `netlify.toml` or `_redirects` file exists at the root, check it for any catch-all redirects that might interfere with the `/interiors/` directory. Add specific rules if needed to ensure clean routing:

```
# In _redirects (if using _redirects file):
/interiors        /interiors/         301
/interiors/       /interiors/index.html   200

# These should be handled automatically by Netlify's directory routing,
# but add explicitly if there are existing catch-all rules overriding them.
```

---

## Shared CSS Extraction (Optional — Do If Clean, Skip If Risky)

Each of the 5 Jan Interiors HTML files contains the full CSS inline in a `<style>` block. There is significant shared CSS across all 5 pages (brand bar, nav, footer brands, button styles, reveal animations, CSS variables).

**If the codebase has a clear pattern for shared CSS** (e.g., an `assets/css/` folder already used by other pages), extract the shared Jan Interiors CSS into:
```
assets/css/jan-interiors.css
```
And link it in each page's `<head>`:
```html
<link rel="stylesheet" href="/assets/css/jan-interiors.css" />
```
Keep page-specific CSS in each file's `<style>` block.

**If the codebase is purely self-contained HTML files with no shared CSS pattern**, leave the CSS inline in each file. Do not introduce a new CSS pattern just for this feature — consistency with the existing codebase matters more.

---

## Shared JS Extraction (Optional — Same Rule)

Each page has ~10 lines of shared JavaScript at the bottom (hamburger menu toggle, IntersectionObserver for scroll reveals). The booking page (`book/index.html`) also has a `submitForm()` function — keep that page-specific.

Apply the same rule: extract to `assets/js/jan-interiors.js` only if the codebase already uses shared JS files. Otherwise leave inline.

---

## Quality Checks Before You're Done

Run through these before finishing:

- [ ] All 5 pages load without errors
- [ ] Nav links work correctly on every page (active state matches current page)
- [ ] "Book a Consultation" button on every page goes to `/interiors/book/`
- [ ] WhatsApp links all point to `https://wa.me/971508806292`
- [ ] Brand bar shows correct active state (Jan Interiors highlighted) on all 5 pages
- [ ] Footer "You are here" badge is on Jan Interiors card on all 5 pages
- [ ] Jan Furnishings main site nav is untouched
- [ ] `interiors.html` (old page) still resolves at `thejanfurniture.com/interiors.html`
- [ ] `interiors/` (new sub-site) resolves at `thejanfurniture.com/interiors/`
- [ ] Mobile hamburger menu works on all pages
- [ ] Scroll reveal animations trigger correctly
- [ ] Portfolio filter buttons work (All / Wall Panels / Wallpaper / Painting / Renovation)
- [ ] Booking form WhatsApp submit opens correct pre-filled message
- [ ] No console errors on any page

---

## What NOT to Do

- Do not change any colours, fonts, spacing, or layout
- Do not add the Jan Interiors pages to the Jan Furnishings main navigation
- Do not modify `interiors.html`, `packages.html`, or any other existing main site file
- Do not replace Unsplash image URLs with local assets
- Do not add the "About" page — it is intentionally missing for now
- Do not change the WhatsApp number (`971508806292`)
- Do not remove the mobile hamburger menu or the scroll reveal system
- Do not use `<form>` tags — the booking page already uses `<button onclick>` correctly

---

## Contact & Brand Quick Reference

```
Jan Interiors WhatsApp:    https://wa.me/971508806292
Jan Interiors Email:       janfurniture.ae@gmail.com
Jan Furnishings site:      https://thejanfurniture.com
Al Hadeeqa site:           https://alhadeeqacontracting.com
Google Ads ID:             AW-658897837
GA4 Tag:                   G-W2DJLPY4HR
```
