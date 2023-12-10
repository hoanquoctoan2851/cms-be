"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentReason = exports.TimeYear = exports.TuitionObj = exports.TuitionType = exports.StatusLetter = exports.AccountType = exports.Majors = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["MALE"] = "nam";
    Gender["FEMALE"] = "n\u1EEF";
})(Gender = exports.Gender || (exports.Gender = {}));
var Majors;
(function (Majors) {
    Majors["SECURITY"] = "An to\u00E0n th\u00F4ng tin";
    Majors["IT"] = "C\u00F4ng ngh\u1EC7 th\u00F4ng tin";
    Majors["Electronic"] = "\u0110i\u1EC7n t\u1EED vi\u1EC5n th\u00F4ng";
    Majors["Sale"] = "Nh\u00E2n vi\u00EAn t\u01B0 v\u1EA5n b\u00E1n h\u00E0ng";
})(Majors = exports.Majors || (exports.Majors = {}));
var AccountType;
(function (AccountType) {
    AccountType["ADMIN"] = "admin";
    AccountType["TEACHER"] = "teacher";
    AccountType["USER"] = "user";
})(AccountType = exports.AccountType || (exports.AccountType = {}));
var StatusLetter;
(function (StatusLetter) {
    StatusLetter["PENDING"] = "pending";
    StatusLetter["CONFIRM"] = "confirm";
    StatusLetter["RECONFIRM"] = "re_confirm";
    StatusLetter["SUCCESS"] = "success";
    StatusLetter["APPROVED"] = "approved";
    StatusLetter["REJECT"] = "reject";
})(StatusLetter = exports.StatusLetter || (exports.StatusLetter = {}));
var TuitionType;
(function (TuitionType) {
    TuitionType["NONE"] = "Kh\u00F4ng mi\u1EC5n gi\u1EA3m";
    TuitionType["REDUCE"] = "Gi\u1EA3m h\u1ECDc ph\u00ED";
    TuitionType["FREE"] = "Mi\u1EC5n h\u1ECDc ph\u00ED";
})(TuitionType = exports.TuitionType || (exports.TuitionType = {}));
var TuitionObj;
(function (TuitionObj) {
    TuitionObj["ORPHAN"] = "M\u1ED3 c\u00F4i";
    TuitionObj["NONE_ORPHAN"] = "Kh\u00F4ng m\u1ED3 c\u00F4i";
})(TuitionObj = exports.TuitionObj || (exports.TuitionObj = {}));
var TimeYear;
(function (TimeYear) {
    TimeYear[TimeYear["HALF"] = 6] = "HALF";
    TimeYear[TimeYear["Full"] = 12] = "Full";
})(TimeYear = exports.TimeYear || (exports.TimeYear = {}));
var PaymentReason;
(function (PaymentReason) {
    PaymentReason["Graduation"] = "T\u1ED1t nghi\u1EC7p";
    PaymentReason["LeaveSchool"] = "Th\u00F4i h\u1ECDc";
})(PaymentReason = exports.PaymentReason || (exports.PaymentReason = {}));
