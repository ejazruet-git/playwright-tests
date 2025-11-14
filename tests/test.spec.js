import { test, expect } from '@playwright/test';

test('Intentional failure test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle('ThisWillFail'); // Wrong title on purpose
});