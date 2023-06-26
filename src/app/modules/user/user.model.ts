import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { userTypes } from './user.constant';
import bcrypt from 'bcrypt';
import config from "../../../config";

const userSchema = new Schema<IUser, UserModel>(
  {
    phoneNumber: { type: String, required: true, unique: true },
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
    income: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isUserExits = async function (
    id: string
): Promise<Pick<
    IUser,
    'password' | 'role'
> | null> {
    const user = await User.findOne(
        { id },
        { password: 1, role: 1 }
    ).lean();
    return user;
};

userSchema.statics.isPasswordMatch = async function (
    givenPassword: string,
    savedPassword: string
): Promise<boolean> {
    const isPasswordMatch = await bcrypt.compare(givenPassword, savedPassword);
    return isPasswordMatch;
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bycrypt_salt_round)
    );
    next();
});

// Create and export the Mongoose model
export const User = model<IUser, UserModel>('User', userSchema);
