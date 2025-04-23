import { expect } from "@playwright/test";

export function expectStatus(res, statusCode) {
    expect(res.status()).toBe(statusCode);
  }
  
  export async function expectJsonField(res, field) {
    if (res.status() === 204) {
      console.warn(`No body returned from DELETE request, skip checking '${field}'`);
      return null;
    }
    const body = await res.json();
    expect(body[field]).toBeTruthy();
    return body;
  }

  export function userHasBook(json: any, isbn: string) {
    expect(json.books).toBeDefined();
    expect(json.books.some((b: any) => b.isbn === isbn)).toBeTruthy();
  }
  