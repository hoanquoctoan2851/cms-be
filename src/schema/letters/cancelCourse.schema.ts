import z, { array, number, object, string, TypeOf } from "zod";
import { regexDate } from "../../utils/regex";

export const createCancelCourseSchema = object({
  body: object({
    msv: string({
      required_error: "Msv is required",
    }),
    name: string({
      required_error: "Name is required",
    }),
    phone: string({
      required_error: "Phone is required",
    }),
    class: string({
      required_error: "Class is required",
    }),
    majors: z.enum(
      ["An toàn thông tin", "Công nghệ thông tin", "Điện tử viễn thông", "Nhân viên tư vấn bán hàng"],
      {
        required_error: "Majors is required",
      }
    ),
    semester: number({
      required_error: "semester is required",
    }),
    startYear: number({
      required_error: "start year is required",
    }),

    endYear: number({
      required_error: "end year is required",
    }),

    courseCancel: array(
      object({
        name: string(),
        semester: string(),
        class: string(),
        startDate: string().refine((value) => regexDate.test(value), {
          message: "start date is type YYYY-MM-DD",
        }),
        endDate: string().refine((value) => regexDate.test(value), {
          message: "end date is type YYYY-MM-DD",
        }),
      })
    ),

    reason: string({
      required_error: "reason is required",
    }),

    status: z.enum(["pending", "reject", "success"], {
      required_error: "Status is required",
    }),

    approved: string({ required_error: "approved is required" }),
    user: string({ required_error: "user is required" }),
  }),
});

export type createCancelCourseInput = TypeOf<
  typeof createCancelCourseSchema
>["body"];
