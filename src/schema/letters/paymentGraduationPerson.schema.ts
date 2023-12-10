import z, { object, string, TypeOf } from "zod";
import { regexDate } from "../../utils/regex";

export const createPaymentGraduationPersonSchema = object({
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

    paymentReason: string({
      required_error: "Payment reason is required",
    }),

    decisionNumber: string({
      required_error: "Decision number is required",
    }),

    dateDecisionAssign: string().refine((val) => regexDate.test(val), {
      message: "Date decision assign is type YYYY-MM-DD",
    }),

    libraryCenter: object({
      content: string(),
      signature: string(),
    }).optional(),

    financial: object({
      content: string(),
      signature: string(),
    }).optional(),

    studentManagementSystem: object({
      content: string(),
      signature: string(),
    }).optional(),

    trainingDepartment: object({
      content: string(),
      signature: string(),
    }).optional(),

    status: z.enum(["pending", "reject", "success"], {
      required_error: "Status is required",
    }),

    approved: string({ required_error: "approved is required" }),
    user: string({ required_error: "user is required" }),
  }),
});

export type createPaymentGraduationPersonSchemaInput = TypeOf<
  typeof createPaymentGraduationPersonSchema
>["body"];
