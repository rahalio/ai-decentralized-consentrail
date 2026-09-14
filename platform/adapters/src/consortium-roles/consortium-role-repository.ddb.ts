/**
 * ConsortiumRoleRepositoryDdb - sandbox implementation for local Consentrail.
 */
import type { ConsortiumRoleRepository } from "@consentrail/services/consortium-roles";
import { id, listOf, one, store } from "../_shared/product-sandbox.js";

export class ConsortiumRoleRepositoryDdb implements ConsortiumRoleRepository {
  constructor(private readonly dynamoClient: any) {}

  async listConsortiumRoles(input: any) {
    return listOf(store.roles, input?.correlationId) as any;
  }
  async assignConsortiumRole(input: any) {
    const entityId = String(input?.id ?? input?.consentId ?? input?.caseId ?? input?.eventId ?? input?.contractId ?? input?.hashId ?? input?.proofId ?? input?.viewId ?? input?.roleId ?? input?.gateId ?? input?.policyId ?? input?.grantId ?? input?.alertId ?? id("rec"));
    const existing = store.roles.get(entityId) ?? { id: entityId };
    const updated = { ...existing, ...input, id: entityId, updatedAt: new Date().toISOString(), createdAt: (existing as any).createdAt ?? new Date().toISOString() };
    store.roles.set(entityId, updated);
    return one(updated, input?.correlationId) as any;
  }
  async getConsortiumRole(input: any) {
    const id = String(input?.id ?? input?.consentId ?? input?.caseId ?? input?.eventId ?? input?.contractId ?? input?.hashId ?? input?.proofId ?? input?.viewId ?? input?.roleId ?? input?.gateId ?? input?.policyId ?? input?.grantId ?? input?.alertId ?? "");
    return one(store.roles.get(id), input?.correlationId) as any;
  }
}
