import { Model } from 'mongoose';

export type IUser = {
  phoneNumber: string;
  role: IUserTypes;
  password: string;
  name: string;
  firstName: string;
  lastName: string;
  address: string;
  budget?: number;
  income?: number;
};

export type IUserTypes = 'seller' | 'buyer';

export type UserModel = Model<IUser, Record<string, unknown>>;
