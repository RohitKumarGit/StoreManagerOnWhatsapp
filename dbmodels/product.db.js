"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.Schema({
    price: Number,
    quantity: Number,
    identifier: String,
    description: String,
    image: String
});
var productModel = mongoose_1.model("Product", productSchema);
exports["default"] = productModel;
