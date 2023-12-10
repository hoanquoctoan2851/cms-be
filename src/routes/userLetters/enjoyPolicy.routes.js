"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enjoyPolicy_controller_1 = require("../../controller/userLetter/enjoyPolicy.controller");
const validateResource_1 = __importDefault(require("../../middleware/validateResource"));
const enjoyPolicy_schema_1 = require("../../schema/letters/enjoyPolicy.schema");
const shared_schema_1 = require("../../schema/shared.schema");
const router = express_1.default.Router();
router.get("/api/listEnjoyPolicy/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), enjoyPolicy_controller_1.getEnjoyPolicyLetterByUserId);
router.get("/api/enjoyPolicy/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), enjoyPolicy_controller_1.detailEnjoyPolicyLetter);
router.post("/api/enjoyPolicy", (0, validateResource_1.default)(enjoyPolicy_schema_1.createEnjoyPolicySchema), enjoyPolicy_controller_1.createEnjoyPolicyLetter);
router.put("/api/enjoyPolicy/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), enjoyPolicy_controller_1.updateEnjoyPolicyLetter);
router.delete("/api/enjoyPolicy/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), enjoyPolicy_controller_1.deleteEnjoyPolicyLetter);
router.post("/api/enjoyPolicy/getCode/:id", (0, validateResource_1.default)(shared_schema_1.getCodeSchema), enjoyPolicy_controller_1.getCodeLetter);
router.post("/api/enjoyPolicy/verifyCodeLetter/:id", (0, validateResource_1.default)(shared_schema_1.verifyCodeLetterSchema), enjoyPolicy_controller_1.verifyCodeLetter);
exports.default = router;
