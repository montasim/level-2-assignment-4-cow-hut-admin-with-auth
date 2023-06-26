import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from '../user/user.service';

const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserService.createUser(user);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
};

export const AuthController = {
  createUser,
};
