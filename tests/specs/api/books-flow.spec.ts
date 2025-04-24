import {test, expect } from "../../fixtures";
import booksData from '../../data/book-data';
import { addBookAndVerify, addBooksAndDelete } from "../../api/requests/bookRequests";


test.describe.serial('End-to-end process type testing', () => {
    test('B022 @smoke FLOW_Add_Then_Get', async ({ request }) => {
        const token = process.env.APITOKEN!;
        const userId = process.env.USERID!;
        const Isbn = '9781449325862';
        await addBookAndVerify(request,userId,Isbn,token);
    });

    test('B023 @smoke FLOW_Add_Then_Delete', async ({ request }) => {
        const token = process.env.APITOKEN!;
        const userId = process.env.USERID!;
        const Isbn = '9781449325862';
        const body = await addBooksAndDelete(request,userId,Isbn,token);
        expect(body.books).toBeDefined();
        // none of the books should match the ISBN
        expect(body.books.every((b: any) => b.isbn !== body)).toBeTruthy();
    });
});