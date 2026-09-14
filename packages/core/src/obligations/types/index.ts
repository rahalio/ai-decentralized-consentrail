/**
 * Obligations Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/obligations.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ComplianceAlert = components["schemas"]["ComplianceAlert"];
export type ComplianceAlertId = components["schemas"]["ComplianceAlertId"];
export type ComplianceAlertListData = components["schemas"]["ComplianceAlertListData"];
export type ObligationContract = components["schemas"]["ObligationContract"];
export type ObligationContractCreate = components["schemas"]["ObligationContractCreate"];
export type ObligationContractId = components["schemas"]["ObligationContractId"];
export type ObligationContractListData = components["schemas"]["ObligationContractListData"];
export type WaiverRequest = components["schemas"]["WaiverRequest"];
export type Obligation = operations["listObligationContracts"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateObligationContractRequestInput = NonNullable<operations["createObligationContract"]["requestBody"]>["content"]["application/json"];
export type WaiveComplianceAlertRequestInput = NonNullable<operations["waiveComplianceAlert"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListObligationContractsParams = NonNullable<operations["listObligationContracts"]["parameters"]["query"]>;
export type GetObligationContractParams = operations["getObligationContract"]["parameters"]["path"];
export type EvaluateObligationContractParams = operations["evaluateObligationContract"]["parameters"]["path"];
export type ListComplianceAlertsParams = NonNullable<operations["listComplianceAlerts"]["parameters"]["query"]>;
export type AcknowledgeComplianceAlertParams = operations["acknowledgeComplianceAlert"]["parameters"]["path"];
export type WaiveComplianceAlertParams = operations["waiveComplianceAlert"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListObligationContractsResponse = operations["listObligationContracts"]["responses"]["200"]["content"]["application/json"];
export type CreateObligationContractResponse = operations["createObligationContract"]["responses"]["201"]["content"]["application/json"];
export type GetObligationContractResponse = operations["getObligationContract"]["responses"]["200"]["content"]["application/json"];
export type EvaluateObligationContractResponse = operations["evaluateObligationContract"]["responses"]["200"]["content"]["application/json"];
export type ListComplianceAlertsResponse = operations["listComplianceAlerts"]["responses"]["200"]["content"]["application/json"];
export type AcknowledgeComplianceAlertResponse = operations["acknowledgeComplianceAlert"]["responses"]["200"]["content"]["application/json"];
export type WaiveComplianceAlertResponse = operations["waiveComplianceAlert"]["responses"]["200"]["content"]["application/json"];


