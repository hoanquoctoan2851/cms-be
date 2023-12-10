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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnjoyPolicy = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const index_1 = require("../../types/index");
const teacher_model_1 = require("../teacher.model");
const user_model_1 = require("../user.model");
let EnjoyPolicy = class EnjoyPolicy {
};
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String, uppercase: true }),
    __metadata("design:type", String)
], EnjoyPolicy.prototype, "msv", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], EnjoyPolicy.prototype, "schoolC2", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], EnjoyPolicy.prototype, "confirmC2", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], EnjoyPolicy.prototype, "classC2", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Number }),
    __metadata("design:type", Number)
], EnjoyPolicy.prototype, "semesterC2", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Number }),
    __metadata("design:type", Number)
], EnjoyPolicy.prototype, "startC2Y", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Number }),
    __metadata("design:type", Number)
], EnjoyPolicy.prototype, "endC2Y", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], EnjoyPolicy.prototype, "confirmStudent", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Number }),
    __metadata("design:type", Number)
], EnjoyPolicy.prototype, "yearSchoolSt", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    __metadata("design:type", Number)
], EnjoyPolicy.prototype, "semester", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [Date] }),
    __metadata("design:type", Array)
], EnjoyPolicy.prototype, "timeInSchool", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], EnjoyPolicy.prototype, "class", void 0);
__decorate([
    (0, typegoose_1.prop)({ enum: index_1.Majors }),
    __metadata("design:type", String)
], EnjoyPolicy.prototype, "majors", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [Date] }),
    __metadata("design:type", Array)
], EnjoyPolicy.prototype, "course", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Number }),
    __metadata("design:type", Number)
], EnjoyPolicy.prototype, "courseTime", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => String }),
    __metadata("design:type", String)
], EnjoyPolicy.prototype, "discipline", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => String }),
    __metadata("design:type", String)
], EnjoyPolicy.prototype, "namePolicy", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: index_1.StatusLetter }),
    __metadata("design:type", String)
], EnjoyPolicy.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => teacher_model_1.Teacher }),
    __metadata("design:type", Object)
], EnjoyPolicy.prototype, "approved", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], EnjoyPolicy.prototype, "hashCode", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => user_model_1.User }),
    __metadata("design:type", Object)
], EnjoyPolicy.prototype, "user", void 0);
EnjoyPolicy = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
        },
    })
], EnjoyPolicy);
exports.EnjoyPolicy = EnjoyPolicy;
const EnjoyPolicyModel = (0, typegoose_1.getModelForClass)(EnjoyPolicy);
exports.default = EnjoyPolicyModel;
