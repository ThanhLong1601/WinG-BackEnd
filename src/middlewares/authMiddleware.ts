import { Request, Response, NextFunction } from 'express';
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';
import { getUserById } from '../repositories/user.repository';

export const appAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else {
    return res.status(401).json({
      message: 'Unauthorized',
      code: null,
      status: 401
    });
  }

  if (!token) {
    return res.status(401).json({
      message: 'Access denied. No token provided',
      code: null,
      status: 404
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    const user = await getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({
        message: 'User not found',
        code: null,
        status: 404
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized access',
    });
  }
}