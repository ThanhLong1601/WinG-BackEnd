import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

const convertError = (err: any): ApiError => {
  if (err instanceof ApiError) return err;

  return new ApiError({
    message: process.env.APP_ENV !== 'production' ? err.message : 'Internal Server Error',
    status: 500,
    data: null
  });
};

const buildErrorResponse = (err: ApiError) => {
  return {
    message: err.message,
    status: err.status,
    data: err.data,
  };
};

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  const error = convertError(err);
  const errorResponse = buildErrorResponse(error);

  console.error(err);

  res.status(error.status).json(errorResponse);
}
