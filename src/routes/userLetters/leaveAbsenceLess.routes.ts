import express from "express";
import {
  createLeaveAbsenceLessLetter,
  deleteLeaveAbsenceLessLetter,
  detailLeaveAbsenceLessLetter,
  getCodeLetter,
  getLeaveAbsenceLessLetterByUserId,
  updateLeaveAbsenceLessLetter,
  verifyCodeLetter,
} from "../../controller/userLetter/leaveAbsenceLess.controller";
import validateResource from "../../middleware/validateResource";
import {
  getCodeSchema,
  requestParamsSchema,
  verifyCodeLetterSchema,
} from "../../schema/shared.schema";
import { createLeaveAbsenceLessSchema } from "./../../schema/letters/leaveAbsenceLess.schema";

const router = express.Router();

router.get(
  "/api/listLeaveAbsenceLess/:id",
  validateResource(requestParamsSchema),
  getLeaveAbsenceLessLetterByUserId
);

router.get(
  "/api/leaveAbsenceLess/:id",
  validateResource(requestParamsSchema),
  detailLeaveAbsenceLessLetter
);

router.post(
  "/api/leaveAbsenceLess",
  validateResource(createLeaveAbsenceLessSchema),
  createLeaveAbsenceLessLetter
);

router.put(
  "/api/leaveAbsenceLess/:id",
  validateResource(requestParamsSchema),
  updateLeaveAbsenceLessLetter
);

router.delete(
  "/api/leaveAbsenceLess/:id",
  validateResource(requestParamsSchema),
  deleteLeaveAbsenceLessLetter
);

router.post(
  "/api/leaveAbsenceLess/getCode/:id",
  validateResource(getCodeSchema),
  getCodeLetter
);

router.post(
  "/api/leaveAbsenceLess/verifyCodeLetter/:id",
  validateResource(verifyCodeLetterSchema),
  verifyCodeLetter
);

export default router;
