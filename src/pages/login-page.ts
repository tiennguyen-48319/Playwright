import { Env } from "@utils/env";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.getByRole("textbox", { name: "username" });
  readonly passwordInput = this.page.getByRole("textbox", { name: "password" });
  readonly loginButton = this.page.getByRole("button", { name: "Log in" });

  async login() {
    await this.usernameInput.fill(Env.DEFAULT_USER);
    await this.passwordInput.fill(Env.DEFAULT_PASSWORD);
    await this.loginButton.click();
  }
}
