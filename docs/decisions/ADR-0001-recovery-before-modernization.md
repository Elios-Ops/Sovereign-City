# ADR-0001: Recovery Before Modernization

## Status

Accepted

## Context

Recovered evidence demonstrates that the Sovereign City ecosystem was a distributed set of standalone applications (Ledger AI, Muskrats.io, Infinite Agentic Loop, F.A.M., dashboards, MCP tooling) deployed independently and connected through simple navigation — links, `window.open()`, and external deployment URLs.

## Decision

Preserve recovered standalone application boundaries. Recover, reconnect, and verify the original ecosystem before any modernization, redesign, or architectural consolidation takes place.

## Consequences

- No premature monolithic architecture.
- No speculative shared authentication.
- No speculative routing.
- No forced repository restructuring.
- Modernization work is deferred until the recovered ecosystem is operational and verified.
