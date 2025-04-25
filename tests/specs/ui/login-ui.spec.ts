import {test} from '../../fixtures';

test.describe('Login Flow', () => {
  test('should log in successfully and reach book list page', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.doLogin(process.env.USERNAME_USER!, process.env.PASSWORD!);
    await loginPage.checkLoggedIn();

    // ✅ 验证 URL 是否跳转成功
    //await expect(page).toHaveURL(/.*profile/);

    // ✅ 验证“未登录”提示不应出现
    //await bookListPage.checkLoggedIn();

    // ✅ 验证用户图书是否可见（可选）
    // await bookListPage.checkBooksList();

    // ✅ 验证用户名（如果页面上显示）
    // const username = await bookListPage.getUserName();
    // expect(username).toBe('vivi');
  });
});
