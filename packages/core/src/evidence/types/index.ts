/**
 * Evidence Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/evidence.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type EvidenceHash = components["schemas"]["EvidenceHash"];
export type EvidenceHashCreate = components["schemas"]["EvidenceHashCreate"];
export type EvidenceHashId = components["schemas"]["EvidenceHashId"];
export type EvidenceHashListData = components["schemas"]["EvidenceHashListData"];
export type IntegrityProof = components["schemas"]["IntegrityProof"];
export type IntegrityProofCreate = components["schemas"]["IntegrityProofCreate"];
export type IntegrityProofId = components["schemas"]["IntegrityProofId"];
export type IntegrityProofListData = components["schemas"]["IntegrityProofListData"];
export type Hash = operations["listEvidenceHashes"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterEvidenceHashRequestInput = NonNullable<operations["registerEvidenceHash"]["requestBody"]>["content"]["application/json"];
export type IssueIntegrityProofRequestInput = NonNullable<operations["issueIntegrityProof"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListEvidenceHashesParams = NonNullable<operations["listEvidenceHashes"]["parameters"]["query"]>;
export type GetEvidenceHashParams = operations["getEvidenceHash"]["parameters"]["path"];
export type OrphanEvidenceHashParams = operations["orphanEvidenceHash"]["parameters"]["path"];
export type ListIntegrityProofsParams = NonNullable<operations["listIntegrityProofs"]["parameters"]["query"]>;
export type GetIntegrityProofParams = operations["getIntegrityProof"]["parameters"]["path"];
export type VerifyIntegrityProofParams = operations["verifyIntegrityProof"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListEvidenceHashesResponse = operations["listEvidenceHashes"]["responses"]["200"]["content"]["application/json"];
export type RegisterEvidenceHashResponse = operations["registerEvidenceHash"]["responses"]["201"]["content"]["application/json"];
export type GetEvidenceHashResponse = operations["getEvidenceHash"]["responses"]["200"]["content"]["application/json"];
export type OrphanEvidenceHashResponse = operations["orphanEvidenceHash"]["responses"]["200"]["content"]["application/json"];
export type ListIntegrityProofsResponse = operations["listIntegrityProofs"]["responses"]["200"]["content"]["application/json"];
export type IssueIntegrityProofResponse = operations["issueIntegrityProof"]["responses"]["201"]["content"]["application/json"];
export type GetIntegrityProofResponse = operations["getIntegrityProof"]["responses"]["200"]["content"]["application/json"];
export type VerifyIntegrityProofResponse = operations["verifyIntegrityProof"]["responses"]["200"]["content"]["application/json"];


