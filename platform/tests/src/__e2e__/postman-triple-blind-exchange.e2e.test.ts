/**
 * Postman-collection 1:1 Vitest tests for triple-blind-exchange (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  cursor: "",
  limit: "",
  policyId: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / triple-blind-exchange (1:1 generated)", () => {

  it("listTripleBlindPolicies", async () => {
    const url = sub("{{baseUrl}}/v1/triple-blind-policies?cursor={{cursor}}&limit={{limit}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("createTripleBlindPolicy", async () => {
    const url = sub("{{baseUrl}}/v1/triple-blind-policies");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"name\": \"Newman Test\",\n  \"providerLearns\": null,\n  \"consumerLearns\": null,\n  \"operatorLearns\": null\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
    if (j?.data?.id) vars['tripleBlindPolicyId'] = j.data.id;
  });

  it("getTripleBlindPolicy", async () => {
    const url = sub("{{baseUrl}}/v1/triple-blind-policies/{{policyId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("enableTripleBlindPolicy", async () => {
    const url = sub("{{baseUrl}}/v1/triple-blind-policies/{{policyId}}/enable");
    const res = await fetch(url, {
      method: "POST",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("disableTripleBlindPolicy", async () => {
    const url = sub("{{baseUrl}}/v1/triple-blind-policies/{{policyId}}/disable");
    const res = await fetch(url, {
      method: "POST",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("dryRunTripleBlindPolicy", async () => {
    const url = sub("{{baseUrl}}/v1/triple-blind-policies/{{policyId}}/dry-run");
    const res = await fetch(url, {
      method: "POST",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });
});
