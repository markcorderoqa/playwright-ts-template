import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '@components/header.component';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly header: HeaderComponent;
  readonly heroHeading: Locator;
  private readonly startPracticingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.heroHeading = page.getByRole('heading', { name: /Master Automation Testing With QA PlayGround/i });
    this.startPracticingButton = page.getByRole('link', { name: /Start Practicing/i }).first();
  }

  async visit(): Promise<void> {
    await this.goto('/');
  }

  async assertLoaded(): Promise<void> {
    await this.header.assertVisible();
    await expect(this.heroHeading).toBeVisible();
  }

  async openPracticeElementsFromHeader(): Promise<void> {
    await this.header.openPracticeElements();
  }

  async assertStartPracticingVisible(): Promise<void> {
    await expect(this.startPracticingButton).toBeVisible();
  }

  async assertOnPracticeExperience(): Promise<void> {
    await expect(this.page).toHaveURL(/practice|elements/i);
  }
}
