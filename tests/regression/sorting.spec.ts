import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Inventory sorting @regression', () => {
  test('sort by name A→Z returns alphabetically ascending products', async ({ loggedIn }) => {
    await loggedIn.sortBy('az');
    const names = await loggedIn.getProductNames();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  test('sort by name Z→A returns alphabetically descending products', async ({ loggedIn }) => {
    await loggedIn.sortBy('za');
    const names = await loggedIn.getProductNames();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  });

  test('sort by price low→high returns ascending prices', async ({ loggedIn }) => {
    await loggedIn.sortBy('lohi');
    const prices = await loggedIn.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('sort by price high→low returns descending prices', async ({ loggedIn }) => {
    await loggedIn.sortBy('hilo');
    const prices = await loggedIn.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
