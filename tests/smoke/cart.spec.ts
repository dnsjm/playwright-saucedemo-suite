import { test, expect } from '../../fixtures/test-fixtures';
import { PRODUCTS } from '../../fixtures/users';

test.describe('Cart @smoke', () => {
  test('add a single item updates the cart badge', async ({ loggedIn }) => {
    await loggedIn.addItemToCart(PRODUCTS.backpack);
    expect(await loggedIn.getCartCount()).toBe(1);
  });

  test('adding multiple items reflects accurate count', async ({ loggedIn }) => {
    await loggedIn.addItemToCart(PRODUCTS.backpack);
    await loggedIn.addItemToCart(PRODUCTS.bikeLight);
    await loggedIn.addItemToCart(PRODUCTS.fleece);
    expect(await loggedIn.getCartCount()).toBe(3);
  });

  test('removing an item from inventory decrements the cart badge', async ({ loggedIn }) => {
    await loggedIn.addItemToCart(PRODUCTS.backpack);
    await loggedIn.addItemToCart(PRODUCTS.bikeLight);
    await loggedIn.removeItemFromCart(PRODUCTS.backpack);
    expect(await loggedIn.getCartCount()).toBe(1);
  });

  test('cart page lists exactly the items added', async ({ loggedIn, cartPage }) => {
    await loggedIn.addItemToCart(PRODUCTS.backpack);
    await loggedIn.addItemToCart(PRODUCTS.onesie);
    await loggedIn.openCart();
    await cartPage.expectLoaded();

    expect(await cartPage.itemCount()).toBe(2);
    expect(await cartPage.hasItem(PRODUCTS.backpack)).toBe(true);
    expect(await cartPage.hasItem(PRODUCTS.onesie)).toBe(true);
  });
});
