import { DocumentType } from "@typegoose/typegoose";
import dayjs from "dayjs";
import { Request, Response } from "express";
import { omit } from "lodash";
import BankLoanModel from "../model/Letters/bankLoan.model";
import CancelCourseModel from "../model/Letters/cancelCourse.model";
import ChangeCourseModel from "../model/Letters/changeCourse.model";
import ConfirmStudyingModel from "../model/Letters/confirmStudying.model";
import ContinueStudyingModel from "../model/Letters/continueStudying.model";
import EnjoyPolicyModel from "../model/Letters/enjoyPolicy.model";
import LeavingSchoolModel from "../model/Letters/leavingSchool.model";
import PaymentGraduationClassModel from "../model/Letters/paymentGraduationClass.model";
import PaymentGraduationPersonModel from "../model/Letters/paymentGraduationPerson.model";
import RenewStudentCardModel from "../model/Letters/renewStudentCard.model";
import ResolveWorkModel from "../model/Letters/resolveWork.model";
import AccountModel, { Account } from "../model/account.model";
import TeacherModel from "../model/teacher.model";
import { QueryGetList, RequestParams } from "../schema/shared.schema";
import {
  createTeacherSchemaInput,
  updateTeacherSchemaInput,
} from "../schema/teacher.schema";
import { StatusLetter } from "../types";
import { responseError } from "../utils/response";
import LeaveAbsenceLessModel from "./../model/Letters/leaveAbsenceLess.model";
import LeaveAbsenceMoreModel from "./../model/Letters/leaveAbsenceMore.model";
import ReservationAcademicModel from "./../model/Letters/reservationAcademic.model";

export async function getListTeachers(
  req: Request<{}, {}, {}, QueryGetList>,
  res: Response
) {
  try {
    const { page, limit, name, phone } = req.query;
    const _page = page ? parseInt(page) : 1;
    const _limit = limit ? parseInt(limit) : null;
    const filter: any = {
      ...(name && { name: { $regex: new RegExp(name) } }),
      ...(phone && { phone: phone }),
    };

    let teachers;
    if (_page && _limit) {
      teachers = await TeacherModel.find(filter)
        .skip(_limit * _page - _limit)
        .limit(_limit)
        .sort({ name: 1 });
    } else {
      teachers = await TeacherModel.find(filter).sort({ name: 1 });
    }

    const total = await TeacherModel.find(filter).count();
    return res.send({
      success: true,
      data: teachers,
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

export async function createTeacherHandler(
  req: Request<{}, {}, createTeacherSchemaInput>,
  res: Response
) {
  const body = req.body;

  try {
    const teacher = await TeacherModel.create(body);
    const birthDayGen = dayjs(teacher.birthDay).format("DDMMYYYY");

    const payloadUpdate = {
      username: `${teacher.phone}`,
        password: `${birthDayGen}`,
      type: "teacher",
    };
    const newAccount = await AccountModel.findOneAndUpdate(
      {
        username: `${teacher.phone}`,
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
        teacher: teacher,
        account: ac,
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error,
    });
  }
}

export async function createListTeacherHandler(
  req: Request<{}, {}, createTeacherSchemaInput[]>,
  res: Response
) {
  const bodies =Object.values(req.body); // Assuming an array of teacher objects
  console.log(bodies);
  try {
    const createdTeachers = [];
    const createdAccounts = [];

    for (const body of bodies) {
      const teacher = await TeacherModel.create(body);
      const birthDayGen = dayjs(teacher.birthDay).format("DDMMYYYY");
      const payloadUpdate = {
        username: `${teacher.phone}`,
        password: `${birthDayGen}`,
        type: "teacher",
      };

      const newAccount = await AccountModel.findOneAndUpdate(
        {
          username: `${teacher.phone}`,
        },
        payloadUpdate,
        {
          new: true,
          upsert: true,
        }
      );

      const ac = omit(newAccount.toJSON(), ["password"]);

      createdTeachers.push(teacher);
      createdAccounts.push(ac);
    }

    return res.send({
      success: true,
      data: {
        teachers: createdTeachers,
        accounts: createdAccounts,
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error,
    });
  }
}

export async function getTeacherById(
  req: Request<RequestParams>,
  res: Response
) {
  try {
    const teacher = await TeacherModel.findById(req.params.id);

    if (!teacher) {
      return res.status(500).send(responseError("Teacher does not match"));
    }

    return res.send({
      success: true,
      data: teacher,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error,
    });
  }
}

export async function updateTeacherById(
  req: Request<RequestParams, {}, updateTeacherSchemaInput["body"]>,
  res: Response
) {
  try {
    const teacherOld = await TeacherModel.findById(req.params.id);

    if (!teacherOld) {
      return res.send({
        success: false,
        message: "Teacher does not match",
      });
    }

    const account: DocumentType<Account> | null = await AccountModel.findOne({
      username: teacherOld.phone,
    });

    const teacher = await TeacherModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
      }
    );
    if (!teacher) {
      return res.send({
        success: false,
        message: "Teacher does not match",
      });
    }

    const birthDayGen = dayjs(teacher.birthDay).format("DDMMYYYY");

    if (account) {
      account.username = teacher.phone;
      if (!account.isChangedPassword) {
        account.password = birthDayGen;
      }
      account.save();
    }

    return res.send({
      success: true,
      data: teacher,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error,
    });
  }
}

export async function deleteTeacherById(
  req: Request<RequestParams>,
  res: Response
) {
  const teacherId = req.params.id;
  try {
    const teacher = await TeacherModel.findByIdAndDelete(teacherId);
    if (!teacher) {
      return res.send({
        success: false,
        message: "Teacher does not match",
      });
    }
    await AccountModel.findOneAndDelete({
      username: teacher?.phone,
      type: "teacher",
    });

    return res.send({
      success: true,
      message: "Delete successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error,
    });
  }
}

export async function changePasswordTeacher(
  req: Request<
    {},
    {},
    { phone: string; oldPassword: string; newPassword: string }
  >,
  res: Response
) {
  try {
    const { phone, oldPassword, newPassword } = req.body;
    const account = await AccountModel.findOne({
      username: phone,
    });

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
        username: phone,
        type: "teacher",
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

export async function getAllLetterApply(
  req: Request<
    { id: string },
    {},
    {},
    { name?: string; msv?: string; status?: StatusLetter }
  >,
  res: Response
) {
  const { name, msv, status } = req.query;
  const { id } = req.params;
  const payload = {
    approved: id,
    ...(status && { status: status }),
    ...(name && { name: { $regex: new RegExp(name) } }),
    ...(msv && { msv: { $regex: new RegExp(msv) } }),
  };
  const bankLoanLetter = await BankLoanModel.find(payload).populate("user");
  const confirmLetterApprove = await ConfirmStudyingModel.find(
    payload
  ).populate("user");
  const cancelCourseLetter = await CancelCourseModel.find(payload).populate(
    "user"
  );
  const changeCourseLetter = await ChangeCourseModel.find(payload).populate(
    "user"
  );
  const continueStudyingLetter = await ContinueStudyingModel.find(
    payload
  ).populate("user");
  const enjoyPolicyLetter = await EnjoyPolicyModel.find(payload).populate(
    "user"
  );
  const leaveAbsenceLessLetter = await LeaveAbsenceLessModel.find(
    payload
  ).populate("user");
  const leaveAbsenceMoreLetter = await LeaveAbsenceMoreModel.find(
    payload
  ).populate("user");
  const leavingSchoolLetter = await LeavingSchoolModel.find(payload).populate(
    "user"
  );
  const paymentClassLetter = await PaymentGraduationClassModel.find(
    payload
  ).populate("user");
  const paymentPersonLetter = await PaymentGraduationPersonModel.find(
    payload
  ).populate("user");
  const renewStudentCardLetter = await RenewStudentCardModel.find(
    payload
  ).populate("user");
  const reservationAcademicLetter = await ReservationAcademicModel.find(
    payload
  ).populate("user");
  const resolveWorkLetter = await ResolveWorkModel.find(payload).populate(
    "user"
  );

  const listLetter = {
    bankLoan: bankLoanLetter,
    cancelCourse: cancelCourseLetter,
    changeCourse: changeCourseLetter,
    confirmStudying: confirmLetterApprove,
    enjoyPolicy: enjoyPolicyLetter,
    leaveAbsenceLess: leaveAbsenceLessLetter,
    leaveAbsenceMore: leaveAbsenceMoreLetter,
    leavingSchool: leavingSchoolLetter,
    continueStudying: continueStudyingLetter,
    paymentGraduationClass: paymentClassLetter,
    paymentGraduationPerson: paymentPersonLetter,
    renewStudentCard: renewStudentCardLetter,
    reservationAcademic: reservationAcademicLetter,
    resolveWork: resolveWorkLetter,
  };

  return res.send({
    success: true,
    data: listLetter,
  });
}
