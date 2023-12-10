import express from "express";
import {
  createCancelCourseLetter,
  deleteConfirmStudyingLetter,
  detailCancelCourseLetter,
  getCancelCourseLetterByUserId,
  getCodeLetter,
  updateCancelCourseLetter,
  verifyCodeLetter,
} from "../../controller/userLetter/cancelCourse.controller";
import validateResource from "../../middleware/validateResource";
import {
  getCodeSchema,
  requestParamsSchema,
  verifyCodeLetterSchema,
} from "../../schema/shared.schema";
import { createCancelCourseSchema } from "./../../schema/letters/cancelCourse.schema";

const router = express.Router();

router.get(
  "/api/listCancelCourse/:id",
  validateResource(requestParamsSchema),
  getCancelCourseLetterByUserId
);

router.get(
  "/api/cancelCourse/:id",
  validateResource(requestParamsSchema),
  detailCancelCourseLetter
);

router.post(
  "/api/cancelCourse",
  validateResource(createCancelCourseSchema),
  createCancelCourseLetter
);

router.put(
  "/api/cancelCourse/:id",
  validateResource(requestParamsSchema),
  updateCancelCourseLetter
);

router.delete(
  "/api/cancelCourse/:id",
  validateResource(requestParamsSchema),
  deleteConfirmStudyingLetter
);

router.post(
  "/api/cancelCourse/getCode/:id",
  validateResource(getCodeSchema),
  getCodeLetter
);

router.post(
  "/api/cancelCourse/verifyCodeLetter/:id",
  validateResource(verifyCodeLetterSchema),
  verifyCodeLetter
);

export default router;
