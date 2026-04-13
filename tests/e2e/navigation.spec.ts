import { test } from '@fixtures/test.fixture';

test.describe('Navigation flow', () => {
  test('user can move from home to practice area', async ({ homePage }) => {
    await test.step('Given user opens the QA Playground home page', async () => {
      await homePage.visit();
    });

    await test.step('When user navigates to Practice Elements from header', async () => {
      await homePage.openPracticeElementsFromHeader();
    });

    await test.step('Then user lands on the practice/elements experience', async () => {
      await homePage.assertOnPracticeExperience();
    });
  });
});
