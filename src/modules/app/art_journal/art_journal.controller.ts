import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../../../utils/CustomRequest";
import { saveDrawingUncomplete, submitDrawing, updatedDrawing } from "./art_journal.service";


export class ArtJournalController{
  static async saveSubmissionUncomplete(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const {user, body} = req;
      const {aid} = req.params;
      const {uid} = user;
      const data = await saveDrawingUncomplete(uid, aid, body);
      res.status(201).json({
        message: 'Save drawing temporarily successfully',
        status: 201,
        data: data
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateDrawing(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const {user, body} = req;
      const {uaid} = req.params;
      const {uid} = user;
      const data = await updatedDrawing(uid, uaid, body);
      res.status(200).json({
        message: 'Drawing updated successfully',
        status: 200,
        data: data
      });
    } catch (error) {
      next(error);
    }
  }

  static async submission(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { user } = req;
      const { uid } = user
      const { uaid } = req.params;
      const data = await submitDrawing(uid, uaid);
      res.status(200).json({
        message: 'Submission successful',
        status: 200,
        data: data
      });
    } catch (error) {
      next(error);
    }
  }
}