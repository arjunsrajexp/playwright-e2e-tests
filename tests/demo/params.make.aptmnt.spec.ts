import { test, expect } from '@playwright/test';
import TestData from '../../data/test-data';

const makeApptTestData = TestData.makeAppointmentTestData() //-> Return 3 objects

//Access the Data
for (const apptData of makeApptTestData){
    test.describe("Make Appointment", () => {
    test.beforeEach("Login with Valid Credentials", async ({ page }) => {
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

        //Get Login Cookies
        const logincookies = await page.context().cookies()
        process.env.LOGIN_COOKIES=JSON.stringify(logincookies)

        //Assert a Text
        await expect(page.locator("h2")).toContainText("Make Appointment");

    })
    test(`${apptData.testID}: Make Appointment with non default values`, async ({ page },testInfo) => {
        //Access the login cookies
        console.log(`Login Cookies: ${process.env.LOGIN_COOKIES}`);
        
        //Dropdown
        await page.getByLabel('Facility').selectOption(apptData.facility);

        //Checkbox
        await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();

        //Radio Button
        await page.getByRole('radio', { name: apptData.hcp }).check();

        //Date input box
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).pressSequentially(apptData.visitDate);

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

}


