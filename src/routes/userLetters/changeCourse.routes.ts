import express from "express";
import {
  createChangeCourse,
  deleteChangeCourseLetter,
  detailChangeCourseLetter,
  getChangeCourseLetterByUserId,
  getCodeLetter,
  updateChangeCourseLetter,
  verifyCodeLetter,
} from "../../controller/userLetter/changeCourse.controller";
import validateResource from "../../middleware/validateResource";
import {
  getCodeSchema,
  requestParamsSchema,
  verifyCodeLetterSchema,
} from "../../schema/shared.schema";
import { createChangeCourseSchema } from "./../../schema/letters/changeCourse.schema";

const router = express.Router();

router.get(
  "/api/listChangeCourse/:id",
  validateResource(requestParamsSchema),
  getChangeCourseLetterByUserId
);

router.get(
  "/api/changeCourse/:id",
  validateResource(requestParamsSchema),
  detailChangeCourseLetter
);

router.post(
  "/api/changeCourse",
  validateResource(createChangeCourseSchema),
  createChangeCourse
);

router.put(
  "/api/changeCourse/:id",
  validateResource(requestParamsSchema),
  updateChangeCourseLetter
);

router.delete(
  "/api/changeCourse/:id",
  validateResource(requestParamsSchema),
  deleteChangeCourseLetter
);

router.post(
  "/api/changeCourse/getCode/:id",
  validateResource(getCodeSchema),
  getCodeLetter
);

router.post(
  "/api/changeCourse/verifyCodeLetter/:id",
  validateResource(verifyCodeLetterSchema),
  verifyCodeLetter
);

export default router;
