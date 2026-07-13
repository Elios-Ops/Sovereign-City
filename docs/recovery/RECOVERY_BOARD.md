# Recovery Board

Tracking board for recovery, verification, and promotion work across Sovereign City applications.

| Application | Recovery Stage | Owner | Notes |
|---|---|---|---|
| Muskrats.io | **Promoted — verified; front-end reconnected** | Claude Code | Directive 004 complete; see `ECOSYSTEM_RECONNECT_VERIFICATION.md` |
| Ledger AI / Gus | **Promoted — verified** | Claude Code | `apps/gus/` — see `docs/recovery/GUS_LOCAL_VERIFICATION.md` |
| F.A.M. | **Promoted — verified** | Claude Code | `apps/fam/` — see `docs/recovery/FAM_LOCAL_VERIFICATION.md` |
| Infinite Agentic Loop | **Promoted — verified** | Claude Code | `apps/infinite-agentic-loop/` — see `docs/recovery/INFINITE_AGENTIC_LOOP_LOCAL_VERIFICATION.md` |
| Agent Router | Not started | — | Source in `AI_APP/ledger-ai-v2/` — not promoted to `apps/` |
| Production Orchestrator | Not started | — | Source in `AI_APP/ledger-ai-v2/` — not promoted to `apps/` |
| MCP components | Not started | — | Unknown — verification required |
| Trading / Pine Script lane | In progress | Claude Code / Mini Hermes | See `docs/trading/CURRENT_TRADING_STATE.md` |

Recovery stages: Preserve source → Identify canonical copy → Verify independently → Trace dependencies → Restore navigation → Promote.

**Next:** Backend form reconnect; push commits after `gh auth refresh`; restart Muskrats on 8802 if stale process present.
