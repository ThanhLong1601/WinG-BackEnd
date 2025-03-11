import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../../../utils/CustomRequest";
import { getContentDetail, userViewContent } from "./content.service";

export class ContentController {
  static async getContentDetails(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { conid } = req.params;
      const content = await getContentDetail(conid);
      res.status(200).json({
        message: 'Content retrieved successfully',
        status: 200,
        data: content
      });
    } catch (error) {
      next(error);
    }
  }

  static async addView (req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const {conid} = req.params;
      const {user} = req;
      await userViewContent(conid, user);
      res.status(200).json({
        message: 'Content viewed successfully',
        status: 200,
        data: {}
      });
    } catch (error) {
      next(error);
    }
  }
}