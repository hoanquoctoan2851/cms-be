import { NextFunction, Request, Response } from "express";
import AccountModel from "../model/account.model";

const genAdminAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const admin = await AccountModel.findOne({ username: "admin" });

  if (admin) {
    return next();
  } else {
    AccountModel.create({
      username: "admin",
      password: "abc123456",
      type: "admin",
    });
    return next();
  }
};

export default genAdminAccount;
