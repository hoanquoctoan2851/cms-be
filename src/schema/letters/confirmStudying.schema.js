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
exports.updateConfirmStudyingSchema = exports.createConfirmStudyingSchema = void 0;
const zod_1 = __importStar(require("zod"));
const regex_1 = require("../../utils/regex");
exports.createConfirmStudyingSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        msv: (0, zod_1.string)({
            required_error: "Msv is required",
        }),
        name: (0, zod_1.string)({
            required_error: "name is required",
        }),
        phone: (0, zod_1.string)({
            required_error: "phone is required",
        }),
        birthDay: (0, zod_1.string)({
            required_error: "birthDay is required",
        }).refine((val) => regex_1.regexDate.test(val), {
            message: "date is type YYYY-MM-DD",
        }),
        gender: zod_1.default.enum(["nam", "nữ"], {
            required_error: "Gender is required",
            description: "You must check gender",
        }),
        citizenId: (0, zod_1.string)(),
        placeCitizenId: (0, zod_1.string)(),
        dateCitizenId: (0, zod_1.string)().refine((val) => regex_1.regexDate.test(val), {
            message: "date is type YYYY-MM-DD",
        }),
        permanentResidence: (0, zod_1.string)(),
        address: (0, zod_1.string)(),
        majors: zod_1.default.enum(["An toàn thông tin", "Công nghệ thông tin", "Điện tử viễn thông", "Nhân viên tư vấn bán hàng"], {
            required_error: "Majors is required",
        }),
        semester: (0, zod_1.number)({
            required_error: "semester is required",
        }),
        class: (0, zod_1.string)({
            required_error: "class is required",
        }),
        startYear: (0, zod_1.number)({
            required_error: "start year is required",
        }),
        endYear: (0, zod_1.number)({
            required_error: "end year is required",
        }),
        course: (0, zod_1.array)((0, zod_1.string)().refine((val) => regex_1.regexMonth.test(val), {
            message: "course is type YYYY-MM",
        }), {
            required_error: "course is required",
        }).length(2),
        status: zod_1.default.enum(["pending", "reject", "success"], {
            required_error: "Status is required",
        }),
        approved: (0, zod_1.string)({ required_error: "approved is required" }),
        user: (0, zod_1.string)({ required_error: "user is required" }),
    }),
});
exports.updateConfirmStudyingSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)(),
    }),
    body: (0, zod_1.object)({
        msv: (0, zod_1.string)().optional(),
        name: (0, zod_1.string)().optional(),
        phone: (0, zod_1.string)().optional(),
        birthDay: (0, zod_1.string)()
            .refine((val) => regex_1.regexDate.test(val), {
            message: "date is type YYYY-MM-DD",
        })
            .optional(),
        gender: zod_1.default
            .enum(["nam", "nữ"], {
            description: "You must check gender",
        })
            .optional(),
        citizenId: (0, zod_1.string)().optional(),
        placeCitizenId: (0, zod_1.string)().optional(),
        dateCitizenId: (0, zod_1.string)()
            .refine((val) => regex_1.regexDate.test(val), {
            message: "date is type YYYY-MM-DD",
        })
            .optional(),
        permanentResidence: (0, zod_1.string)(),
        address: (0, zod_1.string)(),
        majors: zod_1.default
            .enum(["An toàn thông tin", "Công nghệ thông tin", "Điện tử viễn thông", "Nhân viên tư vấn bán hàng"])
            .optional(),
        semester: (0, zod_1.number)().optional(),
        class: (0, zod_1.string)().optional(),
        startYear: (0, zod_1.number)().optional(),
        endYear: (0, zod_1.number)().optional(),
        course: (0, zod_1.array)((0, zod_1.string)().refine((val) => regex_1.regexMonth.test(val), {
            message: "course is type YYYY-MM",
        }))
            .length(2)
            .optional(),
        status: zod_1.default.enum(["pending", "reject", "success"]).optional(),
        approved: (0, zod_1.string)().optional(),
    }),
});
