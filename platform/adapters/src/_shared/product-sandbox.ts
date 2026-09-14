/**
 * In-memory product sandbox for local Consentrail demos (no Dynamo required).
 */

import { ulid } from 'ulid';

export function nowIso() {
  return new Date().toISOString();
}

export function meta(correlationId?: string) {
  return { meta: { correlationId, generatedAt: nowIso(), requestId: correlationId } };
}

function id(prefix: string) {
  return `${prefix}_${ulid().toLowerCase()}`;
}

export const store = {
  consents: new Map<string, Record<string, unknown>>(),
  grants: new Map<string, Record<string, unknown>>(),
  rights: new Map<string, Record<string, unknown>>(),
  securityEvents: new Map<string, Record<string, unknown>>(),
  obligations: new Map<string, Record<string, unknown>>(),
  alerts: new Map<string, Record<string, unknown>>(),
  hashes: new Map<string, Record<string, unknown>>(),
  proofs: new Map<string, Record<string, unknown>>(),
  regulatorViews: new Map<string, Record<string, unknown>>(),
  roles: new Map<string, Record<string, unknown>>(),
  counselGates: new Map<string, Record<string, unknown>>(),
  tripleBlind: new Map<string, Record<string, unknown>>(),
};

export function listOf(map: Map<string, Record<string, unknown>>, correlationId?: string) {
  return { data: { items: [...map.values()] }, ...meta(correlationId) };
}

export function one(entity: Record<string, unknown> | undefined, correlationId?: string) {
  if (!entity) return null;
  return { data: entity, ...meta(correlationId) };
}

export function createConsent(input: Record<string, unknown>, correlationId?: string) {
  const entity = {
    id: id('cns'),
    subjectRef: String(input.subjectRef ?? ''),
    purpose: String(input.purpose ?? ''),
    explicit: Boolean(input.explicit),
    freelyGiven: input.freelyGiven !== false,
    informed: input.informed !== false,
    unambiguous: input.unambiguous !== false,
    ownerMediated: Boolean(input.ownerMediated),
    status: 'active',
    processingStop: false,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  store.consents.set(entity.id, entity);
  return one(entity, correlationId);
}

export function withdrawConsent(consentId: string, correlationId?: string) {
  const c = store.consents.get(consentId);
  if (!c) return null;
  const updated = { ...c, status: 'withdrawn', processingStop: true, updatedAt: nowIso() };
  store.consents.set(consentId, updated);
  return one(updated, correlationId);
}

export { id };
