# Ecosystem Reconnect Plan — Post-Muskrats Recovery Baseline

**Status:** DRAFT — for owner review. **No route changes applied.**

**Baseline tag:** `muskrats-recovery-baseline` (`f08af7e`)  
**Prepared:** 2026-07-13  
**Scope:** Identify every external URL, Netlify dependency, cross-app reference, and route that should point to the recovered local architecture. Execution is a separate approved pass.

---

## 1. Local Architecture Map (Target)

Verified local ports from recovery verification docs:

| Application | Path | Local URL | Serve command |
|---|---|---|---|
| Ledger AI / Gus | `apps/gus/` | `http://127.0.0.1:8801/` | `python3 -m http.server 8801` |
| Muskrats.io | `apps/muskrats/` | `http://127.0.0.1:8802/` | `python3 serve-local.py --port 8802` |
| F.A.M. Card Viewer | `apps/fam/` | `http://127.0.0.1:8804/` | `python3 -m http.server 8804` |
| Infinite Agentic Loop | `apps/infinite-agentic-loop/` | `http://127.0.0.1:8806/` | `python3 -m http.server 8806` |
| Muskrats backend (optional) | `apps/muskrats/backend-server.js` | `http://127.0.0.1:3333/` | `node backend-server.js` |
| IAL backend (optional, not imported) | — | `http://127.0.0.1:3002/` | Referenced in IAL source only |

### Muskrats clean URL routes (require `serve-local.py` or Netlify `_redirects`)

| Clean URL | Resolves to | Local test URL |
|---|---|---|
| `/gate` | `gate.html` | `http://127.0.0.1:8802/gate` |
| `/dossier_lobby` | `dossier_lobby.html` | `http://127.0.0.1:8802/dossier_lobby` |
| `/cellar` | `cellar.html` | `http://127.0.0.1:8802/cellar` |
| `/codex` | `codex.html` | `http://127.0.0.1:8802/codex` |
| `/syndicate` | `syndicate.html` | `http://127.0.0.1:8802/syndicate` |

F.A.M. toolbar links use clean paths (`/syndicate`, `/marketplace`, `/mint`) — these work locally only via `serve-local.py`, not plain `http.server`.

---

## 2. Cross-App References Requiring Reconnect

### Priority A — Ecosystem navigation (breaks local loop today)

#### A1. Gus → Muskrats.io

| File | Line(s) | Current URL | Proposed local target | Notes |
|---|---|---|---|---|
| `apps/gus/index.html` | 1856 | `https://muskrats-io.netlify.app/crew.html` | `http://127.0.0.1:8802/crew.html` | F.A.M. Card image link |
| `apps/gus/index.html` | 2611 | `https://muskrats-io.netlify.app/crew.html` | `http://127.0.0.1:8802/crew.html` | `window.open()` duplicate |

**Decision needed:** Hardcode localhost for dev, or use a shared config/env injection pattern for dev vs deploy?

#### A2. Gus → Infinite Agentic Loop

| File | Line(s) | Current URL | Proposed local target |
|---|---|---|---|
| `apps/gus/index.html` | 3456 | `https://agentic-loop.netlify.app/` | `http://127.0.0.1:8806/` |
| `apps/gus/index.html` | 3670 | `https://agentic-loop.netlify.app/` | `http://127.0.0.1:8806/` |

#### A3. F.A.M. → Muskrats.io (toolbar)

| File | Line(s) | Current URL | Proposed local target |
|---|---|---|---|
| `apps/fam/index.html` | 141 | `https://muskrats-io.netlify.app/syndicate` | `http://127.0.0.1:8802/syndicate` |
| `apps/fam/index.html` | 144 | `https://muskrats-io.netlify.app/marketplace` | `http://127.0.0.1:8802/marketplace.html` |
| `apps/fam/index.html` | 147 | `https://muskrats-io.netlify.app/mint` | `http://127.0.0.1:8802/mint.html` |
| `apps/fam/enhanced-index.html` | 502–508 | Same three URLs | Same local targets |

#### A4. F.A.M. → Muskrats.io (NFT slot mint URLs)

| File | Line(s) | Current pattern | Proposed local pattern |
|---|---|---|---|
| `apps/fam/nft-slot-system.js` | 11–59 | `https://muskrats-io.netlify.app/mint?category=*` (9 entries) | `http://127.0.0.1:8802/mint.html?category=*` |

Categories: `boss`, `under-boss`, `made-man`, `handler`, `contractor`, `associate`, `relics`, `duffle-bag`, `getaway-vehicles`.

#### A5. Infinite Agentic Loop → Gus (back navigation)

| File | Line(s) | Current URL | Proposed local target |
|---|---|---|---|
| `apps/infinite-agentic-loop/dashboard.html` | 180 | `https://ledger-ai.netlify.app/` | `http://127.0.0.1:8801/` |
| `apps/infinite-agentic-loop/admin-control.html` | 199 | `https://ledger-ai.netlify.app/` | `http://127.0.0.1:8801/` |

#### A6. Infinite Agentic Loop internal (self-references to Netlify)

| File | Line(s) | Current URL | Proposed local target |
|---|---|---|---|
| `apps/infinite-agentic-loop/index.html` | 504–508, 553, 556 | `https://agentic-loop.netlify.app/...` | `http://127.0.0.1:8806/...` |

Also update OG meta at line 13: `https://infinite-agentic-loop.netlify.app/images/og-image.png` (image may be missing — see `NOT_IMPORTED_ASSETS.md`).

---

### Priority B — Muskrats internal (already local; verify clean URL compatibility)

These are **already relative/local** — no Netlify dependency. Reconnect pass should **verify** they work under `serve-local.py`:

| Source | Route style | Target | Action |
|---|---|---|---|
| `poster.html` Gameplay dropdown | Root-relative clean URLs | `/gate`, `/dossier_lobby`, `/cellar`, `/codex`, `/syndicate` | Verify only — `_redirects` + `serve-local.py` handle these |
| `unified-footer.js` | Relative `.html` | `crew.html`, `poster.html`, `marketplace.html`, etc. | Verify only |
| `dossier_made.html` | Root-relative | `/relics.html`, `/dossier_lobby.html` | Verify only |

**Note:** F.A.M. links use `/marketplace` and `/mint` without `.html`. Muskrats `_redirects` does **not** currently map these — either add redirects or update F.A.M. targets to `marketplace.html` / `mint.html`.

**Proposed `_redirects` additions (review):**

```
/marketplace /marketplace.html 200
/mint /mint.html 200
/relics /relics.html 200
/crew /crew.html 200
```

---

### Priority C — Muskrats backend API (forms)

| File | Dev URL | Prod URL (historical) | Proposed local |
|---|---|---|---|
| `whitelist.html` | `http://localhost:3333` | `https://muskrats-backend.herokuapp.com` | Keep localhost branch; wire to local `backend-server.js` when running |
| `contact.html` | same | same | same |
| `proposal.html` | same | same | same |

**Action:** No URL change needed for local dev path. Reconnect pass should document how to start backend and confirm form POST endpoints. Production reconnect is out of scope until deploy target chosen (Render/Railway/Heroku per setup docs).

**Backend env:** `.env.example` sets `CORS_ORIGIN=https://muskrats.io` — update to `http://127.0.0.1:8802` for local CORS when testing forms.

---

### Priority D — Metadata / OG tags (cosmetic, not navigation)

| File | Field | Current | Proposed local (optional) |
|---|---|---|---|
| `apps/gus/index.html` | og:url, twitter:url | `https://ledger-ai.netlify.app/` | `http://127.0.0.1:8801/` (dev only) |
| `apps/muskrats/index.html` | og:url | `https://muskrats.io` | Keep production domain or add dev override |
| `apps/muskrats/muskrat-token-metadata.json` | external_url | `https://muskrats.io` | Production metadata — do not change for local |
| `apps/muskrats/backend-server.js` | email template link | `https://muskrats.io` | Production only |

**Recommendation:** Leave production metadata unchanged until deploy. Only reconnect **navigation** URLs in Priority A.

---

### Priority E — External services (out of scope for local reconnect)

These should **remain external** — do not point to localhost:

| Service | URLs found in | Purpose |
|---|---|---|
| DexScreener / Jupiter / CoinGecko | `mint.html`, `alpha.html` | Token trading charts |
| Etherscan / Solscan | `unified-footer.js`, `footer.html` | On-chain explorers |
| MetaMask / Phantom install | `poster.html`, `presale.html` | Wallet onboarding |
| Google Fonts / CDN (three.js, web3, ethers) | Multiple apps | Static CDN dependencies |
| ElevenLabs API | `apps/gus/index.html:2208` | Voice TTS (requires API key) |
| `docs.ledger-ai.com` | `apps/gus/index.html:4240` | External documentation |
| `support@ledger-ai.com` | `apps/gus/index.html:4248` | Support email |
| Glassnode | `apps/gus/index.html:4310` | External API signup |

---

### Priority F — Planned but not wired (document only)

| Reference | Location | Status |
|---|---|---|
| Muskrats → Ledger AI return path | `LEDGER_AI_INTEGRATION_PLAN.md` | Planning doc only; no live HTML link found |
| `ledger-ai-bridge.html` | Same plan doc | Not imported / not built |
| IAL `API_BASE` production fallback | `infinite-agentic-loop/index.html:622` | `https://your-backend-url.com` placeholder |
| Ledger AI V2 backend | `source/canonical/AI_APP/ledger-ai-v2/` | Not promoted to `apps/` |

---

## 3. Netlify Dependency Inventory

Historical Netlify sites referenced across recovered apps:

| Netlify domain | Referenced by | Local replacement |
|---|---|---|
| `muskrats-io.netlify.app` | Gus (2), F.A.M. (15+) | `127.0.0.1:8802` |
| `agentic-loop.netlify.app` | Gus (2), IAL self (7+) | `127.0.0.1:8806` |
| `ledger-ai.netlify.app` | Gus meta (2), IAL back buttons (2) | `127.0.0.1:8801` |
| `infinite-agentic-loop.netlify.app` | IAL OG image meta (1) | `127.0.0.1:8806/images/...` (if image imported) |

Deploy artifacts already in repo:

| App | Deploy config | Clean URL support |
|---|---|---|
| Muskrats | `apps/muskrats/_redirects` | 5 routes |
| Infinite Agentic Loop | `apps/infinite-agentic-loop/netlify.toml` | `/dashboard`, `/admin` |
| Gus | `apps/gus/netlify.toml` (if present) | Verify |
| F.A.M. | None found | Plain static |

---

## 4. Missing Assets Affecting Reconnect UX

These do not block reconnect but affect visual completeness:

| App | Missing asset | Impact |
|---|---|---|
| Gus | 4× `ledger_ai/*.png` (1–6 MB) | F.A.M. Card image broken in Gus UI |
| Muskrats | `styles.css`, `images/favicon.png` | Mint page styling/favicon |
| Infinite Agentic Loop | `images/logo.png`, `images/og-image.png`, 4× `images/ledger_ai/*` | Branding/OG |
| F.A.M. | None (all 15 assets verified) | — |

**Reconnect note:** Gus → Muskrats link uses Netlify even when Gus F.A.M. card image is broken locally. Reconnecting URLs fixes navigation; image import is separate.

---

## 5. Recommended Reconnect Execution Order

Execute only after owner approval of this plan.

### Phase 1 — Config foundation (preferred over hardcoded localhost)

1. Create `docs/architecture/LOCAL_URL_REGISTRY.md` (or shared `ecosystem-urls.json`) with dev/prod URL pairs.
2. Decide pattern: central config file vs per-app env vs build-time injection.

### Phase 2 — Cross-app navigation (Priority A)

1. Gus → Muskrats + IAL (4 URL replacements)
2. F.A.M. toolbar + nft-slot-system.js (12 URL replacements)
3. IAL → Gus back buttons + self-references (9 URL replacements)

### Phase 3 — Muskrats route compatibility (Priority B)

1. Add `_redirects` entries for `/marketplace`, `/mint`, `/crew`, `/relics` if F.A.M. clean URLs are kept.
2. Re-run `verify-local.py`; manually test F.A.M. toolbar from `http://127.0.0.1:8804/`.

### Phase 4 — Backend wiring (Priority C, optional)

1. Start `backend-server.js` on 3333 with local `.env`.
2. Test whitelist/contact/proposal form POST locally.
3. Update `CORS_ORIGIN` for local dev.

### Phase 5 — End-to-end verification

Walk the full ecosystem loop locally:

```
Gus (8801) → F.A.M. Card → Muskrats crew (8802)
  → poster → gameplay routes → marketplace → vaults
F.A.M. (8804) → toolbar → Muskrats syndicate/marketplace/mint
Gus (8801) → Infinite Loop (8806) → back to Gus (8801)
```

Update `docs/architecture/CONNECTION_REGISTRY.md` after each verified reconnection.

---

## 6. Files Requiring Edits (Summary)

| File | URL count | Priority |
|---|---|---|
| `apps/gus/index.html` | 4 navigation + 2 meta | A |
| `apps/fam/index.html` | 3 | A |
| `apps/fam/enhanced-index.html` | 3 | A |
| `apps/fam/nft-slot-system.js` | 9 | A |
| `apps/infinite-agentic-loop/index.html` | 7+ | A |
| `apps/infinite-agentic-loop/dashboard.html` | 1 | A |
| `apps/infinite-agentic-loop/admin-control.html` | 1 | A |
| `apps/muskrats/_redirects` | 0 (additions proposed) | B |
| `apps/muskrats/.env.example` | 1 (CORS) | C |
| `apps/gus/README.md` | 2 (documentation) | D |

**Total navigation URL replacements:** ~28 (excluding meta/docs/external services).

---

## 7. Out of Scope (This Reconnect Pass)

- Production deploy to Netlify/Hostinger/VPS
- Replacing historical Netlify URLs in committed docs/README/handoff files
- Importing Ledger AI V2 backend or wiring IAL `API_BASE`
- Importing missing large assets (Gus F.A.M. card images, IAL OG images)
- Building `ledger-ai-bridge.html` from integration plan
- Re-pointing `muskrats.io` production DNS

---

## 8. Approval Checklist

Before executing reconnect:

- [ ] Owner confirms local port map (8801/8802/8804/8806/3333)
- [ ] Owner chooses URL strategy: hardcoded localhost vs shared config vs env injection
- [ ] Owner confirms F.A.M. clean URL approach: extend `_redirects` vs use `.html` paths in F.A.M.
- [ ] Owner confirms meta/OG tags stay on production domains during local dev
- [ ] Owner confirms backend reconnect is in or out of first reconnect pass

**No changes have been made.** Awaiting approval to proceed with Phase 1.
