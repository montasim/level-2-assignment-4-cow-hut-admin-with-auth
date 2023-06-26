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
exports.CowController = void 0;
const cow_service_1 = require("./cow.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const cow_constant_1 = require("./cow.constant");
const pagination_1 = require("../../../constants/pagination");
const createCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = req.body;
    const result = yield cow_service_1.CowService.createCow(cow);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Cow created successfully',
        data: result,
    });
}));
const getCows = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, cow_constant_1.cowFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield cow_service_1.CowService.getAllCows(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'All cow retrieved successfully',
        meta: result.meta,
        data: result,
    });
}));
const getCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cowId = req.params.id;
    const cow = yield cow_service_1.CowService.getCow(cowId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Retrieved user',
        data: cow,
    });
}));
const updateCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cowId = req.params.id;
    const updatedCowData = req.body;
    const updatedCow = yield cow_service_1.CowService.updateCowData(cowId, updatedCowData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User data updated',
        data: updatedCow,
    });
}));
const deleteCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cowId = req.params.id;
    const result = yield cow_service_1.CowService.deleteCow(cowId);
    if (!result) {
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: 'Can not find cow with this id',
            data: result,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Cow deleted successfully',
        data: result,
    });
}));
exports.CowController = {
    createCow,
    getCows,
    getCow,
    updateCow,
    deleteCow,
};
