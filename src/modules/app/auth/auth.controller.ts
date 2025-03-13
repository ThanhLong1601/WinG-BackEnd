import { NextFunction, Request, Response } from "express";
import { checkUserLogin, createUser } from "./auth.service";
import { CustomRequest } from "../../../utils/CustomRequest";

export class AuthController {
  static async requestAcc(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const acc = await createUser(req.body);
      res.status(201).json({ 
        message: 'Your request has been sent successfully',
        status: 201,
        data: acc 
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