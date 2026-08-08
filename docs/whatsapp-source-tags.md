# WhatsApp Source Tags — Off-Site Links

These links live **outside this codebase**. Deploy each one manually to the channel
named in the first column. Every link pre-fills the same message with a different
`[via …]` tag, so when a lead lands in WhatsApp you can tell instantly which channel
sent them.

On-site links are already tagged automatically by page (`[via Curtains Page]`,
`[via Packages Page]`, and so on) — these are for everything off-site.

## The links

| Channel | Where it goes | Link |
|---|---|---|
| Google Business Profile | GBP "Message" / website button | `https://wa.me/971508806292?text=Hi%20Jan%20Furnishings%2C%20I%27d%20like%20to%20know%20more.%20%5Bvia%20Google%5D` |
| Instagram bio | IG profile link — [@janfurnishings](https://www.instagram.com/janfurnishings/) | `https://wa.me/971508806292?text=Hi%20Jan%20Furnishings%2C%20I%27d%20like%20to%20know%20more.%20%5Bvia%20Instagram%5D` |
| Email signature | Jan's signature | `https://wa.me/971508806292?text=Hi%20Jan%20Furnishings%2C%20I%27d%20like%20to%20know%20more.%20%5Bvia%20Email%5D` |
| Directory listings | ServiceMarket, Houzz, etc. | `https://wa.me/971508806292?text=Hi%20Jan%20Furnishings%2C%20I%27d%20like%20to%20know%20more.%20%5Bvia%20Directory%5D` |
| Printed material / QR | Business cards, van livery | `https://wa.me/971508806292?text=Hi%20Jan%20Furnishings%2C%20I%27d%20like%20to%20know%20more.%20%5Bvia%20Print%5D` |

Decoded, each message reads:

> Hi Jan Furnishings, I'd like to know more. [via Google]

## Making a new tag

Take the base link and swap the channel name. The tag is URL-encoded:
`%5B` = `[`, `%20` = space, `%5D` = `]`.

```
https://wa.me/971508806292?text=Hi%20Jan%20Furnishings%2C%20I%27d%20like%20to%20know%20more.%20%5Bvia%20YOUR_CHANNEL%5D
```

Keep channel names short and consistent — `Google`, `Instagram`, `Email`, `Directory`,
`Print`, `ChatGPT`, `Perplexity`. Reusing the same spelling every time is what makes
the tags countable later.

## The `?src=` shortcut

The homepage reads a `src` query parameter and rewrites the tag on every WhatsApp
link on the page. So instead of hand-building a `wa.me` link, you can point a channel
at the site and let it carry its own source through:

```
https://thejanfurniture.com/?src=ChatGPT
```

A visitor arriving on that link who then taps any WhatsApp button sends a message
tagged `[via ChatGPT]`. Useful for anywhere you'd rather send traffic to the site
than straight into WhatsApp — AI answer citations, forum posts, newsletter links.

Only letters, numbers, spaces, `-` and `_` survive the filter; everything else is
stripped before the tag is written.

## Reading the results

There is no dashboard for this — the tag is in the message text. In WhatsApp,
search for `[via Google]`, `[via Instagram]`, and so on to count leads per channel.
Do this on the same day each month so the numbers stay comparable.

GA4 (`G-M73BX8Z0R8`) covers the other half: the `whatsapp_click` event fires on
every WhatsApp click across the site and carries `page_path`, so GA4 tells you
*which page* converted while these tags tell you *which channel* the person came from.
