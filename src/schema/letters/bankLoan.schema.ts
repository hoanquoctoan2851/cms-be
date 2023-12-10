import z, { array, number, object, string, TypeOf } from "zod";
import { regexDate, regexMonth } from "../../utils/regex";

export const createBankLoanSchema = object({
  body: object({
    name: string({
      required_error: "name is required",
    }),
    msv: string({
      required_error: "Msv is required",
    }),
    phone: string({
      required_error: "Phone is required",
    }),
    birthDay: string({
      required_error: "birthDay is required",
    }).refine((val) => regexDate.test(val), {
      message: "date is type YYYY-MM-DD",
    }),
    citizenId: string(),
    placeCitizenId: string(),
    dateCitizenId: string().refine((val) => regexDate.test(val), {
      message: "date is type YYYY-MM-DD",
    }),
    majors: z.enum(
      ["An toàn thông tin", "Công nghệ thông tin", "Điện tử viễn thông", "Nhân viên tư vấn bán hàng"],
      {
        required_error: "Majors is required",
      }
    ),
    course: array(
      string().refine((val) => regexMonth.test(val), {
        message: "course is type YYYY-MM",
      }),
      {
        required_error: "course is required",
      }
    ).length(2),
    class: string({
      required_error: "class is required",
    }),

    department: string().optional(),

    schoolStart: string().refine((val) => regexDate.test(val), {
      message: "date is type YYYY-MM-DD",
    }),

    schoolEnd: string().refine((val) => regexDate.test(val), {
      message: "date is type YYYY-MM-DD",
    }),

    tuitionFee: number(),

    tuitionType: z.enum(["Không miễn giảm", "Giảm học phí", "Miễn học phí"], {
      required_error: "Tuition Type is required",
    }),

    tuitionObj: z.enum(["Mồ côi", "Không mồ côi"], {
      required_error: "Tuition Obj is required",
    }),

    bankNumber: string({
      required_error: "bankNumber is required",
    }),

    bank: string({
      required_error: "bank is required",
    }),

    status: z.enum(["pending", "reject", "success"], {
      required_error: "Status is required",
    }),

    approved: string({ required_error: "approved is required" }),
    user: string({ required_error: "user is required" }),
  }),
});

export type createBankLoanInput = TypeOf<typeof createBankLoanSchema>["body"];
