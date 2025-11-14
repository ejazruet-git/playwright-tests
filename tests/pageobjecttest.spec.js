const { test, expect } = require('@playwright/test');
const{ Homepage } = require('../pages/homepage');
const{ ResultPage } = require('../pages/resultpage');
const{ PlaylistPage } = require('../pages/playlistpage');

//import { test, expect } from '@playwright/test';
//import { Homepage } from '../pages/homepage';
//import { ResultPage } from '../pages/resultpage';
//import { PlaylistPage } from '../pages/playlistpage';

test('Page Object Model in Playwright', async ({ page }) => {
  // Go to URL
     const homepage = new Homepage(page);
     await homepage.goto();

  // search with keywords
     homepage.searchKeyword('playwright by testers talk')
     await page.waitForTimeout(5000);

  // click on playlist
     const playlist = new ResultPage(page);
     playlist.clickOnSearchResult
     await page.waitForTimeout(5000);
  
  // click on video 
     /*const playlistpage = new PlaylistPage(page);
     playlistpage.clickOnVideo(); 
     await page.waitForTimeout(5000);*/
  
});

/*test('Click on specific link', async ({ page }) => {
  //click on playlist
   const playlist = new ResultPage(page);
   playlist.clickOnSearchResult();
   //await page.waitForTimeout(5000);
  
  
});*/

