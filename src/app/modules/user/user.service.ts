import { User } from './user.model';
import { IUser } from './user.interface';
import ApiError from '../../../erros/ApiError';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(500, 'Failed to create user!');
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
  // let updatedDataAndCondition = { $set: { ...userData }, $unset: {}};
  // const previousUserData = await User.findById(id);
  // if(previousUserData && userData.role != previousUserData.role) {
  //   if(userData.role == 'buyer') {
  //     const { income, ...userDataWithoutIncome } = userData;
  //     updatedDataAndCondition = { $set: { ...userDataWithoutIncome }, $unset: {}}
  //     updatedDataAndCondition.$unset = {income: 1};
  //     console.log(updatedDataAndCondition)
  //   } else {
  //     const { budget, ...userDataWithoutBudget } = userData;
  //     updatedDataAndCondition = { $set: { ...userDataWithoutBudget }, $unset: {}}
  //     updatedDataAndCondition.$unset = {budget: 1};
  //     console.log(updatedDataAndCondition)
  //   }
  // }
  // const updatedUserData = await User.findOneAndUpdate({ _id: id }, updatedDataAndCondition, {
  //   new: true,$unset: true
  // });
  // return updatedUserData;
  const updatedUserData = await User.findOneAndUpdate({ _id: id }, userData, {
    new: true,
  });
  return updatedUserData;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  createUser,
  getAllUsers,
  getUser,
  updateUserData,
  deleteUser,
};
