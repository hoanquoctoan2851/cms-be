import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Teacher } from "../teacher.model";
import { User } from "../user.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class RsaKey {
  @prop({ required: true, ref: () => Teacher })
  teacher: Ref<Teacher>;

  @prop({ required: true, ref: () => User })
  user: Ref<User>;

  @prop({ required: true, type: String })
  publicKey: string;

  @prop({ required: true, type: String })
  privateKey: string;
}

const RsaKeyModel = getModelForClass(RsaKey);

export default RsaKeyModel;
