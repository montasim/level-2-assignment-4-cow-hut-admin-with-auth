"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    buyerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    sellerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    cowId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Cow', required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// Create and export the Mongoose model
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
