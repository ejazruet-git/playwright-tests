//include playwright module
const { expect } = require('@playwright/test')

//Create Class
exports.PlaylistPage = class PlaylistPage {
/**
 * Creates an instance of Homepage.
 * @param {import ('@playwright/test').Page)} page
 */
constructor(page){
        // Init page objects
        this.page = page

        // Elements
        this.videoLink = page.locator('#container > #thumbnail');
}

async clickOnVideo(){
    await expect(this.videoLink.first()).toBeEnabled();
    await page.waitForTimeout(10000);
    await this.videoLink.first().click();
}
}

