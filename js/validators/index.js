"use strict";
exports.__esModule = true;
exports.emailValidator = void 0;
var emailValidator = /** @class */ (function () {
    function emailValidator(email) {
        this.email = email;
    }
    emailValidator.prototype.validate = function () {
        return true;
    };
    return emailValidator;
}());
exports.emailValidator = emailValidator;
