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
exports.sendOTPLetter = exports.getCodeOtp = void 0;
const app_1 = require("../app");
const Rsa_1 = __importDefault(require("../service/Rsa"));
const getCodeOtp = (privateKey, publicKey) => {
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    const rsaService = new Rsa_1.default({
        privateKey,
        publicKey,
    });
    const hashedOtp = rsaService.encrypt(otp);
    return {
        otp: otp,
        hashedOtp: hashedOtp,
    };
};
exports.getCodeOtp = getCodeOtp;
const sendOTPLetter = ({ email, otp, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return new Promise((resolve, reject) => {
            const mailOptions = {
                from: "vixmatma@gmail.com",
                to: email,
                subject: "Verify Your Letter OTP",
                html: `<p>Enter <b>${otp}</b> in the app to using your letter</p>`,
            };
            app_1.transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(info);
                }
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendOTPLetter = sendOTPLetter;
