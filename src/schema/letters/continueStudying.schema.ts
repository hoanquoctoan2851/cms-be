import z, { number, object, string, TypeOf } from "zod";
import { regexDate } from "../../utils/regex";

export const createContinueStudyingSchema = object({
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

    permanentResidence: string(),

    timeReservationAcademic: number(),

    status: z.enum(["pending", "reject", "success"], {
      required_error: "Status is required",
    }),
    user: string({ required_error: "user is required" }),
  }),
});

export type createContinueStudyingSchemaInput = TypeOf<
  typeof createContinueStudyingSchema
>["body"];
