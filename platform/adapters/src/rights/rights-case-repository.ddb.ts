/**
 * RightsCaseRepositoryDdb - sandbox implementation for local Consentrail.
 */
import type { RightsCaseRepository } from "@consentrail/services/rights";
import { id, listOf, one, store } from "../_shared/product-sandbox.js";

export class RightsCaseRepositoryDdb implements RightsCaseRepository {
  constructor(private readonly dynamoClient: any) {}

  async listRightsCases(input: any) {
    return listOf(store.rights, input?.correlationId) as any;
  }
  async openRightsCase(input: any) {
    const entityId = String(input?.id ?? input?.consentId ?? input?.caseId ?? input?.eventId ?? input?.contractId ?? input?.hashId ?? input?.proofId ?? input?.viewId ?? input?.roleId ?? input?.gateId ?? input?.policyId ?? input?.grantId ?? input?.alertId ?? id("rec"));
    const existing = store.rights.get(entityId) ?? { id: entityId };
    const updated = { ...existing, ...input, id: entityId, updatedAt: new Date().toISOString(), createdAt: (existing as any).createdAt ?? new Date().toISOString() };
    store.rights.set(entityId, updated);
    return one(updated, input?.correlationId) as any;
  }
  async getRightsCase(input: any) {
    const id = String(input?.id ?? input?.consentId ?? input?.caseId ?? input?.eventId ?? input?.contractId ?? input?.hashId ?? input?.proofId ?? input?.viewId ?? input?.roleId ?? input?.gateId ?? input?.policyId ?? input?.grantId ?? input?.alertId ?? "");
    return one(store.rights.get(id), input?.correlationId) as any;
  }
}
