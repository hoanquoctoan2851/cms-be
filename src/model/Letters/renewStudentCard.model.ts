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
export class RenewStudentCard {
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

  @prop({ required: true, enum: StatusLetter })
  status: string;

  @prop({ required: true, ref: () => Teacher })
  approved: Ref<Teacher>;

  @prop({ type: String })
  hashCode: string;

  @prop({ required: true, ref: () => User })
  user: Ref<User>;
}

const RenewStudentCardModel = getModelForClass(RenewStudentCard);

export default RenewStudentCardModel;
