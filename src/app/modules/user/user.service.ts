import { User } from './user.model';
import { IUser } from './user.interface';
import config from '../../../config';
import ApiError from '../../../erros/ApiError';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new Error('Failed to create user!');
  }
  return createdUser;
};

const getAllUsers = async (): Promise<IUser[]> => {
  const allUsers = await User.find({});
  return allUsers;
};

const getUser = async (id: string | undefined): Promise<IUser | null> => {
  const user = await User.findById(id);
  return user;
};

const updateUserData = async (
  id: string,
  userData: IUser
): Promise<IUser | null> => {
  if (userData?.budget && userData?.income) {
    throw new ApiError(400, 'A user can have both budget and income');
  }
  const updatedUserData = await User.findOneAndUpdate({ _id: id }, userData, {
    new: true,
  });
  ////TODO: user now found
  return updatedUserData;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  ////TODO: user now found
  return result;
};

export const UserService = {
  createUser,
  getAllUsers,
  getUser,
  updateUserData,
  deleteUser,
};
