import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Majors, StatusLetter } from "../../types/index";
import { Teacher } from "../teacher.model";
import { User } from "../user.model";

class CourseCancel {
  @prop({ type: String })
  name: string;

  @prop({ type: String })
  semester: string;

  @prop({ type: String })
  class: string;

  @prop({ type: Date })
  startDate: Date;

  @prop({ type: Date })
  endDate: Date;
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class CancelCourse {
  @prop({ required: true, type: String, uppercase: true })
  msv: string;

  @prop({ type: String })
  name: string;

  @prop({ type: String, required: true })
  phone: string;

  @prop({ required: true, type: String })
  class: string;

  @prop({ required: true, enum: Majors })
  majors: string;

  @prop({ type: Number, required: true })
  semester: number;

  @prop({ required: true, type: Number })
  startYear: number;

  @prop({ required: true, type: Number })
  endYear: number;

  @prop({ type: () => CourseCancel, required: true })
  courseCancel: CourseCancel[];

  @prop({ required: true, type: String })
  reason: string;

  @prop({ required: true, enum: StatusLetter })
  status: string;

  @prop({ required: true, ref: () => Teacher })
  approved: Ref<Teacher>;

  @prop({ type: String })
  hashCode: string;

  @prop({ required: true, ref: () => User })
  user: Ref<User>;
}

const CancelCourseModel = getModelForClass(CancelCourse);

export default CancelCourseModel;
