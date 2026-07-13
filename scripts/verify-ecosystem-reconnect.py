#!/usr/bin/env python3
"""Verify Sovereign City front-end ecosystem reconnection (Directive 004)."""

from __future__ import annotations

import os
import re
import sys
import urllib.error
import urllib.request

LOCAL = {
    "gus": os.environ.get("GUS_BASE", "http://127.0.0.1:8801"),
    "muskrats": os.environ.get("MUSKRATS_BASE", "http://127.0.0.1:8802"),
    "fam": os.environ.get("FAM_BASE", "http://127.0.0.1:8804"),
    "agenticLoop": os.environ.get("IAL_BASE", "http://127.0.0.1:8806"),
}

ROOT_CHECKS = [
    ("gus", "/index.html"),
    ("muskrats", "/index.html"),
    ("fam", "/index.html"),
    ("agenticLoop", "/index.html"),
]

CLEAN_MUSKRATS = [
    "/gate",
    "/dossier_lobby",
    "/cellar",
    "/codex",
    "/syndicate",
    "/marketplace",
    "/mint",
    "/crew",
    "/relics",
    "/mint?category=boss",
]

CROSS_APP_EXPECTED = [
    ("gus", "/index.html", r"data-sc-service=\"muskrats\".*data-sc-path=\"/crew\""),
    ("gus", "/index.html", r"data-sc-service=\"agenticLoop\""),
    ("gus", "/index.html", r"SOVEREIGN_CITY_URLS\.url\('muskrats', '/crew'\)"),
    ("fam", "/index.html", r"data-sc-service=\"muskrats\".*data-sc-path=\"/syndicate\""),
    ("fam", "/index.html", r"ecosystem-urls\.js"),
    ("fam", "/index.html", r"nft-slot-system\.js"),
    ("agenticLoop", "/index.html", r"data-sc-service=\"agenticLoop\""),
    ("agenticLoop", "/dashboard.html", r"data-sc-service=\"gus\""),
    ("agenticLoop", "/admin-control.html", r"data-sc-service=\"gus\""),
]

NETLIFY_NAV_PATTERN = re.compile(
    r'href\s*=\s*["\']https?://(?:muskrats-io|agentic-loop|ledger-ai)\.netlify\.app',
    re.I,
)


def fetch(url: str) -> tuple[int, str]:
    try:
        with urllib.request.urlopen(url, timeout=15) as resp:
            return resp.status, resp.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace") if exc.fp else ""
        return exc.code, body
    except Exception as exc:
        return 0, str(exc)


def main() -> int:
    failures: list[str] = []
    print("SOVEREIGN CITY ECOSYSTEM RECONNECT VERIFICATION")
    print("=" * 60)

    for service, path in ROOT_CHECKS:
        url = LOCAL[service] + path
        status, _ = fetch(url)
        ok = status == 200
        print(f"[{'PASS' if ok else 'FAIL'}] {service} root {path} -> HTTP {status}")
        if not ok:
            failures.append(f"root {service}{path} -> {status}")

    for route in CLEAN_MUSKRATS:
        url = LOCAL["muskrats"] + route
        status, _ = fetch(url)
        ok = status == 200
        print(f"[{'PASS' if ok else 'FAIL'}] muskrats clean {route} -> HTTP {status}")
        if not ok:
            failures.append(f"clean route {route} -> {status}")

    for service, path, pattern in CROSS_APP_EXPECTED:
        url = LOCAL[service] + path
        status, body = fetch(url)
        if status != 200:
            failures.append(f"cross-app source {service}{path} -> HTTP {status}")
            print(f"[FAIL] cross-app source {service}{path} -> HTTP {status}")
            continue
        if not re.search(pattern, body, re.S):
            failures.append(f"cross-app pattern missing in {service}{path}: {pattern}")
            print(f"[FAIL] pattern missing in {service}{path}")
        else:
            print(f"[PASS] cross-app wiring in {service}{path}")

    for service, path in [
        ("gus", "/index.html"),
        ("fam", "/index.html"),
        ("agenticLoop", "/index.html"),
        ("agenticLoop", "/dashboard.html"),
    ]:
        url = LOCAL[service] + path
        status, body = fetch(url)
        if status != 200:
            continue
        matches = NETLIFY_NAV_PATTERN.findall(body)
        if matches:
            failures.append(f"residual Netlify nav href in {service}{path}")
            print(f"[FAIL] residual Netlify nav href in {service}{path}")
        else:
            print(f"[PASS] no operational Netlify nav href in {service}{path}")

    print("=" * 60)
    if failures:
        print(f"FAILED ({len(failures)} issues):")
        for item in failures:
            print(f"  - {item}")
        return 1
    print("ALL CHECKS PASSED")
    return 0


if __name__ == "__main__":
    sys.exit(main())
