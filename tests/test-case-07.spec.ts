import { test, expect } from "@fixtures";
import { ExpectUtils } from "@utils/expect-utils";
import { BillErrorMessages } from "data/billing-error-message";

test("Verify users can sort items by price", async ({ pages }) => {
  const { checkoutPage, productPage, cartPage, myPage } =pages;

  // precondition
  await myPage.goToShopPage();
  const productPosition = await productPage.getRandomProductIndex();
  await productPage.addToCart(productPosition);
  await productPage.goToCartPage();
  await cartPage.clickCheckoutBtn();

  //  1. Leave mandatory fields (address, payment info) blank  
  //  2. Click 'Confirm Order'
  await checkoutPage.clickPlaceOrderBtn();

  //  3. Verify error messages
  await expect(checkoutPage.firstNameErrorMsg).toHaveText(BillErrorMessages.BILLING_FIRST_NAME_ERROR);
  await expect(checkoutPage.lastNameErrorMsg).toHaveText(BillErrorMessages.BILLING_LAST_NAME_ERROR);
  await expect(checkoutPage.streetAddressErrorMsg).toHaveText(BillErrorMessages.BILLING_STREET_ERROR);
  await expect(checkoutPage.cityErrorMsg).toHaveText(BillErrorMessages.BILLING_TOWN_CITY_ERROR);
  await expect(checkoutPage.zipCodeErrorMsg).toHaveText(BillErrorMessages.BILLING_ZIP_CODE_ERROR);
  await expect(checkoutPage.phoneErrorMsg).toHaveText(BillErrorMessages.BILLING_PHONE_ERROR);
  await expect(checkoutPage.emailErrorMsg).toHaveText(BillErrorMessages.BILLING_EMAIL_ADDRESS);

  await ExpectUtils.expectBorderRed(checkoutPage.firstName);
  await ExpectUtils.expectBorderRed(checkoutPage.lastName);
  await ExpectUtils.expectBorderRed(checkoutPage.address);
  await ExpectUtils.expectBorderRed(checkoutPage.city);
  await ExpectUtils.expectBorderRed(checkoutPage.zipCode);
  await ExpectUtils.expectBorderRed(checkoutPage.phone);
  await ExpectUtils.expectBorderRed(checkoutPage.billEmail);
});
