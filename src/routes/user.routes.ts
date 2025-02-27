import { Router } from "express";
import { appAuth } from "../middlewares/authMiddleware";
import { updateUserValidation } from "../modules/user/user.validation";
import { UserController } from "../modules/user/user.controller";

const userRouter = Router();

userRouter.patch("/update-profile", appAuth, updateUserValidation, UserController.updateProfileUser);

export default userRouter;