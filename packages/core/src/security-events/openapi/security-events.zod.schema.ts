import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const recordSecurityEvent_Body = z
  .object({
    kind: z.enum(['access', 'key', 'participant_verify']),
    participantId: z.string().optional(),
    appId: z.string().optional(),
    detail: z.string().optional(),
  })
  .passthrough();
const SecurityEventKind = z.enum(['access', 'key', 'participant_verify']);
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
const SecurityEventId = z.string();
const SecurityEvent = z
  .object({
    id: z.string().regex(/^sec_[0-9A-HJKMNP-TV-Z]{26}$/),
    kind: z.enum(['access', 'key', 'participant_verify']),
    participantId: z.string().optional(),
    appId: z.string().optional(),
    detail: z.string().optional(),
    acknowledged: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const SecurityEventListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^sec_[0-9A-HJKMNP-TV-Z]{26}$/),
          kind: z.enum(['access', 'key', 'participant_verify']),
          participantId: z.string().optional(),
          appId: z.string().optional(),
          detail: z.string().optional(),
          acknowledged: z.boolean().optional(),
          createdAt: z.string().datetime({ offset: true }),
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
const SecurityEventListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^sec_[0-9A-HJKMNP-TV-Z]{26}$/),
              kind: z.enum(['access', 'key', 'participant_verify']),
              participantId: z.string().optional(),
              appId: z.string().optional(),
              detail: z.string().optional(),
              acknowledged: z.boolean().optional(),
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
const SecurityEventCreate = z
  .object({
    kind: z.enum(['access', 'key', 'participant_verify']),
    participantId: z.string().optional(),
    appId: z.string().optional(),
    detail: z.string().optional(),
  })
  .passthrough();
const SecurityEventResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^sec_[0-9A-HJKMNP-TV-Z]{26}$/),
        kind: z.enum(['access', 'key', 'participant_verify']),
        participantId: z.string().optional(),
        appId: z.string().optional(),
        detail: z.string().optional(),
        acknowledged: z.boolean().optional(),
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

export const schemas: any = {
  recordSecurityEvent_Body,
  SecurityEventKind,
  Problem,
  SecurityEventId,
  SecurityEvent,
  SecurityEventListData,
  ResponseMeta,
  SecurityEventListResponse,
  SecurityEventCreate,
  SecurityEventResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/security-events',
    alias: 'listSecurityEvents',
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
        name: 'kind',
        type: 'Query',
        schema: z.enum(['access', 'key', 'participant_verify']).optional(),
      },
      {
        name: 'participantId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'appId',
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
                  id: z.string().regex(/^sec_[0-9A-HJKMNP-TV-Z]{26}$/),
                  kind: z.enum(['access', 'key', 'participant_verify']),
                  participantId: z.string().optional(),
                  appId: z.string().optional(),
                  detail: z.string().optional(),
                  acknowledged: z.boolean().optional(),
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
    path: '/v1/security-events',
    alias: 'recordSecurityEvent',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: recordSecurityEvent_Body,
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
            id: z.string().regex(/^sec_[0-9A-HJKMNP-TV-Z]{26}$/),
            kind: z.enum(['access', 'key', 'participant_verify']),
            participantId: z.string().optional(),
            appId: z.string().optional(),
            detail: z.string().optional(),
            acknowledged: z.boolean().optional(),
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
    path: '/v1/security-events/:eventId',
    alias: 'getSecurityEvent',
    requestFormat: 'json',
    parameters: [
      {
        name: 'eventId',
        type: 'Path',
        schema: z.string().regex(/^sec_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^sec_[0-9A-HJKMNP-TV-Z]{26}$/),
            kind: z.enum(['access', 'key', 'participant_verify']),
            participantId: z.string().optional(),
            appId: z.string().optional(),
            detail: z.string().optional(),
            acknowledged: z.boolean().optional(),
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
    path: '/v1/security-events/:eventId/acknowledge',
    alias: 'acknowledgeSecurityEvent',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'eventId',
        type: 'Path',
        schema: z.string().regex(/^sec_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^sec_[0-9A-HJKMNP-TV-Z]{26}$/),
            kind: z.enum(['access', 'key', 'participant_verify']),
            participantId: z.string().optional(),
            appId: z.string().optional(),
            detail: z.string().optional(),
            acknowledged: z.boolean().optional(),
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
