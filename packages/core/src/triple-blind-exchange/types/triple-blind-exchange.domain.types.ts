/**
 * Triple Blind Exchange Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/triple-blind-exchange.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type TripleBlindDryRun = components["schemas"]["TripleBlindDryRun"];
export type TripleBlindPolicy = components["schemas"]["TripleBlindPolicy"];
export type TripleBlindPolicyCreate = components["schemas"]["TripleBlindPolicyCreate"];
export type TripleBlindPolicyId = components["schemas"]["TripleBlindPolicyId"];
export type TripleBlindPolicyListData = components["schemas"]["TripleBlindPolicyListData"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateTripleBlindPolicyRequestInput = NonNullable<operations["createTripleBlindPolicy"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListTripleBlindPoliciesParams = NonNullable<operations["listTripleBlindPolicies"]["parameters"]["query"]>;
export type GetTripleBlindPolicyParams = operations["getTripleBlindPolicy"]["parameters"]["path"];
export type EnableTripleBlindPolicyParams = operations["enableTripleBlindPolicy"]["parameters"]["path"];
export type DisableTripleBlindPolicyParams = operations["disableTripleBlindPolicy"]["parameters"]["path"];
export type DryRunTripleBlindPolicyParams = operations["dryRunTripleBlindPolicy"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListTripleBlindPoliciesResponse = operations["listTripleBlindPolicies"]["responses"]["200"]["content"]["application/json"];
export type CreateTripleBlindPolicyResponse = operations["createTripleBlindPolicy"]["responses"]["201"]["content"]["application/json"];
export type GetTripleBlindPolicyResponse = operations["getTripleBlindPolicy"]["responses"]["200"]["content"]["application/json"];
export type EnableTripleBlindPolicyResponse = operations["enableTripleBlindPolicy"]["responses"]["200"]["content"]["application/json"];
export type DisableTripleBlindPolicyResponse = operations["disableTripleBlindPolicy"]["responses"]["200"]["content"]["application/json"];
export type DryRunTripleBlindPolicyResponse = operations["dryRunTripleBlindPolicy"]["responses"]["200"]["content"]["application/json"];


