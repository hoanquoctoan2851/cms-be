import express from "express";
import {
  createLeavingSchoolLetter,
  deleteLeavingSchoolLetter,
  detailLeavingSchoolLetter,
  getCodeLetter,
  getLeavingSchoolLetterByUserId,
  updateLeavingSchoolLetter,
  verifyCodeLetter,
} from "../../controller/userLetter/leavingSchool.controller";
import validateResource from "../../middleware/validateResource";
import { createLeavingSchoolSchema } from "../../schema/letters/leavingSchool.schema";
import {
  getCodeSchema,
  requestParamsSchema,
  verifyCodeLetterSchema,
} from "../../schema/shared.schema";

const router = express.Router();

router.get(
  "/api/listLeavingSchool/:id",
  validateResource(requestParamsSchema),
  getLeavingSchoolLetterByUserId
);

router.get(
  "/api/leavingSchool/:id",
  validateResource(requestParamsSchema),
  detailLeavingSchoolLetter
);

router.post(
  "/api/leavingSchool",
  validateResource(createLeavingSchoolSchema),
  createLeavingSchoolLetter
);

router.put(
  "/api/leavingSchool/:id",
  validateResource(requestParamsSchema),
  updateLeavingSchoolLetter
);

router.delete(
  "/api/leavingSchool/:id",
  validateResource(requestParamsSchema),
  deleteLeavingSchoolLetter
);

router.post(
  "/api/leavingSchool/getCode/:id",
  validateResource(getCodeSchema),
  getCodeLetter
);

router.post(
  "/api/leavingSchool/verifyCodeLetter/:id",
  validateResource(verifyCodeLetterSchema),
  verifyCodeLetter
);
export default router;
