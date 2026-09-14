/**
 * Domain Dependency Injection Hook — Consentrail.
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AdapterDynamoDBClient } from '@consentrail/adapters';
import {
  DynamoDBClient,
  BatchWriteItemCommand,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  QueryCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
  TransactWriteCommand,
} from '@aws-sdk/lib-dynamodb';
import type {
  QueryCommandInput,
  QueryCommandOutput,
  GetCommandInput,
  GetCommandOutput,
  PutCommandInput,
  PutCommandOutput,
  UpdateCommandInput,
  UpdateCommandOutput,
  DeleteCommandInput,
  DeleteCommandOutput,
  ScanCommandInput,
  ScanCommandOutput,
  TransactWriteCommandInput,
  TransactWriteCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import type {
  BatchWriteItemCommandInput,
  BatchWriteItemCommandOutput,
} from '@aws-sdk/client-dynamodb';
import { getAwsCredentialProvider } from '../infrastructure/aws-credentials.js';

import {
  buildIdentityDomainModule,
  buildConsentsDomainModule,
  buildRightsDomainModule,
  buildSecurityEventsDomainModule,
  buildObligationsDomainModule,
  buildEvidenceDomainModule,
  buildRegulatorViewsDomainModule,
  buildConsortiumRolesDomainModule,
  buildCounselGatesDomainModule,
  buildTripleBlindExchangeDomainModule,
} from '../../domains/index.js';
import type {
  IdentityDomainModule,
  ConsentsDomainModule,
  RightsDomainModule,
  SecurityEventsDomainModule,
  ObligationsDomainModule,
  EvidenceDomainModule,
  RegulatorViewsDomainModule,
  ConsortiumRolesDomainModule,
  CounselGatesDomainModule,
  TripleBlindExchangeDomainModule,
} from '../../domains/index.js';

const dependencyCache = new Map<string, unknown>();

function getCacheKey(domain: string): string {
  return domain;
}

class DynamoDBClientAdapter implements AdapterDynamoDBClient {
  constructor(private readonly docClient: DynamoDBDocumentClient) {}

  async query(input: QueryCommandInput): Promise<QueryCommandOutput> {
    return this.docClient.send(new QueryCommand(input));
  }

  async get(input: GetCommandInput): Promise<GetCommandOutput> {
    return this.docClient.send(new GetCommand(input));
  }

  async put(input: PutCommandInput): Promise<PutCommandOutput> {
    return this.docClient.send(new PutCommand(input));
  }

  async update(input: UpdateCommandInput): Promise<UpdateCommandOutput> {
    return this.docClient.send(new UpdateCommand(input));
  }

  async delete(input: DeleteCommandInput): Promise<DeleteCommandOutput> {
    return this.docClient.send(new DeleteCommand(input));
  }

  async scan(input: ScanCommandInput): Promise<ScanCommandOutput> {
    return this.docClient.send(new ScanCommand(input));
  }

  async batchWrite(
    input: BatchWriteItemCommandInput
  ): Promise<BatchWriteItemCommandOutput> {
    return this.docClient.send(new BatchWriteItemCommand(input));
  }

  async transactWrite(
    input: TransactWriteCommandInput
  ): Promise<TransactWriteCommandOutput> {
    return this.docClient.send(new TransactWriteCommand(input));
  }

  async send<T>(command: T): Promise<unknown> {
    return this.docClient.send(command as never);
  }
}

let dynamoClientInstance: AdapterDynamoDBClient | null = null;

export function getDynamoClientInstance(): AdapterDynamoDBClient {
  if (!dynamoClientInstance) {
    const region =
      process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1';
    const clientConfig: {
      region: string;
      endpoint?: string;
      credentials?: import('@aws-sdk/types').AwsCredentialIdentityProvider;
    } = { region };

    const credentialProvider = getAwsCredentialProvider();
    if (credentialProvider) clientConfig.credentials = credentialProvider;

    if (process.env.AWS_ENDPOINT_URL || process.env.LOCALSTACK_ENDPOINT) {
      clientConfig.endpoint =
        process.env.AWS_ENDPOINT_URL || process.env.LOCALSTACK_ENDPOINT;
    }

    const client = new DynamoDBClient(clientConfig);
    const docClient = DynamoDBDocumentClient.from(client);
    dynamoClientInstance = new DynamoDBClientAdapter(docClient);
  }
  return dynamoClientInstance;
}

const DOMAIN_PATH_PATTERNS: Array<{ pattern: RegExp; domain: string }> = [
  { pattern: /\/auth\//, domain: 'identity' },
  { pattern: /\/identity\//, domain: 'identity' },
  { pattern: /\/v0\/tenants\/me\/api-keys/, domain: 'identity' },
  { pattern: /\/v0\/tenants\/me\/users/, domain: 'identity' },
  { pattern: /\/v0\/keys/, domain: 'identity' },
  { pattern: /\/v0\/users/, domain: 'identity' },
  { pattern: /\/v1\/consents/, domain: 'consents' },
  { pattern: /\/v1\/owner-mediation-grants/, domain: 'consents' },
  { pattern: /\/v1\/rights-cases/, domain: 'rights' },
  { pattern: /\/v1\/security-events/, domain: 'security-events' },
  { pattern: /\/v1\/obligations/, domain: 'obligations' },
  { pattern: /\/v1\/compliance-alerts/, domain: 'obligations' },
  { pattern: /\/v1\/evidence/, domain: 'evidence' },
  { pattern: /\/v1\/regulator-views/, domain: 'regulator-views' },
  { pattern: /\/v1\/consortium-roles/, domain: 'consortium-roles' },
  { pattern: /\/v1\/counsel-gates/, domain: 'counsel-gates' },
  { pattern: /\/v1\/triple-blind-policies/, domain: 'triple-blind-exchange' },
];

function detectDomainFromPath(path: string): string | null {
  for (const { pattern, domain } of DOMAIN_PATH_PATTERNS) {
    if (pattern.test(path)) {
      return domain;
    }
  }
  return null;
}

type DomainBuilder = (client: AdapterDynamoDBClient) => unknown;

const DOMAIN_BUILDERS: Record<string, DomainBuilder> = {
  identity: (c) => buildIdentityDomainModule(c),
  consents: (c) => buildConsentsDomainModule(c),
  rights: (c) => buildRightsDomainModule(c),
  'security-events': (c) => buildSecurityEventsDomainModule(c),
  obligations: (c) => buildObligationsDomainModule(c),
  evidence: (c) => buildEvidenceDomainModule(c),
  'regulator-views': (c) => buildRegulatorViewsDomainModule(c),
  'consortium-roles': (c) => buildConsortiumRolesDomainModule(c),
  'counsel-gates': (c) => buildCounselGatesDomainModule(c),
  'triple-blind-exchange': (c) => buildTripleBlindExchangeDomainModule(c),
};

export async function injectDomainDependencies(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const orgId = (request as { effectiveOrgId?: string }).effectiveOrgId;

  if (!orgId) {
    reply.status(401).send({
      error: 'Unauthorized',
      message:
        'Missing orgId. setOrgContext hook must run before injectDomainDependencies.',
    });
    return;
  }

  const path = request.url;
  const domain = detectDomainFromPath(path);

  if (!domain) {
    return;
  }

  const reqAny = request as { deps?: Record<string, unknown> };
  if (!reqAny.deps) {
    reqAny.deps = {};
  }

  const cacheKey = getCacheKey(domain);
  let domainDeps = dependencyCache.get(cacheKey);

  if (!domainDeps) {
    const dynamoClient = getDynamoClientInstance();
    const builder = DOMAIN_BUILDERS[domain];
    if (!builder) return;
    domainDeps = builder(dynamoClient);
    dependencyCache.set(cacheKey, domainDeps);
  }

  reqAny.deps[domain] = domainDeps;
}

export function getDomainDeps<T extends keyof DomainDependencies>(
  request: FastifyRequest,
  domain: T
): DomainDependencies[T] {
  const deps = (request as { deps?: Record<string, unknown> }).deps;
  if (!deps || !deps[domain]) {
    throw new Error(
      `${domain} dependencies not found. Ensure injectDomainDependencies hook ran and path matches ${domain} domain.`
    );
  }
  return deps[domain] as DomainDependencies[T];
}

export interface DomainDependencies {
  identity: IdentityDomainModule;
  consents: ConsentsDomainModule;
  rights: RightsDomainModule;
  'security-events': SecurityEventsDomainModule;
  obligations: ObligationsDomainModule;
  evidence: EvidenceDomainModule;
  'regulator-views': RegulatorViewsDomainModule;
  'consortium-roles': ConsortiumRolesDomainModule;
  'counsel-gates': CounselGatesDomainModule;
  'triple-blind-exchange': TripleBlindExchangeDomainModule;
}

export function clearDomainDependencyCache(domain: string): void {
  dependencyCache.delete(getCacheKey(domain));
}

export function clearAllDomainDependencyCaches(): void {
  dependencyCache.clear();
}

export function getIdentityDeps(
  request: FastifyRequest
): DomainDependencies['identity'] {
  return getDomainDeps(request, 'identity');
}
