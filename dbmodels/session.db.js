"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var sessionSchema = new mongoose_1.Schema({
    currentState: String,
    phone: String,
    payload: {
        storeName: String,
        productId: mongoose_1.Schema.Types.ObjectId,
        editProduct: String
    }
});
var sessionModel = mongoose_1.model("session", sessionSchema);
exports["default"] = sessionModel;
