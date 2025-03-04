import { Router } from "express";
import { adminLoginValidation, adminRegisterValidation } from "../../modules/admin/auth/admin-auth.validation";
import { AdminAuthController } from "../../modules/admin/auth/admin-auth.controller";

const adminAuthRouter = Router();

adminAuthRouter.post("/register", adminRegisterValidation, AdminAuthController.register);

adminAuthRouter.post("/login", adminLoginValidation, AdminAuthController.login);

export default adminAuthRouter;