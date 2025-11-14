import { test, expect } from '@playwright/test';
//const { test, expect } = require('@playwright/test');
import {qaTestData} from '../test-data/qa/google.json';
import {stageTestData} from '../test-data/stage/google.json';


test.describe('Module Test', () => {

  let testData = null; 

  test.beforeAll('Running before all test', () => {
    if(process.env.ENV == 'qa'){
      testData = qaTestData; 
    }
    else{
      testData = stageTestData;
    }
  })

  test('read data from multiple environment', async ({ page }) => {
  //go to url
  await page.goto(process.env.URL);
  //await page.waitForTimeout(5000);

  //search by keyword
  await page.locator('#APjFqb').click();
  await page.locator('#APjFqb').fill(testData.skill2);
  await page.locator('#APjFqb').press('Enter');
  await page.waitForTimeout(5000);
})
})