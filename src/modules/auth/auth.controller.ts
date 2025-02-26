import { Request, Response } from "express";
import { checkUserLogin, createUser } from "./auth.service";

export class AuthController {
  static async register(req: Request, res: Response) {
    const user = await createUser(req.body);
    res.status(201).json({ data: { user } });
  }

  static async login(req: Request, res: Response) {
    const user = await checkUserLogin(req.body);
    res.status(200).json({ data: { user } });
  }
}