import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { StatusLetter } from "../../types/index";
import { Teacher } from "../teacher.model";
import { User } from "../user.model";

class CourseAdd {
  @prop({ type: String })
  name: string;

  @prop({ type: String })
  semester: string;

  @prop({ type: String })
  classNv1: string;

  @prop({ type: String })
  classNv2?: string;

  @prop({ type: Number })
  studySt: number;
}

class CourseChange {
  @prop({ type: String })
  name: string;

  @prop({ type: String })
  semester: string;

  @prop({ type: String })
  classAssign: string;

  @prop({ type: String })
  classWant: string;
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class ChangeCourse {
  @prop({ required: true, type: String, uppercase: true })
  msv: string;

  @prop({ type: String, required: true })
  teacherHomeRoom: string;

  @prop({ type: String, required: true })
  name: string;

  @prop({ type: String, required: true })
  phone: string;

  @prop({ required: true, type: String })
  class: string;

  @prop({ type: Number })
  semester: number;

  @prop({ required: true, type: Number })
  startYear: number;

  @prop({ required: true, type: Number })
  endYear: number;

  @prop({ type: () => CourseAdd })
  courseAdds?: CourseAdd[];

  @prop({ type: () => CourseChange })
  courseChanges?: CourseChange[];

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

const ChangeCourseModel = getModelForClass(ChangeCourse);

export default ChangeCourseModel;
