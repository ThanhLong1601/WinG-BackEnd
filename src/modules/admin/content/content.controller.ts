import { Request, Response } from "express";
import { CustomRequest } from "../../../utils/CustomRequest";
import { createContent, createListCategory, getAllCategoryStatistic, getListCategoryForDropDown, getListContent, updateCategoryByCateid, updateContentByConId } from "./content.service";

export class ContentController {

  /*
    Add categories
  */
  static async addCategories(req: CustomRequest, res: Response) {
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
      res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        status: error.status || 500,
        data: null,
        details: error.details || null
      });
    }
  }

  /*
    Update category
  */
  static async updateCategory(req: CustomRequest, res: Response) {
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
      res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        status: error.status || 500,
        data: null
      });
    }
  }

  /*
    Get All categories for dropdown
  */
  static async getCategoryForDropDown(req: Request, res: Response) {
    try {
      const categories = await getListCategoryForDropDown();
      res.status(200).json({
        message: 'Category retrieved successfully',
        status: 200,
        data: categories
      });
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        status: error.status || 500,
        data: null
      });
    }
  }

  /*
    Get All categories and statistics
  */
  static async getCategoryAndStatistics(req: Request, res: Response) {
    try {
      const catogories = await getAllCategoryStatistic(req.query);
      res.status(200).json({
        message: 'Category retrieved successfully',
        status: 200,
        data: catogories
      });
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        status: error.status || 500,
        data: null
      });
    }
  }

  /*
    Add content
  */
  static async addContent(req: CustomRequest, res: Response) {
    try {
      const { body } = req;
      const newContent = await createContent(body);
      res.status(201).json({
        message: 'Content created successfully',
        status: 201,
        data: newContent
      });
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        status: error.status || 500,
        data: null
      });
    }
  }

  /*
    Update content
  */
  static async updateContent(req: CustomRequest, res: Response) {
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
      res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        status: error.status || 500,
        data: null
      });
    }
  }

  /*
    Update content status
  */
  static async updateContentStatus(req: CustomRequest, res: Response) {
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
      res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        status: error.status || 500,
        data: null
      });
    }
  }

  /*
    Get All contents
  */
  static async getContents(req: Request, res: Response) {
    try {
      const contents = await getListContent(req.query);
      res.status(200).json({
        message: 'Content retrieved successfully',
        status: 200,
        data: contents
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