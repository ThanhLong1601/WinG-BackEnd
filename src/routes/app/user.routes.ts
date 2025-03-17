import { Router } from "express";
import { appAuth } from "../../middlewares/authMiddleware";
import { updateUserValidation } from "../../modules/app/user/user.validation";
import { UserController } from "../../modules/app/user/user.controller";
import { ContentController } from "../../modules/app/content/content.controller";

const userRouter = Router();

userRouter.patch("/update-profile", appAuth, updateUserValidation, UserController.updateProfileUser);

userRouter.get("/contents/:conid", appAuth, ContentController.getContentDetails)

userRouter.put("/contents/:conid/view", appAuth, ContentController.addView)

userRouter.get("/contents/categories/dropdown", appAuth, ContentController.getCategoryForDropDown)

userRouter.get("/contents", appAuth, ContentController.getContentsBelongToUser)

userRouter.patch("/update-settings", appAuth, UserController.updateUserSettings)

userRouter.patch("/update-timezone", appAuth, UserController.updateTimezone)

export default userRouter;