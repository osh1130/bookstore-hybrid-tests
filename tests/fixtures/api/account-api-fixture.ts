import { APIResponse } from '@playwright/test';
import * as AccountAPI from '../../api/endpoints/account';


export type AccountApiFixture = {
  accountApi: {
    registerUser(user: any): Promise<APIResponse>;
    generateToken(user: any): Promise<APIResponse>;
  };
};


export const accountFixtures = {
  accountApi: async ({ request }, use) => {
    const wrapped = {
      registerUser: (user: any) => AccountAPI.registerUser(request, user),
      generateToken: (user: any) => AccountAPI.generateToken(request, user),
    };
    await use(wrapped);
  },
};
