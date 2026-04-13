import { expect, type Locator, type Page } from '@playwright/test';

type VisualSnapshotOptions = {
  name: string;
  maxDiffPixelRatio?: number;
  mask?: Locator[];
};

export async function expectStableSnapshot(
  page: Page,
  target: Locator,
  options: VisualSnapshotOptions,
): Promise<void> {
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(target).toHaveScreenshot(options.name, {
    mask: options.mask,
    maxDiffPixelRatio: options.maxDiffPixelRatio ?? 0.02,
    animations: 'disabled',
  });
}
