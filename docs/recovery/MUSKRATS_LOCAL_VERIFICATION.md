# Muskrats.io — Local Verification

- **Source path (Drive, canonical):** `AI_APP/muskrats-io/` (Drive folder id `1NVtcstE4yoTcmFiac2hV5Kh1px4CVsWf`) — selected over the equivalent copy nested in the `AI_APP_V2_EXTRACTED` candidate because its files are dated through August 2025, versus a frozen June 21, 2025 snapshot in the other copy. See `docs/recovery/CANONICAL_SOURCE_MAP.md`.
- **Local import path (Directive 003):** Google Drive sync at `~/Library/CloudStorage/GoogleDrive-codydewitt13@gmail.com/My Drive/Ai_APP_EXTRACTED/Ai_APP/muskrats-io/` (same canonical tree, folder id above).
- **Entry point:** `index.html`
- **Promoted to:** `apps/muskrats/`
- **Launch method:** `python3 serve-local.py --port 8802` from `apps/muskrats/` (supports Netlify-style clean URLs). Plain `python3 -m http.server 8802` also works for `.html` routes but not for `/gate`, `/codex`, etc.
- **Verification date:** 2026-07-13 (Directive 003 completion)

## Import Status — COMPLETE

All safe web assets from the canonical `muskrats-io/` folder are imported. Final counts in `apps/muskrats/`:

| Category | Count |
|---|---|
| HTML pages | 44 |
| Images | 105 |
| Audio | 19 |
| Video | 2 |
| Root JS | 6 |
| Root CSS | 1 |
| JSON / docs / config | remaining files |
| **Total tracked files** | **195** (includes `_redirects`, `serve-local.py`, `verify-local.py`, `README.md`) |

## Deliberately Excluded

| Item | Reason |
|---|---|
| `.env` | Real secrets — present in source, never imported |
| `credentials.json` | Real secrets — present in source, never imported |
| `MuskRats.io/` | Xcode project scaffold only (3 files); not part of the web site |
| `untitled folder 2/` | Empty folder in source |

## Missing From Canonical Source (pre-existing gaps, not import failures)

| Referenced by | Missing file | Notes |
|---|---|---|
| `mint.html` | `styles.css` | Referenced in `<link>`; file does not exist anywhere in canonical `muskrats-io/` |
| `mint.html` | `images/favicon.png` | Referenced in `<link rel="icon">`; file does not exist in canonical source |

## Route Repairs (minimal)

| Issue | Repair |
|---|---|
| Clean URLs (`/gate`, `/dossier_lobby`, `/cellar`, `/codex`, `/syndicate`) require Netlify-style routing | Added `apps/muskrats/_redirects` for deployment; added `serve-local.py` for local verification |
| `descent.html` references `video/sewer_fall_2.mp4`; canonical file is `video/Sewer_Fall_2.mp4` | Works on case-insensitive macOS; may need explicit lowercase copy on case-sensitive Linux deploy |

## Oversized Assets — Imported With Review Flag

| Path | Size | Purpose |
|---|---|---|
| `video/mansion_gate.mp4` | ~415 MB | Background video on `gate.html` |
| `video/Sewer_Fall_2.mp4` | ~47 MB | Descent animation on `descent.html` |
| Multiple PNG/JPG backgrounds | 1–30 MB each | Page backgrounds and NFT art |

See `apps/muskrats/NOT_IMPORTED_ASSETS.md` for the full exclusion and review log.

## Verification Results

All required pages return **HTTP 200** when served via `serve-local.py`:

| Route | HTTP | Notes |
|---|---|---|
| `/index.html` | 200 | Entry point; coin image loads |
| `/poster.html` | 200 | "ENTER THE SEWER" destination |
| `/don.html` | 200 | Don's World |
| `/lore.html` | 200 | Main Lore |
| `/codex.html` | 200 | Codex |
| `/roadmap.html` | 200 | Roadmap |
| `/marketplace.html` | 200 | Marketplace hub |
| `/syndicate.html` | 200 | Syndicate Terminal |
| `/vault1.html`–`/vault6.html` | 200 | All six vault pages |
| `/gate`, `/dossier_lobby`, `/cellar`, `/codex`, `/syndicate` | 200 | Clean URL routes via `serve-local.py` |
| `/mint.html`, `/crew.html`, `/alpha.html`, `/tokenomics.html`, `/relics.html`, `/presale.html`, `/joboffer.html` | 200 | Additional recovered pages |
| `/descent.html`, `/cellar.html`, `/dossier_lobby.html`, `/gate.html` | 200 | Gameplay flow pages |

**Asset check:** 44 HTML pages crawled; all referenced local CSS, JS, images, audio, and video return HTTP 200 **except** the two files missing from canonical source (`styles.css`, `images/favicon.png`).

**Navigation verified in source:**
- `index.html` → `poster.html` ("ENTER THE SEWER")
- `poster.html` Gameplay dropdown → `/gate`, `/dossier_lobby`, `/cellar`, `/codex`, `/syndicate`
- `poster.html` trap coin → `descent.html`
- `unified-footer.js` → lore, codex, syndicate, don, marketplace, roadmap, vault pages
- `vault*.html` → back to `marketplace.html`

**Secrets check:** No API keys, private keys, or credential file contents in tracked files. `backend-server.js` contains placeholder env-var references only.

**No broken recovery paths:** No references to temporary Claude paths, local Drive paths, or missing recovery folders in HTML/JS/CSS.

## Known Limitations

- `backend-server.js` is preserved source for email/Google Sheets whitelist backend; not run or wired in this static recovery pass.
- `mint.html` renders without `styles.css` (inline styles still present); favicon 404 is cosmetic.
- Historical Netlify URLs in F.A.M. and Gus still point to `muskrats-io.netlify.app`; local recovery does not re-point them (reconnection is a follow-up).
- Total app size ~981 MB due to video and high-res NFT art assets.
