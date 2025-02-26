"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validation_1 = require("../modules/auth/auth.validation");
const auth_controller_1 = require("../modules/auth/auth.controller");
const authRouter = (0, express_1.Router)();
authRouter.post("/register", auth_validation_1.registerValidation, auth_controller_1.AuthController.register);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map