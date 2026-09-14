/**
 * IntegrityProofRepositoryDdb - sandbox implementation for local Consentrail.
 */
import type { IntegrityProofRepository } from "@consentrail/services/evidence";
import { id, listOf, one, store } from "../_shared/product-sandbox.js";

export class IntegrityProofRepositoryDdb implements IntegrityProofRepository {
  constructor(private readonly dynamoClient: any) {}

  async listIntegrityProofs(input: any) {
    return listOf(store.proofs, input?.correlationId) as any;
  }
  async issueIntegrityProof(input: any) {
    const entityId = String(input?.id ?? input?.consentId ?? input?.caseId ?? input?.eventId ?? input?.contractId ?? input?.hashId ?? input?.proofId ?? input?.viewId ?? input?.roleId ?? input?.gateId ?? input?.policyId ?? input?.grantId ?? input?.alertId ?? id("rec"));
    const existing = store.proofs.get(entityId) ?? { id: entityId };
    const updated = { ...existing, ...input, id: entityId, updatedAt: new Date().toISOString(), createdAt: (existing as any).createdAt ?? new Date().toISOString() };
    store.proofs.set(entityId, updated);
    return one(updated, input?.correlationId) as any;
  }
  async getIntegrityProof(input: any) {
    const id = String(input?.id ?? input?.consentId ?? input?.caseId ?? input?.eventId ?? input?.contractId ?? input?.hashId ?? input?.proofId ?? input?.viewId ?? input?.roleId ?? input?.gateId ?? input?.policyId ?? input?.grantId ?? input?.alertId ?? "");
    return one(store.proofs.get(id), input?.correlationId) as any;
  }
}
