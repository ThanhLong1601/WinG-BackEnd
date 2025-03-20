import { Router } from "express";
import { ArtJournalController } from "../../modules/app/art_journal/art_journal.controller";
import { appAuth } from "../../middlewares/authMiddleware";

const artRoutes = Router();

artRoutes.post("/art-journal/:aid", appAuth, ArtJournalController.saveSubmissionUncomplete);

artRoutes.patch("/art-journal/:uaid", appAuth, ArtJournalController.updateDrawing);

artRoutes.post("/art-journal/:uaid/submit", appAuth, ArtJournalController.submission);

export default artRoutes;