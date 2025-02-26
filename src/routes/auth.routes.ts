import { Router } from "express";
import { loginValidation, registerValidation} from "../modules/auth/auth.validation";
import { AuthController } from "../modules/auth/auth.controller";

const authRouter = Router();

authRouter.post("/register", registerValidation, AuthController.register);

export default authRouter;