import { getBooks } from "../../api/endpoints/book";
import {test, expect } from "../../fixtures";
import booksData from '../../data/book-data';


test.describe('Book API - Post requests', () => {
    let userId: string;
    let token: string;
    let cleanupNeeded: boolean;
    test.afterEach(async ({ bookApi }) => {
        if (cleanupNeeded && userId && token && token !== '0') {
          try {
            const res = await Promise.race([
              bookApi.clearBooks(userId, token),
              new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 8000))
            ])as Response;
      
            if (res.status() === 204) {
              console.log('✅ Data cleared');
            } else {
              console.warn('⚠️ Unexpected cleanup status:', res.status());
            }
      
          } catch (err) {
            console.warn('❗ Cleanup failed:', err.message);
          }
        }
      });
      
      


    test('B02 @smoke Add a book with valid ISBN and token', async ({ bookApi }) => {
        cleanupNeeded = true;
        token = process.env.APITOKEN!;
        userId = process.env.USERID!;
        const data = {
            userId,
            collectionOfIsbns: [
                { isbn: booksData.books[1].isbn },
                { isbn: booksData.books[2].isbn },
            ]
        }
        const res = await bookApi.addBooks(data, token);
        expect(res.status()).toBe(201);
        expect(res.statusText()).toBe('Created');
    });

    test('B03 Add a book with duplicate ISBN, expect 400', async ({ bookApi }) => {
        cleanupNeeded = false;
        token = process.env.APITOKEN!;
        userId = process.env.USERID!;
        const data = {
            userId,
            collectionOfIsbns: [
                { isbn: booksData.books[1].isbn },
            ]
        }
        const res = await bookApi.addBooks(data, token);
        expect(res.status()).toBe(201);
        expect(res.statusText()).toBe('Created');
        const res2 = await bookApi.addBooks(data, token);
        expect(res2.status()).toBe(400);
        const body = await res2.json()
        expect(body).toHaveProperty('code','1210');
        expect(body.message).toContain("ISBN already present in the User's Collection!");
    });

    test('B04 Add a book without/others token, expect 401', async ({ bookApi }) => {
        cleanupNeeded = false;
        token = '0';
        userId = process.env.USERID!;
        const data = {
            userId,
            collectionOfIsbns: [
                { isbn: booksData.books[1].isbn },
                { isbn: booksData.books[2].isbn },
            ]
        }
        const res = await bookApi.addBooks(data, token);
        expect(res.status()).toBe(401);
        expect(res.statusText()).toBe('Unauthorized');
    });

    test('B05 Add a book invalid ISBN, expect 400', async ({ bookApi }) => {
        cleanupNeeded = false;
        token = process.env.APITOKEN!;
        userId = process.env.USERID!;
        const data = {
            userId,
            collectionOfIsbns: [
                { isbn: '1' },
            ]
        }
        const res = await bookApi.addBooks(data, token);
        expect(res.status()).toBe(400);
        const body = await res.json();
        expect(body).toHaveProperty('code','1205');
        expect(body.message).toContain('ISBN supplied is not available in Books Collection!');
    });
    
    test('B06 Add a book missing ISBN, expect 400', async ({ bookApi }) => {
        cleanupNeeded = false;
        token = process.env.APITOKEN!;
        userId = process.env.USERID!;
        const data = {
            userId,
            collectionOfIsbns: [
            ]
        }
        const res = await bookApi.addBooks(data, token);
        expect(res.status()).toBe(400);
        const body = await res.json();
        expect(body).toHaveProperty('code','1207');
        expect(body.message).toContain('Collection of books required.');
    });
});