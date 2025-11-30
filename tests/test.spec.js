import { test, expect } from '@playwright/test';

test('Intentional failure test', async ({ page, browser }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle('Example Domain'); // Wrong title on purpose
  await browser.close();

});