import express from "express";
import {
  createPaymentGraduationClass,
  deletePaymentGraduationClassLetter,
  detailPaymentGraduationClassLetter,
  getCodeLetter,
  getPaymentGraduationClassLetterByUserId,
  updatePaymentGraduationClassLetter,
  verifyCodeLetter,
} from "../../controller/userLetter/paymentGraduationClass.controller";
import validateResource from "../../middleware/validateResource";
import { createPaymentGraduationClassSchema } from "../../schema/letters/paymentGraduationClass.shema";
import {
  getCodeSchema,
  requestParamsSchema,
  verifyCodeLetterSchema,
} from "../../schema/shared.schema";

const router = express.Router();

router.get(
  "/api/listPaymentGraduationClass/:id",
  validateResource(requestParamsSchema),
  getPaymentGraduationClassLetterByUserId
);

router.get(
  "/api/paymentGraduationClass/:id",
  validateResource(requestParamsSchema),
  detailPaymentGraduationClassLetter
);

router.post(
  "/api/paymentGraduationClass",
  validateResource(createPaymentGraduationClassSchema),
  createPaymentGraduationClass
);

router.put(
  "/api/paymentGraduationClass/:id",
  validateResource(requestParamsSchema),
  updatePaymentGraduationClassLetter
);

router.delete(
  "/api/paymentGraduationClass/:id",
  validateResource(requestParamsSchema),
  deletePaymentGraduationClassLetter
);

router.post(
  "/api/paymentGraduationClass/getCode/:id",
  validateResource(getCodeSchema),
  getCodeLetter
);

router.post(
  "/api/paymentGraduationClass/verifyCodeLetter/:id",
  validateResource(verifyCodeLetterSchema),
  verifyCodeLetter
);

export default router;
