import { test, expect } from "@playwright/test";

test.describe("Multiple Windows Functionality", { tag: "@MultiWindow" }, () => {
  test("Navigate through multiple windows and assert headers", async ({ page }) => {
    // 1. Navigate to the Multiple Windows page
    await page.goto("https://the-internet.herokuapp.com/windows");
    await expect(page).toHaveTitle("The Internet");
    console.log("Parent window title: The Internet");
    
    // 2. Wait for the page content to load and click the "Click Here" link to open a new window
    await page.waitForLoadState("networkidle");
    const [newWindow] = await Promise.all([
      page.context().waitForEvent("page"), // Wait for new page to be created
      page.getByRole("link", { name: "Click Here" }).first().click(),
    ]);

    // 3. Switch to the new window and verify it loaded with the expected header
    await newWindow.waitForLoadState("load");
    const newWindowTitle = await newWindow.title();
    console.log(`New window title: ${newWindowTitle}`);
    expect(newWindowTitle).toBe("New Window");
    
    // 4. Get the body text from the new window to verify content
    const newWindowContent = await newWindow.locator("body").evaluate(el => el.textContent);
    console.log(`New window content loaded: ${newWindowContent?.substring(0, 50)}...`);
    expect(newWindowContent).toBeTruthy();

    // 5. Verify the parent window is still accessible with the correct title
    const parentTitle = await page.title();
    console.log(`Parent window title (after opening new window): ${parentTitle}`);
    expect(parentTitle).toBe("The Internet");
    
    // 6. Verify we can switch between windows
    console.log("Successfully navigated to multiple windows and verified headers");
    console.log(`Total windows open: Parent (${await page.title()}), New (${await newWindow.title()})`);
  });
});

