import { ProductInfo } from 'components/product-info';
import { BasePage } from './base-page';
import { PriceUtils } from '@utils/price-utils';

export class ProductPage extends BasePage{
    readonly usernameInput = this.page.getByRole("textbox", {name: "username"});;
    readonly gridViewButton = this.page.locator('div[class*=switch-grid] > a');
    readonly listViewButton = this.page.locator('div.switch-list > a');

    getProductViewType(type: string) {
        return this.page.locator(`div.products-loop.products-${type}`);
    }

    getGridView() {
        return this.getProductViewType('grid');
    }
      
    getListView() {
        return this.getProductViewType('list');
    }

    async switchToViewList() {
        await this.listViewButton.click();
    }

    async getRandomProductIndex(): Promise<number> {
        const products = await this.page.locator('div.content-product').count();
        return Math.floor(Math.random() * products);
    }

    getProductName(index: number) {
        return this.page.locator(`div.content-product:nth-of-type(${index + 1}) h2.product-title`);
    }
      
    getProductType(index: number) {
        return this.page.locator(`div.content-product:nth-of-type(${index + 1}) div.products-page-cats`);
    }
      
    getProductStar(index: number) {
        return this.page.locator(`div.content-product:nth-of-type(${index + 1}) div.star-rating`);
    }
      
    getProductPrice(index: number) {
        return this.page.locator(`div.content-product:nth-of-type(${index + 1}) span.price`);
    }
      
    getAddToCartButton(index: number) {
        return this.page.locator(`div.content-product:nth-of-type(${index + 1}) a:text("Add to cart")`);
    }

    async addToCart(index: number) {
        this.getAddToCartButton(index);
    }

    async getProductInfo(index: number): Promise<ProductInfo> {
        const name = await this.getProductName(index).textContent() ?? '';
        const type = await this.getProductType(index).textContent() ?? '';
        const star = await this.getProductStar(index).getAttribute('class') ?? '';
        const price = await this.getProductPrice(index).textContent() ?? '';
      
        return {
          name: name.trim(),
          type: type.trim(),
          star,
          price: PriceUtils.extractMinPriceFromText(price),
        };
    }

      





}