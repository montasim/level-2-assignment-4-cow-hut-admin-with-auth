import { Request, RequestHandler, Response } from 'express';

import { CowService } from './cow.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { cowFilterableFields } from './cow.constant';
import { paginationFields } from '../../../constants/pagination';

const createCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const cow = req.body;
    const result = await CowService.createCow(cow);

    if(!result) {
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Can not create cow',
            data: result,
        });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Cow created successfully',
      data: result,
    });
  }
);

const getCows: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, cowFilterableFields);

    const paginationOptions = pick(req.query, paginationFields);

    const result = await CowService.getAllCows(filters, paginationOptions);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'All cow retrieved successfully',
      meta: result.meta,
      data: result,
    });
  }
);

const getCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const cowId: string = req.params.id;
    const cow = await CowService.getCow(cowId);

    if (!cow) {
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Can not find cow with this id',
            data: cow,
        });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Retrieved user',
      data: cow,
    });
  }
);

const updateCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const cowId: string = req.params.id;
    const updatedCowData = req.body;

    const updatedCow = await CowService.updateCowData(cowId, updatedCowData);

    if (!updatedCow) {
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Can not find cow with this id',
            data: updatedCow,
        });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User data updated',
      data: updatedCow,
    });
  }
);

const deleteCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const cowId = req.params.id;
    const result = await CowService.deleteCow(cowId);

    if (!result) {
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Can not find cow with this id',
        data: result,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Cow deleted successfully',
      data: result,
    });
  }
);

export const CowController = {
  createCow,
  getCows,
  getCow,
  updateCow,
  deleteCow,
};
