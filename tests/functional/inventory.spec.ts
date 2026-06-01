import { test, expect } from '@playwright/test'
/**
 * 1. Login as Standard User
 * 2. Get a list of products with its price
 * 3. Assert that all products has non zero dollar value
 */
test.describe("Inventory Feature", () => {
    test.beforeEach("Login with Valid Credentials", async ({ page }) => {
        //launch URL
        await page.goto('https://www.saucedemo.com/');

        //Login
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        //Assertion
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        await expect(page).toHaveURL(/.*\/inventory/)
    })
    test("Confirm All Prices are Non-Zero", async ({ page }) => {
        //Get a list of products
        let productsElms = page.locator(".inventory_item")
        await expect(productsElms).toHaveCount(6)

        //Get Product Name and prices
        let totalProducts = await productsElms.count();
        let priceArray = []
        for (let i = 0; i < totalProducts; i++) {
            let eleNode = productsElms.nth(i);

            //Product name
            let productName = await eleNode.locator(".inventory_item_name").innerText()

            //Price
            let price = await eleNode.locator(".inventory_item_price").innerText()

            //Print the Results
            console.log(`Product: ${productName}, Price: ${price}`)
            priceArray.push(price)
        }
        console.log(`Original Price Array:${priceArray}`);

        /**
         * [$29.99,$9.99,$15.99,$49.99,$7.99,$15.99]
         * 1. Replace all $ with ""
         * 2. Compare the price which should be >0
         */
        let priceArrNum = priceArray.map((item) => parseFloat(item.replace("$", "")))
        console.log(`Modified Array:${priceArrNum}`);

        let priceArrWithInvalidVals = priceArrNum.filter((item) => item <= 0);

        if (priceArrWithInvalidVals.length > 0) {
            console.log(`ERROR: Non Zero Price Found, ${priceArrWithInvalidVals}`);
        } else {
            console.log(`INFO: All Prices are Non Zeros`);
        }
        expect(priceArrWithInvalidVals).toHaveLength(0);
    })
    test("Checkout First Product", async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();
        await page.locator('[data-test="firstName"]').fill('Test 1');
        await page.locator('[data-test="lastName"]').fill('Test 2');
        await page.locator('[data-test="postalCode"]').pressSequentially('12345');
        await page.locator('[data-test="continue"]').click();
        await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Overview');
    })
})