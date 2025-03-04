import jwt, { JwtPayload  } from 'jsonwebtoken';
import { NextFunction, Response } from "express";
import { CustomRequest } from "../utils/CustomRequest";
import { getAdminByUid } from '../repositories/admin.repository';

export const adminAuth = async (req: CustomRequest, res: Response, next: NextFunction) => {
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
    const user = await getAdminByUid(decoded.uid);
    if (!user) {
      res.status(401).json({
        message: 'User not found',
        status: 401,
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