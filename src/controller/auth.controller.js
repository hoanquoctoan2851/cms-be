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
exports.refreshTokenController = exports.logoutController = exports.loginController = void 0;
const account_model_1 = __importDefault(require("../model/account.model"));
const session_model_1 = __importDefault(require("../model/session.model"));
const teacher_model_1 = __importDefault(require("../model/teacher.model"));
const user_model_1 = __importDefault(require("../model/user.model"));
const auth_service_1 = require("../service/auth.service");
const jwt_1 = require("../utils/jwt");
const response_1 = require("../utils/response");
function loginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const message = "Invalid username or password";
            const { username, password, type } = req.body;
            const account = yield account_model_1.default.findOne({
                username,
            });
            if (!account) {
                return res.send({
                    success: false,
                    message,
                });
            }
            if (account.stackLoginFailed === 5) {
                return res.send({
                    success: false,
                    message: "Lock account",
                });
            }
            const isValid = yield account.validatePassword(password);
            if (!isValid) {
                account.stackLoginFailed += 1;
                account.save();
                return res.send({
                    success: false,
                    message: "Invalid password",
                });
            }
            let userId = "";
            if (account.type === "teacher") {
                const teacher = yield teacher_model_1.default.findOne({
                    phone: account.username,
                });
                userId = teacher === null || teacher === void 0 ? void 0 : teacher._id;
            }
            else if (account.type === "user") {
                const user = yield user_model_1.default.findByMSV(account.username);
                userId = user === null || user === void 0 ? void 0 : user._id;
            }
            else
                userId = "";
            const accessToken = yield (0, auth_service_1.signAccessToken)({
                _id: account._id,
                username: account.username,
                type: account.type,
                userId: userId,
            });
            const refreshToken = yield (0, auth_service_1.signRefreshToken)({ accountId: account._id });
            yield session_model_1.default.create({ account: account, token: accessToken });
            account.stackLoginFailed = 0;
            account.save();
            return res.send({
                success: true,
                data: {
                    accessToken,
                    refreshToken,
                    type: account.type,
                    id: account._id,
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
exports.loginController = loginController;
function logoutController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentAccount = res.locals.account;
            if (!currentAccount) {
                return res.send({
                    success: true,
                    message: "Logout successfully",
                });
            }
            const sessionDelete = yield session_model_1.default.find({
                account: currentAccount._id,
            }).deleteMany();
            if (!sessionDelete) {
                return res.send((0, response_1.responseError)("Logout fail"));
            }
            res.locals.account = null;
            return res.send({
                success: true,
                message: "Logout successfully",
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
exports.logoutController = logoutController;
function refreshTokenController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { refreshToken } = req.body;
            const accountInfo = yield (0, jwt_1.verifyJwt)(refreshToken, "refreshTokenPublicKey");
            if (!accountInfo) {
                return res.sendStatus(500);
            }
            const account = yield account_model_1.default.findById(accountInfo.accountId);
            if (!account) {
                return res.send((0, response_1.responseError)("refresh token is not valid"));
            }
            let userId = "";
            if (account.type === "teacher") {
                const teacher = yield teacher_model_1.default.findOne({
                    phone: account.username,
                });
                userId = teacher === null || teacher === void 0 ? void 0 : teacher._id;
            }
            else if (account.type === "user") {
                const user = yield user_model_1.default.findByMSV(account.username);
                userId = user === null || user === void 0 ? void 0 : user._id;
            }
            else
                userId = "";
            const accessToken = yield (0, auth_service_1.signAccessToken)({
                _id: account._id,
                username: account.username,
                type: account.type,
                userId: userId,
            });
            const newRefreshToken = yield (0, auth_service_1.signRefreshToken)({ accountId: account._id });
            return res.send({
                success: true,
                data: {
                    accessToken,
                    refreshToken: newRefreshToken,
                    expiresIn: accountInfo.exp,
                },
            });
        }
        catch (error) {
            return res.send({
                success: false,
                message: "Error refresh Token",
            });
        }
    });
}
exports.refreshTokenController = refreshTokenController;
