import { APIResponse } from '@playwright/test';
import * as AccountAPI from '../../api/endpoints/account';

// 导出你的类型给外面用
export type AccountApiFixture = {
  accountApi: {
    registerUser(user: any): Promise<APIResponse>;
    generateToken(user: any): Promise<APIResponse>;
  };
};

// 不要给它写 Fixtures<…> 注解，交给 TS 自己推断
export const accountFixtures = {
  accountApi: async ({ request }, use) => {
    const wrapped = {
      registerUser: (user: any) => AccountAPI.registerUser(request, user),
      generateToken: (user: any) => AccountAPI.generateToken(request, user),
    };
    await use(wrapped);
  },
};
