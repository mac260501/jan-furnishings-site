# Jan Furnishings — Live Site Audit & Claude Code Fix Brief
## thejanfurniture.com + offers.thejanfurniture.com

**Audit performed:** August 2026, against the live production site
**Method:** Direct HTTP inspection of all 16 indexed URLs, header analysis, schema extraction, asset weight measurement, legacy-URL discovery
**Companion docs:** `JAN-FURNISHINGS-30-DAY-ORGANIC-GROWTH-PLAN.md`, `JAN-FURNISHINGS-SEO-AEO-IMPLEMENTATION-PLAN.md`

---

# ⚠️ CRITICAL INSTRUCTION: DO NOT REDESIGN THE SITE

**This is an additive, corrective implementation.** The site at `thejanfurniture.com` has an established design system, layout, and component structure that must be preserved exactly. Do not:

- Replace or restyle existing pages
- Change the visual layout, colour scheme, typography, spacing, or animation behaviour
- Alter the `:root` design tokens (note: `--gold` is currently set to `#FFFFFF` — this is an intentional current brand state, **leave it alone**)
- Remove or restructure existing content sections
- Introduce a build step, framework, bundler, or CSS library that isn't already in use
- "Improve" or refactor code that isn't explicitly named in this brief

**Instead:**

- Add tags, scripts, attributes, and files as specified
- Correct only the specific strings and values named in this brief
- Match existing patterns exactly when adding anything visible
- Read the existing page source before editing to understand the conventions in use

**Every task below names its exact files and scope. Anything not named is out of scope.**

---

# Audit Summary

## What is already correct (do not touch)

The previous SEO/AEO implementation was executed well. Verified working:

| Item | Status |
|---|---|
| All 16 sitemap URLs return HTTP 200 | ✅ |
| `robots.txt` present with explicit AI-crawler allows (GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, CCBot, anthropic-ai, cohere-ai) | ✅ |
| `sitemap.xml` present, valid, 16 URLs | ✅ |
| `llms.txt` present and served | ✅ |
| Unique `<title>` and `<meta name="description">` on every page | ✅ |
| Canonical tag on every page, pointing to non-www | ✅ |
| Exactly one `<h1>` per page across all 12 pages audited | ✅ |
| Open Graph tags present on every page | ✅ |
| JSON-LD present on every page (Organisation, Breadcrumb, Service, FAQPage, Product) | ✅ |
| `www` → non-www 301 redirect working | ✅ |
| Trailing-slash → non-slash 301 working (`/curtains/` → `/curtains`) | ✅ |
| Genuine 404 status on missing pages (not soft-404) | ✅ |
| HSTS enabled, HTTP/2, Netlify edge caching | ✅ |
| Content depth healthy: 750–1,750 words on service/content pages | ✅ |
| Service pages `/curtains`, `/blinds`, `/motorized`, `/faq` all live with FAQ schema | ✅ |
| Page-level WhatsApp source tags already present (`..via Curtains Page` etc.) | ✅ |
| A working per-window price calculator already exists on `/estimate` | ✅ |

**Implication:** the foundation is solid. The problems below are specific, fixable defects — not a rebuild.

## Defects found, by severity

### 🔴 P0 — Blocking / actively costing money

| # | Finding | Evidence | Impact |
|---|---|---|---|
| 1 | **Zero analytics on the entire main site.** No GA4, no gtag, no GTM, no dataLayer on any page. | `grep -ci 'googletagmanager\|gtag(\|google-analytics\|dataLayer'` returns **0** on all 12 pages. Only external script on homepage is AOS from unpkg. | This is the root cause of "we don't know where inquiries come from." There is no traffic data to analyse. The 90-day GA4 forensics step in the growth plan is currently impossible. |
| 2 | **Three different GA4/Ads IDs in circulation, none installed on the main site.** Offers subdomain runs `G-M73BX8Z0R8` + `AW-1391650837`. Project records reference `G-W2DJLPY4HR`. | Main site: none. `offers.thejanfurniture.com/summer-curtains-blinds`: both tags present and firing. | Data is split or lost. Must consolidate on ONE property before any measurement is trustworthy. |
| 3 | **`og:image` returns 404.** Every page references `https://thejanfurniture.com/assets/images/brand/og-image.jpg`, which does not exist. | `curl -I` → **404**, `text/html`, 3449 bytes (Netlify 404 page). | Every WhatsApp share, Instagram link, Facebook post, and iMessage preview of the site renders with no image. Given WhatsApp is the primary channel, this is a direct conversion leak on every shared link. |
| 4 | **Pricing contradicts itself across three surfaces.** | Homepage meta + visible copy: "packages from **AED 3,500**". Packages page + Product schema: **9,000 / 18,000 / 45,000**. `llms.txt`: **3,500 / 8,500 / 22,000**. Stray "AED 22,000" also present on packages page. | AI engines are currently being fed the wrong prices from `llms.txt` and the homepage. Anyone arriving from an AI answer expecting AED 3,500 and finding AED 9,000 bounces. This actively poisons the AEO strategy. |
| 5 | **No IndexNow.** | No key file at root; nothing pinging Bing. | ChatGPT's search runs on Bing. Every content change waits weeks for discovery instead of hours. |

### 🟠 P1 — Significant

| # | Finding | Evidence | Impact |
|---|---|---|---|
| 6 | **Offers subdomain is fully crawlable with no controls.** No `robots.txt` (404), no `sitemap.xml`, no canonical tag, no robots meta on any LP. | `offers.thejanfurniture.com/robots.txt` → 404. LP has zero canonical, zero robots meta. | LP title is `Custom Curtains & Blinds Dubai — Jan Furnishings | Free Installation` — near-identical to the homepage title. Direct keyword cannibalisation between the subdomain and the money pages. |
| 7 | **Legacy Shopify-era URLs are indexed and now 404.** | `/collections/blinds` appears in live search results titled "Blinds - JAN \| Furniture & Upholstery" but returns **404**. Same for `/collections/curtains`, `/collections/all`, `/pages/about`, `/cart`. | Whatever indexation history the old store accumulated is being thrown away, and search engines are collecting 404 signals on a domain we're trying to establish. |
| 8 | **Homepage image payload is heavy and unoptimised.** 32 images, **0** with `loading="lazy"`, **0** with `width`/`height`. | Largest assets: **843 KB** `vitalijs-barilo-...jpg`, **470 KB** `pexels-artbovich-6492384.jpg`, **391 KB** `pexels-artbovich-7214461.jpg`, 267 KB `jan-team.jpeg`, 210 KB `sheer-blackout-combo.webp`. | ~2.5 MB homepage. Poor LCP and CLS on mobile — which is nearly all UAE traffic. Core Web Vitals is a live ranking factor. |
| 9 | **11 of 32 homepage images have no `alt` attribute.** | 32 `<img>` tags, 21 with non-empty alt. | Accessibility failure + lost image-search and AI-vision context. |
| 10 | **No `AggregateRating` / `Review` schema anywhere**, despite real testimonials being rendered on the homepage and a 5-star Google profile existing. | No `AggregateRating` or `Review` type in any page's JSON-LD. | Star ratings can't appear in results, and AI engines have no structured rating to quote. This is one of the most-cited signals in "best X in Dubai" answers. |
| 11 | **`sitemap.xml` `lastmod` is stale** (all entries `2026-04-04`) and the offers subdomain has no sitemap at all. | — | Weak freshness signal. |

### 🟡 P2 — Worth fixing this cycle

| # | Finding | Impact |
|---|---|---|
| 12 | No `WebSite` schema with `SearchAction`, and no `sameAs` links to social profiles on the Organisation schema. | Weaker entity understanding by Google/AI engines. |
| 13 | WhatsApp tags are **page**-level only (`..via Curtains Page`). No **source**-level tags exist for Google Business Profile, Instagram, directories, or email signature. | Can't distinguish "found us via Google" from "found us via ChatGPT" from "found us via directory" — which is the entire question we're trying to answer. |
| 14 | The `..via X Page` tag renders awkwardly to the customer (double period). | Cosmetic; worth cleaning while we're touching every link anyway. |
| 15 | `/estimate` calculator is single-product, per-window only. It does not do whole-home or package-tier estimation, and fires no analytics events. | Underpowered relative to the growth plan's "Instant Quote Estimator". **It should be upgraded, not rebuilt** — see Task 12. |

---

# Implementation Tasks

Execute in order. Tasks 1–5 are the P0 block and should ship as one deploy. Tasks 6–11 as a second deploy. Task 12 is a separate session.

---

## TASK 1 — Install GA4 on every page of the main site

**Files:** all 12 HTML pages in the main site root + all 5 pages under `/interiors/`
**Scope:** insert one script block into `<head>`. Nothing else.

**First — resolve the property ID.** Mohammad must confirm which single GA4 property is canonical before this ships. The offers subdomain currently uses `G-M73BX8Z0R8`; project records reference `G-W2DJLPY4HR`. **Use whichever ID Mohammad confirms, and use the same one on both the main site and the offers subdomain** so cross-domain traffic lands in one property. The placeholder below is written as `G-XXXXXXXXXX` — do not guess, ask.

Insert immediately after the `<meta name="viewport">` line in `<head>` on every page:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
  gtag('config', 'AW-1391650837');
</script>
```

Then add WhatsApp click tracking. Add this **once** near the bottom of each page, just before the closing `</body>`:

```html
<script>
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="wa.me"]');
    if (!a) return;
    gtag('event', 'whatsapp_click', {
      link_url: a.href,
      page_path: window.location.pathname
    });
  });
</script>
```

Note: pages where WhatsApp opens via JavaScript (`/estimate`, `/book` use `window.open`) need the event fired inside those functions instead — add `gtag('event', 'whatsapp_click', { page_path: window.location.pathname });` as the line directly before each existing `window.open(...)` call.

**Do not** add GTM. **Do not** create a shared JS file — this site has no build step and pages are self-contained; follow that convention.

**Verification:**
```bash
for p in "" products about packages estimate book help curtains blinds motorized faq interiors/; do
  printf "%-14s " "/$p"
  curl -s "https://thejanfurniture.com/$p" | grep -c 'googletagmanager.com/gtag/js'
done
# Every line must print 1
```
Then confirm in **GA4 → Reports → Realtime** that a live visit registers, and that clicking a WhatsApp button produces a `whatsapp_click` event. Do not mark this task done on the curl check alone — that has been a repeat failure point on this account.

---

## TASK 2 — Create and deploy the OG image

**Files:** `assets/images/brand/og-image.jpg` (new)

Create a **1200 × 630 px** JPEG. Content: a Jan Furnishings interior shot (reuse `assets/sheer-blackout-combo-BSPmb4XK.webp` as the base — it's the strongest existing image) with the Jan Furnishings wordmark and the line **"Custom Curtains & Blinds — Dubai"**. Match the existing site typography (Cormorant Garamond for the wordmark, DM Sans for the strapline). Keep it under 300 KB.

Confirm the deployed path matches what every page already references: `https://thejanfurniture.com/assets/images/brand/og-image.jpg`.

Also add Twitter card tags to every page (currently absent), directly after the existing `og:` block:

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[same as og:title on that page]" />
<meta name="twitter:description" content="[same as og:description on that page]" />
<meta name="twitter:image" content="https://thejanfurniture.com/assets/images/brand/og-image.jpg" />
```

**Verification:**
```bash
curl -s -o /dev/null -w "%{http_code} %{content_type} %{size_download}\n" \
  https://thejanfurniture.com/assets/images/brand/og-image.jpg
# Must be: 200 image/jpeg <300000
```
Then paste the homepage URL into a WhatsApp chat with yourself and confirm the preview card renders the image.

---

## TASK 3 — Fix the pricing contradiction sitewide

**Canonical pricing (this is the single source of truth — nothing may contradict it):**

| Package | Price | Covers |
|---|---|---|
| The Residence | **From AED 9,000** | Apartments up to 3 bedrooms |
| The Estate | **From AED 18,000** | Full villas up to 5 bedrooms, includes free motorisation on 2 rooms |
| The Signature | **From AED 45,000** | 5–8 bedrooms, fully motorised, smart home integration |

**Changes required:**

**3a. `index.html`** — replace every instance of `AED 3,500` (4 occurrences) with `AED 9,000`. This includes:
- the `<meta name="description">` content
- the `og:description` content
- the answer-first paragraph in the visible body copy
- any package/pricing card text

The homepage answer paragraph must read: *"...Packages start from AED 9,000 for apartments."*

**3b. `packages.html`** — locate and correct the stray `AED 22,000` (1 occurrence). It should be `AED 45,000` if it refers to the Signature tier; if it's orphaned copy from an older tier structure, remove the sentence containing it. Read the surrounding context and choose correctly. The Product schema on this page is already correct (9000 / 18000 / 45000) — **do not touch the schema**.

**3c. `llms.txt`** — replace the entire `## Packages` block with:

```
## Packages
- The Residence: From AED 9,000 — apartments up to 3 bedrooms, all windows covered
- The Estate: From AED 18,000 — full villas up to 5 bedrooms, includes free motorisation on 2 rooms
- The Signature: From AED 45,000 — 5–8 bedrooms, fully motorised with smart home integration
```

And update the final line to `## Last Updated` → `August 2026`.

**3d.** Grep the whole codebase for any remaining `3,500`, `8,500`, or `22,000` and correct or remove each.

**Verification:**
```bash
curl -s https://thejanfurniture.com/ | grep -o 'AED [0-9,]*' | sort -u
curl -s https://thejanfurniture.com/packages | grep -o 'AED [0-9,]*' | sort -u
curl -s https://thejanfurniture.com/llms.txt | grep 'AED'
# No occurrence of 3,500 / 8,500 / 22,000 anywhere
```

---

## TASK 4 — Set up IndexNow (Bing + ChatGPT discovery)

This is the highest-leverage AEO item in the brief. ChatGPT's web search is powered by Bing's index; IndexNow pushes changes to Bing within hours instead of waiting weeks for a crawl.

**4a. Create the key file.** At the root of the main site, create a file named exactly:

```
2f27756be4974a51948c2aa285fb06d1.txt
```

Its entire contents (single line, no trailing newline issues, no markup):

```
2f27756be4974a51948c2aa285fb06d1
```

It must be served as `text/plain`. Add to `netlify.toml` if the extension isn't being served correctly:

```toml
[[headers]]
  for = "/2f27756be4974a51948c2aa285fb06d1.txt"
  [headers.values]
    Content-Type = "text/plain; charset=utf-8"
```

Do the same for the offers subdomain (same key file, deployed to that site's root) so both properties can submit.

**4b. Create the ping script.** New file at repo root: `scripts/indexnow.sh`

```bash
#!/usr/bin/env bash
# IndexNow submitter for Jan Furnishings.
# Usage:
#   ./scripts/indexnow.sh                       # submits every URL in sitemap.xml
#   ./scripts/indexnow.sh /curtains /packages   # submits only the given paths

set -euo pipefail

HOST="thejanfurniture.com"
KEY="2f27756be4974a51948c2aa285fb06d1"
KEY_LOCATION="https://${HOST}/${KEY}.txt"
ENDPOINT="https://api.indexnow.org/IndexNow"

if [ "$#" -gt 0 ]; then
  URLS=()
  for p in "$@"; do
    case "$p" in
      http*) URLS+=("$p") ;;
      *)     URLS+=("https://${HOST}${p}") ;;
    esac
  done
else
  mapfile -t URLS < <(curl -s "https://${HOST}/sitemap.xml" \
    | grep -o '<loc>[^<]*</loc>' \
    | sed 's|<loc>||;s|</loc>||')
fi

if [ "${#URLS[@]}" -eq 0 ]; then
  echo "No URLs to submit." >&2
  exit 1
fi

PAYLOAD=$(python3 - "$HOST" "$KEY" "$KEY_LOCATION" "${URLS[@]}" <<'PY'
import json, sys
host, key, key_location, *urls = sys.argv[1:]
print(json.dumps({
    "host": host,
    "key": key,
    "keyLocation": key_location,
    "urlList": urls
}))
PY
)

echo "Submitting ${#URLS[@]} URL(s) to IndexNow..."
CODE=$(curl -s -o /tmp/indexnow_response.txt -w "%{http_code}" \
  -X POST "$ENDPOINT" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$PAYLOAD")

echo "HTTP $CODE"
case "$CODE" in
  200|202) echo "✅ Accepted. Bing will process these shortly." ;;
  400) echo "❌ Bad request — check the JSON payload." ;;
  403) echo "❌ Key rejected — confirm ${KEY_LOCATION} is live and serves the key as plain text." ;;
  422) echo "❌ URLs don't match the host, or the key doesn't match." ;;
  429) echo "⚠️  Rate limited — wait and retry." ;;
  *)   cat /tmp/indexnow_response.txt ;;
esac
```

Make it executable: `chmod +x scripts/indexnow.sh`

**4c. Document usage in the repo README** (create a short `## IndexNow` section if a README exists; otherwise create `scripts/README.md`):

> After every content deploy, run `./scripts/indexnow.sh` to submit all sitemap URLs, or `./scripts/indexnow.sh /curtains` to submit specific changed pages. Bing (and therefore ChatGPT search) picks up changes within hours.

**Verification:**
```bash
# Key file live and plain text
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" \
  https://thejanfurniture.com/2f27756be4974a51948c2aa285fb06d1.txt
# Expect: 200 text/plain
curl -s https://thejanfurniture.com/2f27756be4974a51948c2aa285fb06d1.txt
# Expect exactly: 2f27756be4974a51948c2aa285fb06d1

# Then run a real submission
./scripts/indexnow.sh
# Expect: HTTP 200 or 202
```

**Note for Mohammad:** IndexNow works without Bing Webmaster Tools verification, but once your BWT registration completes you'll see submitted URLs under **IndexNow** in the BWT dashboard, which is how you confirm it's actually flowing.

---

## TASK 5 — Redirect legacy Shopify URLs

The old store's URLs are still in search indexes and currently 404. Add to the main site's `_redirects` file (create if absent, at the publish root):

```
# ── Legacy Shopify structure → current pages ─────────────
/collections/curtains          /curtains        301!
/collections/blinds            /blinds          301!
/collections/motorized         /motorized       301!
/collections/all               /products        301!
/collections/*                 /products        301!
/products/*                    /products        301!
/pages/about                   /about           301!
/pages/contact                 /book            301!
/pages/faq                     /faq             301!
/pages/*                       /                301!
/cart                          /                301!
/account                       /                301!
/blogs/*                       /                301!
/apps/*                        /                301!
```

**Important:** `/products` itself is a live page. The `/products/*` splat above only catches child paths, not `/products` — verify this holds after deploy. If Netlify's ordering causes `/products` to be captured, move the `/products/*` rule below an explicit `/products /products.html 200` line.

**Verification:**
```bash
for u in /collections/blinds /collections/curtains /pages/about /cart /blogs/news; do
  printf "%-24s " "$u"
  curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" "https://thejanfurniture.com$u"
done
# All must return 301 to the mapped target

curl -s -o /dev/null -w "%{http_code}\n" https://thejanfurniture.com/products
# Must still be 200
```

---

## TASK 6 — Control the offers subdomain

The campaign LPs are competing with the money pages for the same keywords. Since paid ads are paused indefinitely, these pages should stay reachable (existing links, QR codes, Instagram bios may point at them) but must stop competing.

**6a.** Create `robots.txt` at the root of the offers site:

```
User-agent: *
Disallow: /

# Campaign landing pages — not for organic indexing.
# Canonical content lives at https://thejanfurniture.com
```

**6b.** Add to the `<head>` of every LP (`summer-curtains-blinds`, `summer-curtains`, `summer-blinds`, and any others present):

```html
<meta name="robots" content="noindex, follow" />
<link rel="canonical" href="https://thejanfurniture.com/" />
```

Set the canonical to the closest matching main-site page:
- `summer-curtains-blinds` → `https://thejanfurniture.com/`
- `summer-curtains` → `https://thejanfurniture.com/curtains`
- `summer-blinds` → `https://thejanfurniture.com/blinds`

**6c.** Change the LP `<title>` tags so they no longer duplicate main-site titles. Prefix each with `Offer:` — e.g. `Offer: Beat the Heat — Curtains & Blinds Dubai | Jan Furnishings`.

**6d.** Update the GA4 tag on the offers subdomain to the same confirmed property ID used in Task 1, and add the same `whatsapp_click` listener.

**6e.** The LP has an **untagged** `wa.me/971508806292` link. Tag it: `?text=Hi%20Jan%20Furnishings%2C%20I%27d%20like%20to%20know%20more.%20..via%20Beat%20the%20Heat%20Offer`

**Verification:**
```bash
curl -s https://offers.thejanfurniture.com/robots.txt | head -3
curl -s https://offers.thejanfurniture.com/summer-curtains-blinds | grep -o '<meta name="robots"[^>]*>'
curl -s https://offers.thejanfurniture.com/summer-curtains-blinds | grep -o 'rel="canonical"[^>]*'
curl -s https://offers.thejanfurniture.com/summer-curtains-blinds | grep -o '<title>[^<]*</title>'
```

---

## TASK 7 — Image performance pass

**7a. Compress the four heavyweight assets.** Convert to WebP at quality 82, target under 200 KB each, preserving current dimensions:

| Asset | Current | Target |
|---|---|---|
| `assets/vitalijs-barilo-azMZaQCUyV8-unsplash-BaWIpoMD.jpg` | 843 KB | < 200 KB |
| `assets/pexels-artbovich-6492384-bgHZPhkT.jpg` | 470 KB | < 150 KB |
| `assets/pexels-artbovich-7214461-cBtUx7my.jpg` | 391 KB | < 150 KB |
| `assets/jan-team-BPBV1dOS.jpeg` | 267 KB | < 120 KB |
| `assets/sheer-blackout-combo-BSPmb4XK.webp` | 210 KB | < 120 KB |

Keep the original filenames' hash pattern intact, or update every reference if renaming. Simplest safe approach: overwrite in place with the compressed version at the same filename.

**7b. Add `loading="lazy"` to every `<img>` on `index.html` that is below the fold.** The hero image and anything in the first viewport must **not** be lazy-loaded (that would hurt LCP). Currently 0 of 32 homepage images are lazy; the other pages already do this correctly — match their pattern.

**7c. Add explicit `width` and `height` attributes to every `<img>` sitewide.** Currently zero images have them, which causes cumulative layout shift. Use each image's true intrinsic pixel dimensions. CSS already constrains display size via `max-width: 100%`, so this changes nothing visually — it only reserves space during load.

**7d. Add `alt` text to the 11 homepage images currently missing it.** Descriptive and keyword-relevant, matching the pattern already used elsewhere on the page (e.g. `alt="Blackout Curtains Dubai"`, `alt="Book a free curtain consultation in Dubai"`). Decorative images (dividers, icons) get `alt=""`.

**Verification:**
```bash
curl -s https://thejanfurniture.com/ > /tmp/i.html
echo -n "imgs: "; grep -o '<img' /tmp/i.html | wc -l
echo -n "with alt: "; grep -o '<img[^>]*alt="' /tmp/i.html | wc -l     # must equal imgs
echo -n "with width: "; grep -o '<img[^>]*width="' /tmp/i.html | wc -l  # must equal imgs
echo -n "lazy: "; grep -o 'loading="lazy"' /tmp/i.html | wc -l          # should be ~25+

for a in vitalijs-barilo-azMZaQCUyV8-unsplash-BaWIpoMD.jpg pexels-artbovich-6492384-bgHZPhkT.jpg; do
  printf "%-50s " "$a"
  curl -s -o /dev/null -w "%{size_download}\n" "https://thejanfurniture.com/assets/$a"
done
```
Then run the homepage through PageSpeed Insights (mobile) and record the LCP/CLS scores in the tracker sheet as a before/after.

---

## TASK 8 — Add AggregateRating and Review schema

The homepage already renders genuine customer testimonials, and there is a real 5-star Google Business Profile. Nothing here is fabricated — we are marking up what already exists.

**Before implementing:** Mohammad must supply the **current true review count and average rating** from the Google Business Profile. Do not invent or estimate these numbers; an inaccurate `aggregateRating` is a manual-action risk and is trivially checkable.

Add to the existing `HomeAndConstructionBusiness` Organisation schema block on **every page** (this block is already present sitewide — extend it, don't duplicate it):

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "REAL_VALUE",
  "reviewCount": "REAL_COUNT",
  "bestRating": "5",
  "worstRating": "1"
}
```

Additionally, on `index.html` only, add `Review` objects for the testimonials already visible on the page. The `reviewBody` text must **exactly match** the visible testimonial text — schema that doesn't match visible content is a violation:

```json
"review": [
  {
    "@type": "Review",
    "author": { "@type": "Person", "name": "[real reviewer name as displayed]" },
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": "[exact visible testimonial text]"
  }
]
```

Also extend the Organisation schema's `sameAs` array with any live social profiles (Instagram, Facebook) — ask Mohammad for the URLs; omit the field rather than guessing.

**Verification:** paste the homepage URL into `https://search.google.com/test/rich-results` and confirm zero errors and that AggregateRating is detected.

---

## TASK 9 — Add WebSite schema and refresh sitemap

**9a.** Add to `index.html` `<head>` only:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://thejanfurniture.com/#website",
  "url": "https://thejanfurniture.com/",
  "name": "Jan Furnishings",
  "description": "Dubai's custom curtain and blind specialists.",
  "publisher": { "@id": "https://thejanfurniture.com/#organization" },
  "inLanguage": "en-AE"
}
</script>
```

**9b.** Update every `<lastmod>` in `sitemap.xml` to the actual deploy date (`2026-08-XX`). Going forward, `lastmod` must be updated whenever a page's content changes — stale dates weaken freshness signals.

**9c.** Add a `sitemap.xml` to the offers subdomain listing its LPs — but since Task 6 sets those to `noindex`, **skip this**; instead confirm the offers `robots.txt` contains no `Sitemap:` directive.

---

## TASK 10 — Source-level WhatsApp tagging

Page-level tags already exist and work. What's missing is **channel** attribution — the ability to tell Google traffic from ChatGPT traffic from directory traffic.

**10a.** Keep all existing page-level tags, but clean the double-period formatting. Change the pattern from:

`...I'd like to know more. ..via Curtains Page`

to:

`...I'd like to know more. [via Curtains Page]`

Apply consistently across every `wa.me` link on both properties, including the JS-constructed messages in `/estimate` and `/book`.

**10b.** Produce a reference list of **off-site** tagged links for Mohammad to deploy manually (these live outside the codebase). Output this as a markdown file at `docs/whatsapp-source-tags.md` in the repo:

| Channel | Where it goes | Link |
|---|---|---|
| Google Business Profile | GBP "Message"/website button | `https://wa.me/971508806292?text=Hi%20Jan%20Furnishings%2C%20I%27d%20like%20to%20know%20more.%20%5Bvia%20Google%5D` |
| Instagram bio | IG profile link | `...%5Bvia%20Instagram%5D` |
| Email signature | Jan's signature | `...%5Bvia%20Email%5D` |
| Directory listings | ServiceMarket, Houzz, etc. | `...%5Bvia%20Directory%5D` |
| Printed material / QR | Business cards, van | `...%5Bvia%20Print%5D` |

**10c.** Add a `?src=` URL-parameter reader to the homepage so any inbound link can carry a source that flows into the WhatsApp pre-fill. Small, self-contained, no dependencies:

```html
<script>
  (function () {
    var src = new URLSearchParams(window.location.search).get('src');
    if (!src) return;
    document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
      a.href = a.href.replace(/\[via [^\]]*\]/, '[via ' + src.replace(/[^a-zA-Z0-9 _-]/g, '') + ']');
    });
  })();
</script>
```

This means `thejanfurniture.com/?src=ChatGPT` produces WhatsApp messages tagged accordingly — useful for any link you place manually.

---

## TASK 11 — Deploy verification script

Create `scripts/verify.sh` so every future deploy can be checked in one command:

```bash
#!/usr/bin/env bash
# Post-deploy health check for thejanfurniture.com
HOST="https://thejanfurniture.com"
PAGES=("" "products" "about" "packages" "estimate" "book" "help" "curtains" "blinds" "motorized" "faq" "interiors/")
FAIL=0

echo "── Page status ─────────────────────────"
for p in "${PAGES[@]}"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$HOST/$p")
  [ "$code" = "200" ] || { echo "❌ /$p → $code"; FAIL=1; }
done
[ $FAIL -eq 0 ] && echo "✅ all pages 200"

echo "── Analytics ───────────────────────────"
for p in "${PAGES[@]}"; do
  n=$(curl -s "$HOST/$p" | grep -c 'googletagmanager.com/gtag/js')
  [ "$n" -ge 1 ] || { echo "❌ no GA4 on /$p"; FAIL=1; }
done
[ $FAIL -eq 0 ] && echo "✅ GA4 present on all pages"

echo "── Key files ───────────────────────────"
for f in robots.txt sitemap.xml llms.txt 2f27756be4974a51948c2aa285fb06d1.txt assets/images/brand/og-image.jpg; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$HOST/$f")
  printf "%-46s %s\n" "$f" "$code"
  [ "$code" = "200" ] || FAIL=1
done

echo "── Pricing consistency ─────────────────"
bad=$(curl -s "$HOST/" | grep -o 'AED 3,500\|AED 8,500\|AED 22,000' | wc -l)
[ "$bad" -eq 0 ] && echo "✅ no stale prices on homepage" || { echo "❌ stale pricing found"; FAIL=1; }

echo "── Legacy redirects ────────────────────"
for u in /collections/blinds /pages/about /cart; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$HOST$u")
  printf "%-24s %s\n" "$u" "$code"
  [ "$code" = "301" ] || FAIL=1
done

echo
[ $FAIL -eq 0 ] && echo "🎉 ALL CHECKS PASSED" || echo "⚠️  FAILURES ABOVE"
exit $FAIL
```

`chmod +x scripts/verify.sh`

---

## TASK 12 — Upgrade the estimator (SEPARATE SESSION — do not bundle with the above)

A working calculator already exists at `/estimate`. It handles one product type, one window size, a window count, and hands off to WhatsApp. **Do not rebuild it.** Extend it:

1. **Add a "Whole home" mode** alongside the existing per-window mode — a toggle at the top. Whole-home mode asks: property type (Apartment / Townhouse / Villa) → bedroom count → treatment (Curtains / Blinds / Both) → finish level (Standard / Premium / Signature), and maps the result to the package tiers (Residence 9,000 / Estate 18,000 / Signature 45,000) as a **"starting from AED X"** range, never a fixed quote.
2. **Add GA4 events**: `estimator_start`, `estimator_complete`, `estimator_whatsapp_click` — each with the selected parameters.
3. **Enrich the WhatsApp handoff message** to include the full selection breakdown, so Jan receives a pre-qualified lead with budget context already set.
4. **Add a disclaimer line** under the result: *"Indicative starting price. Your free home visit confirms exact pricing."*
5. Preserve the existing per-window calculator exactly as-is under the other toggle position.

Full spec is in the 30-day growth plan, section 4.1. Ship this only after Tasks 1–11 are verified live.

---

# Deploy Sequence

**Deploy 1 (P0 — do today):** Tasks 1, 2, 3, 4, 5
Then run: `./scripts/verify.sh` → confirm GA4 Realtime → `./scripts/indexnow.sh`

**Deploy 2 (P1):** Tasks 6, 7, 8, 9, 10, 11
Then run: `./scripts/verify.sh` → `./scripts/indexnow.sh` → resubmit sitemap in GSC and Bing Webmaster Tools

**Deploy 3 (separate session):** Task 12

---

# Blockers requiring Mohammad's input before Deploy 1

1. **Which GA4 property ID is canonical?** — `G-M73BX8Z0R8` (currently on offers) or `G-W2DJLPY4HR` (in project records), or a fresh property. Task 1 cannot ship without this.
2. **Google Business Profile: exact review count and average rating** — required for Task 8, must be real.
3. **Live social profile URLs** (Instagram, Facebook) for the `sameAs` array — omit if none.
4. **The stray AED 22,000 on `/packages`** — confirm whether it's the Signature tier mispriced or orphaned copy to delete.

---

# Post-Deploy Checklist for Mohammad

- [ ] Bing Webmaster Tools registration complete for both `thejanfurniture.com` and `offers.thejanfurniture.com`
- [ ] Sitemap submitted in Bing Webmaster Tools
- [ ] IndexNow submissions visible in the BWT **IndexNow** panel
- [ ] Google Search Console: sitemap resubmitted, indexing requested for all 16 URLs
- [ ] GA4 Realtime shows traffic and `whatsapp_click` events firing
- [ ] WhatsApp link preview renders the OG image
- [ ] PageSpeed Insights mobile score recorded (before/after) in the tracker sheet
- [ ] Rich Results test passes on `/`, `/curtains`, `/faq`, `/packages`

---

*Jan Group — Internal Working Document — August 2026*
*Audit conducted against live production. All findings verified by direct HTTP inspection.*
