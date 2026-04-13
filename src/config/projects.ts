import { devices, type PlaywrightTestConfig } from '@playwright/test';
import { env } from '@config/env';

export function createProjects(): PlaywrightTestConfig['projects'] {
  const isCI = Boolean(env.CI);
  const visualProjectName = isCI ? 'visual-linux' : `visual-${process.platform}`;

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
      name: visualProjectName,
      grep: /@visual/,
      retries: 0,
      fullyParallel: false,
      workers: 1,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1,
        colorScheme: 'light',
        locale: 'en-US',
        timezoneId: 'UTC',
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
