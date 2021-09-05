"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var storeSchema = new mongoose_1.Schema({
    name: String,
    products: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Product"
        },
    ]
});
var storeModel = mongoose_1.model("Store", storeSchema);
exports["default"] = storeModel;
