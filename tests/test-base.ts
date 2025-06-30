// utils/TestBase.ts
import { Page } from '@playwright/test';
import { BasePage } from '@pages/base-page';
import { LoginPage } from '@pages/login-page';
import { MyAccountPage } from '@pages/my-account-page';

export class TestBase {
  readonly page: Page;
  readonly basePage: BasePage;
  readonly loginPage: LoginPage;
  readonly myPage: MyAccountPage;

  constructor(page: Page) {
    this.page = page;
    this.basePage = new BasePage(page);
    this.loginPage = new LoginPage(page);
    this.myPage = new MyAccountPage(page);
  }
}
