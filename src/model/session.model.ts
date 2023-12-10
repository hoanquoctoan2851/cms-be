import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Account } from "./account.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Session {
  @prop({ ref: () => Account })
  account: Ref<Account>;

  @prop({ required: true, type: String })
  token: string;
}

const SessionModel = getModelForClass(Session);

export default SessionModel;
