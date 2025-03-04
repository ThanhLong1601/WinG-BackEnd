import { Router } from "express";
import { adminAuth } from "../../middlewares/admin-authMiddleware";
import { createContentValidation, createListCategoryValidation } from "../../modules/admin/conntent/content.validation";
import { ContentController } from "../../modules/admin/conntent/content.controller";

const adminContentRouter = Router();

adminContentRouter.post("/categories", adminAuth, createListCategoryValidation, ContentController.addCategories);

adminContentRouter.post("/contents", adminAuth, createContentValidation, ContentController.addContent);

export default adminContentRouter;