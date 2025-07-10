import { test, expect } from "@fixtures";
import { PaymentMethods } from "data/payment-methods";

test("Verify users can sort items by price", async ({ pages}) => {
  const {
    loginPage,
    checkoutPage,
    productPage,
    cartPage,
    orderStatusPage,
    myPage,
  } = pages;

  // 0. Precondition
  await loginPage.login();
  await myPage.goToShopPage();
  await productPage.closeAds();
  let productPosition = await productPage.getRandomProductIndex();
  await productPage.addToCart(productPosition);
  await productPage.goToCartPage();
  await cartPage.clickCheckoutBtn();
  await checkoutPage.submitOrderApplication(PaymentMethods.DIRECT_BANK_TRANSFER);
  const orderInfo1 = await orderStatusPage.getOrderInfo();

  await orderStatusPage.goToShopPage();
  await productPage.closeAds();
  productPosition = await productPage.getRandomProductIndex();
  await productPage.addToCart(productPosition);
  await productPage.goToCartPage();
  await cartPage.clickCheckoutBtn();
  await checkoutPage.submitOrderApplication(PaymentMethods.DIRECT_BANK_TRANSFER);
  const orderInfo2 = await orderStatusPage.getOrderInfo();

  // 1. Go to My Account page
  await orderStatusPage.goToMyPage();

  // 2. Click on Orders in left navigation
  await myPage.goToOrderHistoryPage();

  // 3. Verify order details
  await myPage.expectOrderHistoryToMatch(orderInfo1);
  await myPage.expectOrderHistoryToMatch(orderInfo2);
});
