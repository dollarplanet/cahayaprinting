import { Seed } from "../seed-type";

export const userSeed: Seed = async ({ payload }) => {
  await payload.create({
    collection: "users",
    data: {
      email: "pagerayu.business@gmail.com",
      password: process.env.ADMIN_DEFAULT_PASSWORD,
      role: "admin",
    },
  });
}