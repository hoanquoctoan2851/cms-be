import {
  getModelForClass,
  index,
  modelOptions,
  prop,
  ReturnModelType,
  Severity,
} from "@typegoose/typegoose";
import { Gender, Majors } from "../types";

@index({ msv: 1 }, { unique: true })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({ type: String, required: true })
  name: string;


  @prop({ type: String, required: true, unique: true, uppercase: true })
  msv: string;

  @prop({ type: String, required: true, unique: true })
  email: string;

  @prop({ required: true, enum: Gender, lowercase: true })
  gender: string;

  @prop({ required: true, type: () => Date })
  birthDay: Date;

  @prop({ required: true, uppercase: true, type: String })
  class: string;

  @prop({ type: Number })
  age?: number;

  @prop({ required: true, enum: Majors })
  majors: string;

  @prop()
  phone?: string;

  @prop({ type: String })
  timeCourse?: string;

  @prop({ type: String })
  citizenId?: string;

  @prop({ type: String })
  placeCitizenId?: string;

  @prop({ type: () => Date })
  dateCitizenId?: Date | undefined;

  @prop({ type: String })
  address?: string;

  @prop({ type: String })
  hometown?: string;

  @prop({ type: String })
  permanentResidence?: string;

  @prop({ type: String })
  parentName?: string;

  @prop({ type: String })
  parentPhone?: string;

  @prop({ type: Number })
  balance?: number;

  public static async findByMSV(
    this: ReturnModelType<typeof User>,
    msv: string
  ) {
    return this.findOne({ msv });
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
