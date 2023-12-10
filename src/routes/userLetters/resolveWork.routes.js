"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resolveWork_controller_1 = require("../../controller/userLetter/resolveWork.controller");
const validateResource_1 = __importDefault(require("../../middleware/validateResource"));
const shared_schema_1 = require("../../schema/shared.schema");
const resolveWork_schema_1 = require("./../../schema/letters/resolveWork.schema");
const router = express_1.default.Router();
router.get("/api/listResolveWork/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), resolveWork_controller_1.getResolveWorkByUserId);
router.get("/api/resolveWork/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), resolveWork_controller_1.detailResolveWorkLetter);
router.post("/api/resolveWork", (0, validateResource_1.default)(resolveWork_schema_1.createResolveWorkSchema), resolveWork_controller_1.createResolveWorkLetter);
router.put("/api/resolveWork/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), resolveWork_controller_1.updateResolveWorkLetter);
router.delete("/api/resolveWork/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), resolveWork_controller_1.deleteResolveWorkLetter);
router.post("/api/resolveWork/getCode/:id", (0, validateResource_1.default)(shared_schema_1.getCodeSchema), resolveWork_controller_1.getCodeLetter);
router.post("/api/resolveWork/verifyCodeLetter/:id", (0, validateResource_1.default)(shared_schema_1.verifyCodeLetterSchema), resolveWork_controller_1.verifyCodeLetter);
exports.default = router;
