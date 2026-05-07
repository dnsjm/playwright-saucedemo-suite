import { test, expect } from '../../fixtures/test-fixtures';

/**
 * Visual regression tests.
 *
 * On first run these will fail and create baseline snapshots in
 * tests/regression/visual.spec.ts-snapshots/. Subsequent runs compare
 * against the baseline. Use `--update-snapshots` to refresh.
 */
test.describe('Visual regression @regression', () => {
  test('login page matches baseline', async ({ loginPage, page }) => {
    await loginPage.goto();
    await expect(page).toHaveScreenshot('login.png', {
      maxDiffPixelRatio: 0.02,
      fullPage: true,
    });
  });

  test('inventory page matches baseline', async ({ loggedIn, page }) => {
    await loggedIn.expectLoaded();
    await expect(page).toHaveScreenshot('inventory.png', {
      maxDiffPixelRatio: 0.02,
      fullPage: true,
    });
  });
});
