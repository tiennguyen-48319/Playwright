import { PriceUtils } from "@utils/price-utils";
import { BasePage } from "./base-page";
import { ProductInfo } from "components/product-info";

export class CartPage extends BasePage {
  readonly productName = this.page.locator(".product-title");
  readonly productPrice = this.page.locator("td.product-price");
  readonly checkoutButton = this.page.locator("a.checkout-button");
  readonly removeButtons = this.page.locator("a.remove-item");
  readonly emptyMsg = this.page.locator("div.cart-empty > h1");
  readonly productRows = this.page.locator("table.shop_table.cart tbody tr");
  readonly quantityInput = this.page.locator("div.quantity input");
  readonly plusButton = this.page.locator("span.plus");
  readonly minusButton = this.page.locator("span.minus");
  readonly subTotal = this.page.locator("td.product-subtotal");
  readonly clearCart = this.page.locator("a.clear-cart");

  async clickClearCart() {
    await this.clearCart.click();
  }

  async getQuantityProduct(): Promise<number> {
    const value = await this.quantityInput.inputValue();
    return parseInt(value);
  }

  async clickPlusButton(): Promise<void> {
    await this.plusButton.click();
  }

  async clickMinusButton(): Promise<void> {
    await this.minusButton.click();
  }

  async enterQuantityInput(quantity: number): Promise<void> {
    await this.quantityInput.fill(quantity.toString());
    await this.quantityInput.press("Enter");
  }

  async getSubTotal(): Promise<number> {
    const text = await this.subTotal.textContent();
    return PriceUtils.extractMinPriceFromText(text ?? "0");
  }

  async getProductPrice(): Promise<number> {
    const text = await this.productPrice.textContent();
    return PriceUtils.extractMinPriceFromText(text ?? "0");
  }

  async clickCheckoutBtn(): Promise<void> {
    await this.checkoutButton.click({timeout: 10000});
  }

  async getAllProducts(): Promise<ProductInfo[]> {
    const count = await this.productRows.count();
    const products: ProductInfo[] = [];

    for (let i = 0; i < count; i++) {
      const row = this.productRows.nth(i);

      const name =
        (await row.locator(".product-title").textContent())?.trim() ?? "";
      const type =
        (await row.locator(".products-page-cats").textContent())?.trim() ?? "";
      const star =
        (await row.locator(".star-rating").getAttribute("class")) ?? "";
      const priceText = await row.locator(".price").textContent();
      const price = PriceUtils.extractMinPriceFromText(priceText ?? "");

      products.push({ name, type, star, price });
    }

    return products;
  }

  async removeAllProducts(): Promise<void> {
    while (await this.removeButtons.first().isVisible()) {
      await this.removeButtons.first().click();
    }
  }

}
