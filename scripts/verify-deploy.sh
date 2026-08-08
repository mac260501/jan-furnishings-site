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
ga_fail=0
for p in "${PAGES[@]}"; do
  n=$(curl -s "$HOST/$p" | grep -c 'googletagmanager.com/gtag/js')
  [ "$n" -ge 1 ] || { echo "❌ no GA4 on /$p"; ga_fail=1; FAIL=1; }
done
[ $ga_fail -eq 0 ] && echo "✅ GA4 present on all pages"

echo "── Key files ───────────────────────────"
for f in robots.txt sitemap.xml llms.txt 2f27756be4974a51948c2aa285fb06d1.txt assets/images/brand/og-image.jpg; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$HOST/$f")
  printf "%-46s %s\n" "$f" "$code"
  [ "$code" = "200" ] || FAIL=1
done

echo "── Pricing consistency ─────────────────"
bad=$(curl -s "$HOST/" | grep -o 'AED 3,500\|AED 8,500' | wc -l | tr -d ' ')
[ "$bad" -eq 0 ] && echo "✅ no stale prices on homepage" || { echo "❌ stale pricing found"; FAIL=1; }

echo "── Legacy redirects ────────────────────"
for u in /collections/blinds /pages/about /cart; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$HOST$u")
  printf "%-24s %s\n" "$u" "$code"
  [ "$code" = "301" ] || FAIL=1
done

echo "── /products must NOT be caught by /products/* ──"
code=$(curl -s -o /dev/null -w "%{http_code}" "$HOST/products")
printf "%-24s %s\n" "/products" "$code"
[ "$code" = "200" ] || FAIL=1

echo
[ $FAIL -eq 0 ] && echo "🎉 ALL CHECKS PASSED" || echo "⚠️  FAILURES ABOVE"
exit $FAIL
