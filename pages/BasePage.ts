import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage — common behavior shared by every page object.
 * Keeps individual page classes lean and consistent.
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  abstract readonly url: string;

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async expectUrlContains(fragment: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(fragment));
  }

  async waitForReady(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }
}
