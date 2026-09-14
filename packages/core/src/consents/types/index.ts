/**
 * Consents Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/consents.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ConsentId = components["schemas"]["ConsentId"];
export type ConsentRecord = components["schemas"]["ConsentRecord"];
export type ConsentRecordCreate = components["schemas"]["ConsentRecordCreate"];
export type ConsentRecordListData = components["schemas"]["ConsentRecordListData"];
export type ConsentStatus = components["schemas"]["ConsentStatus"];
export type GrantId = components["schemas"]["GrantId"];
export type GrantListData = components["schemas"]["GrantListData"];
export type MemberAck = components["schemas"]["MemberAck"];
export type OwnerMediationGrant = components["schemas"]["OwnerMediationGrant"];
export type OwnerMediationGrantCreate = components["schemas"]["OwnerMediationGrantCreate"];
export type ProcessingStopState = components["schemas"]["ProcessingStopState"];
export type Consent = operations["listConsentRecords"]["responses"]["200"]["content"]["application/json"]["data"];
export type ProcessingStop = components["schemas"]["ProcessingStopResponse"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CaptureConsentRequestInput = NonNullable<operations["captureConsent"]["requestBody"]>["content"]["application/json"];
export type RequestOwnerMediationGrantRequestInput = NonNullable<operations["requestOwnerMediationGrant"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListConsentRecordsParams = NonNullable<operations["listConsentRecords"]["parameters"]["query"]>;
export type GetConsentRecordParams = operations["getConsentRecord"]["parameters"]["path"];
export type WithdrawConsentParams = operations["withdrawConsent"]["parameters"]["path"];
export type GetProcessingStopStateParams = operations["getProcessingStopState"]["parameters"]["path"];
export type RetryProcessingStopPushParams = operations["retryProcessingStopPush"]["parameters"]["path"];
export type ListOwnerMediationGrantsParams = NonNullable<operations["listOwnerMediationGrants"]["parameters"]["query"]>;
export type GetOwnerMediationGrantParams = operations["getOwnerMediationGrant"]["parameters"]["path"];
export type ApproveOwnerMediationGrantParams = operations["approveOwnerMediationGrant"]["parameters"]["path"];
export type DenyOwnerMediationGrantParams = operations["denyOwnerMediationGrant"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListConsentRecordsResponse = operations["listConsentRecords"]["responses"]["200"]["content"]["application/json"];
export type CaptureConsentResponse = operations["captureConsent"]["responses"]["201"]["content"]["application/json"];
export type GetConsentRecordResponse = operations["getConsentRecord"]["responses"]["200"]["content"]["application/json"];
export type WithdrawConsentResponse = operations["withdrawConsent"]["responses"]["200"]["content"]["application/json"];
export type GetProcessingStopStateResponse = operations["getProcessingStopState"]["responses"]["200"]["content"]["application/json"];
export type RetryProcessingStopPushResponse = operations["retryProcessingStopPush"]["responses"]["200"]["content"]["application/json"];
export type ListOwnerMediationGrantsResponse = operations["listOwnerMediationGrants"]["responses"]["200"]["content"]["application/json"];
export type RequestOwnerMediationGrantResponse = operations["requestOwnerMediationGrant"]["responses"]["201"]["content"]["application/json"];
export type GetOwnerMediationGrantResponse = operations["getOwnerMediationGrant"]["responses"]["200"]["content"]["application/json"];
export type ApproveOwnerMediationGrantResponse = operations["approveOwnerMediationGrant"]["responses"]["200"]["content"]["application/json"];
export type DenyOwnerMediationGrantResponse = operations["denyOwnerMediationGrant"]["responses"]["200"]["content"]["application/json"];


