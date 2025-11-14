//include playwright module
const { expect } = require('@playwright/test')

//Create Class
exports.ResultPage = class ResultPage {
/**
 * Creates an instance of Homepage.
 * @param {import ('@playwright/test').Page)} page
 */
constructor(page){
        // Init page objects
        this.page = page

        // Elements
        this.searchResultPage = page.getByRole('link',{name:'Testers Talk'});
}

async clickOnSearchResult(){
    //await expect(this.searchResultPage.first()).toBeEnabled();
    //await this.searchResultPage.click();
    //await page.waitForTimeout(500);

   // wait for search results to load
        await this.page.waitForLoadState('networkidle');

        // locate the link
        const link = this.searchResultPage.first();

        // wait for element to appear and be visible
        await link.waitFor({ state: 'attached', timeout: 10000 });
        await link.waitFor({ state: 'visible', timeout: 10000 });

        // click it
        await link.click();
    }
}




