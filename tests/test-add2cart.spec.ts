import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/login');
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('user_1761375575637@example.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Password123!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: ' Products' }).click();
  await page.getByRole('textbox', { name: 'Search Product' }).click();
  await page.getByRole('textbox', { name: 'Search Product' }).fill('Stylish Dress');
  await page.getByRole('button', { name: '' }).click();
  await page.goto('https://automationexercise.com/products?search=Stylish%20Dress');
  await page.getByText('Add to cart').nth(1).click();
  await page.waitForTimeout(5000);
  await page.getByRole('link', { name: ' Cart' }).click();
  await page.waitForTimeout(5000);
});