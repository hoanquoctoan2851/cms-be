import express from "express";
import {
  loginController,
  logoutController,
  refreshTokenController,
} from "../controller/auth.controller";
import validateResource from "../middleware/validateResource";
import { accountSchema, refreshTokenSchema } from "./../schema/account.schema";

const router = express.Router();

router.post("/api/login", validateResource(accountSchema), loginController);

router.post(
  "/api/refreshToken",
  validateResource(refreshTokenSchema),
  refreshTokenController
);

router.delete("/api/logout", logoutController);

export default router;
