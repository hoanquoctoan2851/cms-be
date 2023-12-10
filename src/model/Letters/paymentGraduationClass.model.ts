import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { StatusLetter } from "../../types/index";
import { Teacher } from "../teacher.model";
import { User } from "../user.model";
import ConfirmPayment from "./ConfirmPayment";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class PaymentGraduationClass {
  @prop({ required: true, type: String, uppercase: true })
  msv: string;

  @prop({ required: true, type: String })
  class: string;

  @prop({ required: true, type: Number })
  amountStudent: number;

  @prop({ type: String, required: true })
  decisionNumber: string;

  @prop({ type: Date, required: true })
  dateDecisionAssign: Date;

  @prop({ type: () => ConfirmPayment })
  libraryCenter?: ConfirmPayment;

  @prop({ type: () => ConfirmPayment })
  financial?: ConfirmPayment;

  @prop({ type: () => ConfirmPayment })
  studentManagementSystem?: ConfirmPayment;

  @prop({ type: () => ConfirmPayment })
  trainingDepartment?: ConfirmPayment;

  @prop({ required: true, enum: StatusLetter })
  status: string;

  @prop({ required: true, ref: () => Teacher })
  approved: Ref<Teacher>;

  @prop({ type: String })
  hashCode: string;

  @prop({ required: true, ref: () => User })
  user: Ref<User>;
}

const PaymentGraduationClassModel = getModelForClass(PaymentGraduationClass);

export default PaymentGraduationClassModel;
