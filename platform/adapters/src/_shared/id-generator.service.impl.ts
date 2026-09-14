/**
 * ID Generator Service Implementation — Consentrail prefixes.
 */

import type { DomainCode } from '@consentrail/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@consentrail/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@consentrail/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  cnsId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.consents);
  }
  rgtId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.rights);
  }
  secId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.securityEvents);
  }
  oblId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.obligations);
  }
  evdId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.evidence);
  }
  rgvId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.regulatorViews);
  }
  cnrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.consortiumRoles);
  }
  cngId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.counselGates);
  }
  tblId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tripleBlindExchange);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
