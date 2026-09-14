/**
 * DenyRepositoryDdb - sandbox implementation for local Consentrail.
 */
import type { DenyRepository } from "@consentrail/services/consents";
import { id, listOf, one, store } from "../_shared/product-sandbox.js";

export class DenyRepositoryDdb implements DenyRepository {
  constructor(private readonly dynamoClient: any) {}

  async denyOwnerMediationGrant(input: any) {
    const entityId = String(input?.id ?? input?.consentId ?? input?.caseId ?? input?.eventId ?? input?.contractId ?? input?.hashId ?? input?.proofId ?? input?.viewId ?? input?.roleId ?? input?.gateId ?? input?.policyId ?? input?.grantId ?? input?.alertId ?? id("rec"));
    const existing = store.consents.get(entityId) ?? { id: entityId };
    const updated = { ...existing, ...input, id: entityId, updatedAt: new Date().toISOString(), createdAt: (existing as any).createdAt ?? new Date().toISOString() };
    store.consents.set(entityId, updated);
    return one(updated, input?.correlationId) as any;
  }
}
