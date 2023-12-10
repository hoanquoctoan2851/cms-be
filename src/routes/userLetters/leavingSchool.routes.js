"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leavingSchool_controller_1 = require("../../controller/userLetter/leavingSchool.controller");
const validateResource_1 = __importDefault(require("../../middleware/validateResource"));
const leavingSchool_schema_1 = require("../../schema/letters/leavingSchool.schema");
const shared_schema_1 = require("../../schema/shared.schema");
const router = express_1.default.Router();
router.get("/api/listLeavingSchool/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), leavingSchool_controller_1.getLeavingSchoolLetterByUserId);
router.get("/api/leavingSchool/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), leavingSchool_controller_1.detailLeavingSchoolLetter);
router.post("/api/leavingSchool", (0, validateResource_1.default)(leavingSchool_schema_1.createLeavingSchoolSchema), leavingSchool_controller_1.createLeavingSchoolLetter);
router.put("/api/leavingSchool/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), leavingSchool_controller_1.updateLeavingSchoolLetter);
router.delete("/api/leavingSchool/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), leavingSchool_controller_1.deleteLeavingSchoolLetter);
router.post("/api/leavingSchool/getCode/:id", (0, validateResource_1.default)(shared_schema_1.getCodeSchema), leavingSchool_controller_1.getCodeLetter);
router.post("/api/leavingSchool/verifyCodeLetter/:id", (0, validateResource_1.default)(shared_schema_1.verifyCodeLetterSchema), leavingSchool_controller_1.verifyCodeLetter);
exports.default = router;
