import { test, expect } from "@playwright/test";
import { TestBase } from "./test-base";
import { Env } from "@utils/env";
import { Departments } from "@enum/Departments";
import { ProductPage } from "@pages/product-page";
import { CartPage } from "@pages/cart-page";
import { CheckoutPage } from "@pages/checkout-page";
import { User } from "components/user";
import { OrderStatusPage } from "@pages/order-status-page";
import { PriceUtils } from "@utils/price-utils";
import { expectPriceMatch, expectTextIgnoreCase } from "@utils/expect-utils";
import { ProductInfo } from "components/product-info";

test("Verify users can buy multiple item successfully", async ({ page }) => {
  const t = new TestBase(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const orderStatusPage = new OrderStatusPage(page);
  const user = User.defaultUser();

  // 1. Open browser and go to https://demo.testarchitect.com/
  await page.goto(Env.BASEURL);

  await t.myPage.goToMyPage();

  // 2. Login with valid credentials
  await t.loginPage.login(Env.DEFAULT_USER, Env.DEFAULT_PASSWORD);

  // 3. Go to Shop page
  await t.myPage.goToShopPage();
  await productPage.closeAds();

  // 4. Select multiple items and add to cart
  const selectedProducts: ProductInfo[] = [];
  await productPage.addMultipleProducts(5, selectedProducts);

  // 5. Go to the cart and verify all selected items
  productPage.goToCartPage();
  expect(cartPage.getAllProducts()).toEqual(selectedProducts);

  // 6. Proceed to checkout and confirm order
  // 7. Verify order confirmation message
});
