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
exports.depositUser = exports.getAllLetter = exports.changePasswordUser = exports.deleteUser = exports.getUserByMsv = exports.updateUser = exports.createListUserHandler = exports.createUserHandler = exports.getListUsers = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const lodash_1 = require("lodash");
const account_model_1 = __importDefault(require("../model/account.model"));
const user_model_1 = __importDefault(require("../model/user.model"));
const userLetter_model_1 = __importDefault(require("../model/userLetter.model"));
const user_service_1 = require("../service/user.service");
const response_1 = require("../utils/response");
function getListUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { page, limit, name, msv, class: classQuery, majors } = req.query;
            const _page = page ? parseInt(page) : 1;
            const _limit = limit ? parseInt(limit) : null;
            const filter = Object.assign(Object.assign(Object.assign(Object.assign({}, (name && { name: { $regex: new RegExp(name) } })), (classQuery && { class: classQuery })), (msv && { msv: msv })), (majors && { majors: majors }));
            let users;
            if (_page && _limit) {
                users = yield user_model_1.default.find(filter)
                    .skip(_limit * _page - _limit)
                    .limit(_limit)
                    .sort({ name: 1 });
            }
            else {
                users = yield user_model_1.default.find(filter).sort({ name: 1 });
            }
            const total = yield user_model_1.default.find(filter).count();
            return res.send({
                success: true,
                data: users,
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
exports.getListUsers = getListUsers;
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const dateCitizenId = body.dateCitizenId
            ? new Date(body.dateCitizenId)
            : undefined;
        const payload = Object.assign(Object.assign({}, body), { birthDay: new Date(body.birthDay), dateCitizenId });
        try {
            const user = yield (0, user_service_1.createUser)(payload);
            const birthDayGen = (0, dayjs_1.default)(user.birthDay).format("DDMMYYYY");
            const payloadUpdate = {
                username: user.msv.toUpperCase(),
                password: `${birthDayGen}`,
                type: "user",
            };
            const newAccount = yield account_model_1.default.findOneAndUpdate({
                username: user.msv,
            }, payloadUpdate, {
                new: true,
                upsert: true,
            });
            const ac = (0, lodash_1.omit)(newAccount.toJSON(), ["password"]);
            return res.send({
                success: true,
                data: {
                    user: user,
                    account: ac,
                },
            });
        }
        catch (e) {
            return res.status(500).send({
                success: false,
                data: e,
            });
        }
    });
}
exports.createUserHandler = createUserHandler;
function createListUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodies = Object.values(req.body); // Assuming an array of user objects
        try {
            const createdUsers = [];
            const createdAccounts = [];
            for (const body of bodies) {
                const dateCitizenId = body.dateCitizenId
                    ? new Date(body.dateCitizenId)
                    : undefined;
                const payload = Object.assign(Object.assign({}, body), { birthDay: new Date(body.birthDay), dateCitizenId });
                const user = yield (0, user_service_1.createUser)(payload);
                const birthDayGen = (0, dayjs_1.default)(user.birthDay).format("DDMMYYYY");
                const payloadUpdate = {
                    username: user.msv.toUpperCase(),
                    password: `${birthDayGen}`,
                    type: "user",
                };
                const newAccount = yield account_model_1.default.findOneAndUpdate({
                    username: user.msv,
                }, payloadUpdate, {
                    new: true,
                    upsert: true,
                });
                const ac = (0, lodash_1.omit)(newAccount.toJSON(), ["password"]);
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
        }
        catch (e) {
            return res.status(500).send({
                success: false,
                data: e,
            });
        }
    });
}
exports.createListUserHandler = createListUserHandler;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { msv } = req.params;
        try {
            const userOld = yield user_model_1.default.findByMSV(msv);
            if (!userOld) {
                return res.send((0, response_1.responseError)("User does not match"));
            }
            const account = yield account_model_1.default.findOne({
                username: userOld.msv,
            });
            const user = yield user_model_1.default.findOneAndUpdate({ msv: msv }, req.body, {
                new: true,
            });
            if (!user) {
                return res.status(500).send({
                    success: false,
                    message: "User does not match",
                });
            }
            if (!user) {
                return res.send((0, response_1.responseError)("User does not match"));
            }
            const birthDayGen = (0, dayjs_1.default)(user.birthDay).format("DDMMYYYY");
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
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                data: error,
            });
        }
    });
}
exports.updateUser = updateUser;
function getUserByMsv(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findOne({ msv: req.params.msv });
            return res.send({ success: true, data: user });
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                data: error,
            });
        }
    });
}
exports.getUserByMsv = getUserByMsv;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const msv = req.params.msv;
        try {
            const user = yield user_model_1.default.findOne({ msv });
            if (!user) {
                return res.send({
                    success: false,
                    message: "User does not match",
                });
            }
            yield account_model_1.default.findOneAndDelete({ username: user.msv });
            user.delete();
            return res.send({
                success: true,
                message: "Delete User Success",
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
exports.deleteUser = deleteUser;
function changePasswordUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { msv, oldPassword, newPassword } = req.body;
            const account = yield account_model_1.default.findByMSV(msv);
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
                username: msv,
                type: "user",
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
exports.changePasswordUser = changePasswordUser;
function getAllLetter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { msv } = req.params;
        const user = yield user_model_1.default.findByMSV(msv);
        if (user) {
            const allLetter = yield userLetter_model_1.default.findOne({
                user: user === null || user === void 0 ? void 0 : user._id,
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
    });
}
exports.getAllLetter = getAllLetter;
function depositUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { msv } = req.params;
            const { balance } = req.body;
            const user = yield user_model_1.default.findByMSV(msv);
            if (!user) {
                return res.status(404).send((0, response_1.responseError)("User not found"));
            } // @ts-ignore
            user.balance = user.balance + balance;
            if (user.balance < 0) {
                user.balance = 0;
            }
            const updatedUser = yield user.save();
            return res.send({
                success: true,
                data: updatedUser,
            });
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                data: "Internal Server Error",
            });
        }
    });
}
exports.depositUser = depositUser;
