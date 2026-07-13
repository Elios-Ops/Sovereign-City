# Ecosystem Reconnect Verification — Directive 004

**Date:** 2026-07-13  
**Baseline tag:** `muskrats-recovery-baseline` (`f08af7e`)  
**Reconnect commit:** `54667b4`  
**Status:** Front-end graph reconnected with documented limitations

## Configuration layer

| File | Role |
|---|---|
| `docs/architecture/ecosystem-urls.js` | Canonical shared URL config |
| `docs/architecture/LOCAL_URL_REGISTRY.md` | Service map, API, consumption docs |
| `apps/gus/ecosystem-urls.js` | Gus copy |
| `apps/fam/ecosystem-urls.js` | F.A.M. copy |
| `apps/infinite-agentic-loop/ecosystem-urls.js` | Infinite Agentic Loop copy |

Environment detection: `localhost` / `127.0.0.1` → local ports; otherwise production Netlify placeholders in config.

## Redirects added (Muskrats)

| Clean route | Target | Verified HTTP |
|---|---|---|
| `/marketplace` | `marketplace.html` | 200 |
| `/mint` | `mint.html` | 200 |
| `/crew` | `crew.html` | 200 |
| `/relics` | `relics.html` | 200 |

Existing routes preserved: `/gate`, `/dossier_lobby`, `/cellar`, `/codex`, `/syndicate`.

`serve-local.py` updated to preserve query strings (e.g. `/mint?category=boss`).

## Cross-app reconnections

| Source | Element | Expected local destination | Repair | HTTP |
|---|---|---|---|---|
| Gus `index.html` | F.A.M. Card link | `http://127.0.0.1:8802/crew` | `data-sc-service="muskrats"` + `ecosystem-urls.js` | 200 (via config) |
| Gus `index.html` | `openFAM()` | `http://127.0.0.1:8802/crew` | `SOVEREIGN_CITY_URLS.url('muskrats', '/crew')` | — |
| Gus `index.html` | Infinite Loop dashboard link | `http://127.0.0.1:8806/` | `data-sc-service="agenticLoop"` | 200 (via config) |
| Gus `index.html` | `openV2AdminDashboard()` | `http://127.0.0.1:8806/` | `SOVEREIGN_CITY_URLS.url('agenticLoop', '/')` | — |
| F.A.M. `index.html` | Terminal toolbar | `http://127.0.0.1:8802/syndicate` | `data-sc-service="muskrats" data-sc-path="/syndicate"` | 200 |
| F.A.M. `index.html` | Market toolbar | `http://127.0.0.1:8802/marketplace` | `data-sc-path="/marketplace"` | 200 |
| F.A.M. `index.html` | $MUSKRAT toolbar | `http://127.0.0.1:8802/mint` | `data-sc-path="/mint"` | 200 |
| F.A.M. `enhanced-index.html` | Same three toolbar links | Same | Same pattern | 200 |
| F.A.M. `nft-slot-system.js` | 9 mint category URLs | `http://127.0.0.1:8802/mint?category=*` | `mintCategory` + `getMuskratsMintUrl()` | 200 |
| IAL `index.html` | Nav + CTA (7 links) | `http://127.0.0.1:8806/*` | `data-sc-service="agenticLoop"` | 200 |
| IAL `dashboard.html` | Back to Ledger AI | `http://127.0.0.1:8801/` | `data-sc-service="gus"` | 200 |
| IAL `admin-control.html` | Back to Ledger AI | `http://127.0.0.1:8801/` | `data-sc-service="gus"` | 200 |

**Cross-app operational references changed:** 25 (4 Gus + 3 F.A.M. toolbar + 9 mint categories + 7 IAL self + 2 IAL→Gus)

## Root load verification (four apps simultaneous)

| Application | Port | Route | HTTP |
|---|---|---:|---|
| Gus | 8801 | `/index.html` | 200 |
| Muskrats | 8812* | `/index.html` | 200 |
| F.A.M. | 8804 | `/index.html` | 200 |
| Infinite Agentic Loop | 8806 | `/index.html` | 200 |

\*Port 8802 had a stale pre-reconnect `serve-local.py` process that could not be killed from the sandbox; verification ran against a fresh instance on **8812** with identical code. **Action:** restart Muskrats on 8802 locally (`kill $(lsof -ti:8802); python3 serve-local.py --port 8802`).

## Muskrats full verification

`MUSKRATS_BASE=http://127.0.0.1:8812 python3 apps/muskrats/verify-local.py` → **34/34 pages**, 99 assets checked. Known gaps unchanged: `styles.css`, `images/favicon.png` (canonical source gaps).

`python3 scripts/verify-ecosystem-reconnect.py` (with `MUSKRATS_BASE=http://127.0.0.1:8812`) → **ALL CHECKS PASSED**.

## Intentionally external (unchanged)

| Category | Examples | Reason |
|---|---|---|
| Meta / OG tags | `og:url` on Gus, `og:image` on IAL | Directive 004 — production public identity |
| CDN dependencies | Google Fonts, three.js, web3, ethers | External static assets |
| Blockchain / trading | DexScreener, Jupiter, Etherscan, Solscan | Out of ecosystem scope |
| Gus help/docs | `docs.ledger-ai.com`, `support@ledger-ai.com` | External documentation |
| Production fallbacks | `nft-slot-system.js` Netlify fallback when config absent | Non-local safety |
| Config production map | Netlify URLs inside `ecosystem-urls.js` `production` object | Production placeholders |

## Backend explicitly deferred (next phase)

| Item | Files | Notes |
|---|---|---|
| Whitelist form POST | `whitelist.html` | `localhost:3333` / Heroku — not modified |
| Contact form POST | `contact.html` | Same |
| Proposal form POST | `proposal.html` | Same |
| Backend CORS | `.env.example` | Not modified |
| Muskrats backend run | `backend-server.js` | Not wired |

## Secrets scan

- No `.env` or `credentials.json` added.
- No API keys, private keys, or new secrets in reconnect diff.
- `ecosystem-urls.js` contains only public URL maps.

## Remote baseline push

**Blocked:** `gh auth status` reports invalid keyring token (`gh auth refresh` required). Branch and tag commits exist locally but remote push did not complete during this session. Local commits ahead of origin: baseline + reconnect (see git log).

## Overall result

**Front-end graph reconnected with documented limitations**

- All Priority A/B operational navigation uses `ecosystem-urls.js` or Muskrats clean redirects.
- Meta/OG remain production-facing.
- Backend reconnect deferred.
- Remote push pending auth refresh.
- Muskrats port 8802 requires stale-process restart on host.
