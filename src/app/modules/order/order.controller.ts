import {Request, Response} from "express";
import {OrderService} from "./order.service";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";


const buyCow = catchAsync(async (req: Request, res: Response) => {
    let cowId = req.body?.cow;
    let buyerId = req.body?.buyer;
    buyerId = buyerId.replace("ObjectId(", "").replace(")", "");
    cowId = cowId.replace("ObjectId(", "").replace(")", "");

    const result = await OrderService.buyCow(cowId, buyerId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Order placed successfully',
        data: result,
    });
});

const getOrders = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderService.getAllOrders();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Order placed successfully',
        data: result,
    });
});

export const OrderController = {
    getOrders,
    buyCow
}