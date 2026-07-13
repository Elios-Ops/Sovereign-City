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

## Large Assets — Imported With Review Flag

Imported despite size; flagged for deploy bandwidth / repo weight review.

| Path | Approx. size | Purpose |
|---|---|---|
| `video/mansion_gate.mp4` | ~415 MB | Background video on `gate.html` |
| `video/Sewer_Fall_2.mp4` | ~47 MB | Descent animation on `descent.html` |
| Multiple PNG/JPG backgrounds | 1–30 MB each | Page backgrounds and NFT art |

Total app size on disk: ~981 MB (195 files).

## Route / Case-Sensitivity Note

| Issue | Notes |
|---|---|
| `descent.html` references `video/sewer_fall_2.mp4`; canonical file is `video/Sewer_Fall_2.mp4` | Works on case-insensitive macOS; may need explicit lowercase copy on case-sensitive Linux deploy |
