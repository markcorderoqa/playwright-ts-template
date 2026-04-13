export const locatorPolicy = {
  preferredOrder: ['getByRole', 'getByLabel', 'getByTestId', 'css as last resort'],
  banList: ['page.waitForTimeout', 'page.$', 'page.$$', 'nth-child heavy selectors', 'xpath selectors'],
  bannedPatterns: ['waitForTimeout(', 'nth-child', 'locator("xpath=', "locator('xpath=", 'page.$(', 'page.$$('],
} as const;
