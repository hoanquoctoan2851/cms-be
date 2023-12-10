"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bankLoan_controller_1 = require("../../controller/userLetter/bankLoan.controller");
const validateResource_1 = __importDefault(require("../../middleware/validateResource"));
const shared_schema_1 = require("../../schema/shared.schema");
const bankLoan_schema_1 = require("./../../schema/letters/bankLoan.schema");
const router = express_1.default.Router();
router.get("/api/listBankLoan/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), bankLoan_controller_1.getBankLoanLetterByUserId);
router.get("/api/bankLoan/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), bankLoan_controller_1.detailBankLoanLetter);
router.post("/api/bankLoan", (0, validateResource_1.default)(bankLoan_schema_1.createBankLoanSchema), bankLoan_controller_1.createBankLoanLetter);
router.put("/api/bankLoan/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), bankLoan_controller_1.updateBankLoanLetter);
router.delete("/api/bankLoan/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), bankLoan_controller_1.deleteBankLoanLetter);
router.post("/api/bankLoan/getCode/:id", (0, validateResource_1.default)(shared_schema_1.getCodeSchema), bankLoan_controller_1.getCodeLetter);
router.post("/api/bankLoan/verifyCodeLetter/:id", (0, validateResource_1.default)(shared_schema_1.verifyCodeLetterSchema), bankLoan_controller_1.verifyCodeLetter);
exports.default = router;
