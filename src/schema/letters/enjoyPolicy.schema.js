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
exports.createEnjoyPolicySchema = void 0;
const zod_1 = __importStar(require("zod"));
const regex_1 = require("../../utils/regex");
exports.createEnjoyPolicySchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        msv: (0, zod_1.string)({
            required_error: "Mã sinh viên is required",
        }),
        schoolC2: (0, zod_1.string)().optional(),
        confirmC2: (0, zod_1.string)().optional(),
        classC2: (0, zod_1.string)().optional(),
        semesterC2: (0, zod_1.number)().optional(),
        startC2Y: (0, zod_1.number)().optional(),
        endC2Y: (0, zod_1.number)().optional(),
        confirmStudent: (0, zod_1.string)().optional(),
        yearSchoolSt: (0, zod_1.number)().optional(),
        semester: (0, zod_1.number)().optional(),
        timeInSchool: (0, zod_1.array)((0, zod_1.string)().refine((val) => regex_1.regexMonth.test(val), {
            message: "course is type YYYY-MM",
        }))
            .length(2)
            .optional(),
        class: (0, zod_1.string)().optional(),
        majors: zod_1.default
            .enum(["An toàn thông tin", "Công nghệ thông tin", "Điện tử viễn thông", "Nhân viên tư vấn bán hàng"])
            .optional(),
        course: (0, zod_1.array)((0, zod_1.string)().refine((val) => regex_1.regexMonth.test(val), {
            message: "course is type YYYY-MM",
        }))
            .length(2)
            .optional(),
        courseTime: (0, zod_1.number)().optional(),
        discipline: (0, zod_1.string)().optional(),
        namePolicy: (0, zod_1.string)().optional(),
        status: zod_1.default.enum(["pending", "reject", "success"], {
            required_error: "Status is required",
        }),
        approved: (0, zod_1.string)({ required_error: "approved is required" }),
        user: (0, zod_1.string)({ required_error: "user is required" }),
    }),
});
