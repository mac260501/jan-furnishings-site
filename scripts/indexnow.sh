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

URLS=()
if [ "$#" -gt 0 ]; then
  for p in "$@"; do
    case "$p" in
      http*) URLS+=("$p") ;;
      *)     URLS+=("https://${HOST}${p}") ;;
    esac
  done
else
  while IFS= read -r line; do
    [ -n "$line" ] && URLS+=("$line")
  done < <(curl -s "https://${HOST}/sitemap.xml" \
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
