import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Gender, Majors, StatusLetter } from "../../types/index";
import { Teacher } from "../teacher.model";
import { User } from "../user.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class ConfirmStudying {
  @prop({ required: true, type: String, uppercase: true })
  msv: string;

  @prop({ required: true, type: String })
  name: string;

  @prop({ type: String, required: true })
  phone: string;

  @prop({ required: true, type: () => Date })
  birthDay: Date;

  @prop({ required: true, enum: Gender, lowercase: true })
  gender: string;

  @prop({ type: String, required: true })
  citizenId: string;

  @prop({ type: String, required: true })
  placeCitizenId: string;

  @prop({ type: () => Date, required: true })
  dateCitizenId: Date;

  @prop({ type: String, required: true })
  permanentResidence: string;

  @prop({ type: String, required: true })
  address: string;

  @prop({ required: true, enum: Majors })
  majors: string;

  @prop({ required: true, type: Number })
  semester: number;

  @prop({ required: true, type: Number })
  startYear: number;

  @prop({ required: true, type: Number })
  endYear: number;

  @prop({ required: true, type: String })
  class: string;

  @prop({ required: true, type: () => [Date] })
  course: [Date];

  @prop({ required: true, enum: StatusLetter })
  status: string;

  @prop({ required: true, ref: () => Teacher })
  approved: Ref<Teacher>;

  @prop({ type: String })
  hashCode: string;

  @prop({ required: true, ref: () => User })
  user: Ref<User>;
}

const ConfirmStudyingModel = getModelForClass(ConfirmStudying);

export default ConfirmStudyingModel;
