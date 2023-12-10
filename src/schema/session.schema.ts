import z, { object, string, TypeOf } from "zod";

export const createSessionSchema = object({
  body: object({
    accountId: string({
      required_error: "AccountId is required",
    }).refine((data) => data.length > 3),
    accountType: z.enum(["admin", "user", "teacher"], {
      required_error: "Password is required",
    }),
    token: string({
      required_error: "Token is required",
    }),
  }),
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>["body"];
