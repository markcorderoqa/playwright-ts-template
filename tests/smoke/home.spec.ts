import { test } from '@fixtures/test.fixture';

test.describe('Home page smoke', () => {
  test('loads core hero content @smoke', async ({ homePage }) => {
    await homePage.visit();
    await homePage.assertLoaded();
    await homePage.assertStartPracticingVisible();
  });
});
