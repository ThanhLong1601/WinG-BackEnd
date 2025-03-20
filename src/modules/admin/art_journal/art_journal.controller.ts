import { NextFunction, Request, Response } from "express";
import { createdArt, getArtJournal, getListArtJournals, getStatisticsSubmitAndTopic, getSubmission, updatedArt } from "./art_journal.service";

export class AdminArtJournalController {
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

  static async getArtJournals(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await getListArtJournals(req.query);
      res.status(200).json({
        message: 'Art Journal retrieved successfully',
        status: 200,
        data: data
      });
    } catch (error) {
      next(error);
    }
  }

  static async getArtJournalById(req: Request, res: Response, next: NextFunction) {
    try {
      const { aid } = req.params;
      const data = await getArtJournal(aid);
      res.status(200).json({
        message: 'Art Journal retrieved successfully',
        status: 200,
        data: data
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSubmissionByUaid(req: Request, res: Response, next: NextFunction) {
    try {
      const { uaid } = req.params;
      const data = await getSubmission(uaid);
      res.status(200).json({
        message: 'Submission retrieved successfully',
        status: 200,
        data: data
      });
    } catch (error) {
      next(error);
    }
  }

  static async getStatistics(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await getStatisticsSubmitAndTopic();
      res.status(200).json({
        message: 'Statistics retrieved successfully',
        status: 200,
        data: data
      });
    } catch (error) {
      next(error);
    }
  }
}