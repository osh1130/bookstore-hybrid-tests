import { expect } from "@playwright/test";

export function expectStatus(res, statusCode) {
    expect(res.status()).toBe(statusCode);
  }
  
  export async function expectJsonField(res, field) {
    const body = await res.json();
    expect(body[field]).toBeTruthy();
    return body;
  }
  