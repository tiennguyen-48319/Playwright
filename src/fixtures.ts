import { CartPage } from "@pages/cart-page";
import { CheckoutPage } from "@pages/checkout-page";
import { LoginPage } from "@pages/login-page";
import { MyAccountPage } from "@pages/my-account-page";
import { OrderStatusPage } from "@pages/order-status-page";
import { ProductPage } from "@pages/product-page";
import { test as base } from "@playwright/test";
import { Env } from "@utils/env";

type Pages = {
  loginPage: LoginPage;
  checkoutPage: CheckoutPage;
  cartPage: CartPage;
  myPage: MyAccountPage;
  orderStatusPage: OrderStatusPage;
  productPage: ProductPage;
};

export const test = base.extend<{pages: Pages}>({
  pages: async ({ page }, use) => {
    const pages = {
        loginPage: new LoginPage(page),
        checkoutPage: new CheckoutPage(page),
        cartPage: new CartPage(page),
        myPage: new MyAccountPage(page),
        orderStatusPage: new OrderStatusPage(page),
        productPage: new ProductPage(page)
    };
    await use(pages);
  },
});

test.beforeEach(async ({ pages, page}) => {
  await page.goto(Env.BASEURL);
  await pages.myPage.goToMyPage();
});

export { expect } from "@playwright/test";
