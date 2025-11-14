import { test, expect } from '@playwright/test';
import path from 'path';

test.use({ storageState: 'tests/setup/storageState.json' });

// This suite groups related tests (Add to cart → Checkout)
test.describe('E-commerce flow', () => {
test('Step 1: Add products to Cart', async ({ page }) => {
  await page.goto('https://automationexercise.com/');  
  await page.waitForURL('**/'); // ensure URL loaded
  await page.getByText('Products').click();
  await page.getByRole('textbox', { name: 'Search Product' }).click();
  await page.getByRole('textbox', { name: 'Search Product' }).fill('Stylish Dress');
  await page.getByRole('button', { name: '' }).click();
  await page.goto('https://automationexercise.com/products?search=Stylish%20Dress');
  await page.getByText('Add to cart').nth(1).click();
  await page.getByRole('link', { name: 'View Cart' }).click();
  //await page.waitForTimeout(5000);  

   // Save session + cart state for next test
    await page.context().storageState({ path: 'tests/setup/storageState.json' });
});
let currentUrl; // Declare outside tests
// Step 2: Checkout and place order (uses saved state)
   test.use({ storageState: 'tests/setup/storageState.json' });
test('Step 2:Checkout & Place Order', async ({ page }) => {
  await page.goto('https://automationexercise.com/view_cart'); 
  //await page.waitForTimeout(5000); 
  await page.getByText('Proceed To Checkout').click();
  await expect(page.getByText(/checkout/i)).toBeVisible();
  await page.getByText('Place Order').click();
  //await expect(page.getByText(/Payment/i)).toBeVisible();
  await page.fill('[data-qa="name-on-card"]', 'John Doe');
  await expect(page.locator('[data-qa="name-on-card"]')).toHaveValue('John Doe');
  await page.fill('[data-qa="card-number"]', '1234098712340987');
  await expect(page.locator('[data-qa="card-number"]')).toHaveValue('1234098712340987');
  await page.fill('[data-qa="cvc"]', '311');
  await expect(page.locator('[data-qa="cvc"]')).toHaveValue('311');
  await page.fill('[data-qa="expiry-month"]', '12');
  await expect(page.locator('[data-qa="expiry-month"]')).toHaveValue('12');
  await page.fill('[data-qa="expiry-year"]', '2026');
  await expect(page.locator('[data-qa="expiry-year"]')).toHaveValue('2026');
  await page.locator('[data-qa="pay-button"]').click();
  await expect(page.locator('#form')).toContainText('Order Placed!');
  //Assert the success confirmation message
  await expect(page.locator('#form')).toContainText('Congratulations! Your order has been confirmed!');
  //Validate checkout success URL.
  //await expect(page).toHaveURL('https://automationexercise.com/payment_done/500');
  currentUrl = page.url();
  console.log(currentUrl);
  await page.waitForTimeout(5000);
});

test('Step 3:Download Invoice', async ({ page }) => {
  console.log('Navigating to saved URL:', currentUrl);
  //Navigate to URL
  await page.goto(currentUrl);
  //await page.goto('https://automationexercise.com/payment_done/500'); 
  //Waiting for download event occurs
  const waitForDownloadEvent = page.waitForEvent('download');
  //Start download
  await page.getByRole('link', { name: 'Download Invoice' }).click();
  //Await the download object
  const download = await waitForDownloadEvent;
  // path.resolve() → builds a proper file path. Change this to your desired folder path) 
  const downloadPath = path.resolve('D:\\downloaded-file', await download.suggestedFilename());
  // Save the file to the path
  await download.saveAs(downloadPath);
  console.log(`✅ Invoice downloaded successfully: ${downloadPath}`);
    
});
});



  