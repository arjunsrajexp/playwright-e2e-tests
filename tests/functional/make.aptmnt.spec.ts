import { test, expect } from '@playwright/test';
import { log } from '../helpers/logger';

test.describe("Make Appointment", () => {
    test.beforeEach("Login with Valid Credentials", async ({ page },testInfo) => {
        //1. Launch URL and assert title and header
        //Get the URL from config file
        const envConfig = testInfo.project.use as any;

        //Custom Logs
        await log("info", `Launching URL: ${envConfig.URL}`);

        await page.goto(envConfig.URL);
        await expect(page).toHaveTitle("CURA Healthcare Service");
        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

        //2. Click on Make Appointment
        await page.getByRole("link", { name: "Make Appointment" }).click();
        await expect(page.getByText("Please login to make")).toBeVisible();

        //Successful Login
        await page.getByLabel("Username").fill(process.env.TEST_USER_NAME);
        await page.getByLabel("Password").fill(process.env.TEST_PASSWORD);
        await page.getByRole("button", { name: "Login" }).click();

        //Assert a Text
        await expect(page.locator("h2")).toContainText("Make Appointment");
        await log("info", "Login Successful...");
        await log("warn", "WARNING TEST...");
        await log("error", "ERROR TEST...");

    })
    test('Make Appointment with non default values', async ({ page },testInfo) => {
        console.log(`Config at runtime:${JSON.stringify(testInfo.config)}`);
        //Dropdown
        await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');

        //Checkbox
        await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();

        //Radio Button
        await page.getByRole('radio', { name: 'Medicaid' }).check();

        //Date input box
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
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

