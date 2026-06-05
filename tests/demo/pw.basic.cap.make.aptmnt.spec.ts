import { test, expect } from '@playwright/test';

test.describe("Make Appointment", { annotation: { type: "story", description: "TEST STORY ID" } }, () => {
    test.beforeEach("Login with Valid Credentials", async ({ page }, testInfo) => {
        //1. Launch URL and assert title and header
        await page.goto("https://katalon-demo-cura.herokuapp.com/");
        await expect(page).toHaveTitle("CURA Healthcare Service");
        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

        //2. Click on Make Appointment
        await page.getByRole("link", { name: "Make Appointment" }).click();
        await expect(page.getByText("Please login to make")).toBeVisible();

        //Successful Login
        await page.getByLabel("Username").fill("John Doe");
        await page.getByLabel("Password").fill("ThisIsNotAPassword");
        await page.getByRole("button", { name: "Login" }).click();

        /**
         * Add Custom Screenshot at Test Scope Level
         * @TODO: Add this as a helper function
         */
        let fullPageLoginSS = await page.screenshot({ fullPage: true })
        await testInfo.attach("Login page", { body: fullPageLoginSS, contentType: "image/png", });
        //Assert a Text
        await expect(page.locator("h2")).toContainText("Make Appointment");

    })
    test('Make Appointment with non default values', { annotation: { type: "TEST", description: "SAMPLE" },tag:"@smoketest" }, async ({ page, browserName }) => {
        //Skip The test for firefox
        test.skip(browserName==='firefox',"Open Bug for firefox")
        //Dropdown
        await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');

        //Checkbox
        await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();

        //Radio Button
        await page.getByRole('radio', { name: 'Medicaid' }).check();

        //Date input box
        //await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).pressSequentially('05/05/2027');

        //Multi Line Comments Input Box
        await page.getByRole('textbox', { name: 'Comment' }).click();
        await page.getByRole('textbox', { name: 'Comment' }).fill('Test Comment \nMultiple Lines');

        //Button
        await page.getByRole('button', { name: 'Book Appointment' }).click();

        //Assertion
        await expect(page.locator('h2')).toContainText('Appointment Confirmation');
        await expect(page.getByRole('link', { name: 'Go to Homepage' })).toBeVisible();
    });
})

