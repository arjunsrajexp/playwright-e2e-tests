import { expect, type Page } from "@playwright/test";
import BasePage from "./basepage";
import { log } from "../helpers/logger.js";
export default class HomePage extends BasePage {
  //Constructor
  constructor(page: Page) {
    super(page);
  }

  /**Elements */
  get userNameInputBox() {return this.page.getByRole('textbox', { name: 'Email:' })}
  get passwordInputBox() {return this.page.getByRole('textbox', { name: 'Password:' })}
  get loginBtn() {return this.page.getByRole('button', { name: 'Log in' })}

  async openNopCommerceApp() {
    await this.navigateTo('https://admin-demo.nopcommerce.com/login');
  }
  
  /**Page Actions */
  async login(username: string, password: string) {
    await log("info", `Logging in with username: ${username} and password: ${password}`);
    await this.typeInto(this.userNameInputBox, username);
    await this.typeInto(this.passwordInputBox, password);
    await this.click(this.loginBtn);
  }
}

/**
 *   await page.goto('https://admin-demo.nopcommerce.com/login');
  await page.getByRole('textbox', { name: 'Email:' }).fill('admin@yourstore.com');
  await page.getByRole('textbox', { name: 'Password:' }).fill('admin');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL('https://admin-demo.nopcommerce.com/admin/');
 
 */