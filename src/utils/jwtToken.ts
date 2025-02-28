import jwt from 'jsonwebtoken';

interface TokenPayLoad {
  uid: string;
  iat?: number;
  exp?: number;
}

export const generateToken = (payLoad: TokenPayLoad) => {
  if (!process.env.JWT_SECRET) {
    throw {
      message: 'JWT_SECRET is not defined',
      status: 500,
      data: null
    };
  }
  return jwt.sign(payLoad, process.env.JWT_SECRET, {expiresIn: '7d'});
}