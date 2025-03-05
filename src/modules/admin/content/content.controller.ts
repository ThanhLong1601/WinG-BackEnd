import { Response } from "express";
import { CustomRequest } from "../../../utils/CustomRequest";
import { createContent, createListCategory, updateCategoryByCateid, updateContentByConId } from "./content.service";

export class ContentController {
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

  static async updateCategory(req: CustomRequest, res: Response) {
    try {
      const { cateid } = req.params;
      const { body } = req;
      // const { uid } = user;
      const newContent = await updateCategoryByCateid(cateid, body);
      res.status(200).json({
        message: 'Category updated successfully',
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
}