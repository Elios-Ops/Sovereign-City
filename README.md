# Sovereign City

The canonical engineering repository for the Sovereign City ecosystem.

This repository is **not** the ELIOS repository. ELIOS is a separate, newer project — do not merge those identities.

## Purpose

Sovereign City is the permanent engineering home for a distributed ecosystem of standalone applications recovered from earlier development history. The mission is to **recover, reconnect, verify, and deploy** the original ecosystem before any modernization or redesign takes place.

## Guiding Philosophy

1. **Recover** the original applications faithfully.
2. **Reconnect** the navigation and integrations between them.
3. **Verify** that recovered applications actually run.
4. **Modernize** only after the recovered ecosystem is operational.

Do not redesign. Do not modernize prematurely.

## Architecture

One repository. Multiple independent applications.

This repository is **not** a single monolithic application. Recovered evidence indicates the ecosystem consisted primarily of standalone HTML/JavaScript applications deployed independently and connected through navigation (links, `window.open()`, external URLs). Those boundaries are preserved — see `docs/decisions/ADR-0001-recovery-before-modernization.md`.

## Recovered / Canonical Applications

| Name | Meaning |
|---|---|
| Gus | Future assistant identity (historically stored as Ledger AI) |
| Ledger AI | Historical application name, preserved for recovery purposes |
| Muskrats.io | Canonical application/property |
| The Sewer | Internal world/location associated with Muskrats |
| F.A.M. | Canonical system/community |
| GPK | Canonical Gutter Punk Kids property |
| Infinite Agentic Loop | Canonical standalone application |
| Maya | Voice / conversational interface |
| Hermes | Infrastructure / deployment identity |
| Metatron | Operating layer concept |
| ELIOS | Separate newer project (not part of this repository) |

See `docs/canon/NAMING_AND_CANON.md` for the full canonical naming reference.

## Repository Organization

```text
apps/            verified, active applications (promoted from recovered/)
recovered/       preserved original recovered source, unmodified, historical names
services/        backend/routing/orchestration services
infrastructure/  deployment targets and operational scripts
archive/         superseded builds, rejected sources, historical manifests
docs/            living engineering documentation (recovery, canon, architecture, deployment, decisions, trading, directives)
source/          canonical imported source trees (see docs/recovery/CANONICAL_SOURCE_MAP.md)
scripts/         repository verification and inventory tooling
```

## Status

**Current Phase:** Recovery Sprint 02

**Repository Status:** Foundation

**Deployment Status:** Not Deployed

**Canonical Imports:** Pending

## Gus Transition

The historical application "Ledger AI" is transitioning toward a future identity, "Gus." Historical naming is preserved in recovered source and documentation. No mass rename occurs until the recovered application is verified and running.

## Recovery Philosophy

Recover first. Reconnect second. Verify third. Modernize only after the recovered ecosystem is operational. See `docs/decisions/ADR-0001-recovery-before-modernization.md`.
