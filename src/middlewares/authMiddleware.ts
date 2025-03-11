import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getUserByUid } from '../repositories/user.repository';
import { CustomRequest } from '../utils/CustomRequest';
import { ApiError } from '../utils/apiError';
import { pick } from 'lodash';

export const appAuth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else {
    return next(new ApiError({
      message: 'Unauthorized',
      status: 401,
      data: null
    }));
  }

  if (!token) {
    return next(new ApiError({
      message: 'Access denied. No token provided',
      status: 401,
      data: null
    }));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const user = await getUserByUid(decoded.uid);

    if (!user) {
      throw new ApiError({
        message: 'User not found',
        status: 401,
        data: null
      });
    }

    req.user = pick(user, ['uid']);
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }

    return next(new ApiError({
      message: 'Unauthorized access',
      status: 401,
      data: null
    }));
  }
};