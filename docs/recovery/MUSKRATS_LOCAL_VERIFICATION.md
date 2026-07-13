# Muskrats.io — Local Verification

- **Source path (Drive, canonical):** `AI_APP/muskrats-io/` (Drive folder id `1NVtcstE4yoTcmFiac2hV5Kh1px4CVsWf`) — selected over the equivalent copy nested in the `AI_APP_V2_EXTRACTED` candidate because its files are dated through August 2025, versus a frozen June 21, 2025 snapshot in the other copy. See `docs/recovery/CANONICAL_SOURCE_MAP.md`.
- **Entry point:** `index.html`
- **Promoted to:** `apps/muskrats/`
- **Launch method:** fully static — `python3 -m http.server 8802` from `apps/muskrats/`
- **Verification date:** 2026-07-13

## Import Status — PARTIAL

This is a large site (~60 HTML pages plus JS/CSS/images/video/audio subfolders). Import is still in progress as of this report; only a subset of files has landed so far due to the one-file-at-a-time nature of the Drive API transfer and a session-wide rate limit interruption encountered mid-import. This is disclosed honestly rather than claimed complete.

**Files present in `apps/muskrats/` as of this report:** `index.html`, `gate.html`, `tokenomics.html`, plus this repo's own `README.md`. (Check `git log` / the working tree for the current count — the background import agent may have added more since this report was written.)

**Not yet imported:** the remaining ~55+ HTML pages (`alpha.html`, `crew.html`, `presale.html`, `relics.html`, `vault1.html`–`vault6.html`, `poster.html`, `mint.html`, `marketplace.html`, `syndicate.html`, `lore.html`, `codex.html`, and others), `donworld.css`, `backend-server.js`, `unified-footer.js`, `muskrat-assistant.js`/`.html`, `package.json`, `.env.example`, `vaults.json`, `muskrat-token-metadata.json`, the `images/`, `video/`, `audio/` subfolders, and the nested `MuskRats.io/` subfolder. These are documented in `docs/recovery/CANONICAL_SOURCE_MAP.md` and remain a follow-up action, not invented content.

**Deliberately excluded (real secrets, confirmed present in source, not imported):** `.env` (Drive id `1twrUUCt1Wh6srzcmfBHJcQmOrODEzDR-`) and `credentials.json` (Drive id `1cJ8oVTdAZZkNk2PzJ4cHiAVnv8dal-3R`).

## Result

`GET /index.html` returned `HTTP 200`, full 5,539-byte payload served correctly. The page is fully self-contained (inline `<style>` and `<script>`, no external file dependencies except one image, `images/muskrat_coin_cleaned.png`, which is not yet imported — it will render as a broken image / missing coin graphic).

## Features Tested

- Homepage loads: **pass** (200 OK, byte-exact size)
- Primary navigation: **confirmed in source, not yet click-tested** — the "ENTER THE SEWER" button calls `window.location.href='poster.html'`. This is the literal "Muskrats → The Sewer" connection named in the canonical naming table (`docs/canon/NAMING_AND_CANON.md`). `poster.html` itself is not yet imported, so following the button in a browser right now would 404.
- CSS/JS load: inline only on this page — **pass**, nothing external to fail
- Images: **fail/pending** — `images/muskrat_coin_cleaned.png` not yet imported
- Audio/video paths: not yet reachable — none of the linked deeper pages (which reference `audio/`, `video/`) have been imported yet
- No destructive external actions occur: **confirmed** — page is passive (particle animation + one local navigation button), no network calls, no wallet/transaction code executes on load

## Known Issues

- Import incompleteness as described above — this is the main known issue, and it is why "Muskrats.io launched locally" in this report means "the entry point serves and renders correctly, with confirmed structural navigation to The Sewer," not "the full multi-page site with all assets is browsable end-to-end."
- Two real secrets (`.env`, `credentials.json`) exist in the source and were correctly excluded — anyone completing the remaining import should continue excluding them.

## External URLs Referenced (from `LEDGER_AI_INTEGRATION_PLAN.md` and other docs found alongside this source, not yet re-verified from live HTML)

Not yet re-traced from the actual imported pages beyond `index.html`; see `docs/architecture/CONNECTION_REGISTRY.md` "Not Yet Traced" section.
