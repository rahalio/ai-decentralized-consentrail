/**
 * WithdrawRepositoryDdb - sandbox implementation for local Consentrail.
 */
import type { WithdrawRepository } from '@consentrail/services/consents';
import { withdrawConsent } from '../_shared/product-sandbox.js';

export class WithdrawRepositoryDdb implements WithdrawRepository {
  constructor(private readonly dynamoClient: any) {}

  async withdrawConsent(input: any) {
    const consentId = String(input?.consentId ?? input?.id ?? '');
    return withdrawConsent(consentId, input?.correlationId) as any;
  }
}
