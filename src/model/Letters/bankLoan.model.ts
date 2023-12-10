import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import {
  Gender,
  Majors,
  StatusLetter,
  TuitionObj,
  TuitionType,
} from "../../types/index";
import { Teacher } from "../teacher.model";
import { User } from "../user.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class BankLoan {
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

  @prop({ required: true, enum: Majors })
  majors: string;

  @prop({ required: true, type: () => [Date] })
  course: [Date];

  @prop({ required: true, type: String })
  class: string;

  @prop({ type: String })
  department?: string;

  @prop({ required: true, type: Date })
  schoolStart: Date;

  @prop({ required: true, type: Date })
  schoolEnd: Date;

  @prop({ required: true, type: Number })
  tuitionFee: number;

  @prop({ required: true, enum: TuitionType })
  tuitionType: string;

  @prop({ required: true, enum: TuitionObj })
  tuitionObj: string;

  @prop({ required: true, type: String })
  bankNumber: string;

  @prop({ required: true })
  bank: string;

  @prop({ required: true, enum: StatusLetter })
  status: string;

  @prop({ required: true, ref: () => Teacher })
  approved: Ref<Teacher>;

  @prop({ type: String })
  hashCode: string;

  @prop({ required: true, ref: () => User })
  user: Ref<User>;
}

const BankLoanModel = getModelForClass(BankLoan);

export default BankLoanModel;
