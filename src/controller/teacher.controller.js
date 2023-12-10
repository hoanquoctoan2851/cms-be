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
exports.getAllLetterApply = exports.changePasswordTeacher = exports.deleteTeacherById = exports.updateTeacherById = exports.getTeacherById = exports.createListTeacherHandler = exports.createTeacherHandler = exports.getListTeachers = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const lodash_1 = require("lodash");
const bankLoan_model_1 = __importDefault(require("../model/Letters/bankLoan.model"));
const cancelCourse_model_1 = __importDefault(require("../model/Letters/cancelCourse.model"));
const changeCourse_model_1 = __importDefault(require("../model/Letters/changeCourse.model"));
const confirmStudying_model_1 = __importDefault(require("../model/Letters/confirmStudying.model"));
const continueStudying_model_1 = __importDefault(require("../model/Letters/continueStudying.model"));
const enjoyPolicy_model_1 = __importDefault(require("../model/Letters/enjoyPolicy.model"));
const leavingSchool_model_1 = __importDefault(require("../model/Letters/leavingSchool.model"));
const paymentGraduationClass_model_1 = __importDefault(require("../model/Letters/paymentGraduationClass.model"));
const paymentGraduationPerson_model_1 = __importDefault(require("../model/Letters/paymentGraduationPerson.model"));
const renewStudentCard_model_1 = __importDefault(require("../model/Letters/renewStudentCard.model"));
const resolveWork_model_1 = __importDefault(require("../model/Letters/resolveWork.model"));
const account_model_1 = __importDefault(require("../model/account.model"));
const teacher_model_1 = __importDefault(require("../model/teacher.model"));
const response_1 = require("../utils/response");
const leaveAbsenceLess_model_1 = __importDefault(require("./../model/Letters/leaveAbsenceLess.model"));
const leaveAbsenceMore_model_1 = __importDefault(require("./../model/Letters/leaveAbsenceMore.model"));
const reservationAcademic_model_1 = __importDefault(require("./../model/Letters/reservationAcademic.model"));
function getListTeachers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { page, limit, name, phone } = req.query;
            const _page = page ? parseInt(page) : 1;
            const _limit = limit ? parseInt(limit) : null;
            const filter = Object.assign(Object.assign({}, (name && { name: { $regex: new RegExp(name) } })), (phone && { phone: phone }));
            let teachers;
            if (_page && _limit) {
                teachers = yield teacher_model_1.default.find(filter)
                    .skip(_limit * _page - _limit)
                    .limit(_limit)
                    .sort({ name: 1 });
            }
            else {
                teachers = yield teacher_model_1.default.find(filter).sort({ name: 1 });
            }
            const total = yield teacher_model_1.default.find(filter).count();
            return res.send({
                success: true,
                data: teachers,
                meta: {
                    page: _page,
                    limit: _limit,
                    total,
                },
            });
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                data: error,
            });
        }
    });
}
exports.getListTeachers = getListTeachers;
function createTeacherHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        try {
            const teacher = yield teacher_model_1.default.create(body);
            const birthDayGen = (0, dayjs_1.default)(teacher.birthDay).format("DDMMYYYY");
            const payloadUpdate = {
                username: `${teacher.phone}`,
                password: `${birthDayGen}`,
                type: "teacher",
            };
            const newAccount = yield account_model_1.default.findOneAndUpdate({
                username: `${teacher.phone}`,
            }, payloadUpdate, {
                new: true,
                upsert: true,
            });
            const ac = (0, lodash_1.omit)(newAccount.toJSON(), ["password"]);
            return res.send({
                success: true,
                data: {
                    teacher: teacher,
                    account: ac,
                },
            });
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                data: error,
            });
        }
    });
}
exports.createTeacherHandler = createTeacherHandler;
function createListTeacherHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodies = Object.values(req.body); // Assuming an array of teacher objects
        console.log(bodies);
        try {
            const createdTeachers = [];
            const createdAccounts = [];
            for (const body of bodies) {
                const teacher = yield teacher_model_1.default.create(body);
                const birthDayGen = (0, dayjs_1.default)(teacher.birthDay).format("DDMMYYYY");
                const payloadUpdate = {
                    username: `${teacher.phone}`,
                    password: `${birthDayGen}`,
                    type: "teacher",
                };
                const newAccount = yield account_model_1.default.findOneAndUpdate({
                    username: `${teacher.phone}`,
                }, payloadUpdate, {
                    new: true,
                    upsert: true,
                });
                const ac = (0, lodash_1.omit)(newAccount.toJSON(), ["password"]);
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
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                data: error,
            });
        }
    });
}
exports.createListTeacherHandler = createListTeacherHandler;
function getTeacherById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teacher = yield teacher_model_1.default.findById(req.params.id);
            if (!teacher) {
                return res.status(500).send((0, response_1.responseError)("Teacher does not match"));
            }
            return res.send({
                success: true,
                data: teacher,
            });
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                data: error,
            });
        }
    });
}
exports.getTeacherById = getTeacherById;
function updateTeacherById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teacherOld = yield teacher_model_1.default.findById(req.params.id);
            if (!teacherOld) {
                return res.send({
                    success: false,
                    message: "Teacher does not match",
                });
            }
            const account = yield account_model_1.default.findOne({
                username: teacherOld.phone,
            });
            const teacher = yield teacher_model_1.default.findOneAndUpdate({
                _id: req.params.id,
            }, req.body, {
                new: true,
            });
            if (!teacher) {
                return res.send({
                    success: false,
                    message: "Teacher does not match",
                });
            }
            const birthDayGen = (0, dayjs_1.default)(teacher.birthDay).format("DDMMYYYY");
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
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                data: error,
            });
        }
    });
}
exports.updateTeacherById = updateTeacherById;
function deleteTeacherById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const teacherId = req.params.id;
        try {
            const teacher = yield teacher_model_1.default.findByIdAndDelete(teacherId);
            if (!teacher) {
                return res.send({
                    success: false,
                    message: "Teacher does not match",
                });
            }
            yield account_model_1.default.findOneAndDelete({
                username: teacher === null || teacher === void 0 ? void 0 : teacher.phone,
                type: "teacher",
            });
            return res.send({
                success: true,
                message: "Delete successfully",
            });
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                data: error,
            });
        }
    });
}
exports.deleteTeacherById = deleteTeacherById;
function changePasswordTeacher(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { phone, oldPassword, newPassword } = req.body;
            const account = yield account_model_1.default.findOne({
                username: phone,
            });
            if (!account) {
                return res.status(500).send({
                    success: false,
                    message: "Account not match",
                });
            }
            const isValid = yield account.validatePassword(oldPassword);
            if (!isValid) {
                return res.status(500).send({
                    success: false,
                    message: "Old Password is valid",
                });
            }
            const accountUpdate = yield account_model_1.default.findOneAndUpdate({
                username: phone,
                type: "teacher",
            }, {
                password: newPassword,
                isChangedPassword: true,
            }, {
                new: true,
            });
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
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                data: error,
            });
        }
    });
}
exports.changePasswordTeacher = changePasswordTeacher;
function getAllLetterApply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, msv, status } = req.query;
        const { id } = req.params;
        const payload = Object.assign(Object.assign(Object.assign({ approved: id }, (status && { status: status })), (name && { name: { $regex: new RegExp(name) } })), (msv && { msv: { $regex: new RegExp(msv) } }));
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
