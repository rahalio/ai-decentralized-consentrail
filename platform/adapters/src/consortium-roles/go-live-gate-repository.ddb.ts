/**
 * GoLiveGateRepositoryDdb - sandbox implementation for local Consentrail.
 */
import type { GoLiveGateRepository } from '@consentrail/services/consortium-roles';
import { meta, store } from '../_shared/product-sandbox.js';

export class GoLiveGateRepositoryDdb implements GoLiveGateRepository {
  constructor(private readonly dynamoClient: any) {}

  async getConsortiumGoLiveGate(input: any) {
    const kinds = new Set(
      [...store.roles.values()].map((r) => String(r.kind ?? ''))
    );
    const required = ['controller', 'processor', 'dpo'];
    const missing = required.filter((k) => !kinds.has(k));
    return {
      data: { ready: missing.length === 0, missing },
      ...meta(input?.correlationId),
    } as any;
  }
}
