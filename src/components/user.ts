import { Env } from "@utils/env";

export const defaultUser = {
  username: Env.DEFAULT_USER,
  password: Env.DEFAULT_PASSWORD,
  firstName: "Tien",
  lastName: "Nguyen",
  country: "Vietnam",
  address: "Lien Chieu",
  city: "Da Nang",
  phone: Env.PHONE_NUMBER
};
