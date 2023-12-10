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
exports.PaymentGraduationClass = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const index_1 = require("../../types/index");
const teacher_model_1 = require("../teacher.model");
const user_model_1 = require("../user.model");
const ConfirmPayment_1 = __importDefault(require("./ConfirmPayment"));
let PaymentGraduationClass = class PaymentGraduationClass {
};
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String, uppercase: true }),
    __metadata("design:type", String)
], PaymentGraduationClass.prototype, "msv", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String }),
    __metadata("design:type", String)
], PaymentGraduationClass.prototype, "class", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], PaymentGraduationClass.prototype, "amountStudent", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PaymentGraduationClass.prototype, "decisionNumber", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], PaymentGraduationClass.prototype, "dateDecisionAssign", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => ConfirmPayment_1.default }),
    __metadata("design:type", ConfirmPayment_1.default)
], PaymentGraduationClass.prototype, "libraryCenter", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => ConfirmPayment_1.default }),
    __metadata("design:type", ConfirmPayment_1.default)
], PaymentGraduationClass.prototype, "financial", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => ConfirmPayment_1.default }),
    __metadata("design:type", ConfirmPayment_1.default)
], PaymentGraduationClass.prototype, "studentManagementSystem", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => ConfirmPayment_1.default }),
    __metadata("design:type", ConfirmPayment_1.default)
], PaymentGraduationClass.prototype, "trainingDepartment", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: index_1.StatusLetter }),
    __metadata("design:type", String)
], PaymentGraduationClass.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => teacher_model_1.Teacher }),
    __metadata("design:type", Object)
], PaymentGraduationClass.prototype, "approved", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], PaymentGraduationClass.prototype, "hashCode", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => user_model_1.User }),
    __metadata("design:type", Object)
], PaymentGraduationClass.prototype, "user", void 0);
PaymentGraduationClass = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
        },
    })
], PaymentGraduationClass);
exports.PaymentGraduationClass = PaymentGraduationClass;
const PaymentGraduationClassModel = (0, typegoose_1.getModelForClass)(PaymentGraduationClass);
exports.default = PaymentGraduationClassModel;
