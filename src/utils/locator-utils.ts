import { Locator } from "@playwright/test";

export class LocatorHelper {
  static async getFirstVisible(locator: Locator): Promise<Locator | null> {
    const count = await locator.count();
    for (let i = 0; i < count; i++) {
      const item = locator.nth(i);
      if (await item.isVisible()) {
        return item;
      }
    }
    return null;
  }
}
