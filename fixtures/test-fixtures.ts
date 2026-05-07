import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { USERS } from './users';

/**
 * Custom Playwright fixtures.
 *
 * Provides ready-to-use page objects and a `loggedIn` fixture that
 * authenticates as the standard user — eliminates boilerplate from tests.
 */
type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  loggedIn: InventoryPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  loggedIn: async ({ page }, use) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    await login.goto();
    await login.login(USERS.standard.username, USERS.standard.password);
    await inventory.expectLoaded();
    await use(inventory);
  },
});

export { expect };
