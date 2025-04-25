import { type Page, type Locator , expect, type BrowserContext } from '@playwright/test';
import bookList from '../../data/book-data';

class ProfilePage {
  readonly page: Page;

  readonly notLoggedInLabel: Locator;
  readonly userNameLabel: Locator;

  readonly searchField: Locator;
  readonly titleHeaderLabel: Locator;

//   readonly bookAdminLabel: Locator;
//   readonly booksCollectionRequestRegExp: RegExp;
//   readonly bookUserLabel: Locator;
//   readonly gridRow1: Locator;
//   readonly gridRow2: Locator;
  
  
  
  constructor(page: Page) {
    this.page = page;
    
    this.userNameLabel = page.locator('#userName-value')
    this.notLoggedInLabel = page.getByText('Currently you are not logged into the Book Store application, please visit the login page to enter or register page to register yourself.');

    // this.bookAdminLabel = page.getByText('Eloquent JavaScript, Second Edition');
    // this.booksCollectionRequestRegExp = new RegExp(apiPaths.account);
    // this.gridRow1 = page.locator('div:nth-child(1) > .rt-tr > div:nth-child(2)').last();
    // this.gridRow2 = page.locator('div:nth-child(2) > .rt-tr > div:nth-child(2)');
    
    this.searchField = page.getByPlaceholder('Type to search');
    this.titleHeaderLabel = page.getByText('Title');
  }

  async checkLoggedIn() {
    await expect(this.notLoggedInLabel).not.toBeVisible();
    await expect(this.userNameLabel).toBeVisible();
  }

  async getUserName() {
    return this.userNameLabel.textContent();
  }

  async fillSearchField(q: string) {
    await this.searchField.fill(q);
  }

  async checkSearchResult(q: string, items: string) {
  }

  async checkBooksList() {
    for (const book of bookList.books){
      await expect(this.page.getByRole('link', { name: book.title })).toBeVisible();
    }
  }

  async sortBooksList() {
    await this.titleHeaderLabel.click({ clickCount: 2 });
  }


//   async checkLoggedInAdmin() {
//     await expect(this.notLoggedInLabel).not.toBeVisible();
//     await expect(this.bookAdminLabel).toBeVisible();
//   }

//   async checkSort() {
//     await expect(this.gridRow1).toContainText(bookList.books[1].title);
//     await expect(this.gridRow2).toContainText(bookList.books[0].title);
//   }

  async getBooksList() {
  }

//   async mockBooksListResponse(context: BrowserContext) {
//     await context.route(this.booksCollectionRequestRegExp, (route) => route.fulfill({
//       body: JSON.stringify({...(bookList)})
//     }));
//   }
}

export default ProfilePage;