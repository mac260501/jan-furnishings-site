# Jan Furnishings — Packages Page Update Brief
## For Claude Code implementation on thejanfurniture.com/packages.html

---

## ⚠️ DO NOT REDESIGN. Update content and pricing only. Preserve all existing layout, CSS, animations, and structure.

---

## What's Changing

1. **Pricing** — all three curtains & blinds packages updated
2. **Package inclusions** — adjusted per tier
3. **Signature package** — removed 3D room visualizations, softened imported fabrics language
4. **Comparison table** — updated to match new details
5. **Villa bundles section** — if pricing references exist, update to reflect new starting prices

---

## Updated Package Details

### The Residence — AED 9,000 (was AED 3,500)

**Subtitle:** For apartments & townhouses up to 3 bedrooms
**Starting from:** AED 9,000
**Price note:** Price varies by room count & fabric selection

**What's included:**
- Up to 3 bedrooms + living room
- Choice of sheer, blackout, or dual-layer curtains
- Roller or blackout blinds for kitchen & bathrooms
- 150+ premium fabric options
- Made-to-measure for every window
- Professional installation by certified fitters
- Old curtains & blinds removed and disposed
- Free in-home measurement & consultation
- 12-month workmanship warranty

### The Estate — AED 18,000 (was AED 7,500)

**Subtitle:** For full villas up to 5 bedrooms, all rooms covered
**Starting from:** AED 18,000
**Price note:** Includes curtains or blinds for every room
**Badge:** Most Popular

**What's included:**
- Every room in the villa — no exceptions
- Sheer, blackout, roller or wooden blinds
- 300+ premium fabric options
- Dedicated design consultant assigned
- All windows measured & custom-made
- Priority installation within 5 working days
- Old fittings removed at no charge
- Free motorisation upgrade on 2 rooms
- Lifetime workmanship warranty

### The Signature — AED 45,000 (was AED 14,000)

**Subtitle:** Fully motorized, fully bespoke — the pinnacle of window dressing
**Starting from:** AED 45,000
**Price note:** For 5–8 bedroom villas & penthouses

**What's included:**
- Full villa — every room fully motorized
- Smart home integration (Alexa, Google, app control)
- Premium & imported fabric options available
- Senior design consultant — 2 in-home sessions
- Kevlar blackout options available
- Installation within 7 working days
- White-glove post-installation care kit
- Lifetime warranty — parts & workmanship

**REMOVED from Signature (do not include):**
- ~~3D room visualisation before production~~ — remove entirely
- ~~Imported European & Japanese fabrics~~ — replaced with "Premium & imported fabric options available"

---

## Comparison Table Update

|  | Residence | Estate | Signature |
|---|---|---|---|
| Starting price | AED 9,000 | AED 18,000 | AED 45,000 |
| Rooms covered | Up to 4 | Full villa | Full villa |
| Fabric library | 150+ options | 300+ options | Premium & imported |
| Motorization | — | 2 rooms free | ✦ All rooms |
| Smart home integration | — | On request | ✦ Included |
| Dedicated design consultant | — | ✦ | ✦ |
| 3D room visualisation | — | — | — |
| Old fittings removed | ✦ | ✦ | ✦ |
| Installation timeline | 7–10 days | 5 days priority | 7 days priority |
| Warranty | 12 months | Lifetime | Lifetime |
| Kevlar blackout options | — | On request | ✦ Available |

**Note:** 3D room visualisation row should be removed from the comparison table entirely.

---

## Other Pages to Check

- **Title tag** currently says "From AED 3,500" — update to "From AED 9,000"
- **Meta description** references AED 3,500 / 8,500 / 22,000 — update to AED 9,000 / 18,000 / 45,000
- **Jump-to nav cards** near the top reference "AED 3,500 – 14,000" — update to "AED 9,000 – 45,000"
- **Villa bundles section** references "AED 22,000 – 45,000+" — update pricing if needed or leave as-is if those are separate bundle products
- **Schema/JSON-LD** on packages page — update price values if structured data exists

---

## Unit Economics Reference (not for display — internal only)

- Each curtain or blind: starts from AED 500
- Each motor: AED 1,000
- These are cost inputs, not displayed on the page

---

## Verification

After deployment, confirm:
```bash
# Check title tag updated
curl -s https://thejanfurniture.com/packages.html | grep '<title>'

# Check new prices appear
curl -s https://thejanfurniture.com/packages.html | grep -o 'AED [0-9,]*' | sort -u

# Confirm 3D visualisation removed
curl -s https://thejanfurniture.com/packages.html | grep -i '3D' | wc -l
# Should return 0

# Check JSON-LD prices if schema exists
curl -s https://thejanfurniture.com/packages.html | grep -o '"price":"[0-9]*"'
```
