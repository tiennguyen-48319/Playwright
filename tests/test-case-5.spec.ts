import { test, expect } from "@fixtures";
import { Env } from "@utils/env";
import { User } from "components/user";
import { ProductInfo } from "components/product-info";
import { PriceUtils } from "@utils/price-utils";

test("Verify users can sort items by price", async ({ pages, page }) => {
  const {
    loginPage,
    checkoutPage,
    productPage,
    cartPage,
    orderStatusPage,
    myPage,
  } = pages;
  const user = User.defaultUser();

  // 0. Precondition
  await loginPage.login();
  await myPage.goToShopPage();
  await productPage.closeAds();
  let productPosition = await productPage.getRandomProductIndex();
  await productPage.addToCart(productPosition);
  await productPage.goToCartPage();
  await cartPage.clickCheckoutBtn();
  await checkoutPage.submitOrderApplication(user);
  const orderInfo1 = orderStatusPage.getOrderInfo();

  await orderStatusPage.goToShopPage();
  await productPage.closeAds();
  productPosition = await productPage.getRandomProductIndex();
  await productPage.addToCart(productPosition);
  await productPage.goToCartPage();
  await cartPage.clickCheckoutBtn();
  await checkoutPage.submitOrderApplication(user);
  const orderInfo2 = orderStatusPage.getOrderInfo();

  // 1. Go to My Account page
  await orderStatusPage.goToMyPage();

  // 2. Click on Orders in left navigation
  await myPage.goToOrderHistoryPage();

  // 3. Verify order details
});
