import express from "express";
import {
  createRenewStudentCardLetter,
  deleteRenewStudentCardLetter,
  detailRenewStudentCardLetter,
  getCodeLetter,
  getRenewStudentCardLetterByUserId,
  updateRenewStudentCardLetter,
  verifyCodeLetter,
} from "../../controller/userLetter/renewStudentCard.controller";
import validateResource from "../../middleware/validateResource";
import {
  getCodeSchema,
  requestParamsSchema,
  verifyCodeLetterSchema,
} from "../../schema/shared.schema";
import { createRenewStudentCardSchema } from "./../../schema/letters/renewStudentCard.schema";

const router = express.Router();

router.get(
  "/api/listRenewStudentCard/:id",
  validateResource(requestParamsSchema),
  getRenewStudentCardLetterByUserId
);

router.get(
  "/api/renewStudentCard/:id",
  validateResource(requestParamsSchema),
  detailRenewStudentCardLetter
);

router.post(
  "/api/renewStudentCard",
  validateResource(createRenewStudentCardSchema),
  createRenewStudentCardLetter
);

router.put(
  "/api/renewStudentCard/:id",
  validateResource(requestParamsSchema),
  updateRenewStudentCardLetter
);

router.delete(
  "/api/renewStudentCard/:id",
  validateResource(requestParamsSchema),
  deleteRenewStudentCardLetter
);

router.post(
  "/api/renewStudentCard/getCode/:id",
  validateResource(getCodeSchema),
  getCodeLetter
);

router.post(
  "/api/renewStudentCard/verifyCodeLetter/:id",
  validateResource(verifyCodeLetterSchema),
  verifyCodeLetter
);

export default router;
