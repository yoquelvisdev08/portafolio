#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Uso: fetch-stitch.sh <url> <output_path>" >&2
  exit 1
fi

URL="$1"
OUT="$2"

mkdir -p "$(dirname "$OUT")"
curl -fsSL "$URL" -o "$OUT"
