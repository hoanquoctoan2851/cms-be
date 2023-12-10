import { NextFunction, Request, Response } from "express";
import { getCurrentAccount } from "../service/auth.service";

const accountLogged = async (
  req: Request,
  res: Response<{}, { account: any }>,
  next: NextFunction
) => {
  const currentAccount = await getCurrentAccount(
    req.headers.authorization || ""
  );

  res.locals.account = currentAccount;
  next();
};

export default accountLogged;
