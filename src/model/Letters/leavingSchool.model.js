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
exports.LeavingSchool = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const index_1 = require("../../types/index");
const teacher_model_1 = require("../teacher.model");
const user_model_1 = require("../user.model");
let LeavingSchool = class LeavingSchool {
};
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String, uppercase: true }),
    __metadata("design:type", String)
], LeavingSchool.prototype, "msv", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], LeavingSchool.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], LeavingSchool.prototype, "phone", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String }),
    __metadata("design:type", String)
], LeavingSchool.prototype, "class", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: index_1.Majors }),
    __metadata("design:type", String)
], LeavingSchool.prototype, "majors", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: () => Date }),
    __metadata("design:type", Date)
], LeavingSchool.prototype, "birthDay", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: index_1.Gender, lowercase: true }),
    __metadata("design:type", String)
], LeavingSchool.prototype, "gender", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], LeavingSchool.prototype, "citizenId", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], LeavingSchool.prototype, "placeCitizenId", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Date, required: true }),
    __metadata("design:type", Date)
], LeavingSchool.prototype, "dateCitizenId", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], LeavingSchool.prototype, "permanentResidence", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], LeavingSchool.prototype, "parentName", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], LeavingSchool.prototype, "parentPhone", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], LeavingSchool.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: Date }),
    __metadata("design:type", Date)
], LeavingSchool.prototype, "dateLeave", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    __metadata("design:type", Number)
], LeavingSchool.prototype, "semester", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], LeavingSchool.prototype, "startYear", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], LeavingSchool.prototype, "endYear", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String }),
    __metadata("design:type", String)
], LeavingSchool.prototype, "reason", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: index_1.StatusLetter }),
    __metadata("design:type", String)
], LeavingSchool.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => teacher_model_1.Teacher }),
    __metadata("design:type", Object)
], LeavingSchool.prototype, "approved", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], LeavingSchool.prototype, "hashCode", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => user_model_1.User }),
    __metadata("design:type", Object)
], LeavingSchool.prototype, "user", void 0);
LeavingSchool = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
        },
    })
], LeavingSchool);
exports.LeavingSchool = LeavingSchool;
const LeavingSchoolModel = (0, typegoose_1.getModelForClass)(LeavingSchool);
exports.default = LeavingSchoolModel;
