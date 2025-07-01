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

test("Verify users can buy an item successfully", async ({ page }) => {
  const t = new TestBase(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const orderStatusPage = new OrderStatusPage(page);
  const user = User.defaultUser();

  // 1. Open browser and go to https://demo.testarchitect.com/'
  await page.goto(Env.BASEURL);

  await t.myPage.goToMyPage();

  // 2. Login with valid credentials
  await t.loginPage.login(Env.DEFAULT_USER, Env.DEFAULT_PASSWORD);

  // 3. Navigate to All departments section
  // 4. Select Electronic Components & Supplies
  await t.myPage.selectDepartment(Departments.ELECTRONIC_COMPONENTS_SUPPLIES);

  // 5. Verify the items should be displayed as a grid
  // await expect(productPage.getGridView()).toBeVisible();

  // 6. Switch view to list
  // await productPage.switchToViewList();

  // 7. Verify the items should be displayed as a list
  // await expect(productPage.getListView()).toBeVisible();

  // 8. Select any item randomly to purchase
  const randomIndex = await productPage.getRandomProductIndex();
  const productInfo = await productPage.getProductInfo(randomIndex);

  // 9. Click 'Add to Cart'
  productPage.addToCart(randomIndex);

  // 10. Go to the cart
  await productPage.goToCartPage();

  // 11. Verify item details in mini content
  await expect(cartPage.productName).toHaveText(productInfo.name);
  await expectPriceMatch(cartPage.productPrice, productInfo.price);

  // 12. Click on Checkout
  await cartPage.clickCheckoutBtn();

  // 13. Verify Checkbout page displays
  await expect(page).toHaveTitle(/Checkout/i);

  // 14. Verify item details in order
  await expectTextIgnoreCase(checkoutPage.productName, productInfo.name);

  // 15. Fill the billing details with default payment method
  await checkoutPage.fillInfo(user);

  // 16. Click on PLACE ORDER
  await checkoutPage.clickPlaceOrderBtn();

  // 16. Verify Order status page displays
  expect(await orderStatusPage.isSuccessMessageDisplayed()).toBeTruthy();

  // 17. Verify the Order details with billing and item information
  await expectTextIgnoreCase(orderStatusPage.productName, productInfo.name);
  await expectPriceMatch(orderStatusPage.productPrice, productInfo.price);
  await expect
    .poll(async () => {
      return await orderStatusPage.isBillingInformationMatched(user);
    })
    .toBe(true);
  await expect(orderStatusPage.detailEmail).toHaveText(user.username);
  await expect(orderStatusPage.detailPhone).toHaveText(user.phone);
});
