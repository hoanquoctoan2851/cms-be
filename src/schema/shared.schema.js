"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeSchema = exports.verifyCodeLetterSchema = exports.requestParamsSchema = exports.queryGetListSchema = void 0;
const zod_1 = require("zod");
const regex_1 = require("../utils/regex");
// query pagination
exports.queryGetListSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        page: (0, zod_1.string)()
            .refine((value) => regex_1.regexNumber.test(value), {
            message: "page must be number",
        })
            .optional(),
        limit: (0, zod_1.string)()
            .refine((value) => regex_1.regexNumber.test(value), {
            message: "page must be number",
        })
            .optional(),
        name: (0, zod_1.string)().optional(),
        msv: (0, zod_1.string)().optional(),
        majors: (0, zod_1.string)().optional(),
        class: (0, zod_1.string)().optional(),
        phone: (0, zod_1.string)().optional(),
    }),
});
//params Id
exports.requestParamsSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "id is required",
        }),
    }),
});
exports.verifyCodeLetterSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "id is required",
        }),
    }),
    body: (0, zod_1.object)({
        otp: (0, zod_1.string)({
            required_error: "otp is required",
        }),
        msv: (0, zod_1.string)({
            required_error: "msv is required",
        }),
        teacherId: (0, zod_1.string)({
            required_error: "teacherId is required",
        }),
    }),
});
exports.getCodeSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "id is required",
        }),
    }),
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: "otp is required",
        }),
        msv: (0, zod_1.string)({
            required_error: "msv is required",
        }),
        teacherId: (0, zod_1.string)({
            required_error: "teacherId is required",
        }),
    }),
});
