/**
 * HashRepositoryDdb - sandbox implementation for local Consentrail.
 */
import type { HashRepository } from "@consentrail/services/evidence";
import { id, listOf, one, store } from "../_shared/product-sandbox.js";

export class HashRepositoryDdb implements HashRepository {
  constructor(private readonly dynamoClient: any) {}

  async listEvidenceHashes(input: any) {
    return listOf(store.hashes, input?.correlationId) as any;
  }
  async registerEvidenceHash(input: any) {
    const entityId = String(input?.id ?? input?.consentId ?? input?.caseId ?? input?.eventId ?? input?.contractId ?? input?.hashId ?? input?.proofId ?? input?.viewId ?? input?.roleId ?? input?.gateId ?? input?.policyId ?? input?.grantId ?? input?.alertId ?? id("rec"));
    const existing = store.hashes.get(entityId) ?? { id: entityId };
    const updated = { ...existing, ...input, id: entityId, updatedAt: new Date().toISOString(), createdAt: (existing as any).createdAt ?? new Date().toISOString() };
    store.hashes.set(entityId, updated);
    return one(updated, input?.correlationId) as any;
  }
  async getEvidenceHash(input: any) {
    const id = String(input?.id ?? input?.consentId ?? input?.caseId ?? input?.eventId ?? input?.contractId ?? input?.hashId ?? input?.proofId ?? input?.viewId ?? input?.roleId ?? input?.gateId ?? input?.policyId ?? input?.grantId ?? input?.alertId ?? "");
    return one(store.hashes.get(id), input?.correlationId) as any;
  }
}
