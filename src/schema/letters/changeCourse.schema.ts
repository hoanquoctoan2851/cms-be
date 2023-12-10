import z, { array, number, object, string, TypeOf } from "zod";

export const createChangeCourseSchema = object({
  body: object({
    msv: string({
      required_error: "Msv is required",
    }),
    teacherHomeRoom: string({
      required_error: "teacher home room is required",
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

    semester: number({
      required_error: "semester is required",
    }),
    startYear: number({
      required_error: "start year is required",
    }),

    endYear: number({
      required_error: "end year is required",
    }),

    courseAdd: array(
      object({
        name: string(),
        semester: string(),
        classNv1: string(),
        classNv2: string(),
        studySt: number(),
      })
    ).optional(),

    courseChanges: array(
      object({
        name: string(),
        semester: string(),
        classAssign: string(),
        classWant: string(),
      })
    ).optional(),

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

export type createChangeCourseInput = TypeOf<
  typeof createChangeCourseSchema
>["body"];
