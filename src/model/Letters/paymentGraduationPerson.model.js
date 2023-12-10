"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentGraduationPerson = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const index_1 = require("../../types/index");
const teacher_model_1 = require("../teacher.model");
const user_model_1 = require("../user.model");
const ConfirmPayment_1 = __importDefault(require("./ConfirmPayment"));
let PaymentGraduationPerson = class PaymentGraduationPerson {
};
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String, uppercase: true }),
    __metadata("design:type", String)
], PaymentGraduationPerson.prototype, "msv", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], PaymentGraduationPerson.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PaymentGraduationPerson.prototype, "phone", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String }),
    __metadata("design:type", String)
], PaymentGraduationPerson.prototype, "class", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: index_1.Majors }),
    __metadata("design:type", String)
], PaymentGraduationPerson.prototype, "majors", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: index_1.PaymentReason }),
    __metadata("design:type", String)
], PaymentGraduationPerson.prototype, "paymentReason", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PaymentGraduationPerson.prototype, "decisionNumber", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], PaymentGraduationPerson.prototype, "dateDecisionAssign", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => ConfirmPayment_1.default }),
    __metadata("design:type", ConfirmPayment_1.default)
], PaymentGraduationPerson.prototype, "libraryCenter", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => ConfirmPayment_1.default }),
    __metadata("design:type", ConfirmPayment_1.default)
], PaymentGraduationPerson.prototype, "financial", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => ConfirmPayment_1.default }),
    __metadata("design:type", ConfirmPayment_1.default)
], PaymentGraduationPerson.prototype, "studentManagementSystem", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => ConfirmPayment_1.default }),
    __metadata("design:type", ConfirmPayment_1.default)
], PaymentGraduationPerson.prototype, "trainingDepartment", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: index_1.StatusLetter }),
    __metadata("design:type", String)
], PaymentGraduationPerson.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => teacher_model_1.Teacher }),
    __metadata("design:type", Object)
], PaymentGraduationPerson.prototype, "approved", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], PaymentGraduationPerson.prototype, "hashCode", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => user_model_1.User }),
    __metadata("design:type", Object)
], PaymentGraduationPerson.prototype, "user", void 0);
PaymentGraduationPerson = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
        },
    })
], PaymentGraduationPerson);
exports.PaymentGraduationPerson = PaymentGraduationPerson;
const PaymentGraduationPersonModel = (0, typegoose_1.getModelForClass)(PaymentGraduationPerson);
exports.default = PaymentGraduationPersonModel;
