/**
 * OwnerMediationGrantRepositoryDdb - sandbox implementation for local Consentrail.
 */
import type { OwnerMediationGrantRepository } from "@consentrail/services/consents";
import { id, listOf, one, store } from "../_shared/product-sandbox.js";

export class OwnerMediationGrantRepositoryDdb implements OwnerMediationGrantRepository {
  constructor(private readonly dynamoClient: any) {}

  async listOwnerMediationGrants(input: any) {
    return listOf(store.grants, input?.correlationId) as any;
  }
  async requestOwnerMediationGrant(input: any) {
    const entityId = String(input?.id ?? input?.consentId ?? input?.caseId ?? input?.eventId ?? input?.contractId ?? input?.hashId ?? input?.proofId ?? input?.viewId ?? input?.roleId ?? input?.gateId ?? input?.policyId ?? input?.grantId ?? input?.alertId ?? id("rec"));
    const existing = store.grants.get(entityId) ?? { id: entityId };
    const updated = { ...existing, ...input, id: entityId, updatedAt: new Date().toISOString(), createdAt: (existing as any).createdAt ?? new Date().toISOString() };
    store.grants.set(entityId, updated);
    return one(updated, input?.correlationId) as any;
  }
  async getOwnerMediationGrant(input: any) {
    const id = String(input?.id ?? input?.consentId ?? input?.caseId ?? input?.eventId ?? input?.contractId ?? input?.hashId ?? input?.proofId ?? input?.viewId ?? input?.roleId ?? input?.gateId ?? input?.policyId ?? input?.grantId ?? input?.alertId ?? "");
    return one(store.grants.get(id), input?.correlationId) as any;
  }
}
