import { Page, Locator } from '@playwright/test';

import { BasePage } from './base-page';
import { PriceUtils } from '@utils/price-utils';
import { PaymentMethods } from '@enum/payment-methods';
import { User } from 'components/user';

export class CheckoutPage extends BasePage{
  readonly productName = this.page.locator('td.product-name');
  readonly productPrice = this.page.locator('td.product-total');
  readonly firstName = this.page.locator('#billing_first_name');
  readonly lastName = this.page.locator('#billing_last_name');
  readonly country = this.page.locator('#select2-billing_country-container');
  readonly address = this.page.locator('#billing_address_1');
  readonly city = this.page.locator('#billing_city');
  readonly phone = this.page.locator('#billing_phone');
  readonly inputCountry = this.page.locator('.select2-search__field');
  readonly placeOrderButton = this.page.locator('#place_order');
  readonly billEmail = this.page.locator('#billing_email');

  readonly firstNameErrorMsg = this.page.locator('li[data-id="billing_first_name"]');
  readonly lastNameErrorMsg = this.page.locator('li[data-id="billing_last_name"]');
  readonly streetAddressErrorMsg = this.page.locator('li[data-id="billing_address_1"]');
  readonly cityErrorMsg = this.page.locator('li[data-id="billing_city"]');
  readonly zipCodeErrorMsg = this.page.locator('li[data-id="billing_postcode"]');
  readonly phoneErrorMsg = this.page.locator('li[data-id="billing_phone"]');
  readonly emailErrorMsg = this.page.locator('li[data-id="billing_email"]');
  readonly zipCode = this.page.locator('#billing_postcode');

  async getProductName(): Promise<string> {
    const text = await this.productName.textContent();
    return text?.split('×')[0].replace(/\s+/g, ' ').trim() ?? '';
  }

  async getProductPrice(): Promise<number> {
    const text = await this.productPrice.textContent();
    return PriceUtils.extractMinPriceFromText(text ?? '');
  }

  async enterFirstName(name: string) {
    if (!(await this.firstName.inputValue())) {
      await this.firstName.fill(name);
    }
  }

  async enterLastName(name: string) {
    if (!(await this.lastName.inputValue())) {
      await this.lastName.fill(name);
    }
  }

  async enterAddress(place: string) {
    if (!(await this.address.inputValue())) {
      await this.address.fill(place);
    }
  }

  async enterCity(town: string) {
    if (!(await this.city.inputValue())) {
      await this.city.fill(town);
    }
  }

  async enterPhone(phone: string) {
    if (!(await this.phone.inputValue())) {
      await this.phone.fill(phone);
    }
  }

  async enterBillingEmail(email: string) {
    if (!(await this.billEmail.inputValue())) {
      await this.billEmail.fill(email);
    }
  }

  async selectCountry(countryName: string) {
    const current = await this.country.textContent();
    if (!current?.includes(countryName)) {
      await this.country.click();
      await this.inputCountry.fill(countryName);
      await this.page.locator(`ul#select2-billing_country-results li:text("${countryName}")`).click();
    }
  }

  async fillInfo(user: User) {
    await this.enterFirstName(user.firstName);
    await this.enterLastName(user.lastName);
    await this.selectCountry(user.country);
    await this.enterAddress(user.address);
    await this.enterCity(user.city);
    await this.enterPhone(user.phone);
    await this.enterBillingEmail(user.username);
  }

  async selectPaymentMethod(method: PaymentMethods) {
    const methodLocator = this.page.locator(`//li[label[contains(., '${method}')]]/input`);
    if (!(await methodLocator.isChecked())) {
      await methodLocator.check();
    }
  }

  async clickPlaceOrderBtn() {
    await this.placeOrderButton.click();
  }

  async submitOrderApplication(user: User, method: PaymentMethods = PaymentMethods.DIRECT_BANK_TRANSFER) {
    await this.fillInfo(user);
    await this.selectPaymentMethod(method);
    await this.clickPlaceOrderBtn();
  }
}
