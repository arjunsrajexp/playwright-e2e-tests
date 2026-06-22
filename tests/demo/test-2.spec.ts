import { test, expect } from '@playwright/test';

test.only('test', async ({ page }) => {
  await page.goto('https://admin-demo.nopcommerce.com/login');
  await page.getByRole('textbox', { name: 'Email:' }).fill('admin@yourstore.com');
  await page.getByRole('textbox', { name: 'Password:' }).fill('admin');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL('https://admin-demo.nopcommerce.com/admin/');
 
});

test('which browser am I?', async ({ browser, browserName, page }, testInfo) => {
    console.log('Engine (browserName):', browserName);
    console.log('Engine version:', browser.version());
    console.log('Project name:', testInfo.project.name);
    console.log('Channel:', testInfo.project.use.channel);
    
    // Most definitive check: look at the actual executable
    const browserType = browser.browserType();
    console.log('Executable path:', browserType.executablePath());
    
    // Or check the User-Agent that the page sends
    await page.goto('about:blank');
    const ua = await page.evaluate(() => navigator.userAgent);
    console.log('Navigator UA:', ua);
});