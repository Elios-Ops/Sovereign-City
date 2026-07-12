# SOVEREIGN CITY — DIRECTIVE 002
## Canonical Source Import and Working Baseline
### Version 1.0
### Status: EXECUTED
### Executor: Claude Code

---

# Mission

Populate the new `Sovereign-City` GitHub repository with the actual recovered project source and establish the first working engineering baseline.

This is **not an archaeology task**.

The source has already been found.

Do not search old laptops, obsolete ZIP files, historical Netlify iterations, chat exports, or superseded folders unless a specific required file is later proven missing.

We know what the system is.

We know which source folders contain it.

The task now is to assemble the recovered applications in the correct order, preserve them in Git, run them, and reconnect them.

---

# Canonical Source Set

The authoritative recovered source is:

1. `AI_APP`, nested inside the folder `AI_APP_EXTRACTED`
2. `AI_APP_V2_EXTRACTED`

These contain the latest project files preserved from the M4 Max MacBook Pro.

Together, they are the source set for: the application historically called Ledger AI, the future Gus application, Muskrats.io, The Sewer, F.A.M., Infinite Agentic Loop, dashboards, Agent Router, Production Orchestrator, Two Prompts Engine, MCP components, n8n workflows, trading components, Pine Script assets, and related services and supporting files.

Do not call the first source `V1`. Its name is `AI_APP`. Version naming begins only with the later source, `AI_APP_V2_EXTRACTED`. Preserve those names exactly in source records.

---

# Source Authority Rule

Use the following hierarchy:

1. `AI_APP` inside `AI_APP_EXTRACTED`
2. `AI_APP_V2_EXTRACTED`
3. Older archives only if a specific required artifact is confirmed missing from both canonical sources

Do not perform broad historical comparison work. Do not inspect every old ZIP. Do not attempt to recreate Muskrats.io or Gus from scratch.

---

# Repository

Target repository: `Sovereign-City`. Not the ELIOS repository.

---

# Architecture Rule

One repository containing multiple independently deployable applications. Preserve application boundaries. Do not create a monolithic frontend. Do not invent shared authentication or a unified router.

---

# Immediate Objective

1. Both canonical source trees are represented in Git without dependency noise or secrets.
2. Every major application has a documented source location.
3. The latest usable source for Muskrats.io and the historical Ledger AI/Gus application is identified.
4. At least Muskrats.io and the historical Ledger AI/Gus application are launched locally without redesign.
5. Existing navigation between them is traced.
6. The repository contains a verified baseline commit.
7. Mini Hermes receives a complete current-state report after the work is finished.

---

# Execution Note (this session)

This directive was executed with the following material environment difference from its authored assumptions:

The directive assumes local filesystem access to the canonical source (referred to as being on "the M4 Max MacBook Pro" / an "iCloud Sovereign-City folder"). The executing session (Claude Code running in a remote, ephemeral cloud container) had **no local filesystem access to that machine or to iCloud**. A full filesystem search of the container confirmed no `AI_APP`, `AI_APP_EXTRACTED`, `AI_APP_V2_EXTRACTED`, or iCloud-mounted path existed anywhere on disk.

The canonical source was instead located in the Google Drive account connected to this session (`codydewitt13@gmail.com`), under Drive folders titled `Ai_APP_EXTRACTED` (containing `Ai_APP`) and `Ai_APP_V2_EXTRACTED` (containing two candidate `Ai_APP_V2` folders). All import work in this session was performed against those Drive folders via the Google Drive connector, not via local rsync as the directive's example commands assume.

See `docs/recovery/CANONICAL_SOURCE_MAP.md` and the completion report delivered at the end of this session for exact paths, selection results, and verification status.
