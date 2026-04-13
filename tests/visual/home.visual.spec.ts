import { test } from '@fixtures/test.fixture';
import { expectStableSnapshot } from '@assertions/visual';

test.describe('Visual checks @visual', () => {
  test('example home remains visually stable', async ({ page }) => {
    await page.goto('https://example.com/', { waitUntil: 'domcontentloaded' });
    await test.info().attach('visual-rule', {
      body: 'Snapshot is scoped to body on example.com, with animations disabled.',
      contentType: 'text/plain',
    });
    await expectStableSnapshot(page, page.locator('body'), {
      name: 'example-home-stable.png',
      maxDiffPixelRatio: 0.02,
    });
  });
});
