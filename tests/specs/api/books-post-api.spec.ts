import {test, expect } from "../../fixtures";
import booksData from '../../data/book-data';

const ENV_INDEX  = '1';
const ENV_USER = process.env[`USERNAME_${ENV_INDEX}`]!;
const ENV_PWD  = process.env.PASSWORD!;
const ENV_USERID = process.env[`USERID_${ENV_INDEX}`]!;
test.describe('Book API - Post requests', () => {
    let userId: string;
    let token: string;

    test.beforeAll(async ({ accountApi }) => {
      const res = await accountApi.generateToken({ userName: ENV_USER, password: ENV_PWD });
      //console.log(res);
      const body = await res.json();
      token = body.token;
      userId = ENV_USERID;
      
    });

    test.beforeEach(async ({ bookApi }) => {
      await bookApi.clearBooks(userId, token);
    });

    test.afterEach(async ({ bookApi }) => {
      await bookApi.clearBooks(userId, token);
    });


    test('B02 @smoke Add a book with valid ISBN and token', async ({ bookApi }) => {
        const len  = booksData.books.length;
        const data = {
            userId,
            collectionOfIsbns: [
                { isbn: booksData.books[Math.floor(Math.random() * len)].isbn },
                { isbn: booksData.books[Math.floor(Math.random() * len)].isbn },
            ]
        }
        const res = await bookApi.addBooks(data, token);
        expect(res.status()).toBe(201);
        expect(res.statusText()).toBe('Created');
    });

    test('B03 Add a book with duplicate ISBN, expect 400', async ({ bookApi }) => {
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
        const badToken = 'invalid-token';
        const data = {
            userId,
            collectionOfIsbns: [
                { isbn: booksData.books[1].isbn },
                { isbn: booksData.books[2].isbn },
            ]
        }
        const res = await bookApi.addBooks(data, badToken);
        expect(res.status()).toBe(401);
        expect(res.statusText()).toBe('Unauthorized');
    });

    test('B05 Add a book invalid ISBN, expect 400', async ({ bookApi }) => {
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