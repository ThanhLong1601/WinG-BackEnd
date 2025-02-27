import { NextFunction, Request, Response } from "express";
import { checkUserLogin, createUser } from "./auth.service";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await createUser(req.body);
      res.status(201).json({ 
        message: 'User created successfully',
        status: 201,
        data: user 
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await checkUserLogin(req.body);
      res.status(200).json({
        message: 'User logged in successfully',
        status: 200, 
        data: user 
      });
    } catch (error) {
      next(error);
    }
  }
}