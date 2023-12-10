"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const changeCourse_controller_1 = require("../../controller/userLetter/changeCourse.controller");
const validateResource_1 = __importDefault(require("../../middleware/validateResource"));
const shared_schema_1 = require("../../schema/shared.schema");
const changeCourse_schema_1 = require("./../../schema/letters/changeCourse.schema");
const router = express_1.default.Router();
router.get("/api/listChangeCourse/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), changeCourse_controller_1.getChangeCourseLetterByUserId);
router.get("/api/changeCourse/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), changeCourse_controller_1.detailChangeCourseLetter);
router.post("/api/changeCourse", (0, validateResource_1.default)(changeCourse_schema_1.createChangeCourseSchema), changeCourse_controller_1.createChangeCourse);
router.put("/api/changeCourse/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), changeCourse_controller_1.updateChangeCourseLetter);
router.delete("/api/changeCourse/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), changeCourse_controller_1.deleteChangeCourseLetter);
router.post("/api/changeCourse/getCode/:id", (0, validateResource_1.default)(shared_schema_1.getCodeSchema), changeCourse_controller_1.getCodeLetter);
router.post("/api/changeCourse/verifyCodeLetter/:id", (0, validateResource_1.default)(shared_schema_1.verifyCodeLetterSchema), changeCourse_controller_1.verifyCodeLetter);
exports.default = router;
