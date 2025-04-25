import { test as base, request, type APIRequestContext, type BrowserContext } from '@playwright/test';
import ProfilePage from '../../ui/pages/profile-page';
import * as AccountAPI from '../../api/endpoints/account';

export type UserFixtures = {
  userProfile: ProfilePage;
  userApi: APIRequestContext;
};

export const userFixture: Partial<Record<keyof UserFixtures, any>> = {
  userProfile: async ({ browser }, use) => {
    const context: BrowserContext = await browser.newContext({ storageState: '.auth/user.json' });
    const page = await context.newPage();
    const profilePage = new ProfilePage(page);

    await use(profilePage);
    await context.close();
  },

  userApi: async ({ request }, use) => {
    const res = await AccountAPI.generateToken(request, { userName: process.env.USERNAME_USER!, password: process.env.PASSWORD! });
    const { token } = await res.json();

    const authedRequest = await request.newContext({
      baseURL: process.env.API_BASE_URL!,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    await use(authedRequest);
    await authedRequest.dispose();
  }
};
