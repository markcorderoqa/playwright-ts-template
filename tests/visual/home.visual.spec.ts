import { test } from '@fixtures/test.fixture';
import { expectStableSnapshot } from '@assertions/visual';

test.describe('Visual checks @visual', () => {
  test('facebook home remains visually stable', async ({ page }) => {
    await page.goto('https://www.facebook.com/', { waitUntil: 'domcontentloaded' });
    await test.info().attach('visual-rule', {
      body: 'Snapshot is scoped to body on facebook.com, with dynamic regions masked and animations disabled.',
      contentType: 'text/plain',
    });
    await expectStableSnapshot(page, page.locator('body'), {
      name: 'facebook-home-stable.png',
      mask: [page.locator('iframe'), page.getByRole('img')],
      maxDiffPixelRatio: 0.2,
    });
  });
});
