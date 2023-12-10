import express from "express";
import {
  createBankLoanLetter,
  deleteBankLoanLetter,
  detailBankLoanLetter,
  getBankLoanLetterByUserId,
  getCodeLetter,
  updateBankLoanLetter,
  verifyCodeLetter,
} from "../../controller/userLetter/bankLoan.controller";
import validateResource from "../../middleware/validateResource";
import {
  getCodeSchema,
  requestParamsSchema,
  verifyCodeLetterSchema,
} from "../../schema/shared.schema";
import { createBankLoanSchema } from "./../../schema/letters/bankLoan.schema";

const router = express.Router();

router.get(
  "/api/listBankLoan/:id",
  validateResource(requestParamsSchema),
  getBankLoanLetterByUserId
);

router.get(
  "/api/bankLoan/:id",
  validateResource(requestParamsSchema),
  detailBankLoanLetter
);

router.post(
  "/api/bankLoan",
  validateResource(createBankLoanSchema),
  createBankLoanLetter
);

router.put(
  "/api/bankLoan/:id",
  validateResource(requestParamsSchema),
  updateBankLoanLetter
);

router.delete(
  "/api/bankLoan/:id",
  validateResource(requestParamsSchema),
  deleteBankLoanLetter
);

router.post(
  "/api/bankLoan/getCode/:id",
  validateResource(getCodeSchema),
  getCodeLetter
);

router.post(
  "/api/bankLoan/verifyCodeLetter/:id",
  validateResource(verifyCodeLetterSchema),
  verifyCodeLetter
);

export default router;
