import { object, string, TypeOf, z } from "zod";

export const adminSchema = object({
  body: object({
    username: string({
      required_error: "username is required",
    }),
    password: string({
      required_error: "password is required",
    }),
    type: z.enum(["admin"], {
      required_error: "type is required",
    }),

  }),
});


export type accountInput = TypeOf<typeof adminSchema>["body"];

