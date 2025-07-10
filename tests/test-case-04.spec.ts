import { test, expect } from "@fixtures";
import { PriceUtils } from "@utils/price-utils";

test("Verify users can sort items by price", async ({ pages}) => {
  const {
    loginPage,
    productPage,
    myPage,
  } = pages;

  // 1. Open browser and go to https://demo.testarchitect.com/
  // 2. Login with valid credentials
  await loginPage.login();

  // 3. Go to Shop page
  await myPage.goToShopPage();

  // 4.  Switch view to list
  await productPage.switchToViewList();

  // 5. Sort items by price (low to high)
  await productPage.selectSortByPriceASC();
  let priceOfProducts = productPage.getAllPriceOfProducts();

  // 6. Verify the order of items
  expect(PriceUtils.isPriceSortedASC(await priceOfProducts)).toBeTruthy();

  // 7. Sort items by price (high to low)
  await productPage.selectSortByPriceDESC();
  priceOfProducts = productPage.getAllPriceOfProducts();

  // 8. Verify the order of items
  expect(PriceUtils.isPriceSortedDESC(await priceOfProducts)).toBeTruthy();
});
