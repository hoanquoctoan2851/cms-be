import z, { array, number, object, string, TypeOf } from "zod";
import { regexDate, regexMonth } from "../../utils/regex";

export const createConfirmStudyingSchema = object({
  body: object({
    msv: string({
      required_error: "Msv is required",
    }),
    name: string({
      required_error: "name is required",
    }),
    phone: string({
      required_error: "phone is required",
    }),
    birthDay: string({
      required_error: "birthDay is required",
    }).refine((val) => regexDate.test(val), {
      message: "date is type YYYY-MM-DD",
    }),
    gender: z.enum(["nam", "nữ"], {
      required_error: "Gender is required",
      description: "You must check gender",
    }),
    citizenId: string(),
    placeCitizenId: string(),
    dateCitizenId: string().refine((val) => regexDate.test(val), {
      message: "date is type YYYY-MM-DD",
    }),
    permanentResidence: string(),
    address: string(),
    majors: z.enum(
      ["An toàn thông tin", "Công nghệ thông tin", "Điện tử viễn thông", "Nhân viên tư vấn bán hàng"],
      {
        required_error: "Majors is required",
      }
    ),
    semester: number({
      required_error: "semester is required",
    }),

    class: string({
      required_error: "class is required",
    }),

    startYear: number({
      required_error: "start year is required",
    }),

    endYear: number({
      required_error: "end year is required",
    }),

    course: array(
      string().refine((val) => regexMonth.test(val), {
        message: "course is type YYYY-MM",
      }),
      {
        required_error: "course is required",
      }
    ).length(2),

    status: z.enum(["pending", "reject", "success"], {
      required_error: "Status is required",
    }),

    approved: string({ required_error: "approved is required" }),
    user: string({ required_error: "user is required" }),
  }),
});

export const updateConfirmStudyingSchema = object({
  params: object({
    id: string(),
  }),
  body: object({
    msv: string().optional(),
    name: string().optional(),
    phone: string().optional(),
    birthDay: string()
      .refine((val) => regexDate.test(val), {
        message: "date is type YYYY-MM-DD",
      })
      .optional(),
    gender: z
      .enum(["nam", "nữ"], {
        description: "You must check gender",
      })
      .optional(),
    citizenId: string().optional(),
    placeCitizenId: string().optional(),
    dateCitizenId: string()
      .refine((val) => regexDate.test(val), {
        message: "date is type YYYY-MM-DD",
      })
      .optional(),
    permanentResidence: string(),
    address: string(),
    majors: z
      .enum(["An toàn thông tin", "Công nghệ thông tin", "Điện tử viễn thông", "Nhân viên tư vấn bán hàng"])
      .optional(),
    semester: number().optional(),

    class: string().optional(),

    startYear: number().optional(),

    endYear: number().optional(),

    course: array(
      string().refine((val) => regexMonth.test(val), {
        message: "course is type YYYY-MM",
      })
    )
      .length(2)
      .optional(),

    status: z.enum(["pending", "reject", "success"]).optional(),

    approved: string().optional(),
  }),
});

export type createConfirmStudyingInput = TypeOf<
  typeof createConfirmStudyingSchema
>["body"];
