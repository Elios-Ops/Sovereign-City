# Sovereign City — Current State

_Read this at the start of every session. Keep it short and accurate._

## Mission

Restore and reconnect the Sovereign City ecosystem from the canonical recovered source (`AI_APP` inside `AI_APP_EXTRACTED`, and `AI_APP_V2_EXTRACTED`). Recover first, reconnect second, verify third — modernize only after the recovered ecosystem is operational.

## Canonical Source

- `AI_APP` inside `AI_APP_EXTRACTED`
- `AI_APP_V2_EXTRACTED`
- No more general archaeology required.

**Environment correction:** the canonical source does not live on this repository's execution filesystem — it lives in the Google Drive account connected to the working session (`codydewitt13@gmail.com`), under Drive folders titled `Ai_APP_EXTRACTED` (containing `Ai_APP`) and `Ai_APP_V2_EXTRACTED`. Exact Drive folder IDs and the per-application source map are recorded in `docs/recovery/CANONICAL_SOURCE_MAP.md`. `AI_APP_V2_EXTRACTED` contained two duplicate candidate folders; one was a broken/empty extraction and was rejected — see the source map for the resolution.

## Current Applications

- **Muskrats.io** — source selected (`AI_APP/muskrats-io/`), promoted to `apps/muskrats/`. Entry point verified to serve and render (`index.html`, 200 OK). "ENTER THE SEWER" → `poster.html` navigation now verified **end-to-end** (both files present, both HTTP 200, byte-exact). Import is still **partial**: roughly 14 of ~60 site pages transferred so far (see `docs/recovery/MUSKRATS_LOCAL_VERIFICATION.md`); the rest is a documented follow-up, not invented.
- **Historical Ledger AI / future Gus** — source selected (`AI_APP/ledger-ai-v1-v2-integrated/`), promoted to `apps/gus/`. **Fully imported and verified locally** (200 OK, byte-exact). Outbound navigation to Muskrats.io/The Sewer and to the Infinite Agentic Loop dashboard confirmed by grepping the actual served HTML. Four background images (1-6MB each) were not transferred and are logged in `apps/gus/NOT_IMPORTED_ASSETS.md`.
- **Ledger AI V2 (backend/services)** — a distinct source tree (`AI_APP/ledger-ai-v2/`) houses the Agent Router, Production Orchestrator, LLM Router, and Infinite Agentic Loop engine referenced by Directive 002. Partially imported into `source/canonical/` only; not promoted to `apps/` yet.
- **F.A.M.** — source selected (`AI_APP/fam-card-viewer/`), promoted to `apps/fam/`. **Fully imported and verified locally** — all 17 known source files present, entry point and every referenced JS/CSS/JSON asset returns HTTP 200. Confirmed outbound navigation to Muskrats.io marketplace/mint/syndicate pages. See `docs/recovery/FAM_LOCAL_VERIFICATION.md`.
- **Infinite Agentic Loop** (standalone site) — source selected (`AI_APP/infinite-agentic-loop-site/`), promoted to `apps/infinite-agentic-loop/`. **Fully imported and verified locally** (all 4 files HTTP 200, byte-exact). Confirms the Gus "Infinite Loop™ Dashboard" link resolves to this exact application at the domain level. See `docs/recovery/INFINITE_AGENTIC_LOOP_LOCAL_VERIFICATION.md`.
- Supporting services (Agent Router, Production Orchestrator, MCP components, n8n workflows) — source locations identified and recorded in `docs/canon/APPLICATION_REGISTRY.md` / `docs/recovery/CANONICAL_SOURCE_MAP.md`; not yet promoted or run.

## Verified Capabilities

- TradingView MCP is installed and operational; Claude Code successfully controlled and read TradingView Desktop; Pine Script v5 strategies were compiled, applied, and backtested. Two strategies tested (G-Channel+EMA: 36.67% win rate, historical 82% claim rejected; BB-RSI Reversion: 63.33% win rate, promising but needs broader validation). Simulation/Strategy-Tester only — no live trading. Full detail in `docs/trading/CURRENT_TRADING_STATE.md`.
- `apps/gus/` (Ledger AI / Gus) runs locally as a static site and its outbound navigation to Muskrats.io and the Infinite Agentic Loop dashboard is confirmed in source.
- `apps/fam/` (F.A.M.) runs locally as a static site with all assets resolving; outbound navigation to Muskrats.io confirmed.
- `apps/infinite-agentic-loop/` runs locally as a static site (all files byte-exact); confirmed as the same deployed identity Gus links to.
- `apps/muskrats/` entry point and "ENTER THE SEWER" destination both run locally and are confirmed end-to-end; most of the rest of the site (~18/60 pages so far) is still pending import.
- Repository foundation (structure, canon, registries, ADR-0001, verification scripts) is established, committed, and pushed to `claude/sovereign-city-foundation-t3b452`.

## Active Work

| Participant | Role | Current responsibility |
|---|---|---|
| Cody | Owner and final decision authority | Directs priorities and verifies intended behavior |
| Top Dev / GPT | Architecture and directives | Maintains high-level plan and reviews implementation |
| Claude Code | Implementation engineer | Imports, runs, verifies, commits, and reconnects applications |
| Mini Hermes | Continuity and repository memory | Archives verified state and keeps all agents synchronized |
| VPS Hermes | Remote operations | Deployment, automation, routing, and service work |
| Maya | Bridge/interface layer | Future realtime interface across projects, agents, and systems |

## Immediate Next Action

Finish importing the remaining ~42 Muskrats.io pages/assets (the only application left with an incomplete import) from Drive folder `1NVtcstE4yoTcmFiac2hV5Kh1px4CVsWf` (see `docs/recovery/CANONICAL_SOURCE_MAP.md` for the full mechanism and safety rules, already established and repeatable). Then extend the connection registry to cover the remainder of Muskrats.io's internal navigation.

## Blockers

- This execution environment has no local filesystem/iCloud access — all source import must go through the connected Google Drive account. This is now documented and worked around, not a live blocker, but any future session picking this up needs the same Drive access.
- Drive API only supports one-file-at-a-time transfer (no bulk/zip export used), so large binary assets (images/video/audio over ~300KB) were deliberately not transferred this session and are logged per-app in `NOT_IMPORTED_ASSETS.md` files rather than silently dropped.
- A session-wide API rate limit interrupted the background import agents twice mid-session (first reset ~12:30am UTC, recurred, second reset ~5:30am UTC); each time, progress made before the interruption was checkpointed and committed rather than lost, and remaining work was either finished directly or handed back to a resumed agent.
- The actual trading strategy results spreadsheet/database (numeric source of truth per `docs/trading/DATA_SOURCE_REGISTRY.md`) has not been linked yet — placeholder only.

## Last Updated

2026-07-13, Claude Code.
