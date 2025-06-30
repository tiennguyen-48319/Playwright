import { test, expect } from '@playwright/test';
import { TestBase } from './test-base'; 
import { Env } from '@utils/env'; 
import { Departments } from '@enum/Departments';
import { ProductPage } from '@pages/product-page';
import { CartPage } from '@pages/cart-page';
import { CheckoutPage } from '@pages/checkout-page';
import { User } from 'components/user';
import { OrderStatusPage } from '@pages/order-status-page';


test('Verify users can buy an item successfully', async ({ page }) => {
    const t = new TestBase(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderStatusPage = new OrderStatusPage(page);
    const user = User.defaultUser();
    
    // 1. Open browser and go to https://demo.testarchitect.com/'
    await page.goto(Env.baseUrl);

    await t.myPage.goToMyPage();

    // 2. Login with valid credentials 
    await t.loginPage.login(Env.defaultUser, Env.defaultPassword);

    // 3. Navigate to All departments section
    // 4. Select Electronic Components & Supplies
    await t.myPage.selectDepartment(Departments.Electronic_Components_Supplies);

    // 5. Verify the items should be displayed as a grid
    await expect(productPage.getGridView()).toBeVisible();

    // 6. Switch view to list
    await productPage.switchToViewList();
    
    // 7. Verify the items should be displayed as a list
    await expect(productPage.getListView()).toBeVisible();
    
    // 8. Select any item randomly to purchase
    const randomIndex = await productPage.getRandomProductIndex();
    const productInfo = await productPage.getProductInfo(randomIndex);
    
    // 9. Click 'Add to Cart'
    productPage.getAddToCartButton(randomIndex)

    // 10. Go to the cart 
    await productPage.goToCartPage();

    // 11. Verify item details in mini content
    expect(cartPage.getProductName(), productInfo.name); 

    let actualPrice = await cartPage.getProductPrice();
    expect(actualPrice).toBe(productInfo.price);

    // 12. Click on Checkout
    await cartPage.clickCheckoutBtn();

    // 13. Verify Checkbout page displays
    await expect(page).toHaveTitle(/Checkout/i);

    // 14. Verify item details in order
    let actualName = (await checkoutPage.getProductName()).toLowerCase();
    let expectedName = productInfo.name.toLowerCase();
    
    expect(actualName).toBe(expectedName);

    // 15. Fill the billing details with default payment method
    await checkoutPage.fillInfo(user);

    // 16. Click on PLACE ORDER
    await checkoutPage.clickPlaceOrderBtn();

    // 16. Verify Order status page displays
    expect(await orderStatusPage.isSuccessMessageDisplayed()).toBeTruthy();

    // 17. Verify the Order details with billing and item information
    actualName = (await orderStatusPage.getProductName()).toLowerCase();
    expect(actualName).toBe(expectedName);

    actualPrice = await orderStatusPage.getProductPrice();
    expect(actualPrice).toBe(productInfo.price);
    expect(orderStatusPage.isBillingInformationMatched(user)).toBeTruthy();
    expect(orderStatusPage.getDetailEmail(), user.username);
    expect(orderStatusPage.getDetailPhoneNumber(), user.phone);
  });