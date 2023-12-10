import _ from "lodash";
import AccountModel from "../model/account.model";
import { signJwt, verifyJwt } from "../utils/jwt";

export interface PayloadAccessToken {
  _id: string;
  username: string;
  type: "admin" | "teacher" | "user";
  userId?: string;
}

export async function signAccessToken(payload: PayloadAccessToken) {
  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: "30m",
  });

  return accessToken;
}

export async function signRefreshToken({ accountId }: { accountId: string }) {
  const refreshToken = signJwt(
    {
      accountId,
    },
    "refreshTokenPrivateKey",
    {
      expiresIn: "1y",
    }
  );

  return refreshToken;
}

export async function getInfoAccount({
  username,
  type,
}: {
  username: string;
  type: "admin" | "teacher" | "user";
}) {
  switch (type) {
    case "admin":
      const account = await AccountModel.findOne({ username: username });
      return _.omit(account, ["password", "_v"]);
    case "teacher":
      return null;
    default:
      return null;
  }
}

export async function getCurrentAccount(authorization: string) {
  const accessToken = authorization.replace(/^Bearer\s/, "");
  if (!accessToken) {
    return null;
  }
  const account = await verifyJwt(accessToken, "accessTokenPublicKey");
  return account || null;
}
