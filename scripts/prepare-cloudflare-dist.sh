#!/usr/bin/env bash
# Compatibility entry point for the existing hosting build command. Does not deploy.
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/build.mjs "$@"
