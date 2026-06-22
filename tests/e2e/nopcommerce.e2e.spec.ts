import {test, expect} from '@playwright/test';
import {log} from '../helpers/logger.js';  
import HomePage from '../page-objects/homepage.js';

test("Login to Nopcommerce Web App", async ({page},testInfo) =>{
    //Create a Page Object for HomePage
    const homePage = new HomePage(page);

    //Login
    await homePage.openNopCommerceApp();
    await homePage.login(process.env.NOP_USER_NAME!, process.env.NOP_PASSWORD!);
})