import { test, expect } from "@playwright/test";

test.describe("Login Functinality", {annotation:{type:"Setup",description:"First Test"},tag:"@Regression"},() => {
  test.beforeEach("Go to Login Page", async ({ page }) => {
    //1. Launch URL and assert title and header
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    //2. Click on Make Appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();
  });
  test.only("Login with Valid Credntials", {tag:"@Smoke"},async ({ page }) => {
    /**
     * Capability: Auto-Waiting
     * @scenarios
     * 1. Just Locator element - Lazy
     *  -> No action, Test passes even if invalid locator
     * 2. Invalid Locator on action method
     * -> timeout 30000ms
     * 3. Valid Locator but invalid action
     * -> Not of type error
     * 4. Invalid Locator on expect methos
     * -> timeout 5000ms
     */

    // //Auto waiting 
    // const userNameEle= page.getByLabel("Username")
    // await userNameEle.check()
    
    //Successful Login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // //Assert a Text
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Login with Invalid Credntials", async ({ page }) => {
    //Unsuccessful Login
    await page.getByLabel("Username").fill("John Smith");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    //Assert a Text
    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });
});
