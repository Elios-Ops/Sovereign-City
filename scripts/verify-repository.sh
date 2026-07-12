#!/usr/bin/env bash
# Verify Sovereign City repository health.
# Checks: required directories, required documentation, tracked secrets,
# tracked dependency folders, and general repository hygiene.
# Read-only: this script never modifies files.
set -uo pipefail

cd "$(dirname "$0")/.."

fail=0

log_ok()   { echo "  [OK]   $1"; }
log_fail() { echo "  [FAIL] $1"; fail=1; }

echo "== Required directories =="
required_dirs=(
  "docs/recovery" "docs/canon" "docs/architecture" "docs/deployment" "docs/decisions"
  "recovered" "apps" "services" "infrastructure" "archive" "scripts"
)
for d in "${required_dirs[@]}"; do
  if [ -d "$d" ]; then log_ok "$d exists"; else log_fail "$d missing"; fi
done

echo
echo "== Required documentation =="
required_docs=(
  "README.md"
  ".gitignore"
  "docs/canon/NAMING_AND_CANON.md"
  "docs/canon/APPLICATION_REGISTRY.md"
  "docs/architecture/CONNECTION_REGISTRY.md"
  "docs/decisions/ADR-0001-recovery-before-modernization.md"
)
for f in "${required_docs[@]}"; do
  if [ -f "$f" ]; then log_ok "$f exists"; else log_fail "$f missing"; fi
done

echo
echo "== Tracked secrets check =="
if git ls-files | grep -E '(^|/)\.env($|\.[^.]*$)' | grep -v '\.env\.example$' > /tmp/verify-repo-secrets.$$ 2>/dev/null; then
  while read -r f; do log_fail "tracked secret-like file: $f"; done < /tmp/verify-repo-secrets.$$
else
  log_ok "no tracked .env files"
fi
rm -f /tmp/verify-repo-secrets.$$

echo
echo "== Tracked dependency folders check =="
if git ls-files | grep -E '(^|/)(node_modules|__pycache__|\.venv|venv)/' > /tmp/verify-repo-deps.$$ 2>/dev/null; then
  while read -r f; do log_fail "tracked dependency file: $f"; done < /tmp/verify-repo-deps.$$
else
  log_ok "no tracked dependency folders"
fi
rm -f /tmp/verify-repo-deps.$$

echo
echo "== Large file check (>10MB tracked) =="
large_found=0
while IFS= read -r f; do
  if [ -f "$f" ]; then
    size=$(stat -c%s "$f" 2>/dev/null || stat -f%z "$f" 2>/dev/null || echo 0)
    if [ "$size" -gt 10485760 ]; then
      log_fail "large tracked file (${size} bytes): $f"
      large_found=1
    fi
  fi
done < <(git ls-files)
[ "$large_found" -eq 0 ] && log_ok "no tracked files over 10MB"

echo
if [ "$fail" -eq 0 ]; then
  echo "Repository verification PASSED."
else
  echo "Repository verification FAILED."
fi
exit "$fail"
