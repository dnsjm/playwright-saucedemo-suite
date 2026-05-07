import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export type SortOption =
  | 'az'
  | 'za'
  | 'lohi'
  | 'hilo';

export class InventoryPage extends BasePage {
  readonly url = '/inventory.html';

  readonly title: Locator;
  readonly sortDropdown: Locator;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly burgerMenu: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.burgerMenu = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async addItemToCart(itemName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.getByRole('button', { name: /add to cart/i }).click();
  }

  async removeItemFromCart(itemName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.getByRole('button', { name: /remove/i }).click();
  }

  async getCartCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      return Number(await this.cartBadge.textContent());
    }
    return 0;
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
    return priceTexts.map((p) => Number(p.replace('$', '')));
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async logout(): Promise<void> {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Products');
  }
}
