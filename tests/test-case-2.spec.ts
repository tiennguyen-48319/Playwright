import { test, expect } from "@fixtures";
import { Env } from "@utils/env";
import { User } from "components/user";
import { ProductInfo } from "components/product-info";

test("Verify users can buy multiple item successfully", async ({
  pages,
  page,
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
  await page.goto(Env.BASEURL);

  await myPage.goToMyPage();

  // 2. Login with valid credentials
  await loginPage.login();

  // 3. Go to Shop page
  await myPage.goToShopPage();

  // 4. Select multiple items and add to cart
  const selectedProducts: ProductInfo[] = [];
  await productPage.addMultipleProducts(2, selectedProducts);

  // 5. Go to the cart and verify all selected items
  await productPage.goToCartPage();
  expect(cartPage.getAllProducts()).toEqual(selectedProducts);

  // 6. Proceed to checkout and confirm order
  await cartPage.clickCheckoutBtn();
  await checkoutPage.submitOrderApplication(user);

  // 7. Verify order confirmation message
  await expect(orderStatusPage.successMessage).toBeVisible();
});
