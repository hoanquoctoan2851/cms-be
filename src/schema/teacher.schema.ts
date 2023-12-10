import { array, number, object, string, TypeOf } from "zod";
import { regexDate } from "../utils/regex";

const payloadCreate = {
  body: object({
    name: string({
      required_error: "name is required",
      invalid_type_error: "name must be string",
    }),
    phone: string({
      required_error: "phone is required",
      invalid_type_error: "phone is string",
    }),
    birthDay: string({
      required_error: "birthDay required",
    }).refine((val) => regexDate.test(val), {
      message: "date is type YYYY-MM-DD",
    }),
    email: string().email("Not a valid email"),
    age: number({ invalid_type_error: "age is number" }).optional(),
    address: string({ invalid_type_error: "address is string" }).optional(),
  }),
};

export const payloadCreateListTeacherSchema = object({
  body: array(object({
    name: string({
      required_error: "name is required",
      invalid_type_error: "name must be string",
    }),
    phone: string({
      required_error: "phone is required",
      invalid_type_error: "phone is string",
    }),
    birthDay: string({
      required_error: "birthDay required",
    }).refine((val) => regexDate.test(val), {
      message: "date is type YYYY-MM-DD",
    }),
    email: string().email("Not a valid email"),
    age: number({ invalid_type_error: "age is number" }).optional(),
    address: string({ invalid_type_error: "address is string" }).optional(),
  })),
});

const payloadUpdate = {
  body: object({
    name: string({ invalid_type_error: "name must be string" }).optional(),
    phone: string({ invalid_type_error: "phone is string" }).optional(),
    birthDay: string()
      .refine((val) => regexDate.test(val), {
        message: "date is type YYYY-MM-DD",
      })
      .optional(),
    age: number({ invalid_type_error: "age is number" }).optional(),
    address: string({ invalid_type_error: "address is string" }).optional(),
  }),
};

const paramsId = {
  params: object({
    id: string({
      required_error: "id is required",
      invalid_type_error: "id must be string",
    }),
  }),
};

export const createTeacherSchema = object({
  ...payloadCreate,
});

export const updateTeacherSchema = object({
  ...paramsId,
  ...payloadUpdate,
});

export const getTeacherIdSchema = object({
  ...paramsId,
});

export const deleteTeacherSchema = object({
  ...paramsId,
});

export const changePasswordUpdateTeacherSchema = object({
  body: object({
    phone: string({
      required_error: "Phone is required",
    }),
    oldPassword: string({
      required_error: "Old Password is required",
    }),
    newPassword: string({
      required_error: "New Password is required",
    }),
  }),
});

export type createTeacherSchemaInput = TypeOf<
  typeof createTeacherSchema
>["body"];

export type updateTeacherSchemaInput = TypeOf<typeof updateTeacherSchema>;

export type getTeacherIdSchemaInput = TypeOf<
  typeof getTeacherIdSchema
>["params"];

export type deleteTeacherSchemaInput = TypeOf<typeof deleteTeacherSchema>;
