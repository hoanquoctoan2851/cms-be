import z, { number, object, string, TypeOf } from "zod";
import { regexDate } from "../../utils/regex";

export const createLeavingSchoolSchema = object({
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

    birthDay: string({
      required_error: "birthDay required",
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

    permanentResidence: string({
      required_error: "Permanent residence is required",
    }),

    parentName: string({
      required_error: "Parent name is required",
    }),

    parentPhone: string({
      required_error: "Parent phone is required",
    }),

    address: string({
      required_error: "Address is required",
    }),

    dateLeave: string().refine((val) => regexDate.test(val), {
      message: "Date leave is type YYYY-MM-DD",
    }),

    semester: number({
      required_error: "semester is required",
    }),
    startYear: number({
      required_error: "start year is required",
    }),

    endYear: number({
      required_error: "end year is required",
    }),

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

export type createLeavingSchoolSchemaInput = TypeOf<
  typeof createLeavingSchoolSchema
>["body"];
