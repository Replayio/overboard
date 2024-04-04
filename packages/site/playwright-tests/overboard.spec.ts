import { test, expect, Page } from '@playwright/test';

async function selectColor(page: Page, color: "blue" | "green" | "red") {
  await page.locator(`[data-cy=${color}]`).click();
}

async function addToCart(page: Page) {
  await page.locator(`[data-cy=AddToCartButton]`).click();
}

async function verifyAddToCartDidNotFail(page) {
  const errorElement = await page.locator('[data-cy=AddToCartButtonError]');
  await expect(errorElement).toHaveCount(0);
}

test('select color', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await selectColor(page, "blue")
  await selectColor(page, "green")
});

test('can buy board', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await selectColor(page, "blue")
  await selectColor(page, "green")
  await selectColor(page, "blue")
  await addToCart(page)

  // Wait for any potential network requests or changes after clicking the button
  await page.waitForTimeout(1_000);
  await verifyAddToCartDidNotFail(page);
});