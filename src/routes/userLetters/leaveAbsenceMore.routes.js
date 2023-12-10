"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leaveAbsenceMore_controller_1 = require("../../controller/userLetter/leaveAbsenceMore.controller");
const validateResource_1 = __importDefault(require("../../middleware/validateResource"));
const shared_schema_1 = require("../../schema/shared.schema");
const leaveAbsenceMore_schema_1 = require("./../../schema/letters/leaveAbsenceMore.schema");
const router = express_1.default.Router();
router.get("/api/listLeaveAbsenceMore/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), leaveAbsenceMore_controller_1.getLeaveAbsenceMoreLetterByUserId);
router.get("/api/leaveAbsenceMore/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), leaveAbsenceMore_controller_1.detailLeaveAbsenceMoreLetter);
router.post("/api/leaveAbsenceMore", (0, validateResource_1.default)(leaveAbsenceMore_schema_1.createLeaveAbsenceMoreSchema), leaveAbsenceMore_controller_1.createLeaveAbsenceMoreLetter);
router.put("/api/leaveAbsenceMore/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), leaveAbsenceMore_controller_1.updateLeaveAbsenceMoreLetter);
router.delete("/api/leaveAbsenceMore/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), leaveAbsenceMore_controller_1.deleteLeaveAbsenceMoreLetter);
router.post("/api/leaveAbsenceMore/getCode/:id", (0, validateResource_1.default)(shared_schema_1.getCodeSchema), leaveAbsenceMore_controller_1.getCodeLetter);
router.post("/api/leaveAbsenceMore/verifyCodeLetter/:id", (0, validateResource_1.default)(shared_schema_1.verifyCodeLetterSchema), leaveAbsenceMore_controller_1.verifyCodeLetter);
exports.default = router;
