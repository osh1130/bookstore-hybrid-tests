import { test as base, type PlaywrightTestArgs } from '@playwright/test';
import { accountFixtures, type AccountApiFixture } from './api/account-api-fixture';
import { bookFixtures, type BookApiFixture } from './api/book-api-fixture';

type MyFixtures = PlaywrightTestArgs & AccountApiFixture& BookApiFixture;

export const test = base.extend<MyFixtures>({
  ...accountFixtures,
  ...bookFixtures,
});

export const expect = test.expect;
