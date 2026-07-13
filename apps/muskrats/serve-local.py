#!/usr/bin/env python3
"""Static server for Muskrats.io with Netlify-style clean URL support."""

from __future__ import annotations

import argparse
import mimetypes
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent

CLEAN_URLS = {
    "/gate": "gate.html",
    "/dossier_lobby": "dossier_lobby.html",
    "/cellar": "cellar.html",
    "/codex": "codex.html",
    "/syndicate": "syndicate.html",
    "/marketplace": "marketplace.html",
    "/mint": "mint.html",
    "/crew": "crew.html",
    "/relics": "relics.html",
}


class MuskratsHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        raw = self.path
        path, sep, query = raw.partition("?")
        if path in CLEAN_URLS:
            self.path = "/" + CLEAN_URLS[path] + (sep + query if sep else "")
        elif path.endswith("/") and path != "/":
            candidate = path.rstrip("/") + ".html"
            if (ROOT / candidate.lstrip("/")).is_file():
                self.path = candidate + (sep + query if sep else "")
        return super().do_GET()


def main() -> None:
    parser = argparse.ArgumentParser(description="Serve Muskrats.io locally")
    parser.add_argument("--port", type=int, default=8802)
    args = parser.parse_args()

    os.chdir(ROOT)
    server = ThreadingHTTPServer(("127.0.0.1", args.port), MuskratsHandler)
    print(f"Serving Muskrats.io at http://127.0.0.1:{args.port}/")
    server.serve_forever()


if __name__ == "__main__":
    main()
