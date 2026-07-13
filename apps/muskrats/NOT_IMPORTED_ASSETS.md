# Not Imported / Missing Assets — Muskrats.io

Log of files deliberately excluded from import or absent from the canonical source. See `docs/recovery/MUSKRATS_LOCAL_VERIFICATION.md` for full verification results.

## Secrets — Never Imported

| Path | Reason |
|---|---|
| `.env` | Real secrets — present in Drive source, never imported |
| `credentials.json` | Real secrets — present in Drive source, never imported |

Only `.env.example` was imported as a template.

## Excluded Folders (Not Part of Web Site)

| Path | Reason |
|---|---|
| `MuskRats.io/` | Xcode project scaffold only (3 files) |
| `untitled folder 2/` | Empty folder in canonical source |

## Missing From Canonical Source (Pre-existing Gaps)

These are referenced in HTML but do not exist anywhere in the canonical `muskrats-io/` tree — not import failures.

| Referenced by | Missing file | Impact |
|---|---|---|
| `mint.html` | `styles.css` | Page still renders via inline styles; external stylesheet 404 |
| `mint.html` | `images/favicon.png` | Cosmetic favicon 404 only |

## Externalized Oversized Assets (Directive 005)

These files are preserved outside Git. Restore locally before running pages that reference them.

| Filename | Repo path | External path | Size | SHA-256 | Reason | Referenced by | Restoration |
|---|---|---|---:|---|---|---|
| `mansion_gate.mp4` | `apps/muskrats/video/mansion_gate.mp4` | `/Users/agentlab/AgenticLab/media-vault/Sovereign-City/Muskrats/video/mansion_gate.mp4` | 434,832,051 bytes (~415 MB) | `c35bff78c4a1c9d89703795e2ae4eb58c2fec12c6c1a516abfa1b2e0ebd1969b` | Exceeds GitHub 100 MB limit; externalized per Directive 005 | `gate.html` (`<video src="video/mansion_gate.mp4">`) | `cp /Users/agentlab/AgenticLab/media-vault/Sovereign-City/Muskrats/video/mansion_gate.mp4 apps/muskrats/video/mansion_gate.mp4` |

Machine-readable manifest: `apps/muskrats/external-assets.json`

Canonical source: `AI_APP/muskrats-io/` (Drive folder id `1NVtcstE4yoTcmFiac2hV5Kh1px4CVsWf`).

## Large Assets — Retained in Git (Under 100 MB)

| Path | Approx. size | Purpose |
|---|---|---|
| `video/Sewer_Fall_2.mp4` | ~47 MB | Descent animation on `descent.html` |
| Multiple PNG/JPG backgrounds | 1–30 MB each | Page backgrounds and NFT art |

Total tracked app size reduced after externalization; full local runtime requires restoring external assets above.

## Route / Case-Sensitivity Note

| Issue | Notes |
|---|---|
| `descent.html` references `video/sewer_fall_2.mp4`; canonical file is `video/Sewer_Fall_2.mp4` | Works on case-insensitive macOS; may need explicit lowercase copy on case-sensitive Linux deploy |
