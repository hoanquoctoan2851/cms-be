"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_rsa_1 = __importDefault(require("node-rsa"));
class RSAService {
    constructor({ privateKey, publicKey, }) {
        const keys = new node_rsa_1.default({ b: 512 });
        this.privateKey = privateKey || keys.exportKey("private");
        this.publicKey = publicKey || keys.exportKey("public");
        this.keysPrivate = new node_rsa_1.default(this.privateKey);
        this.keysPublic = new node_rsa_1.default(this.publicKey);
    }
    getPublicKey() {
        return this.publicKey;
    }
    getPrivateKey() {
        return this.privateKey;
    }
    encrypt(text) {
        return this.keysPublic.encrypt(text, "base64");
    }
    decrypt(text) {
        return this.keysPrivate.decrypt(text, "utf8");
    }
}
exports.default = RSAService;
