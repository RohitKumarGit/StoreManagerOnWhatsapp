"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.changeInventory = exports.editProduct = exports.getProducts = exports.addProductImage = exports.addProductQuantity = exports.addProductPrice = exports.addProductDescription = exports.addProductName = exports.createStore = exports.setNextState = exports.getCurrentSession = void 0;
var constants_1 = require("../config/constants");
var store_db_1 = require("../dbmodels/store.db");
var session_db_1 = require("../dbmodels/session.db");
var product_db_1 = require("../dbmodels/product.db");
var getCurrentSession = function (phoneNumber) { return __awaiter(void 0, void 0, void 0, function () {
    var session;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, session_db_1["default"].findOne({
                    phone: phoneNumber
                })];
            case 1:
                session = _a.sent();
                if (!!session) return [3 /*break*/, 3];
                console.log("creating session");
                return [4 /*yield*/, session_db_1["default"].create({
                        phone: phoneNumber,
                        currentState: constants_1.STATES.MENU
                    })];
            case 2:
                session = _a.sent();
                console.log(session);
                _a.label = 3;
            case 3: return [2 /*return*/, session];
        }
    });
}); };
exports.getCurrentSession = getCurrentSession;
var setNextState = function (nextState, sessionId) { return __awaiter(void 0, void 0, void 0, function () {
    var session;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, session_db_1["default"].findById(sessionId)];
            case 1:
                session = _a.sent();
                if (nextState === constants_1.STATES.MENU) {
                    if (session.payload && session.payload.productId) {
                        delete session.payload.productId;
                        delete session.payload.editProduct;
                    }
                }
                if (!session) return [3 /*break*/, 3];
                session.currentState = nextState;
                return [4 /*yield*/, session.save()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.setNextState = setNextState;
var createStore = function (name, phone) { return __awaiter(void 0, void 0, void 0, function () {
    var session;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, session_db_1["default"].findOne({ phone: phone })];
            case 1:
                session = _a.sent();
                if (!session) return [3 /*break*/, 4];
                session.payload = { storeName: name };
                return [4 /*yield*/, session.save()];
            case 2:
                _a.sent();
                console.log(session);
                return [4 /*yield*/, store_db_1["default"].create({ name: name })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createStore = createStore;
var addProductName = function (productName, phone) { return __awaiter(void 0, void 0, void 0, function () {
    var session, store, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, session_db_1["default"].findOne({ phone: phone })];
            case 1:
                session = _a.sent();
                return [4 /*yield*/, store_db_1["default"].findOne({ name: session.payload.storeName })];
            case 2:
                store = _a.sent();
                return [4 /*yield*/, product_db_1["default"].create({
                        identifier: productName
                    })];
            case 3:
                product = _a.sent();
                session.payload.productId = product._id;
                // @ts-ignore
                store.products.push(product._id);
                console.log(session);
                return [4 /*yield*/, session.save()];
            case 4:
                _a.sent();
                return [4 /*yield*/, store.save()];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.addProductName = addProductName;
var addProductDescription = function (desc, phone) { return __awaiter(void 0, void 0, void 0, function () {
    var session, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, session_db_1["default"].findOne({ phone: phone })];
            case 1:
                session = _a.sent();
                console.log(session);
                console.log(session.payload);
                console.log(session.payload.productId);
                return [4 /*yield*/, product_db_1["default"].findById(session.payload.productId)];
            case 2:
                product = _a.sent();
                product.description = desc;
                return [4 /*yield*/, product.save()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.addProductDescription = addProductDescription;
var addProductPrice = function (price, phone) { return __awaiter(void 0, void 0, void 0, function () {
    var session, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, session_db_1["default"].findOne({ phone: phone })];
            case 1:
                session = _a.sent();
                return [4 /*yield*/, product_db_1["default"].findById(session.payload.productId)];
            case 2:
                product = _a.sent();
                product.price = price;
                return [4 /*yield*/, product.save()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.addProductPrice = addProductPrice;
var addProductQuantity = function (quant, phone) { return __awaiter(void 0, void 0, void 0, function () {
    var session, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, session_db_1["default"].findOne({ phone: phone })];
            case 1:
                session = _a.sent();
                return [4 /*yield*/, product_db_1["default"].findById(session.payload.productId)];
            case 2:
                product = _a.sent();
                product.quantity = quant;
                return [4 /*yield*/, product.save()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.addProductQuantity = addProductQuantity;
var addProductImage = function (image, phone) { return __awaiter(void 0, void 0, void 0, function () {
    var session, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, session_db_1["default"].findOne({ phone: phone })];
            case 1:
                session = _a.sent();
                return [4 /*yield*/, product_db_1["default"].findById(session.payload.productId)];
            case 2:
                product = _a.sent();
                product.image = image;
                delete session.payload.productId;
                return [4 /*yield*/, product.save()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.addProductImage = addProductImage;
var getProducts = function (phone) { return __awaiter(void 0, void 0, void 0, function () {
    var session, store, ret;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, session_db_1["default"].findOne({ phone: phone })];
            case 1:
                session = _a.sent();
                return [4 /*yield*/, store_db_1["default"]
                        .findOne({ name: session.payload.storeName })
                        .populate("products")];
            case 2:
                store = _a.sent();
                console.log(store);
                ret = "";
                if (!store.products) {
                    return [2 /*return*/, (ret += "No products in inventory")];
                }
                store.products.forEach(function (product) {
                    ret +=
                        "\n Name : " +
                            product.identifier +
                            " | price : Rs " +
                            product.price +
                            " | quantity: " +
                            product.quantity;
                });
                return [2 /*return*/, ret];
        }
    });
}); };
exports.getProducts = getProducts;
var editProduct = function (identifier, phone) { return __awaiter(void 0, void 0, void 0, function () {
    var product, session;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_db_1["default"].findOne({ identifier: identifier })];
            case 1:
                product = _a.sent();
                console.log(product);
                if (!product) {
                    return [2 /*return*/, Promise.reject("Please enter a correct identifier.")];
                }
                return [4 /*yield*/, session_db_1["default"].findOne({ phone: phone })];
            case 2:
                session = _a.sent();
                session.payload.editProduct = product._id;
                console.log(session);
                return [4 /*yield*/, session.save()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.editProduct = editProduct;
var changeInventory = function (newInventory, phone) { return __awaiter(void 0, void 0, void 0, function () {
    var session, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("changing inventory");
                return [4 /*yield*/, session_db_1["default"].findOne({ phone: phone })];
            case 1:
                session = _a.sent();
                console.log(session);
                return [4 /*yield*/, product_db_1["default"].findById(session.payload.editProduct)];
            case 2:
                product = _a.sent();
                product.quantity = newInventory;
                console.log(product);
                return [4 /*yield*/, product.save()];
            case 3:
                _a.sent();
                delete session.payload.editProduct;
                return [4 /*yield*/, session.save()];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.changeInventory = changeInventory;
