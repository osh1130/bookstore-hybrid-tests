import { userHasBook } from "../../utils/assertHelpers";
import {test, expect } from "../../fixtures";
import booksData from '../../data/book-data';

const ENV_INDEX  = '3';
const ENV_USER = process.env[`USERNAME_${ENV_INDEX}`]!;
const ENV_PWD  = process.env.PASSWORD!;
const ENV_USERID = process.env[`USERID_${ENV_INDEX}`]!;


test.describe('Book API - Put requests', () => {
    let userId: string;
    let token: string;
        
    test.beforeAll(async ({ accountApi }) => {
              const res = await accountApi.generateToken({ userName: ENV_USER, password: ENV_PWD });
              const body = await res.json();
              token = body.token;
              userId = ENV_USERID;
              
    });

    test.beforeEach(async ({ bookApi }) => {
      await bookApi.clearBooks(userId, token);
      const data = {
        userId,
        collectionOfIsbns: [{ isbn: '9781449325862' },{ isbn: '9781449331818' }]
      };
      const res = await bookApi.addBooks(data, token);
      expect(res.status()).toBe(201);
    });
      
    test('B12 @smoke Replace users current book with another ISBN', async ({ bookApi, accountApi }) => {
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