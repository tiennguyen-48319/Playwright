import { test, expect } from "@fixtures";
import { User } from "components/user";

test("Verify users can sort items by price", async ({ pages }) => {
  const { checkoutPage, productPage, cartPage, orderStatusPage, myPage } =
    pages;
  const user = User.defaultUser();

  //  1. Leave mandatory fields (address, payment info) blank
  //  2. Click 'Confirm Order'
  //  3. Verify error messages
});
