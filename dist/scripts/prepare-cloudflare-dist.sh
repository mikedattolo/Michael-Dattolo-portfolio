#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DIST_DIR="$ROOT_DIR/dist"

rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

cp "$ROOT_DIR/index.html" "$DIST_DIR/"
cp -R "$ROOT_DIR/about" "$DIST_DIR/"
cp -R "$ROOT_DIR/contact" "$DIST_DIR/"
cp -R "$ROOT_DIR/assets" "$DIST_DIR/"
cp -R "$ROOT_DIR/scripts" "$DIST_DIR/"
cp -R "$ROOT_DIR/styles" "$DIST_DIR/"
cp -R "$ROOT_DIR/work" "$DIST_DIR/"

find "$DIST_DIR" -type f \( -name '*.zip' -o -name '*.md' \) -delete