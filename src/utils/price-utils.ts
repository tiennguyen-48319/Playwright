export class PriceUtils {
  static extractMinPriceFromText(text: string): number {
    const pattern = /\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g;
    let match;
    let minPrice: number | null = null;

    while ((match = pattern.exec(text)) !== null) {
      const priceStr = match[1].replace(/,/g, "");
      const price = parseFloat(priceStr);
      if (minPrice === null || price < minPrice) {
        minPrice = price;
      }
    }

    return minPrice ?? 0;
  }

  static isPriceSortedDESC(prices: number[]): boolean {
    for (let i = 0; i < prices.length - 1; i++) {
      if (prices[i] < prices[i + 1]) {
        return false;
      }
    }
    return true;
  }

  static isPriceSortedASC(prices: number[]): boolean {
    for (let i = 0; i < prices.length - 1; i++) {
      if (prices[i] > prices[i + 1]) {
        return false;
      }
    }
    return true;
  }
}
