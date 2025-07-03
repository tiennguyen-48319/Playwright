import { ConvertUtils } from "@utils/date-utils";
import { BasePage } from "./base-page";
import { PriceUtils } from "@utils/price-utils";
import { expect } from "@fixtures";
import { OrderInfo } from "components/order-info";

export class MyAccountPage extends BasePage {
    readonly ordersItem = this.page.locator('nav[class*="navigation"] ul li[class*="orders"]')

    async goToOrderHistoryPage() {
        await this.ordersItem.click();
    
    }

    getOrderDate(orderNumber: number) {
        return this.page.locator(`//tr[td[contains(@class,'order-number')]/a[substring(normalize-space(text()), 2) = '${orderNumber}']]/td[contains(@class,'order-date')]`);
    }

    getTotalOrder(orderNumber: number) {
        return this.page.locator(`//tr[td[contains(@class,'order-number')]/a[substring(normalize-space(text()), 2) = '${orderNumber}']]/td[contains(@class,'order-total')]/span`);
    }

    async getOrderDateMatched(orderNumber: number): Promise<Date> {
        const orderDate = await this.getOrderDate(orderNumber).textContent() ?? "";
        return ConvertUtils.convertToDate(orderDate);
    }

    async getTotalOrderMatched(orderNumber: number): Promise<number> {
        const totalOrder = await this.getTotalOrder(orderNumber).textContent() ?? "";
        return PriceUtils.extractMinPriceFromText(totalOrder);
    }

    async expectOrderHistoryToMatch(orderInfo: OrderInfo): Promise<void> {
        const dateLocator = await this.getOrderDateMatched(orderInfo.orderNumber);
        const totalLocator = await this.getTotalOrderMatched(orderInfo.orderNumber);
    
        expect(dateLocator.getTime()).toBe(orderInfo.orderDate.getTime());
        expect(totalLocator).toBe(orderInfo.total);
      }
}
