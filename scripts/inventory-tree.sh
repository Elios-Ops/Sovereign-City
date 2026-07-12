#!/usr/bin/env bash
# Display the repository tree excluding generated/dependency files.
# Read-only: this script never modifies files.
set -euo pipefail

cd "$(dirname "$0")/.."

if command -v tree >/dev/null 2>&1; then
  tree -a -I '.git|node_modules|.venv|venv|env|__pycache__|dist|build|.cache|.netlify|*.egg-info|*.dist-info'
else
  find . \
    -path './.git' -prune -o \
    -path './node_modules' -prune -o \
    -path '*/node_modules' -prune -o \
    -path './.venv' -prune -o \
    -path './venv' -prune -o \
    -path './env' -prune -o \
    -path '*/__pycache__' -prune -o \
    -path './dist' -prune -o \
    -path './build' -prune -o \
    -path './.cache' -prune -o \
    -path './.netlify' -prune -o \
    -print | sed 's|^\./||'
fi
