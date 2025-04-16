import { test as base } from '@playwright/test';
import { createUser } from '../../api/requests/accountRequests';
import { DEFAULT_PASSWORD } from '../../utils/constants';

export const test = base.extend<{
  testUser: {
    userID: string;
    username: string;
    password: string;
    token: string;
  };
}>({
  testUser: async ({ request }, use) => {
    const user = {
        userName: `user_${Date.now()}`,
        password: DEFAULT_PASSWORD,
      };
    const { userID, token } = await createUser(request, user);
    const context = {
        userID,
        username: user.userName,
        password: user.password,
        token,
      };
    await use(context);
  },
});
