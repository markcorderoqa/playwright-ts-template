import { test } from '@fixtures/test.fixture';
import { expectNoCriticalA11yViolations, runA11yScan } from '@assertions/a11y';

test.describe('Accessibility checks @a11y', () => {
  test('home has no critical axe violations', async ({ page, homePage }) => {
    await homePage.visit();
    await homePage.assertLoaded();

    const scanSummary = await runA11yScan(page, {
      include: ['main'],
      impacts: ['serious', 'critical'],
    });

    await test.info().attach('a11y-scope', {
      body: 'Scoped to main region for stable and meaningful baseline checks.',
      contentType: 'text/plain',
    });
    await test.info().attach('a11y-scan-summary', {
      body: JSON.stringify(scanSummary, null, 2),
      contentType: 'application/json',
    });

    await expectNoCriticalA11yViolations(page, {
      include: ['main'],
    });
  });
});
