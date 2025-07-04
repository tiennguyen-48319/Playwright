import { test, expect } from "@fixtures";
import { User } from "components/user";

test("Verify users can sort items by price", async ({ pages }) => {
  const { loginPage, checkoutPage, productPage, cartPage, myPage } = pages;
  const user = User.defaultUser();

  // 1. Open browser and go to https://demo.testarchitect.com/
  // 2. Login with valid credentials
  await loginPage.login();

  // 3. Go to Shop page
  await myPage.goToShopPage();

  // 4. Add a product
  const productPosition = await productPage.getRandomProductIndex();
  const productInfo = await productPage.getProductInfo(productPosition);
  await productPage.addToCart(productPosition);

  // 5. Go to the cart
  await productPage.goToCartPage();
  let quantityProduct = await cartPage.getQuantityProduct();

  // 6. Verify quantity of added product
  expect(quantityProduct).toBe(1);

  // 7. Click on Plus(+) button
  await cartPage.clickPlusButton();

  // 8. Verify quantity of product and SUB TOTAL price
  quantityProduct = quantityProduct + 1;
  expect(await cartPage.getQuantityProduct()).toBe(quantityProduct);
  expect(await cartPage.getSubTotal()).toBe(
    productInfo.price * quantityProduct
  );

  // 9. Enter 4 into quantity textbox then click on UPDATE CART button
  quantityProduct = 4;
  await cartPage.enterQuantityInput(quantityProduct);

  // 10. Verify quantity of product is 4 and SUB TOTAL price
  expect(await cartPage.getQuantityProduct()).toBe(quantityProduct);

  // 11. Click on Minus(-) button
  await cartPage.clickMinusButton();

  // 12. Verify quantity of product and SUB TOTAL price
  quantityProduct = quantityProduct - 1;
  expect(await cartPage.getQuantityProduct()).toBe(quantityProduct);
  expect(await cartPage.getSubTotal()).toBe(
    productInfo.price * quantityProduct
  );
});
