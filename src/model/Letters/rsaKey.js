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
exports.RsaKey = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const teacher_model_1 = require("../teacher.model");
const user_model_1 = require("../user.model");
let RsaKey = class RsaKey {
};
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => teacher_model_1.Teacher }),
    __metadata("design:type", Object)
], RsaKey.prototype, "teacher", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => user_model_1.User }),
    __metadata("design:type", Object)
], RsaKey.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String }),
    __metadata("design:type", String)
], RsaKey.prototype, "publicKey", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String }),
    __metadata("design:type", String)
], RsaKey.prototype, "privateKey", void 0);
RsaKey = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
        },
    })
], RsaKey);
exports.RsaKey = RsaKey;
const RsaKeyModel = (0, typegoose_1.getModelForClass)(RsaKey);
exports.default = RsaKeyModel;
