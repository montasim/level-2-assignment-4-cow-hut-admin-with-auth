import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from '../user/user.service';
import catchAsync from "../../../shared/catchAsync";
import config from "../../../config";
import {ILoginUserResponse, IRefreshTokenResponse} from "./auth.interface";
import {AuthService} from "./auth.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserService.createUser(user);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    message: 'Login successful',
    data: others,
    success: true,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);
  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    message: 'Refresh Token successful',
    data: result,
    success: true,
  });
});

export const AuthController = {
  createUser,
  refreshToken,
};
