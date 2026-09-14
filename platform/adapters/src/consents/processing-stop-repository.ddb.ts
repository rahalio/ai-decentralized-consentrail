/**
 * ProcessingStopRepositoryDdb - sandbox implementation for local Consentrail.
 */
import type { ProcessingStopRepository } from '@consentrail/services/consents';
import { meta, nowIso, store } from '../_shared/product-sandbox.js';

function stopState(consentId: string) {
  const c = store.consents.get(consentId);
  return {
    consentId,
    processingStop: Boolean(c?.processingStop),
    members: [
      { memberId: 'mem_kyc', acknowledged: Boolean(c?.processingStop), acknowledgedAt: c?.processingStop ? nowIso() : undefined },
      { memberId: 'mem_ehr', acknowledged: false, lastError: c?.processingStop ? 'pending push' : undefined },
    ],
  };
}

export class ProcessingStopRepositoryDdb implements ProcessingStopRepository {
  constructor(private readonly dynamoClient: any) {}

  async getProcessingStopState(input: any) {
    const consentId = String(input?.consentId ?? input?.id ?? '');
    return { data: stopState(consentId), ...meta(input?.correlationId) } as any;
  }

  async retryProcessingStopPush(input: any) {
    const consentId = String(input?.consentId ?? input?.id ?? '');
    const state = stopState(consentId);
    state.members = state.members.map((m) => ({
      ...m,
      acknowledged: true,
      acknowledgedAt: nowIso(),
      lastError: undefined,
    }));
    return { data: state, ...meta(input?.correlationId) } as any;
  }
}
