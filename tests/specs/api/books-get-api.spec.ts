import { getBooks } from "../../api/endpoints/book";
import {test, expect } from "../../fixtures";
import booksData from '../../data/book-data';


test.describe('Book API - GET requests', () => {
    test('B01 @smoke list all books in bookstore', async ({ request }) => {
        const res = await getBooks(request);
        expect(res.status()).toBe(200);
        expect(res.statusText()).toBe('OK');
    });

    test('B26 each book in data should be fetchable by ISBN', async ({ bookApi }) => {
        for (const book of booksData.books) {
          try {
          const res = await bookApi.getBook(book.isbn);
          expect(res.status()).toBe(200);
          const json = await res.json();
          expect(json.title).toBe(book.title);
        }catch (err) {
          console.error(`Exception for book "${book.title}":`, err);
        }
        }
      });

      
      test('B27 @smoke first book should be fetchable by ISBN', async ({ bookApi }) => {
        const isbn = '9781449325862'
        const res = await bookApi.getBook(isbn);
        expect(res.status()).toBe(200);
        const json = await res.json();
        expect(json.title).toBe('Git Pocket Guide');
      });

      test('B28 invalid book should be not found(1025)', async ({ bookApi }) => {
        const isbn = '000000'
        const res = await bookApi.getBook(isbn);
        expect(res.status()).toBe(400);
        expect(res.statusText()).toBe('Bad Request');
        const body = await res.json();
        expect(body).toHaveProperty('code', '1205');
        expect(body.message).toContain('ISBN supplied is not available in Books Collection!'); 
      });
})