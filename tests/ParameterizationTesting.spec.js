import { test, expect } from '@playwright/test';
//const { test, expect } = require('@playwright/test');

// Array of inputs
const loginData = [
  { email: 'user_1761375575637@example.com', password: 'Password123!' },
  { email: 'user_1761588492770@example.com', password: 'Password123!' },
  { email: 'user_1761213461218@example1.com', password: 'Password123!' },
];

// Run the same test for each set of inputs
loginData.forEach(({ email, password }) => {
  test(`Login test with ${email}`, async ({ page }) => {
    await page.goto('https://automationexercise.com/login');

    // Wait for the popup and click "Consent" if it appears
  const consentButton = page.locator('button:has-text("Consent")');
  if (await consentButton.isVisible({ timeout: 5000 })) {
    await consentButton.click();
  }
    await page.fill('input[data-qa="login-email"]', email);
    await page.fill('input[data-qa="login-password"]', password);
    await page.click('button[data-qa="login-button"]');
    await expect(page.locator('a[href="/logout"]')).toContainText('Logout');
  });
});

//Note: 
//Parameterization means:
//Running the same test multiple times with different input data — automatically.