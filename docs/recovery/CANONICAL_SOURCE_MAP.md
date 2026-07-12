# Canonical Source Map

This is a practical map of which current application comes from which canonical source location. It is not a full archaeological inventory (see `docs/recovery/MASTER_SOURCE_INVENTORY.md` for that placeholder).

## Source Location Correction

Directive 002 assumes the canonical source (`AI_APP` inside `AI_APP_EXTRACTED`, and `AI_APP_V2_EXTRACTED`) is reachable on the local filesystem (referred to as living on "the M4 Max MacBook Pro"). The session executing this directive (Claude Code, running in a remote ephemeral cloud container) has no local filesystem or iCloud access whatsoever — confirmed by a full-disk search finding no matching paths.

The canonical source was instead located in the **Google Drive** account connected to this session (`codydewitt13@gmail.com`):

| Canonical name | Drive folder title | Drive folder ID |
|---|---|---|
| `AI_APP_EXTRACTED` | "Ai_APP_EXTRACTED" | `1SwU7RigQrG_Ujk1DELCuB5F1DFJZdjFd` |
| `AI_APP` (nested inside the above) | "Ai_APP" | `1gBKO1bQZhgjG0cRBwS4SkBc8QaDIBXYJ` |
| `AI_APP_V2_EXTRACTED` | "Ai_APP_V2_EXTRACTED" | `1kXVpS1F-B-0wnp0b6wwvzHXGpJnxYRId` |

**Duplicate found and resolved:** `AI_APP_V2_EXTRACTED` contains two sibling folders both literally titled "Ai_APP_V2":
- `1cT37WrSE5zVNltzpKabVrWe9JENxb2EL` — **REJECTED**. Missing `package.json`, `package-lock.json`, `README.md`, `.env`, `.env.example`, `.gitignore`, `.git/` entirely. Its `ledger-ai-v2`, `fam-card-viewer`, `docs`, `CLAUDE_DID_IT`, `infinite-agentic-loop-site`, and `MCP-AGENTS` subfolders are all **empty (0 children)**. This is a broken/partial extraction — a folder-shell duplicate, not usable source.
- `19HYdRdlvycRuushtgNUbjGJtnZvV_49G` — **SELECTED as canonical `AI_APP_V2_EXTRACTED`**. Contains `.git/`, `package.json`, `README.md`, `.env`/`.env.example`, and every named application subfolder fully populated, closely mirroring `AI_APP`.

Also explicitly out of scope (found via unscoped Drive search, correctly excluded per Directive 002's instruction not to broaden into historical duplicates): a Drive folder literally titled "Ai_APP copy", and standalone "ledger-ai-v2" / "Ai-Ledger" folders that are not descendants of either canonical root.

## Application Source Map

| Component | Source tree | Exact path (Drive) | Entry point | Current role | Selection status |
|---|---|---|---|---|---|
| Muskrats.io | `AI_APP` | `Ai_APP/muskrats-io/` (folder id `1NVtcstE4yoTcmFiac2hV5Kh1px4CVsWf`) | `index.html` | Muskrats / Sewer site | **Selected** — most recently modified copy (files dated through August 2025); the equivalent copy nested in the `AI_APP_V2_EXTRACTED` candidate is a frozen June 21, 2025 snapshot and was not used |
| Historical Ledger AI / future Gus | `AI_APP` | `Ai_APP/ledger-ai-v1-v2-integrated/` (folder id `1WoPnk_aY9fq-xMO0deK9IwpgKhiUtO2p`) | `index.html` (~204KB) | Primary assistant app, promoted to `apps/gus/` | **Selected** — its own README describes it as "the perfect fusion": V1's mystical trading interface (4 analysts: ALPHAHAWK, QUANTUMGHOST, STOIC, MIRROR) combined with V2's 34-agent backend. Most current/complete synthesis found. |
| Ledger AI V2 (backend/services) | `AI_APP` | `Ai_APP/ledger-ai-v2/` (folder id `1fsL-oUr75Pt9x-4NbHxEGsUZ66DGurL6`) | `index.html` (landing), `js/production-orchestrator.js`, `js/infinite-agentic-loop.js`, `js/llm-router.js`, `js/n8n-webhook-server.js` | Supporting backend — houses the Agent Router / Production Orchestrator / LLM Router / infinite-loop engine referenced elsewhere in Directive 002 | Verify — imported as preserved source; not promoted to `apps/` in this pass |
| F.A.M. | `AI_APP` | `Ai_APP/fam-card-viewer/` (folder id `1WMTyZ7ITQr4U0VFAg99SiKhiVvBG_Q_1`) | `index.html` (there is also an `enhanced-index.html` variant) | Connected F.A.M. surface, promoted to `apps/fam/` | Selected |
| Infinite Agentic Loop | `AI_APP` | `Ai_APP/infinite-agentic-loop-site/` (folder id `1iqp8g9dN6jYNXhyEfAvQuv4VLq_S9HCc`) | `index.html` (also `dashboard.html`, `admin-control.html`) | Standalone loop app, promoted to `apps/infinite-agentic-loop/` | Selected. Note: `ledger-ai-v2` also contains an internal "infinite agentic loop" dashboard/engine (`js/infinite-agentic-loop.js`, `dashboards/infinite-agentic-loop-dashboard.html`) — these are the backend engine, distinct from this standalone site. |
| ClaudeMCP_Core (MCP components) | `AI_APP` | `Ai_APP/ClaudeMCP_Core/` (folder id `1IHpHDT1y0chzS6QV4nlRHWMrlEQ9Yavd`) | `server.js` / `index.js` (thin JS entry points), `agent_router.py` (Python MCP core), `vault_manager.py`, `smart_memory.py` | Local MCP integrations | Verify — preserved in `source/canonical/` only in this pass, not promoted |
| Agent Router | `AI_APP` | `Ai_APP/ledger-ai-v2/agents/` (`AgentRouter.js`) and `Ai_APP/ClaudeMCP_Core/agent_router.py` | see above | Backend routing | Verify — two distinct implementations exist (JS in ledger-ai-v2, Python in ClaudeMCP_Core); not yet reconciled |
| Production Orchestrator | `AI_APP` | `Ai_APP/ledger-ai-v2/js/production-orchestrator.js`; also a root-level `production-orchestrator.js` exists at `Ai_APP/` root | — | Orchestration | Verify |
| Trading / Pine Script assets | Not yet located within the two canonical Drive trees | — | — | Simulation/testing | **Unknown — verification required.** The verified trading *results* (TradingView Strategy Tester output for TV-0001/TV-0002) were supplied directly to this session as a separate document (see `docs/trading/CURRENT_TRADING_STATE.md`) and are not sourced from `AI_APP`/`AI_APP_V2_EXTRACTED`. The underlying `.pine` script files themselves were not found in the portions of the Drive trees inspected this session; `trading/pine/*/README.md` placeholders note this. |
| n8n workflows | `AI_APP` | `Ai_APP/n8n-workflows/` (folder id `16DEAYirheCor3YSrrNQfg6lJHKZX_ppP`) | — | Automation | Unknown — verification required (not inspected in depth this session) |
| database | `AI_APP` | `Ai_APP/database/` (folder id `1ujEG0altQ5mRp6Da1iayc-h5-Xc30xMZ`) | — | — | Unknown — verification required |

## Dependency / Build Noise Excluded From Import

The following were identified in `AI_APP` and excluded from all copies per Directive 002's exclusion list:

- `node_modules/`
- `.git/`
- `.netlify/` (build cache)
- ~40 flat Python `site-packages`/`*.dist-info` folders sitting directly at the `AI_APP` root (pydantic, supabase, httpx, gotrue, anyio, websockets, h2, h11, etc.) plus loose vendored files (`six.py`, `typing_extensions.py`, `deprecation.py`) — this looks like a Python virtual environment that was dumped directly into the repo root rather than kept in a `.venv/`.
- A historical `Ai_APP copy.zip` backup (~1.9GB) present as a descendant inside the tree — a backup archive, not source to unpack.
- Real secrets: an `.env` file and a `credentials.json` file were found inside `Ai_APP/muskrats-io/` — **neither was imported**. Only `.env.example` template files were imported anywhere in this pass.

## Not Yet Investigated (bounded scope — do not broaden without a specific missing-file reason)

Per Directive 002's explicit scope boundary, the following `AI_APP` folders were identified by name during the inventory pass but not opened/imported in this session: `muskrats-internal-db/`, `ClaudeMCP_Project/`, `MCP-AGENTS/`, `agents/` (root-level), `CLAUDE_DID_IT/` (contains `FAM_Ledger_Starter_Pack/` and `ledger_syndicate_beta_app/`), `netlify/`, `netlify-build/`, `ledger-ai-update/`, `.claude/`, `tests/`, `logic/`, `scripts/`, `prompts/`, `ui_mockups/`, `utils/`. These remain `Unknown — Verification Required` in `docs/canon/APPLICATION_REGISTRY.md` and should be examined in a follow-up pass, not invented here.
