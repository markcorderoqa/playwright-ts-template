import type { Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export async function waitForVisible(locator: Locator): Promise<void> {
  await expect(locator).toBeVisible();
}
