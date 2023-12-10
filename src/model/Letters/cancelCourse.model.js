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
exports.CancelCourse = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const index_1 = require("../../types/index");
const teacher_model_1 = require("../teacher.model");
const user_model_1 = require("../user.model");
class CourseCancel {
}
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], CourseCancel.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], CourseCancel.prototype, "semester", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], CourseCancel.prototype, "class", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Date }),
    __metadata("design:type", Date)
], CourseCancel.prototype, "startDate", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Date }),
    __metadata("design:type", Date)
], CourseCancel.prototype, "endDate", void 0);
let CancelCourse = class CancelCourse {
};
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String, uppercase: true }),
    __metadata("design:type", String)
], CancelCourse.prototype, "msv", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], CancelCourse.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], CancelCourse.prototype, "phone", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String }),
    __metadata("design:type", String)
], CancelCourse.prototype, "class", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: index_1.Majors }),
    __metadata("design:type", String)
], CancelCourse.prototype, "majors", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], CancelCourse.prototype, "semester", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], CancelCourse.prototype, "startYear", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], CancelCourse.prototype, "endYear", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => CourseCancel, required: true }),
    __metadata("design:type", Array)
], CancelCourse.prototype, "courseCancel", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String }),
    __metadata("design:type", String)
], CancelCourse.prototype, "reason", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: index_1.StatusLetter }),
    __metadata("design:type", String)
], CancelCourse.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => teacher_model_1.Teacher }),
    __metadata("design:type", Object)
], CancelCourse.prototype, "approved", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], CancelCourse.prototype, "hashCode", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => user_model_1.User }),
    __metadata("design:type", Object)
], CancelCourse.prototype, "user", void 0);
CancelCourse = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
        },
    })
], CancelCourse);
exports.CancelCourse = CancelCourse;
const CancelCourseModel = (0, typegoose_1.getModelForClass)(CancelCourse);
exports.default = CancelCourseModel;
