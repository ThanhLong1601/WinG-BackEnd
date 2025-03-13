import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../../../utils/CustomRequest";
import { getContentDetail, getListContentBelongToUser, userViewContent } from "./content.service";
import { getListCategoryForDropDown } from "../../admin/content/content.service";

export class ContentController {
  static async getContentDetails(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const {user} = req;
      const {uid} = user;
      const { conid } = req.params;
      const content = await getContentDetail(uid, conid);
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

  static async getCategoryForDropDown (req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await getListCategoryForDropDown();
      res.status(200).json({
        message: 'Content retrieved successfully',
        status: 200,
        data: categories
      });
    } catch (error) {
      next(error);
    }
  }

  static async getContentsBelongToUser (req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const {user} = req;
      const contents = await getListContentBelongToUser(user, req.query);
      res.status(200).json({
        message: 'Content retrieved successfully',
        status: 200,
        data: contents
      });
    } catch (error) {
      next(error);
    }
  }
}