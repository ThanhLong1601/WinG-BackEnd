import e, { Router } from "express";
import { loginValidation } from "../modules/auth/auth.validation";
import { login } from "../modules/auth/auth.controller";

const authRouter = Router();

authRouter.post("/login", loginValidation, login);

authRouter.get("/test", login);

export default authRouter;