import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Majors, StatusLetter } from "../../types/index";
import { Teacher } from "../teacher.model";
import { User } from "../user.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class EnjoyPolicy {
  @prop({ required: true, type: String, uppercase: true })
  msv: string;

  @prop({ type: String })
  schoolC2?: string;

  @prop({ type: String })
  confirmC2?: string;

  @prop({ type: String })
  classC2?: string;

  @prop({ type: () => Number })
  semesterC2?: number;

  @prop({ type: () => Number })
  startC2Y?: number;

  @prop({ type: () => Number })
  endC2Y?: number;

  @prop({ type: String })
  confirmStudent?: string;

  @prop({ type: () => Number })
  yearSchoolSt?: number;

  @prop({ type: Number })
  semester?: number;

  @prop({ type: () => [Date] })
  timeInSchool?: Date[];

  @prop({ type: String })
  class?: string;

  @prop({ enum: Majors })
  majors?: string;

  @prop({ type: () => [Date] })
  course?: [Date];

  @prop({ type: () => Number })
  courseTime?: number;

  @prop({ type: () => String })
  discipline?: string;

  @prop({ type: () => String })
  namePolicy?: string;

  @prop({ required: true, enum: StatusLetter })
  status: string;

  @prop({ required: true, ref: () => Teacher })
  approved: Ref<Teacher>;

  @prop({ type: String })
  hashCode: string;

  @prop({ required: true, ref: () => User })
  user: Ref<User>;
}

const EnjoyPolicyModel = getModelForClass(EnjoyPolicy);

export default EnjoyPolicyModel;
