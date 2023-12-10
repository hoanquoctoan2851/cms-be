import { NextFunction, Request, Response } from "express";

const permissionTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accountUser = res.locals.account;
  if (!accountUser) {
    return res.sendStatus(401);
  } else {
    if (["teacher", "admin"].includes(accountUser.type)) {
      next();
    } else {
      return res.sendStatus(403);
    }
  }
};

export default permissionTeacher;
