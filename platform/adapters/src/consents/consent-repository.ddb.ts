/**
 * ConsentRepository - sandbox implementation for local Consentrail.
 */
import type { ConsentRepository } from "@consentrail/services/consents";
import { createConsent, listOf, one, store, withdrawConsent } from "../_shared/product-sandbox.js";

export class ConsentRepositoryDdb implements ConsentRepository {
  constructor(private readonly dynamoClient: any) {}

  async listConsentRecords(input: any) {
    return listOf(store.consents, input?.correlationId) as any;
  }
  async captureConsent(input: any) {
    return createConsent(input ?? {}, input?.correlationId) as any;
  }
  async getConsentRecord(input: any) {
    return one(store.consents.get(String(input?.consentId ?? input?.id)), input?.correlationId) as any;
  }
}
