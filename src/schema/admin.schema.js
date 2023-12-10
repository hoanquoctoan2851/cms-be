"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSchema = void 0;
const zod_1 = require("zod");
exports.adminSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        username: (0, zod_1.string)({
            required_error: "username is required",
        }),
        password: (0, zod_1.string)({
            required_error: "password is required",
        }),
        type: zod_1.z.enum(["admin"], {
            required_error: "type is required",
        }),
    }),
});
