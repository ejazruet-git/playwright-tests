import { test as setup } from '@playwright/test';

setup('login with email & password stored in json file and save state', async ({ page }) => {
  await page.goto('https://automationexercise.com/login');

  // Wait for the popup and click "Consent" if it appears
  const consentButton = page.locator('button:has-text("Consent")');
  if (await consentButton.isVisible({ timeout: 5000 })) {
    await consentButton.click();
  }  
  await page.fill('input[data-qa="login-email"]', 'user_1761213461218@example.com');
  await page.fill('input[data-qa="login-password"]', 'Password123!');
  await page.click('button[data-qa="login-button"]');
  await page.context().storageState({ path: 'tests/setup/storageState.json' });

   
});