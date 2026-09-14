import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const openCounselGate_Body = z
  .object({ rightsCaseId: z.string(), evidenceHashId: z.string().optional() })
  .passthrough();
const decideCounselGate_Body = z
  .object({
    decision: z.enum(['approve_orphan', 'refuse', 'legal_hold']),
    basis: z.string().optional(),
  })
  .passthrough();
const CounselGateStatus = z.enum([
  'pending',
  'legal_hold',
  'approved_orphan',
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
const CounselGateId = z.string();
const CounselGate = z
  .object({
    id: z.string().regex(/^cng_[0-9A-HJKMNP-TV-Z]{26}$/),
    rightsCaseId: z.string(),
    evidenceHashId: z.string().optional(),
    status: z.enum(['pending', 'legal_hold', 'approved_orphan', 'refused']),
    basis: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const CounselGateListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^cng_[0-9A-HJKMNP-TV-Z]{26}$/),
          rightsCaseId: z.string(),
          evidenceHashId: z.string().optional(),
          status: z.enum([
            'pending',
            'legal_hold',
            'approved_orphan',
            'refused',
          ]),
          basis: z.string().optional(),
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
const CounselGateListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^cng_[0-9A-HJKMNP-TV-Z]{26}$/),
              rightsCaseId: z.string(),
              evidenceHashId: z.string().optional(),
              status: z.enum([
                'pending',
                'legal_hold',
                'approved_orphan',
                'refused',
              ]),
              basis: z.string().optional(),
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
const CounselGateCreate = z
  .object({ rightsCaseId: z.string(), evidenceHashId: z.string().optional() })
  .passthrough();
const CounselGateResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^cng_[0-9A-HJKMNP-TV-Z]{26}$/),
        rightsCaseId: z.string(),
        evidenceHashId: z.string().optional(),
        status: z.enum(['pending', 'legal_hold', 'approved_orphan', 'refused']),
        basis: z.string().optional(),
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
const CounselDecision = z
  .object({
    decision: z.enum(['approve_orphan', 'refuse', 'legal_hold']),
    basis: z.string().optional(),
  })
  .passthrough();

export const schemas: any = {
  openCounselGate_Body,
  decideCounselGate_Body,
  CounselGateStatus,
  Problem,
  CounselGateId,
  CounselGate,
  CounselGateListData,
  ResponseMeta,
  CounselGateListResponse,
  CounselGateCreate,
  CounselGateResponse,
  CounselDecision,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/counsel-gates',
    alias: 'listCounselGates',
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
        schema: z
          .enum(['pending', 'legal_hold', 'approved_orphan', 'refused'])
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
                  id: z.string().regex(/^cng_[0-9A-HJKMNP-TV-Z]{26}$/),
                  rightsCaseId: z.string(),
                  evidenceHashId: z.string().optional(),
                  status: z.enum([
                    'pending',
                    'legal_hold',
                    'approved_orphan',
                    'refused',
                  ]),
                  basis: z.string().optional(),
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
    path: '/v1/counsel-gates',
    alias: 'openCounselGate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: openCounselGate_Body,
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
            id: z.string().regex(/^cng_[0-9A-HJKMNP-TV-Z]{26}$/),
            rightsCaseId: z.string(),
            evidenceHashId: z.string().optional(),
            status: z.enum([
              'pending',
              'legal_hold',
              'approved_orphan',
              'refused',
            ]),
            basis: z.string().optional(),
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
    path: '/v1/counsel-gates/:gateId',
    alias: 'getCounselGate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'gateId',
        type: 'Path',
        schema: z.string().regex(/^cng_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^cng_[0-9A-HJKMNP-TV-Z]{26}$/),
            rightsCaseId: z.string(),
            evidenceHashId: z.string().optional(),
            status: z.enum([
              'pending',
              'legal_hold',
              'approved_orphan',
              'refused',
            ]),
            basis: z.string().optional(),
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
    path: '/v1/counsel-gates/:gateId/decide',
    alias: 'decideCounselGate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: decideCounselGate_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'gateId',
        type: 'Path',
        schema: z.string().regex(/^cng_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^cng_[0-9A-HJKMNP-TV-Z]{26}$/),
            rightsCaseId: z.string(),
            evidenceHashId: z.string().optional(),
            status: z.enum([
              'pending',
              'legal_hold',
              'approved_orphan',
              'refused',
            ]),
            basis: z.string().optional(),
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
