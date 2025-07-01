import { Env } from "@utils/env";

export class User {
  constructor(
    public username: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public country: string,
    public address: string,
    public city: string,
    public phone: string
  ) {}

  static defaultUser(): User {
    return new User(
      Env.DEFAULT_USER,
      Env.DEFAULT_PASSWORD,
      "Phuc Tien",
      "Nguyen Hoang",
      "Vietnam",
      "Lien Chieu",
      "Da Nang",
      Env.PHONE_NUMBER
    );
  }
}
