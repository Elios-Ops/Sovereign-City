# Application Registry

| Application | Historical Name | Future Name | Source Location | Entry Point | Deployment | Verification | Status |
|---|---|---|---|---|---|---|---|
| Ledger AI / Gus | Ledger AI | Gus | `AI_APP/ledger-ai-v1-v2-integrated/` → `apps/gus/` | `index.html` | Not deployed (historical Netlify references pending trace) | See `docs/recovery/GUS_LOCAL_VERIFICATION.md` | Imported |
| Muskrats.io | Muskrats.io | Muskrats.io | `AI_APP/muskrats-io/` → `apps/muskrats/` | `index.html` | Not deployed (historical Netlify references pending trace) | See `docs/recovery/MUSKRATS_LOCAL_VERIFICATION.md` | Imported |
| F.A.M. | F.A.M. Card Viewer | F.A.M. | `AI_APP/fam-card-viewer/` → `apps/fam/` | `index.html` | Not deployed | See `docs/recovery/FAM_LOCAL_VERIFICATION.md` — PASS | Imported and verified |
| Infinite Agentic Loop | Infinite Agentic Loop | Infinite Agentic Loop | `AI_APP/infinite-agentic-loop-site/` → `apps/infinite-agentic-loop/` | `index.html` | Not deployed | Not yet run this session | Imported |
| Ledger AI V2 (backend/services) | Ledger AI V2 | Unknown — Verification Required | `AI_APP/ledger-ai-v2/` → `source/canonical/` only | `index.html`, `js/production-orchestrator.js` | Not deployed | Not run this session | Imported (preserved only, not promoted) |
| GPK | GPK | GPK | Unknown — Verification Required | Unknown — Verification Required | Unknown — Verification Required | Unknown — Verification Required | Not started |
| Agent Router | Unknown — Verification Required | Agent Router | `AI_APP/ledger-ai-v2/agents/AgentRouter.js` and `AI_APP/ClaudeMCP_Core/agent_router.py` (two distinct implementations) | see source | Not deployed | Not run | Source located, not reconciled |
| Production Orchestrator | Unknown — Verification Required | Production Orchestrator | `AI_APP/ledger-ai-v2/js/production-orchestrator.js` (also a root-level copy at `AI_APP/production-orchestrator.js`) | — | Not deployed | Not run | Source located |
| MCP tooling | Unknown — Verification Required | MCP tooling | `AI_APP/ClaudeMCP_Core/` (Python: `agent_router.py`, `vault_manager.py`, `smart_memory.py`; JS entry `server.js`/`index.js`) | `server.js` | Not deployed | Not run | Source located |

Do not guess values. Replace `Unknown — Verification Required` only once evidence has actually been examined. See `docs/recovery/CANONICAL_SOURCE_MAP.md` for full source detail and exclusions.
