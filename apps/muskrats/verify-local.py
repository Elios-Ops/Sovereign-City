#!/usr/bin/env python3
"""Verify Muskrats.io pages and referenced assets return HTTP 200."""

from __future__ import annotations

import re
import sys
import urllib.error
import urllib.request
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse

BASE = "http://127.0.0.1:8802"
ROOT = Path(__file__).resolve().parent

REQUIRED_PAGES = [
    "/index.html",
    "/poster.html",
    "/don.html",
    "/lore.html",
    "/codex.html",
    "/roadmap.html",
    "/marketplace.html",
    "/syndicate.html",
    "/vault1.html",
    "/vault2.html",
    "/vault3.html",
    "/vault4.html",
    "/vault5.html",
    "/vault6.html",
    "/gate.html",
    "/dossier_lobby.html",
    "/cellar.html",
    "/descent.html",
    "/mint.html",
    "/crew.html",
    "/alpha.html",
    "/tokenomics.html",
    "/relics.html",
    "/presale.html",
    "/joboffer.html",
]

CLEAN_URLS = ["/gate", "/dossier_lobby", "/cellar", "/codex", "/syndicate"]

ATTR_RE = re.compile(r"(?:href|src)\s*=\s*['\"]([^'\"#]+)")


class AssetParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.assets: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for key, value in attrs:
            if key in {"href", "src"} and value:
                if value.startswith(("http://", "https://", "data:", "mailto:", "javascript:", "#")):
                    continue
                self.assets.add(value)


def fetch(url: str) -> tuple[int, bytes]:
    try:
        with urllib.request.urlopen(url, timeout=15) as resp:
            return resp.status, resp.read()
    except urllib.error.HTTPError as exc:
        return exc.code, b""
    except Exception:
        return 0, b""


def local_path_exists(ref: str) -> bool:
    parsed = urlparse(ref)
    path = parsed.path.lstrip("/")
    if not path:
        return True
    candidate = ROOT / path
    return candidate.is_file()


def main() -> int:
    results: list[dict] = []
    broken: list[str] = []
    checked_assets: set[str] = set()

    for route in REQUIRED_PAGES + CLEAN_URLS:
        url = BASE + route
        status, body = fetch(url)
        assets: list[str] = []
        if status == 200 and body:
            parser = AssetParser()
            try:
                parser.feed(body.decode("utf-8", errors="replace"))
            except Exception:
                pass
            assets = sorted(parser.assets)

        asset_failures: list[str] = []
        page_dir = route if route.endswith("/") else route.rsplit("/", 1)[0] + "/"
        if not page_dir.startswith("/"):
            page_dir = "/" + page_dir

        for asset in assets:
            if asset in checked_assets:
                continue
            checked_assets.add(asset)
            if asset.startswith("/"):
                asset_url = BASE + asset
            elif asset.startswith(("http://", "https://")):
                continue
            else:
                asset_url = BASE + urljoin(page_dir, asset)
            parsed = urlparse(asset_url)
            if parsed.netloc and parsed.netloc not in {"127.0.0.1:8802", "localhost:8802"}:
                continue
            a_status, _ = fetch(asset_url)
            if a_status != 200:
                asset_failures.append(f"{asset} ({a_status})")
                if not local_path_exists(parsed.path):
                    broken.append(f"{route} -> missing asset {asset}")

        results.append(
            {
                "route": route,
                "status": status,
                "assets_checked": len(assets),
                "asset_failures": asset_failures,
            }
        )

    print("MUSKRATS.IO VERIFICATION REPORT")
    print("=" * 60)
    pages_ok = 0
    for row in results:
        ok = row["status"] == 200
        pages_ok += int(ok)
        flag = "PASS" if ok else "FAIL"
        print(f"[{flag}] {row['route']} -> HTTP {row['status']}")
        if row["asset_failures"]:
            for failure in row["asset_failures"][:10]:
                print(f"       asset fail: {failure}")
            if len(row["asset_failures"]) > 10:
                print(f"       ... and {len(row['asset_failures']) - 10} more")

    print("=" * 60)
    print(f"Pages passing: {pages_ok}/{len(results)}")
    print(f"Unique assets checked: {len(checked_assets)}")
    if broken:
        print("Broken local references:")
        for item in broken[:30]:
            print(f"  - {item}")
    return 0 if pages_ok == len(results) and not broken else 1


if __name__ == "__main__":
    sys.exit(main())
