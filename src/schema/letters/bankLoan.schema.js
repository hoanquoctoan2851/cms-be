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
exports.createBankLoanSchema = void 0;
const zod_1 = __importStar(require("zod"));
const regex_1 = require("../../utils/regex");
exports.createBankLoanSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "name is required",
        }),
        msv: (0, zod_1.string)({
            required_error: "Msv is required",
        }),
        phone: (0, zod_1.string)({
            required_error: "Phone is required",
        }),
        birthDay: (0, zod_1.string)({
            required_error: "birthDay is required",
        }).refine((val) => regex_1.regexDate.test(val), {
            message: "date is type YYYY-MM-DD",
        }),
        citizenId: (0, zod_1.string)(),
        placeCitizenId: (0, zod_1.string)(),
        dateCitizenId: (0, zod_1.string)().refine((val) => regex_1.regexDate.test(val), {
            message: "date is type YYYY-MM-DD",
        }),
        majors: zod_1.default.enum(["An toàn thông tin", "Công nghệ thông tin", "Điện tử viễn thông", "Nhân viên tư vấn bán hàng"], {
            required_error: "Majors is required",
        }),
        course: (0, zod_1.array)((0, zod_1.string)().refine((val) => regex_1.regexMonth.test(val), {
            message: "course is type YYYY-MM",
        }), {
            required_error: "course is required",
        }).length(2),
        class: (0, zod_1.string)({
            required_error: "class is required",
        }),
        department: (0, zod_1.string)().optional(),
        schoolStart: (0, zod_1.string)().refine((val) => regex_1.regexDate.test(val), {
            message: "date is type YYYY-MM-DD",
        }),
        schoolEnd: (0, zod_1.string)().refine((val) => regex_1.regexDate.test(val), {
            message: "date is type YYYY-MM-DD",
        }),
        tuitionFee: (0, zod_1.number)(),
        tuitionType: zod_1.default.enum(["Không miễn giảm", "Giảm học phí", "Miễn học phí"], {
            required_error: "Tuition Type is required",
        }),
        tuitionObj: zod_1.default.enum(["Mồ côi", "Không mồ côi"], {
            required_error: "Tuition Obj is required",
        }),
        bankNumber: (0, zod_1.string)({
            required_error: "bankNumber is required",
        }),
        bank: (0, zod_1.string)({
            required_error: "bank is required",
        }),
        status: zod_1.default.enum(["pending", "reject", "success"], {
            required_error: "Status is required",
        }),
        approved: (0, zod_1.string)({ required_error: "approved is required" }),
        user: (0, zod_1.string)({ required_error: "user is required" }),
    }),
});
