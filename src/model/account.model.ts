import {
  DocumentType,
  getModelForClass,
  modelOptions,
  pre,
  prop,
  ReturnModelType,
  Severity,
} from "@typegoose/typegoose";
import argon2 from "argon2";
import { AccountType } from "../types";
import log from "../utils/logger";

export const hashPassword = async (password: string) => {
  const hash = await argon2.hash(password);
  return hash;
};

@pre<Account>("findOneAndUpdate", async function (this: any) {
  this._update.password = await hashPassword(this._update.password);
})
@pre<Account>("save", async function () {
  if (!this.password.includes("$argon2")) {
    this.password = await hashPassword(this.password);
  }
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Account {
  @prop({ required: true, unique: true })
  username: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, enum: AccountType })
  type: "admin" | "user" | "teacher";

  @prop({ type: Boolean, default: false })
  isChangedPassword: boolean;

  @prop({ type: Number, default: 0 })
  stackLoginFailed: number;

  async validatePassword(
    this: DocumentType<Account>,
    candidatePassword: string
  ) {
    try {
      return await argon2.verify(this.password, candidatePassword);
    } catch (error) {
      log.error(error, "Could not validate password");
    }
  }

  public static async createAccount(
    this: ReturnModelType<typeof Account>,
    {
      username,
      password,
      type,
    }: { username: string; password: string; type: string }
  ) {
    return this.create({ username, password, type });
  }

  public static async findByMSV(
    this: ReturnModelType<typeof Account>,
    msv: string
  ) {
    return this.findOne({ username: msv });
  }
}

const AccountModel = getModelForClass(Account);

export default AccountModel;
