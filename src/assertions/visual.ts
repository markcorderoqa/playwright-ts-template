import { expect, type Locator, type Page } from '@playwright/test';

/**
 * Options for reusable visual assertions.
 *
 * - `name`: snapshot file name.
 * - `maxDiffPixelRatio`: tolerated visual drift before failure.
 * - `mask`: dynamic regions to exclude from comparison.
 * - `waitForReady`: optional project-specific readiness hook that runs
 *   before taking the screenshot.
 */
type VisualSnapshotOptions = {
  name: string;
  maxDiffPixelRatio?: number;
  mask?: Locator[];
  waitForReady?: (context: { page: Page; target: Locator }) => Promise<void>;
};

export async function expectStableSnapshot(
  page: Page,
  target: Locator,
  options: VisualSnapshotOptions,
): Promise<void> {
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(target).toBeVisible();
  await (options.waitForReady ?? waitForDefaultVisualReadiness)({ page, target });

  await expect(target).toHaveScreenshot(options.name, {
    mask: options.mask,
    maxDiffPixelRatio: options.maxDiffPixelRatio ?? 0.02,
    animations: 'disabled',
  });
}

/**
 * Default visual readiness used by `expectStableSnapshot`.
 *
 * Example using defaults:
 * ```ts
 * await expectStableSnapshot(page, page.locator('main'), {
 *   name: 'home-main.png',
 * });
 * ```
 *
 * Example using project-specific readiness:
 * ```ts
 * await expectStableSnapshot(page, page.locator('main'), {
 *   name: 'landing-main.png',
 *   waitForReady: async ({ page }) => {
 *     await page.waitForLoadState('networkidle');
 *     await page.getByTestId('hero-loaded').waitFor({ state: 'visible' });
 *   },
 * });
 * ```
 */
async function waitForDefaultVisualReadiness(context: { page: Page; target: Locator }): Promise<void> {
  const { page, target } = context;
  // Prevent CI flakiness by waiting for fonts and in-scope images to settle.
  await page.evaluate(async () => {
    if ('fonts' in document) {
      await document.fonts.ready;
    }
  });
  const elementHandle = await target.elementHandle();
  if (elementHandle) {
    await page
      .waitForFunction(
        (element) => {
          const images = Array.from(element.querySelectorAll('img'));
          return images.every((img) => img.complete);
        },
        elementHandle,
        { timeout: 5_000 },
      )
      .catch(() => {
        // Best-effort wait only; some image endpoints are flaky in CI.
      });
  }
}
