import { Request, RequestHandler, Response } from 'express';

import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  }
);

const getUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const allUsers = await UserService.getAllUsers();

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'All user retrieved successfully',
      data: allUsers,
    });
  }
);

const getUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const user = await UserService.getUser(userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Retrieved user',
      data: user,
    });
  }
);

const updateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const updatedUserData = req.body;

    const updatedUser = await UserService.updateUserData(
      userId,
      updatedUserData
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User data updated',
      data: updatedUser,
    });
  }
);

const deleteUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    const result = await UserService.deleteUser(userId);

    if (!result) {
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Can not find user with this id',
        data: result,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User deleted successfully',
      data: result,
    });
  }
);

export const UserController = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
