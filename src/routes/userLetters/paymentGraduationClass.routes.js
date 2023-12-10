"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentGraduationClass_controller_1 = require("../../controller/userLetter/paymentGraduationClass.controller");
const validateResource_1 = __importDefault(require("../../middleware/validateResource"));
const paymentGraduationClass_shema_1 = require("../../schema/letters/paymentGraduationClass.shema");
const shared_schema_1 = require("../../schema/shared.schema");
const router = express_1.default.Router();
router.get("/api/listPaymentGraduationClass/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), paymentGraduationClass_controller_1.getPaymentGraduationClassLetterByUserId);
router.get("/api/paymentGraduationClass/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), paymentGraduationClass_controller_1.detailPaymentGraduationClassLetter);
router.post("/api/paymentGraduationClass", (0, validateResource_1.default)(paymentGraduationClass_shema_1.createPaymentGraduationClassSchema), paymentGraduationClass_controller_1.createPaymentGraduationClass);
router.put("/api/paymentGraduationClass/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), paymentGraduationClass_controller_1.updatePaymentGraduationClassLetter);
router.delete("/api/paymentGraduationClass/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), paymentGraduationClass_controller_1.deletePaymentGraduationClassLetter);
router.post("/api/paymentGraduationClass/getCode/:id", (0, validateResource_1.default)(shared_schema_1.getCodeSchema), paymentGraduationClass_controller_1.getCodeLetter);
router.post("/api/paymentGraduationClass/verifyCodeLetter/:id", (0, validateResource_1.default)(shared_schema_1.verifyCodeLetterSchema), paymentGraduationClass_controller_1.verifyCodeLetter);
exports.default = router;
