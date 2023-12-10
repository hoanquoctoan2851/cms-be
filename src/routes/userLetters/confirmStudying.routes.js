"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const confirmStudying_controller_1 = require("../../controller/userLetter/confirmStudying.controller");
const validateResource_1 = __importDefault(require("../../middleware/validateResource"));
const confirmStudying_schema_1 = require("../../schema/letters/confirmStudying.schema");
const shared_schema_1 = require("../../schema/shared.schema");
const router = express_1.default.Router();
router.get("/api/listConfirmStudying/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), confirmStudying_controller_1.getConfirmStudyingLetterByUserId);
router.get("/api/confirmStudying/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), confirmStudying_controller_1.detailConfirmStudyingLetter);
router.post("/api/confirmStudying", (0, validateResource_1.default)(confirmStudying_schema_1.createConfirmStudyingSchema), confirmStudying_controller_1.createConfirmStudyingLetter);
router.put("/api/confirmStudying/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), confirmStudying_controller_1.updateConfirmStudyingLetter);
router.delete("/api/confirmStudying/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), confirmStudying_controller_1.deleteConfirmStudyingLetter);
router.post("/api/confirmStudying/getCode/:id", (0, validateResource_1.default)(shared_schema_1.getCodeSchema), confirmStudying_controller_1.getCodeLetter);
router.post("/api/confirmStudying/verifyCodeLetter/:id", (0, validateResource_1.default)(shared_schema_1.verifyCodeLetterSchema), confirmStudying_controller_1.verifyCodeLetter);
exports.default = router;
