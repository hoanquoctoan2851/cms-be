import express from "express";
import {
  createLeaveAbsenceMoreLetter,
  deleteLeaveAbsenceMoreLetter,
  detailLeaveAbsenceMoreLetter,
  getCodeLetter,
  getLeaveAbsenceMoreLetterByUserId,
  updateLeaveAbsenceMoreLetter,
  verifyCodeLetter,
} from "../../controller/userLetter/leaveAbsenceMore.controller";
import validateResource from "../../middleware/validateResource";
import {
  getCodeSchema,
  requestParamsSchema,
  verifyCodeLetterSchema,
} from "../../schema/shared.schema";
import { createLeaveAbsenceMoreSchema } from "./../../schema/letters/leaveAbsenceMore.schema";

const router = express.Router();

router.get(
  "/api/listLeaveAbsenceMore/:id",
  validateResource(requestParamsSchema),
  getLeaveAbsenceMoreLetterByUserId
);

router.get(
  "/api/leaveAbsenceMore/:id",
  validateResource(requestParamsSchema),
  detailLeaveAbsenceMoreLetter
);

router.post(
  "/api/leaveAbsenceMore",
  validateResource(createLeaveAbsenceMoreSchema),
  createLeaveAbsenceMoreLetter
);

router.put(
  "/api/leaveAbsenceMore/:id",
  validateResource(requestParamsSchema),
  updateLeaveAbsenceMoreLetter
);

router.delete(
  "/api/leaveAbsenceMore/:id",
  validateResource(requestParamsSchema),
  deleteLeaveAbsenceMoreLetter
);

router.post(
  "/api/leaveAbsenceMore/getCode/:id",
  validateResource(getCodeSchema),
  getCodeLetter
);

router.post(
  "/api/leaveAbsenceMore/verifyCodeLetter/:id",
  validateResource(verifyCodeLetterSchema),
  verifyCodeLetter
);

export default router;
