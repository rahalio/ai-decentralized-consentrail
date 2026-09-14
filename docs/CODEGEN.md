# Codegen guide (Consentrail)

## Modes

| Mode | When | Action |
|------|------|--------|
| **A — New domain** | First time a domain YAML has no layers | Full multi-layer `generate --domain X` |
| **B — YAML edit** | Domain already scaffolded | Bundle → `--layers core` → handwrite platform |

## Commands

```bash
pnpm codegen:paths
pnpm lint:openapi
pnpm bundle:openapi
pnpm codegen:core
pnpm codegen:all          # Mode A for enabled domains (use carefully)
```

Config: `.codegen/.zero-codegen-merged.json` (local-only — never commit; see `consentrail-codegen-guard` skill)  
Tool: `PYTHONPATH=.codegen/codegen/src python3 -m zero_codegen.cli.main`

## Domains

`identity` (shared auth) plus product domains under `packages/openapi-core/src/`: consents, rights, security-events, obligations, evidence, regulator-views, consortium-roles, counsel-gates, triple-blind-exchange.

## After Mode A

Hand-fit api-server DI (`*-ddd.dependencies.ts`) so POST handlers call `useCases.*.create`, not `get`. Sandbox product adapters live under `platform/adapters/src/_shared/product-sandbox.ts`.

## Related skills

- `ddd-platform`, `ddd-codegen`, `ddd-identity`, `consentrail-codegen-guard`
