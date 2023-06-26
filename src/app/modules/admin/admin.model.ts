import { Schema, model } from 'mongoose';
import { IAdmin, AdminModel } from './admin.interface';
import bcrypt from "bcrypt";
import config from "../../../config";
import {adminTypes} from "./admin.constant";

const adminSchema = new Schema<IAdmin, AdminModel>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: adminTypes, required: true },
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
  },
  {
    timestamps: true,
  }
);

adminSchema.statics.isUserExits = async function (
    phoneNumber: string
): Promise<IAdmin | null> {
    const admin = await Admin.findOne(
        { phoneNumber },
        { role: 1, password: 1 }
    ).lean();
    return admin;
};

adminSchema.statics.isPasswordMatched = async function (
    givenPassword: string,
    savedPassword: string
): Promise<boolean> {
    const isPasswordMatch = await bcrypt.compare(givenPassword, savedPassword);
    return isPasswordMatch;
};

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bycrypt_salt_round)
    );
    next();
});

// Create and export the Mongoose model
export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);