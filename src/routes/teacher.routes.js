"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacher_controller_1 = require("../controller/teacher.controller");
const permissionTeacher_1 = __importDefault(require("../middleware/teacher.ts/permissionTeacher"));
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const shared_schema_1 = require("../schema/shared.schema");
const teacher_schema_1 = require("../schema/teacher.schema");
const teacher_schema_2 = require("../schema/teacher.schema");
const router = express_1.default.Router();
router.get("/api/teachers", teacher_controller_1.getListTeachers);
router.get("/api/teachers/:id", [permissionTeacher_1.default, (0, validateResource_1.default)(shared_schema_1.requestParamsSchema)], teacher_controller_1.getTeacherById);
router.post("/api/teachers", [permissionTeacher_1.default, (0, validateResource_1.default)(teacher_schema_1.createTeacherSchema)], teacher_controller_1.createTeacherHandler);
router.post("/api/create-list-teachers", [permissionTeacher_1.default], teacher_controller_1.createListTeacherHandler);
router.put("/api/teachers/changePassword", [permissionTeacher_1.default, (0, validateResource_1.default)(teacher_schema_1.changePasswordUpdateTeacherSchema)], teacher_controller_1.changePasswordTeacher);
router.put("/api/teachers/:id", [permissionTeacher_1.default, (0, validateResource_1.default)(teacher_schema_2.updateTeacherSchema)], teacher_controller_1.updateTeacherById);
router.delete("/api/teachers/:id", [permissionTeacher_1.default, (0, validateResource_1.default)(shared_schema_1.requestParamsSchema)], teacher_controller_1.deleteTeacherById);
router.get("/api/teachers/:id/allLetter", [permissionTeacher_1.default, (0, validateResource_1.default)(shared_schema_1.requestParamsSchema)], teacher_controller_1.getAllLetterApply);
exports.default = router;
