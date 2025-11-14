import { test, expect } from '@playwright/test';
//const { test, expect } = require('@playwright/test');
const path = require('path'); // ✅ Import this module (path → handles file paths correctly on Windows.)
const fs = require('fs');     // ✅ Ensures your download directory exists before saving.

test('download file in playwrighth', async ({ page }) => {
   // Read env file in playwright (https://commitquality.com/practice-file-download)
  await page.goto(process.env.URL);
  await page.waitForTimeout(5000);

  //Waiting for download event occurs
  const waitForDownloadEvent = page.waitForEvent("download");

  //Start download
  await page.getByRole("button", {name: "Download File"}).click();

  //Await the download object
  const download = await waitForDownloadEvent;

  //Save file in specific folder
  //const suggested = await download.suggestedFilename();
  //const filePath = `./downloads/${suggested}`;
  //await download.saveAs(filePath);

  // path.resolve() → builds a proper file path.
  // Define your custom path (✅ Change this to your desired folder) 
  const downloadPath = path.resolve('D:\\downloaded-file', await download.suggestedFilename());

  // Save the file to the path
  await download.saveAs(downloadPath);
  
  //Check file exists in the local downloads directory (If you don’t know the file name in advance:).
  const fileExists = fs.existsSync(downloadPath); //returns true if the file exists.
  expect(fileExists).toBeTruthy();
  
  //Verify File Size > 0 ; You can also make sure the downloaded file is not empty:
  const stats = fs.statSync(downloadPath);
  expect(stats.size).toBeGreaterThan(0);

  // 4️⃣ (Optional) Verify file content or type
  const fileBuffer = fs.readFileSync(targetPath);
  expect(fileBuffer.length).toBeGreaterThan(0); // non-empty file
  expect(suggestedName).toContain('invoice'); // filename check

  //to read any value (ie user name and password) from env file
  console.log("User Name is :  "+process.env.USER_NAME);
  console.log("User Name is :  "+process.env.PASSWORD);


});

