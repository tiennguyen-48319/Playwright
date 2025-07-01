// pages/LoginPage.ts
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.getByRole("textbox", { name: "username" });
  readonly passwordInput = this.page.getByRole("textbox", { name: "password" });
  readonly loginButton = this.page.getByRole("button", { name: "Log in" });

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
