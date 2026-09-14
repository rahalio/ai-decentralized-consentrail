/**
 * TripleBlindPolicyRepositoryDdb - sandbox implementation for local Consentrail.
 */
import type { TripleBlindPolicyRepository } from "@consentrail/services/triple-blind-exchange";
import { id, listOf, one, store } from "../_shared/product-sandbox.js";

export class TripleBlindPolicyRepositoryDdb implements TripleBlindPolicyRepository {
  constructor(private readonly dynamoClient: any) {}

  async listTripleBlindPolicies(input: any) {
    return listOf(store.tripleBlind, input?.correlationId) as any;
  }
  async createTripleBlindPolicy(input: any) {
    const entityId = String(input?.id ?? input?.consentId ?? input?.caseId ?? input?.eventId ?? input?.contractId ?? input?.hashId ?? input?.proofId ?? input?.viewId ?? input?.roleId ?? input?.gateId ?? input?.policyId ?? input?.grantId ?? input?.alertId ?? id("rec"));
    const existing = store.tripleBlind.get(entityId) ?? { id: entityId };
    const updated = { ...existing, ...input, id: entityId, updatedAt: new Date().toISOString(), createdAt: (existing as any).createdAt ?? new Date().toISOString() };
    store.tripleBlind.set(entityId, updated);
    return one(updated, input?.correlationId) as any;
  }
  async getTripleBlindPolicy(input: any) {
    const id = String(input?.id ?? input?.consentId ?? input?.caseId ?? input?.eventId ?? input?.contractId ?? input?.hashId ?? input?.proofId ?? input?.viewId ?? input?.roleId ?? input?.gateId ?? input?.policyId ?? input?.grantId ?? input?.alertId ?? "");
    return one(store.tripleBlind.get(id), input?.correlationId) as any;
  }
}
