# Connection Registry

All rows below were located by grepping the actual imported source (`apps/gus/index.html`) for `window.open(`, `location.href`, `<a href=`, `fetch(`, and `netlify.app` — none are invented. Line numbers refer to `apps/gus/index.html` as imported this session.

| Source application | UI element / function | Connection type | Current destination | Expected application | Status |
|---|---|---|---|---|---|
| Ledger AI / Gus (`apps/gus/index.html:1856,2611`) | "F.A.M. Card" image (`ledger_ai/the_fam_card.png`) | `<a href target="_blank">` and `window.open()` | `https://muskrats-io.netlify.app/crew.html` | Muskrats.io / The Sewer (`crew.html`) | **Confirmed in source.** Live reachability of the Netlify URL not tested (directive scopes this to local verification, not external network calls). |
| Ledger AI / Gus (`apps/gus/index.html:3456,3670`) | "🎛️ Infinite Loop™ Dashboard" admin link | `<a href target="_blank">` and `window.open()` | `https://agentic-loop.netlify.app/` | Infinite Agentic Loop (V2 admin dashboard, per `AI_APP/ledger-ai-v2` README) | **Confirmed in source.** |
| Ledger AI / Gus (`apps/gus/index.html:4240`) | Help modal → "📚 Documentation" card | `onclick="window.open(...)"` | `https://docs.ledger-ai.com` | External docs site, not part of the recovered application set | Confirmed in source; out of ecosystem scope |
| Ledger AI / Gus (`apps/gus/index.html:4030`) | "Open Voice Selector" button | `window.open()` | `voice_selector.html` (local, relative) | Same app, `apps/gus/voice_selector.html` | Confirmed in source and confirmed present on disk |
| Ledger AI / Gus (`apps/gus/index.html:2123`) | Agent status fetch | `fetch('./ledger_agent.json')` | `apps/gus/ledger_agent.json` (local) | Same app | Confirmed in source and confirmed present on disk |

| Muskrats.io (`apps/muskrats/index.html:141`) | "ENTER THE SEWER" button | `onclick="window.location.href='poster.html'"` | `poster.html` (local, relative — not yet imported) | Muskrats.io internal page — "The Sewer" | **Confirmed in source.** Destination file not yet imported, so not yet click-verified end-to-end. |
| F.A.M. (`apps/fam/index.html`) | `<a href>` links (exact link text not yet extracted) | `<a href target>` | `https://muskrats-io.netlify.app/marketplace`, `https://muskrats-io.netlify.app/mint`, `https://muskrats-io.netlify.app/syndicate` | Muskrats.io | **Confirmed in source** via grep of served HTML. |

## Not Yet Traced

- Remainder of Muskrats.io's internal page navigation beyond `index.html` (its own internal page links plus any `LEDGER_AI_INTEGRATION_PLAN.md`-referenced connection back to Ledger AI) — most of Muskrats.io's ~60 HTML pages were still being imported as of this report; re-run this trace once the import completes.
- F.A.M. Card Viewer (`apps/fam/`) — entry point now imported and traced above; several of its referenced local JS files (`admin-debug-system.js`, `aspect-ratio-controls.js`, `asset-positioning-system.js`, `fam-card-integration.js`, `nft-slot-system.js`, `notification.js`, `rgb-control-system.js`) are not yet imported, so the page will not fully function yet.
- Infinite Agentic Loop standalone site (`apps/infinite-agentic-loop/`) outbound navigation — import incomplete as of this report.
- Historical Netlify URLs discovered so far: `https://muskrats-io.netlify.app/`, `https://agentic-loop.netlify.app/`, `https://docs.ledger-ai.com`, and (from the `ledger-ai-v1-v2-integrated` README, not yet grepped from live source) `https://ledger-ai.netlify.app/` and `https://ledger-ai-v2.netlify.app`. These are documented as found; none were replaced or re-pointed.

Do not invent missing connections. Add rows only once a connection has actually been located in source.
