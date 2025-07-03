import { ProductInfo } from "components/product-info";
import { BasePage } from "./base-page";
import { PriceUtils } from "@utils/price-utils";
import { SortType } from "data-types/sort-type";

export class ProductPage extends BasePage {
  readonly usernameInput = this.page.getByRole("textbox", { name: "username" });
  readonly gridViewButton = this.page.locator("div[class*=switch-grid] > a");
  readonly listViewButton = this.page.locator("div.switch-list > a");
  readonly sorting = this.page.locator("select.orderby");
  readonly allPrice = this.page.locator("div.content-product span.price");

  getProductViewType(type: string) {
    return this.page.locator(`div.products-loop.products-${type}`);
  }

  getGridView() {
    return this.getProductViewType("grid");
  }

  getListView() {
    return this.getProductViewType("list");
  }

  async switchToViewList() {
    await this.listViewButton.click({ timeout: 10000 });
  }

  async getRandomProductIndex(): Promise<number> {
    const products = await this.page.locator("div.content-product").count();
    return Math.floor(Math.random() * products);
  }

  getProductName(index: number) {
    return this.page.locator("div.content-product h2.product-title").nth(index);
  }

  getProductType(index: number) {
    return this.page
      .locator("div.content-product div.products-page-cats")
      .nth(index);
  }

  getProductStar(index: number) {
    return this.page.locator("div.content-product div.star-rating").nth(index);
  }

  getProductPrice(index: number) {
    return this.page.locator("div.content-product span.price").nth(index);
  }

  getAddToCartButton(index: number) {
    return this.page
      .locator('div.content-product a:has-text("Add to cart")')
      .nth(index);
  }

  async addToCart(index: number) {
    await this.getAddToCartButton(index).click();
  }

  async getProductInfo(index: number): Promise<ProductInfo> {
    const name = (await this.getProductName(index).textContent()) ?? "";
    const type = (await this.getProductType(index).textContent()) ?? "";
    const star = (await this.getProductStar(index).getAttribute("class")) ?? "";
    const price = (await this.getProductPrice(index).textContent()) ?? "";

    return {
      name: name.trim(),
      type: type.trim(),
      star,
      price: PriceUtils.extractMinPriceFromText(price),
    };
  }

  async addMultipleProducts(
    numberOfProducts: number,
    selectedProducts: ProductInfo[]
  ): Promise<void> {
    for (let i = 0; i < numberOfProducts; i++) {
      const productIndex = await this.getRandomProductIndex();
      const productInfo = await this.getProductInfo(productIndex);

      await this.addToCart(productIndex);

      this.updateProductInList(productInfo, selectedProducts);
    }
  }

  private updateProductInList(
    product: ProductInfo,
    selectedProducts: ProductInfo[]
  ): void {
    const existingProduct = selectedProducts.find(
      (p) => p.name === product.name
    );

    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity ?? 1) + 1;
      existingProduct.totalPrice =
        (existingProduct.totalPrice ?? 0) + product.price;
    } else {
      selectedProducts.push({
        ...product,
        quantity: 1,
        totalPrice: product.price,
      });
    }
  }

  async selectSortByPriceASC(): Promise<void> {
    await this.sorting.selectOption(SortType.PRICE_ASC);
  }

  async selectSortByPriceDESC(): Promise<void> {
    await this.sorting.selectOption(SortType.PRICE_DESC);
  }

  async getAllPriceOfProducts(): Promise<number[]> {
    const prices = await this.allPrice.allTextContents();
    return prices.map((p) => PriceUtils.extractMinPriceFromText(p));
  }
}
