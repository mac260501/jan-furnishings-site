# jan-furnishings

Static site for **Jan Furnishings** (`thejanfurniture.com`) — custom curtains and blinds
in Dubai — plus the **Jan Interiors** sub-site at `/interiors/`.

Built with Vite (multi-page), deployed on Netlify.

- **Repo layout and conventions:** [STRUCTURE.md](STRUCTURE.md)
- **Brand system, copy rules, pricing:** [CLAUDE.md](CLAUDE.md)

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

Netlify runs `npm run build` and publishes `dist/`. `dist/` is generated — never edit or
commit it.

## After a deploy

**1. Submit to IndexNow**

```bash
./scripts/submit-indexnow.sh
```

Submits all sitemap URLs, or pass specific changed pages:
`./scripts/submit-indexnow.sh /curtains`. Bing (and therefore ChatGPT search) picks up
changes within hours instead of waiting weeks for a crawl.

The key is published at `https://thejanfurniture.com/2f27756be4974a51948c2aa285fb06d1.txt`
and must stay live for submissions to be accepted.

**2. Verify**

```bash
./scripts/verify-deploy.sh
```

Checks page status codes, GA4 presence on every page, the key root files, pricing
consistency, and the legacy Shopify redirects in one pass.
