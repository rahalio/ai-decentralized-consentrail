import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const captureConsent_Body = z
  .object({
    subjectRef: z.string(),
    purpose: z.string(),
    explicit: z.boolean().optional().default(false),
    freelyGiven: z.boolean().optional().default(true),
    informed: z.boolean().optional().default(true),
    unambiguous: z.boolean().optional().default(true),
    ownerMediated: z.boolean().optional().default(false),
  })
  .passthrough();
const requestOwnerMediationGrant_Body = z
  .object({
    consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
    requestingMemberId: z.string(),
    scope: z.string().optional(),
    expiresAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ConsentStatus = z.enum(['active', 'withdrawn']);
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const ConsentId = z.string();
const ConsentRecord = z
  .object({
    id: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
    subjectRef: z.string(),
    purpose: z.string(),
    explicit: z.boolean().optional(),
    freelyGiven: z.boolean().optional(),
    informed: z.boolean().optional(),
    unambiguous: z.boolean().optional(),
    ownerMediated: z.boolean().optional(),
    status: z.enum(['active', 'withdrawn']),
    processingStop: z.boolean(),
    evidenceHashId: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ConsentRecordListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
          subjectRef: z.string(),
          purpose: z.string(),
          explicit: z.boolean().optional(),
          freelyGiven: z.boolean().optional(),
          informed: z.boolean().optional(),
          unambiguous: z.boolean().optional(),
          ownerMediated: z.boolean().optional(),
          status: z.enum(['active', 'withdrawn']),
          processingStop: z.boolean(),
          evidenceHashId: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const ConsentRecordListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
              subjectRef: z.string(),
              purpose: z.string(),
              explicit: z.boolean().optional(),
              freelyGiven: z.boolean().optional(),
              informed: z.boolean().optional(),
              unambiguous: z.boolean().optional(),
              ownerMediated: z.boolean().optional(),
              status: z.enum(['active', 'withdrawn']),
              processingStop: z.boolean(),
              evidenceHashId: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const ConsentRecordCreate = z
  .object({
    subjectRef: z.string(),
    purpose: z.string(),
    explicit: z.boolean().optional().default(false),
    freelyGiven: z.boolean().optional().default(true),
    informed: z.boolean().optional().default(true),
    unambiguous: z.boolean().optional().default(true),
    ownerMediated: z.boolean().optional().default(false),
  })
  .passthrough();
const ConsentRecordResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
        subjectRef: z.string(),
        purpose: z.string(),
        explicit: z.boolean().optional(),
        freelyGiven: z.boolean().optional(),
        informed: z.boolean().optional(),
        unambiguous: z.boolean().optional(),
        ownerMediated: z.boolean().optional(),
        status: z.enum(['active', 'withdrawn']),
        processingStop: z.boolean(),
        evidenceHashId: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const MemberAck = z
  .object({
    memberId: z.string(),
    acknowledged: z.boolean(),
    acknowledgedAt: z.string().datetime({ offset: true }).optional(),
    lastError: z.string().optional(),
  })
  .passthrough();
const ProcessingStopState = z
  .object({
    consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
    processingStop: z.boolean(),
    members: z.array(
      z
        .object({
          memberId: z.string(),
          acknowledged: z.boolean(),
          acknowledgedAt: z.string().datetime({ offset: true }).optional(),
          lastError: z.string().optional(),
        })
        .passthrough()
    ),
  })
  .passthrough();
const ProcessingStopResponse = z
  .object({
    data: z
      .object({
        consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
        processingStop: z.boolean(),
        members: z.array(
          z
            .object({
              memberId: z.string(),
              acknowledged: z.boolean(),
              acknowledgedAt: z.string().datetime({ offset: true }).optional(),
              lastError: z.string().optional(),
            })
            .passthrough()
        ),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const GrantId = z.string();
const OwnerMediationGrant = z
  .object({
    id: z.string().regex(/^omg_[0-9A-HJKMNP-TV-Z]{26}$/),
    consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
    requestingMemberId: z.string(),
    scope: z.string().optional(),
    status: z.enum(['pending', 'approved', 'denied', 'expired']),
    decidedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    expiresAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const GrantListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^omg_[0-9A-HJKMNP-TV-Z]{26}$/),
          consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
          requestingMemberId: z.string(),
          scope: z.string().optional(),
          status: z.enum(['pending', 'approved', 'denied', 'expired']),
          decidedAt: z.string().datetime({ offset: true }).optional(),
          createdAt: z.string().datetime({ offset: true }),
          expiresAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const OwnerMediationGrantListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^omg_[0-9A-HJKMNP-TV-Z]{26}$/),
              consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
              requestingMemberId: z.string(),
              scope: z.string().optional(),
              status: z.enum(['pending', 'approved', 'denied', 'expired']),
              decidedAt: z.string().datetime({ offset: true }).optional(),
              createdAt: z.string().datetime({ offset: true }),
              expiresAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const OwnerMediationGrantCreate = z
  .object({
    consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
    requestingMemberId: z.string(),
    scope: z.string().optional(),
    expiresAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const OwnerMediationGrantResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^omg_[0-9A-HJKMNP-TV-Z]{26}$/),
        consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
        requestingMemberId: z.string(),
        scope: z.string().optional(),
        status: z.enum(['pending', 'approved', 'denied', 'expired']),
        decidedAt: z.string().datetime({ offset: true }).optional(),
        createdAt: z.string().datetime({ offset: true }),
        expiresAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  captureConsent_Body,
  requestOwnerMediationGrant_Body,
  ConsentStatus,
  Problem,
  ConsentId,
  ConsentRecord,
  ConsentRecordListData,
  ResponseMeta,
  ConsentRecordListResponse,
  ConsentRecordCreate,
  ConsentRecordResponse,
  MemberAck,
  ProcessingStopState,
  ProcessingStopResponse,
  GrantId,
  OwnerMediationGrant,
  GrantListData,
  OwnerMediationGrantListResponse,
  OwnerMediationGrantCreate,
  OwnerMediationGrantResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/consents',
    alias: 'listConsentRecords',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['active', 'withdrawn']).optional(),
      },
      {
        name: 'subjectRef',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
                  subjectRef: z.string(),
                  purpose: z.string(),
                  explicit: z.boolean().optional(),
                  freelyGiven: z.boolean().optional(),
                  informed: z.boolean().optional(),
                  unambiguous: z.boolean().optional(),
                  ownerMediated: z.boolean().optional(),
                  status: z.enum(['active', 'withdrawn']),
                  processingStop: z.boolean(),
                  evidenceHashId: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/consents',
    alias: 'captureConsent',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: captureConsent_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectRef: z.string(),
            purpose: z.string(),
            explicit: z.boolean().optional(),
            freelyGiven: z.boolean().optional(),
            informed: z.boolean().optional(),
            unambiguous: z.boolean().optional(),
            ownerMediated: z.boolean().optional(),
            status: z.enum(['active', 'withdrawn']),
            processingStop: z.boolean(),
            evidenceHashId: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/consents/:consentId',
    alias: 'getConsentRecord',
    requestFormat: 'json',
    parameters: [
      {
        name: 'consentId',
        type: 'Path',
        schema: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectRef: z.string(),
            purpose: z.string(),
            explicit: z.boolean().optional(),
            freelyGiven: z.boolean().optional(),
            informed: z.boolean().optional(),
            unambiguous: z.boolean().optional(),
            ownerMediated: z.boolean().optional(),
            status: z.enum(['active', 'withdrawn']),
            processingStop: z.boolean(),
            evidenceHashId: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/consents/:consentId/processing-stop',
    alias: 'getProcessingStopState',
    requestFormat: 'json',
    parameters: [
      {
        name: 'consentId',
        type: 'Path',
        schema: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            processingStop: z.boolean(),
            members: z.array(
              z
                .object({
                  memberId: z.string(),
                  acknowledged: z.boolean(),
                  acknowledgedAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  lastError: z.string().optional(),
                })
                .passthrough()
            ),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/consents/:consentId/processing-stop',
    alias: 'retryProcessingStopPush',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'consentId',
        type: 'Path',
        schema: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            processingStop: z.boolean(),
            members: z.array(
              z
                .object({
                  memberId: z.string(),
                  acknowledged: z.boolean(),
                  acknowledgedAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  lastError: z.string().optional(),
                })
                .passthrough()
            ),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/consents/:consentId/withdraw',
    alias: 'withdrawConsent',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'consentId',
        type: 'Path',
        schema: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectRef: z.string(),
            purpose: z.string(),
            explicit: z.boolean().optional(),
            freelyGiven: z.boolean().optional(),
            informed: z.boolean().optional(),
            unambiguous: z.boolean().optional(),
            ownerMediated: z.boolean().optional(),
            status: z.enum(['active', 'withdrawn']),
            processingStop: z.boolean(),
            evidenceHashId: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/owner-mediation-grants',
    alias: 'listOwnerMediationGrants',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
      {
        name: 'consentId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['pending', 'approved', 'denied', 'expired']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^omg_[0-9A-HJKMNP-TV-Z]{26}$/),
                  consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
                  requestingMemberId: z.string(),
                  scope: z.string().optional(),
                  status: z.enum(['pending', 'approved', 'denied', 'expired']),
                  decidedAt: z.string().datetime({ offset: true }).optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  expiresAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/owner-mediation-grants',
    alias: 'requestOwnerMediationGrant',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: requestOwnerMediationGrant_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^omg_[0-9A-HJKMNP-TV-Z]{26}$/),
            consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            requestingMemberId: z.string(),
            scope: z.string().optional(),
            status: z.enum(['pending', 'approved', 'denied', 'expired']),
            decidedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            expiresAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/owner-mediation-grants/:grantId',
    alias: 'getOwnerMediationGrant',
    requestFormat: 'json',
    parameters: [
      {
        name: 'grantId',
        type: 'Path',
        schema: z.string().regex(/^omg_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^omg_[0-9A-HJKMNP-TV-Z]{26}$/),
            consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            requestingMemberId: z.string(),
            scope: z.string().optional(),
            status: z.enum(['pending', 'approved', 'denied', 'expired']),
            decidedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            expiresAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/owner-mediation-grants/:grantId/approve',
    alias: 'approveOwnerMediationGrant',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'grantId',
        type: 'Path',
        schema: z.string().regex(/^omg_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^omg_[0-9A-HJKMNP-TV-Z]{26}$/),
            consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            requestingMemberId: z.string(),
            scope: z.string().optional(),
            status: z.enum(['pending', 'approved', 'denied', 'expired']),
            decidedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            expiresAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/owner-mediation-grants/:grantId/deny',
    alias: 'denyOwnerMediationGrant',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'grantId',
        type: 'Path',
        schema: z.string().regex(/^omg_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^omg_[0-9A-HJKMNP-TV-Z]{26}$/),
            consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            requestingMemberId: z.string(),
            scope: z.string().optional(),
            status: z.enum(['pending', 'approved', 'denied', 'expired']),
            decidedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            expiresAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
