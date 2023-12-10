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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Account_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = exports.hashPassword = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const argon2_1 = __importDefault(require("argon2"));
const types_1 = require("../types");
const logger_1 = __importDefault(require("../utils/logger"));
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield argon2_1.default.hash(password);
    return hash;
});
exports.hashPassword = hashPassword;
let Account = Account_1 = class Account {
    validatePassword(candidatePassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield argon2_1.default.verify(this.password, candidatePassword);
            }
            catch (error) {
                logger_1.default.error(error, "Could not validate password");
            }
        });
    }
    static createAccount({ username, password, type, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.create({ username, password, type });
        });
    }
    static findByMSV(msv) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne({ username: msv });
        });
    }
};
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Account.prototype, "username", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Account.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: types_1.AccountType }),
    __metadata("design:type", String)
], Account.prototype, "type", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Account.prototype, "isChangedPassword", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Account.prototype, "stackLoginFailed", void 0);
Account = Account_1 = __decorate([
    (0, typegoose_1.pre)("findOneAndUpdate", function () {
        return __awaiter(this, void 0, void 0, function* () {
            this._update.password = yield (0, exports.hashPassword)(this._update.password);
        });
    }),
    (0, typegoose_1.pre)("save", function () {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.password.includes("$argon2")) {
                this.password = yield (0, exports.hashPassword)(this.password);
            }
        });
    }),
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW,
        },
    })
], Account);
exports.Account = Account;
const AccountModel = (0, typegoose_1.getModelForClass)(Account);
exports.default = AccountModel;
