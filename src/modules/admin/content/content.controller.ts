import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../../../utils/CustomRequest";
import { createContent, createListCategory, getAllCategoryStatistic, getCategoryByCateid, getContentDetail, getContentStatistics, getListCategoryForDropDown, getListContent, updateCategoryByCateid, updateContentByConId } from "./content.service";

export class AdminContentController {

  /*
    Add categories
  */
  static async addCategories(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const { categories } = body;
      const newCategories = await createListCategory(categories);
      res.status(201).json({
        message: 'Category created successfully',
        status: 201,
        data: newCategories
      });
    } catch (error) {
      next(error);
    }
  }

  /*
    Get All categories and statistics
  */
  static async getCategoryAndStatistics(req: Request, res: Response, next: NextFunction) {
    try {
      const catogories = await getAllCategoryStatistic(req.query);
      res.status(200).json({
        message: 'Category retrieved successfully',
        status: 200,
        data: catogories
      });
    } catch (error) {
      next(error);
    }
  }

  /*
    Get All categories for dropdown
  */
  static async getCategoryForDropDown(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await getListCategoryForDropDown();
      res.status(200).json({
        message: 'Category retrieved successfully',
        status: 200,
        data: categories
      });
    } catch (error) {
      next(error);
    }
  }

  /*
    Get category
  */
  static async getCategoryDetails(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { cateid } = req.params;
      const category = await getCategoryByCateid(cateid);
      res.status(200).json({
        message: 'Category retrieved successfully',
        status: 200,
        data: category
      });
    } catch (error) {
      next(error);
    }
  }

  /*
    Update category
  */
  static async updateCategory(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { cateid } = req.params;
      const { body } = req;
      // const { uid } = user;
      const newCategory = await updateCategoryByCateid(cateid, body);
      res.status(200).json({
        message: 'Category updated successfully',
        status: 200,
        data: newCategory
      });
    } catch (error) {
      next(error);
    }
  }


  /*
    Add content
  */
  static async addContent(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const newContent = await createContent(body);
      res.status(201).json({
        message: 'Content created successfully',
        status: 201,
        data: newContent
      });
    } catch (error) {
      next(error);
    }
  }

  /*
    Update content
  */
  static async updateContent(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { conid } = req.params;
      const { body } = req;
      // const { uid } = user;
      const newContent = await updateContentByConId(conid, body);
      res.status(200).json({
        message: 'Content updated successfully',
        status: 200,
        data: newContent
      });
    } catch (error) {
      next(error);
    }
  }

  /*
    Update content status
  */
  static async updateContentStatus(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { conid } = req.params;
      const { body } = req;
      // const { uid } = user;
      const newContent = await updateContentByConId(conid, body);
      res.status(200).json({
        message: 'Content status updated successfully',
        status: 200,
        data: newContent
      });
    } catch (error) {
      next(error);
    }
  }

  /*
    Get All contents
  */
  static async getContents(req: Request, res: Response, next: NextFunction) {
    try {
      const contents = await getListContent(req.query);
      res.status(200).json({
        message: 'Content retrieved successfully',
        status: 200,
        data: contents
      });
    } catch (error) {
      next(error);
    }
  }

  static async getContentStatistic(req: Request, res: Response, next: NextFunction) {
    try {
      const contents = await getContentStatistics();
      res.status(200).json({
        message: 'Content retrieved successfully',
        status: 200,
        data: contents
      });
    } catch (error) {
      next(error);
    }
  }

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
}