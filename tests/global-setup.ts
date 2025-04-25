import { chromium } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

async function loginAndSaveState(username: string, password: string, filePath: string) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(process.env.API_BASE_URL! + '/login');
  await page.fill('#userName', username);
  await page.fill('#password', password);
  await page.click('#login');
  await page.waitForURL(/.*profile/);

  await context.storageState({ path: filePath });
  await browser.close();
}

async function globalSetup() {
  await loginAndSaveState(process.env.USERNAME_USER!, process.env.PASSWORD!, '.auth/user.json');
  await loginAndSaveState(process.env.ADMIN_USERNAME!, process.env.PASSWORD!, '.auth/admin.json');
}

export default globalSetup;
