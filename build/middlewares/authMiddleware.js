"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("../repositories/user.repository");
const appAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    let token;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }
    else {
        return res.status(401).json({
            message: 'Unauthorized',
            code: null,
            status: 401
        });
    }
    if (!token) {
        return res.status(401).json({
            message: 'Access denied. No token provided',
            code: null,
            status: 404
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield (0, user_repository_1.getUserById)(decoded.id);
        if (!user) {
            return res.status(401).json({
                message: 'User not found',
                code: null,
                status: 404
            });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: 'Unauthorized access',
        });
    }
});
exports.appAuth = appAuth;
//# sourceMappingURL=authMiddleware.js.map