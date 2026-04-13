import { test } from '@fixtures/test.fixture';
import { expectStableSnapshot } from '@assertions/visual';

test.describe('Visual checks @visual', () => {
  test('home hero remains visually stable', async ({ page, homePage }) => {
    await homePage.visit();
    await homePage.assertLoaded();
    await test.info().attach('visual-rule', {
      body: 'Snapshot is scoped to main, with dynamic regions masked and animations disabled.',
      contentType: 'text/plain',
    });
    await expectStableSnapshot(page, page.locator('main'), {
      name: 'home-main-stable.png',
      mask: [page.getByRole('img')],
      maxDiffPixelRatio: 0.02,
    });
  });
});
