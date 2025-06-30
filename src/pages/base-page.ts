import { Page, Locator } from '@playwright/test';

export class BasePage {
    constructor(public readonly page: Page) {}
    
    readonly myAccountLogo = this.page.locator('div[class=header-wrapper]  a[href$="/my-account/"]');
    readonly cartButton = this.page.locator('div.header-wrapper div[class*="header-cart"] > a');

    getDepartmentOption(category: string) {
        return this.page.getByRole('link', { name: category });
    }

    async goToMyPage() {
        this.myAccountLogo.click();
    }


    async selectDepartment(departmentOption:string) {
        await this.getDepartmentOption(departmentOption).click();
    }

    async goToCartPage() {
        this.cartButton.click();
    }
}