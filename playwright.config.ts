import { defineConfig } from '@playwright/test';
import { env } from '@config/env';
import { createProjects } from '@config/projects';

const isCI = Boolean(env.CI);

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
    },
  },
  fullyParallel: true,
  forbidOnly: isCI,
  retries: 0,
  workers: isCI ? 2 : undefined,
  maxFailures: isCI ? 10 : undefined,
  outputDir: 'test-results/artifacts',
  reporter: [['html', { open: 'never' }], ['list'], ['junit', { outputFile: 'test-results/junit.xml' }]],
  use: {
    baseURL: env.BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: createProjects(),
});
