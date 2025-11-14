import { test, expect, request } from '@playwright/test';
import fs from 'fs';
import path from 'path';


test('Create New User sending post requestaccount', async () => {
  const requestContext = await request.newContext();

  // 1️⃣ Generate a unique email
  const timestamp = Date.now();
  const email = `user_${timestamp}@example.com`;
  const password = 'Password123!';

  // 2️⃣ Send POST request to create account
  const response = await requestContext.post('https://automationexercise.com/api/createAccount', {
    form: {
      name: 'Test User',
      email: email,
      password: password,
      title: 'Mr',
      birth_date: '10',
      birth_month: '10',
      birth_year: '1990',
      firstname: 'Test',
      lastname: 'User',
      company: 'AutomationTest',
      address1: '123 Main St',
      address2: '',
      country: 'United States',
      zipcode: '10001',
      state: 'New York',
      city: 'New York',
      mobile_number: '1234567890'
    }
  });

  const result = await response.json();
  console.log('Create account response:', result);

  expect(response.ok()).toBeTruthy();

  // 3️⃣ Save email and password into a JSON file
  const userData = {
    email,
    password,
    createdAt: new Date().toISOString()
  };
  const filePath = path.join(process.cwd(), 'userData.json');
  fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));
  
  console.log(`✅ User credentials saved to ${filePath}`);
  await requestContext.dispose();

});

test('Login using saved credentials', async ({ page }) => {

  const userData = JSON.parse(fs.readFileSync('userData.json', 'utf-8'));
  await page.goto('https://automationexercise.com/login');

   // Wait for the popup and click "Consent" if it appears
  const consentButton = page.locator('button:has-text("Consent")');
  if (await consentButton.isVisible({ timeout: 5000 })) {
    await consentButton.click();
  }

  await page.fill('input[data-qa="login-email"]', userData.email);
  await page.fill('input[data-qa="login-password"]', userData.password);
  await page.click('button[data-qa="login-button"]');
  await expect(page.locator('text=Logout')).toBeVisible()
  await page.waitForTimeout(5000);

});

test('Add product to cart', async ({ page }) => {

  //const frame = page.frame({ url: /iframeUrlPart/ });
//await frame.getByText('WOMEN').click();

  await page.getByRole('link', { name: ' //Products' }).click();
  await page.getByRole('textbox', { name: 'Search Product' }).click();
  await page.getByRole('textbox', { name: 'Search Product' }).fill('Stylish Dress');
  await page.getByRole('button', { name: '' }).click();
  //await page.getByRole('button', { name: '' }).click();
  await page.waitForTimeout(5000);

  //await page.waitForTimeout(5000);
  
});
