import { Request, Response } from "express";
import AccountModel from "../model/account.model";
import SessionModel from "../model/session.model";
import TeacherModel from "../model/teacher.model";
import UserModel from "../model/user.model";
import { accountInput, refreshTokenInput } from "../schema/account.schema";
import { signAccessToken, signRefreshToken } from "../service/auth.service";
import { verifyJwt } from "../utils/jwt";
import { responseError } from "../utils/response";

export async function loginController(
  req: Request<{}, {}, accountInput>,
  res: Response
) {
  try {
    const message = "Invalid username or password";
    const { username, password, type } = req.body;

    const account = await AccountModel.findOne({
      username,
    });

    if (!account) {
      return res.send({
        success: false,
        message,
      });
    }
    if (account.stackLoginFailed === 5) {
      return res.send({
        success: false,
        message: "Lock account",
      });
    }
    const isValid = await account.validatePassword(password);
    if (!isValid) {
      account.stackLoginFailed += 1;
      account.save();
      return res.send({
        success: false,
        message: "Invalid password",
      });
    }
    let userId = "";
    if (account.type === "teacher") {
      const teacher = await TeacherModel.findOne({
        phone: account.username,
      });
      userId = teacher?._id;
    } else if (account.type === "user") {
      const user = await UserModel.findByMSV(account.username);
      userId = user?._id;
    } else userId = "";

    const accessToken = await signAccessToken({
      _id: account._id,
      username: account.username,
      type: account.type,
      userId: userId,
    });

    const refreshToken = await signRefreshToken({ accountId: account._id });

    await SessionModel.create({ account: account, token: accessToken });

    account.stackLoginFailed = 0;
    account.save();
    return res.send({
      success: true,
      data: {
        accessToken,
        refreshToken,
        type: account.type,
        id: account._id,
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error,
    });
  }
}

export async function logoutController(req: Request, res: Response) {
  try {
    const currentAccount = res.locals.account;
    if (!currentAccount) {
      return res.send({
        success: true,
        message: "Logout successfully",
      });
    }
    const sessionDelete = await SessionModel.find({
      account: currentAccount._id,
    }).deleteMany();

    if (!sessionDelete) {
      return res.send(responseError("Logout fail"));
    }

    res.locals.account = null;
    return res.send({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error,
    });
  }
}

export async function refreshTokenController(
  req: Request<{}, {}, refreshTokenInput>,
  res: Response
) {
  try {
    const { refreshToken } = req.body;
    const accountInfo = await verifyJwt<{
      accountId: string;
      iat: number;
      exp: number;
    }>(refreshToken, "refreshTokenPublicKey");

    if (!accountInfo) {
      return res.sendStatus(500);
    }
    const account = await AccountModel.findById(accountInfo.accountId);
    if (!account) {
      return res.send(responseError("refresh token is not valid"));
    }

    let userId = "";
    if (account.type === "teacher") {
      const teacher = await TeacherModel.findOne({
        phone: account.username,
      });
      userId = teacher?._id;
    } else if (account.type === "user") {
      const user = await UserModel.findByMSV(account.username);
      userId = user?._id;
    } else userId = "";

    const accessToken = await signAccessToken({
      _id: account._id,
      username: account.username,
      type: account.type,
      userId: userId,
    });

    const newRefreshToken = await signRefreshToken({ accountId: account._id });

    return res.send({
      success: true,
      data: {
        accessToken,
        refreshToken: newRefreshToken,
        expiresIn: accountInfo.exp,
      },
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "Error refresh Token",
    });
  }
}
