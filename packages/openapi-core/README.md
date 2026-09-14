# @consentrail/openapi-core

OpenAPI contracts for **Consentrail**: shared `common/` plus **identity** and product domains (one YAML per domain).

**Rule:** After routine YAML edits, regenerate **core only** and handwrite lower layers. New domains may use full multi-layer generate (Mode A).

## Domains

| API | Entry | Role |
| ----- | ----- | ----- |
| `identity` | `src/identity.yaml` | Tenant API keys + operator auth |
| `consents` | `src/consents.yaml` | Consent, withdraw, processing-stop, owner-mediation |
| `rights` | `src/rights.yaml` | Data-subject rights cases |
| `security-events` | `src/security-events.yaml` | Security-of-processing log |
| `obligations` | `src/obligations.yaml` | Obligation contracts and alerts |
| `evidence` | `src/evidence.yaml` | Hashes and integrity proofs |
| `regulator-views` | `src/regulator-views.yaml` | Supervisor evidence views |
| `consortium-roles` | `src/consortium-roles.yaml` | Controller / processor / DPO |
| `counsel-gates` | `src/counsel-gates.yaml` | Erasure counsel gates |
| `triple-blind-exchange` | `src/triple-blind-exchange.yaml` | Triple-blind policies |

Shared fragments live under `src/common/`.

## Commands

```bash
pnpm lint:domains
pnpm bundle:domains
```
