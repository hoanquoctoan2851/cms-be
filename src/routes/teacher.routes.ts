import express from "express";
import {
  changePasswordTeacher, createListTeacherHandler,
  createTeacherHandler,
  deleteTeacherById,
  getAllLetterApply,
  getListTeachers,
  getTeacherById,
  updateTeacherById,
} from "../controller/teacher.controller";
import permissionTeacher from "../middleware/teacher.ts/permissionTeacher";
import validateResource from "../middleware/validateResource";
import { requestParamsSchema } from "../schema/shared.schema";
import {
  changePasswordUpdateTeacherSchema,
  createTeacherSchema,
  payloadCreateListTeacherSchema
} from "../schema/teacher.schema";
import { updateTeacherSchema } from "../schema/teacher.schema";

const router = express.Router();

router.get("/api/teachers", getListTeachers);

router.get(
  "/api/teachers/:id",
  [permissionTeacher, validateResource(requestParamsSchema)],
  getTeacherById
);

router.post(
  "/api/teachers",
  [permissionTeacher, validateResource(createTeacherSchema)],
  createTeacherHandler
);

router.post(
  "/api/create-list-teachers",
  [permissionTeacher],
  createListTeacherHandler
);

router.put(
  "/api/teachers/changePassword",
  [permissionTeacher, validateResource(changePasswordUpdateTeacherSchema)],
  changePasswordTeacher
);

router.put(
  "/api/teachers/:id",
  [permissionTeacher, validateResource(updateTeacherSchema)],
  updateTeacherById
);

router.delete(
  "/api/teachers/:id",
  [permissionTeacher, validateResource(requestParamsSchema)],
  deleteTeacherById
);

router.get(
  "/api/teachers/:id/allLetter",
  [permissionTeacher, validateResource(requestParamsSchema)],
  getAllLetterApply
);

export default router;
