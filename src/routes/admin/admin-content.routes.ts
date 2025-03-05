import { Router } from "express";
import { adminAuth } from "../../middlewares/admin-authMiddleware";
import { createContentValidation, createListCategoryValidation, updateCategoryValidation, updateContentValidation } from "../../modules/admin/content/content.validation";
import { ContentController } from "../../modules/admin/content/content.controller";

const adminContentRouter = Router();

adminContentRouter.post("/categories", /*adminAuth,*/ createListCategoryValidation, ContentController.addCategories);

adminContentRouter.post("/contents", /*adminAuth,*/ createContentValidation, ContentController.addContent);

adminContentRouter.patch("/contents/:conid", /*adminAuth,*/ updateContentValidation, ContentController.updateContent);

adminContentRouter.patch("/categories/:cateid", /*adminAuth,*/ updateCategoryValidation, ContentController.updateCategory);

export default adminContentRouter;