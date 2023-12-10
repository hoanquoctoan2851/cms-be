import express from "express";
import {
  createEnjoyPolicyLetter,
  deleteEnjoyPolicyLetter,
  detailEnjoyPolicyLetter,
  getCodeLetter,
  getEnjoyPolicyLetterByUserId,
  updateEnjoyPolicyLetter,
  verifyCodeLetter,
} from "../../controller/userLetter/enjoyPolicy.controller";
import validateResource from "../../middleware/validateResource";
import { createEnjoyPolicySchema } from "../../schema/letters/enjoyPolicy.schema";
import {
  getCodeSchema,
  requestParamsSchema,
  verifyCodeLetterSchema,
} from "../../schema/shared.schema";

const router = express.Router();

router.get(
  "/api/listEnjoyPolicy/:id",
  validateResource(requestParamsSchema),
  getEnjoyPolicyLetterByUserId
);

router.get(
  "/api/enjoyPolicy/:id",
  validateResource(requestParamsSchema),
  detailEnjoyPolicyLetter
);

router.post(
  "/api/enjoyPolicy",
  validateResource(createEnjoyPolicySchema),
  createEnjoyPolicyLetter
);

router.put(
  "/api/enjoyPolicy/:id",
  validateResource(requestParamsSchema),
  updateEnjoyPolicyLetter
);

router.delete(
  "/api/enjoyPolicy/:id",
  validateResource(requestParamsSchema),
  deleteEnjoyPolicyLetter
);

router.post(
  "/api/enjoyPolicy/getCode/:id",
  validateResource(getCodeSchema),
  getCodeLetter
);

router.post(
  "/api/enjoyPolicy/verifyCodeLetter/:id",
  validateResource(verifyCodeLetterSchema),
  verifyCodeLetter
);

export default router;
