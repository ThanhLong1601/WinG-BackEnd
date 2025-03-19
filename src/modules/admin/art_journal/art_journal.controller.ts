import { NextFunction, Request, Response } from "express";
import { createdArt, updatedArt } from "./art_journal.service";

export class ArtJournalController {
  static async createdArtJournal(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const data = await createdArt(body);
      res.status(201).json({
        message: 'Art Journal created successfully',
        status: 201,
        data: data
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatedArtJournal(req: Request, res: Response, next: NextFunction) {
    try {
      const { aid } = req.params;
      const { body } = req;
      const data = await updatedArt(aid, body);
      res.status(200).json({
        message: 'Art Journal updated successfully',
        status: 200,
        data: data
      });
    } catch (error) {
      next(error);
    }
  }
}