export class StyleUtils {
  static isElementBorderRed(colorStr: string): boolean {
    const rgb = StyleUtils.parseColor(colorStr);
    if (!rgb) return false;

    const { r, g, b } = rgb;

    return r >= 150 && g <= 80 && b <= 80;
  }

  private static parseColor(
    colorStr: string
  ): { r: number; g: number; b: number } | null {
    const rgbMatch = colorStr.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch.map(Number);
      return { r, g, b };
    }

    if (colorStr.startsWith("#")) {
      let hex = colorStr.slice(1);
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((ch) => ch + ch)
          .join("");
      }
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return { r, g, b };
    }

    return null;
  }
}
