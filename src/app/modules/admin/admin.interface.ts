import { Model } from 'mongoose';

export type IAdmin = {
  phoneNumber: string;
  role: IAdminUserTypes;
  password: string;
  name: string;
  firstName: string;
  lastName: string;
  address: string;
};

export type AdminModel = {
  isUserExits(
    phoneNumber: string
  ): Promise<Pick<IAdmin, 'password' | 'role'>>;

  isPasswordMatched(
      givenPassword: string,
      savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;

export type IAdminUserTypes = 'admin';

// export type AdminModel = Model<IAdmin, Record<string, unknown>>;
