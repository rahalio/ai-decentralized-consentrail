/**
 * ComplianceAlertRepositoryDdb - sandbox implementation for local Consentrail.
 */
import type { ComplianceAlertRepository } from "@consentrail/services/obligations";
import { id, listOf, one, store } from "../_shared/product-sandbox.js";

export class ComplianceAlertRepositoryDdb implements ComplianceAlertRepository {
  constructor(private readonly dynamoClient: any) {}

  async listComplianceAlerts(input: any) {
    return listOf(store.alerts, input?.correlationId) as any;
  }
}
