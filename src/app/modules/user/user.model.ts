import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { userTypes } from './user.constant';

const userSchema = new Schema<IUser>(
  {
    phoneNumber: { type: String, required: true },
    role: { type: String, enum: userTypes, required: true },
    password: { type: String, required: true },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    address: { type: String, required: true },
    budget: { type: Number },
    income: { type: Number },
  },
  {
    timestamps: true,
  }
);

// Create and export the Mongoose model
export const User = model<IUser, UserModel>('User', userSchema);
