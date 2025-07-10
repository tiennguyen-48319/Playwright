import { test, expect } from "@fixtures";
import { ProductInfo } from "components/product-info";
import { PaymentMethods } from "data/payment-methods";

test("Verify users can buy multiple item successfully", async ({pages}) => {
  const {
    loginPage,
    checkoutPage,
    productPage,
    cartPage,
    orderStatusPage,
    myPage,
  } = pages;

  // 1. Open browser and go to https://demo.testarchitect.com/
  // 2. Login with valid credentials
  await loginPage.login();

  // 3. Go to Shop page
  await myPage.goToShopPage();

  // 4. Select multiple items and add to cart
  const selectedProducts: ProductInfo[] = [];
  await productPage.addMultipleProducts(2, selectedProducts);

  // 5. Go to the cart and verify all selected items
  await productPage.goToCartPage();
  expect(await cartPage.getAllProducts()).toEqual(selectedProducts);

  // 6. Proceed to checkout and confirm order
  await cartPage.clickCheckoutBtn();
  await checkoutPage.submitOrderApplication(PaymentMethods.DIRECT_BANK_TRANSFER);

  // 7. Verify order confirmation message
  await expect(orderStatusPage.successMessage).toBeVisible();
});
