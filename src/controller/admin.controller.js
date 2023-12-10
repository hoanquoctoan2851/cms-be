"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminById = exports.getAllLetterApply = void 0;
const bankLoan_model_1 = __importDefault(require("../model/Letters/bankLoan.model"));
const confirmStudying_model_1 = __importDefault(require("../model/Letters/confirmStudying.model"));
const cancelCourse_model_1 = __importDefault(require("../model/Letters/cancelCourse.model"));
const changeCourse_model_1 = __importDefault(require("../model/Letters/changeCourse.model"));
const continueStudying_model_1 = __importDefault(require("../model/Letters/continueStudying.model"));
const enjoyPolicy_model_1 = __importDefault(require("../model/Letters/enjoyPolicy.model"));
const leaveAbsenceLess_model_1 = __importDefault(require("../model/Letters/leaveAbsenceLess.model"));
const leaveAbsenceMore_model_1 = __importDefault(require("../model/Letters/leaveAbsenceMore.model"));
const leavingSchool_model_1 = __importDefault(require("../model/Letters/leavingSchool.model"));
const paymentGraduationClass_model_1 = __importDefault(require("../model/Letters/paymentGraduationClass.model"));
const paymentGraduationPerson_model_1 = __importDefault(require("../model/Letters/paymentGraduationPerson.model"));
const renewStudentCard_model_1 = __importDefault(require("../model/Letters/renewStudentCard.model"));
const reservationAcademic_model_1 = __importDefault(require("../model/Letters/reservationAcademic.model"));
const resolveWork_model_1 = __importDefault(require("../model/Letters/resolveWork.model"));
const admin_model_1 = __importDefault(require("../model/admin.model"));
function getAllLetterApply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, msv, status } = req.query;
        const payload = Object.assign(Object.assign({ status: 'confirm' }, (name && { name: { $regex: new RegExp(name) } })), (msv && { msv: { $regex: new RegExp(msv) } }));
        const bankLoanLetter = yield bankLoan_model_1.default.find(payload).populate("user");
        const confirmLetterApprove = yield confirmStudying_model_1.default.find(payload).populate("user");
        const cancelCourseLetter = yield cancelCourse_model_1.default.find(payload).populate("user");
        const changeCourseLetter = yield changeCourse_model_1.default.find(payload).populate("user");
        const continueStudyingLetter = yield continueStudying_model_1.default.find(payload).populate("user");
        const enjoyPolicyLetter = yield enjoyPolicy_model_1.default.find(payload).populate("user");
        const leaveAbsenceLessLetter = yield leaveAbsenceLess_model_1.default.find(payload).populate("user");
        const leaveAbsenceMoreLetter = yield leaveAbsenceMore_model_1.default.find(payload).populate("user");
        const leavingSchoolLetter = yield leavingSchool_model_1.default.find(payload).populate("user");
        const paymentClassLetter = yield paymentGraduationClass_model_1.default.find(payload).populate("user");
        const paymentPersonLetter = yield paymentGraduationPerson_model_1.default.find(payload).populate("user");
        const renewStudentCardLetter = yield renewStudentCard_model_1.default.find(payload).populate("user");
        const reservationAcademicLetter = yield reservationAcademic_model_1.default.find(payload).populate("user");
        const resolveWorkLetter = yield resolveWork_model_1.default.find(payload).populate("user");
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
    });
}
exports.getAllLetterApply = getAllLetterApply;
function getAdminById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const admin = yield admin_model_1.default.find({});
            return res.send({ success: true, data: admin });
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                data: error,
            });
        }
    });
}
exports.getAdminById = getAdminById;
