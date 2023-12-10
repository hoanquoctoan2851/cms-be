import express from "express";
import {
  getAdminById,
  getAllLetterApply,
} from "../controller/admin.controller";
import permissionTeacher from "../middleware/teacher.ts/permissionTeacher";
import validateResource from "../middleware/validateResource";
import { requestParamsSchema } from "../schema/shared.schema";

const router = express.Router();


router.get(
  "/api/admin/allLetter",
  [permissionTeacher],
  getAllLetterApply
);

router.get(
  "/api/admin/:code",
  [],
  getAdminById
);

export default router;