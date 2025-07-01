import { expect, Locator } from "@playwright/test";
import { PriceUtils } from "./price-utils";

export async function expectPriceMatch(locator: Locator, expected: number) {
  await expect
    .poll(async () => {
      const text = await locator.textContent();
      return PriceUtils.extractMinPriceFromText(text ?? "");
    })
    .toBe(expected);
}

export async function expectTextIgnoreCase(locator: Locator, expected: string) {
  await expect
    .poll(async () => {
      const text = await locator.textContent();
      return text?.trim().toLowerCase();
    })
    .toBe(expected.toLowerCase());
}
