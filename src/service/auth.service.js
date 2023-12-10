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
exports.getCurrentAccount = exports.getInfoAccount = exports.signRefreshToken = exports.signAccessToken = void 0;
const lodash_1 = __importDefault(require("lodash"));
const account_model_1 = __importDefault(require("../model/account.model"));
const jwt_1 = require("../utils/jwt");
function signAccessToken(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = (0, jwt_1.signJwt)(payload, "accessTokenPrivateKey", {
            expiresIn: "30m",
        });
        return accessToken;
    });
}
exports.signAccessToken = signAccessToken;
function signRefreshToken({ accountId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = (0, jwt_1.signJwt)({
            accountId,
        }, "refreshTokenPrivateKey", {
            expiresIn: "1y",
        });
        return refreshToken;
    });
}
exports.signRefreshToken = signRefreshToken;
function getInfoAccount({ username, type, }) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (type) {
            case "admin":
                const account = yield account_model_1.default.findOne({ username: username });
                return lodash_1.default.omit(account, ["password", "_v"]);
            case "teacher":
                return null;
            default:
                return null;
        }
    });
}
exports.getInfoAccount = getInfoAccount;
function getCurrentAccount(authorization) {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = authorization.replace(/^Bearer\s/, "");
        if (!accessToken) {
            return null;
        }
        const account = yield (0, jwt_1.verifyJwt)(accessToken, "accessTokenPublicKey");
        return account || null;
    });
}
exports.getCurrentAccount = getCurrentAccount;
