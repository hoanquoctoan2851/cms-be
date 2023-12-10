import express, { Request, Response } from "express";
import AuthRouter from "./auth.routes";
import TeacherRouter from "./teacher.routes";
import UserRouter from "./user.routes";
import BankLoanRouter from "./userLetters/bankLoan.routes";
import CancelCourseRouter from "./userLetters/cancelCourse.routes";
import ChangeCourseRouter from "./userLetters/changeCourse.routes";
import UserLetterRouter from "./userLetters/confirmStudying.routes";
import ContinueStudyingRouter from "./userLetters/continueStudying.routes";
import EnjoyPolicyRouter from "./userLetters/enjoyPolicy.routes";
import LeaveAbsenceLessRouter from "./userLetters/leaveAbsenceLess.routes";
import LeaveAbsenceMoreRouter from "./userLetters/leaveAbsenceMore.routes";
import LeavingSchoolRouter from "./userLetters/leavingSchool.routes";
import PaymentGraduationRouter from "./userLetters/paymentGraduationClass.routes";
import PaymentGraduationPersonRouter from "./userLetters/paymentGraduationPerson.routes";
import RenewStudentCardRouter from "./userLetters/renewStudentCard.routes";
import ReservationAcademicRouter from "./userLetters/reservationAcademic.routes";
import ResolveWorkRouter from "./userLetters/resolveWork.routes";
import AdminRoutes from "./admin.routes";
const router = express.Router();

router.use(AdminRoutes);

router.use(AuthRouter);

router.use(TeacherRouter);

router.use(UserRouter);

router.use(UserLetterRouter);

router.use(EnjoyPolicyRouter);

router.use(BankLoanRouter);

router.use(CancelCourseRouter);

router.use(ContinueStudyingRouter);

router.use(LeaveAbsenceLessRouter);

router.use(LeaveAbsenceMoreRouter);

router.use(LeavingSchoolRouter);

router.use(PaymentGraduationRouter);

router.use(ChangeCourseRouter);

router.use(PaymentGraduationPersonRouter);

router.use(RenewStudentCardRouter);

router.use(ReservationAcademicRouter);

router.use(ResolveWorkRouter);

router.get("/api/me", (req: Request, res: Response) => {
  const account = res.locals.account;
  return res.send({
    success: true,
    data: account,
  });
});

export default router;
