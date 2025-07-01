import { Page, Locator } from "@playwright/test";

export class BasePage {
  constructor(public readonly page: Page) {}

  readonly myAccountLogo = this.page.locator(
    'div[class=header-wrapper]  a[href$="/my-account/"]'
  );
  readonly cartButton = this.page.locator(
    'div.header-wrapper div[class*="header-cart"] > a'
  );
  readonly adsPopUp = this.page.locator("button.popmake-close");

  getDepartmentOption(category: string) {
    return this.page.locator(
      `div.secondary-menu-wrapper ul a:has-text("${category}")`
    );
  }

  getMenuItem(category: string) {
    return this.page.locator(
      `ul#menu-main-menu-1 li a:has-text("${category}")`
    );
  }

  async goToMyPage() {
    await this.myAccountLogo.click();
  }

  async closeAds() {
    await this.adsPopUp.waitFor({ state: "visible", timeout: 3000 });
    await this.adsPopUp.click();
  }

  async selectDepartment(departmentOption: string) {
    await this.page.getByText("All departments").hover();
    await this.getDepartmentOption(departmentOption).click();
  }

  async goToCartPage() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.page.waitForTimeout(500);
    await this.cartButton.click();
  }

  async goToShopPage() {
    await this.getMenuItem("Shop").click();
  }
}
