import { test, expect } from '../../fixtures/test-fixtures';
import { PRODUCTS, SHIPPING_INFO } from '../../fixtures/users';

test.describe('Checkout flow @regression', () => {
  test('happy path: user can complete a full purchase', async ({
    loggedIn,
    cartPage,
    checkoutPage,
  }) => {
    await loggedIn.addItemToCart(PRODUCTS.backpack);
    await loggedIn.addItemToCart(PRODUCTS.bikeLight);
    await loggedIn.openCart();
    await cartPage.checkout();

    await checkoutPage.fillShippingInfo(
      SHIPPING_INFO.firstName,
      SHIPPING_INFO.lastName,
      SHIPPING_INFO.postalCode,
    );
    await checkoutPage.continueToOverview();
    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderComplete();
  });

  test('checkout requires first name', async ({ loggedIn, cartPage, checkoutPage }) => {
    await loggedIn.addItemToCart(PRODUCTS.backpack);
    await loggedIn.openCart();
    await cartPage.checkout();

    await checkoutPage.fillShippingInfo('', SHIPPING_INFO.lastName, SHIPPING_INFO.postalCode);
    await checkoutPage.continueToOverview();
    await checkoutPage.expectErrorContains('First Name is required');
  });

  test('checkout requires last name', async ({ loggedIn, cartPage, checkoutPage }) => {
    await loggedIn.addItemToCart(PRODUCTS.backpack);
    await loggedIn.openCart();
    await cartPage.checkout();

    await checkoutPage.fillShippingInfo(SHIPPING_INFO.firstName, '', SHIPPING_INFO.postalCode);
    await checkoutPage.continueToOverview();
    await checkoutPage.expectErrorContains('Last Name is required');
  });

  test('checkout requires postal code', async ({ loggedIn, cartPage, checkoutPage }) => {
    await loggedIn.addItemToCart(PRODUCTS.backpack);
    await loggedIn.openCart();
    await cartPage.checkout();

    await checkoutPage.fillShippingInfo(SHIPPING_INFO.firstName, SHIPPING_INFO.lastName, '');
    await checkoutPage.continueToOverview();
    await checkoutPage.expectErrorContains('Postal Code is required');
  });

  test('cart contents persist into checkout overview', async ({
    loggedIn,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await loggedIn.addItemToCart(PRODUCTS.fleece);
    await loggedIn.openCart();
    await cartPage.checkout();
    await checkoutPage.fillShippingInfo(
      SHIPPING_INFO.firstName,
      SHIPPING_INFO.lastName,
      SHIPPING_INFO.postalCode,
    );
    await checkoutPage.continueToOverview();

    await expect(page.locator('.cart_item').filter({ hasText: PRODUCTS.fleece })).toBeVisible();
  });
});
