import { BasePage } from "./base-page";

export class MyAccountPage extends BasePage {
    readonly ordersItem = this.page.locator('nav[class*="navigation"] ul li[class*="orders"]')

    async goToOrderHistoryPage() {
        this.ordersItem.click();
    }
}
