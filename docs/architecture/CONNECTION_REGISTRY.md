# Connection Registry

All rows below were located by grepping the actual imported source for `window.open(`, `location.href`, `<a href=`, `fetch(`, and `netlify.app` — none are invented.

## Ledger AI / Gus → Outbound

| Source application | UI element / function | Connection type | Current destination | Expected application | Status |
|---|---|---|---|---|---|
| Ledger AI / Gus (`apps/gus/index.html:1856,2611`) | "F.A.M. Card" image (`ledger_ai/the_fam_card.png`) | `<a href target="_blank">` and `window.open()` | `https://muskrats-io.netlify.app/crew.html` | Muskrats.io / The Sewer (`crew.html`) | **Confirmed in source.** Netlify URL not re-pointed to local yet. |
| Ledger AI / Gus (`apps/gus/index.html:3456,3670`) | "🎛️ Infinite Loop™ Dashboard" admin link | `<a href target="_blank">` and `window.open()` | `https://agentic-loop.netlify.app/` | Infinite Agentic Loop | **Confirmed in source.** |
| Ledger AI / Gus (`apps/gus/index.html:4240`) | Help modal → "📚 Documentation" card | `onclick="window.open(...)"` | `https://docs.ledger-ai.com` | External docs site | Confirmed; out of ecosystem scope |
| Ledger AI / Gus (`apps/gus/index.html:4030`) | "Open Voice Selector" button | `window.open()` | `voice_selector.html` (local) | Same app | Confirmed on disk |
| Ledger AI / Gus (`apps/gus/index.html:2123`) | Agent status fetch | `fetch('./ledger_agent.json')` | `apps/gus/ledger_agent.json` | Same app | Confirmed on disk |

## F.A.M. → Outbound

| Source application | UI element / function | Connection type | Current destination | Expected application | Status |
|---|---|---|---|---|---|
| F.A.M. (`apps/fam/index.html`) | `<a href>` links | `<a href target>` | `https://muskrats-io.netlify.app/marketplace`, `.../mint`, `.../syndicate` | Muskrats.io | **Confirmed in source.** Netlify URLs not re-pointed to local yet. |

## Infinite Agentic Loop

| Source application | UI element / function | Connection type | Current destination | Expected application | Status |
|---|---|---|---|---|---|
| Infinite Agentic Loop (`apps/infinite-agentic-loop/index.html`) | Landing/admin/dashboard links | `<a href>` | `https://agentic-loop.netlify.app/`, `.../admin-control.html`, `.../dashboard.html` | Same domain | **Confirmed end-to-end** — matches Gus dashboard link target. |

## Muskrats.io — Entry & Poster Hub

| Source application | UI element / function | Connection type | Current destination | Expected application | Status |
|---|---|---|---|---|---|
| Muskrats.io (`apps/muskrats/index.html:141`) | "ENTER THE SEWER" button | `window.location.href='poster.html'` | `poster.html` | The Sewer / Operation Moon Vault | **Confirmed end-to-end** (HTTP 200) |
| Muskrats.io (`apps/muskrats/poster.html`, Gameplay dropdown) | The Mission Gate | `<a href='/gate'>` | `gate.html` (via clean URL) | Muskrats.io internal | **Confirmed end-to-end** |
| Muskrats.io (`apps/muskrats/poster.html`, Gameplay dropdown) | Dossier Lobby | `<a href='/dossier_lobby'>` | `dossier_lobby.html` | Muskrats.io internal | **Confirmed end-to-end** |
| Muskrats.io (`apps/muskrats/poster.html`, Gameplay dropdown) | Cellar Vault | `<a href='/cellar'>` | `cellar.html` | Muskrats.io internal | **Confirmed end-to-end** |
| Muskrats.io (`apps/muskrats/poster.html`, Gameplay dropdown) | Codex Manifesto | `<a href='/codex'>` | `codex.html` | Muskrats.io internal | **Confirmed end-to-end** |
| Muskrats.io (`apps/muskrats/poster.html`, Gameplay dropdown) | The Syndicate Terminal | `<a href='/syndicate'>` | `syndicate.html` | Muskrats.io internal | **Confirmed end-to-end** |
| Muskrats.io (`apps/muskrats/poster.html`, Drops dropdown) | MuskRats NFT / GPK / F.A.M. Card / Crew Members | `<a href='mint.html'>` | `mint.html` | Muskrats.io internal | **Confirmed end-to-end** |
| Muskrats.io (`apps/muskrats/poster.html`, easter egg) | Left egg icon | `onclick → joboffer.html` | `joboffer.html` | Don's Job Board | **Confirmed end-to-end** |
| Muskrats.io (`apps/muskrats/poster.html`, trap coin) | Trap coin → `triggerDescent()` | `window.location.href='descent.html'` | `descent.html` | The Descent | **Confirmed end-to-end** |

## Muskrats.io — Unified Footer (`unified-footer.js`)

| Source application | UI element | Connection type | Destination | Status |
|---|---|---|---|---|
| Muskrats.io (`unified-footer.js`) | 🎯 FAM CARD button | `onclick` | `crew.html` | **Confirmed end-to-end** |
| Muskrats.io (`unified-footer.js`) | Operation Moon Vault | `onclick` | `poster.html` | **Confirmed end-to-end** |
| Muskrats.io (`unified-footer.js`) | Don's Job Board | `onclick` | `joboffer.html` | **Confirmed end-to-end** |
| Muskrats.io (`unified-footer.js`) | Roadmap / Tokenomics / ALPHA / Contact | `onclick` | `roadmap.html`, `tokenomics.html`, `alpha.html`, `contact.html` | **Confirmed end-to-end** |
| Muskrats.io (`unified-footer.js`) | LORE dropup | `<a href>` | `lore.html`, `codex.html`, `syndicate.html`, `don.html`, `descent.html`, `dossier_lobby.html` | **Confirmed end-to-end** |
| Muskrats.io (`unified-footer.js`) | Marketplace dropup | `<a href>` | `marketplace.html`, `relics.html`, `mint.html` | **Confirmed end-to-end** |

## Muskrats.io — Gameplay Chains

| Source application | UI element | Connection type | Destination | Status |
|---|---|---|---|---|
| Muskrats.io (`crew.html`) | Fill Your Card CTA | `<a href>` | `mint.html` | **Confirmed end-to-end** |
| Muskrats.io (`crew.html`) | Skills Training / Lockpick Game buttons | `onclick` | `skills-training.html`, `lockpick-game.html` | **Confirmed end-to-end** |
| Muskrats.io (`skills-training.html`) | Mission START buttons | `onclick` | `lockpick-game.html` | **Confirmed end-to-end** |
| Muskrats.io (`lockpick-game.html`) | Back to Crew | `onclick` | `crew.html` | **Confirmed end-to-end** |
| Muskrats.io (`lockpick-game.html`) | Vault 5 rent link | `<a href>` | `vault5.html` | **Confirmed end-to-end** |
| Muskrats.io (`marketplace.html`) | Vault cards 1–6 | `onclick` | `vault1.html`–`vault6.html` | **Confirmed end-to-end** |
| Muskrats.io (`vault*.html`) | Back to Marketplace | `onclick` | `marketplace.html` | **Confirmed end-to-end** |
| Muskrats.io (`syndicate.html`) | Rent/Assign buttons | `onclick` | `vault3.html` | **Confirmed end-to-end** |
| Muskrats.io (`syndicate.html`) | Add to Crew / Apply for Guardianship | `onclick` | `crew.html`, `guardianship.html` | **Confirmed end-to-end** |
| Muskrats.io (`syndicate.html`) | Submit proposal flow | `onclick` | `proposal.html` | **Confirmed end-to-end** |
| Muskrats.io (`proposal.html`) | Post-submit redirect | `window.location.href` | `syndicate.html` | **Confirmed end-to-end** |
| Muskrats.io (`mint.html`) | Whitelist / FAM Collections links | `<a href>` | `whitelist.html`, `fam-collections.html` | **Confirmed end-to-end** |
| Muskrats.io (`whitelist.html`) | Back to Mint | `onclick` | `mint.html` | **Confirmed end-to-end** |

## Muskrats.io → Backend (Not Wired in Recovery)

| Source application | UI element | Connection type | Destination | Status |
|---|---|---|---|---|
| Muskrats.io (`whitelist.html`, `contact.html`, `proposal.html`) | Form submit | `fetch()` to backend URL | `https://muskrats-backend.herokuapp.com` (prod) or `localhost:3001` (dev) | Confirmed in source; `backend-server.js` preserved but not run in static recovery pass |

## Not Yet Traced

- Muskrats.io → Ledger AI / Gus return path — only documented in `LEDGER_AI_INTEGRATION_PLAN.md` (planning doc), not wired in live HTML.
- Re-pointing historical Netlify URLs (`muskrats-io.netlify.app`, `agentic-loop.netlify.app`) to local or new deploy targets — reconnection pass, not done.
- Historical Netlify URLs also referenced in docs/README: `ledger-ai.netlify.app`, `ledger-ai-v2.netlify.app` — not yet grepped from live served source.

Do not invent missing connections. Add rows only once a connection has actually been located in source.
