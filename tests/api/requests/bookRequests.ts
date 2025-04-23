import { expect } from '@playwright/test';
import * as BookAPI from '../endpoints/book';
import * as AccountAPI from '../endpoints/account';
import { expectStatus, userHasBook } from '../../utils/assertHelpers';

export async function addBookAndVerify(request, userId: string, isbn: string, token: string) {
  const data = {
    userId,
    collectionOfIsbns: [{ isbn }],
  };

  const res = await BookAPI.addBooks(request, data, token);
  expectStatus(res, 200);

  const userRes = await AccountAPI.getUser(request, userId, token);
  userHasBook(userRes.json(),isbn);
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

export async function clearAndAddBooks(request, userId: string, isbns: string[], token: string) {
  const clearRes = await BookAPI.clearBooks(request, userId, token);
  expectStatus(clearRes, 204); 

  const data = {
    userId,
    collectionOfIsbns: isbns.map(isbn => ({ isbn })),
  };

  const res = await BookAPI.addBooks(request, data, token);
  expectStatus(res, 200);
}
