/**
 * IdGeneratorService Port — Consentrail domain prefixes.
 */

import type { DomainCode } from '@consentrail/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  cnsId(): string;
  rgtId(): string;
  secId(): string;
  oblId(): string;
  evdId(): string;
  rgvId(): string;
  cnrId(): string;
  cngId(): string;
  tblId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
