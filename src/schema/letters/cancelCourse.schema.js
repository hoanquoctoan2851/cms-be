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
exports.createCancelCourseSchema = void 0;
const zod_1 = __importStar(require("zod"));
const regex_1 = require("../../utils/regex");
exports.createCancelCourseSchema = (0, zod_1.object)({
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
        semester: (0, zod_1.number)({
            required_error: "semester is required",
        }),
        startYear: (0, zod_1.number)({
            required_error: "start year is required",
        }),
        endYear: (0, zod_1.number)({
            required_error: "end year is required",
        }),
        courseCancel: (0, zod_1.array)((0, zod_1.object)({
            name: (0, zod_1.string)(),
            semester: (0, zod_1.string)(),
            class: (0, zod_1.string)(),
            startDate: (0, zod_1.string)().refine((value) => regex_1.regexDate.test(value), {
                message: "start date is type YYYY-MM-DD",
            }),
            endDate: (0, zod_1.string)().refine((value) => regex_1.regexDate.test(value), {
                message: "end date is type YYYY-MM-DD",
            }),
        })),
        reason: (0, zod_1.string)({
            required_error: "reason is required",
        }),
        status: zod_1.default.enum(["pending", "reject", "success"], {
            required_error: "Status is required",
        }),
        approved: (0, zod_1.string)({ required_error: "approved is required" }),
        user: (0, zod_1.string)({ required_error: "user is required" }),
    }),
});
