import { type APIRequestContext, request } from '@playwright/test';

export type HttpGetResult = {
  status: number;
  ok: boolean;
  url: string;
  contentType: string | null;
  bodyText: string;
};

export class QaPlaygroundClient {
  private context?: APIRequestContext;

  constructor(private readonly baseUrl: string) {}

  async init(): Promise<void> {
    this.context = await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: {
        Accept: 'text/html,application/xhtml+xml',
      },
    });
  }

  private getContextOrThrow(): APIRequestContext {
    if (!this.context) {
      throw new Error('API context is not initialized');
    }
    return this.context;
  }

  async get(path: string): Promise<HttpGetResult> {
    const context = this.getContextOrThrow();
    const response = await context.get(path);
    return {
      status: response.status(),
      ok: response.ok(),
      url: response.url(),
      contentType: response.headers()['content-type'] ?? null,
      bodyText: await response.text(),
    };
  }

  async getHomeStatus(): Promise<number> {
    const response = await this.get('/');
    return response.status;
  }

  async getHomePage(): Promise<HttpGetResult> {
    return this.get('/');
  }

  async dispose(): Promise<void> {
    await this.context?.dispose();
  }
}
