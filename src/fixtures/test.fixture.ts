import { test as base } from '@playwright/test';
import { HeaderComponent } from '@components/header.component';
import { HomePage } from '@pages/home.page';

type Fixtures = {
  homePage: HomePage;
  headerComponent: HeaderComponent;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  headerComponent: async ({ page }, use) => {
    const headerComponent = new HeaderComponent(page);
    await use(headerComponent);
  },
});

export { expect } from '@playwright/test';
