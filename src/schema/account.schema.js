"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = exports.accountSchema = void 0;
const zod_1 = require("zod");
exports.accountSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        username: (0, zod_1.string)({
            required_error: "username is required",
        }),
        password: (0, zod_1.string)({
            required_error: "password is required",
        }),
        type: zod_1.z.enum(["admin", "teacher", "user"], {
            required_error: "type is required",
        }),
    }),
});
exports.refreshTokenSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        refreshToken: (0, zod_1.string)({
            required_error: "refresh token is required",
        }),
    }),
});
