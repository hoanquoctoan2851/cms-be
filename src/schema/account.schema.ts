import { object, string, TypeOf, z } from "zod";

export const accountSchema = object({
  body: object({
    username: string({
      required_error: "username is required",
    }),
    password: string({
      required_error: "password is required",
    }),
    type: z.enum(["admin", "teacher", "user"], {
      required_error: "type is required",
    }),
  }),
});

export const refreshTokenSchema = object({
  body: object({
    refreshToken: string({
      required_error: "refresh token is required",
    }),
  }),
});

export type accountInput = TypeOf<typeof accountSchema>["body"];

export type refreshTokenInput = TypeOf<typeof refreshTokenSchema>["body"];
