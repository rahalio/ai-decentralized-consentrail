import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const openRightsCase_Body = z
  .object({
    type: z.enum([
      'access',
      'rectification',
      'erasure',
      'portability',
      'breach_inform',
    ]),
    subjectRef: z.string(),
    slaDueAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const closeRightsCase_Body = z
  .object({
    outcome: z.enum(['fulfilled', 'refused']),
    lawfulBasis: z.string().optional(),
    evidenceRefs: z.array(z.string()).optional(),
  })
  .passthrough();
const RightsCaseType = z.enum([
  'access',
  'rectification',
  'erasure',
  'portability',
  'breach_inform',
]);
const RightsCaseStatus = z.enum([
  'open',
  'in_review',
  'counsel_hold',
  'fulfilled',
  'refused',
]);
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
const RightsCaseId = z.string();
const RightsCase = z
  .object({
    id: z.string().regex(/^rgt_[0-9A-HJKMNP-TV-Z]{26}$/),
    type: z.enum([
      'access',
      'rectification',
      'erasure',
      'portability',
      'breach_inform',
    ]),
    status: z.enum([
      'open',
      'in_review',
      'counsel_hold',
      'fulfilled',
      'refused',
    ]),
    subjectRef: z.string(),
    lawfulBasis: z.string().optional(),
    evidenceRefs: z.array(z.string()).optional(),
    counselGateId: z.string().optional(),
    slaDueAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const RightsCaseListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^rgt_[0-9A-HJKMNP-TV-Z]{26}$/),
          type: z.enum([
            'access',
            'rectification',
            'erasure',
            'portability',
            'breach_inform',
          ]),
          status: z.enum([
            'open',
            'in_review',
            'counsel_hold',
            'fulfilled',
            'refused',
          ]),
          subjectRef: z.string(),
          lawfulBasis: z.string().optional(),
          evidenceRefs: z.array(z.string()).optional(),
          counselGateId: z.string().optional(),
          slaDueAt: z.string().datetime({ offset: true }).optional(),
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
const RightsCaseListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^rgt_[0-9A-HJKMNP-TV-Z]{26}$/),
              type: z.enum([
                'access',
                'rectification',
                'erasure',
                'portability',
                'breach_inform',
              ]),
              status: z.enum([
                'open',
                'in_review',
                'counsel_hold',
                'fulfilled',
                'refused',
              ]),
              subjectRef: z.string(),
              lawfulBasis: z.string().optional(),
              evidenceRefs: z.array(z.string()).optional(),
              counselGateId: z.string().optional(),
              slaDueAt: z.string().datetime({ offset: true }).optional(),
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
const RightsCaseCreate = z
  .object({
    type: z.enum([
      'access',
      'rectification',
      'erasure',
      'portability',
      'breach_inform',
    ]),
    subjectRef: z.string(),
    slaDueAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const RightsCaseResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^rgt_[0-9A-HJKMNP-TV-Z]{26}$/),
        type: z.enum([
          'access',
          'rectification',
          'erasure',
          'portability',
          'breach_inform',
        ]),
        status: z.enum([
          'open',
          'in_review',
          'counsel_hold',
          'fulfilled',
          'refused',
        ]),
        subjectRef: z.string(),
        lawfulBasis: z.string().optional(),
        evidenceRefs: z.array(z.string()).optional(),
        counselGateId: z.string().optional(),
        slaDueAt: z.string().datetime({ offset: true }).optional(),
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
const RightsCaseClose = z
  .object({
    outcome: z.enum(['fulfilled', 'refused']),
    lawfulBasis: z.string().optional(),
    evidenceRefs: z.array(z.string()).optional(),
  })
  .passthrough();

export const schemas: any = {
  openRightsCase_Body,
  closeRightsCase_Body,
  RightsCaseType,
  RightsCaseStatus,
  Problem,
  RightsCaseId,
  RightsCase,
  RightsCaseListData,
  ResponseMeta,
  RightsCaseListResponse,
  RightsCaseCreate,
  RightsCaseResponse,
  RightsCaseClose,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/rights-cases',
    alias: 'listRightsCases',
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
        name: 'type',
        type: 'Query',
        schema: z
          .enum([
            'access',
            'rectification',
            'erasure',
            'portability',
            'breach_inform',
          ])
          .optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['open', 'in_review', 'counsel_hold', 'fulfilled', 'refused'])
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^rgt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  type: z.enum([
                    'access',
                    'rectification',
                    'erasure',
                    'portability',
                    'breach_inform',
                  ]),
                  status: z.enum([
                    'open',
                    'in_review',
                    'counsel_hold',
                    'fulfilled',
                    'refused',
                  ]),
                  subjectRef: z.string(),
                  lawfulBasis: z.string().optional(),
                  evidenceRefs: z.array(z.string()).optional(),
                  counselGateId: z.string().optional(),
                  slaDueAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/rights-cases',
    alias: 'openRightsCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: openRightsCase_Body,
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
            id: z.string().regex(/^rgt_[0-9A-HJKMNP-TV-Z]{26}$/),
            type: z.enum([
              'access',
              'rectification',
              'erasure',
              'portability',
              'breach_inform',
            ]),
            status: z.enum([
              'open',
              'in_review',
              'counsel_hold',
              'fulfilled',
              'refused',
            ]),
            subjectRef: z.string(),
            lawfulBasis: z.string().optional(),
            evidenceRefs: z.array(z.string()).optional(),
            counselGateId: z.string().optional(),
            slaDueAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/rights-cases/:caseId',
    alias: 'getRightsCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'caseId',
        type: 'Path',
        schema: z.string().regex(/^rgt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^rgt_[0-9A-HJKMNP-TV-Z]{26}$/),
            type: z.enum([
              'access',
              'rectification',
              'erasure',
              'portability',
              'breach_inform',
            ]),
            status: z.enum([
              'open',
              'in_review',
              'counsel_hold',
              'fulfilled',
              'refused',
            ]),
            subjectRef: z.string(),
            lawfulBasis: z.string().optional(),
            evidenceRefs: z.array(z.string()).optional(),
            counselGateId: z.string().optional(),
            slaDueAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'post',
    path: '/v1/rights-cases/:caseId/close',
    alias: 'closeRightsCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: closeRightsCase_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'caseId',
        type: 'Path',
        schema: z.string().regex(/^rgt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^rgt_[0-9A-HJKMNP-TV-Z]{26}$/),
            type: z.enum([
              'access',
              'rectification',
              'erasure',
              'portability',
              'breach_inform',
            ]),
            status: z.enum([
              'open',
              'in_review',
              'counsel_hold',
              'fulfilled',
              'refused',
            ]),
            subjectRef: z.string(),
            lawfulBasis: z.string().optional(),
            evidenceRefs: z.array(z.string()).optional(),
            counselGateId: z.string().optional(),
            slaDueAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'post',
    path: '/v1/rights-cases/:caseId/hand-to-counsel',
    alias: 'handRightsCaseToCounsel',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'caseId',
        type: 'Path',
        schema: z.string().regex(/^rgt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^rgt_[0-9A-HJKMNP-TV-Z]{26}$/),
            type: z.enum([
              'access',
              'rectification',
              'erasure',
              'portability',
              'breach_inform',
            ]),
            status: z.enum([
              'open',
              'in_review',
              'counsel_hold',
              'fulfilled',
              'refused',
            ]),
            subjectRef: z.string(),
            lawfulBasis: z.string().optional(),
            evidenceRefs: z.array(z.string()).optional(),
            counselGateId: z.string().optional(),
            slaDueAt: z.string().datetime({ offset: true }).optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
