import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly url = '/cart.html';

  readonly title: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Your Cart');
  }

  async itemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async hasItem(itemName: string): Promise<boolean> {
    return (await this.cartItems.filter({ hasText: itemName }).count()) > 0;
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
