/**
 * Rights Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/rights.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type RightsCase = components["schemas"]["RightsCase"];
export type RightsCaseClose = components["schemas"]["RightsCaseClose"];
export type RightsCaseCreate = components["schemas"]["RightsCaseCreate"];
export type RightsCaseId = components["schemas"]["RightsCaseId"];
export type RightsCaseListData = components["schemas"]["RightsCaseListData"];
export type RightsCaseStatus = components["schemas"]["RightsCaseStatus"];
export type RightsCaseType = components["schemas"]["RightsCaseType"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type OpenRightsCaseRequestInput = NonNullable<operations["openRightsCase"]["requestBody"]>["content"]["application/json"];
export type CloseRightsCaseRequestInput = NonNullable<operations["closeRightsCase"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListRightsCasesParams = NonNullable<operations["listRightsCases"]["parameters"]["query"]>;
export type GetRightsCaseParams = operations["getRightsCase"]["parameters"]["path"];
export type CloseRightsCaseParams = operations["closeRightsCase"]["parameters"]["path"];
export type HandRightsCaseToCounselParams = operations["handRightsCaseToCounsel"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListRightsCasesResponse = operations["listRightsCases"]["responses"]["200"]["content"]["application/json"];
export type OpenRightsCaseResponse = operations["openRightsCase"]["responses"]["201"]["content"]["application/json"];
export type GetRightsCaseResponse = operations["getRightsCase"]["responses"]["200"]["content"]["application/json"];
export type CloseRightsCaseResponse = operations["closeRightsCase"]["responses"]["200"]["content"]["application/json"];
export type HandRightsCaseToCounselResponse = operations["handRightsCaseToCounsel"]["responses"]["200"]["content"]["application/json"];


