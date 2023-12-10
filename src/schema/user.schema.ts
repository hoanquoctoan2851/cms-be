import z, { number, object, string, TypeOf } from "zod";
import { regexDate } from "../utils/regex";

const requestPayload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    msv: string({
      required_error: "Msv is required",
    }),
    email: string().email("Not a valid email"),
    gender: z.enum(["nam", "nữ"], {
      required_error: "Gender is required",
      description: "You must check gender",
    }),
    birthDay: string({
      required_error: "birthDay required",
    }).refine((val) => regexDate.test(val), {
      message: "date is type YYYY-MM-DD",
    }),
    phone: string().optional(),
    class: string({
      required_error: "Class is required",
    }),
    majors: z.enum(
      ["An toàn thông tin", "Công nghệ thông tin", "Điện tử viễn thông", "Nhân viên tư vấn bán hàng"],
      {
        required_error: "Majors is required",
      }
    ),
    age: number({
      invalid_type_error: "Age must be number",
    })
      .positive()
      .optional(),
    timeCourse: string().optional(),
    citizenId: string().optional(),
    placeCitizenId: string().optional(),
    dateCitizenId: string()
      .refine((val) => regexDate.test(val), {
        message: "date is type YYYY-MM-DD",
      })
      .optional(),
    address: string().optional(),
    hometown: string().optional(),
    permanentResidence: string().optional(),
    parentName: string().optional(),
    parentPhone: string().optional(),
  }),
};

const requestParams = {
  params: object({
    msv: string({
      required_error: "msv is required",
    }),
  }),
};

export const createUserSchema = object({
  ...requestPayload,
});

export const getUserMsvSchema = object({
  ...requestParams,
});

export const deleteUserSchema = object({
  ...requestParams,
});

export const updateUserSchema = object({
  ...requestParams,
  body: object({
    name: string().optional(),
    msv: string().optional(),
    email: string().email("Not a valid email").optional(),
    gender: z
      .enum(["nam", "nữ"], {
        description: "You must check gender",
      })
      .optional(),
    birthDay: string()
      .refine((val) => regexDate.test(val), {
        message: "birthDay is type YYYY-MM-DD",
      })
      .optional(),
    phone: string().optional(),
    class: string().optional(),
    majors: z
      .enum(["An toàn thông tin", "Công nghệ thông tin", "Điện tử viễn thông", "Nhân viên tư vấn bán hàng"])
      .optional(),
    age: number({
      invalid_type_error: "Age must be number",
    })
      .positive()
      .optional(),
    timeCourse: string().optional(),
    citizenId: string().optional(),
    placeCitizenId: string().optional(),
    dateCitizenId: string()
      .refine((val) => regexDate.test(val), {
        message: "dateCitizenId is type YYYY-MM-DD",
      })
      .optional(),
    address: string().optional(),
    hometown: string().optional(),
    permanentResidence: string().optional(),
    parentName: string().optional(),
    parentPhone: string().optional(),
    balance: number({
      invalid_type_error: "Balance must be number",
    })
      .optional(),
  }),
});

export const changePasswordUpdateSchema = object({
  body: object({
    msv: string({
      required_error: "MSV is required",
    }),
    oldPassword: string({
      required_error: "Old password is required",
    }),
    newPassword: string({
      required_error: "Password is required",
    }),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];

export type GetUserMsvInput = TypeOf<typeof getUserMsvSchema>["params"];

export type DeleteUserInput = TypeOf<typeof deleteUserSchema>["params"];

export type UpdateUserInput = TypeOf<typeof updateUserSchema>;

export const getAllLetterRequestSchema = object({ ...requestParams });

export type GetAllLetterRequest = TypeOf<
  typeof getAllLetterRequestSchema
>["params"];
