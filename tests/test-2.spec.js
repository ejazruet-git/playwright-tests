import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/login');
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('user_1761375575@example.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Password123!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: ' Products' }).click();
  await page.getByRole('textbox', { name: 'Search Product' }).click();
  await page.getByRole('textbox', { name: 'Search Product' }).fill('Stylish Dress');
  //await page.getByRole('textbox', { name: 'Search Product' }).press('Enter');
  await page.getByRole('button', { name: '' }).click();
  await page.getByText('Add to cart').nth(1).click();
  await page.getByRole('link', { name: 'View Cart' }).click();
  
});