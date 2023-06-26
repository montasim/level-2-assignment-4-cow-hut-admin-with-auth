"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// data: T | null;
// success: boolean;
// meta: { page: number; limit: number; total: number } | undefined;
// message: string | null | undefined;
// statusCode: number | undefined
const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        meta: data === null || data === void 0 ? void 0 : data.meta,
        data: data.data,
    };
    if (data.statusCode != null) {
        res.status(data.statusCode).json(responseData);
    }
};
exports.default = sendResponse;
