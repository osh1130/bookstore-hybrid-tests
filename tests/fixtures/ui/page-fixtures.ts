import LoginPage from '../../ui/pages/login-page';
import ProfilePage from '../../ui/pages/profile-page';

export type PageFixtures = {
  loginPage: LoginPage;
  profilePage: ProfilePage;
};

export const pageFixtures: Partial<Record<keyof PageFixtures, any>> = {
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  profilePage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: '.auth/user.json' });
    const page = await context.newPage();
    const profilePage = new ProfilePage(page);

    await use(profilePage);
    await context.close();
  }
};
