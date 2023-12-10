import {
  getModelForClass,
  index,
  modelOptions,
  prop,
  ReturnModelType,
  Severity,
} from "@typegoose/typegoose";
import { AccountType, Gender, Majors } from "../types";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Admins {
  @prop({ required: true, unique: true })
  username: string;

  @prop({ required: true })
  code: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true })
  signature: string;

  @prop({ type: Boolean, default: false })
  isChangedPassword: boolean;

  @prop({ type: Number, default: 0 })
  stackLoginFailed: number;

  public static async findById(
    this: ReturnModelType<typeof Admins>,
    code: string
  ) {
    return this.findOne({ code });
  }
}

const AdminModel = getModelForClass(Admins);

export default AdminModel;
