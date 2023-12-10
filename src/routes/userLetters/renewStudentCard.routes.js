"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const renewStudentCard_controller_1 = require("../../controller/userLetter/renewStudentCard.controller");
const validateResource_1 = __importDefault(require("../../middleware/validateResource"));
const shared_schema_1 = require("../../schema/shared.schema");
const renewStudentCard_schema_1 = require("./../../schema/letters/renewStudentCard.schema");
const router = express_1.default.Router();
router.get("/api/listRenewStudentCard/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), renewStudentCard_controller_1.getRenewStudentCardLetterByUserId);
router.get("/api/renewStudentCard/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), renewStudentCard_controller_1.detailRenewStudentCardLetter);
router.post("/api/renewStudentCard", (0, validateResource_1.default)(renewStudentCard_schema_1.createRenewStudentCardSchema), renewStudentCard_controller_1.createRenewStudentCardLetter);
router.put("/api/renewStudentCard/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), renewStudentCard_controller_1.updateRenewStudentCardLetter);
router.delete("/api/renewStudentCard/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), renewStudentCard_controller_1.deleteRenewStudentCardLetter);
router.post("/api/renewStudentCard/getCode/:id", (0, validateResource_1.default)(shared_schema_1.getCodeSchema), renewStudentCard_controller_1.getCodeLetter);
router.post("/api/renewStudentCard/verifyCodeLetter/:id", (0, validateResource_1.default)(shared_schema_1.verifyCodeLetterSchema), renewStudentCard_controller_1.verifyCodeLetter);
exports.default = router;
