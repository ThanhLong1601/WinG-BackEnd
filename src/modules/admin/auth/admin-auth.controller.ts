import { Request, Response } from "express";
import { checkAdminLogin, createAdmin } from "./admin-auth.service";

export class AdminAuthController {
  static async register(req: Request, res: Response) {
    try {
      const admin = await createAdmin(req.body);
      res.status(201).json({
        message: 'Admin created successfully',
        status: 201,
        data: admin
      });
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        status: error.status || 500,
        data: null
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const admin = await checkAdminLogin(req.body);
      res.status(200).json({
        message: 'Admin logged in successfully',
        status: 200,
        data: admin
      });
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        status: error.status || 500,
        data: null
      });
    }
  }
}
