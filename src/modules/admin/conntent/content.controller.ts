import { Response } from "express";
import { CustomRequest } from "../../../utils/CustomRequest";
import { createContent, createListCategory } from "./content.service";

export class ContentController {
  static async addCategories(req: CustomRequest, res: Response) {
    try {
      const { body, user } = req;
      const { uid } = user;
      const { categories } = body;
      const newCategories = await createListCategory(uid, categories);
      res.status(201).json({
        message: 'Category created successfully',
        status: 201,
        data: newCategories
      });
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        status: error.status || 500,
        data: null
      });
    }
  }

  static async addContent(req: CustomRequest, res: Response) {
    try {
      const { body, user } = req;
      const { uid } = user;
      const newContent = await createContent(uid, body);
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
}