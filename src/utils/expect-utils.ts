import { expect, Locator } from "@playwright/test";
import { PriceUtils } from "./price-utils";
import { LocatorHelper } from "./locator-utils";
import { StyleUtils } from "./style-utils";

export class ExpectUtils {
  static async expectPriceMatch(locator: Locator, expected: number) {
    await expect
      .poll(async () => {
        const text = await locator.textContent();
        return PriceUtils.extractMinPriceFromText(text ?? "");
      })
      .toBe(expected);
  }

  static async expectBorderRed(locator: Locator, timeout?: 5000) {
    await expect
      .poll(
        async () => {
          const color = await LocatorHelper.getBorderColorOfElement(locator);
          return StyleUtils.isElementBorderRed(color);
        },
        {
          message: "Expect border color to be red",
          timeout,
        }
      )
      .toBe(true);
  }
}

export { StyleUtils };
