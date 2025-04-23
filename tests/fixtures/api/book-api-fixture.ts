import { APIResponse } from '@playwright/test';
import * as BookAPI from '../../api/endpoints/book';


export type BookApiFixture = {
  bookApi: {
    getBook(isbn: string): Promise<APIResponse>;
    addBooks(data: any, token: string): Promise<APIResponse>;
    deleteBook(data: any, token: string): Promise<APIResponse>;
    clearBooks(userId: string, token: string): Promise<APIResponse>;
  };
};


export const bookFixtures = {
    bookApi: async ({ request }, use) => {
    const wrapped = {
      getBook: (isbn: string) => BookAPI.getBook(request, isbn),
      addBooks: (data: any, token: string) => BookAPI.addBooks(request, data,token),
      deleteBook: (data: any, token: string) => BookAPI.deleteBook(request, data, token),
      clearBooks: (userId: string, token: string) => BookAPI.clearBooks(request, userId, token),
    };
    await use(wrapped);
  },
};