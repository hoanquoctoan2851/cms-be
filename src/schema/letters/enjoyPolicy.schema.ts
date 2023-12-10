import z, { array, number, object, string, TypeOf } from "zod";
import { regexMonth } from "../../utils/regex";

export const createEnjoyPolicySchema = object({
  body: object({
    msv: string({
      required_error: "Mã sinh viên is required",
    }),
    schoolC2: string().optional(),
    confirmC2: string().optional(),
    classC2: string().optional(),
    semesterC2: number().optional(),
    startC2Y: number().optional(),
    endC2Y: number().optional(),
    confirmStudent: string().optional(),
    yearSchoolSt: number().optional(),
    semester: number().optional(),
    timeInSchool: array(
      string().refine((val) => regexMonth.test(val), {
        message: "course is type YYYY-MM",
      })
    )
      .length(2)
      .optional(),
    class: string().optional(),
    majors: z
      .enum(["An toàn thông tin", "Công nghệ thông tin", "Điện tử viễn thông", "Nhân viên tư vấn bán hàng"])
      .optional(),
    course: array(
      string().refine((val) => regexMonth.test(val), {
        message: "course is type YYYY-MM",
      })
    )
      .length(2)
      .optional(),
    courseTime: number().optional(),
    discipline: string().optional(),
    namePolicy: string().optional(),
    status: z.enum(["pending", "reject", "success"], {
      required_error: "Status is required",
    }),

    approved: string({ required_error: "approved is required" }),
    user: string({ required_error: "user is required" }),
  }),
});

export type createEnjoyPolicyInput = TypeOf<
  typeof createEnjoyPolicySchema
>["body"];
