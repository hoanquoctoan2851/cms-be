import express from "express";
import {
  createResolveWorkLetter,
  deleteResolveWorkLetter,
  detailResolveWorkLetter,
  getCodeLetter,
  getResolveWorkByUserId,
  updateResolveWorkLetter,
  verifyCodeLetter,
} from "../../controller/userLetter/resolveWork.controller";
import validateResource from "../../middleware/validateResource";
import {
  getCodeSchema,
  requestParamsSchema,
  verifyCodeLetterSchema,
} from "../../schema/shared.schema";
import { createResolveWorkSchema } from "./../../schema/letters/resolveWork.schema";

const router = express.Router();

router.get(
  "/api/listResolveWork/:id",
  validateResource(requestParamsSchema),
  getResolveWorkByUserId
);

router.get(
  "/api/resolveWork/:id",
  validateResource(requestParamsSchema),
  detailResolveWorkLetter
);

router.post(
  "/api/resolveWork",
  validateResource(createResolveWorkSchema),
  createResolveWorkLetter
);

router.put(
  "/api/resolveWork/:id",
  validateResource(requestParamsSchema),
  updateResolveWorkLetter
);

router.delete(
  "/api/resolveWork/:id",
  validateResource(requestParamsSchema),
  deleteResolveWorkLetter
);

router.post(
  "/api/resolveWork/getCode/:id",
  validateResource(getCodeSchema),
  getCodeLetter
);

router.post(
  "/api/resolveWork/verifyCodeLetter/:id",
  validateResource(verifyCodeLetterSchema),
  verifyCodeLetter
);

export default router;
