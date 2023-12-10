"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLetter = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const bankLoan_model_1 = require("./Letters/bankLoan.model");
const cancelCourse_model_1 = require("./Letters/cancelCourse.model");
const changeCourse_model_1 = require("./Letters/changeCourse.model");
const confirmStudying_model_1 = require("./Letters/confirmStudying.model");
const continueStudying_model_1 = require("./Letters/continueStudying.model");
const enjoyPolicy_model_1 = require("./Letters/enjoyPolicy.model");
const leaveAbsenceLess_model_1 = require("./Letters/leaveAbsenceLess.model");
const leaveAbsenceMore_model_1 = require("./Letters/leaveAbsenceMore.model");
const leavingSchool_model_1 = require("./Letters/leavingSchool.model");
const paymentGraduationClass_model_1 = require("./Letters/paymentGraduationClass.model");
const paymentGraduationPerson_model_1 = require("./Letters/paymentGraduationPerson.model");
const renewStudentCard_model_1 = require("./Letters/renewStudentCard.model");
const reservationAcademic_model_1 = require("./Letters/reservationAcademic.model");
const resolveWork_model_1 = require("./Letters/resolveWork.model");
const user_model_1 = require("./user.model");
let UserLetter = class UserLetter {
};
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_model_1.User, unique: true }),
    __metadata("design:type", Object)
], UserLetter.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => confirmStudying_model_1.ConfirmStudying }),
    __metadata("design:type", Array)
], UserLetter.prototype, "confirmStudying", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => enjoyPolicy_model_1.EnjoyPolicy }),
    __metadata("design:type", Array)
], UserLetter.prototype, "enjoyPolicy", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => bankLoan_model_1.BankLoan }),
    __metadata("design:type", Array)
], UserLetter.prototype, "bankLoan", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => cancelCourse_model_1.CancelCourse }),
    __metadata("design:type", Array)
], UserLetter.prototype, "cancelCourse", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => changeCourse_model_1.ChangeCourse }),
    __metadata("design:type", Array)
], UserLetter.prototype, "changeCourse", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => continueStudying_model_1.ContinueStudying }),
    __metadata("design:type", Array)
], UserLetter.prototype, "continueStudying", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => leaveAbsenceLess_model_1.LeaveAbsenceLess }),
    __metadata("design:type", Array)
], UserLetter.prototype, "leaveAbsenceLess", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => leaveAbsenceMore_model_1.LeaveAbsenceMore }),
    __metadata("design:type", Array)
], UserLetter.prototype, "leaveAbsenceMore", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => leavingSchool_model_1.LeavingSchool }),
    __metadata("design:type", Array)
], UserLetter.prototype, "leavingSchool", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => paymentGraduationClass_model_1.PaymentGraduationClass }),
    __metadata("design:type", Array)
], UserLetter.prototype, "paymentGraduationClass", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => paymentGraduationPerson_model_1.PaymentGraduationPerson }),
    __metadata("design:type", Array)
], UserLetter.prototype, "paymentGraduationPerson", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => renewStudentCard_model_1.RenewStudentCard }),
    __metadata("design:type", Array)
], UserLetter.prototype, "renewStudentCard", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => reservationAcademic_model_1.ReservationAcademic }),
    __metadata("design:type", Array)
], UserLetter.prototype, "reservationAcademic", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => resolveWork_model_1.ResolveWork }),
    __metadata("design:type", Array)
], UserLetter.prototype, "resolveWork", void 0);
UserLetter = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW,
        },
    })
], UserLetter);
exports.UserLetter = UserLetter;
const UserLetterModel = (0, typegoose_1.getModelForClass)(UserLetter);
exports.default = UserLetterModel;
