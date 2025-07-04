import { test, expect } from "@fixtures";
import { User } from "components/user";
import { PaymentMethods } from "data/payment-methods";

test("Verify users can sort items by price", async ({ pages }) => {
  const { checkoutPage, productPage, cartPage, orderStatusPage, myPage } =
    pages;
  const user = User.defaultUser();

  // 1. Open https://demo.testarchitect.com/
  // 2. Navigate to 'Shop' or 'Products' section
  await myPage.goToShopPage();

  // 3. Add a product to cart
  const productPosition = await productPage.getRandomProductIndex();
  await productPage.addToCart(productPosition);

  // 4. Click on Cart button
  await productPage.goToCartPage();

  // 5. Proceed to complete order
  await cartPage.clickCheckoutBtn();
  await checkoutPage.submitOrderApplication(user, PaymentMethods.DIRECT_BANK_TRANSFER);
  await expect(orderStatusPage.successMessage).toBeVisible();
});
