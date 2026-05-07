import { test, expect } from '../../fixtures/test-fixtures';
import { USERS, INVALID_LOGINS } from '../../fixtures/users';

test.describe('Authentication @smoke', () => {
  test('standard user can log in successfully', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectLoaded();
  });

  test('locked-out user receives appropriate error', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);
    await loginPage.expectErrorContains(USERS.lockedOut.expectedError!);
  });

  test('logout returns user to login page', async ({ loggedIn, page }) => {
    await loggedIn.logout();
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });
});

test.describe('Login validation @regression', () => {
  for (const scenario of INVALID_LOGINS) {
    test(`rejects login: ${scenario.case}`, async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.login(scenario.username, scenario.password);
      await loginPage.expectErrorContains(scenario.expectedError);
    });
  }
});

test.describe('Performance @regression', () => {
  test('performance_glitch_user login completes within acceptable threshold', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    const start = Date.now();
    await loginPage.login(USERS.performanceGlitch.username, USERS.performanceGlitch.password);
    await inventoryPage.expectLoaded();
    const elapsed = Date.now() - start;

    // SauceDemo intentionally throttles this user. Anything over 10s is unacceptable
    // even with the simulated glitch — fail loudly so the team can investigate.
    expect(elapsed).toBeLessThan(10_000);
    test.info().annotations.push({
      type: 'performance',
      description: `Login took ${elapsed}ms`,
    });
  });
});
