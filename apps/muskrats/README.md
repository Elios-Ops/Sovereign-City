# Muskrats.io

Verified, promoted Muskrats.io static site — The Sewer ecosystem.

- **Source:** `AI_APP/muskrats-io/` (Drive folder id `1NVtcstE4yoTcmFiac2hV5Kh1px4CVsWf`)
- **Entry point:** `index.html`
- **Verification:** `docs/recovery/MUSKRATS_LOCAL_VERIFICATION.md`

## Local Development

```bash
python3 serve-local.py --port 8802
```

Open http://127.0.0.1:8802/ — supports Netlify-style clean URLs (`/gate`, `/codex`, `/syndicate`, etc.).

Verify all pages and assets:

```bash
python3 verify-local.py
```

Plain `python3 -m http.server 8802` works for `.html` routes but not clean URLs.

## Import Status

**Complete** — 44 HTML pages, 195 tracked files (~981 MB including video/NFT art). Secrets (`.env`, `credentials.json`) were never imported. See `NOT_IMPORTED_ASSETS.md`.
