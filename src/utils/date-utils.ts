import { parse } from "date-fns";

export class ConvertUtils {
  static convertToDate(text: string): Date {
    return parse(text, "MMMM d, yyyy", new Date());
  }
}
