import express from "express";
import {
  createConfirmStudyingLetter,
  deleteConfirmStudyingLetter,
  detailConfirmStudyingLetter,
  getCodeLetter,
  getConfirmStudyingLetterByUserId,
  updateConfirmStudyingLetter,
  verifyCodeLetter,
} from "../../controller/userLetter/confirmStudying.controller";
import validateResource from "../../middleware/validateResource";
import { createConfirmStudyingSchema } from "../../schema/letters/confirmStudying.schema";
import {
  getCodeSchema,
  requestParamsSchema,
  verifyCodeLetterSchema,
} from "../../schema/shared.schema";

const router = express.Router();

router.get(
  "/api/listConfirmStudying/:id",
  validateResource(requestParamsSchema),
  getConfirmStudyingLetterByUserId
);

router.get(
  "/api/confirmStudying/:id",
  validateResource(requestParamsSchema),
  detailConfirmStudyingLetter
);

router.post(
  "/api/confirmStudying",
  validateResource(createConfirmStudyingSchema),
  createConfirmStudyingLetter
);

router.put(
  "/api/confirmStudying/:id",
  validateResource(requestParamsSchema),
  updateConfirmStudyingLetter
);

router.delete(
  "/api/confirmStudying/:id",
  validateResource(requestParamsSchema),
  deleteConfirmStudyingLetter
);

router.post(
  "/api/confirmStudying/getCode/:id",
  validateResource(getCodeSchema),
  getCodeLetter
);

router.post(
  "/api/confirmStudying/verifyCodeLetter/:id",
  validateResource(verifyCodeLetterSchema),
  verifyCodeLetter
);

export default router;
