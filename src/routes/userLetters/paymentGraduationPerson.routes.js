"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentGraduationPerson_controller_1 = require("../../controller/userLetter/paymentGraduationPerson.controller");
const validateResource_1 = __importDefault(require("../../middleware/validateResource"));
const paymentGraduationPerson_schema_1 = require("../../schema/letters/paymentGraduationPerson.schema");
const shared_schema_1 = require("../../schema/shared.schema");
const router = express_1.default.Router();
router.get("/api/listPaymentGraduationPerson/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), paymentGraduationPerson_controller_1.getPaymentGraduationPersonLetterByUserId);
router.get("/api/paymentGraduationPerson/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), paymentGraduationPerson_controller_1.detailPaymentGraduationPersonLetter);
router.post("/api/paymentGraduationPerson", (0, validateResource_1.default)(paymentGraduationPerson_schema_1.createPaymentGraduationPersonSchema), paymentGraduationPerson_controller_1.createPaymentGraduationPerson);
router.put("/api/paymentGraduationPerson/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), paymentGraduationPerson_controller_1.updatePaymentGraduationPersonLetter);
router.delete("/api/paymentGraduationPerson/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), paymentGraduationPerson_controller_1.deletePaymentGraduationPersonLetter);
router.post("/api/paymentGraduationPerson/getCode/:id", (0, validateResource_1.default)(shared_schema_1.getCodeSchema), paymentGraduationPerson_controller_1.getCodeLetter);
router.post("/api/paymentGraduationPerson/verifyCodeLetter/:id", (0, validateResource_1.default)(shared_schema_1.verifyCodeLetterSchema), paymentGraduationPerson_controller_1.verifyCodeLetter);
exports.default = router;
