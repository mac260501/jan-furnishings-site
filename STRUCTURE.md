# Workspace Structure — Jan Furnishings Site

How this repo is laid out and why. For brand rules, colours, and copy guidelines see
[CLAUDE.md](CLAUDE.md); for build/deploy commands see [README.md](README.md).

**Stack:** static HTML + Vite (multi-page build) + a small React island for the shared
header/footer. Deployed to Netlify at `thejanfurniture.com`.

---

## Top level

```
jan-furnishings-site/
├── *.html              ← deployed pages (one file = one live URL)
├── assets/             ← stylesheets, scripts, images
├── interiors/          ← Jan Interiors sub-site (/interiors/…)
├── src/                ← shared React layout island
├── scripts/            ← post-deploy tooling
├── docs/               ← project documentation (not deployed)
├── marketing/          ← off-site assets (not deployed)
├── vite.config.js      ← build config
├── netlify.toml        ← hosting config
├── _redirects          ← Netlify URL routing + 301s
└── robots.txt · sitemap.xml · llms.txt · 2f27…txt   ← SEO / crawler root files
```

---

## Root HTML — the deploy surface

**Root `.html` filenames are live URLs. Do not move them into folders.**
`vite.config.js` scans the repo root for `*.html` and makes each one a build entry;
`_redirects` then maps the clean URL onto it (`/curtains` → `/curtains.html`).
Moving a file here changes a public, indexed URL.

| File | Live URL | Purpose |
|---|---|---|
| `index.html` | `/` | Homepage |
| `products.html` | `/products` | Product overview |
| `curtains.html` | `/curtains` | Curtains category |
| `blinds.html` | `/blinds` | Blinds category |
| `motorized.html` | `/motorized` | Motorised treatments |
| `packages.html` | `/packages` | Villa & room packages |
| `estimate.html` | `/estimate` | Estimate tool |
| `book.html` | `/book` | Book a free visit |
| `about.html` | `/about` | About / team |
| `help.html` | `/help` | Help centre |
| `faq.html` | `/faq` | FAQ (has FAQPage schema) |
| `kevlar.html` | `/kevlar` | Kevlar curtains product page |
| `privacy-policy.html` | `/privacy-policy.html` | Legal |
| `terms-of-use.html` | `/terms-of-use.html` | Legal |

The two legal pages use the older `site` layout variant (a plain `header.site-header` /
`footer.site-footer`); every other page uses the `luxury` variant. See `src/` below.

### Root files that must stay at root

- `robots.txt`, `sitemap.xml`, `llms.txt` — crawler-facing, must resolve at `/`.
- `2f27756be4974a51948c2aa285fb06d1.txt` — IndexNow key. Bing rejects submissions if
  this stops resolving at `/`. `netlify.toml` pins its `Content-Type` to plain text.
- `_redirects` — Netlify routing.

`vite.config.js` copies all five into `dist/` on build.

---

## `assets/`

```
assets/
├── site.css            ← shared stylesheet
├── site.js             ← shared script
└── images/
    ├── brand/          (6)   favicons, logo, OG image, team + storefront photos
    ├── clients/        (6)   commercial client logos shown on the homepage
    ├── partners/       (5)   developer/partner logos
    ├── heroes/         (16)  page hero and section background images
    ├── products/
    │   ├── curtains/   (7)   curtain product shots
    │   ├── blinds/     (8)   blind product shots
    │   └── motorized/  (2)   motorised control shots
    ├── kevlar/         (6)   Kevlar page imagery
    ├── interiors/
    │   ├── services/   (5)   wall panels, wallpaper, painting, renovation
    │   ├── projects/   (16)  completed project photography
    │   └── packages/   (2)   villa bundle imagery
    └── optimized/      (26)  responsive derivatives (`-800`, `-1500`, `-1920` suffixes)
```

Images are named for **what they show**, not where they came from
(`products/blinds/venetian-aluminium.webp`, not `download-13.webp`).

Two rules:

1. **Never reference an external image URL** from Jan Furnishings pages — always
   `assets/images/…`. (The `interiors/` sub-site currently violates this; see Known issues.)
2. Files in `optimized/` are generated derivatives. Their base image lives elsewhere in
   the tree; regenerate rather than hand-edit.

Vite hashes and copies images referenced from HTML/CSS. Images referenced only from a
**JS string literal** (e.g. `interiors/villa-bundles.js`) are invisible to that pipeline,
so `vite.config.js` also mirrors the whole `assets/images/` folder into
`dist/assets/images/`. That is why both hashed and unhashed copies appear in `dist/`.

---

## `interiors/` — Jan Interiors sub-site

```
interiors/
├── index.html          → /interiors/
├── services/index.html → /interiors/services/
├── packages/index.html → /interiors/packages/
├── portfolio/index.html→ /interiors/portfolio/
├── book/index.html     → /interiors/book/
├── about/index.html    → /interiors/about/   (not in sitemap.xml)
├── brand-bar.js        ← Jan Group top bar
├── nav.js              ← sub-site navigation
├── wa-button.js        ← floating WhatsApp CTA
└── villa-bundles.js    ← villa package cards
```

Directory-per-page, so URLs carry a trailing slash. Two pieces of config support this:

- `vite.config.js` has a dev-server middleware that resolves `/interiors/x/` → `index.html`.
- `netlify.toml` 301s `/interiors` → `/interiors/`.

The four `.js` files are **plain IIFE scripts**, not ES modules, so Vite will not bundle
them — `vite.config.js` copies them verbatim into `dist/interiors/`. If you add another
script here, add its filename to that copy list too.

---

## `src/` — shared React layout island

Every page loads `<script type="module" src="/src/layout-react.jsx">`. That script finds
the existing header/footer in the static HTML and replaces it with the React version, so
the nav, footer, and WhatsApp float are defined in exactly one place.

```
src/
├── layout-react.jsx    ← entry: detects page + variant, mounts the components
└── layout/
    ├── constants.js    ← nav links, page keys, WhatsApp number, contact details
    ├── Header.jsx      ← SiteHeader + LuxuryHeader
    ├── Footer.jsx      ← SiteFooter + LuxuryFooter (incl. Jan Group brand cards)
    ├── WhatsAppFloat.jsx
    ├── HeroGlass.js
    └── styles.css
```

**Two layout variants**, chosen at runtime by inspecting the DOM:

| Variant | Detected by | Used on |
|---|---|---|
| `site` | `header.site-header` present | the two legal pages |
| `luxury` | `#nav` or `.nav-links` present | every other page |

**`constants.js` is the single source of truth for navigation.** `NAV_LINKS`, `BOOK_LINK`,
and `PAGE_KEY_BY_FILE` drive both variants — change a nav target there, not in the HTML.

`PAGE_KEY_BY_FILE` also powers WhatsApp lead-source tagging: `whatsappHrefWithSource()`
appends `[via Curtains Page]` and so on, so an incoming WhatsApp message identifies the
page it came from. Off-site equivalents are listed in
[docs/whatsapp-offsite-link-tags.md](docs/whatsapp-offsite-link-tags.md).

---

## `scripts/`

| Script | What it does |
|---|---|
| `submit-indexnow.sh` | Pushes sitemap URLs to IndexNow (Bing, and therefore ChatGPT search). Run after every content deploy. Accepts specific paths: `./scripts/submit-indexnow.sh /curtains` |
| `verify-deploy.sh` | Post-deploy smoke test: page status codes, GA4 tag on every page, root files resolve, pricing consistency, legacy redirects |

---

## `docs/` and `marketing/` — not deployed

- `docs/site-audit-and-fix-brief.md` — the SEO/performance audit and its fix list.
  A historical record: it references pre-cleanup filenames.
- `docs/whatsapp-offsite-link-tags.md` — pre-tagged WhatsApp links to paste into Google
  Business Profile, Instagram bio, email signatures, print QR codes.
- `marketing/instagram-post-kevlar.html` — a one-off Instagram post mockup. Deliberately
  outside the root so Vite does not build it; open it directly in a browser.

---

## Build and deploy

```bash
npm install
npm run dev      # dev server on :5173
npm run build    # → dist/
npm run preview  # serve the built output
```

Netlify runs `npm run build` and publishes `dist/`. After a content deploy, run
`./scripts/submit-indexnow.sh` then `./scripts/verify-deploy.sh`.

`dist/` is generated and gitignored — never edit it, never commit it.

---

## Adding things

**A new page:** create `newpage.html` at the root, add a `/newpage → /newpage.html 200`
line to `_redirects`, add the URL to `sitemap.xml` and `llms.txt`, and add its file→key
entry to `PAGE_KEY_BY_FILE` in `src/layout/constants.js` so WhatsApp source tagging works.

**A new image:** drop it in the matching `assets/images/` subfolder with a descriptive
name. Reference it as `assets/images/<folder>/<name>.<ext>`.

**A new nav link:** edit `NAV_LINKS` in `src/layout/constants.js` only.

---

## Known issues

These predate the cleanup and are still open:

1. **The `interiors/` sub-site loads hero backgrounds from `images.unsplash.com`.** That
   breaks the "no external image URLs" rule, adds a third-party dependency to page render,
   and costs LCP. Affects `interiors/index.html`, `about/`, `services/`, `packages/`, and
   `book/`.
2. **`interiors/about/index.html` is not listed in `sitemap.xml`.**
3. **Several hero images exceed 500 KB** (`kevlar/texture-gold.jpg` at 878 KB,
   `interiors/projects/renovation-01.jpg` at 807 KB). The `optimized/` pipeline covers
   only the about and interiors-gallery images so far.
