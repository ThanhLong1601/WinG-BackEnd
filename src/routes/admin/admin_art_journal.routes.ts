import { AdminArtJournalController } from './../../modules/admin/art_journal/art_journal.controller';
import { createdArtJournal, updatedArtJournal } from './../../modules/admin/art_journal/art_journal.validation';
import { Router } from "express";

const adminArtRoutes = Router();

adminArtRoutes.get("/art-journal/statistics", AdminArtJournalController.getStatistics);

adminArtRoutes.post("/art-journal", createdArtJournal, AdminArtJournalController.createdArtJournal);

adminArtRoutes.get("/art-journal", AdminArtJournalController.getArtJournals);

adminArtRoutes.patch("/art-journal/:aid", updatedArtJournal, AdminArtJournalController.updatedArtJournal);

adminArtRoutes.get("/art-journal/:aid", AdminArtJournalController.getArtJournalById);

adminArtRoutes.get("/art-journal/:aid/submission", AdminArtJournalController.getSubmissionByUaid);


export default adminArtRoutes;