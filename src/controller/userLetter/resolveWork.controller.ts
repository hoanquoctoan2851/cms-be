import { Request, Response } from "express";
import ResolveWorkModel from "../../model/Letters/resolveWork.model";
import RsaKeyModel from "../../model/Letters/rsaKey";
import UserModel from "../../model/user.model";
import UserLetterModel from "../../model/userLetter.model";
import { createResolveWorkSchemaInput } from "../../schema/letters/resolveWork.schema";
import {
  GetCodeLetterParams,
  GetCodeLetterRequest,
  RequestParams,
  VerifyCodeLetterParams,
  VerifyCodeLetterRequest,
} from "../../schema/shared.schema";
import RSAService from "../../service/Rsa";
import { getCodeOtp, sendOTPLetter } from "../../utils/otp";

export async function createResolveWorkLetter(
  req: Request<{}, {}, createResolveWorkSchemaInput>,
  res: Response
) {
  try {
    const msv = req.body.msv;
    const user = await UserModel.findByMSV(msv);
    if (!user) {
      return res.send({
        success: false,
        message: "Not find user",
      });
    }
    const rsaData = await RsaKeyModel.findOne({
      user: user._id,
      teacher: req.body.approved,
    });

    let codeOtp: {
      otp: string;
      hashedOtp: string;
    };

    if (!rsaData) {
      const rsaKeyService = new RSAService({});
      const rsa = await RsaKeyModel.create({
        user: user._id,
        teacher: req.body.approved,
        publicKey: rsaKeyService.getPublicKey(),
        privateKey: rsaKeyService.getPrivateKey(),
      });
      codeOtp = getCodeOtp(rsa.privateKey, rsa.publicKey);
    } else {
      codeOtp = getCodeOtp(rsaData.privateKey, rsaData.publicKey);
    }

    const newLetter = await ResolveWorkModel.create({
      ...req.body,
      hashCode: codeOtp.hashedOtp,
    });

    if (newLetter) {
      await UserLetterModel.findOneAndUpdate(
        { user: user._id },
        {
          user: user,
          $push: { resolveWork: newLetter._id },
        },
        {
          new: true,
          upsert: true,
        }
      );

      return res.send({
        success: true,
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Can not create Letter",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error,
    });
  }
}

export async function getResolveWorkByUserId(
  req: Request<RequestParams>,
  res: Response
) {
  try {
    const { id: userId } = req.params;
    const letter = await UserLetterModel.findOne({ user: userId }).populate(
      "resolveWork"
    );

    if (!letter) {
      return res.send({
        success: false,
        message: "userId not match letter",
      });
    }

    return res.send({
      success: true,
      data: letter.resolveWork,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error,
    });
  }
}

export async function detailResolveWorkLetter(
  req: Request<RequestParams>,
  res: Response
) {
  try {
    const { id } = req.params;
    const data = await ResolveWorkModel.findById(id);
    return res.send({
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error,
    });
  }
}

export async function updateResolveWorkLetter(
  req: Request<{ id: string }, {}, createResolveWorkSchemaInput>,
  res: Response
) {
  const { id } = req.params;
  const letter = await ResolveWorkModel.findByIdAndUpdate(id, req.body, {
    new: true,
    upsert: true,
  });

  return res.send({
    success: true,
    data: letter,
  });
}

export async function deleteResolveWorkLetter(
  req: Request<{ id: string }>,
  res: Response
) {
  const { id } = req.params;
  try {
    const letter = await ResolveWorkModel.findById(id);
    if (!letter) {
      return res.send({
        success: false,
        message: "letter does not match",
      });
    }
    await letter.delete();
    const userLetter = await UserLetterModel.findOneAndUpdate(
      {
        resolveWork: letter,
      },
      {
        $pull: { resolveWork: id },
      },
      {
        new: true,
        upsert: true,
      }
    );

    return res.send({
      success: true,
      data: "Delete letter success",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error,
    });
  }
}

export async function getCodeLetter(
  req: Request<GetCodeLetterParams, {}, GetCodeLetterRequest>,
  res: Response
) {
  try {
    const { id } = req.params;
    const { msv, email, teacherId } = req.body;
    const letter = await ResolveWorkModel.findById(id);
    if (!letter) {
      return res.send({
        success: false,
        message: "Id not match Letter",
      });
    }

    const user = await UserModel.findByMSV(msv);

    if (!user) {
      return res.send({
        success: false,
        message: "User not match",
      });
    }

    const rsaKey = await RsaKeyModel.findOne({
      user: user?._id,
      teacher: teacherId,
    });

    if (!rsaKey) {
      return res.send({
        success: false,
        message: "Rsa key not find, you must create new letter",
      });
    }

    const rsaService = new RSAService({
      privateKey: rsaKey.privateKey,
      publicKey: rsaKey.publicKey,
    });

    const hashCode = letter.hashCode;
    const otp = rsaService.decrypt(hashCode);
    await sendOTPLetter({
      email: email,
      otp: otp,
    });

    return res.send({
      success: true,
      message: "Check your gmail",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error,
    });
  }
}

export async function verifyCodeLetter(
  req: Request<VerifyCodeLetterParams, {}, VerifyCodeLetterRequest>,
  res: Response
) {
  const { otp, msv, teacherId } = req.body;
  const { id } = req.params;

  const letter = await ResolveWorkModel.findById(id);

  if (!letter) {
    return res.send({
      success: false,
      message: "Id not match Letter",
    });
  }

  const user = await UserModel.findByMSV(msv);

  if (!user) {
    return res.send({
      success: false,
      message: "User not match",
    });
  }

  const rsaKey = await RsaKeyModel.findOne({
    user: user?._id,
    teacher: teacherId,
  });

  if (!rsaKey) {
    return res.send({
      success: false,
      message: "Rsa key not find, you must create new letter",
    });
  }

  const rsaService = new RSAService({
    privateKey: rsaKey.privateKey,
    publicKey: rsaKey.publicKey,
  });

  const otpLetter = rsaService.decrypt(letter.hashCode);

  const validOTP = otpLetter === otp;

  if (!validOTP) {
    return res.send({
      success: false,
      message: "OTP invalid",
    });
  }

  return res.send({
    success: true,
    message: "OTP verify success",
  });
}
