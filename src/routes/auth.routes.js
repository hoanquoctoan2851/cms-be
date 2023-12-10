"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const account_schema_1 = require("./../schema/account.schema");
const router = express_1.default.Router();
router.post("/api/login", (0, validateResource_1.default)(account_schema_1.accountSchema), auth_controller_1.loginController);
router.post("/api/refreshToken", (0, validateResource_1.default)(account_schema_1.refreshTokenSchema), auth_controller_1.refreshTokenController);
router.delete("/api/logout", auth_controller_1.logoutController);
exports.default = router;
