import express from "express";
import {
  createReservationAcademicLetter,
  deleteReservationAcademicLetter,
  detailReservationAcademicLetter,
  getCodeLetter,
  getReservationAcademicByUserId,
  updateReservationAcademicLetter,
  verifyCodeLetter,
} from "../../controller/userLetter/reservationAcademic.controller";
import validateResource from "../../middleware/validateResource";
import {
  getCodeSchema,
  requestParamsSchema,
  verifyCodeLetterSchema,
} from "../../schema/shared.schema";
import { createReservationAcademicSchema } from "./../../schema/letters/reservationAcademic.schema";

const router = express.Router();

router.get(
  "/api/listReservationAcademic/:id",
  validateResource(requestParamsSchema),
  getReservationAcademicByUserId
);

router.get(
  "/api/reservationAcademic/:id",
  validateResource(requestParamsSchema),
  detailReservationAcademicLetter
);

router.post(
  "/api/reservationAcademic",
  validateResource(createReservationAcademicSchema),
  createReservationAcademicLetter
);

router.put(
  "/api/reservationAcademic/:id",
  validateResource(requestParamsSchema),
  updateReservationAcademicLetter
);

router.delete(
  "/api/reservationAcademic/:id",
  validateResource(requestParamsSchema),
  deleteReservationAcademicLetter
);

router.post(
  "/api/reservationAcademic/getCode/:id",
  validateResource(getCodeSchema),
  getCodeLetter
);

router.post(
  "/api/reservationAcademic/verifyCodeLetter/:id",
  validateResource(verifyCodeLetterSchema),
  verifyCodeLetter
);

export default router;
