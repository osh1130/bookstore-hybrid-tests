import { test as base, type PlaywrightTestArgs } from '@playwright/test';
import { accountFixtures, type AccountApiFixture } from './api/account-api-fixture';
import { bookFixtures, type BookApiFixture } from './api/book-api-fixture';
import { userFixture, type UserFixtures } from './roles/user-fixture'
import { pageFixtures, type PageFixtures } from './ui/page-fixtures'

type MyFixtures = PlaywrightTestArgs & AccountApiFixture& BookApiFixture&UserFixtures& PageFixtures;

export const test = base.extend<MyFixtures>({
  ...accountFixtures,
  ...bookFixtures,
  ...userFixture,
  ...pageFixtures,
});

export const expect = test.expect;
