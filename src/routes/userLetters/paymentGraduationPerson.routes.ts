import express from "express";
import {
  createPaymentGraduationPerson,
  deletePaymentGraduationPersonLetter,
  detailPaymentGraduationPersonLetter,
  getCodeLetter,
  getPaymentGraduationPersonLetterByUserId,
  updatePaymentGraduationPersonLetter,
  verifyCodeLetter,
} from "../../controller/userLetter/paymentGraduationPerson.controller";
import validateResource from "../../middleware/validateResource";
import { createPaymentGraduationPersonSchema } from "../../schema/letters/paymentGraduationPerson.schema";
import {
  getCodeSchema,
  requestParamsSchema,
  verifyCodeLetterSchema,
} from "../../schema/shared.schema";

const router = express.Router();

router.get(
  "/api/listPaymentGraduationPerson/:id",
  validateResource(requestParamsSchema),
  getPaymentGraduationPersonLetterByUserId
);

router.get(
  "/api/paymentGraduationPerson/:id",
  validateResource(requestParamsSchema),
  detailPaymentGraduationPersonLetter
);

router.post(
  "/api/paymentGraduationPerson",
  validateResource(createPaymentGraduationPersonSchema),
  createPaymentGraduationPerson
);

router.put(
  "/api/paymentGraduationPerson/:id",
  validateResource(requestParamsSchema),
  updatePaymentGraduationPersonLetter
);

router.delete(
  "/api/paymentGraduationPerson/:id",
  validateResource(requestParamsSchema),
  deletePaymentGraduationPersonLetter
);

router.post(
  "/api/paymentGraduationPerson/getCode/:id",
  validateResource(getCodeSchema),
  getCodeLetter
);

router.post(
  "/api/paymentGraduationPerson/verifyCodeLetter/:id",
  validateResource(verifyCodeLetterSchema),
  verifyCodeLetter
);

export default router;
