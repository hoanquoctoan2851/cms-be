import { prop } from "@typegoose/typegoose";

export default class ConfirmPayment {
  @prop({ required: true, type: () => String })
  content: string;

  @prop({ required: true, type: () => String })
  signature: string;
}
