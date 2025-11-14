//include playwright module
const { expect } = require('@playwright/test')
//import { expect } from '@playwright/test';

//Create Class
exports.Homepage = class Homepage {
//export class Homepage {
/**
 * Creates an instance of Homepage.
 * @param {import ('@playwright/test').Page)} page
 */
constructor(page){
        // Init page objects
        this.page = page;
        // Elements
        //this.searchTextbox = page.locator('#APjFqb'); //Google.com
          this.searchTextbox = page.locator('input[placeholder="Search"]');
}
async goto(){
    await this.page.goto('https://www.youtube.com/');
}
async searchKeyword(param1){
    await expect(this.searchTextbox).toBeEnabled();
    await this.searchTextbox.click();
    await this.searchTextbox.fill(param1);
    await this.searchTextbox.press('Enter');
}
}

