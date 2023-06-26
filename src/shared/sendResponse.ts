import { Response } from 'express';

type IApiResponse<T> = {
  statusCode: number | undefined;
  success: boolean;
  message: string | null | undefined;
  meta?: {
    page: number;
    limit: number;
    total: number;
  } | undefined;
  data?: T | null;
};

// data: T | null;
// success: boolean;
// meta: { page: number; limit: number; total: number } | undefined;
// message: string | null | undefined;
// statusCode: number | undefined

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data?.meta ,
    data: data.data,
  };

  if (data.statusCode != null) {
    res.status(data.statusCode).json(responseData);
  }
};

export default sendResponse;
