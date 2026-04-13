import { test, expect } from '@fixtures/test.fixture';
import { buildStudyResource } from '@data/factories';
import { QaPlaygroundClient } from '@api/qa-playground.client';
import { env } from '@config/env';

test.describe('Hybrid API + UI checks', () => {
  test('API precheck then validate UI render', async ({ homePage }) => {
    const resource = buildStudyResource();
    test.info().annotations.push({
      type: 'data',
      description: `title=${resource.title};noteLength=${resource.note.length}`,
    });

    await test.step('Given API health endpoint is reachable', async () => {
      const client = new QaPlaygroundClient(env.BASE_URL);
      try {
        await client.init();
        const response = await client.getHomePage();
        expect(response.status).toBe(200);
        expect(response.contentType).toContain('text/html');
      } finally {
        await client.dispose();
      }
    });

    await test.step('When user opens the home page', async () => {
      await homePage.visit();
    });

    await test.step('Then core home content is visible', async () => {
      await homePage.assertLoaded();
    });
  });
});
