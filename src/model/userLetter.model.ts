import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
  Severity,
} from "@typegoose/typegoose";
import { BankLoan } from "./Letters/bankLoan.model";
import { CancelCourse } from "./Letters/cancelCourse.model";
import { ChangeCourse } from "./Letters/changeCourse.model";
import { ConfirmStudying } from "./Letters/confirmStudying.model";
import { ContinueStudying } from "./Letters/continueStudying.model";
import { EnjoyPolicy } from "./Letters/enjoyPolicy.model";
import { LeaveAbsenceLess } from "./Letters/leaveAbsenceLess.model";
import { LeaveAbsenceMore } from "./Letters/leaveAbsenceMore.model";
import { LeavingSchool } from "./Letters/leavingSchool.model";
import { PaymentGraduationClass } from "./Letters/paymentGraduationClass.model";
import { PaymentGraduationPerson } from "./Letters/paymentGraduationPerson.model";
import { RenewStudentCard } from "./Letters/renewStudentCard.model";
import { ReservationAcademic } from "./Letters/reservationAcademic.model";
import { ResolveWork } from "./Letters/resolveWork.model";
import { User } from "./user.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class UserLetter {
  @prop({ ref: () => User, unique: true })
  user: Ref<User>;

  @prop({ ref: () => ConfirmStudying })
  confirmStudying?: Ref<ConfirmStudying>[];

  @prop({ ref: () => EnjoyPolicy })
  enjoyPolicy?: Ref<EnjoyPolicy>[];

  @prop({ ref: () => BankLoan })
  bankLoan?: Ref<BankLoan>[];

  @prop({ ref: () => CancelCourse })
  cancelCourse?: Ref<CancelCourse>[];

  @prop({ ref: () => ChangeCourse })
  changeCourse?: Ref<ChangeCourse>[];

  @prop({ ref: () => ContinueStudying })
  continueStudying?: Ref<ContinueStudying>[];

  @prop({ ref: () => LeaveAbsenceLess })
  leaveAbsenceLess?: Ref<LeaveAbsenceLess>[];

  @prop({ ref: () => LeaveAbsenceMore })
  leaveAbsenceMore?: Ref<LeaveAbsenceMore>[];

  @prop({ ref: () => LeavingSchool })
  leavingSchool?: Ref<LeavingSchool>[];

  @prop({ ref: () => PaymentGraduationClass })
  paymentGraduationClass?: Ref<PaymentGraduationClass>[];

  @prop({ ref: () => PaymentGraduationPerson })
  paymentGraduationPerson?: Ref<PaymentGraduationPerson>[];

  @prop({ ref: () => RenewStudentCard })
  renewStudentCard?: Ref<RenewStudentCard>[];

  @prop({ ref: () => ReservationAcademic })
  reservationAcademic?: Ref<ReservationAcademic>[];

  @prop({ ref: () => ResolveWork })
  resolveWork?: Ref<ResolveWork>[];
}

const UserLetterModel = getModelForClass(UserLetter);

export default UserLetterModel;
