import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createObligationContract_Body = z
  .object({
    controllerId: z.string(),
    processorId: z.string(),
    termsHash: z.string(),
  })
  .passthrough();
const waiveComplianceAlert_Body = z
  .object({
    note: z.string(),
    expiresAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
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
const ObligationContractId = z.string();
const ObligationContract = z
  .object({
    id: z.string().regex(/^obl_[0-9A-HJKMNP-TV-Z]{26}$/),
    controllerId: z.string(),
    processorId: z.string(),
    termsHash: z.string().optional(),
    lastEvaluation: z.enum(['compliant', 'breach', 'unevaluated']).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ObligationContractListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^obl_[0-9A-HJKMNP-TV-Z]{26}$/),
          controllerId: z.string(),
          processorId: z.string(),
          termsHash: z.string().optional(),
          lastEvaluation: z
            .enum(['compliant', 'breach', 'unevaluated'])
            .optional(),
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
const ObligationContractListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^obl_[0-9A-HJKMNP-TV-Z]{26}$/),
              controllerId: z.string(),
              processorId: z.string(),
              termsHash: z.string().optional(),
              lastEvaluation: z
                .enum(['compliant', 'breach', 'unevaluated'])
                .optional(),
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
const ObligationContractCreate = z
  .object({
    controllerId: z.string(),
    processorId: z.string(),
    termsHash: z.string(),
  })
  .passthrough();
const ObligationContractResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^obl_[0-9A-HJKMNP-TV-Z]{26}$/),
        controllerId: z.string(),
        processorId: z.string(),
        termsHash: z.string().optional(),
        lastEvaluation: z
          .enum(['compliant', 'breach', 'unevaluated'])
          .optional(),
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
const ComplianceAlertId = z.string();
const ComplianceAlert = z
  .object({
    id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
    contractId: z.string().regex(/^obl_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum(['compliant', 'breach', 'waived']),
    detail: z.string().optional(),
    waivedUntil: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ComplianceAlertResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
        contractId: z.string().regex(/^obl_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum(['compliant', 'breach', 'waived']),
        detail: z.string().optional(),
        waivedUntil: z.string().datetime({ offset: true }).optional(),
        createdAt: z.string().datetime({ offset: true }),
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
const ComplianceAlertListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
          contractId: z.string().regex(/^obl_[0-9A-HJKMNP-TV-Z]{26}$/),
          status: z.enum(['compliant', 'breach', 'waived']),
          detail: z.string().optional(),
          waivedUntil: z.string().datetime({ offset: true }).optional(),
          createdAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ComplianceAlertListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
              contractId: z.string().regex(/^obl_[0-9A-HJKMNP-TV-Z]{26}$/),
              status: z.enum(['compliant', 'breach', 'waived']),
              detail: z.string().optional(),
              waivedUntil: z.string().datetime({ offset: true }).optional(),
              createdAt: z.string().datetime({ offset: true }),
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
const WaiverRequest = z
  .object({
    note: z.string(),
    expiresAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();

export const schemas: any = {
  createObligationContract_Body,
  waiveComplianceAlert_Body,
  Problem,
  ObligationContractId,
  ObligationContract,
  ObligationContractListData,
  ResponseMeta,
  ObligationContractListResponse,
  ObligationContractCreate,
  ObligationContractResponse,
  ComplianceAlertId,
  ComplianceAlert,
  ComplianceAlertResponse,
  ComplianceAlertListData,
  ComplianceAlertListResponse,
  WaiverRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/compliance-alerts',
    alias: 'listComplianceAlerts',
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
        name: 'contractId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^obl_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['compliant', 'breach', 'waived']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  contractId: z.string().regex(/^obl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  status: z.enum(['compliant', 'breach', 'waived']),
                  detail: z.string().optional(),
                  waivedUntil: z.string().datetime({ offset: true }).optional(),
                  createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/compliance-alerts/:alertId/acknowledge',
    alias: 'acknowledgeComplianceAlert',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'alertId',
        type: 'Path',
        schema: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
            contractId: z.string().regex(/^obl_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['compliant', 'breach', 'waived']),
            detail: z.string().optional(),
            waivedUntil: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/compliance-alerts/:alertId/waive',
    alias: 'waiveComplianceAlert',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: waiveComplianceAlert_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'alertId',
        type: 'Path',
        schema: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
            contractId: z.string().regex(/^obl_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['compliant', 'breach', 'waived']),
            detail: z.string().optional(),
            waivedUntil: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/obligations',
    alias: 'listObligationContracts',
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
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^obl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  controllerId: z.string(),
                  processorId: z.string(),
                  termsHash: z.string().optional(),
                  lastEvaluation: z
                    .enum(['compliant', 'breach', 'unevaluated'])
                    .optional(),
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
    path: '/v1/obligations',
    alias: 'createObligationContract',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createObligationContract_Body,
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
            id: z.string().regex(/^obl_[0-9A-HJKMNP-TV-Z]{26}$/),
            controllerId: z.string(),
            processorId: z.string(),
            termsHash: z.string().optional(),
            lastEvaluation: z
              .enum(['compliant', 'breach', 'unevaluated'])
              .optional(),
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
    path: '/v1/obligations/:contractId',
    alias: 'getObligationContract',
    requestFormat: 'json',
    parameters: [
      {
        name: 'contractId',
        type: 'Path',
        schema: z.string().regex(/^obl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^obl_[0-9A-HJKMNP-TV-Z]{26}$/),
            controllerId: z.string(),
            processorId: z.string(),
            termsHash: z.string().optional(),
            lastEvaluation: z
              .enum(['compliant', 'breach', 'unevaluated'])
              .optional(),
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
    path: '/v1/obligations/:contractId/evaluate',
    alias: 'evaluateObligationContract',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'contractId',
        type: 'Path',
        schema: z.string().regex(/^obl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
            contractId: z.string().regex(/^obl_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['compliant', 'breach', 'waived']),
            detail: z.string().optional(),
            waivedUntil: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
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
