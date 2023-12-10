"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordUpdateTeacherSchema = exports.deleteTeacherSchema = exports.getTeacherIdSchema = exports.updateTeacherSchema = exports.createTeacherSchema = exports.payloadCreateListTeacherSchema = void 0;
const zod_1 = require("zod");
const regex_1 = require("../utils/regex");
const payloadCreate = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "name is required",
            invalid_type_error: "name must be string",
        }),
        phone: (0, zod_1.string)({
            required_error: "phone is required",
            invalid_type_error: "phone is string",
        }),
        birthDay: (0, zod_1.string)({
            required_error: "birthDay required",
        }).refine((val) => regex_1.regexDate.test(val), {
            message: "date is type YYYY-MM-DD",
        }),
        email: (0, zod_1.string)().email("Not a valid email"),
        age: (0, zod_1.number)({ invalid_type_error: "age is number" }).optional(),
        address: (0, zod_1.string)({ invalid_type_error: "address is string" }).optional(),
    }),
};
exports.payloadCreateListTeacherSchema = (0, zod_1.object)({
    body: (0, zod_1.array)((0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "name is required",
            invalid_type_error: "name must be string",
        }),
        phone: (0, zod_1.string)({
            required_error: "phone is required",
            invalid_type_error: "phone is string",
        }),
        birthDay: (0, zod_1.string)({
            required_error: "birthDay required",
        }).refine((val) => regex_1.regexDate.test(val), {
            message: "date is type YYYY-MM-DD",
        }),
        email: (0, zod_1.string)().email("Not a valid email"),
        age: (0, zod_1.number)({ invalid_type_error: "age is number" }).optional(),
        address: (0, zod_1.string)({ invalid_type_error: "address is string" }).optional(),
    })),
});
const payloadUpdate = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ invalid_type_error: "name must be string" }).optional(),
        phone: (0, zod_1.string)({ invalid_type_error: "phone is string" }).optional(),
        birthDay: (0, zod_1.string)()
            .refine((val) => regex_1.regexDate.test(val), {
            message: "date is type YYYY-MM-DD",
        })
            .optional(),
        age: (0, zod_1.number)({ invalid_type_error: "age is number" }).optional(),
        address: (0, zod_1.string)({ invalid_type_error: "address is string" }).optional(),
    }),
};
const paramsId = {
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "id is required",
            invalid_type_error: "id must be string",
        }),
    }),
};
exports.createTeacherSchema = (0, zod_1.object)(Object.assign({}, payloadCreate));
exports.updateTeacherSchema = (0, zod_1.object)(Object.assign(Object.assign({}, paramsId), payloadUpdate));
exports.getTeacherIdSchema = (0, zod_1.object)(Object.assign({}, paramsId));
exports.deleteTeacherSchema = (0, zod_1.object)(Object.assign({}, paramsId));
exports.changePasswordUpdateTeacherSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        phone: (0, zod_1.string)({
            required_error: "Phone is required",
        }),
        oldPassword: (0, zod_1.string)({
            required_error: "Old Password is required",
        }),
        newPassword: (0, zod_1.string)({
            required_error: "New Password is required",
        }),
    }),
});
