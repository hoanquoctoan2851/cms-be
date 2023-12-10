import { object, string, TypeOf } from "zod";
import { regexNumber } from "../utils/regex";

// query pagination
export const queryGetListSchema = object({
  query: object({
    page: string()
      .refine((value) => regexNumber.test(value), {
        message: "page must be number",
      })
      .optional(),
    limit: string()
      .refine((value) => regexNumber.test(value), {
        message: "page must be number",
      })
      .optional(),
    name: string().optional(),
    msv: string().optional(),
    majors: string().optional(),
    class: string().optional(),
    phone: string().optional(),
  }),
});

export type QueryGetList = TypeOf<typeof queryGetListSchema>["query"];

//params Id
export const requestParamsSchema = object({
  params: object({
    id: string({
      required_error: "id is required",
    }),
  }),
});

export type RequestParams = TypeOf<typeof requestParamsSchema>["params"];

export const verifyCodeLetterSchema = object({
  params: object({
    id: string({
      required_error: "id is required",
    }),
  }),
  body: object({
    otp: string({
      required_error: "otp is required",
    }),
    msv: string({
      required_error: "msv is required",
    }),
    teacherId: string({
      required_error: "teacherId is required",
    }),
  }),
});

export type VerifyCodeLetterParams = TypeOf<
  typeof verifyCodeLetterSchema
>["params"];
export type VerifyCodeLetterRequest = TypeOf<
  typeof verifyCodeLetterSchema
>["body"];

export const getCodeSchema = object({
  params: object({
    id: string({
      required_error: "id is required",
    }),
  }),
  body: object({
    email: string({
      required_error: "otp is required",
    }),
    msv: string({
      required_error: "msv is required",
    }),
    teacherId: string({
      required_error: "teacherId is required",
    }),
  }),
});

export type GetCodeLetterParams = TypeOf<typeof getCodeSchema>["params"];
export type GetCodeLetterRequest = TypeOf<typeof getCodeSchema>["body"];
