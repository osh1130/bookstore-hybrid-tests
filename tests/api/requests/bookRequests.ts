import { expect } from '@playwright/test';
import * as BookAPI from '../endpoints/book';
import * as AccountAPI from '../endpoints/account';
import { expectStatus, userHasBook } from '../../utils/assertHelpers';

export async function addBookAndVerify(request, userId: string, isbn: string, token: string) {
  const data = {
    userId,
    collectionOfIsbns: [{ isbn }],
  };

  // 1. Fetch the user’s current collection
  const existingRes = await AccountAPI.getUser(request, userId, token);
  expectStatus(existingRes, 200);
  const existingJson = await existingRes.json();

  // 2. If the book is already there, delete it first
  if (existingJson.books.some((b: any) => b.isbn === isbn)) {
    const deleteData = { userId, isbn };
    const delRes = await BookAPI.deleteBook(request, deleteData, token);
    // We expect delete to succeed (204) or gracefully handle “not found”
    expect(delRes.status()).toBe(204);
  }

  // 3. Now add the book
  const res = await BookAPI.addBooks(request, data, token);
  expectStatus(res, 201);

  // 4. Re-fetch and verify
  const userRes = await AccountAPI.getUser(request, userId, token);
  const body = await userRes.json();
  //console.log(body.books);
  userHasBook(body,isbn);
}

export async function replaceUserBook(request, userId: string, oldIsbn: string, newIsbn: string, token: string) {
  const data = {
    userId,
    isbn: newIsbn,
  };

  const res = await BookAPI.putBook(request, oldIsbn, data, token);
  expectStatus(res, 200);

  const userRes = await AccountAPI.getUser(request, userId, token);
  userHasBook(userRes.json(),newIsbn);
}

export async function addBooksAndDelete(request, userId: string, isbn: string, token: string) {
    const clearRes = await BookAPI.clearBooks(request, userId, token);
    expectStatus(clearRes, 204); 
  
    const data = {
      userId,
      collectionOfIsbns: [{isbn}],
    };
  
    const res = await BookAPI.addBooks(request, data, token);
    expectStatus(res, 201);
    const deleteData = { userId, isbn };
    const delRes = await BookAPI.deleteBook(request, deleteData, token);
    expect(delRes.status()).toBe(204);
    // fetch the user one more time and return the JSON
    const userRes = await AccountAPI.getUser(request, userId, token);
    expectStatus(userRes, 200);
  return userRes.json();

}

export async function clearAndAddBooks(request, userId: string, isbns: string[], token: string) {
  const clearRes = await BookAPI.clearBooks(request, userId, token);
  expectStatus(clearRes, 204); 

  const data = {
    userId,
    collectionOfIsbns: isbns.map(isbn => ({ isbn })),
  };

  const res = await BookAPI.addBooks(request, data, token);
  expectStatus(res, 201);
}
