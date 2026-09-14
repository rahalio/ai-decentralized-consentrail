/**
 * Regulator Views Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/regulator-views.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type RegulatorView = components["schemas"]["RegulatorView"];
export type RegulatorViewCreate = components["schemas"]["RegulatorViewCreate"];
export type RegulatorViewId = components["schemas"]["RegulatorViewId"];
export type RegulatorViewListData = components["schemas"]["RegulatorViewListData"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type GrantRegulatorViewRequestInput = NonNullable<operations["grantRegulatorView"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListRegulatorViewsParams = NonNullable<operations["listRegulatorViews"]["parameters"]["query"]>;
export type GetRegulatorViewParams = operations["getRegulatorView"]["parameters"]["path"];
export type RevokeRegulatorViewParams = operations["revokeRegulatorView"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListRegulatorViewsResponse = operations["listRegulatorViews"]["responses"]["200"]["content"]["application/json"];
export type GrantRegulatorViewResponse = operations["grantRegulatorView"]["responses"]["201"]["content"]["application/json"];
export type GetRegulatorViewResponse = operations["getRegulatorView"]["responses"]["200"]["content"]["application/json"];
export type RevokeRegulatorViewResponse = operations["revokeRegulatorView"]["responses"]["200"]["content"]["application/json"];


