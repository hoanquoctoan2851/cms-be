import { Request, Response } from "express";
import { StatusLetter } from "../types";
import BankLoanModel from "../model/Letters/bankLoan.model";
import ConfirmStudyingModel from "../model/Letters/confirmStudying.model";
import CancelCourseModel from "../model/Letters/cancelCourse.model";
import ChangeCourseModel from "../model/Letters/changeCourse.model";
import ContinueStudyingModel from "../model/Letters/continueStudying.model";
import EnjoyPolicyModel from "../model/Letters/enjoyPolicy.model";
import LeaveAbsenceLessModel from "../model/Letters/leaveAbsenceLess.model";
import LeaveAbsenceMoreModel from "../model/Letters/leaveAbsenceMore.model";
import LeavingSchoolModel from "../model/Letters/leavingSchool.model";
import PaymentGraduationClassModel from "../model/Letters/paymentGraduationClass.model";
import PaymentGraduationPersonModel from "../model/Letters/paymentGraduationPerson.model";
import RenewStudentCardModel from "../model/Letters/renewStudentCard.model";
import ReservationAcademicModel from "../model/Letters/reservationAcademic.model";
import ResolveWorkModel from "../model/Letters/resolveWork.model";
import { GetUserMsvInput } from "../schema/user.schema";
import UserModel from "../model/user.model";
import AdminModel from "../model/admin.model";

export async function getAllLetterApply(
  req: Request<
    {},
    {},
    {},
    { name?: string; msv?: string; status?: StatusLetter }
  >,
  res: Response
) {
  const { name, msv, status } = req.query;
  const payload = {
    status
      : 'confirm',
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

export async function getAdminById(
  req: Request<any>,
  res: Response
) {
  try {
    const admin = await AdminModel.find({});
    return res.send({ success: true, data: admin });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error,
    });
  }
}