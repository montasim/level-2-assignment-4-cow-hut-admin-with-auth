import { Model, Types } from 'mongoose';

export type IOrder = {
  sellerId: Types.ObjectId;
  buyerId: Types.ObjectId;
  cowId: Types.ObjectId;
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
