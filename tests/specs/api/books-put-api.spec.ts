import { userHasBook } from "../../utils/assertHelpers";
import {test, expect } from "../../fixtures";
import booksData from '../../data/book-data';


test.describe.serial('Book API - Put requests', () => {
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
      
    test('B12 @smoke Replace users current book with another ISBN', async ({ bookApi, accountApi }) => {
        token = process.env.APITOKEN!;
        userId = process.env.USERID!;
        const oldisbn = '9781449325862';
        const data = {
            userId,
            isbn: '9781449337711',
            
        }
        const res = await bookApi.putBook(oldisbn, data, token);
        expect(res.status()).toBe(200);
        
        const resuser = await accountApi.getUser(userId, token);
        const json = await resuser.json();
        userHasBook(json, data.isbn);
    });

});