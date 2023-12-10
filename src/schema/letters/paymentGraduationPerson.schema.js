"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentGraduationPersonSchema = void 0;
const zod_1 = __importStar(require("zod"));
const regex_1 = require("../../utils/regex");
exports.createPaymentGraduationPersonSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        msv: (0, zod_1.string)({
            required_error: "Msv is required",
        }),
        name: (0, zod_1.string)({
            required_error: "Name is required",
        }),
        phone: (0, zod_1.string)({
            required_error: "Phone is required",
        }),
        class: (0, zod_1.string)({
            required_error: "Class is required",
        }),
        majors: zod_1.default.enum(["An toàn thông tin", "Công nghệ thông tin", "Điện tử viễn thông", "Nhân viên tư vấn bán hàng"], {
            required_error: "Majors is required",
        }),
        paymentReason: (0, zod_1.string)({
            required_error: "Payment reason is required",
        }),
        decisionNumber: (0, zod_1.string)({
            required_error: "Decision number is required",
        }),
        dateDecisionAssign: (0, zod_1.string)().refine((val) => regex_1.regexDate.test(val), {
            message: "Date decision assign is type YYYY-MM-DD",
        }),
        libraryCenter: (0, zod_1.object)({
            content: (0, zod_1.string)(),
            signature: (0, zod_1.string)(),
        }).optional(),
        financial: (0, zod_1.object)({
            content: (0, zod_1.string)(),
            signature: (0, zod_1.string)(),
        }).optional(),
        studentManagementSystem: (0, zod_1.object)({
            content: (0, zod_1.string)(),
            signature: (0, zod_1.string)(),
        }).optional(),
        trainingDepartment: (0, zod_1.object)({
            content: (0, zod_1.string)(),
            signature: (0, zod_1.string)(),
        }).optional(),
        status: zod_1.default.enum(["pending", "reject", "success"], {
            required_error: "Status is required",
        }),
        approved: (0, zod_1.string)({ required_error: "approved is required" }),
        user: (0, zod_1.string)({ required_error: "user is required" }),
    }),
});
