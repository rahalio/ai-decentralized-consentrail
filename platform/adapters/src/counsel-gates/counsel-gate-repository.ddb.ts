/**
 * CounselGateRepositoryDdb - sandbox implementation for local Consentrail.
 */
import type { CounselGateRepository } from "@consentrail/services/counsel-gates";
import { id, listOf, one, store } from "../_shared/product-sandbox.js";

export class CounselGateRepositoryDdb implements CounselGateRepository {
  constructor(private readonly dynamoClient: any) {}

  async listCounselGates(input: any) {
    return listOf(store.counselGates, input?.correlationId) as any;
  }
  async openCounselGate(input: any) {
    const entityId = String(input?.id ?? input?.consentId ?? input?.caseId ?? input?.eventId ?? input?.contractId ?? input?.hashId ?? input?.proofId ?? input?.viewId ?? input?.roleId ?? input?.gateId ?? input?.policyId ?? input?.grantId ?? input?.alertId ?? id("rec"));
    const existing = store.counselGates.get(entityId) ?? { id: entityId };
    const updated = { ...existing, ...input, id: entityId, updatedAt: new Date().toISOString(), createdAt: (existing as any).createdAt ?? new Date().toISOString() };
    store.counselGates.set(entityId, updated);
    return one(updated, input?.correlationId) as any;
  }
  async getCounselGate(input: any) {
    const id = String(input?.id ?? input?.consentId ?? input?.caseId ?? input?.eventId ?? input?.contractId ?? input?.hashId ?? input?.proofId ?? input?.viewId ?? input?.roleId ?? input?.gateId ?? input?.policyId ?? input?.grantId ?? input?.alertId ?? "");
    return one(store.counselGates.get(id), input?.correlationId) as any;
  }
}
