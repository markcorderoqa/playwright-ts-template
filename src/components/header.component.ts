import { expect, type Locator, type Page } from '@playwright/test';

export class HeaderComponent {
  readonly logo: Locator;
  readonly practiceElementsLink: Locator;

  constructor(private readonly page: Page) {
    this.logo = this.page.getByRole('link', { name: /QA PlayGround/i }).first();
    this.practiceElementsLink = this.page.getByRole('link', { name: /Practice Elements/i }).first();
  }

  async openPracticeElements(): Promise<void> {
    await this.practiceElementsLink.click();
  }

  async assertVisible(): Promise<void> {
    await expect(this.logo).toBeVisible();
    await expect(this.practiceElementsLink).toBeVisible();
  }
}
