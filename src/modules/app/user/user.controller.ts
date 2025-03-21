import { NextFunction, Response } from "express";
import { CustomRequest } from "../../../utils/CustomRequest";
import { updateUserProfile, updatedUserTimezone, userSettingUpdated } from "./user.service";

export class UserController {
  static async updateProfileUser(req: CustomRequest, res: Response, next: NextFunction) {
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
      next(error);
    }
  }

  static async updateUserSettings(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { body, user } = req;
      const { uid } = user;
      
      const dataUser = await userSettingUpdated(uid, body);
      res.status(200).json({ 
        message: 'User updated successfully',
        status: 200,
        data: dataUser
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateTimezone(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { body, user } = req;
      const { uid } = user;
      
      const dataUser = await updatedUserTimezone(uid, body);
      res.status(200).json({ 
        message: 'User updated successfully',
        status: 200,
        data: dataUser
      });
    } catch (error) {
      next(error);
    }
  }
}