"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const teacher_routes_1 = __importDefault(require("./teacher.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const bankLoan_routes_1 = __importDefault(require("./userLetters/bankLoan.routes"));
const cancelCourse_routes_1 = __importDefault(require("./userLetters/cancelCourse.routes"));
const changeCourse_routes_1 = __importDefault(require("./userLetters/changeCourse.routes"));
const confirmStudying_routes_1 = __importDefault(require("./userLetters/confirmStudying.routes"));
const continueStudying_routes_1 = __importDefault(require("./userLetters/continueStudying.routes"));
const enjoyPolicy_routes_1 = __importDefault(require("./userLetters/enjoyPolicy.routes"));
const leaveAbsenceLess_routes_1 = __importDefault(require("./userLetters/leaveAbsenceLess.routes"));
const leaveAbsenceMore_routes_1 = __importDefault(require("./userLetters/leaveAbsenceMore.routes"));
const leavingSchool_routes_1 = __importDefault(require("./userLetters/leavingSchool.routes"));
const paymentGraduationClass_routes_1 = __importDefault(require("./userLetters/paymentGraduationClass.routes"));
const paymentGraduationPerson_routes_1 = __importDefault(require("./userLetters/paymentGraduationPerson.routes"));
const renewStudentCard_routes_1 = __importDefault(require("./userLetters/renewStudentCard.routes"));
const reservationAcademic_routes_1 = __importDefault(require("./userLetters/reservationAcademic.routes"));
const resolveWork_routes_1 = __importDefault(require("./userLetters/resolveWork.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const router = express_1.default.Router();
router.use(admin_routes_1.default);
router.use(auth_routes_1.default);
router.use(teacher_routes_1.default);
router.use(user_routes_1.default);
router.use(confirmStudying_routes_1.default);
router.use(enjoyPolicy_routes_1.default);
router.use(bankLoan_routes_1.default);
router.use(cancelCourse_routes_1.default);
router.use(continueStudying_routes_1.default);
router.use(leaveAbsenceLess_routes_1.default);
router.use(leaveAbsenceMore_routes_1.default);
router.use(leavingSchool_routes_1.default);
router.use(paymentGraduationClass_routes_1.default);
router.use(changeCourse_routes_1.default);
router.use(paymentGraduationPerson_routes_1.default);
router.use(renewStudentCard_routes_1.default);
router.use(reservationAcademic_routes_1.default);
router.use(resolveWork_routes_1.default);
router.get("/api/me", (req, res) => {
    const account = res.locals.account;
    return res.send({
        success: true,
        data: account,
    });
});
exports.default = router;
