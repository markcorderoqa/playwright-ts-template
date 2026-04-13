import { test, expect } from '@playwright/test';
import { QaPlaygroundClient } from '@api/qa-playground.client';
import { env } from '@config/env';

test.describe('API health checks @api', () => {
  test('home page endpoint returns success status', async () => {
    const client = new QaPlaygroundClient(env.BASE_URL);
    try {
      await client.init();
      const status = await client.getHomeStatus();

      expect(status).toBeGreaterThanOrEqual(200);
      expect(status).toBeLessThan(400);
    } finally {
      await client.dispose();
    }
  });

  test('home page response contains html content-type and expected brand marker', async () => {
    const client = new QaPlaygroundClient(env.BASE_URL);
    try {
      await client.init();
      const response = await client.getHomePage();

      expect(response.ok).toBeTruthy();
      expect(response.contentType).toContain('text/html');
      expect(response.bodyText).toContain('QA PlayGround');
    } finally {
      await client.dispose();
    }
  });
});
