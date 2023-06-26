import { model, Schema } from 'mongoose';
import {IOrder, OrderModel} from "./order.interface";

const orderSchema = new Schema<IOrder>(
  {
    buyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cowId: { type: Schema.Types.ObjectId, ref: 'Cow', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Create and export the Mongoose model
export const Order = model<IOrder, OrderModel>('Order', orderSchema);
