import { test, expect } from "@fixtures";
import { ProductInfo } from "components/product-info";

test("Verify users can sort items by price", async ({ pages }) => {
  const { loginPage, productPage, cartPage, myPage } = pages;

  // precondition 
  await loginPage.login();
  await myPage.goToShopPage();
  const selectedProducts: ProductInfo[] = [];
  await productPage.addMultipleProducts(4, selectedProducts);

  // 1. Open browser and go to https://demo.testarchitect.com/
  // 2. Login with valid credentials
  // 3. Go to Shopping cart page
  await productPage.goToCartPage();

  // 4. Verify items show in table
  expect(cartPage.getAllProducts()).toEqual(selectedProducts);

  // 5. Click on Clear shopping cart
  await cartPage.clickClearCart();

  // 6. Verify empty cart page displays
  await expect(cartPage.emptyMsg).toBeVisible();
});
