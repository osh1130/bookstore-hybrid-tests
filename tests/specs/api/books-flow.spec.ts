import { getBooks } from "../../api/endpoints/book";
import {test, expect } from "../../fixtures";
import booksData from '../../data/book-data';


test.describe('End-to-end process type testing', () => {
    test('B022 @smoke list all books in bookstore', async ({ request }) => {
        const res = await getBooks(request);
        expect(res.status()).toBe(200);
        expect(res.statusText()).toBe('OK');
    });
});