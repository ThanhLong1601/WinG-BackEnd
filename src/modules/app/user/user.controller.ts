import { Response } from "express";
import { CustomRequest } from "../../../utils/CustomRequest";
import { updateUserProfile } from "./user.service";

export class UserController {
  static async updateProfileUser(req: CustomRequest, res: Response) {
    try {
      const { body, user } = req;
      const { uid } = user;
      
      const dataUser = await updateUserProfile(uid, body);
      res.status(200).json({ 
        message: 'User updated successfully',
        status: 200,
        data: dataUser
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