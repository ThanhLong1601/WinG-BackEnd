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
exports.checkUserLogin = checkUserLogin;
exports.createUser = createUser;
const user_dto_1 = require("../../dtos/user.dto");
const user_repository_1 = require("../../repositories/user.repository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function checkUserLogin(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pinCode, phone } = body;
        const user = yield (0, user_repository_1.getUserByPhoneNumber)(phone);
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = yield bcryptjs_1.default.compare(pinCode, user.pinCode);
        if (!isMatch) {
            throw new Error('Invalid pin code');
        }
        return (0, user_dto_1.toUserDto)(user);
    });
}
function createUser(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const { phone, pinCode } = body;
        const user = yield (0, user_repository_1.getUserByPhoneNumber)(phone);
        if (user) {
            throw new Error('User already exists');
        }
        const pinHash = yield bcryptjs_1.default.hash(pinCode, 10);
        const newUser = yield (0, user_repository_1.saveUser)({ phone, pinCode: pinHash });
        return (0, user_dto_1.toUserDto)(newUser);
    });
}
//# sourceMappingURL=auth.service.js.map