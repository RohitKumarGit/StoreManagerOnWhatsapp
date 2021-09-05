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
var constants_1 = require("./config/constants");
var states_1 = require("./config/states");
var accountSid = process.env.SID;
var authToken = process.env.TOKEN;
var mongoose = require("mongoose");
var MessagingResponse = require("twilio").twiml.MessagingResponse;
require("dotenv").config();
var handlers_1 = require("./handlers");
var validators_1 = require("./utils/validators");
mongoose.connect("mongodb://localhost:27017/whatsapp");
mongoose.connection.on("error", function (err) {
    console.log("err", err);
});
mongoose.connection.on("connected", function (err, res) {
    console.log("mongoose is connected");
});
var bodyParser = require("body-parser");
var express = require("express");
var app = express();
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
var router = express.Router();
app.post("/sms", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var twiml, body, phone, text, currentSession, currentState, i, error_1, _a, error_2, t, message, error_3, error_4;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 27, , 28]);
                twiml = new MessagingResponse();
                body = req.body;
                phone = body.WaId;
                text = body.Body;
                //const { phone, text } = req.body;
                console.log(req.body, phone, text);
                return [4 /*yield*/, handlers_1.getCurrentSession(phone)];
            case 1:
                currentSession = _c.sent();
                if (!(text === "menu")) return [3 /*break*/, 3];
                return [4 /*yield*/, handlers_1.setNextState(constants_1.STATES.MENU, currentSession._id)];
            case 2:
                _c.sent();
                twiml.message(states_1.States[constants_1.STATES.MENU].message);
                res.writeHead(200, { "Content-Type": "text/xml" });
                return [2 /*return*/, res.end(twiml.toString())];
            case 3:
                currentState = states_1.States[currentSession.currentState];
                if (!currentState) {
                    twiml.message("Some technical error");
                    res.writeHead(200, { "Content-Type": "text/xml" });
                    return [2 /*return*/, res.end(twiml.toString())];
                }
                _c.label = 4;
            case 4:
                _c.trys.push([4, 25, , 26]);
                _c.label = 5;
            case 5:
                _c.trys.push([5, 10, , 11]);
                i = 0;
                _c.label = 6;
            case 6:
                if (!(i < currentState.responseValidator.length)) return [3 /*break*/, 9];
                return [4 /*yield*/, currentState.responseValidator[i](text)];
            case 7:
                _c.sent();
                _c.label = 8;
            case 8:
                i++;
                return [3 /*break*/, 6];
            case 9: return [3 /*break*/, 11];
            case 10:
                error_1 = _c.sent();
                twiml.message(error_1.message);
                res.writeHead(200, { "Content-Type": "text/xml" });
                return [2 /*return*/, res.end(twiml.toString())];
            case 11:
                _a = currentState.stateCode === constants_1.STATES.MENU &&
                    text !== "0";
                if (!_a) return [3 /*break*/, 13];
                return [4 /*yield*/, validators_1.storeStateValidator(phone)];
            case 12:
                _a = !(_c.sent());
                _c.label = 13;
            case 13:
                if (_a) {
                    twiml.message("Please create a store first");
                    res.writeHead(200, { "Content-Type": "text/xml" });
                    return [2 /*return*/, res.end(twiml.toString())];
                }
                if (!currentState.handler) return [3 /*break*/, 17];
                _c.label = 14;
            case 14:
                _c.trys.push([14, 16, , 17]);
                console.log(currentState.handler);
                if (req.body.MediaUrl0) {
                    text = req.body.MediaUrl0;
                }
                return [4 /*yield*/, currentState.handler(text, phone)];
            case 15:
                _c.sent();
                return [3 /*break*/, 17];
            case 16:
                error_2 = _c.sent();
                twiml.message(error_2);
                res.writeHead(200, { "Content-Type": "text/xml" });
                return [2 /*return*/, res.end(twiml.toString())];
            case 17:
                if (!(currentState.stateCode === constants_1.STATES.MENU)) return [3 /*break*/, 22];
                if (!(text === "0")) return [3 /*break*/, 18];
                currentState.nextState = constants_1.STATES.STORE_NAME;
                return [3 /*break*/, 22];
            case 18:
                if (!(text === "1")) return [3 /*break*/, 19];
                currentState.nextState = constants_1.STATES.PRODUCT_UNIQUE_IDENTIFIER;
                return [3 /*break*/, 22];
            case 19:
                if (!(text === "2")) return [3 /*break*/, 21];
                return [4 /*yield*/, handlers_1.getProducts(phone)];
            case 20:
                t = _c.sent();
                console.log(t);
                res.writeHead(200, { "Content-Type": "text/xml" });
                twiml.message(t);
                return [2 /*return*/, res.end(twiml.toString())];
            case 21:
                if (text === "3") {
                    currentState.nextState = constants_1.STATES.EDIT_INVENTORY_PRODUCT_ID;
                }
                _c.label = 22;
            case 22:
                if (currentState.customMessage) {
                    twiml.message(currentState.customMessage);
                    //  sendMessage([currentState.customMessage]);
                }
                if (currentState.successMessage) {
                    twiml.message(currentState.successMessage);
                    //  sendMessage([currentState.customMessage]);
                }
                if (!(currentState.nextState || currentState.nextState === constants_1.STATES.MENU)) return [3 /*break*/, 24];
                return [4 /*yield*/, handlers_1.setNextState(currentState.nextState, currentSession._id)];
            case 23:
                _c.sent();
                message = (_b = states_1.States[currentState.nextState]) === null || _b === void 0 ? void 0 : _b.message;
                twiml.message(message);
                res.writeHead(200, { "Content-Type": "text/xml" });
                return [2 /*return*/, res.end(twiml.toString())];
            case 24: return [3 /*break*/, 26];
            case 25:
                error_3 = _c.sent();
                twiml.message(error_3);
                res.writeHead(200, { "Content-Type": "text/xml" });
                return [2 /*return*/, res.end(twiml.toString())];
            case 26: return [3 /*break*/, 28];
            case 27:
                error_4 = _c.sent();
                console.log(error_4);
                res.status(500).send(JSON.stringify(error_4));
                return [3 /*break*/, 28];
            case 28: return [2 /*return*/];
        }
    });
}); });
app.listen(4000, function (err) {
    if (!err) {
        console.log("server is running at ", 4000);
    }
});
