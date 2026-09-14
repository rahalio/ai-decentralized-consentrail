/**
 * Consortium Roles Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/consortium-roles.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ConsortiumRole = components["schemas"]["ConsortiumRole"];
export type ConsortiumRoleCreate = components["schemas"]["ConsortiumRoleCreate"];
export type ConsortiumRoleId = components["schemas"]["ConsortiumRoleId"];
export type ConsortiumRoleKind = components["schemas"]["ConsortiumRoleKind"];
export type ConsortiumRoleListData = components["schemas"]["ConsortiumRoleListData"];
export type GoLiveGate = components["schemas"]["GoLiveGate"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type AssignConsortiumRoleRequestInput = NonNullable<operations["assignConsortiumRole"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListConsortiumRolesParams = NonNullable<operations["listConsortiumRoles"]["parameters"]["query"]>;
export type GetConsortiumRoleParams = operations["getConsortiumRole"]["parameters"]["path"];
export type AttestConsortiumRoleParams = operations["attestConsortiumRole"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListConsortiumRolesResponse = operations["listConsortiumRoles"]["responses"]["200"]["content"]["application/json"];
export type AssignConsortiumRoleResponse = operations["assignConsortiumRole"]["responses"]["201"]["content"]["application/json"];
export type GetConsortiumRoleResponse = operations["getConsortiumRole"]["responses"]["200"]["content"]["application/json"];
export type AttestConsortiumRoleResponse = operations["attestConsortiumRole"]["responses"]["200"]["content"]["application/json"];
export type GetConsortiumGoLiveGateResponse = operations["getConsortiumGoLiveGate"]["responses"]["200"]["content"]["application/json"];


