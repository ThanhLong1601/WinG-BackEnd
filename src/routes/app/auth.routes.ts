import { Router } from "express";
import { loginValidation, registerValidation} from "../../modules/app/auth/auth.validation";
import { AuthController } from "../../modules/app/auth/auth.controller";

const authRouter = Router();

authRouter.post("/requestAcc", registerValidation, AuthController.requestAcc); // check status user

authRouter.post("/login", loginValidation, AuthController.login);

export default authRouter;