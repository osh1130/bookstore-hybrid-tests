import {test, expect } from "../../fixtures";
import booksData from '../../data/book-data';
import { addBookAndVerify, addBooksAndDelete } from "../../api/requests/bookRequests";

const ENV_INDEX  = '0';
const ENV_USER = process.env[`USERNAME_${ENV_INDEX}`]!;
const ENV_PWD  = process.env.PASSWORD!;
const ENV_USERID = process.env[`USERID_${ENV_INDEX}`]!;

test.describe('End-to-end process type testing', () => {
    let userId: string;
    let token: string;
        
    test.beforeAll(async ({ accountApi }) => {
              const res = await accountApi.generateToken({ userName: ENV_USER, password: ENV_PWD });
              const body = await res.json();
              token = body.token;
              userId = ENV_USERID;
              
    });

    test('B022 @smoke FLOW_Add_Then_Get', async ({ request }) => {
        const Isbn = '9781449325862';
        await addBookAndVerify(request,userId,Isbn,token);
    });

    test('B023 @smoke FLOW_Add_Then_Delete', async ({ request }) => {
        const Isbn = '9781449325862';
        const body = await addBooksAndDelete(request,userId,Isbn,token);
        expect(body.books).toBeDefined();
        // none of the books should match the ISBN
        expect(body.books.every((b: any) => b.isbn !== body)).toBeTruthy();
    });
});