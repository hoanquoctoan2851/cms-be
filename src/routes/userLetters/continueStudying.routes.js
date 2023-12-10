"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const continueStudying_controller_1 = require("../../controller/userLetter/continueStudying.controller");
const validateResource_1 = __importDefault(require("../../middleware/validateResource"));
const shared_schema_1 = require("../../schema/shared.schema");
const continueStudying_schema_1 = require("./../../schema/letters/continueStudying.schema");
const router = express_1.default.Router();
router.get("/api/listContinueStudying/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), continueStudying_controller_1.getContinueStudyingLetterByUserId);
router.get("/api/continueStudying/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), continueStudying_controller_1.detailContinueStudyingLetter);
router.post("/api/continueStudying", (0, validateResource_1.default)(continueStudying_schema_1.createContinueStudyingSchema), continueStudying_controller_1.createContinueStudyingLetter);
router.put("/api/continueStudying/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), continueStudying_controller_1.updateContinueStudyingLetter);
router.delete("/api/continueStudying/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), continueStudying_controller_1.deleteContinueStudyingLetter);
router.post("/api/continueStudying/getCode/:id", (0, validateResource_1.default)(shared_schema_1.getCodeSchema), continueStudying_controller_1.getCodeLetter);
router.post("/api/continueStudying/verifyCodeLetter/:id", (0, validateResource_1.default)(shared_schema_1.verifyCodeLetterSchema), continueStudying_controller_1.verifyCodeLetter);
exports.default = router;
