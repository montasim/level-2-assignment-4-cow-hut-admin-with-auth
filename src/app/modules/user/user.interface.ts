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
  // $unset?: any;
};

export type UserModel = {
  isUserExits(
      phoneNumber: string
  ): Promise<Pick<IUser, 'password' | 'role'>>;

  isPasswordMatched(
      givenPassword: string,
      savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserTypes = 'seller' | 'buyer';

// export type UserModel = Model<IUser, Record<string, unknown>>;
