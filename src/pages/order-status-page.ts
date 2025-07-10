import { BasePage } from "./base-page";
import { PriceUtils } from "@utils/price-utils";
import { ConvertUtils } from "@utils/date-utils";
import { OrderInfo } from "components/order-info";

export class OrderStatusPage extends BasePage {
  readonly successMessage = this.page.locator('p[class*="thankyou-order"]');
  readonly productName = this.page.locator('td[class*="product-name"]');
  readonly productPrice = this.page.locator('td[class*="product-total"]');
  readonly billInformation = this.page.locator("section > h2 + address");
  readonly detailPhone = this.page.locator('p[class*="details--phone"]');
  readonly detailEmail = this.page.locator('p[class*="details--email"]');

  readonly orderNumber = this.page.locator(
    '//ul[contains(@class,"order_details")]/li[contains(text(),"Order number")]/strong'
  );
  readonly orderDate = this.page.locator(
    'ul.order_details li[class*="date"] > strong'
  );
  readonly orderEmail = this.page.locator(
    'ul.order_details li[class*="email"] > strong'
  );
  readonly totalOrder = this.page.locator(
    'ul.order_details li[class*="total"] > strong'
  );
  readonly paymentMethodOrder = this.page.locator(
    'ul.order_details li[class*="method"] > strong'
  );

  async getProductName(): Promise<string> {
    const rawText = await this.productName.textContent();
    return rawText?.split("×")[0].replace(/\s+/g, " ").trim() ?? "";
  }

  async getProductPrice(): Promise<number> {
    const rawText = await this.productPrice.textContent();
    return PriceUtils.extractMinPriceFromText(rawText ?? "");
  }

  async getBillingInformation() {
    return await this.billInformation.textContent() ?? "";
  }

  async getDetailPhoneNumber(): Promise<string> {
    return (await this.detailPhone.textContent())?.trim() ?? "";
  }

  async getDetailEmail(): Promise<string> {
    return (await this.detailEmail.textContent())?.trim() ?? "";
  }

  async getOrderNumber(): Promise<number> {
    const text = await this.orderNumber.textContent();
    return parseInt(text ?? "0", 10);
  }

  async getOrderDate(): Promise<Date> {
    const text = await this.orderDate.textContent();
    return ConvertUtils.convertToDate(text ?? "");
  }

  async getOrderEmail(): Promise<string> {
    return (await this.orderEmail.textContent())?.trim() ?? "";
  }

  async getTotalOrder(): Promise<number> {
    const raw = await this.totalOrder.textContent();
    return PriceUtils.extractMinPriceFromText(raw ?? "");
  }

  async getPaymentMethodOrder(): Promise<string> {
    return (await this.paymentMethodOrder.textContent())?.trim() ?? "";
  }

  async getOrderInfo(): Promise<OrderInfo> {
    return {
      orderNumber: await this.getOrderNumber(),
      orderDate: await this.getOrderDate(),
      orderEmail: await this.getOrderEmail(),
      total: await this.getTotalOrder(),
      paymentMethod: await this.getPaymentMethodOrder(),
    };
  }
}
