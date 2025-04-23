import { getBooks } from "../../api/endpoints/book";
import {test, expect } from "../../fixtures";
import booksData from '../../data/book-data';


test.describe.serial('Book API - Delete requests', () => {
    let userId: string;
    let token: string;
    test.beforeEach(async ({ bookApi }) => {
      token = process.env.APITOKEN!;
      userId = process.env.USERID!;
      await bookApi.clearBooks(userId, token);
      const data = {
        userId,
        collectionOfIsbns: [{ isbn: '9781449325862' },{ isbn: '9781449331818' }]
      };
      const res = await bookApi.addBooks(data, token);
      expect(res.status()).toBe(201);
    });
      
    test('B08 @smoke Delete a book with valid ISBN and token', async ({ bookApi }) => {
        token = process.env.APITOKEN!;
        userId = process.env.USERID!;
        const data = {
            userId,
            isbn: '9781449325862',
            
        }
        const res = await bookApi.deleteBook(data, token);
        expect(res.status()).toBe(204);
    });

    test('B09 Delete a book without/other token', async ({ bookApi }) => {
        token = '0';
        userId = process.env.USERID!;
        const data = {
            userId,
            isbn: '9781449325862',
            
        }
        const res = await bookApi.deleteBook(data, token);
        expect(res.status()).toBe(401);
        const body = await res.json();
        expect(body).toHaveProperty('code','1200');
        expect(body.message).toContain('User not authorized!');
    });

    test('B10 Delete a book with invalid ISBN', async ({ bookApi }) => {
        token = process.env.APITOKEN!;
        userId = process.env.USERID!;
        const data = {
            userId,
            isbn: '0',
            
        }
        const res = await bookApi.deleteBook(data, token);
        expect(res.status()).toBe(400);
        const body = await res.json();
        expect(body).toHaveProperty('code','1206');
        expect(body.message).toContain("ISBN supplied is not available in User's Collection!");
    });

    test('B11 Delete a book with missing_fields', async ({ bookApi }) => {
        token = process.env.APITOKEN!;
        userId = process.env.USERID!;
        const data = {
            userId,
            isbn: '',
        }
        const res = await bookApi.deleteBook(data, token);
        expect(res.status()).toBe(400);
    });

    test('B12 Delete a book twice', async ({ bookApi }) => {
        token = process.env.APITOKEN!;
        userId = process.env.USERID!;
        const data = {
            userId,
            isbn: '9781449325862',
            
        }
        const res = await bookApi.deleteBook(data, token);
        expect(res.status()).toBe(204);
        const res2 = await bookApi.deleteBook(data, token);
        expect(res2.status()).toBe(400);
        const body = await res2.json();
        expect(body).toHaveProperty('code','1206');
        expect(body.message).toContain("ISBN supplied is not available in User's Collection!");
    });

});