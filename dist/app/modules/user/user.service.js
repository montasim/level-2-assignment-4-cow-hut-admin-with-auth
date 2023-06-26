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
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const ApiError_1 = __importDefault(require("../../../erros/ApiError"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUser = yield user_model_1.User.create(user);
    if (!createdUser) {
        throw new Error('Failed to create user!');
    }
    return createdUser;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield user_model_1.User.find({});
    return allUsers;
});
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    return user;
});
const updateUserData = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if ((userData === null || userData === void 0 ? void 0 : userData.budget) && (userData === null || userData === void 0 ? void 0 : userData.income)) {
        throw new ApiError_1.default(400, 'A user can have both budget and income');
    }
    const updatedUserData = yield user_model_1.User.findOneAndUpdate({ _id: id }, userData, {
        new: true,
    });
    ////TODO: user now found
    return updatedUserData;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(id);
    ////TODO: user now found
    return result;
});
exports.UserService = {
    createUser,
    getAllUsers,
    getUser,
    updateUserData,
    deleteUser,
};
