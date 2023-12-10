import {
  getModelForClass,
  index,
  modelOptions,
  prop,
} from "@typegoose/typegoose";

@index({ phone: 1 }, { unique: true })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Teacher {
  @prop({ required: true, type: String })
  name: string;

  @prop({ type: String, required: true, unique: true })
  phone: string;

  @prop({ type: String, required: true, unique: true })
  email: string;

  @prop({ required: true, type: () => Date })
  birthDay: Date;

  @prop({ type: Number })
  age?: number;

  @prop({ type: String })
  gender?: string;

  @prop({ type: String })
  address?: string;
}

const TeacherModel = getModelForClass(Teacher);

export default TeacherModel;
