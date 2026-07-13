# Mini Hermes — Full State Handoff

**Purpose:** give Mini Hermes (local archive, continuity, and repository-memory role) the complete current account of Directive 001 and Directive 002 execution, so the repository — not any single agent's session — remains the canonical operational memory.

**Date:** 2026-07-13
**Prepared by:** Claude Code

---

## 1. Canonical Source Locations

The canonical recovered source is **not** on local disk / iCloud in the environment that executed this work — it lives in the Google Drive account connected to the session (`codydewitt13@gmail.com`):

| Name | Drive folder title | Drive folder ID |
|---|---|---|
| `AI_APP_EXTRACTED` | "Ai_APP_EXTRACTED" | `1SwU7RigQrG_Ujk1DELCuB5F1DFJZdjFd` |
| `AI_APP` (nested inside above) | "Ai_APP" | `1gBKO1bQZhgjG0cRBwS4SkBc8QaDIBXYJ` |
| `AI_APP_V2_EXTRACTED` | "Ai_APP_V2_EXTRACTED" | `1kXVpS1F-B-0wnp0b6wwvzHXGpJnxYRId` |

`AI_APP_V2_EXTRACTED` contained two duplicate sibling folders both titled "Ai_APP_V2" (`1cT37WrSE5zVNltzpKabVrWe9JENxb2EL` and `19HYdRdlvycRuushtgNUbjGJtnZvV_49G`). The first is a broken/empty extraction (all named subfolders have 0 children) and was rejected; the second is the real, fully-populated copy and was adopted as canonical.

Full per-application source paths, entry points, and selection reasoning are in `docs/recovery/CANONICAL_SOURCE_MAP.md`.

## 2. Repository Name and Structure

Repository: **Sovereign-City** (GitHub: `Elios-Ops/Sovereign-City`). Not the ELIOS repository — a separate project, never to be merged.

Structure established (Directive 001): `apps/` (promoted, verified applications), `recovered/` (historical preservation, unmodified), `services/`, `infrastructure/`, `archive/`, `docs/` (recovery, canon, architecture, deployment, decisions, trading, directives), `source/canonical/` (safe copies of the two Drive trees), `trading/` (pine scripts, results), `scripts/` (verification tooling).

## 3. Application Identities

| App | Historical name | Future name | Status |
|---|---|---|---|
| Ledger AI / Gus | Ledger AI (specifically "Ledger-AI V1+V2 Integrated Edition") | Gus | **Imported and verified locally**, `apps/gus/` |
| Muskrats.io | Muskrats.io | Muskrats.io | Selected source, **partially imported** (~14/60 pages; entry point and "ENTER THE SEWER" destination both verified end-to-end), `apps/muskrats/` |
| Ledger AI V2 (backend) | "Ledger~AI V2 - Infinite Agentic Loop System" | Unknown — verification required | Source located (`AI_APP/ledger-ai-v2/`), houses Agent Router / Production Orchestrator / LLM Router / n8n webhook server; preserved only, not promoted |
| F.A.M. | F.A.M. Card Viewer | F.A.M. | **Imported and verified locally** (all 17 files, all assets 200 OK), `apps/fam/` |
| Infinite Agentic Loop | Infinite Agentic Loop | Infinite Agentic Loop | Selected source (`AI_APP/infinite-agentic-loop-site/`), import in progress via resumed background agent as of this handoff |
| GPK | GPK | GPK | Not located this session |

## 4. Naming Corrections and Gus Naming Decision

- The original source is named `AI_APP` and must never be called "V1." Version naming begins only with `AI_APP_V2_EXTRACTED`.
- Historical "Ledger AI" naming is preserved verbatim inside all imported source and inside `apps/gus/` — **no mass find/replace to "Gus" was performed**. Only the destination folder is named `gus`. Brand migration is a separate future task requiring explicit owner sign-off.
- Maya's role: realtime voice-guided interface and bridge layer between projects, agents, and systems — not implemented or touched this session, recorded here only as canon (`docs/canon/NAMING_AND_CANON.md`).
- Mini Hermes vs. VPS Hermes: Mini Hermes = local archive/continuity/repository-memory (you); VPS Hermes = remote deployment/automation/routing/service work. Distinct roles, both recorded in `docs/canon/NAMING_AND_CANON.md` and `CURRENT_STATE.md`.

## 5. Completed Repository Work

- Directive 001 (repository foundation): structure, naming canon, application/connection registries, ADR-0001, `.gitignore`, verification scripts — committed and pushed.
- Directive 002 (canonical source import), this session:
  - Canonical source located (in Drive, not local disk — documented deviation from the directive's assumption).
  - `docs/recovery/CANONICAL_SOURCE_MAP.md` written with exact paths/IDs/entry points/exclusions.
  - `apps/gus/` fully imported, locally verified (HTTP 200, byte-exact), outbound navigation to Muskrats.io and Infinite Agentic Loop confirmed via source grep.
  - `apps/fam/` fully imported, locally verified (all 17 files, all 15 referenced assets HTTP 200), outbound navigation to Muskrats.io marketplace/mint/syndicate confirmed via source grep.
  - `apps/muskrats/` partially imported (~14/60 pages); entry point verified to load; "ENTER THE SEWER" → `poster.html` navigation confirmed **end-to-end** (both files present and serving HTTP 200); further internal navigation (Mission Gate, Dossier Lobby, Cellar Vault, Codex, Syndicate Terminal, job offer easter egg, descent trigger) discovered in `poster.html` and recorded, destinations mostly not yet imported.
  - `apps/infinite-agentic-loop/` destination created; import in progress via a resumed background agent as of this handoff.
  - `docs/trading/CURRENT_TRADING_STATE.md` and supporting trading docs imported verbatim from the supplied TradingView MCP + Pine Script current-state document, placed exactly where that document specified.
  - `docs/architecture/CONNECTION_REGISTRY.md` populated with real, source-grepped connections (not invented).
  - `CURRENT_STATE.md` (repo root) written and kept current as of this handoff.

## 6. Selected Sources

- **Muskrats.io:** `AI_APP/muskrats-io/` (Drive folder `1NVtcstE4yoTcmFiac2hV5Kh1px4CVsWf`) — chosen over the `AI_APP_V2_EXTRACTED` copy because its files are dated through August 2025 vs. a frozen June 21, 2025 snapshot in the other copy.
- **Historical Ledger AI/Gus:** `AI_APP/ledger-ai-v1-v2-integrated/` (Drive folder `1WoPnk_aY9fq-xMO0deK9IwpgKhiUtO2p`) — chosen because its own README describes it as the "perfect fusion" of V1's interface and V2's backend, it is the most recently modified, and its `index.html` (204KB) is far larger/more complete than the plainer `ledger-ai-v2` (17.8KB) landing page.

## 7. Local Verification Results

- **Gus:** PASS. See `docs/recovery/GUS_LOCAL_VERIFICATION.md`.
- **Muskrats.io:** PARTIAL PASS (entry point only). See `docs/recovery/MUSKRATS_LOCAL_VERIFICATION.md`.
- **F.A.M., Infinite Agentic Loop:** not yet run locally — imports incomplete.

## 8. Connection Registry Status

`docs/architecture/CONNECTION_REGISTRY.md` contains five confirmed connections (all grepped from actual served source, not invented):
1. Gus → Muskrats.io/The Sewer (`crew.html`, via F.A.M. Card image and admin link)
2. Gus → Infinite Agentic Loop dashboard (`agentic-loop.netlify.app`)
3. Gus → external docs (`docs.ledger-ai.com`, out of ecosystem scope)
4. Gus → internal `voice_selector.html` and local `ledger_agent.json` fetch
5. Muskrats.io → `poster.html` ("ENTER THE SEWER" button)

Remaining traces (Muskrats.io's other ~55 pages, F.A.M., Infinite Agentic Loop) are explicitly marked "Not Yet Traced," not guessed.

## 9. TradingView MCP and Pine Script Status

Fully operational per the supplied current-state document, imported verbatim into `docs/trading/CURRENT_TRADING_STATE.md`. Key facts: TradingView MCP installed and controlling TradingView Desktop; Pine v5 compiled and backtested; G-Channel+EMA strategy's historical ~82% win-rate claim was tested and rejected (actual: 36.67% win rate, SPY 5-min, June 1–July 10 2026); BB-RSI Reversion strategy tested at 63.33% win rate, flagged promising but needs broader validation (fewer trades, different capital base — not directly comparable to G-Channel by raw dollars). Simulation/Strategy-Tester only, no live trading, no real funds — this constraint is stated explicitly in every trading doc.

**The underlying `.pine` script source files themselves were not located within the portions of the two canonical Drive trees inspected this session** — only the verified test *results* were available (supplied directly as a document, not sourced from Drive). This is flagged in `docs/recovery/CANONICAL_SOURCE_MAP.md` as `Unknown — verification required` rather than guessed.

## 10. Trading Strategy Database

A dedicated Google spreadsheet/database is stated to be the numeric source of truth for detailed strategy statistics. **No link/identifier for it has been supplied yet** — `docs/trading/DATA_SOURCE_REGISTRY.md` and `docs/trading/STRATEGY_REGISTRY.md` both carry an explicit placeholder for this and instruct future sessions not to reconstruct values from memory once the real spreadsheet is available.

## 11. Current Branch and Commit

- Branch: `claude/sovereign-city-foundation-t3b452` (the session's designated branch — see note in `docs/directives/DIRECTIVE_001_CANONICAL_REPOSITORY_BOOTSTRAP.md` and `DIRECTIVE_002_CANONICAL_SOURCE_IMPORT.md` about this branch-naming deviation from what the directives themselves specify).
- Commits made this session (see `git log` for authoritative list/hashes): repository foundation; directive/trading docs; canonical source map + registry updates; partial `AI_APP` source import; Gus completion + verification + connection registry.
- Pushed to `origin/claude/sovereign-city-foundation-t3b452` after each checkpoint.

## 12. Open Blockers

- No local filesystem/iCloud access in this execution environment — all further source import must continue via the connected Google Drive account using the folder IDs recorded in `docs/recovery/CANONICAL_SOURCE_MAP.md`.
- Muskrats.io, F.A.M., and Infinite Agentic Loop imports are incomplete — a session-wide API rate limit interrupted the background import agents mid-run.
- Large binary assets (images/video/audio over ~300KB) were not transferred via the one-file-at-a-time Drive API approach used this session; each affected app has a `NOT_IMPORTED_ASSETS.md` log rather than a silent gap.
- Trading strategy spreadsheet/database link not yet supplied.
- `.pine` script source files not yet located in the inspected portions of the canonical trees.

## 13. Next Actions

1. Finish importing Muskrats.io's remaining ~55 pages + CSS/JS + `poster.html` (The Sewer entry), then re-verify navigation end-to-end.
2. Finish importing F.A.M.'s `index.html` and remaining assets; run it locally.
3. Import the Infinite Agentic Loop standalone site; run it locally.
4. Reconcile the two Agent Router implementations found (`AI_APP/ledger-ai-v2/agents/AgentRouter.js` vs. `AI_APP/ClaudeMCP_Core/agent_router.py`).
5. Obtain and link the trading strategy spreadsheet/database.
6. Locate the actual `.pine` script files (not yet found in the inspected Drive subtrees) to complete `trading/pine/*/`.

Mini Hermes: please archive this handoff and treat this repository, not any chat transcript, as the canonical record going forward.
