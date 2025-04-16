import { test as base, type PlaywrightTestArgs } from '@playwright/test';
import { accountFixtures, type AccountApiFixture } from './api/account-api-fixture';

type MyFixtures = PlaywrightTestArgs & AccountApiFixture;

export const test = base.extend<MyFixtures>({
  ...accountFixtures,
});

export const expect = test.expect;
