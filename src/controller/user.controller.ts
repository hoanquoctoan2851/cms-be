import dayjs from "dayjs";
import { Request, Response } from "express";
import { omit } from "lodash";
import AccountModel from "../model/account.model";
import UserModel from "../model/user.model";
import UserLetterModel from "../model/userLetter.model";
import { createUser } from "../service/user.service";
import { responseError } from "../utils/response";
import { QueryGetList } from "./../schema/shared.schema";
import {
  CreateUserInput,
  DeleteUserInput,
  GetAllLetterRequest,
  GetUserMsvInput,
  UpdateUserInput,
} from "./../schema/user.schema";

export async function getListUsers(
  req: Request<{}, {}, QueryGetList, QueryGetList>,
  res: Response
) {
  try {
    const { page, limit, name, msv, class: classQuery, majors } = req.query;
    const _page = page ? parseInt(page) : 1;
    const _limit = limit ? parseInt(limit) : null;
    const filter: any = {
      ...(name && { name: { $regex: new RegExp(name) } }),
      ...(classQuery && { class: classQuery }),
      ...(msv && { msv: msv }),
      ...(majors && { majors: majors }),
    };

    let users;
    if (_page && _limit) {
      users = await UserModel.find(filter)
        .skip(_limit * _page - _limit)
        .limit(_limit)
        .sort({ name: 1 });
    } else {
      users = await UserModel.find(filter).sort({ name: 1 });
    }
    const total = await UserModel.find(filter).count();
    return res.send({
      success: true,
      data: users,
      meta: {
        page: _page,
        limit: _limit,
        total,
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error,
    });
  }
}

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;
  const dateCitizenId = body.dateCitizenId
    ? new Date(body.dateCitizenId)
    : undefined;
  const payload = {
    ...body,
    birthDay: new Date(body.birthDay),
    dateCitizenId,
  };

  try {
    const user = await createUser(payload);
    const birthDayGen = dayjs(user.birthDay).format("DDMMYYYY");
    const payloadUpdate = {
      username: user.msv.toUpperCase(),
      password: `${birthDayGen}`,
      type: "user",
    };
    const newAccount = await AccountModel.findOneAndUpdate(
      {
        username: user.msv,
      },
      payloadUpdate,
      {
        new: true,
        upsert: true,
      }
    );

    const ac = omit(newAccount.toJSON(), ["password"]);

    return res.send({
      success: true,
      data: {
        user: user,
        account: ac,
      },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      data: e,
    });
  }
}

export async function createListUserHandler(
  req: Request<{}, {}, CreateUserInput[]>,
  res: Response
) {
  const bodies = Object.values(req.body); // Assuming an array of user objects

  try {
    const createdUsers = [];
    const createdAccounts = [];

    for (const body of bodies) {
      const dateCitizenId = body.dateCitizenId
        ? new Date(body.dateCitizenId)
        : undefined;
      const payload = {
        ...body,
        birthDay: new Date(body.birthDay),
        dateCitizenId,
      };

      const user = await createUser(payload);
      const birthDayGen = dayjs(user.birthDay).format("DDMMYYYY");

      const payloadUpdate = {
        username: user.msv.toUpperCase(),
        password: `${birthDayGen}`,
        type: "user",
      };

      const newAccount = await AccountModel.findOneAndUpdate(
        {
          username: user.msv,
        },
        payloadUpdate,
        {
          new: true,
          upsert: true,
        }
      );

      const ac = omit(newAccount.toJSON(), ["password"]);

      createdUsers.push(user);
      createdAccounts.push(ac);
    }

    return res.send({
      success: true,
      data: {
        users: createdUsers,
        accounts: createdAccounts,
      },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      data: e,
    });
  }
}

export async function updateUser(
  req: Request<UpdateUserInput["params"], {}, UpdateUserInput["body"]>,
  res: Response
) {
  const { msv } = req.params;
  try {
    const userOld = await UserModel.findByMSV(msv);

    if (!userOld) {
      return res.send(responseError("User does not match"));
    }

    const account = await AccountModel.findOne({
      username: userOld.msv,
    });

    const user = await UserModel.findOneAndUpdate({ msv: msv }, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User does not match",
      });
    }

    if (!user) {
      return res.send(responseError("User does not match"));
    }

    const birthDayGen = dayjs(user.birthDay).format("DDMMYYYY");

    if (account) {
      account.username = user.msv.toUpperCase();
      if (!account.isChangedPassword) {
        account.password = birthDayGen;
      }
      account.save();
    }

    return res.send({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error,
    });
  }
}

export async function getUserByMsv(
  req: Request<GetUserMsvInput>,
  res: Response
) {
  try {
    const user = await UserModel.findOne({ msv: req.params.msv });
    return res.send({ success: true, data: user });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error,
    });
  }
}

export async function deleteUser(req: Request<DeleteUserInput>, res: Response) {
  const msv = req.params.msv;
  try {
    const user = await UserModel.findOne({ msv });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not match",
      });
    }
    await AccountModel.findOneAndDelete({ username: user.msv });
    user.delete();
    return res.send({
      success: true,
      message: "Delete User Success",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error,
    });
  }
}

export async function changePasswordUser(
  req: Request<
    {},
    {},
    { msv: string; oldPassword: string; newPassword: string }
  >,
  res: Response
) {
  try {
    const { msv, oldPassword, newPassword } = req.body;
    const account = await AccountModel.findByMSV(msv);
    if (!account) {
      return res.status(500).send({
        success: false,
        message: "Account not match",
      });
    }

    const isValid = await account.validatePassword(oldPassword);

    if (!isValid) {
      return res.status(500).send({
        success: false,
        message: "Old Password is valid",
      });
    }
    const accountUpdate = await AccountModel.findOneAndUpdate(
      {
        username: msv,
        type: "user",
      },
      {
        password: newPassword,
        isChangedPassword: true,
      },
      {
        new: true,
      }
    );

    if (!accountUpdate) {
      return res.send({
        success: true,
        message: "Account not match",
      });
    }

    return res.send({
      success: true,
      data: accountUpdate,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error,
    });
  }
}

export async function getAllLetter(
  req: Request<GetAllLetterRequest>,
  res: Response
) {
  const { msv } = req.params;
  const user = await UserModel.findByMSV(msv);
  if (user) {
    const allLetter = await UserLetterModel.findOne({
      user: user?._id,
    })
      .populate({
        path: "bankLoan",
        populate: {
          path: "approved",
        },
      })
      .populate({
        path: "cancelCourse",
        populate: {
          path: "approved",
        },
      })
      .populate({
        path: "changeCourse",
        populate: {
          path: "approved",
        },
      })
      .populate({
        path: "confirmStudying",
        populate: {
          path: "approved",
        },
      })
      .populate({
        path: "continueStudying",
        populate: {
          path: "approved",
        },
      })
      .populate({
        path: "enjoyPolicy",
        populate: {
          path: "approved",
        },
      })
      .populate({
        path: "leaveAbsenceLess",
        populate: {
          path: "approved",
        },
      })
      .populate({
        path: "leaveAbsenceMore",
        populate: {
          path: "approved",
        },
      })
      .populate({
        path: "leavingSchool",
        populate: {
          path: "approved",
        },
      })
      .populate({
        path: "paymentGraduationClass",
        populate: {
          path: "approved",
        },
      })
      .populate({
        path: "paymentGraduationPerson",
        populate: {
          path: "approved",
        },
      })
      .populate({
        path: "renewStudentCard",
        populate: {
          path: "approved",
        },
      })
      .populate({
        path: "reservationAcademic",
        populate: {
          path: "approved",
        },
      })
      .populate({
        path: "resolveWork",
        populate: {
          path: "approved",
        },
      });

    return res.send({
      success: true,
      data: allLetter,
    });
  }
  return res.send({
    success: false,
  });
}


export async function depositUser(
  req: Request<UpdateUserInput["params"], {}, UpdateUserInput["body"]>,
  res: Response
) {
  try {
    const { msv } = req.params;
    const {balance} = req.body
    const user = await UserModel.findByMSV(msv);
    if (!user) {
      return res.status(404).send(responseError("User not found"));
    }// @ts-ignore
    user.balance = user.balance + balance;
    if(user.balance < 0) {
      user.balance = 0
    }
    const updatedUser = await user.save();
    return res.send({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: "Internal Server Error",
    });
  }
}

