"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leaveAbsenceLess_controller_1 = require("../../controller/userLetter/leaveAbsenceLess.controller");
const validateResource_1 = __importDefault(require("../../middleware/validateResource"));
const shared_schema_1 = require("../../schema/shared.schema");
const leaveAbsenceLess_schema_1 = require("./../../schema/letters/leaveAbsenceLess.schema");
const router = express_1.default.Router();
router.get("/api/listLeaveAbsenceLess/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), leaveAbsenceLess_controller_1.getLeaveAbsenceLessLetterByUserId);
router.get("/api/leaveAbsenceLess/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), leaveAbsenceLess_controller_1.detailLeaveAbsenceLessLetter);
router.post("/api/leaveAbsenceLess", (0, validateResource_1.default)(leaveAbsenceLess_schema_1.createLeaveAbsenceLessSchema), leaveAbsenceLess_controller_1.createLeaveAbsenceLessLetter);
router.put("/api/leaveAbsenceLess/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), leaveAbsenceLess_controller_1.updateLeaveAbsenceLessLetter);
router.delete("/api/leaveAbsenceLess/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), leaveAbsenceLess_controller_1.deleteLeaveAbsenceLessLetter);
router.post("/api/leaveAbsenceLess/getCode/:id", (0, validateResource_1.default)(shared_schema_1.getCodeSchema), leaveAbsenceLess_controller_1.getCodeLetter);
router.post("/api/leaveAbsenceLess/verifyCodeLetter/:id", (0, validateResource_1.default)(shared_schema_1.verifyCodeLetterSchema), leaveAbsenceLess_controller_1.verifyCodeLetter);
exports.default = router;
