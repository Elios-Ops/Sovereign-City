# F.A.M. Card Viewer — Local Verification

- **Historical name:** FAM Card Viewer
- **Source path (Drive, canonical):** `AI_APP/fam-card-viewer/` (Drive folder id `1WMTyZ7ITQr4U0VFAg99SiKhiVvBG_Q_1`)
- **Selected entry point:** `index.html` (14,377 bytes); an `enhanced-index.html` variant also exists and was imported
- **Promoted to:** `apps/fam/`
- **Launch command used:** `python3 -m http.server 8804` from `apps/fam/`
- **Verification date:** 2026-07-13

## Import Status — COMPLETE

All 17 known source files imported to both `apps/fam/` and `source/canonical/AI_APP/fam-card-viewer/`: `index.html`, `enhanced-index.html`, `styles.css`, `utilities.js`, `notification.js`, `admin-debug-system.js`, `voice-interface.js`, `web3-wallet-integration.js`, `wallet-integration.js`, `rgb-control-system.js`, `aspect-ratio-controls.js`, `asset-positioning-system.js`, `nft-slot-system.js`, `fam-card-integration.js`, `famcard.json`, `README.md`, `DEPLOYMENT.md`. No `.env`/credentials files existed in this source tree.

## Result

`index.html` returns HTTP 200 (14,377 bytes). Every JS/CSS/JSON resource it and `enhanced-index.html` reference (15 files) was individually requested and returned HTTP 200 — nothing 404s. Per its own README, this app is "an interactive NFT card system designed to serve as a backdoor to the Muskrats.io ecosystem," combining Three.js rendering, asset positioning, wallet integration, and voice interfaces.

## Features Tested

- Page load: **pass**
- All referenced local JS/CSS/JSON assets resolve: **pass** (15/15 HTTP 200)
- External CDN dependencies present in source (not verified reachable, out of scope for local static-file verification): `web3@1.5.2` (jsdelivr), `three.js r128` (cdnjs)
- Outbound navigation to Muskrats.io confirmed (see `docs/architecture/CONNECTION_REGISTRY.md`): links to `marketplace`, `mint`, and `syndicate` pages on `muskrats-io.netlify.app`
- No live wallet transactions or real trading occurs on static load

## Backend Requirements

None — fully static HTML/CSS/JS, no server-side dependency to load.

## Known Issues

- Interactive/visual behavior (actual card rendering via Three.js, wallet connect flow, voice command recognition) was not exercised in a real browser this session — verification here confirms all assets are present and served correctly, not that every interactive feature functions end-to-end.
- Access codes are documented in the recovered README (`FAM343` admin, `community` limited, ESC for guest) — these are historical/demo codes carried over from source, not new secrets introduced by this import.
