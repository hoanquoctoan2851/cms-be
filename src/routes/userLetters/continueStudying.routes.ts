import express from "express";
import {
  createContinueStudyingLetter,
  deleteContinueStudyingLetter,
  detailContinueStudyingLetter,
  getCodeLetter,
  getContinueStudyingLetterByUserId,
  updateContinueStudyingLetter,
  verifyCodeLetter,
} from "../../controller/userLetter/continueStudying.controller";
import validateResource from "../../middleware/validateResource";
import {
  getCodeSchema,
  requestParamsSchema,
  verifyCodeLetterSchema,
} from "../../schema/shared.schema";
import { createContinueStudyingSchema } from "./../../schema/letters/continueStudying.schema";

const router = express.Router();

router.get(
  "/api/listContinueStudying/:id",
  validateResource(requestParamsSchema),
  getContinueStudyingLetterByUserId
);

router.get(
  "/api/continueStudying/:id",
  validateResource(requestParamsSchema),
  detailContinueStudyingLetter
);

router.post(
  "/api/continueStudying",
  validateResource(createContinueStudyingSchema),
  createContinueStudyingLetter
);

router.put(
  "/api/continueStudying/:id",
  validateResource(requestParamsSchema),
  updateContinueStudyingLetter
);

router.delete(
  "/api/continueStudying/:id",
  validateResource(requestParamsSchema),
  deleteContinueStudyingLetter
);

router.post(
  "/api/continueStudying/getCode/:id",
  validateResource(getCodeSchema),
  getCodeLetter
);

router.post(
  "/api/continueStudying/verifyCodeLetter/:id",
  validateResource(verifyCodeLetterSchema),
  verifyCodeLetter
);

export default router;
