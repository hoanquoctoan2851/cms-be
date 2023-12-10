import express from "express";
import {
  changePasswordUser, createListUserHandler,
  createUserHandler,
  deleteUser, depositUser,
  getAllLetter,
  getListUsers,
  getUserByMsv,
  updateUser,
} from "../controller/user.controller";
import permissionUser from "../middleware/user/permissionUser";
import validateResource from "../middleware/validateResource";
import { queryGetListSchema } from "../schema/shared.schema";
import {
  changePasswordUpdateSchema,
  createUserSchema,
  deleteUserSchema,
  getAllLetterRequestSchema,
  getUserMsvSchema,
  updateUserSchema,
} from "./../schema/user.schema";
import permissionTeacher from "../middleware/teacher.ts/permissionTeacher";

const router = express.Router();

router.get(
  "/api/users",
  [permissionUser, validateResource(queryGetListSchema)],
  getListUsers
);

router.get(
  "/api/user/:msv",
  [permissionUser, validateResource(getUserMsvSchema)],
  getUserByMsv
);

router.post(
  "/api/users",
  [permissionUser, validateResource(createUserSchema)],
  createUserHandler
);

router.post(
  "/api/create-list-user",
  [permissionUser],
  createListUserHandler
);

router.put(
  "/api/users/changePassword",
  [permissionUser, validateResource(changePasswordUpdateSchema)],
  changePasswordUser
);

router.put(
  "/api/users/:msv",
  [permissionUser, validateResource(updateUserSchema)],
  updateUser
);

router.put(
  "/api/users/balance/:msv",
  [permissionTeacher, validateResource(deleteUserSchema)],
  depositUser
);

router.delete(
  "/api/users/:msv",
  [permissionUser, validateResource(deleteUserSchema)],
  deleteUser
);

router.get(
  "/api/users/:msv/allLetter",
  [permissionUser, validateResource(getAllLetterRequestSchema)],
  getAllLetter
);

export default router;
