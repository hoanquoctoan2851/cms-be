"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cancelCourse_controller_1 = require("../../controller/userLetter/cancelCourse.controller");
const validateResource_1 = __importDefault(require("../../middleware/validateResource"));
const shared_schema_1 = require("../../schema/shared.schema");
const cancelCourse_schema_1 = require("./../../schema/letters/cancelCourse.schema");
const router = express_1.default.Router();
router.get("/api/listCancelCourse/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), cancelCourse_controller_1.getCancelCourseLetterByUserId);
router.get("/api/cancelCourse/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), cancelCourse_controller_1.detailCancelCourseLetter);
router.post("/api/cancelCourse", (0, validateResource_1.default)(cancelCourse_schema_1.createCancelCourseSchema), cancelCourse_controller_1.createCancelCourseLetter);
router.put("/api/cancelCourse/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), cancelCourse_controller_1.updateCancelCourseLetter);
router.delete("/api/cancelCourse/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), cancelCourse_controller_1.deleteConfirmStudyingLetter);
router.post("/api/cancelCourse/getCode/:id", (0, validateResource_1.default)(shared_schema_1.getCodeSchema), cancelCourse_controller_1.getCodeLetter);
router.post("/api/cancelCourse/verifyCodeLetter/:id", (0, validateResource_1.default)(shared_schema_1.verifyCodeLetterSchema), cancelCourse_controller_1.verifyCodeLetter);
exports.default = router;
