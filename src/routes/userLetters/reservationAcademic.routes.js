"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reservationAcademic_controller_1 = require("../../controller/userLetter/reservationAcademic.controller");
const validateResource_1 = __importDefault(require("../../middleware/validateResource"));
const shared_schema_1 = require("../../schema/shared.schema");
const reservationAcademic_schema_1 = require("./../../schema/letters/reservationAcademic.schema");
const router = express_1.default.Router();
router.get("/api/listReservationAcademic/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), reservationAcademic_controller_1.getReservationAcademicByUserId);
router.get("/api/reservationAcademic/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), reservationAcademic_controller_1.detailReservationAcademicLetter);
router.post("/api/reservationAcademic", (0, validateResource_1.default)(reservationAcademic_schema_1.createReservationAcademicSchema), reservationAcademic_controller_1.createReservationAcademicLetter);
router.put("/api/reservationAcademic/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), reservationAcademic_controller_1.updateReservationAcademicLetter);
router.delete("/api/reservationAcademic/:id", (0, validateResource_1.default)(shared_schema_1.requestParamsSchema), reservationAcademic_controller_1.deleteReservationAcademicLetter);
router.post("/api/reservationAcademic/getCode/:id", (0, validateResource_1.default)(shared_schema_1.getCodeSchema), reservationAcademic_controller_1.getCodeLetter);
router.post("/api/reservationAcademic/verifyCodeLetter/:id", (0, validateResource_1.default)(shared_schema_1.verifyCodeLetterSchema), reservationAcademic_controller_1.verifyCodeLetter);
exports.default = router;
