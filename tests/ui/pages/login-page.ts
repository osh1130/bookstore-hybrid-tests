import { type Page, type Locator, expect } from '@playwright/test';

class LoginPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly messagePanel: Locator;
  readonly password: Locator;
  readonly userName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.messagePanel = page.locator('#output');
    this.password = page.getByPlaceholder('Password');
    this.userName = page.getByPlaceholder('UserName');
  }

  async goto() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.userName).toBeVisible();
  }

  async filluserName(userName: string) {
    await this.userName.fill(userName);
  }

  async fillPassword(password: string) {
    await this.password.fill(password);
  }

  async doLogin(userName: string, password: string) {
    await this.filluserName(userName);
    await this.fillPassword(password);
    await this.loginButton.click();
    await this.dismissAdIfPresent(); // ✅ 登录后广告处理
  }

  async checkLoggedIn() {
    await this.page.waitForURL(/.*profile/, { timeout: 5000 });
    const userNameLabel = this.page.locator('#userName-value');
    await expect(userNameLabel).toBeVisible();
  }

  async checkInvalidCredentials() {
    await expect(this.messagePanel).toHaveText('Invalid username or password!');
  }

  // ✅ 单独广告处理逻辑（无其他副作用）
  async dismissAdIfPresent() {
    const ad = this.page.locator('.ad-close, .popup-dismiss');
    if (await ad.isVisible({ timeout: 1000 }).catch(() => false)) {
      await ad.click();
      console.log('[Ad Closed]');
    }
  }
}

export default LoginPage;
