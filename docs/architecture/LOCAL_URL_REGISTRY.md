# Local URL Registry — Sovereign City Front-End

Environment-aware service URLs for recovered static applications. Operational navigation uses `ecosystem-urls.js`; public metadata (OG tags, canonical URLs) stays on production domains.

## Canonical config source

| Item | Location |
|---|---|
| JavaScript config (canonical) | `docs/architecture/ecosystem-urls.js` |
| App copies | `apps/gus/ecosystem-urls.js`, `apps/fam/ecosystem-urls.js`, `apps/infinite-agentic-loop/ecosystem-urls.js` |

When updating URLs, edit the canonical file and sync copies (identical content).

## Service keys and ports

| Key | Application | Local base URL | Production base URL (placeholder) |
|---|---|---|---|
| `gus` | Ledger AI / Gus | `http://127.0.0.1:8801` | `https://ledger-ai.netlify.app` |
| `muskrats` | Muskrats.io | `http://127.0.0.1:8802` | `https://muskrats-io.netlify.app` |
| `fam` | F.A.M. Card Viewer | `http://127.0.0.1:8804` | *(no separate production deploy recorded — local only)* |
| `agenticLoop` | Infinite Agentic Loop | `http://127.0.0.1:8806` | `https://agentic-loop.netlify.app` |

## Deferred (not in front-end config)

| Service | Local URL | Status |
|---|---|---|
| Muskrats backend | `http://127.0.0.1:3333` | Backend reconnect deferred (Directive 004) |

## Environment detection

`SOVEREIGN_CITY_URLS.isLocal()` returns true when `location.hostname` is `localhost` or `127.0.0.1`.

## API

| Function / property | Purpose |
|---|---|
| `SOVEREIGN_CITY_URLS.base('muskrats')` | Base URL for service in current environment |
| `SOVEREIGN_CITY_URLS.url('muskrats', '/crew')` | Full URL with path (and query string in path arg) |
| `SOVEREIGN_CITY_URLS.applyDataLinks()` | Sets `href` on `[data-sc-service]` elements |
| `SOVEREIGN_CITY_URLS.production` | Production URL map (reference) |
| `SOVEREIGN_CITY_URLS.local` | Local URL map (reference) |

### HTML data attributes

```html
<a data-sc-service="muskrats" data-sc-path="/marketplace" href="#" target="_blank">Market</a>
```

`data-sc-path` defaults to `/` if omitted.

## Consumption by app

| App | Includes config | Uses |
|---|---|---|
| Gus | `<script src="ecosystem-urls.js">` | F.A.M. Card link, `openFAM()`, Infinite Loop dashboard link, `openV2AdminDashboard()` |
| F.A.M. | Before app scripts | Toolbar links (`data-sc-service`); `nft-slot-system.js` mint category URLs via `getMuskratsMintUrl()` |
| Infinite Agentic Loop | In each HTML page | Nav/CTA self-links; dashboard/admin back links to Gus |
| Muskrats.io | — | Clean routes via `_redirects` + `serve-local.py` only (no outbound Netlify deps in Priority A) |

## Muskrats clean routes

See `apps/muskrats/_redirects` and `serve-local.py` `CLEAN_URLS`. Required for F.A.M. toolbar paths without `.html` suffix.

## Meta / OG policy

Do **not** point `og:url`, `twitter:url`, or token metadata at localhost. Production public identity remains on `ledger-ai.netlify.app`, `muskrats.io`, and `infinite-agentic-loop.netlify.app` as recorded in source.
