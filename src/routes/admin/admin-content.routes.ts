import { Router } from "express";
import { adminAuth } from "../../middlewares/admin-authMiddleware";
import { createContentValidation, createListCategoryValidation, updateCategoryValidation, updateContentStatusValidation, updateContentValidation } from "../../modules/admin/content/content.validation";
import { ContentController } from "../../modules/admin/content/content.controller";

const adminContentRouter = Router();

// API for category
adminContentRouter.post("/contents/categories", /*adminAuth,*/ createListCategoryValidation, ContentController.addCategories);

adminContentRouter.get("/contents/categories", /*adminAuth,*/ ContentController.getCategoryAndStatistics);

adminContentRouter.get("/contents/categories/:cateid", /*adminAuth,*/ ContentController.getCategoryDetails);

adminContentRouter.patch("/contents/categories/:cateid", /*adminAuth,*/ updateCategoryValidation, ContentController.updateCategory);

adminContentRouter.get("/contents/categories/dropdown", /*adminAuth,*/ ContentController.getCategoryForDropDown);


// API for content
adminContentRouter.post("/contents", /*adminAuth,*/ createContentValidation, ContentController.addContent);

adminContentRouter.get("/contents", /*adminAuth,*/ ContentController.getContents);

adminContentRouter.get("/contents/statistics", /*adminAuth,*/ ContentController.getContentStatistic);

adminContentRouter.get("/contents/:conid", /*adminAuth,*/ ContentController.getContentDetails);

adminContentRouter.patch("/contents/:conid", /*adminAuth,*/ updateContentValidation, ContentController.updateContent);

adminContentRouter.patch("/contents/:conid/status", /*adminAuth,*/ updateContentStatusValidation, ContentController.updateContentStatus);


export default adminContentRouter;