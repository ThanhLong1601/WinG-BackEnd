import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getUserByUid } from '../repositories/user.repository';
import { CustomRequest } from '../utils/CustomRequest';

export const appAuth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else {
    res.status(401).json({ 
      message: 'Unauthorized',
      status: 401,
      data: null
    });
    return;
  }

  if (!token) {
    res.status(401).json({
      message: 'Access denied. No token provided',
      status: 401,
      data: null
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    const user = await getUserByUid(decoded.uid);
    if (!user) {
      res.status(404).json({
        message: 'User not found',
        status: 404,
        data: null
      });
      return;
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized access',
      status: 401,
      data: null
    });
    return;
  }
}