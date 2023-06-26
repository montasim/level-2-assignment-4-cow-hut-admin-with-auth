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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const buyCow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let cowId = (_a = req.body) === null || _a === void 0 ? void 0 : _a.cow;
    let buyerId = (_b = req.body) === null || _b === void 0 ? void 0 : _b.buyer;
    buyerId = buyerId.replace("ObjectId(", "").replace(")", "");
    cowId = cowId.replace("ObjectId(", "").replace(")", "");
    const result = yield order_service_1.OrderService.buyCow(cowId, buyerId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Order placed successfully',
        data: result,
    });
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.getAllOrders();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Order placed successfully',
        data: result,
    });
});
exports.OrderController = {
    getOrders,
    buyCow
};
