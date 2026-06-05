import { test, expect,devices } from "@playwright/test";
import constants from '../../data/constants.json'

test("Test homepage title", async ({ page }) => {
  // 1. Go to Home Page
  await page.goto(
    "await page.goto('https://katalon-demo-cura.herokuapp.com/');",
  );
  // 2. Assert if the title is correct
  await expect(page).toHaveTitle("CURA Healthcare Service");
  // 3. Assert header text
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});
test("Demo Locators", async ({ page }) => {
  //✅ `page.getBy*()` and `page.locator()` methods returns the `locator` object
  // The above methods not to be `awaited`
  // The type of locator is an `object`
  // Locators are LAZY until an action is fired on them

  //1. Launch URL
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  //2. Click on Make Appointment
  let makeAppmtButton = page.getByRole("link", { name: "Make Appointment" })
  console.log(`>>The type of locator: ${typeof makeAppmtButton}, The value of locator: ${JSON.stringify(makeAppmtButton)}`)
  // await makeAppmtButton.click();
  // await expect(page.getByText("Please login to make")).toBeVisible();
});
test("Demo Config file", async ({ page }, testInfo) => {
  console.log(`Run Time Config: ${JSON.stringify(testInfo.config)}`);
})
test("Demo fixtures", async ({ page,browserName }, testInfo) => {
  console.log(`The test runs on: ${browserName}`);
})
test("Demo devices", async ({ page,browserName }, testInfo) => {
  console.log(`Supported Devices: ${Object.keys(devices)}`);
})
test("Demo Paralell Runs 1", {tag: "@demo"},async ({ page,browserName }, testInfo) => {
 await page.goto("https://www.google.com")
})
test("Demo Paralell Runs 2", {tag: "@demo"},async ({ page,browserName }, testInfo) => {
 await page.goto("https://www.google.com")
})
test("Demo Paralell Runs 3", {tag: "@demo"},async ({ page,browserName }, testInfo) => {
 await page.goto("https://www.google.com")
})
test.only("Demo Constant Data" ,async ({ page,browserName }, testInfo) => {
 console.log(`Constants:${JSON.stringify(constants.STATUSCODES)}`);
})