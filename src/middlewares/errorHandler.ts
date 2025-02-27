import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const errorHandler: (
  error: Error & { statusCode?: number; data?: any },
  req: Request,
  res: Response,
  next: NextFunction
) => void = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
      status: error.statusCode || 500,
      data: error.data || null,
    });
  }

  console.error(error);
  res.status(500).json({
    message: 'Internal Server Error',
    status: 500,
    data: null,
  });
};
