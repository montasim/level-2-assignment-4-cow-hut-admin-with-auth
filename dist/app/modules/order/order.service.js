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
exports.OrderService = void 0;
const user_model_1 = require("../user/user.model");
const cow_model_1 = require("../cow/cow.model");
const ApiError_1 = __importDefault(require("../../../erros/ApiError"));
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = require("./order.model");
const buyCow = (cowId, buyerId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield mongoose_1.default.startSession();
    let updatedBuyer;
    let updatedCow;
    let updatedSeller;
    try {
        session.startTransaction();
        const buyer = yield user_model_1.User.findById(buyerId).session(session);
        let cow = yield cow_model_1.Cow.findById(cowId).session(session);
        let sellerId = (_a = cow === null || cow === void 0 ? void 0 : cow.seller) === null || _a === void 0 ? void 0 : _a.toString();
        if (!sellerId || !(buyer === null || buyer === void 0 ? void 0 : buyer.budget) || !(cow === null || cow === void 0 ? void 0 : cow.price) || !(cow === null || cow === void 0 ? void 0 : cow.label)) {
            throw new ApiError_1.default(500, 'Internal error');
        }
        sellerId = sellerId.replace("ObjectId(", "").replace(")", "");
        let seller = yield user_model_1.User.findById(sellerId).session(session);
        if (!(seller === null || seller === void 0 ? void 0 : seller.income)) {
            throw new ApiError_1.default(500, 'Internal error');
        }
        if ((buyer === null || buyer === void 0 ? void 0 : buyer.budget) < (cow === null || cow === void 0 ? void 0 : cow.price)) {
            throw new ApiError_1.default(500, 'Buyer do not have enough money');
        }
        buyer.budget -= cow.price;
        updatedBuyer = yield buyer.save({ session });
        seller.income += cow.price;
        updatedSeller = yield seller.save({ session });
        cow.label = 'sold out';
        updatedCow = yield cow.save({ session });
        yield order_model_1.Order.create({ cowId, buyerId, sellerId });
        yield session.commitTransaction();
        yield session.endSession();
        return {
            cow: updatedCow,
            buyer: updatedBuyer,
            seller: updatedSeller
        };
    }
    catch (error) {
        yield session.commitTransaction();
        yield session.endSession();
        throw error;
    }
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find({});
    return orders;
});
exports.OrderService = {
    buyCow,
    getAllOrders
};
