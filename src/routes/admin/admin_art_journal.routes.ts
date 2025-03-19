import { ArtJournalController } from './../../modules/admin/art_journal/art_journal.controller';
import { createdArtJournal, updatedArtJournal } from './../../modules/admin/art_journal/art_journal.validation';
import { Router } from "express";

const adminArtRoutes = Router();

adminArtRoutes.post("/art-journal", createdArtJournal, ArtJournalController.createdArtJournal);

adminArtRoutes.patch("/art-journal/:aid", updatedArtJournal, ArtJournalController.updatedArtJournal);


export default adminArtRoutes;