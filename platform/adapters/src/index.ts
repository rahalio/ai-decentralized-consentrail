export * from './_shared/id-generator.service.impl.js';
export * from './_shared/dynamodb-utils.js';
export * from './_shared/dynamodb-key-helpers.js';
export * from './_shared/dynamodb-client-types.js';
export * from './_shared/http-client.js';
export * from './_shared/in-memory-api-key-lookup.js';
export * from './_shared/in-memory-idempotency-store.js';
export * from './_shared/sandbox-store.js';
export * from './_shared/messaging/index.js';

import * as _identity from './identity/index.js';
import * as _consents from './consents/index.js';
import * as _consortiumRoles from './consortium-roles/index.js';
import * as _counselGates from './counsel-gates/index.js';
import * as _evidence from './evidence/index.js';
import * as _obligations from './obligations/index.js';
import * as _regulatorViews from './regulator-views/index.js';
import * as _rights from './rights/index.js';
import * as _securityEvents from './security-events/index.js';
import * as _tripleBlindExchange from './triple-blind-exchange/index.js';

export const identity = _identity;
export const consents = _consents;
export const consortiumRoles = _consortiumRoles;
export const counselGates = _counselGates;
export const evidence = _evidence;
export const obligations = _obligations;
export const regulatorViews = _regulatorViews;
export const rights = _rights;
export const securityEvents = _securityEvents;
export const tripleBlindExchange = _tripleBlindExchange;

// Identity flat re-exports (unique names) for existing DI imports
export * from './identity/index.js';
