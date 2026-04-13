import { devices, type PlaywrightTestConfig } from '@playwright/test';
import { env } from '@config/env';

export function createProjects(): PlaywrightTestConfig['projects'] {
  const isCI = Boolean(env.CI);

  return [
    {
      name: 'chromium-e2e',
      grepInvert: /@api|@visual|@a11y/,
      retries: isCI ? 2 : 1,
      workers: isCI ? 2 : undefined,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'api',
      grep: /@api/,
      retries: isCI ? 1 : 0,
      workers: isCI ? 2 : undefined,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'visual',
      grep: /@visual/,
      retries: 0,
      fullyParallel: false,
      workers: 1,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'a11y',
      grep: /@a11y/,
      retries: isCI ? 1 : 0,
      fullyParallel: false,
      workers: 1,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ];
}
