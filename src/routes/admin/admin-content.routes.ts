import { Router } from "express";
import { adminAuth } from "../../middlewares/admin-authMiddleware";
import { createContentValidation, createListCategoryValidation, updateCategoryValidation, updateContentStatusValidation, updateContentValidation } from "../../modules/admin/content/content.validation";
import { AdminContentController } from "../../modules/admin/content/content.controller";

const adminContentRouter = Router();

// API for category
adminContentRouter.post("/contents/categories", /*adminAuth,*/ createListCategoryValidation, AdminContentController.addCategories);

adminContentRouter.get("/contents/categories", /*adminAuth,*/ AdminContentController.getCategoryAndStatistics);

adminContentRouter.get("/contents/categories/dropdown", /*adminAuth,*/ AdminContentController.getCategoryForDropDown);

adminContentRouter.get("/contents/categories/:cateid", /*adminAuth,*/ AdminContentController.getCategoryDetails);

adminContentRouter.patch("/contents/categories/:cateid", /*adminAuth,*/ updateCategoryValidation, AdminContentController.updateCategory);



// API for content
adminContentRouter.post("/contents", /*adminAuth,*/ createContentValidation, AdminContentController.addContent);

adminContentRouter.get("/contents", /*adminAuth,*/ AdminContentController.getContents);

adminContentRouter.get("/contents/statistics", /*adminAuth,*/ AdminContentController.getContentStatistic);

adminContentRouter.get("/contents/:conid", /*adminAuth,*/ AdminContentController.getContentDetails);

adminContentRouter.patch("/contents/:conid", /*adminAuth,*/ updateContentValidation, AdminContentController.updateContent);

adminContentRouter.patch("/contents/:conid/status", /*adminAuth,*/ updateContentStatusValidation, AdminContentController.updateContentStatus);


export default adminContentRouter;