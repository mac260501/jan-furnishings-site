# jan-furnishings

## Development

1. Install Node.js 18+.
2. Install dependencies:
   `npm install`
3. Start the dev server:
   `npm run dev`

## Production Build

1. Build:
   `npm run build`
2. Preview built output:
   `npm run preview`

## IndexNow

After every content deploy, run `./scripts/indexnow.sh` to submit all sitemap URLs,
or `./scripts/indexnow.sh /curtains` to submit specific changed pages. Bing (and
therefore ChatGPT search) picks up changes within hours instead of waiting weeks
for a crawl.

The key is published at `https://thejanfurniture.com/2f27756be4974a51948c2aa285fb06d1.txt`
and must stay live for submissions to be accepted.

## Post-deploy verification

`./scripts/verify.sh` checks page status codes, GA4 presence on every page, the
key root files, pricing consistency, and the legacy Shopify redirects in one pass.
