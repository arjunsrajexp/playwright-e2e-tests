import { test, expect } from '@playwright/test';

test.describe("Make Appointment", () => {
    test.beforeEach("Login with Valid Credentials", async ({ page }) => {
        //1. Launch URL and assert title and header
        await page.goto("https://katalon-demo-cura.herokuapp.com/");
        await expect(page).toHaveTitle("CURA Healthcare Service");
        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

        /*
        ELEMENT: Button, Link
        @actions
        1. ✅Click
        2. ✅Press
        3. ✅Double Click
        4. ✅Right Click
        5. ✅Hover if link
        6. ✅[Optional] Timeout if slow
        */


        //2. Click on Make Appointment
        //await page.getByRole("link", { name: "Make Appointment" }).click();
        //await page.getByRole("link", { name: "Make Appointment" }).press("Enter");
        //await page.getByRole("link", { name: "Make Appointment" }).dblclick();
        //await page.getByRole("link", { name: "Make Appointment" }).click({button:'right'})
        //await page.getByRole("link", { name: "Make Appointment" }).hover();
        await page.getByRole("link", { name: "Make Appointment" }).click({ timeout: 10_000 });
        await expect(page.getByText("Please login to make")).toBeVisible();

        /*
        ELEMENT: Text Box
        @actions
        1. ✅Clear/Click before filling
        2. ✅fill
        3. ✅pressSequentially (Slow Typing)
        */

        //📍Successful Login
        //await page.getByLabel("Username").fill("John Doe");
        await page.getByLabel("Username").clear();
        //await page.getByLabel("Username").fill("John Doe");
        await page.getByLabel("Username").pressSequentially("John Doe", { delay: 100 });
        await page.getByLabel("Password").fill("ThisIsNotAPassword");
        await page.getByRole("button", { name: "Login" }).click();

        //Assert a Text
        await expect(page.locator("h2")).toContainText("Make Appointment");

    })
    test('Make Appointment with non default values', async ({ page }) => {
    /**
     * ELEMENT: Dropdown
     *
     * @actions
     * 1. Assert default option
     * 2. Select by:
     *  - label
     *  - Index
     * 3. Assert the count
     * 4. Get all dropdown values
     *
     * @notes
     * - Selenium – Select class and 3 selectBy* methods
     * - WebdriverIO – 3 selectBy* methods
     */
        await expect(page.getByLabel('Facility')).toHaveValue('Tokyo CURA Healthcare Center')
        //await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');
        //await page.getByLabel('Facility').selectOption({label:'Hongkong CURA Healthcare Center'});
        await page.getByLabel('Facility').selectOption({index:2});

        //Assert Count
        let dropdownOptionsEle = page.getByLabel('Facility').locator('option')
        await expect(dropdownOptionsEle).toHaveCount(3)

        //Get all dropdown values
        let listofDropDownElems = await page.getByLabel('Facility').all();

        //for each loop
        let listOfOptions =[]

        for (let ele of listofDropDownElems){
            let eletext = await ele.textContent()
            if (eletext){
                listOfOptions.push(eletext)
            }
        }
        console.log (`>>List of Dropdown Options: ${listOfOptions}`)

        /**
     * ELEMENT: Checkbox/Radio button
     *
     * @actions
     * 1. Assert the default option – to be checked/unchecked
     * 2. Check/uncheck
     *
     * @notes
     * - Radio button – Allows to select only one option
     * - Checkbox – Allows for multi-entry
     */

        //Checkbox
        await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).click();

        //Radio Button
        await expect (page.getByRole('radio', { name: 'Medicare' })).toBeChecked()
        await page.getByRole('radio', { name: 'Medicaid' }).check();
        await expect (page.getByRole('radio', { name: 'Medicare' })).not.toBeChecked()

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

