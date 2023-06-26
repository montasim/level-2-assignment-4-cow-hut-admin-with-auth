import { NextFunction, Request, RequestHandler, Response } from 'express';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import {IAdmin} from "./admin.interface";
import {AdminService} from "./admin.service";
import config from "../../../config";
import {ILoginAdminResponse} from "./admin.constant";

const createAdmin: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const { ...admin } = req.body;
        const result = await AdminService.createAdmin(admin);

        sendResponse<IAdmin>(res,{
            statusCode: 200,
            success: true,
            message: 'Admin created successfully',
            data: result,
        });
    }
);

const loginAdmin: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const { ...loginData } = req.body;
        const result = await AdminService.loginAdmin(loginData);
        const { refreshToken, ...others } = result;

        const cookieOptions = {
            secure: config.env === 'production' ? true : false,
            httpOnly: true,
        };
        res.cookie('refreshToken', refreshToken, cookieOptions);

        sendResponse<ILoginAdminResponse>(res, {
            statusCode: 200,
            message: 'Admin login successful',
            data: others,
            success: true,
        });
    }
)

export const AdminController = {
    createAdmin,
    loginAdmin
};
