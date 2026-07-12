# source/canonical

Safe, preserved copies of the two canonical recovered source trees, imported per `docs/directives/DIRECTIVE_002_CANONICAL_SOURCE_IMPORT.md`:

- `AI_APP/` — the original canonical source, nested inside the historical `AI_APP_EXTRACTED` container. Do not rename to `V1`.
- `AI_APP_V2_EXTRACTED/` — the later canonical source set.

These are preserved, unmodified copies (excluding dependency noise, secrets, and archives per the directive's exclusion list). Do not edit files here directly — promote verified working candidates to `apps/` instead. See `docs/recovery/CANONICAL_SOURCE_MAP.md` for the mapping from each application to its exact source path.
