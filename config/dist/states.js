"use strict";
var _a;
exports.__esModule = true;
exports.States = void 0;
var handlers_1 = require("../handlers");
var validators_1 = require("../utils/validators");
var constants_1 = require("./constants");
// TODO
// MENU
// CREATE_STORE
exports.States = (_a = {},
    _a[constants_1.STATES.MENU] = {
        stateCode: constants_1.STATES.MENU,
        message: "\n       Please choose one of the option to proceed further :\n       0. Create Store  \n       1. Add product to inventory\n       2. View Inventory  \n       3. Edit Inventory \n    ",
        responseValidator: [validators_1.menuValidator]
    },
    _a[constants_1.STATES.STORE_NAME] = {
        stateCode: constants_1.STATES.STORE_NAME,
        message: "Please enter the name of the new store",
        successMessage: "Store has been created!",
        responseValidator: [validators_1.stringValidator],
        handler: handlers_1.createStore,
        nextState: constants_1.STATES.MENU,
        customMessage: "Store has been created!"
    },
    _a[constants_1.STATES.PRODUCT_UNIQUE_IDENTIFIER] = {
        stateCode: constants_1.STATES.PRODUCT_UNIQUE_IDENTIFIER,
        message: "Please enter the unique identifier of the product",
        responseValidator: [validators_1.stringValidator],
        handler: handlers_1.addProductName,
        nextState: constants_1.STATES.PRODUCT_DESC
    },
    _a[constants_1.STATES.PRODUCT_DESC] = {
        stateCode: constants_1.STATES.PRODUCT_DESC,
        message: "Please description of the product",
        responseValidator: [validators_1.stringValidator],
        handler: handlers_1.addProductDescription,
        nextState: constants_1.STATES.PRODUCT_PRICE
    },
    _a[constants_1.STATES.PRODUCT_PRICE] = {
        stateCode: constants_1.STATES.PRODUCT_PRICE,
        message: "Please provide price of the product",
        responseValidator: [validators_1.numberValidator],
        handler: handlers_1.addProductPrice,
        nextState: constants_1.STATES.PRODUCT_QUANTITY
    },
    _a[constants_1.STATES.PRODUCT_QUANTITY] = {
        stateCode: constants_1.STATES.PRODUCT_QUANTITY,
        message: "Please provide quantity of the product",
        responseValidator: [validators_1.numberValidator],
        handler: handlers_1.addProductQuantity,
        nextState: constants_1.STATES.PRODUCT_IMAGE
    },
    _a[constants_1.STATES.PRODUCT_IMAGE] = {
        stateCode: constants_1.STATES.PRODUCT_IMAGE,
        message: "add image of the product",
        responseValidator: [validators_1.stringValidator],
        handler: handlers_1.addProductImage,
        successMessage: "Product has been added succesfully!",
        nextState: constants_1.STATES.MENU
    },
    _a[constants_1.STATES.EDIT_INVENTORY_PRODUCT_ID] = {
        stateCode: constants_1.STATES.EDIT_INVENTORY_PRODUCT_ID,
        message: "What's the unique identifier of the product?",
        responseValidator: [validators_1.stringValidator],
        handler: handlers_1.editProduct,
        nextState: constants_1.STATES.EDIT_INVENTORY_NEW_INVENTORY
    },
    _a[constants_1.STATES.EDIT_INVENTORY_NEW_INVENTORY] = {
        stateCode: constants_1.STATES.EDIT_INVENTORY_NEW_INVENTORY,
        message: "What's the new inventory of the product?",
        responseValidator: [validators_1.numberValidator],
        handler: handlers_1.changeInventory,
        successMessage: "Inventory has been changed",
        nextState: constants_1.STATES.MENU
    },
    _a);
