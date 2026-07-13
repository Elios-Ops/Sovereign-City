# Historical Ledger AI / Gus — Local Verification

- **Historical source name:** Ledger-AI V1+V2 Integrated Edition (per its own README)
- **Source path (Drive, canonical):** `AI_APP/ledger-ai-v1-v2-integrated/` (Drive folder id `1WoPnk_aY9fq-xMO0deK9IwpgKhiUtO2p`)
- **Selected entry point:** `index.html` (204,160 bytes)
- **Promoted to:** `apps/gus/`
- **Launch command used:** `python3 -m http.server 8801` from `apps/gus/`, then `curl http://127.0.0.1:8801/index.html`
- **Verification date:** 2026-07-13

## Result

`GET /index.html` returned `HTTP 200`, full 204,160-byte payload served correctly as a static file — no server-side dependency required to load the main interface.

## Features Tested

- Static HTML load: **pass** (200 OK, full byte count matches source)
- F.A.M. navigation present: **pass** — a "F.A.M. Card" image link (`ledger_ai/the_fam_card.png`) opens `https://muskrats-io.netlify.app/crew.html`
- Muskrats.io / Sewer navigation present: **pass** — same link as above; also a `window.open()` call to the same URL elsewhere in the interface
- Infinite Agentic Loop navigation present: **pass** — "🎛️ Infinite Loop™ Dashboard" admin link opens `https://agentic-loop.netlify.app/`
- Internal navigation: **pass** — "Open Voice Selector" button opens the local `voice_selector.html`, which is present in the imported source
- Local data fetch: **pass** — `fetch('./ledger_agent.json')` targets a file confirmed present in `apps/gus/`
- No real trading or financial execution occurs on load — the interface is a static mystical-trading-themed dashboard; no live exchange calls were found or triggered

## External Navigation Found

See `docs/architecture/CONNECTION_REGISTRY.md` for the full table with exact line numbers. Summary: `https://muskrats-io.netlify.app/crew.html`, `https://agentic-loop.netlify.app/`, `https://docs.ledger-ai.com` (external, out of ecosystem scope). None of these URLs were called over the network during this verification — only grepped from source and confirmed present as literal strings in the HTML.

## Backend Requirements

None for the main interface — it is a fully static HTML/CSS/JS page. `ledger-ai-v2` (the separate, not-yet-promoted backend/services source at `AI_APP/ledger-ai-v2/`) does describe a Node.js/Express/WebSocket backend (`js/production-orchestrator.js`, `js/llm-router.js`, etc.) per its own README, but `apps/gus/index.html` does not require that backend to load and render.

## Known Issues / Gaps

- Four background images referenced by the interface (`ledger_ai/crew_bg.png`, `ledger_ai/la_sambra.png`, `ledger_ai/the_fam_card.png`, `ledger_ai/ledger_ai.png`) were not imported — each exceeds the practical size threshold for this session's one-file-at-a-time Drive download approach (1.2–6.4MB each). These will render as broken images. See `apps/gus/NOT_IMPORTED_ASSETS.md`.
- No mass rename from "Ledger AI" to "Gus" was performed inside the source, per Directive 002 — the interface still displays as "Ledger-AI V1+V2 Integrated Edition" internally. Only the destination folder is named `gus`.
- Browser-rendered visual verification (opening the page in an actual browser) was not performed in this pass — verification here is limited to HTTP-serve confirmation and static source inspection. A full visual/interactive check (buttons actually clicked, JS execution confirmed) is a reasonable follow-up.
