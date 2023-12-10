"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseError = void 0;
function responseError(message, data) {
    return Object.assign(Object.assign({ success: false }, (message && { message: message })), (data && { data: data }));
}
exports.responseError = responseError;
