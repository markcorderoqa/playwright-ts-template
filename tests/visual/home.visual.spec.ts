import { test } from '@fixtures/test.fixture';
import { expectStableSnapshot } from '@assertions/visual';

test.describe('Visual checks @visual', () => {
  test('home main content remains visually stable', async ({ page, homePage }) => {
    await homePage.visit();
    await homePage.header.assertVisible();
    await homePage.assertStartPracticingVisible();
    await test.info().attach('visual-rule', {
      body: 'Snapshot is scoped to main after stable header/CTA checks, with dynamic regions masked and animations disabled.',
      contentType: 'text/plain',
    });
    await expectStableSnapshot(page, page.locator('main'), {
      name: 'home-main-stable.png',
      mask: [page.getByRole('img')],
      maxDiffPixelRatio: 0.02,
    });
  });
});
