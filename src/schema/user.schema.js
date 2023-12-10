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
exports.getAllLetterRequestSchema = exports.changePasswordUpdateSchema = exports.updateUserSchema = exports.deleteUserSchema = exports.getUserMsvSchema = exports.createUserSchema = void 0;
const zod_1 = __importStar(require("zod"));
const regex_1 = require("../utils/regex");
const requestPayload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is required",
        }),
        msv: (0, zod_1.string)({
            required_error: "Msv is required",
        }),
        email: (0, zod_1.string)().email("Not a valid email"),
        gender: zod_1.default.enum(["nam", "nữ"], {
            required_error: "Gender is required",
            description: "You must check gender",
        }),
        birthDay: (0, zod_1.string)({
            required_error: "birthDay required",
        }).refine((val) => regex_1.regexDate.test(val), {
            message: "date is type YYYY-MM-DD",
        }),
        phone: (0, zod_1.string)().optional(),
        class: (0, zod_1.string)({
            required_error: "Class is required",
        }),
        majors: zod_1.default.enum(["An toàn thông tin", "Công nghệ thông tin", "Điện tử viễn thông", "Nhân viên tư vấn bán hàng"], {
            required_error: "Majors is required",
        }),
        age: (0, zod_1.number)({
            invalid_type_error: "Age must be number",
        })
            .positive()
            .optional(),
        timeCourse: (0, zod_1.string)().optional(),
        citizenId: (0, zod_1.string)().optional(),
        placeCitizenId: (0, zod_1.string)().optional(),
        dateCitizenId: (0, zod_1.string)()
            .refine((val) => regex_1.regexDate.test(val), {
            message: "date is type YYYY-MM-DD",
        })
            .optional(),
        address: (0, zod_1.string)().optional(),
        hometown: (0, zod_1.string)().optional(),
        permanentResidence: (0, zod_1.string)().optional(),
        parentName: (0, zod_1.string)().optional(),
        parentPhone: (0, zod_1.string)().optional(),
    }),
};
const requestParams = {
    params: (0, zod_1.object)({
        msv: (0, zod_1.string)({
            required_error: "msv is required",
        }),
    }),
};
exports.createUserSchema = (0, zod_1.object)(Object.assign({}, requestPayload));
exports.getUserMsvSchema = (0, zod_1.object)(Object.assign({}, requestParams));
exports.deleteUserSchema = (0, zod_1.object)(Object.assign({}, requestParams));
exports.updateUserSchema = (0, zod_1.object)(Object.assign(Object.assign({}, requestParams), { body: (0, zod_1.object)({
        name: (0, zod_1.string)().optional(),
        msv: (0, zod_1.string)().optional(),
        email: (0, zod_1.string)().email("Not a valid email").optional(),
        gender: zod_1.default
            .enum(["nam", "nữ"], {
            description: "You must check gender",
        })
            .optional(),
        birthDay: (0, zod_1.string)()
            .refine((val) => regex_1.regexDate.test(val), {
            message: "birthDay is type YYYY-MM-DD",
        })
            .optional(),
        phone: (0, zod_1.string)().optional(),
        class: (0, zod_1.string)().optional(),
        majors: zod_1.default
            .enum(["An toàn thông tin", "Công nghệ thông tin", "Điện tử viễn thông", "Nhân viên tư vấn bán hàng"])
            .optional(),
        age: (0, zod_1.number)({
            invalid_type_error: "Age must be number",
        })
            .positive()
            .optional(),
        timeCourse: (0, zod_1.string)().optional(),
        citizenId: (0, zod_1.string)().optional(),
        placeCitizenId: (0, zod_1.string)().optional(),
        dateCitizenId: (0, zod_1.string)()
            .refine((val) => regex_1.regexDate.test(val), {
            message: "dateCitizenId is type YYYY-MM-DD",
        })
            .optional(),
        address: (0, zod_1.string)().optional(),
        hometown: (0, zod_1.string)().optional(),
        permanentResidence: (0, zod_1.string)().optional(),
        parentName: (0, zod_1.string)().optional(),
        parentPhone: (0, zod_1.string)().optional(),
        balance: (0, zod_1.number)({
            invalid_type_error: "Balance must be number",
        })
            .optional(),
    }) }));
exports.changePasswordUpdateSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        msv: (0, zod_1.string)({
            required_error: "MSV is required",
        }),
        oldPassword: (0, zod_1.string)({
            required_error: "Old password is required",
        }),
        newPassword: (0, zod_1.string)({
            required_error: "Password is required",
        }),
    }),
});
exports.getAllLetterRequestSchema = (0, zod_1.object)(Object.assign({}, requestParams));
