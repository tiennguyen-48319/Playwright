import { test, expect } from "@fixtures";
import { User } from "components/user";
import { PaymentMethods } from "data-types/payment-methods";

const paymentMethods = [
  PaymentMethods.DIRECT_BANK_TRANSFER,
  PaymentMethods.CASH_ON_DELIVERY,
];

for (const method of paymentMethods) {
  test(`Verify users can buy an item using different payment methods (all payment methods) ${method}`, async ({
    pages
  }) => {
    const {
      loginPage,
      checkoutPage,
      productPage,
      cartPage,
      orderStatusPage,
      myPage,
    } = pages;
    const user = User.defaultUser();

    // 1. Open browser and go to https://demo.testarchitect.com/
    // 2. Login with valid credentials
    await loginPage.login();

    // 3. Go to Shop page
    await myPage.goToShopPage();

    // 4. Select an item and add to cart
    const randomIndex = await productPage.getRandomProductIndex();
    const productInfo = await productPage.getProductInfo(randomIndex);
    await productPage.addToCart(randomIndex);
    await productPage.goToCartPage();

    // 5. Go to Checkout page
    await cartPage.clickCheckoutBtn();

    // 6. Choose a different payment method (Direct bank transfer, Cash on delivery)
    // 7. Complete the payment process
    await checkoutPage.submitOrderApplication(user, method);

    // 8. Verify order confirmation message
    await expect(orderStatusPage.successMessage).toBeVisible();
  });
}
