"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controller/admin.controller");
const permissionTeacher_1 = __importDefault(require("../middleware/teacher.ts/permissionTeacher"));
const router = express_1.default.Router();
router.get("/api/admin/allLetter", [permissionTeacher_1.default], admin_controller_1.getAllLetterApply);
router.get("/api/admin/:code", [], admin_controller_1.getAdminById);
exports.default = router;
