import z, { number, object, string, TypeOf } from "zod";
import { regexDate } from "../../utils/regex";

export const createPaymentGraduationClassSchema = object({
  body: object({
    msv: string({
      required_error: "Msv is required",
    }),
    class: string({
      required_error: "Class is required",
    }),
    amountStudent: number({
      required_error: "Amount student is required",
    }),
    decisionNumber: string(),
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

export type createPaymentGraduationClassSchemaInput = TypeOf<
  typeof createPaymentGraduationClassSchema
>["body"];
