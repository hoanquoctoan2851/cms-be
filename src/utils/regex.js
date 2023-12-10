"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexMonth = exports.regexDate = exports.regexNumber = void 0;
exports.regexNumber = /^\d+$/;
// YYYY-MM-DD
exports.regexDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
exports.regexMonth = /^\d{4}-(0[1-9]|1[0-2])$/;
